import { Chars } from './chars';
import * as ESTree from './estree';
import { hasOwn, toHex, tryCreate, fromCodePoint, hasMask, isValidDestructuringAssignmentTarget, isDirective, getQualifiedJSXName, isValidSimpleAssignmentTarget } from './common';
import { Flags, Context, RegExpState, RegExpFlag, ScopeMasks, ObjectState, AsyncState, ScannerState } from './masks';
import { createError, Errors } from './errors';
import { Token, tokenDesc, descKeyword } from './token';
import { isValidIdentifierStart, isvalidIdentifierContinue, isIdentifierStart, isIdentifierPart } from './unicode';
import { Options, SavedState, CollectComments, ErrorLocation, Location } from './interface';

export const enum ParenthesizedState {
    None = 0,
        EvalOrArg = 1 << 0,
        Yield = 1 << 1
}

export class Parser {
    private readonly source: string;
    private index: number;
    private column: number;
    private line: number;
    private flags: Flags;
    private tokenValue: any;
    private token: Token;
    private peekedToken: Token;
    private peekedState: any;
    private startPos: number;
    private startColumn: number;
    private startLine: number;
    private endPos: number;
    private endColumn: number;
    private endLine: number;
    private tokenRaw: string;
    private labelSet: any;
    private blockScope: any;
    private parentScope: any;
    private functionScope: any;
    private errorLocation: void | ErrorLocation;
    private comments: CollectComments | void;
    private tokenRegExp: void | {
        pattern: string;
        flags: string;
    };

    constructor(
        source: string,
        options: Options
    ) {
        this.flags = Flags.None;
        this.source = source;
        this.index = 0;
        this.column = 0;
        this.line = 1;
        this.endPos = 0;
        this.endColumn = 0;
        this.endLine = 0;
        this.startPos = 0;
        this.startColumn = 0;
        this.startLine = 0;
        this.tokenValue = undefined;
        this.tokenRaw = '';
        this.token = 0;
        this.peekedToken = 0;
        this.peekedState = undefined;
        this.labelSet = undefined;
        this.errorLocation = undefined;
        this.tokenRegExp = undefined;
        this.functionScope = undefined;
        this.blockScope = undefined;
        this.parentScope = undefined;
        this.comments = undefined;

        if (options.next) this.flags |= Flags.OptionsNext;
        if (options.comments) this.flags |= Flags.OptionsOnComment;
        if (options.jsx) this.flags |= Flags.OptionsJSX;
        if (options.locations) this.flags |= Flags.OptionsLoc;
        if (options.ranges) this.flags |= Flags.OptionsRanges;
        if (options.raw) this.flags |= Flags.OptionsRaw;
        if (options.v8) this.flags |= Flags.OptionsV8;

        if (this.flags & Flags.OptionsOnComment) this.comments = options.comments;
    }

    // 'strict' are a pre-set bitmask in 'module code',
    // so no need to check for strict directives, and the
    // 'body' are different. (thus the duplicate code path).
    public parseModule(context: Context): ESTree.Program {

        const node: ESTree.Program = {
            type: 'Program',
            body: this.ParseModuleItemList(context | Context.AllowIn),
            sourceType: 'module'
        };

        if (this.flags & Flags.OptionsRanges) {
            node.start = 0;
            node.end = this.source.length;
        }

        if (this.flags & Flags.OptionsLoc) {
            node.loc = {
                start: {
                    line: 1,
                    column: 0,
                },
                end: {
                    line: this.line,
                    column: this.column
                }
            };
        }
        return node;
    }

    public parseScript(context: Context): ESTree.Program {
        this.nextToken(context);
        const node: ESTree.Program = {
            type: 'Program',
            body: this.parseStatementList(context | Context.AllowIn, Token.EndOfSource),
            sourceType: 'script'
        };

        if (this.flags & Flags.OptionsRanges) {
            node.start = 0;
            node.end = this.source.length;
        }
        if (this.flags & Flags.OptionsLoc) {
            node.loc = {
                start: {
                    line: 1,
                    column: 0,
                },
                end: {
                    line: this.line,
                    column: this.column
                }
            };
        }
        return node;
    }

    private error(type: Errors, ...params: string[]): void {
        throw createError(type, this.trackErrorLocation(), ...params);
    }

    private trackErrorLocation(): ErrorLocation {
        return {
            index: this.index,
            line: this.line,
            column: this.column
        };
    }

    private saveState(): SavedState {
        return {
            index: this.index,
            column: this.column,
            line: this.line,
            startLine: this.startLine,
            endLine: this.endLine,
            startColumn: this.startColumn,
            endColumn: this.endColumn,
            token: this.token,
            tokenValue: this.tokenValue,
            tokenRaw: this.tokenRaw,
            startPos: this.startPos,
            endPos: this.endPos,
            tokenRegExp: this.tokenRegExp,
            flags: this.flags,
        };
    }

    private rewindState(state: SavedState) {
        this.index = state.index;
        this.column = state.column;
        this.line = state.line;
        this.token = state.token;
        this.tokenValue = state.tokenValue;
        this.startPos = state.startPos;
        this.endPos = state.endPos;
        this.endLine = state.endLine;
        this.startLine = state.startLine;
        this.startColumn = state.startColumn;
        this.endColumn = state.endColumn;
        this.tokenRegExp = state.tokenRegExp;
        this.tokenRaw = state.tokenRaw;
        this.flags = state.flags;
    }

    private nextToken(context: Context): Token {
        this.token = this.scanToken(context);
        return this.token;
    }

    private hasNext() {
        return this.index < this.source.length;
    }

    private nextChar() {
        return this.source.charCodeAt(this.index);
    }

    private nextUnicodeChar() {
        this.advance();
        const hi = this.nextChar();
        if (hi < 0xd800 || hi > 0xdbff) return hi;
        if (this.index === this.source.length) return hi;
        const lo = this.nextChar();

        if (lo < 0xdc00 || lo > 0xdfff) return hi;
        return (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
    }

    /**
     * Advance to next position
     */
    private advance(): void {
        this.index++;
        this.column++;
    }

    private advanceTwice(): void {
        this.index += 2;
        this.column += 2;
    }

    /**
     * Advance to new line
     */
    private advanceNewline() {
        this.flags |= Flags.LineTerminator;
        this.index++;
        this.column = 0;
        this.line++;
    }

    /**
     * Advance if the code unit matches the UTF-16 code unit at the given index.
     *
     * @param code Number
     */
    private consume(code: number): boolean {
        if (this.nextChar() !== code) return false;
        this.advance();
        return true;
    }

    private peekToken(context: Context) {
        const savedState = this.saveState();
        this.peekedToken = this.scanToken(context);
        this.peekedState = this.saveState();
        this.rewindState(savedState);
    }

    /**
     * Scan the entire source code. Skips whitespace and comments, and
     * return the token at the given index.
     *
     * @param context Context
     */
    private scanToken(context: Context): Token {

        if (this.peekedState) {
            this.rewindState(this.peekedState);
            this.peekedState = undefined;
            return this.peekedToken;
        }

        this.flags &= ~(Flags.LineTerminator | Flags.HasUnicode);

        this.endPos = this.index;
        this.endColumn = this.column;
        this.endLine = this.line;
        const state = ScannerState.None;

        while (this.hasNext()) {

            this.startPos = this.index;
            this.startColumn = this.column;
            this.startLine = this.line;

            const first = this.nextChar();

            switch (first) {
                case Chars.CarriageReturn:
                    this.advanceNewline();
                    if (this.nextChar() === Chars.LineFeed) {
                        this.index++;
                    }
                    continue;
                case Chars.LineFeed:
                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    this.advanceNewline();
                    continue;

                case Chars.Tab:
                case Chars.VerticalTab:
                case Chars.FormFeed:
                case Chars.Space:
                case Chars.NonBreakingSpace:
                case Chars.Ogham:
                case Chars.EnQuad:
                case Chars.EmQuad:
                case Chars.EnSpace:
                case Chars.EmSpace:
                case Chars.ThreePerEmSpace:
                case Chars.FourPerEmSpace:
                case Chars.SixPerEmSpace:
                case Chars.FigureSpace:
                case Chars.PunctuationSpace:
                case Chars.ThinSpace:
                case Chars.HairSpace:
                case Chars.NarrowNoBreakSpace:
                case Chars.MathematicalSpace:
                case Chars.IdeographicSpace:
                case Chars.ZeroWidthNoBreakSpace:
                    this.advance();
                    continue;

                    // `/`, `/=`, `/>`
                case Chars.Slash:
                    {
                        this.advance();

                        const next = this.nextChar();

                        if (next === Chars.Slash) {
                            this.advance();
                            this.skipComments(state | ScannerState.SingleLine);
                            continue;
                        } else if (next === Chars.Asterisk) {
                            this.advance();
                            this.skipComments(state | ScannerState.MultiLine);
                            continue;
                        } else if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.DivideAssign;
                        }

                        return Token.Divide;
                    }

                    // `<`, `<=`, `<<`, `<<=`, `</`,  <!--
                case Chars.LessThan:
                    {
                        this.advance();

                        const next = this.nextChar();

                        if (!(context & Context.Module) && next === Chars.Exclamation) {
                            this.advance();
                            if (this.consume(Chars.Hyphen) &&
                                this.consume(Chars.Hyphen)) {
                                this.skipComments(state | ScannerState.SingleLine);
                            }
                            continue;
                        }

                        if (next === Chars.LessThan) {
                            this.advance();
                            if (this.consume(Chars.EqualSign)) {
                                return Token.ShiftLeftAssign;
                            }
                            return Token.ShiftLeft;
                        }

                        if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.LessThanOrEqual;
                        }

                        if (this.flags & Flags.OptionsJSX &&
                            this.consume(Chars.Slash) &&
                            !this.consume(Chars.Asterisk)) {
                            return Token.JSXClose;
                        }

                        return Token.LessThan;
                    }

                    // -, --, -->, -=,
                case Chars.Hyphen:
                    {
                        this.advance(); // skip '-'

                        const next = this.nextChar();

                        if (next === Chars.Hyphen) {
                            this.advance();
                            if (this.consume(Chars.GreaterThan)) {
                                if (!(context & Context.Module) || this.flags & Flags.LineTerminator) {
                                    this.skipComments(state | ScannerState.SingleLine);
                                }
                                continue;
                            }
                            return Token.Decrement;
                        } else if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.SubtractAssign;
                        } else {
                            return Token.Subtract;
                        }
                    }

                    // `#`
                case Chars.Hash:
                    {
                        if (this.index === 0 &&
                            this.source.charCodeAt(this.index + 1) === Chars.Exclamation) {
                            this.advanceTwice();
                            this.skipComments(state);
                            continue;
                        }
                    }

                    // `{`
                case Chars.LeftBrace:
                    this.advance();
                    return Token.LeftBrace;

                    // `}`
                case Chars.RightBrace:
                    this.advance();
                    this.flags |= Flags.LineTerminator;
                    return Token.RightBrace;

                    // `~`
                case Chars.Tilde:
                    this.advance();
                    return Token.Complement;

                    // `?`
                case Chars.QuestionMark:
                    this.advance();
                    return Token.QuestionMark;

                    // `[`
                case Chars.LeftBracket:
                    this.advance();
                    return Token.LeftBracket;

                    // `]`
                case Chars.RightBracket:
                    this.advance();
                    return Token.RightBracket;
                    // `,`
                case Chars.Comma:
                    this.advance();
                    return Token.Comma;

                    // `:`
                case Chars.Colon:
                    this.advance();
                    return Token.Colon;

                    // `;`
                case Chars.Semicolon:
                    this.advance();
                    return Token.Semicolon;

                    // `(`
                case Chars.LeftParen:
                    this.advance();
                    return Token.LeftParen;

                    // `)`
                case Chars.RightParen:
                    this.advance();
                    return Token.RightParen;

                    // Template
                case Chars.Backtick:
                    return this.scanTemplate(context);

                    // `'string'`, `"string"`
                case Chars.DoubleQuote:
                case Chars.SingleQuote:
                    return this.scanString(context, first);

                    // `&`, `&&`, `&=`
                case Chars.Ampersand:
                    {
                        this.advance();

                        const next = this.nextChar();

                        if (next === Chars.Ampersand) {
                            this.advance();
                            return Token.LogicalAnd;
                        }

                        if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.BitwiseAndAssign;
                        }

                        return Token.BitwiseAnd;
                    }

                    // `%`, `%=`
                case Chars.Percent:
                    this.advance();
                    if (!this.consume(Chars.EqualSign)) return Token.Modulo;
                    return Token.ModuloAssign;

                    // `!`, `!=`, `!==`
                case Chars.Exclamation:
                    this.advance();
                    if (!this.consume(Chars.EqualSign)) return Token.Negate;
                    if (!this.consume(Chars.EqualSign)) return Token.LooseNotEqual;
                    return Token.StrictNotEqual;

                    // `^`, `^=`
                case Chars.Caret:
                    this.advance();
                    if (!this.consume(Chars.EqualSign)) return Token.BitwiseXor;
                    return Token.BitwiseXorAssign;

                    // `*`, `**`, `*=`, `**=`
                case Chars.Asterisk:
                    {
                        this.advance();
                        if (!this.hasNext()) return Token.Multiply;
                        const next = this.nextChar();

                        if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.MultiplyAssign;
                        }

                        if (next !== Chars.Asterisk) return Token.Multiply;
                        this.advance();
                        if (!this.consume(Chars.EqualSign)) return Token.Exponentiate;
                        return Token.ExponentiateAssign;
                    }

                    // `+`, `++`, `+=`
                case Chars.Plus:
                    {
                        this.advance();
                        if (!this.hasNext()) return Token.Add;
                        const next = this.nextChar();

                        if (next === Chars.Plus) {
                            this.advance();
                            return Token.Increment;
                        }

                        if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.AddAssign;
                        }

                        return Token.Add;
                    }

                    // `=`, `==`, `===`, `=>`
                case Chars.EqualSign:
                    {
                        this.advance();

                        if (!this.hasNext()) return Token.Assign;

                        const next = this.nextChar();

                        if (next === Chars.EqualSign) {
                            this.advance();
                            if (this.consume(Chars.EqualSign)) {
                                return Token.StrictEqual;
                            } else {
                                return Token.LooseEqual;
                            }
                        } else if (next === Chars.GreaterThan) {
                            this.advance();
                            return Token.Arrow;
                        }

                        return Token.Assign;
                    }

                    // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
                case Chars.GreaterThan:
                    {
                        this.advance();

                        // Fixes '<a>= == =</a>'
                        //  if (context & Context.JSXChild) return Token.GreaterThan;

                        let next = this.nextChar();

                        if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.GreaterThanOrEqual;
                        }

                        if (next !== Chars.GreaterThan) return Token.GreaterThan;
                        this.advance();

                        next = this.nextChar();

                        if (next === Chars.GreaterThan) {
                            this.advance();
                            if (this.consume(Chars.EqualSign)) {
                                return Token.LogicalShiftRightAssign;
                            } else {
                                return Token.LogicalShiftRight;
                            }
                        } else if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.ShiftRightAssign;
                        }

                        return Token.ShiftRight;
                    }

                    // `|`, `||`, `|=`
                case Chars.VerticalBar:
                    {
                        this.advance();

                        const next = this.nextChar();

                        if (next === Chars.VerticalBar) {
                            this.advance();
                            return Token.LogicalOr;
                        } else if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.BitwiseOrAssign;
                        }

                        return Token.BitwiseOr;
                    }

                    // '.'
                case Chars.Period:
                    {
                        let index = this.index + 1;

                        const next = this.source.charCodeAt(index);
                        if (next >= Chars.Zero && next <= Chars.Nine) {
                            this.scanNumber(context);
                            return Token.NumericLiteral;
                        } else if (next === Chars.Period) {
                            index++;
                            if (index < this.source.length &&
                                this.source.charCodeAt(index) === Chars.Period) {
                                this.index = index + 1;
                                this.column += 3;
                                return Token.Ellipsis;
                            }
                        }

                        this.advance();
                        return Token.Period;
                    }

                    // '0'
                case Chars.Zero:
                    {
                        const index = this.index + 1;

                        if (index + 1 < this.source.length) {
                            switch (this.source.charCodeAt(index)) {
                                case Chars.LowerX:
                                case Chars.UpperX:
                                    return this.scanHexadecimalDigit();
                                case Chars.LowerB:
                                case Chars.UpperB:
                                    return this.scanBinaryDigits(context);
                                case Chars.LowerO:
                                case Chars.UpperO:
                                    return this.scanOctalDigits(context);
                                default: // ignore
                            }
                        }

                        const ch = this.source.charCodeAt(index);
                        if (index < this.source.length && ch >= Chars.Zero && ch <= Chars.Seven) {
                            return this.scanNumberLiteral(context);
                        }
                    }

                    // '1' - '9'
                case Chars.One:
                case Chars.Two:
                case Chars.Three:
                case Chars.Four:
                case Chars.Five:
                case Chars.Six:
                case Chars.Seven:
                case Chars.Eight:
                case Chars.Nine:

                    return this.scanNumber(context);

                    // '\uVar', `\u{N}var`
                case Chars.Backslash:

                    // `A`...`Z`
                case Chars.UpperA:
                case Chars.UpperB:
                case Chars.UpperC:
                case Chars.UpperD:
                case Chars.UpperE:
                case Chars.UpperF:
                case Chars.UpperG:
                case Chars.UpperH:
                case Chars.UpperI:
                case Chars.UpperJ:
                case Chars.UpperK:
                case Chars.UpperL:
                case Chars.UpperM:
                case Chars.UpperN:
                case Chars.UpperO:
                case Chars.UpperP:
                case Chars.UpperQ:
                case Chars.UpperR:
                case Chars.UpperS:
                case Chars.UpperT:
                case Chars.UpperU:
                case Chars.UpperV:
                case Chars.UpperW:
                case Chars.UpperX:
                case Chars.UpperY:
                case Chars.UpperZ:

                    // '$'
                case Chars.Dollar:

                    // '_'
                case Chars.Underscore:

                    //  `a`...`z`
                case Chars.LowerA:
                case Chars.LowerB:
                case Chars.LowerC:
                case Chars.LowerD:
                case Chars.LowerE:
                case Chars.LowerF:
                case Chars.LowerG:
                case Chars.LowerH:
                case Chars.LowerI:
                case Chars.LowerJ:
                case Chars.LowerK:
                case Chars.LowerL:
                case Chars.LowerM:
                case Chars.LowerN:
                case Chars.LowerO:
                case Chars.LowerP:
                case Chars.LowerQ:
                case Chars.LowerR:
                case Chars.LowerS:
                case Chars.LowerT:
                case Chars.LowerU:
                case Chars.LowerV:
                case Chars.LowerW:
                case Chars.LowerX:
                case Chars.LowerY:
                case Chars.LowerZ:
                    return this.scanIdentifier(context);
                default:
                    if (isValidIdentifierStart(first)) return this.scanIdentifier(context);
                    this.error(Errors.Unexpected);
            }
        }

        return Token.EndOfSource;
    }

    /**
     * Skips single line, shebang and multiline comments
     *
     * @param state ScannerState
     */
    private skipComments(state: ScannerState) {

        const start = this.index;

        // It's only pre-closed for shebang and single line comments
        if (!(state & ScannerState.MultiLine)) state |= ScannerState.Closed;

        loop:
            while (this.hasNext()) {

                switch (this.nextChar()) {
                    // Line Terminators
                    case Chars.CarriageReturn:
                        this.advanceNewline();
                        if (this.nextChar() === Chars.LineFeed) {
                            this.index++;
                        }
                        if (!(state & ScannerState.MultiLine)) break loop;
                        break;
                    case Chars.LineFeed:
                        this.advanceNewline();
                        if (!(state & ScannerState.MultiLine)) break loop;
                        break;
                    case Chars.LineSeparator:
                    case Chars.ParagraphSeparator:
                        this.advanceNewline();
                        break;
                    case Chars.Asterisk:
                        if (state & ScannerState.MultiLine) {
                            this.advance();
                            if (this.consume(Chars.Slash)) {
                                state |= ScannerState.Closed;
                                break loop;
                            }
                            break;
                        }
                        // fall through
                    default:
                        this.advance();
                }
            }

        if (!(state & ScannerState.Closed)) this.error(Errors.UnterminatedComment);

        if (state & ScannerState.Collectable && this.flags & Flags.OptionsOnComment) {
            this.collectComment(
                state & ScannerState.MultiLine ? 'MultiLineComment' : 'SingleLineComment',
                this.source.slice(start, state & ScannerState.MultiLine ? this.index - 2 : this.index),
                this.startPos, this.index);
        }
    }

    private collectComment(type: ESTree.CommentType, value: string, start: number, end: number): void {
        let loc;

        if (this.flags & Flags.OptionsLoc) {
            loc = {
                start: {
                    line: this.startLine,
                    column: this.startColumn,
                },
                end: {
                    line: this.endLine,
                    column: this.column
                }
            };
        }

        if (typeof this.comments === 'function') {
            this.comments(type, value, start, end, loc);
        } else if (Array.isArray(this.comments)) {

            const node: ESTree.Comment = {
                type,
                value
            };

            if (this.flags & Flags.OptionsRanges) {
                node.start = start;
                node.end = end;
            }

            if (this.flags & Flags.OptionsLoc) {
                node.loc = loc;
            }
            this.comments.push(node);
        }
    }

    private scanIdentifier(context: Context): Token {

        let start = this.index;
        let ret = '';

        loop:
            while (this.hasNext()) {
                let code = this.nextChar();
                switch (code) {
                    case Chars.Backslash:
                        this.flags |= Flags.HasUnicode;
                        ret += this.source.slice(start, this.index);
                        ret += fromCodePoint(this.peekUnicodeEscape());
                        start = this.index;
                        break;
                    default:
                        if (code >= 0xd800 && code <= 0xdc00) code = this.nextUnicodeChar();
                        if (!isIdentifierPart(code)) break loop;
                        this.advance();
                }
            }

        if (start < this.index) ret += this.source.slice(start, this.index);

        const len = ret.length;

        // Invalid: 'function f() { new.t\\u0061rget; }'
        if (this.flags & Flags.HasUnicode && ret === 'target') this.error(Errors.InvalidEscapedReservedWord);

        this.tokenValue = ret;

        // Reserved words are between 2 and 11 characters long and start with a lowercase letter
        if (len >= 2 && len <= 11) {
            const ch = ret.charCodeAt(0);
            if (ch >= Chars.LowerA && ch <= Chars.LowerZ) {
                const token = descKeyword(ret);
                if (token > 0) {
                    return token;
                }
            }
        }
        return Token.Identifier;
    }

    /**
     * Peek unicode escape
     */
    private peekUnicodeEscape(): any {
        this.advance();
        const code = this.peekExtendedUnicodeEscape();
        if (code >= 0xd800 && code <= 0xdc00) this.error(Errors.UnexpectedSurrogate);
        if (!isvalidIdentifierContinue(code)) this.error(Errors.InvalidUnicodeEscapeSequence);
        this.advance();
        return code;
    }

    private scanNumberLiteral(context: Context): Token {

        if (context & Context.Strict) this.error(Errors.StrictOctalEscape);

        if (!(this.flags & Flags.Noctal)) this.flags |= Flags.Noctal;

        this.advance();

        let ch = this.nextChar();

        let code = 0;
        let isDecimal = false;

        while (this.hasNext()) {
            ch = this.nextChar();
            if (!isDecimal && ch >= Chars.Eight) isDecimal = true;
            if (!(Chars.Zero <= ch && ch <= Chars.Nine)) break;
            code = code * 8 + (ch - 48);
            this.advance();
        }

        if (this.flags & Flags.OptionsNext && this.consume(Chars.LowerN)) this.flags |= Flags.BigInt;

        if (this.flags & Flags.OptionsRaw) this.tokenRaw = this.source.slice(this.startPos, this.index);

        this.tokenValue = isDecimal ? parseInt(this.source.slice(this.startPos, this.index), 10) : code;
        return Token.NumericLiteral;
    }

    private scanOctalDigits(context: Context): Token {

        if (context & Context.Strict) this.error(Errors.StrictOctalEscape);

        this.advanceTwice();

        let ch = this.nextChar();
        let code = ch - Chars.Zero;

        // we must have at least one octal digit after 'o'/'O'
        if (ch < Chars.Zero || ch >= Chars.Eight) this.error(Errors.InvalidBinaryDigit);

        this.advance();

        while (this.hasNext()) {
            ch = this.nextChar();
            if (!(Chars.Zero <= ch && ch <= Chars.Seven)) break;
            if (ch < Chars.Zero || ch >= Chars.Eight) this.error(Errors.InvalidBinaryDigit);
            code = (code << 3) | (ch - Chars.Zero);
            this.advance();
        }

        this.tokenValue = code;

        if (this.flags & Flags.OptionsNext && this.consume(Chars.LowerN)) this.flags |= Flags.BigInt;

        if (this.flags & Flags.OptionsRaw) this.tokenRaw = this.source.slice(this.startPos, this.index);

        return Token.NumericLiteral;
    }

    private scanHexadecimalDigit() {

        this.advanceTwice();

        let ch = this.nextChar();
        let code = toHex(ch);

        if (code < 0) this.error(Errors.InvalidRadix);

        this.advance();

        while (this.hasNext()) {
            ch = this.nextChar();
            const digit = toHex(ch);
            if (digit < 0) break;
            code = code << 4 | digit;
            this.advance();
        }

        this.tokenValue = code;

        if (this.flags & Flags.OptionsNext && this.consume(Chars.LowerN)) this.flags |= Flags.BigInt;

        if (this.flags & Flags.OptionsRaw) this.tokenRaw = this.source.slice(this.startPos, this.index);
        return Token.NumericLiteral;
    }

    private scanBinaryDigits(context: Context): Token {

        this.advanceTwice();

        let ch = this.nextChar();
        let code = ch - Chars.Zero;

        // Invalid:  '0b'
        if (ch !== Chars.Zero && ch !== Chars.One) {
            this.error(Errors.InvalidBinaryDigit);
        }

        this.advance();

        while (this.hasNext()) {
            ch = this.nextChar();
            if (!(ch === Chars.Zero || ch === Chars.One)) break;
            code = (code << 1) | (ch - Chars.Zero);
            this.advance();
        }

        this.tokenValue = code;

        if (this.flags & Flags.OptionsNext && this.consume(Chars.LowerN)) this.flags |= Flags.BigInt;

        if (this.flags & Flags.OptionsRaw) this.tokenRaw = this.source.slice(this.startPos, this.index);

        return Token.NumericLiteral;
    }

    private skipDigits() {
        scan: while (this.hasNext()) {
            switch (this.nextChar()) {
                case Chars.Zero:
                case Chars.One:
                case Chars.Two:
                case Chars.Three:
                case Chars.Four:
                case Chars.Five:
                case Chars.Six:
                case Chars.Seven:
                case Chars.Eight:
                case Chars.Nine:
                    this.advance();
                    break;
                default:
                    break scan;
            }
        }
    }

    private scanNumber(context: Context): Token {

        const start = this.index;

        this.skipDigits();

        if (this.nextChar() === Chars.Period) {

            if (!(this.flags & Flags.Float)) this.flags |= Flags.Float;

            this.advance();
            this.skipDigits();
        }

        let end = this.index;

        switch (this.nextChar()) {
            // scan exponent, if any
            case Chars.UpperE:
            case Chars.LowerE:

                this.advance();

                if (!(this.flags & Flags.Exponent)) this.flags |= Flags.Exponent;

                // scan exponent
                switch (this.nextChar()) {
                    case Chars.Plus:
                    case Chars.Hyphen:
                        this.advance();
                        if (!this.hasNext()) this.error(Errors.UnexpectedTokenNumber);
                    default: // ignore
                }

                switch (this.nextChar()) {
                    case Chars.Zero:
                    case Chars.One:
                    case Chars.Two:
                    case Chars.Three:
                    case Chars.Four:
                    case Chars.Five:
                    case Chars.Six:
                    case Chars.Seven:
                    case Chars.Eight:
                    case Chars.Nine:
                        this.advance();
                        this.skipDigits();
                        break;
                    default:
                        // we must have at least one decimal digit after 'e'/'E'
                        this.error(Errors.UnexpectedMantissa);
                }

                end = this.index;

                break;

                // BigInt - Stage 3 proposal
            case Chars.LowerN:
                if (this.flags & Flags.OptionsNext) {
                    if (this.flags & Flags.Float) this.error(Errors.Unexpected);
                    this.advance();
                    if (!(this.flags & Flags.BigInt)) this.flags |= Flags.BigInt;
                    end = this.index;
                }

            default: // ignore
        }

        // The source character immediately following a numeric literal must
        // not be an identifier start or a decimal digit.
        if (isIdentifierStart(this.nextChar())) this.error(Errors.UnexpectedTokenNumber);

        const raw = this.source.substring(start, end);

        if (this.flags & Flags.OptionsRaw) this.tokenRaw = raw;

        this.tokenValue = this.flags & Flags.FloatOrExponent ? parseFloat(raw) : parseInt(raw, 10);

        return Token.NumericLiteral;
    }

    private scanRegularExpression(): Token {
        let index = this.startPos + 1;
        const bodyStart = index;
        let preparseState = RegExpState.Empty;

        loop:
            while (true) {

                const ch = this.source.charCodeAt(index);

                index++;
                this.column++;

                if (preparseState & RegExpState.Escape) {
                    preparseState &= ~RegExpState.Escape;
                } else {
                    switch (ch) {
                        case Chars.Slash:
                            if (!preparseState) break loop;
                            break;
                        case Chars.Backslash:
                            preparseState |= RegExpState.Escape;
                            break;
                        case Chars.LeftBracket:
                            preparseState |= RegExpState.Class;
                            break;
                        case Chars.RightBracket:
                            preparseState &= RegExpState.Escape;
                            break;
                        case Chars.CarriageReturn:
                        case Chars.LineFeed:
                        case Chars.LineSeparator:
                        case Chars.ParagraphSeparator:
                            this.index = index;
                            return this.token;
                        default: // ignore
                    }
                }

                if (index >= this.source.length) this.error(Errors.UnterminatedRegExp);
            }

        const bodyEnd = index - 1; // drop the slash from the slice

        const flagsStart = index;

        let mask = RegExpFlag.None;

        loop:
            while (index < this.source.length) {
                let code = this.source.charCodeAt(index);
                switch (code) {
                    case Chars.LowerG:
                        if (mask & RegExpFlag.Global) this.error(Errors.DuplicateRegExpFlag, 'g');
                        mask |= RegExpFlag.Global;
                        break;

                    case Chars.LowerI:
                        if (mask & RegExpFlag.IgnoreCase) this.error(Errors.DuplicateRegExpFlag, 'i');
                        mask |= RegExpFlag.IgnoreCase;
                        break;

                    case Chars.LowerM:
                        if (mask & RegExpFlag.Multiline) this.error(Errors.DuplicateRegExpFlag, 'm');
                        mask |= RegExpFlag.Multiline;
                        break;

                    case Chars.LowerU:
                        if (mask & RegExpFlag.Unicode) this.error(Errors.DuplicateRegExpFlag, 'u');
                        mask |= RegExpFlag.Unicode;
                        break;

                    case Chars.LowerY:
                        if (mask & RegExpFlag.Sticky) this.error(Errors.DuplicateRegExpFlag, 'y');
                        mask |= RegExpFlag.Sticky;
                        break;

                        // Stage 3 proposal
                    case Chars.LowerS:
                        if (this.flags & Flags.OptionsNext) {
                            if (mask & RegExpFlag.DotAll) this.error(Errors.DuplicateRegExpFlag, 's');
                            mask |= RegExpFlag.DotAll;
                            break;
                        }

                    default:
                        if (code >= 0xd800 && code <= 0xdc00) code = this.nextUnicodeChar();
                        if (!isIdentifierPart(code)) break loop;
                        this.error(Errors.UnexpectedTokenRegExpFlag);
                }
                index++;
                this.column++;
            }

        this.endPos = this.index;
        this.index = index;

        const pattern = this.source.slice(bodyStart, bodyEnd);
        const flags = this.source.slice(flagsStart, this.index);

        this.tokenRegExp = {
            pattern,
            flags
        };

        this.tokenValue = tryCreate(pattern, flags);

        if (this.flags & Flags.OptionsRaw) this.tokenRaw = this.source.slice(this.startPos, this.index);

        return Token.RegularExpression;
    }

    private scanString(context: Context, quote: number): Token {

        const rawStart = this.index;

        this.advance();

        if (!this.hasNext()) this.error(Errors.UnterminatedString);

        let ret = '';

        let start = this.index;
        let ch;

        while (this.hasNext()) {

            ch = this.nextChar();

            if (ch === quote) break;

            switch (ch) {
                case Chars.Backslash:
                    ret += this.source.slice(start, this.index);
                    ret += this.scanStringEscape(context);
                    this.advance();
                    start = this.index;
                    continue;
                case Chars.CarriageReturn:
                case Chars.LineFeed:
                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    this.error(Errors.UnterminatedString);
                default: // ignore
            }

            this.advance();
        }

        if (start !== this.index) ret += this.source.slice(start, this.index);

        if (ch !== quote) this.error(Errors.UnterminatedString);

        this.advance(); // skip the quote

        this.tokenValue = ret;

        // raw
        if (this.flags & Flags.OptionsRaw) this.tokenRaw = this.source.slice(rawStart, this.index);

        return Token.StringLiteral;
    }

    private peekExtendedUnicodeEscape(): any {

        this.advance(); // 'u'

        if (!this.hasNext()) this.error(Errors.Unexpected);

        let ch = this.nextChar();

        // '\u{DDDDDDDD}'
        if (ch === Chars.LeftBrace) { // {

            let code = 0;

            this.advance();

            if (!this.hasNext()) this.error(Errors.InvalidHexEscapeSequence);

            ch = this.nextChar();

            // At least, one hex digit is required.
            if (ch === Chars.RightBrace) this.error(Errors.InvalidHexEscapeSequence);

            while (ch !== Chars.RightBrace) {
                const digit = toHex(ch);
                if (digit < 0) this.error(Errors.InvalidHexEscapeSequence);
                code = (code << 4) | digit;

                if (code > Chars.LastUnicodeChar) this.error(Errors.UnicodeOutOfRange);

                this.advance();

                // At least one digit is expected
                if (!this.hasNext()) this.error(Errors.InvalidHexEscapeSequence);

                ch = this.nextChar();
            }

            if (ch !== Chars.RightBrace) this.error(Errors.InvalidHexEscapeSequence);

            return code;

            // '\uDDDD'
        } else if (this.index + 3 < this.source.length) {

            let code = toHex(ch);
            if (code < 0) this.error(Errors.InvalidHexEscapeSequence);

            for (let i = 0; i < 3; i++) {
                this.advance();
                if (!this.hasNext()) this.error(Errors.InvalidHexEscapeSequence);
                ch = this.nextChar();
                const digit = toHex(ch);
                if (code < 0) this.error(Errors.InvalidHexEscapeSequence);
                code = code << 4 | digit;
            }

            // Invalid:  "'foo\u000u bar'", "'foo\u000U bar'"
            switch (ch) {
                case Chars.LowerU:
                case Chars.UpperU:
                    this.error(Errors.InvalidHexEscapeSequence);
                default: // ignore
            }

            return code;
        }

        this.error(Errors.InvalidUnicodeEscapeSequence);
    }

    private scanStringEscape(context: Context): string {

        this.advance();

        if (!this.hasNext) this.error(Errors.InvalidUnicodeEscapeSequence);

        const cp = this.nextChar();

        switch (cp) {
            case Chars.LowerB:
                return '\b';
            case Chars.LowerT:
                return '\t';
            case Chars.LowerN:
                return '\n';
            case Chars.LowerV:
                return '\v';
            case Chars.LowerF:
                return '\f';
            case Chars.LowerR:
                return '\r';
            case Chars.Backslash:
                return '\\';
            case Chars.SingleQuote:
                return '\'';
            case Chars.DoubleQuote:
                return '\"';

                // Unicode character specification.
            case Chars.LowerU:
                return fromCodePoint(this.peekExtendedUnicodeEscape());
                // Hexadecimal character specification.
            case Chars.LowerX:
                {
                    this.advance();
                    const ch = this.nextChar();
                    if (!this.hasNext()) this.error(Errors.UnterminatedString);
                    const ch1 = this.nextChar();
                    const hi = toHex(ch1);
                    if (hi < 0) this.error(Errors.InvalidHexEscapeSequence);
                    this.advance();
                    if (!this.hasNext()) this.error(Errors.UnterminatedString);
                    const ch2 = this.nextChar();
                    const lo = toHex(ch2);
                    if (lo < 0) this.error(Errors.InvalidHexEscapeSequence);
                    return fromCodePoint(hi << 4 | lo);
                }

                // Octal character specification.
            case Chars.Zero:
                // falls through
            case Chars.One:
                // falls through
            case Chars.Two:
                // falls through
            case Chars.Three:
                {
                    let code = cp - Chars.Zero;
                    let index = this.index + 1;
                    let column = this.column + 1;

                    if (index < this.source.length) {

                        let next = this.source.charCodeAt(index);

                        if (next < Chars.Zero || next > Chars.Seven) {
                            if (code !== 0 && context & Context.Strict) this.error(Errors.StrictOctalLiteral);
                        } else if (context & Context.Strict) {
                            this.error(Errors.StrictOctalLiteral);
                        } else {
                            code = (code << 3) | (next - Chars.Zero);
                            index++;
                            column++;

                            if (index < this.source.length) {
                                next = this.source.charCodeAt(index);

                                if (next >= Chars.Zero && next <= Chars.Seven) {
                                    code = (code << 3) | (next - Chars.Zero);
                                    index++;
                                    column++;
                                }
                            }

                            this.index = index - 1;
                            this.column = column - 1;
                        }
                    }

                    return String.fromCharCode(code);
                }

            case Chars.Four:
                // falls through
            case Chars.Five:
                // falls through
            case Chars.Six:
                // falls through
            case Chars.Seven:
                {
                    if (context & Context.Strict) this.error(Errors.StrictOctalEscape);

                    let code = cp - Chars.Zero;
                    const index = this.index + 1;
                    const column = this.column + 1;

                    if (index < this.source.length) {
                        const next = this.source.charCodeAt(index);

                        if (next >= Chars.Zero && next <= Chars.Seven) {
                            code = (code << 3) | (next - Chars.Zero);
                            this.index = index;
                            this.column = column;
                        }
                    }

                    return String.fromCharCode(code);
                }

            case Chars.Eight:
                // falls through
            case Chars.Nine:
                this.error(Errors.InvalidEightAndNine);
            case Chars.CarriageReturn:
                // Allow escaped CR+LF newlines in multiline string literals.
                if (this.hasNext() && this.nextChar() === Chars.LineFeed) this.advance();
            case Chars.LineFeed:
            case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                this.column = -1;
                this.line++;
                return '';
            default:
                // Other escaped characters are interpreted as their non-escaped version.
                return this.source.charAt(cp);
        }
    }

    private scanJSXIdentifier(context: Context) {
        switch (this.token) {
            case Token.Identifier:
                const firstCharPosition = this.index;
                scan:
                    while (this.hasNext()) {
                        const ch = this.nextChar();
                        switch (ch) {
                            case Chars.Hyphen:
                                this.advance();
                                break;
                            default:
                                if ((firstCharPosition === this.index) ? isIdentifierStart(ch) : isIdentifierPart(ch)) {
                                    this.advance();
                                } else {
                                    break scan;
                                }
                        }
                    }

                this.tokenValue += this.source.slice(firstCharPosition, this.index - firstCharPosition);
            default:
                return this.token;
        }
    }

    private scanTemplateNext(context: Context): Token {
        if (!this.hasNext()) this.error(Errors.Unexpected);
        this.index--;
        this.column--;
        return this.scanTemplate(context);
    }

    private scanTemplate(context: Context): Token {
        const start = this.index;
        let tail = true;
        let ret: string | void = '';

        this.advance();

        if (!this.hasNext()) this.error(Errors.UnterminatedTemplate);

        let ch = this.nextChar();

        loop:
            while (ch !== Chars.Backtick) {

                switch (ch) {
                    case Chars.Dollar:
                        {
                            const index = this.index + 1;
                            if (index < this.source.length &&
                                this.source.charCodeAt(index) === Chars.LeftBrace) {
                                this.index = index;
                                this.column++;
                                tail = false;
                                break loop;
                            }
                            ret += '$';
                            break;
                        }

                    case Chars.Backslash:
                        this.advance();
                        if (!this.hasNext()) this.error(Errors.UnterminatedTemplate);

                        if (ch >= 128) {
                            ret += fromCodePoint(ch);
                        } else {
                            ret += this.scanStringEscape(context);
                        }

                        break;

                    case Chars.CarriageReturn:
                        if (this.hasNext() && this.nextChar() === Chars.LineFeed) {
                            if (ret != null) ret += fromCodePoint(ch);
                            ch = this.nextChar();
                            this.index++;
                        }
                    case Chars.LineFeed:
                    case Chars.LineSeparator:
                    case Chars.ParagraphSeparator:
                        this.column = -1;
                        this.line++;
                    default:
                        if (ret != null) ret += fromCodePoint(ch);
                }

                this.advance();

                if (!this.hasNext()) this.error(Errors.UnterminatedTemplate);

                ch = this.nextChar();
            }

        this.advance();

        this.tokenValue = ret;

        if (tail) {
            this.tokenRaw = this.source.slice(start + 1, this.index - 1);
            return Token.TemplateTail;
        } else {
            this.tokenRaw = this.source.slice(start + 1, this.index - 2);
            return Token.TemplateCont;
        }
    }

    private ParseModuleItemList(context: Context): ESTree.Statement[] {
        // ecma262/#prod-Module
        // Module :
        //    ModuleBody?
        //
        // ecma262/#prod-ModuleItemList
        // ModuleBody :
        //   ModuleItem*
        const pos = this.getLocations();
        this.nextToken(context);

        const statements: ESTree.Statement[] = [];

        while (this.token !== Token.EndOfSource) {
            statements.push(this.parseModuleItem(context));
        }

        return statements;
    }

    private parseStatementList(context: Context, endToken: Token): ESTree.Statement[] {

        const statements: ESTree.Statement[] = [];

        while (this.token !== endToken) {
            if (this.token !== Token.StringLiteral) break;
            const item: ESTree.Statement = this.parseStatementListItem(context);
            statements.push(item);
            if (!isDirective(item)) break;
            if (item.expression.value === 'use strict') {
                context |= Context.Strict;
                break;
            }
        }

        while (this.token !== endToken) {
            statements.push(this.parseStatementListItem(context));
        }

        return statements;
    }

    private getLocations(): Location {
        return {
            start: this.startPos,
            line: this.startLine,
            column: this.startColumn
        };
    }

    private finishNode(loc: Location, node: any) {

        if (this.flags & Flags.OptionsRanges) {
            node.start = loc.start;
            node.end = this.endPos;
        }

        if (this.flags & Flags.OptionsLoc) {

            node.loc = {
                start: {
                    line: loc.line,
                    column: loc.column,
                },
                end: {
                    line: this.endLine,
                    column: this.endColumn
                }
            };
        }

        return node;
    }

    private parseOptional(context: Context, t: Token): boolean {
        if (this.token !== t) return false;
        this.nextToken(context);
        return true;
    }

    private expect(context: Context, t: Token) {
        if (this.token !== t) this.error(Errors.UnexpectedToken, tokenDesc(t));
        this.nextToken(context);
    }

    private isEvalOrArguments(value: string): boolean {
        return value === 'eval' || value === 'arguments';
    }

    private canConsumeSemicolon(): boolean {

        // Bail out quickly if we have seen a LineTerminator
        if (this.flags & Flags.LineTerminator) return true;

        switch (this.token) {
            case Token.Semicolon:
            case Token.RightBrace:
            case Token.EndOfSource:
                return true;
            default:
                return false;
        }
    }

    /**
     * Consume a semicolon between tokens, optionally inserting it if necessary.
     */
    private consumeSemicolon(context: Context) {
        if (!this.canConsumeSemicolon()) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        if (this.token === Token.Semicolon) this.expect(context, Token.Semicolon);
    }

    private isIdentifier(context: Context, t: Token): boolean {
        if (context & Context.Strict) {
            if (context & Context.Module) {
                if (t === Token.AwaitKeyword) this.error(Errors.UnexpectedReservedWord);
                if ((t & Token.FutureReserved) === Token.FutureReserved) this.error(Errors.UnexpectedStrictReserved);
            }
            return t === Token.Identifier || (t & Token.Contextual) === Token.Contextual;
        }
        if (context & Context.SimpleArrow) {
            if ((t & Token.Reserved) === Token.Reserved) this.error(Errors.UnexpectedStrictReserved);
        }
        return t === Token.Identifier || (t & Token.Keyword) === Token.Keyword;
    }

    private nextTokenIsFuncKeywordOnSameLine(context: Context): boolean {
        this.peekToken(context);
        return this.line === this.peekedState.line && this.peekedToken === Token.FunctionKeyword;
    }

    private parseModuleItem(context: Context): any {}

    private parseStatementListItem(context: Context): any {

        switch (this.token) {
            case Token.FunctionKeyword:
                return this.parseFunctionDeclaration(context);

            default:
                return this.parseStatement(context);
        }
    }

    private parseStatement(context: Context): any {
        switch (this.token) {
            case Token.Identifier:
                return this.parseLabelledStatement(context);
                // VariableStatement[?Yield]
                // [+Return] ReturnStatement[?Yield]
            case Token.ReturnKeyword:
                return this.parseReturnStatement(context);
                // AsyncFunctionDeclaration[Yield, Await, Default]
            case Token.AsyncKeyword:
                // Here we do a quick lookahead so we just need to parse out the
                // 'AsyncFunctionDeclaration'. The 'parsePrimaryExpression' will do the
                // heavy work for us. I doubt this will cause any performance loss, but
                // if so is the case - this can be reverted later on.
                // J.K. Thomas
                if (this.nextTokenIsFuncKeywordOnSameLine(context)) return this.parseFunctionDeclaration(context);
                // 'Async' is a valid contextual keyword in sloppy mode for labelled statement, so either
                // parse out 'LabelledStatement' or an plain identifier
                return this.parseLabelledStatement(context);
            default:
                return this.parseExpressionStatement(context);
        }
    }

    private parseFunctionDeclaration(context: Context): any {}

    private parseReturnStatement(context: Context): ESTree.ReturnStatement {
        const pos = this.getLocations();

        if (!(this.flags & Flags.InFunctionBody)) this.error(Errors.IllegalReturn);

        this.expect(context, Token.ReturnKeyword);

        let argument: ESTree.Expression | null = null;

        if (!this.canConsumeSemicolon()) argument = this.parseExpression(context, pos);

        this.consumeSemicolon(context);

        return this.finishNode(pos, {
            type: 'ReturnStatement',
            argument
        });
    }

    private parseLabelledStatement(context: Context): ESTree.LabeledStatement | ESTree.ExpressionStatement {
        const pos = this.getLocations();
        const token = this.token;
        const expr = this.parseExpression(context | Context.AllowIn, pos);

        if (this.token === Token.Colon && expr.type === 'Identifier') {

            this.expect(context, Token.Colon);

            const key = '@' + expr.name;
            if (this.labelSet === undefined) this.labelSet = {};
            else if (this.labelSet[key] === true) this.error(Errors.Redeclaration, expr.name);

            this.labelSet[key] = true;
            let body: ESTree.Statement;

            if (this.token === Token.FunctionKeyword) {
                // '13.1.1 - Static Semantics: ContainsDuplicateLabels', says it's a syntax error if
                // LabelledItem: FunctionDeclaration is ever matched. Annex B.3.2 changes this behaviour.
                if (context & Context.Strict) this.error(Errors.StrictFunction);
                // AnnexB allows function declaration as labels, but not async func or generator func because the
                // generator declaration is only matched by a hoistable declaration in StatementListItem.
                // To fix this we need to pass the 'AnnexB' mask, and let it throw in 'parseFunctionDeclaration'
                // We also unset the 'ForStatement' mask because we are no longer inside a 'ForStatement'.
                body = this.parseFunctionDeclaration(context);
            } else {
                body = this.parseStatement(context);
            }

            this.labelSet[key] = false;

            return this.finishNode(pos, {
                type: 'LabeledStatement',
                label: expr,
                body
            });
        } else {

            this.consumeSemicolon(context);
            return this.finishNode(pos, {
                type: 'ExpressionStatement',
                expression: expr
            });
        }
    }

    private parseExpressionStatement(context: Context): ESTree.ExpressionStatement {
        const pos = this.getLocations();
        const expr = this.parseExpression(context, pos);
        this.consumeSemicolon(context);
        return this.finishNode(pos, {
            type: 'ExpressionStatement',
            expression: expr
        });
    }

    private parseExpression(context: Context, pos: Location): ESTree.Expression {
        const expr = this.parseAssignmentExpression(context);
        if (this.token !== Token.Comma) return expr;

        const expressions: ESTree.Expression[] = [expr];
        while (this.parseOptional(context, Token.Comma)) {
            expressions.push(this.parseAssignmentExpression(context));
        }

        return this.finishNode(pos, {
            type: 'SequenceExpression',
            expressions
        });
    }

    private isValidArrowBindingIdentifier(t: Token): boolean | undefined {
        switch (t) {
            case Token.Identifier:
            case Token.YieldKeyword:
                return true;
            default:
                this.error(Errors.UnexpectedToken, tokenDesc(t));
        }
    }

    private parseAssignmentExpression(context: Context): ESTree.AssignmentExpression | ESTree.ArrowFunctionExpression {
        const pos = this.getLocations();
        const token = this.token;
        const tokenValue = this.tokenValue;
        const expr = this.parseConditionalExpression(context, pos);

        // If that's the case - parse out a arrow function with a single un-parenthesized parameter.
        // An async one, will be parsed out in 'parsePrimaryExpression'
        if (this.token === Token.Arrow && this.isIdentifier(context | Context.SimpleArrow, token)) {
            if (context & Context.Strict && this.isEvalOrArguments(tokenValue)) this.error(Errors.UnexpectedStrictReserved);
            if (!(this.flags & Flags.LineTerminator)) return this.parseArrowFunction(context | Context.SimpleArrow, pos, [expr]);
        }

        if (hasMask(this.token, Token.AssignOperator)) {
            const operator = this.token;
            if (!(context & Context.inParameter) && this.token === Token.Assign) {
                this.reinterpretAsPattern(context, expr);
            }
            this.nextToken(context);

            const right = this.parseAssignmentExpression(context);

            return this.finishNode(pos, {
                type: 'AssignmentExpression',
                left: expr,
                operator: tokenDesc(operator),
                right: right
            });
        }
        return expr;
    }

    private reinterpretAsPattern(context: Context, params: any) {
        switch (params.type) {
            case 'Identifier':
                if (context & Context.ArrowParameterList) this.addFunctionArg(params.name);
                return;

            case 'ObjectExpression':
                params.type = 'ObjectPattern';
                // Fall through
            case 'ObjectPattern':
                // ObjectPattern and ObjectExpression are isomorphic
                for (let i = 0; i < params.properties.length; i++) {
                    const property = params.properties[i];
                    if (property.kind !== 'init') this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                    this.reinterpretAsPattern(context, property.type === 'SpreadElement' ? property : property.value);
                }
                return;

            case 'ArrayExpression':
                params.type = 'ArrayPattern';
                // Fall through
            case 'ArrayPattern':
                for (let i = 0; i < params.elements.length; ++i) {
                    // skip holes in pattern
                    if (params.elements[i] !== null) this.reinterpretAsPattern(context, params.elements[i]);
                }
                return;

            case 'AssignmentExpression':
                params.type = 'AssignmentPattern';
                delete params.operator;
                // Fall through
            case 'AssignmentPattern':
                this.reinterpretAsPattern(context, params.left);
                return;

            case 'SpreadElement':
                params.type = 'RestElement';
                // Fall through
            case 'RestElement':
                this.reinterpretAsPattern(context, params.argument);
                return;

            case 'MemberExpression':
            case 'MetaProperty':
                if (!(context & Context.ArrowParameterList)) return;
                // Fall through

            default:
                this.error(Errors.UnexpectedToken, params.type);
        }
    }
    private parseArrowFormalList(context: Context, params: ESTree.Node[]): ESTree.Node[] {

        for (let idx = 0; idx < params.length; idx++) {
            this.reinterpretAsPattern(context | Context.ArrowParameterList, params[idx]);
        }

        return params;
    }

    private parseArrowFunction(context: Context, pos: Location, params: any[]): ESTree.ArrowFunctionExpression {
        // ArrowFunction[In, Yield]:
        // ArrowParameters[?Yield][no LineTerminator here]=>ConciseBody[?In]
        if (this.flags & Flags.LineTerminator) this.error(Errors.LineBreakAfterAsync);
        this.expect(context, Token.Arrow);

        const savedScope = this.enterFunctionScope();

        if (!(context & Context.SimpleArrow)) this.parseArrowFormalList(context, params);

        let body;
        let expression = false;

        if (this.token === Token.LeftBrace) {
            if (!(this.flags & Flags.DisallowCall)) this.flags |= Flags.DisallowCall;
            body = this.parseFunctionBody(context);
        } else {
            body = this.parseConciseBody(context);
            expression = true;
        }

        this.exitFunctionScope(savedScope);

        return this.finishNode(pos, {
            type: 'ArrowFunctionExpression',
            body,
            params,
            id: null,
            async: !!(context & Context.Await),
            generator: !!(context & Context.Yield),
            expression
        });
    }

    private parseConciseBody(context: Context): any {
        return this.parseAssignmentExpression(context | Context.AllowIn);
    }

    private parseConditionalExpression(context: Context, pos: Location): any {
        const expr = this.parseBinaryExpression(context, 0, pos);
        if (!this.parseOptional(context, Token.QuestionMark)) return expr;
    }

    private parseBinaryExpression(context: Context, precedence: number, pos: Location, expr: any = this.parseUnaryExpression(context, pos)): any {

        while (true) {

            const newPrecedence = this.token & Token.Precedence;

            if (!(context & Context.AllowIn) && this.token === Token.InKeyword) break;

            const operator = this.token === Token.Exponentiate ? newPrecedence >= precedence : newPrecedence > precedence;

            if (!operator) break;

            const binaryOperator = this.token;

            this.nextToken(context);

            expr = this.finishNode(pos, {
                type: (binaryOperator === Token.LogicalAnd || binaryOperator === Token.LogicalOr) ?
                    'LogicalExpression' : 'BinaryExpression',
                left: expr,
                right: this.parseBinaryExpression(context, newPrecedence, this.getLocations()),
                operator: tokenDesc(binaryOperator)
            });
        }

        return expr;
    }

    // 12.5 Unary Operators
    private parseUnaryExpression(context: Context, pos: Location): any {

        if (context & Context.Await && this.token === Token.AwaitKeyword) {
            return this.parseAwaitExpression(context);
        }

        let expr;

        if (hasMask(this.token, Token.UnaryOperator)) {

            const token = this.token;
            this.nextToken(context);
            expr = this.finishNode(pos, {
                type: 'UnaryExpression',
                operator: tokenDesc(token),
                argument: this.parseUnaryExpression(context, pos),
                prefix: true
            });
        } else {
            expr = this.parseUpdateExpression(context, pos);
        }

        return this.parseExponentiationExpression(context, expr, pos);
    }

    private parseAwaitExpression(context: Context): ESTree.AwaitExpression {
        const pos = this.getLocations();
        this.expect(context, Token.AwaitKeyword);
        const argument = this.parseUnaryExpression(context, pos);
        return this.finishNode(pos, {
            type: 'AwaitExpression',
            argument
        });
    }

    // 12.6 Exponentiation Operator
    private parseExponentiationExpression(context: Context, expr: any, pos: Location): any {
        if (this.token !== Token.Exponentiate) return expr;
        const precedence = hasMask(this.token, Token.BinaryOperator) ? this.token & Token.Precedence : 0;
        return this.parseBinaryExpression(context, precedence, pos, expr);
    }

    private parseUpdateExpression(context: Context, pos: Location): any {
        let expr: any;

        if (hasMask(this.token, Token.UpdateOperator)) {
            const token = this.token;
            this.nextToken(context);
            expr = this.finishNode(pos, {
                type: 'UpdateExpression',
                argument: this.parseUnaryExpression(context, pos),
                operator: tokenDesc(token),
                prefix: true
            });
        } else {

            expr = this.parseLeftHandSideExpression(context, pos);

            if (!(this.flags & Flags.LineTerminator) && hasMask(this.token, Token.UpdateOperator)) {
                const token = this.token;
                expr = this.finishNode(pos, {
                    type: 'UpdateExpression',
                    argument: expr,
                    operator: tokenDesc(token),
                    prefix: false
                });
            }
        }

        return expr;
    }

    // 12.3 Left-Hand-Side Expressions

    private parseLeftHandSideExpression(context: Context, pos: Location, expr: any = this.parsePrimaryExpression(context, pos)): any {
        // LeftHandSideExpression[Yield]:
        // NewExpression[?Yield]
        // CallExpression[?Yield]

        if (this.flags & Flags.DisallowCall) {
            this.flags &= ~Flags.DisallowCall;
            return expr;
        }

        while (true) {
            switch (this.token) {

                // '.'
                case Token.Period:
                    {
                        this.expect(context, Token.Period);
                        const property = this.parseIdentifier(context);

                        expr = this.finishNode(pos, {
                            type: 'MemberExpression',
                            object: expr,
                            computed: false,
                            property,
                        });
                        break;
                    }

                    // '('
                case Token.LeftParen:

                    const args = this.parseArguments(context & ~Context.inParameter, pos);
                    expr = this.finishNode(pos, {
                        type: 'CallExpression',
                        callee: expr,
                        arguments: args
                    });

                    break;

                    // '['
                case Token.LeftBracket:
                    {
                        this.expect(context, Token.LeftBracket);
                        const start = this.getLocations();
                        const property = this.parseExpression(context | Context.AllowIn, start);
                        this.expect(context, Token.RightBracket);
                        expr = this.finishNode(pos, {
                            type: 'MemberExpression',
                            object: expr,
                            computed: true,
                            property,
                        });
                        break;
                    }

                default:
                    return expr;
            }
        }
    }

    // 14.6 Async Function Definitions
    private parseFunctionExpression(context: Context) {
        // async[no LineTerminator here]function(FormalParameters[~Yield, +Await]){AsyncFunctionBody}
        // async[no LineTerminator here]functionBindingIdentifier[~Yield, +Await](FormalParameters[~Yield, +Await]){AsyncFunctionBody}
    }

    private parseAsyncFunctionExpression(
        context: Context,
        pos: Location
    ): ESTree.CallExpression | ESTree.ArrowFunctionExpression | ESTree.Identifier | void {
        // Note: We are "bending" the EcmaScript specs a litle, and expand
        // the AsyncFunctionExpression production to also deal with
        // CoverCallExpressionAndAsyncArrowHead and AsyncArrowFunction productions.
        // This to avoid complications with the CoverCallExpressionAndAsyncArrowHead production
        // and ArrowFunction production where the latter has to parse out programs. like:
        //
        //  async a => {}
        //  () => {}
        //
        // Actually this is not a direct ECMAScript spec violation, and we gain performance this way.

        const id = this.parseIdentifier(context);

        switch (this.token) {

            // 'parseAsyncFunctionExpression'
            case Token.FunctionKeyword:
                // The specs says "async[no LineTerminator here]", so just return an plain identifier in case
                // we got an LineTerminator. The 'FunctionExpression' will be parsed out in 'parsePrimaryExpression'
                if (this.flags & Flags.LineTerminator) return id;
                return this.parseFunctionExpression(context | Context.Await);

                // 'AsyncArrowFunction[In, Yield, Await]'
            case Token.YieldKeyword:
            case Token.Identifier:
                // The specs says "async[no LineTerminator here]", so just return an plain identifier in case
                // we got an LineTerminator. The 'ArrowFunctionExpression' will be parsed out in 'parseAssignmentExpression'
                if (this.flags & Flags.LineTerminator) return id;
                const expr = this.parseIdentifier(context);
                if (this.token === Token.Arrow) return this.parseArrowFunction(context | Context.Await, pos, [expr]);
                // Invalid: 'async abc'
                this.error(Errors.UnexpectedToken, tokenDesc(this.token));

                // CoverCallExpressionAndAsyncArrowHead[Yield, Await]:
            case Token.LeftParen:
                // This could be either a CallExpression or the head of an async arrow function
                const args = this.parseArguments(context, pos);
                if (this.token === Token.Arrow) {
                    // Invalid: 'async[LineTerminator here] () => {}'
                    if (this.flags & Flags.LineTerminator) this.error(Errors.LineBreakAfterThrow);
                    return this.parseArrowFunction(context | Context.Await, pos, args);
                }
                return this.finishNode(pos, {
                    type: 'CallExpression',
                    callee: id,
                    arguments: args
                });
            default:
                // Async as Identifier
                return id;
        }
    }

    private parseFunctionBody(context: Context): ESTree.BlockStatement {
        const pos = this.getLocations();
        this.expect(context, Token.LeftBrace);
        const previousLabelSet = this.labelSet;
        this.labelSet = undefined;
        this.flags |= Flags.InFunctionBody;
        const body = this.parseStatementList(context, Token.RightBrace);
        this.expect(context, Token.RightBrace);
        this.labelSet = previousLabelSet;
        return this.finishNode(pos, {
            type: 'BlockStatement',
            body
        });
    }

    private parseSpreadElement(context: Context): ESTree.SpreadElement {
        const pos = this.getLocations();
        // Disallow SpreadElement inside dynamic import
        this.expect(context, Token.Ellipsis);
        const arg = this.parseAssignmentExpression(context);
        return this.finishNode(pos, {
            type: 'SpreadElement',
            argument: arg
        });
    }

    private parseArguments(context: Context, pos: Location): ESTree.Expression[] {
        this.expect(context, Token.LeftParen);
        const args: any[] = [];
        if (this.token !== Token.RightParen) {
            while (true) {
                const expr = this.token === Token.Ellipsis ? this.parseSpreadElement(context) :
                    this.parseAssignmentExpression(context);
                args.push(expr);

                if (this.token === Token.RightParen) {
                    break;
                }
                this.expect(context, Token.Comma);
                if (this.token === Token.RightParen) {
                    break;
                }
            }
        }
        this.expect(context, Token.RightParen);

        return args;
    }

    private parsePrimaryExpression(context: Context, pos: Location) {

        switch (this.token) {
            case Token.NumericLiteral:
            case Token.StringLiteral:
                return this.parseLiteral(context);
            case Token.YieldKeyword:
            case Token.Identifier:
                return this.parseIdentifier(context);
            case Token.LeftParen:
                return this.parseParenthesizedExpression(context | Context.InParenthesis);
            case Token.AsyncKeyword:
                return this.parseAsyncFunctionExpression(context, pos);
            default:
                if (!this.isIdentifier(context, this.token)) {
                    return this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                }
                return this.parseIdentifier(context);
        }
    }

    private parseRestElement(context: Context) {
        const pos = this.getLocations();
        this.expect(context, Token.Ellipsis);
        const argument = this.parseBindingPatternOrIdentifier(context, pos);
        if (this.token === Token.Assign) this.error(Errors.DefaultRestParameter);
        if (this.token !== Token.RightParen) this.error(Errors.ParameterAfterRestParameter);
        return this.finishNode(pos, {
            type: 'RestElement',
            argument
        });
    }

    private parseParenthesizedExpression(context: Context) {

        const pos = this.getLocations();
        this.expect(context, Token.LeftParen);

        let state = ParenthesizedState.None;

        if (this.parseOptional(context, Token.RightParen)) {
            if (this.token === Token.Arrow) return this.parseArrowFunction(context, pos, []);
            this.error(Errors.MissingArrowAfterParentheses);
        }

        let expr: ESTree.Expression;

        if (this.token === Token.Ellipsis) {
            expr = this.parseRestElement(context);
            this.expect(context, Token.RightParen);
            return this.parseArrowFunction(context, pos, [expr]);
        }

        const sequencePos = this.getLocations();

        if (context & Context.Strict) {
            if (!(state & ParenthesizedState.EvalOrArg) && this.isEvalOrArguments(this.tokenValue)) {
                state |= ParenthesizedState.EvalOrArg;
            }
            if (!(state & ParenthesizedState.Yield) && this.token === Token.YieldKeyword) {
                state |= ParenthesizedState.Yield;
            }
        }

        expr = this.parseAssignmentExpression(context);

        if (this.token === Token.Comma) {

            const expressions: ESTree.Expression[] = [expr];

            while (this.parseOptional(context, Token.Comma)) {
                if (this.parseOptional(context, Token.RightParen)) {
                    return this.parseArrowFunction(context, pos, expressions);
                } else if (this.token === Token.Ellipsis) {
                    expressions.push(this.parseRestElement(context));
                    this.expect(context, Token.RightParen);
                    return this.parseArrowFunction(context, pos, expressions);
                } else {
                    if (context & Context.Strict) {
                        if (!(state & ParenthesizedState.EvalOrArg) && this.isEvalOrArguments(this.tokenValue)) {
                            state |= ParenthesizedState.EvalOrArg;
                        }
                        if (!(state & ParenthesizedState.Yield) && this.token === Token.YieldKeyword) {
                            state |= ParenthesizedState.Yield;
                        }
                    }
                    expressions.push(this.parseAssignmentExpression(context));
                }
            }

            expr = this.finishNode(sequencePos, {
                type: 'SequenceExpression',
                expressions
            });
        }

        this.expect(context, Token.RightParen);

        if (this.token === Token.Arrow) {
            if (state & ParenthesizedState.EvalOrArg) this.error(Errors.StrictParamName);
            if (state & ParenthesizedState.Yield) this.error(Errors.InvalidArrowYieldParam);
            return this.parseArrowFunction(context, pos, expr.type === 'SequenceExpression' ? expr.expressions : [expr]);
        }


        return expr;
    }

    private parseLiteral(context: Context): ESTree.Literal {
        const pos = this.getLocations();
        const value = this.tokenValue;
        const raw = this.tokenRaw;

        if (context & Context.Strict && this.flags & Flags.Noctal) {

            this.error(Errors.Unexpected);
        }

        this.nextToken(context);

        const node = this.finishNode(pos, {
            type: 'Literal',
            value
        });

        if (this.flags & Flags.OptionsRaw) node.raw = raw;

        return node;
    }

    private parseIdentifier(context: Context): ESTree.Identifier {
        const name = this.tokenValue;
        const pos = this.getLocations();
        this.nextToken(context);

        return this.finishNode(pos, {
            type: 'Identifier',
            name
        });
    }

    /****
     * Scope
     */

    // Fast path for catch arguments
    private addCatchArg(name: string, type: ScopeMasks = ScopeMasks.Shadowable) {
        this.initBlockScope();
        this.blockScope[name] = type;
    }

    private initBlockScope(): boolean {
        if (this.functionScope == null) {
            this.functionScope = Object.create(null);
            this.blockScope = Object.create(this.functionScope);
            this.parentScope = this.blockScope;
        } else if (this.blockScope == null) {
            this.blockScope = Object.create(this.parentScope);
            this.parentScope = this.blockScope;
        } else {
            return false;
        }

        return true;
    }

    private initFunctionScope(): boolean {
        if (this.functionScope !== undefined) return false;
        this.functionScope = Object.create(null);
        this.blockScope = this.functionScope;
        this.parentScope = this.functionScope;
        return true;
    }

    private addFunctionArg(name: string) {
        if (!this.initFunctionScope() && name in this.functionScope) this.error(Errors.DuplicateIdentifier, name);
        this.functionScope[name] = ScopeMasks.Shadowable;
    }

    private addVarOrBlock(context: Context, name: string) {
        if (context & Context.Lexical) {
            this.addBlockName(name);
        } else {
            this.addVarName(name);
        }
    }

    private addVarName(name: string) {
        if (!this.initFunctionScope() && this.blockScope !== undefined &&
            this.blockScope[name] === ScopeMasks.NonShadowable) {
            this.error(Errors.DuplicateIdentifier, name);
        }
        this.functionScope[name] = ScopeMasks.Shadowable;
    }

    private addBlockName(name: string) {
        switch (name) {
            case 'Infinity':
            case 'NaN':
            case 'undefined':
                this.error(Errors.DuplicateIdentifier, name);
            default: // ignore
        }

        if (!this.initBlockScope() && (
                // Check `var` variables
                this.blockScope[name] === ScopeMasks.Shadowable ||
                // Check variables in current block only
                hasOwn.call(this.blockScope, name)
            )) {
            this.error(Errors.DuplicateIdentifier, name);
        }

        this.blockScope[name] = ScopeMasks.NonShadowable;
    }

    private enterFunctionScope() {

        const functionScope = this.functionScope;
        const blockScope = this.blockScope;
        const parentScope = this.parentScope;

        this.functionScope = undefined;
        this.blockScope = undefined;
        this.parentScope = undefined;

        return {
            functionScope,
            blockScope,
            parentScope
        };
    }

    private exitFunctionScope(t: any) {
        this.functionScope = t.functionScope;
        this.blockScope = t.blockScope;
        this.parentScope = t.parentScope;
    }

    /****
     * Pattern
     */

    private parseAssignmentPattern(context: Context): ESTree.AssignmentPattern {
        const pos = this.getLocations();
        const pattern = this.parseBindingPatternOrIdentifier(context, pos);
        if (!this.parseOptional(context, Token.Assign)) return pattern;

        if (context & Context.inParameter && context & Context.Yield && this.token === Token.YieldKeyword) this.error(Errors.Unexpected);
        const right = this.parseAssignmentExpression(context);
        return this.finishNode(pos, {
            type: 'AssignmentPattern',
            left: pattern,
            right
        });
    }

    private parseBindingPatternOrIdentifier(context: Context, pos: Location) {
        switch (this.token) {
            case Token.LeftBracket:
                return this.parseAssignmentElementList(context);
            case Token.LeftBrace:
                return this.ObjectAssignmentPattern(context, pos);
            case Token.Identifier:
                if (context & Context.inParameter && context & Context.Strict) this.addFunctionArg(this.tokenValue);
                return this.parseBindingIdentifier(context);
            case Token.LetKeyword:
                if (context & Context.Lexical) this.error(Errors.LetInLexicalBinding);
            default:
                if (!this.isIdentifier(context, this.token)) this.error(Errors.Unexpected);
                return this.parseBindingIdentifier(context);
        }
    }

    private parseBindingIdentifier(context: Context): ESTree.Identifier {

        const pos = this.getLocations();

        const name = this.tokenValue;
        const token = this.token;

        if (this.isEvalOrArguments(name)) {
            if (context & Context.Strict) this.error(Errors.StrictLHSAssignment);
        }

        if (this.flags & Flags.HasUnicode && this.token === Token.YieldKeyword) this.error(Errors.InvalidEscapedReservedWord);
        if (this.token === Token.Identifier) this.addVarOrBlock(context, name);

        this.nextToken(context);

        return this.finishNode(pos, {
            type: 'Identifier',
            name
        });
    }

    private parseAssignmentElementList(context: Context): any {}
    private ObjectAssignmentPattern(context: Context, pos: Location): any {}

}