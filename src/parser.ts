import { Chars } from './chars';
import * as ESTree from './estree';
import { hasOwn, toHex, tryCreate, fromCodePoint, hasMask, isValidDestructuringAssignmentTarget, isDirective, getQualifiedJSXName, isValidSimpleAssignmentTarget } from './common';
import { Flags, Context, RegExpState, RegExpFlag, ScopeMasks, ObjectState, AsyncState } from './masks';
import { createError, Errors } from './errors';
import { Token, tokenDesc, descKeyword } from './token';
import { isValidIdentifierStart, isvalidIdentifierContinue, isIdentifierStart, isIdentifierPart } from './unicode';
import { Options, SavedState, CollectComments, ErrorLocation, Location } from './interface';

export const enum Comments {
    Multi,
    Single
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

    private throwError(type: Errors, ...params: string[]): void {
        const loc: any = this.errorLocation;
        throw createError(type, this.errorLocation, ...params);
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

        while (this.hasNext()) {

            this.startPos = this.index;
            this.startColumn = this.column;
            this.startLine = this.line;

            const first = this.nextChar();

            switch (first) {
                case Chars.CarriageReturn:
                case Chars.LineFeed:
                    this.advanceNewline();
                    if (this.hasNext() &&
                        first === Chars.CarriageReturn &&
                        this.nextChar() === Chars.LineFeed) {
                        this.index++;
                    }
                    continue;

                    // 0x7F > chars
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
                            this.skipSingleMultiLineComment(true, 2);
                            continue;
                        } else if (next === Chars.Asterisk) {
                            this.advance();
                            this.skipSingleMultiLineComment(false, 0);
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
                                this.skipSingleMultiLineComment(true, 4);
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
                                    this.skipSingleMultiLineComment(true, 3);
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
                            this.skipShebangComment();
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
                        } else if (next === Chars.GreaterThan) {
                            this.advance();
                            return Token.Pipeline;
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

    private skipShebangComment() {

        loop: while (this.hasNext()) {

            switch (this.nextChar()) {
                case Chars.LineFeed:
                case Chars.CarriageReturn:
                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    this.advanceNewline();
                    if (this.hasNext() && this.nextChar() === Chars.LineFeed) this.index++;
                    break loop;
                default:
                    this.advance();
            }
        }
    }

    private skipSingleMultiLineComment(context: boolean, offset: number) {

        const start = this.index;
        let closed = false;
        let type: any = 'SingleLineComment';

        if (context) closed = true;

        loop:
            while (this.hasNext()) {
                const ch = this.nextChar();

                switch (ch) {

                    // '*'
                    case Chars.Asterisk:
                        this.advance();
                        if (this.consume(Chars.Slash)) {
                            closed = true;
                            type = 'MultiLineComment';
                            break loop;
                        }
                        break;
                    // Line Terminators
                    case Chars.CarriageReturn:
                    case Chars.LineSeparator:
                    case Chars.ParagraphSeparator:
                    case Chars.LineFeed:
                        this.advanceNewline();
                        if (this.hasNext() && this.nextChar() === Chars.LineFeed) this.index++;
                        if (context) break loop;
                        break;
                    default:
                        this.advance();
                }
            }

        if (!closed) this.error(Errors.UnterminatedComment);

        if (this.flags & Flags.OptionsOnComment) {
            let index = this.index;
            if (!context) index = this.index - 2;
            this.collectComment(type, this.source.slice(start, index), this.startPos, this.index);
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
                if (this.flags & Flags.HasNonSimpleParameter) this.error(Errors.IllegalUseStrict);
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

    private nextTokenIsFuncKeywordOnSameLine(context: Context): boolean {
        this.peekToken(context);
        return this.line === this.peekedState.line && this.peekedToken === Token.FunctionKeyword;
    }

    private isIdentifier(context: Context, t: Token): boolean {
        if (context & Context.Module) {
            if ((t & Token.FutureReserved) === Token.FutureReserved) this.error(Errors.UnexpectedStrictReserved);
            return t === Token.Identifier || (t & Token.Contextual) === Token.Contextual;
        }
        if (context & Context.Strict) {
            if ((t & Token.Reserved) === Token.Reserved) this.error(Errors.UnexpectedStrictReserved);
            return t === Token.Identifier || (t & Token.Contextual) === Token.Contextual;
        }
        return t === Token.Identifier || (t & Token.Contextual) === Token.Contextual || (t & Token.FutureReserved) === Token.FutureReserved;
    }

    private isIdentifierOrKeyword(t: Token) {
        switch (t) {
            case Token.Identifier:
                return true;
            default:
                return hasMask(t, Token.Keyword);
        }
    }

    // 'import', 'import.meta'
    private nextTokenIsLeftParenOrPeriod(context: Context): boolean {
        this.peekToken(context);
        return this.peekedToken === Token.LeftParen || this.peekedToken === Token.Period;
    }

    private isLexical(context: Context): boolean {
        // In ES6 'let' always starts a lexical declaration if followed by an identifier or {
        // or [.
        this.peekToken(context);
        return this.peekedToken === Token.Identifier || hasMask(this.peekedToken, Token.BindingPattern);
    }

    private parseExportDeclaration(context: Context): any {}
    private parseImportDeclaration(context: Context): any {}

    private parseModuleItem(context: Context): ESTree.Statement {
        // ecma262/#prod-ModuleItem
        // ModuleItem :
        //    ImportDeclaration
        //    ExportDeclaration
        //    StatementListItem
        switch (this.token) {

            // 'export'
            case Token.ExportKeyword:
                return this.parseExportDeclaration(context);

                // 'import'
            case Token.ImportKeyword:
                if (!(this.flags & Flags.OptionsNext && this.nextTokenIsLeftParenOrPeriod(context))) {
                    return this.parseImportDeclaration(context);
                }

            default:
                return this.parseStatementListItem(context);
        }
    }

    private parseStatementListItem(context: Context): any {

        switch (this.token) {
            case Token.FunctionKeyword:
                return this.parseFunctionDeclaration(context);
                // VariableStatement[?Yield]
            case Token.ConstKeyword:
                return this.parseVariableStatement(context | (Context.DisallowFor | Context.Const));
                // VariableStatement[?Yield]
            case Token.LetKeyword:
                // If let follows identifier on the same line, it is an declaration. Parse it as a variable statement
                if (this.isLexical(context)) return this.parseVariableStatement(context |= (Context.DisallowFor | Context.Let));
            case Token.ClassKeyword:
                return this.parseClassDeclaration(context);

            case Token.ImportKeyword:
                // We must be careful not to parse a 'import()'
                // expression or 'import.meta' as an import declaration.
                if (this.flags & Flags.OptionsNext && this.nextTokenIsLeftParenOrPeriod(context)) return this.parseExpressionStatement(context);
                if (!(context & Context.Module)) this.error(Errors.UnexpectedToken, tokenDesc(this.token));

            default:
                return this.parseStatement(context);
        }
    }

    private parseStatement(context: Context): any {
        switch (this.token) {
            case Token.LeftParen:
                return this.parseExpressionStatement(context);
            case Token.Identifier:
                return this.parseLabelledStatement(context);
                // EmptyStatement
            case Token.Semicolon:
                return this.parseEmptyStatement(context);
                // BlockStatement[?Yield, ?Return]
            case Token.LeftBrace:
                return this.parseBlockStatement(context);
                // VariableStatement[?Yield]
            case Token.VarKeyword:
                return this.parseVariableStatement(context);
                // VariableStatement[?Yield]
                // [+Return] ReturnStatement[?Yield]
            case Token.ReturnKeyword:
                return this.parseReturnStatement(context);
            case Token.AsyncKeyword:
                if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                    return this.parseFunctionDeclaration(context);
                }
                return this.parseLabelledStatement(context);
            default:
                return this.parseExpressionStatement(context);
        }
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
                body = this.parseFunctionDeclaration(context | Context.AnnexB);
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

    private parseBlockStatement(context: Context): ESTree.BlockStatement {
        const pos = this.getLocations();
        const body: ESTree.Statement[] = [];
        const flag = this.flags;
        const blockScope = this.blockScope;
        const parentScope = this.parentScope;
        if (blockScope != null) this.parentScope = blockScope;
        this.blockScope = context & Context.IfClause ? blockScope : undefined;

        this.expect(context, Token.LeftBrace);

        while (this.token !== Token.RightBrace) body.push(this.parseStatementListItem(context | Context.Statement));

        this.expect(context, Token.RightBrace);
        this.flags = flag;

        this.blockScope = blockScope;
        if (parentScope != null) this.parentScope = parentScope;
        return this.finishNode(pos, {
            type: 'BlockStatement',
            body
        });
    }

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

    private parseEmptyStatement(context: Context): ESTree.EmptyStatement {
        const pos = this.getLocations();
        this.nextToken(context);
        return this.finishNode(pos, {
            type: 'EmptyStatement'
        });
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

    private parseVariableStatement(context: Context) {
        const pos = this.getLocations();
        const token = this.token;
        this.nextToken(context);
        const declarations = this.parseVariableDeclarationList(context);
        this.consumeSemicolon(context);
        return this.finishNode(pos, {
            type: 'VariableDeclaration',
            declarations,
            kind: tokenDesc(token)
        });
    }

    private parseVariableDeclarationList(context: Context): ESTree.VariableDeclarator[] {
        const list: ESTree.VariableDeclarator[] = [this.parseVariableDeclaration(context)];

        while (this.token === Token.Comma) {
            this.expect(context, Token.Comma);
            list.push(this.parseVariableDeclaration(context));
        }
        return list;
    }

    private parseVariableDeclaration(context: Context): ESTree.VariableDeclarator {
        const pos = this.getLocations();
        const t = this.token;
        let init = null;
        const id = this.parseBindingPatternOrIdentifier(context, pos);

        if (context & Context.Lexical) {
            if (context & Context.Const) {
                if (!(this.token === Token.InKeyword || this.token === Token.OfKeyword)) {
                    if (this.token === Token.Assign) {
                        this.nextToken(context);
                        init = this.parseAssignmentExpression(context);
                    } else {
                        this.error(Errors.DeclarationMissingInitializer, 'const');
                    }
                }
            } else if (context & Context.DisallowFor && id.type !== 'Identifier' || this.token === Token.Assign) {
                this.expect(context, Token.Assign);
                init = this.parseAssignmentExpression(context);
            }
        } else {
            if (this.token === Token.Assign) {
                this.expect(context, Token.Assign);
                init = this.parseAssignmentExpression(context);
            } else if (id.type !== 'Identifier' && context & Context.DisallowFor) {
                this.expect(context, Token.Assign);
            }
        }


        return this.finishNode(pos, {
            type: 'VariableDeclarator',
            init,
            id
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

    private parseYieldExpression(context: Context, pos: Location): ESTree.YieldExpression {

        this.expect(context, Token.YieldKeyword);

        let argument: ESTree.Expression | null = null;
        let delegate = false;

        if (!(this.flags & Flags.LineTerminator)) {
            delegate = this.parseOptional(context, Token.Multiply);
            if (delegate) {
                argument = this.parseAssignmentExpression(context);
            } else if (hasMask(this.token, Token.ExpressionStart)) {
                argument = this.parseAssignmentExpression(context);
            }
        }

        return this.finishNode(pos, {
            type: 'YieldExpression',
            argument,
            delegate
        });
    }

    private parseAssignmentExpression(context: Context): any {

        const pos = this.getLocations();
        const token = this.token;

        if (context & Context.Yield && this.token === Token.YieldKeyword) return this.parseYieldExpression(context, pos);

        const expr = this.parseBinaryExpression(context, 0, pos);

        if (this.token === Token.Arrow) {
            return this.parseArrowExpression(context, pos, [expr]);
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

        return this.parseConditionalExpression(context, expr, pos);
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

    private parseConditionalExpression(context: Context, expression: ESTree.Expression, pos: Location): ESTree.Expression {

        if (!(this.parseOptional(context, Token.QuestionMark))) return expression;

        const consequent = this.parseAssignmentExpression(context);
        this.expect(context, Token.Colon);
        const alternate = this.parseAssignmentExpression(context);
        return this.finishNode(pos, {
            type: 'ConditionalExpression',
            test: expression,
            consequent,
            alternate
        });
    }

    private parseBinaryExpression(
        context: Context,
        precedence: number,
        pos: Location,
        expression = this.parseUnaryExpression(context, pos)
    ): ESTree.Expression {

        while (hasMask(this.token, Token.BinaryOperator)) {

            const binaryPrecedence = this.token & Token.Precedence;

            if (!(context & Context.AllowIn) && this.token === Token.InKeyword) break;

            const operator = this.token === Token.Exponentiate ? binaryPrecedence >= precedence : binaryPrecedence > precedence;

            if (!operator) break;

            const binaryOperator = this.token;

            this.nextToken(context);

            expression = this.finishNode(pos, {
                type: (binaryOperator === Token.LogicalAnd || binaryOperator === Token.LogicalOr) ?
                    'LogicalExpression' : 'BinaryExpression',
                left: expression,
                right: this.parseBinaryExpression(context, binaryPrecedence, this.getLocations()),
                operator: tokenDesc(binaryOperator)
            });
        }

        return expression;
    }

    private parseAwaitExpression(context: Context): ESTree.AwaitExpression {
        const pos = this.getLocations();
        this.expect(context, Token.AwaitKeyword);
        const argument = this.buildUnaryExpression(context);
        return this.finishNode(pos, {
            type: 'AwaitExpression',
            argument
        });
    }

    private parseUnaryExpression(context: Context, pos: Location): any {
        let expr: any;

        if (hasMask(this.token, Token.UnaryOperator)) {
            if (context & Context.Async && this.token === Token.AwaitKeyword) return this.parseAwaitExpression(context);
            const token = this.token;
            expr = this.buildUnaryExpression(context);
            // When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
            // UnaryExpression is a direct reference to a variable, function argument, or function name
            if (context & Context.Strict && token === Token.DeleteKeyword && expr.argument.type === 'Identifier') {
                this.error(Errors.StrictDelete);
            }
            if (this.token === Token.Exponentiate) this.error(Errors.Unexpected);
        } else {
            expr = this.parseUpdateExpression(context, pos);
        }

        if (this.token !== Token.Exponentiate) return expr;
        const precedence = hasMask(this.token, Token.BinaryOperator) ? this.token & Token.Precedence : 0;
        return this.parseBinaryExpression(context, precedence, pos, expr);
    }

    private buildUnaryExpression(context: Context): ESTree.Expression {
        const pos = this.getLocations();
        if (!hasMask(this.token, Token.UnaryOperator) || this.token === Token.AwaitKeyword) return this.parseUpdateExpression(context, pos);

        const operator = this.token;

        this.nextToken(context);
        return this.finishNode(pos, {
            type: 'UnaryExpression',
            operator: tokenDesc(operator),
            argument: this.buildUnaryExpression(context),
            prefix: true
        });
    }

    private parseUpdateExpression(context: Context, pos: Location): any {
        let expr: ESTree.Expression;

        if (hasMask(this.token, Token.UpdateOperator)) {

            const operator = this.token;

            this.nextToken(context);

            expr = this.parseLeftHandSideExpression(context, pos);

            if (context & Context.Strict && this.isEvalOrArguments((expr as ESTree.Identifier).name)) {
                this.error(Errors.StrictLHSPrefix);
            } else if (!isValidSimpleAssignmentTarget(expr)) this.error(Errors.InvalidLHSInAssignment);

            return this.finishNode(pos, {
                type: 'UpdateExpression',
                operator: tokenDesc(operator),
                prefix: true,
                argument: expr
            });
        }

        //  if (this.flags & Flags.OptionsJSX && this.token === Token.LessThan) {
        //   return this.parseJSXElement(context | Context.JSXChild);
        // }

        expr = this.parseLeftHandSideExpression(context | Context.AllowCall, pos);

        if (hasMask(this.token, Token.UpdateOperator) && !(this.flags & Flags.LineTerminator)) {

            // The identifier eval or arguments may not appear as the LeftHandSideExpression of an
            // Assignment operator(12.15) or of a PostfixExpression or as the UnaryExpression
            // operated upon by a Prefix Increment(12.4.6) or a Prefix Decrement(12.4.7) operator.
            if (context & Context.Strict && this.isEvalOrArguments((expr as ESTree.Identifier).name)) {
                this.error(Errors.StrictLHSPostfix);
            }

            if (!isValidSimpleAssignmentTarget(expr)) this.error(Errors.InvalidLHSInAssignment);

            const operator = this.token;

            this.nextToken(context);

            return this.finishNode(pos, {
                type: 'UpdateExpression',
                argument: expr,
                operator: tokenDesc(operator),
                prefix: false
            });
        }

        return expr;
    }

    private parseMetaProperty(context: Context, meta: ESTree.Identifier, pos: Location): ESTree.MetaProperty {
        const property = this.parseIdentifier(context);
        return this.finishNode(pos, {
            meta,
            type: 'MetaProperty',
            property
        });
    }

    private parseImport(context: Context, pos: Location) {
        const id = this.parseIdentifier(context);

        switch (this.token) {

            // Import.meta - Stage 3 proposal
            case Token.Period:
                if (!(context & Context.Module)) this.error(Errors.Unexpected);
                this.expect(context, Token.Period);
                if (this.tokenValue !== 'meta') this.error(Errors.Unexpected);
                return this.parseMetaProperty(context, id, pos);

            default:
                return this.finishNode(pos, {
                    type: 'Import'
                });

        }
    }

    private parseLeftHandSideExpression(context: Context, pos: Location): any {

        switch (this.token) {

            // 'import'
            case Token.ImportKeyword:
                if (!(this.flags & Flags.OptionsNext)) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                return this.parseCallExpression(context | Context.Import, pos, this.parseImport(context, pos));

                // 'super'
            case Token.SuperKeyword:
                return this.parseCallExpression(context, pos, this.parseSuper(context));

            default:
                const expr = this.parseMemberExpression(context, pos);
                if (!(context & Context.AllowCall)) return expr;
                return this.parseCallExpression(context, pos, expr);
        }
    }

    private parseMemberExpression(
        context: Context,
        pos: Location,
        expr: ESTree.CallExpression | ESTree.Expression = this.parsePrimaryExpression(context, pos)
    ): ESTree.Expression {

        while (true) {

            switch (this.token) {

                // '.'
                case Token.Period:
                    {
                        this.expect(context, Token.Period);
                        if (!this.isIdentifierOrKeyword(this.token)) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                        const property = this.parseIdentifier(context);
                        expr = this.finishNode(pos, {
                            type: 'MemberExpression',
                            object: expr,
                            computed: false,
                            property,
                        });
                        break;
                    }

                    // '['
                case Token.LeftBracket:
                    {
                        this.expect(context, Token.LeftBracket);
                        const start = this.getLocations();
                        const property = this.parseExpression(context, start);
                        this.expect(context, Token.RightBracket);
                        expr = this.finishNode(pos, {
                            type: 'MemberExpression',
                            object: expr,
                            computed: true,
                            property,
                        });
                        break;
                    }

                case Token.TemplateCont:
                    {
                        const quasi = this.parseTemplate(context, this.getLocations());
                        expr = this.parseTaggedTemplateExpression(context, expr, quasi, this.getLocations());
                        break;
                    }
                case Token.TemplateTail:
                    {
                        const quasi = this.parseTemplateTail(context, this.getLocations());
                        expr = this.parseTaggedTemplateExpression(context, expr, quasi, pos);
                        break;
                    }
                default:
                    return expr;
            }
        }
    }

    private parseCallExpression(
        context: Context,
        pos: Location,
        expr: ESTree.Expression
    ): ESTree.Expression {

        while (true) {

            expr = this.parseMemberExpression(context, pos, expr);

            switch (this.token) {

                case Token.LeftParen:
                    const args = this.parseArguments(context & ~Context.inParameter, pos);

                    if (this.token === Token.Arrow) {
                        return this.parseArrowExpression(context | Context.Async, pos, args);
                    }

                    if (context & Context.Import && args.length !== 1 &&
                        expr.type === 'Import') this.error(Errors.BadImportCallArity);

                    expr = this.finishNode(pos, {
                        type: 'CallExpression',
                        callee: expr,
                        arguments: args
                    });

                    break;
                default:
                    return expr;
            }
        }
    }

    private parseNewExpression(context: Context) {

        const pos = this.getLocations();

        const id = this.parseIdentifier(context);

        switch (this.token) {

            // '.'
            case Token.Period:

                this.expect(context, Token.Period);

                if (this.token === Token.Identifier) {
                    if (this.tokenValue !== 'target') this.error(Errors.MetaNotInFunctionBody);
                    if (context & Context.inParameter) return this.parseMetaProperty(context, id, pos);
                    if (!(this.flags & Flags.InFunctionBody)) this.error(Errors.MetaNotInFunctionBody);
                }

                return this.parseMetaProperty(context, id, pos);

                // 'import'
            case Token.ImportKeyword:
                this.error(Errors.UnexpectedToken, tokenDesc(this.token));

            default:
                return this.finishNode(pos, {
                    type: 'NewExpression',
                    callee: this.parseMemberExpression(context & ~Context.inParameter | Context.NewExpression, pos),
                    arguments: this.token === Token.LeftParen ? this.parseArguments(context & ~Context.inParameter, pos) : []
                });
        }
    }

    private parseSuper(context: Context): ESTree.Expression {
        const pos = this.getLocations();

        this.expect(context, Token.SuperKeyword);

        switch (this.token) {

            // '('
            case Token.LeftParen:
                // The super property has to be within a class constructor
                if (!(context & Context.Constructor)) this.error(Errors.BadSuperCall);
                break;

                // '.'
            case Token.Period:
                if (!(context & Context.Method)) this.error(Errors.BadSuperCall);
                break;

                // '['
            case Token.LeftBracket:
                if (!(context & Context.Method)) this.error(Errors.BadSuperCall);
                break;
            default:
                this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        }

        return this.finishNode(pos, {
            type: 'Super'
        });
    }

    private parseSpreadElement(context: Context): ESTree.SpreadElement {
        const pos = this.getLocations();
        // Disallow SpreadElement inside dynamic import
        if (context & Context.Import) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
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
                    this.parseAssignmentExpression(context & ~Context.Import);
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

    private matchAsyncFunction(context: Context): AsyncState {
        this.peekToken(context);
        if (this.line !== this.peekedState.line) return AsyncState.None;
        switch (this.peekedToken) {
            case Token.FunctionKeyword:
                return AsyncState.Function;
            default:
                if (this.isIdentifier(context, this.peekedToken)) return AsyncState.Identifier;
                return AsyncState.None;
        }
    }
    private parseClassDeclaration(context: Context): ESTree.ClassDeclaration {

        const pos = this.getLocations();

        this.expect(context, Token.ClassKeyword);

        let superClass: ESTree.Expression | null = null;
        let id = null;
        let classBody;
        let flags = ObjectState.None;
        const savedFlags = this.flags;

        if (this.isIdentifier(context, this.token)) {
            const name = this.tokenValue;
            if (context & Context.Statement) {
                if (!this.initBlockScope() && name in this.blockScope) {
                    if (this.blockScope !== this.functionScope || this.blockScope[name] === ScopeMasks.NonShadowable) {
                        this.error(Errors.DuplicateIdentifier, name);
                    }
                }
                this.blockScope[name] = ScopeMasks.Shadowable;
            }

            // Invalid: 'export class a{}  export class a{}'
            if (context & Context.Export && this.token === Token.Identifier) this.addFunctionArg(this.tokenValue);

            id = this.parseBindingIdentifier(context | Context.Strict);
            // Valid: `export default class {};`
            // Invalid: `class {};`
        } else if (!(context & Context.OptionalIdentifier)) {
            this.error(Errors.UnNamedClassStmt);
        }

        if (this.parseOptional(context, Token.ExtendsKeyword)) {
            superClass = this.parseLeftHandSideExpression(context & ~Context.OptionalIdentifier | Context.Strict, pos);
            flags |= ObjectState.Heritage;
        }

        classBody = this.parseClassBody(context | Context.Strict, flags);
        this.flags = savedFlags;
        return this.finishNode(pos, {
            type: 'ClassDeclaration',
            id,
            superClass,
            body: classBody
        });
    }

    private parseClassExpression(context: Context): ESTree.ClassExpression {

        const pos = this.getLocations();

        this.expect(context, Token.ClassKeyword);

        let superClass: ESTree.Expression | null = null;
        let id = null;
        let classBody;
        let flags = ObjectState.None;
        const savedFlags = this.flags;

        if (this.isIdentifier(context, this.token)) {
            const name = this.tokenValue;
            if (context & Context.Statement) {
                if (!this.initBlockScope() && name in this.blockScope) {
                    if (this.blockScope !== this.functionScope || this.blockScope[name] === ScopeMasks.NonShadowable) {
                        this.error(Errors.DuplicateIdentifier, name);
                    }
                }
                this.blockScope[name] = ScopeMasks.Shadowable;
            }

            id = this.isIdentifier(context, this.token) ? this.parseIdentifier(context | Context.Strict) : null;

            // Valid: `export default class {};`
            // Invalid: `class {};`
        }

        if (this.parseOptional(context, Token.ExtendsKeyword)) {
            superClass = this.parseLeftHandSideExpression(context | Context.Strict, pos);
            flags |= ObjectState.Heritage;
        }

        classBody = this.parseClassBody(context | Context.Strict, flags);
        this.flags = savedFlags;
        return this.finishNode(pos, {
            type: 'ClassExpression',
            id,
            superClass,
            body: classBody
        });
    }

    private parseClassBody(context: Context, flags: ObjectState): ESTree.ClassBody {
        const pos = this.getLocations();

        this.expect(context, Token.LeftBrace);

        const body: ESTree.MethodDefinition[] = [];

        while (this.token !== Token.RightBrace) {

            if (!this.parseOptional(context, Token.Semicolon)) {
                const node: ESTree.MethodDefinition | ESTree.Property = this.parseClassElement(context, flags);
                body.push(node);
                if (node.kind === 'constructor') context |= Context.HasConstructor;
            }
        }

        this.expect(context, Token.RightBrace);

        return this.finishNode(pos, {
            type: 'ClassBody',
            body
        });
    }

    private parseClassElement(context: Context, state: ObjectState): ESTree.MethodDefinition {
        const pos = this.getLocations();
        let key = null;
        let value = null;
        let token = this.token;
        let tokenValue = this.tokenValue;

        if (this.parseOptional(context, Token.Multiply)) state |= ObjectState.Yield;

        if (!(state & ObjectState.Yield)) {

            if (this.token === Token.LeftBracket) state |= ObjectState.Computed;
            if (this.tokenValue === 'constructor') state |= ObjectState.HasConstructor;

            key = this.parsePropertyName(context & ~Context.Strict);

            if (token === Token.StaticKeyword && (this.qualifiedPropertyName() || this.token === Token.Multiply)) {

                token = this.token;

                state |= ObjectState.Static;

                if (this.parseOptional(context, Token.Multiply)) {
                    state |= ObjectState.Yield;
                } else {
                    if (token === Token.LeftBracket) state |= ObjectState.Computed;
                    key = this.parsePropertyName(context);
                }
            }

            if (!(this.flags & Flags.LineTerminator) && (token === Token.AsyncKeyword)) {
                if (this.token !== Token.Colon && this.token !== Token.LeftParen) {
                    state |= ObjectState.Async;
                    token = this.token;
                    tokenValue = this.tokenValue;

                    // Asynchronous Iteration - Stage 3 proposal
                    if (!(this.flags & Flags.OptionsNext) && this.token === Token.Multiply) {
                        this.error(Errors.InvalidAsyncGenerator);
                    }
                    // Async generator
                    if (this.parseOptional(context, Token.Multiply)) state |= ObjectState.Yield;

                    switch (this.token) {
                        case Token.LeftBracket:
                            state |= ObjectState.Computed;
                            break;
                            // Invalid: `class X { async static f() {} }`
                        case Token.StaticKeyword:
                            this.error(Errors.InvalidMethod);
                        default: // ignore
                    }

                    key = this.parsePropertyName(context);

                    if (token === Token.ConstructorKeyword) this.error(Errors.ConstructorIsAsync);
                }
            }
        }

        // MethodDeclaration
        if (this.qualifiedPropertyName()) {

            switch (token) {
                case Token.GetKeyword:
                    state |= ObjectState.Get;
                    break;
                case Token.SetKeyword:
                    state |= ObjectState.Set;
                    break;
                case Token.Multiply:
                    state |= ObjectState.Method;
                    break;
            }

            if (state & ObjectState.Async && state & ObjectState.Accessors) {
                this.error(Errors.UnexpectedToken, tokenDesc(token));
            }

            switch (this.token) {

                // '['
                case Token.LeftBracket:
                    state |= ObjectState.Computed;
                    break;

                    // 'constructor'
                case Token.ConstructorKeyword:
                    state |= ObjectState.HasConstructor;
                    break;
                default: // ignore
            }

            key = this.parsePropertyName(context);
            value = this.parseMethodDefinition(context | Context.Method, state);
        }

        if (!(state & ObjectState.Modifiers) || (key && this.token === Token.LeftParen)) {
            if (!(state & ObjectState.Yield)) {
                if (state & ObjectState.Heritage && state & ObjectState.HasConstructor) {
                    context |= Context.Constructor;
                }
            }

            value = this.parseMethodDefinition(context | Context.Method, state);
            state |= ObjectState.Method;
        }

        // Invalid: `class Foo { * }`
        if (state & ObjectState.Yield && !key) this.error(Errors.Unexpected);

        if (state & ObjectState.HasConstructor) state |= ObjectState.Special;

        if (!(state & ObjectState.Computed)) {
            if (state & ObjectState.Static && this.tokenValue === 'prototype') {
                this.error(Errors.StaticPrototype);
            }

            if (!(state & ObjectState.Static) && state & ObjectState.HasConstructor) {
                if (!(state & ObjectState.Special) || !(state & ObjectState.Method) || (value && value.generator)) this.error(Errors.ConstructorSpecialMethod);

                if (context & Context.HasConstructor) this.error(Errors.DuplicateConstructor);
                state |= ObjectState.Constructor;
            }
        }

        return this.finishNode(pos, {
            type: 'MethodDefinition',
            computed: !!(state & ObjectState.Computed),
            key,
            kind: (state & ObjectState.Constructor) ? 'constructor' : (state & ObjectState.Get) ? 'get' :
                (state & ObjectState.Set) ? 'set' : 'method',
            static: !!(state & ObjectState.Static),
            value
        });
    }


    private parseObjectExpression(context: Context): ESTree.ObjectExpression {

        const pos = this.getLocations();

        this.expect(context, Token.LeftBrace);

        const properties: (ESTree.Property | ESTree.SpreadElement)[] = [];

        while (!this.parseOptional(context, Token.RightBrace)) {

            if (this.token === Token.Ellipsis) {
                // Object rest spread - Stage 3 proposal
                if (!(this.flags & Flags.OptionsNext)) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                properties.push(this.parseSpreadElement(context));
            } else {
                properties.push(this.parseObjectElement(context));
            }
            if (this.token !== Token.RightBrace) this.parseOptional(context, Token.Comma);
        }

        return this.finishNode(pos, {
            type: 'ObjectExpression',
            properties
        });
    }

    private isAsync(t: Token): boolean {

        switch (t) {
            case Token.Colon:
            case Token.Assign:
            case Token.LeftParen:
            case Token.Comma:
                return false;
            default:
                return true;
        }
    }
    private qualifiedPropertyName() {
        switch (this.token) {
            case Token.StringLiteral:
            case Token.NumericLiteral:
            case Token.Multiply:
            case Token.LeftBracket:
            case Token.Identifier:
                return true;
            default:
                return hasMask(this.token, Token.Keyword);
        }
    }

    private parseObjectElement(context: Context): ESTree.Property {
        const pos = this.getLocations();

        let key: ESTree.Expression | null = null;
        let value: ESTree.Expression | null = null;
        const token = this.token;
        const tokenValue = this.tokenValue;

        let state = ObjectState.None;

        if (this.isIdentifier(context & ~Context.Strict, token)) {
            this.nextToken(context);

            if (this.token === Token.LeftBracket) state |= ObjectState.Computed;

            if (!(this.flags & Flags.LineTerminator) && (token === Token.AsyncKeyword) && this.isAsync(this.token)) {

                state |= ObjectState.Async;

                // Asynchronous Iteration - Stage 3 proposal
                if (!(this.flags & Flags.OptionsNext) && this.token === Token.Multiply) this.error(Errors.InvalidAsyncGenerator);
                if (this.parseOptional(context, Token.Multiply)) state |= ObjectState.Yield;
                key = this.parsePropertyName(context);

            } else {
                key = this.finishNode(pos, {
                    type: 'Identifier',
                    name: tokenValue
                });
            }
        } else if (this.parseOptional(context, Token.Multiply)) {
            state |= ObjectState.Yield;
        } else {
            if (this.token === Token.LeftBracket) state |= ObjectState.Computed;
            key = this.parsePropertyName(context);
        }

        if (this.qualifiedPropertyName()) {

            switch (token) {
                case Token.GetKeyword:
                    // `({ g\\u0065t m() {} })`
                    if (state & ObjectState.HasConstructor) this.error(Errors.InvalidEscapedReservedWord);
                    state |= ObjectState.Get;
                    break;
                case Token.SetKeyword:
                    // `({ s\\u0065t m(v) {} })`
                    if (state & ObjectState.HasConstructor) this.error(Errors.InvalidEscapedReservedWord);
                    state |= ObjectState.Set;
                    break;
                case Token.Multiply:
                    state |= ObjectState.Method;
                    break;
                default: // ignore;
            }

            if (this.token === Token.LeftBracket) state |= ObjectState.Computed;
            key = this.parsePropertyName(context);
            value = this.parseMethodDefinition(context | Context.Method, state);

        } else {

            if (!key) this.error(Errors.Unexpected);

            switch (this.token) {

                // ':'
                case Token.Colon:

                    if (state & (ObjectState.Yield | ObjectState.Async)) this.error(Errors.BadPropertyId);

                    if (!(state & ObjectState.Computed) && tokenValue === '__proto__') {
                        if (this.flags & Flags.HasPrototype) this.error(Errors.DuplicateProtoProperty);
                        this.flags |= Flags.HasPrototype;
                    }

                    this.expect(context, Token.Colon);

                    value = this.parseAssignmentExpression(context);

                    if (context & Context.Strict && this.isEvalOrArguments((value as ESTree.Identifier).name)) {
                        this.error(Errors.UnexpectedStrictReserved);
                    }
                    break;

                    // '('
                case Token.LeftParen:

                    value = this.parseMethodDefinition(context | Context.Method, state);
                    state |= ObjectState.Method;
                    break;

                default:

                    if (this.isIdentifier(context, token)) {

                        // Invalid: `"use strict"; for ({ eval } of [{}]) ;`
                        if (context & Context.Strict && this.isEvalOrArguments(tokenValue)) this.error(Errors.UnexpectedReservedWord);
                        // Invalid: '({async foo() { return {await} }})'
                        if (token === Token.AwaitKeyword) this.error(Errors.UnexpectedToken, tokenDesc(token));

                        const id = this.finishNode(pos, {
                            type: 'Identifier',
                            name: tokenValue
                        });

                        if (this.parseOptional(context, Token.Assign)) {
                            // Invalid: '({ async f = function() {} })'
                            if (state & (ObjectState.Yield | ObjectState.Async)) this.error(Errors.BadPropertyId);
                            state |= ObjectState.Shorthand;
                            const init = this.parseAssignmentExpression(context);
                            value = this.finishNode(pos, {
                                type: 'AssignmentPattern',
                                left: id,
                                right: init
                            });

                            // shorthand
                        } else {
                            state |= ObjectState.Shorthand;
                            value = id;
                        }
                    } else {
                        this.error(Errors.Unexpected);
                    }
            }
        }

        return this.finishNode(pos, {
            type: 'Property',
            key,
            value,
            kind: !(state & ObjectState.Accessors) ? 'init' : (state & ObjectState.Set) ? 'set' : 'get',
            computed: !!(state & ObjectState.Computed),
            method: !!(state & ObjectState.Method),
            shorthand: !!(state & ObjectState.Shorthand)
        });

    }

    private parseMethodDefinition(context: Context, state: ObjectState): ESTree.FunctionExpression {

        const pos = this.getLocations();

        if (Context.Yield | Context.Async) context &= ~(Context.Yield | Context.Async);

        if (state & ObjectState.Yield && !(state & ObjectState.Get)) context |= Context.Yield;
        if (state & ObjectState.Async) context |= Context.Async;

        const savedFlag = this.flags;
        const savedScope = this.enterFunctionScope();

        const params = this.parseParameterList(context | Context.inParameter);

        const body = this.parseFunctionBody(context);
        this.flags = savedFlag;

        this.exitFunctionScope(savedScope);
        return this.finishNode(pos, {
            type: 'FunctionExpression',
            id: null,
            params,
            body,
            generator: !!(state & ObjectState.Yield),
            async: !!(state & ObjectState.Async),
            expression: false
        });
    }

    private parseFunctionDeclaration(context: Context): ESTree.FunctionDeclaration {

        const pos = this.getLocations();
        const parentHasYield = !!(context & Context.Yield);

        if (context & (Context.Async | Context.Yield)) context &= ~(Context.Async | Context.Yield);

        if (this.token === Token.AsyncKeyword) {
            // use 'expect' instead of 'parseOptional' here for perf reasons when it
            // comes to Annex B.3.4. Avoid extra CPU cycle parsing out the 'async' keyword
            // in case this is an invalid generator function.
            this.expect(context, Token.AsyncKeyword);
            if (this.flags & Flags.LineTerminator) this.error(Errors.LineBreakAfterAsync);
            context |= Context.Async;
        }

        this.expect(context, Token.FunctionKeyword);

        const savedFlags = this.flags;
        const token = this.token;

        if (this.token === Token.Multiply) {
            if (context & Context.Async && !(this.flags & Flags.OptionsNext)) this.error(Errors.InvalidAsyncGenerator);
            this.expect(context, Token.Multiply);
            context |= Context.Yield;
        }

        // Invalid: 'export function a() {} export function a() {}'
        if (context & Context.Export && this.token === Token.Identifier) this.addFunctionArg(this.tokenValue);

        let id: ESTree.Identifier | null = null;

        if (this.token !== Token.LeftParen && this.isIdentifier(context, this.token)) {
            const name = this.tokenValue;
            // If the parent has the 'yield' mask, and the func decl name is 'yield' we have to throw an decent error message
            if (parentHasYield && this.token === Token.YieldKeyword) this.error(Errors.DisallowedInContext, tokenDesc(this.token));
            if (context & Context.Strict && this.isEvalOrArguments(name)) this.error(Errors.UnexpectedStrictReserved);

            if (context & Context.Statement && !(context & Context.AnnexB)) {
                if (!this.initBlockScope() && name in this.blockScope) {
                    if (this.blockScope[name] === ScopeMasks.NonShadowable || this.blockScope !== this.functionScope) {
                        this.error(Errors.DuplicateIdentifier, name);
                    }
                }
                this.blockScope[name] = ScopeMasks.Shadowable;
            }

            id = this.parseBindingIdentifier(context);

        } else if (!(context & Context.OptionalIdentifier)) {
            this.error(Errors.UnNamedFunctionStmt);
        }

        const savedScope = this.enterFunctionScope();
        const params = this.parseParameterList(context & ~(Context.Statement | Context.OptionalIdentifier) | Context.inParameter);
        const body = this.parseFunctionBody(context & ~(Context.Statement | Context.OptionalIdentifier));

        this.exitFunctionScope(savedScope);

        this.flags = savedFlags;

        return this.finishNode(pos, {
            type: 'FunctionDeclaration',
            params,
            body,
            async: !!(context & Context.Async),
            generator: !!(context & Context.Yield),
            expression: false,
            id
        });
    }

    private parseFunctionExpression(context: Context): ESTree.FunctionExpression {

        const pos = this.getLocations();

        const parentHasYield = !!(context & Context.Yield);

        if (context & (Context.Yield | Context.Async)) context &= ~(Context.Yield | Context.Async);

        if (this.token === Token.AsyncKeyword) {
            this.expect(context, Token.AsyncKeyword);
            if (this.flags & Flags.LineTerminator) this.error(Errors.LineBreakAfterAsync);
            context |= Context.Async;
        }

        this.expect(context, Token.FunctionKeyword);

        if (this.token === Token.Multiply) {
            // If we are in the 'await' context. Check if the 'Next' option are set
            // and allow us to use async generators. If not, throw a decent error message if this isn't the case
            if (context & Context.Async && !(this.flags & Flags.OptionsNext)) this.error(Errors.InvalidAsyncGenerator);
            this.expect(context, Token.Multiply);
            context |= Context.Yield;
        }

        let id: ESTree.Identifier | null = null;

        if (this.token !== Token.LeftParen && this.isIdentifier(context, this.token)) {
            if (context & Context.Strict && this.isEvalOrArguments(this.tokenValue)) this.error(Errors.StrictLHSAssignment);
            if ((context & (Context.Async | Context.Yield) || (context & Context.Strict && parentHasYield)) && this.token === Token.YieldKeyword) {
                this.error(Errors.YieldReservedWord);
            }
            id = this.parseIdentifier(context);
        }

        const savedScope = this.enterFunctionScope();
        const params = this.parseParameterList(context | Context.inParameter);
        const body = this.parseFunctionBody(context);

        this.exitFunctionScope(savedScope);

        return this.finishNode(pos, {
            type: 'FunctionExpression',
            params,
            body,
            async: !!(context & Context.Async),
            generator: !!(context & Context.Yield),
            expression: false,
            id
        });
    }

    private parseParameterList(context: Context): ESTree.Node[] {
        // FormalParameters [Yield,Await]: (modified)
        //      [empty]
        //      FormalParameterList[?Yield,Await]
        //
        // FormalParameter[Yield,Await]: (modified)
        //      BindingElement[?Yield,Await]
        //
        // BindingElement [Yield,Await]: (modified)
        //      SingleNameBinding[?Yield,?Await]
        //      BindingPattern[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
        //
        // SingleNameBinding [Yield,Await]:
        //      BindingIdentifier[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
        this.expect(context, Token.LeftParen);
        this.flags &= ~Flags.HasNonSimpleParameter;
        const result = [];

        while (this.token !== Token.RightParen) {
            if (this.token === Token.Ellipsis) {
                this.flags |= Flags.HasNonSimpleParameter;
                result.push(this.parseRestElement(context));
                this.parseOptional(context, Token.Comma);
                break;
            }
            result.push(this.parseFormalParameter(context));
            if (this.token !== Token.RightParen) this.expect(context, Token.Comma);
        }

        this.expect(context, Token.RightParen);

        return result;
    }

    private parseFormalParameter(
        context: Context,
    ): ESTree.AssignmentPattern | ESTree.Identifier | ESTree.ObjectPattern | ESTree.ArrayPattern | ESTree.RestElement {
        const pos = this.getLocations();
        if (context & Context.Async && this.token === Token.AwaitKeyword) this.error(Errors.Unexpected);
        if (context & Context.Strict && this.token === Token.Identifier) this.addFunctionArg(this.tokenValue);
        const left = this.token === Token.Ellipsis ? this.parseRestElement(context) : this.parseBindingPatternOrIdentifier(context, pos);

        // Initializer[In, Yield] :
        //     = AssignmentExpression[?In, ?Yield]
        if (!this.parseOptional(context, Token.Assign)) return left;
        const right = this.parseAssignmentExpression(context);
        return this.finishNode(pos, {
            type: 'AssignmentPattern',
            left,
            right
        });
    }

    private parsePrimaryExpression(context: Context, pos: Location) {

        switch (this.token) {
            case Token.Divide:
            case Token.DivideAssign:
                if (this.scanRegularExpression() === Token.RegularExpression) return this.parseRegularExpression(context);
            case Token.Identifier:
                return this.parseIdentifier(context);
            case Token.NumericLiteral:
                if (this.flags & Flags.BigInt) return this.parseBigIntLiteral(context);
            case Token.StringLiteral:
                return this.parseLiteral(context);
            case Token.ThisKeyword:
                return this.parseThisExpression(context);
            case Token.NullKeyword:
                return this.parseNullExpression(context);
            case Token.TrueKeyword:
            case Token.FalseKeyword:
                return this.parseTrueOrFalseExpression(context);
            case Token.LeftParen:
                return this.parseParenthesizedExpression(context & ~(Context.AllowCall | Context.inParameter | Context.NonSimpleParameter));
            case Token.LeftBracket:
                return this.parseArrayExpression(context);
            case Token.FunctionKeyword:
                return this.parseFunctionExpression(context);
            case Token.LeftBrace:
                return this.parseObjectExpression(context);
            case Token.NewKeyword:
                return this.parseNewExpression(context);
            case Token.ClassKeyword:
                return this.parseClassExpression(context);
            case Token.TemplateTail:
                return this.parseTemplateTail(context, pos);
            case Token.TemplateCont:
                return this.parseTemplate(context, pos);
            case Token.SuperKeyword:
                return this.parseSuper(context);
            case Token.DoKeyword:
                if (this.flags & Flags.OptionsV8) return this.parseDoExpression(context);
            case Token.ThrowKeyword:
                if (this.flags & Flags.OptionsNext) return this.parseThrowExpression(context);
            case Token.AsyncKeyword:
                const state = this.matchAsyncFunction(context);
                switch (state) {
                    case AsyncState.Function:
                        return this.parseFunctionExpression(context);
                    case AsyncState.Identifier:
                        this.expect(context, Token.AsyncKeyword);
                        const expr = this.parseIdentifier(context);
                        return this.parseArrowExpression(context | Context.Async, pos, [expr]);
                    default:
                        return this.parseIdentifier(context);
                }
            case Token.LetKeyword:
                if (!(context & Context.Module)) return this.parseIdentifier(context);
            case Token.YieldKeyword:
                if (!(context & Context.Strict && context & Context.Yield)) return this.parseIdentifier(context);
            case Token.AwaitKeyword:
                if (!(context & (Context.Module | Context.Async))) return this.parseIdentifier(context);
            default:
                this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        }
    }

    private parseArrowFormalList(context: Context, params: ESTree.Node[]): ESTree.Node[] {

        for (let idx = 0; idx < params.length; idx++) {
            this.reinterpretAsPattern(context | Context.ArrowParameterList, params[idx]);
        }

        return params;
    }

    private parseArrowExpression(context: Context, pos: Location, params: any): ESTree.ArrowFunctionExpression {

        if (this.flags & Flags.InFunctionBody) context &= ~Context.Yield;

        if (this.flags & Flags.LineTerminator) this.error(Errors.LineBreakAfterAsync);
        this.expect(context, Token.Arrow);

        const savedScope = this.enterFunctionScope();

        this.parseArrowFormalList(context, params);

        let expression = false;
        let body: ESTree.Expression | ESTree.BlockStatement;

        if (this.token === Token.LeftBrace) {
            body = this.parseFunctionBody(context);
        } else {
            body = this.parseAssignmentExpression(context);
            expression = true;
        }

        this.exitFunctionScope(savedScope);

        return this.finishNode(pos, {
            type: 'ArrowFunctionExpression',
            body,
            params,
            id: null,
            async: !!(context & Context.Async),
            generator: !!(context & Context.Yield),
            expression
        });
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

        if (this.parseOptional(context, Token.RightParen)) {
            if (this.token === Token.Arrow) return this.parseArrowExpression(context, pos, []);
            this.error(Errors.MissingArrowAfterParentheses);
        }

        let expr: ESTree.Expression;

        if (this.token === Token.Ellipsis) {
            expr = this.parseRestElement(context | Context.NonSimpleParameter);
            this.expect(context, Token.RightParen);
            return this.parseArrowExpression(context, pos, [expr]);
        }
        const sequencePos = this.getLocations();

        expr = this.parseAssignmentExpression(context | Context.AllowCall);

        if (this.token === Token.Comma) {

            const expressions: ESTree.Expression[] = [expr];

            while (this.parseOptional(context, Token.Comma)) {
                if (this.parseOptional(context, Token.LeftParen)) {
                    return this.parseArrowExpression(context, pos, expressions);
                } else if (this.token === Token.Ellipsis) {
                    expressions.push(this.parseRestElement(context | Context.NonSimpleParameter));
                    this.expect(context, Token.RightParen);

                    return this.parseArrowExpression(context, pos, expressions);
                } else {
                    expressions.push(this.parseAssignmentExpression(context | Context.AllowCall));
                }
            }

            expr = this.finishNode(sequencePos, {
                type: 'SequenceExpression',
                expressions
            });
        }

        this.expect(context, Token.RightParen);

        if (this.token === Token.Arrow) {
            return this.parseArrowExpression(context, pos, expr.type === 'SequenceExpression' ? expr.expressions : [expr]);
        }

        return expr;
    }

    private parseThrowExpression(context: Context) {
        const pos = this.getLocations();
        this.nextToken(context);
        return this.finishNode(pos, {
            type: 'ThrowExpression',
            expressions: this.buildUnaryExpression(context)
        });
    }

    private parseArrayExpression(context: Context) {
        const pos = this.getLocations();
        this.expect(context, Token.LeftBracket);

        const elements = [];

        while (this.token !== Token.RightBracket) {
            if (this.parseOptional(context, Token.Comma)) {
                elements.push(null);
            } else if (this.token === Token.Ellipsis) {
                const element = this.parseSpreadElement(context);
                if (this.token !== Token.RightBracket) {
                    this.expect(context, Token.Comma);
                }
                elements.push(element);
            } else {
                elements.push(this.parseAssignmentExpression(context));
                if (this.token !== Token.RightBracket) {
                    this.expect(context, Token.Comma);
                }
            }
        }
        this.expect(context, Token.RightBracket);

        return this.finishNode(pos, {
            type: 'ArrayExpression',
            elements
        });
    }

    private parseRegularExpression(context: Context): ESTree.RegExpLiteral {

        const pos = this.getLocations();
        const regex = this.tokenRegExp;
        const value = this.tokenValue;
        const raw = this.tokenRaw;

        this.nextToken(context);

        const node = this.finishNode(pos, {
            type: 'Literal',
            value: value,
            regex
        });

        if (this.flags & Flags.OptionsRaw) node.raw = raw;

        return node;
    }

    private parseTemplateTail(context: Context, pos: Location): ESTree.TemplateLiteral {
        const quasis = this.parseTemplateElement(context, pos);
        return this.finishNode(pos, {
            type: 'TemplateLiteral',
            expressions: [],
            quasis: [quasis]
        });
    }

    private parseTemplateHead(context: Context, cooked: string, raw: string): ESTree.TemplateElement {
        const pos = this.getLocations();
        this.token = this.scanTemplateNext(context);
        return this.finishNode(pos, {
            type: 'TemplateElement',
            value: {
                cooked,
                raw
            },
            tail: false
        });
    }

    private parseTemplateElement(context: Context, pos: Location): ESTree.TemplateElement {
        const cooked = this.tokenValue;
        const raw = this.tokenRaw;
        this.expect(context, Token.TemplateTail);
        return this.finishNode(pos, {
            type: 'TemplateElement',
            value: {
                cooked,
                raw
            },
            tail: true
        });
    }

    private parseTaggedTemplateExpression(context: Context, expr: ESTree.Expression, quasi: any, pos: Location): ESTree.TaggedTemplateExpression {
        return this.finishNode(pos, {
            type: 'TaggedTemplateExpression',
            tag: expr,
            quasi
        });
    }

    private parseTemplate(context: Context, pos: Location): ESTree.TemplateLiteral {

        const expressions: ESTree.Expression[] = [];
        const quasis: ESTree.TemplateElement[] = [];

        while (this.token === Token.TemplateCont) {
            if (this.token === Token.RightBrace) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
            const cooked = this.tokenValue;
            const raw = this.tokenRaw;
            this.expect(context, Token.TemplateCont);
            expressions.push(this.parseExpression(context, pos));
            quasis.push(this.parseTemplateHead(context, cooked, raw));
        }

        while (this.token === Token.TemplateTail) {
            quasis.push(this.parseTemplateElement(context, pos));
        }

        return this.finishNode(pos, {
            type: 'TemplateLiteral',
            expressions,
            quasis
        });
    }

    private parseBigIntLiteral(context: Context): ESTree.Literal {
        const pos = this.getLocations();
        const value = this.tokenValue;
        const raw = this.tokenRaw;

        this.nextToken(context);

        const node = this.finishNode(pos, {
            type: 'Literal',
            value,
            bigint: raw
        });

        if (this.flags & Flags.OptionsRaw) node.raw = raw;

        return node;
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

    private parseTrueOrFalseExpression(context: Context): ESTree.Literal {
        const pos = this.getLocations();
        const value = this.tokenValue === 'true';
        const raw = this.tokenValue;
        this.nextToken(context);
        const node = this.finishNode(pos, {
            type: 'Literal',
            value
        });

        if (this.flags & Flags.OptionsRaw) node.raw = raw;

        return node;
    }

    private parseThisExpression(context: Context): ESTree.ThisExpression {
        const pos = this.getLocations();
        this.nextToken(context);
        return this.finishNode(pos, {
            type: 'ThisExpression'
        });
    }

    private parseNullExpression(context: Context): ESTree.Literal {
        const pos = this.getLocations();
        this.nextToken(context);
        const node = this.finishNode(pos, {
            type: 'Literal',
            value: null
        });

        if (this.flags & Flags.OptionsRaw) node.raw = 'null';
        return node;
    }

    private parseIdentifier(context: Context): ESTree.Identifier {
        const name = this.tokenValue;
        const pos = this.getLocations();
        if (context & Context.Strict && this.isEvalOrArguments(name)) this.error(Errors.UnexpectedStrictReserved);
        this.nextToken(context);

        return this.finishNode(pos, {
            type: 'Identifier',
            name
        });
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

    private parseComputedPropertyName(context: Context): ESTree.Expression {
        this.expect(context, Token.LeftBracket);
        const expression = this.parseAssignmentExpression(context | Context.AllowIn);
        this.expect(context, Token.RightBracket);
        return expression;
    }

    private parsePropertyName(context: Context) {
        switch (this.token) {
            case Token.StringLiteral:
            case Token.NumericLiteral:
                return this.parseLiteral(context);
            case Token.LeftBracket:
                return this.parseComputedPropertyName(context);
            default:
                return this.parseIdentifier(context);
        }
    }

    /****
     * Pattern
     */

    private parseAssignmentPattern(context: Context): ESTree.AssignmentPattern {
        const pos = this.getLocations();
        const pattern = this.parseBindingPatternOrIdentifier(context, pos);
        if (!this.parseOptional(context, Token.Assign)) return pattern;
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
            default:
                return this.parseBindingIdentifier(context);
        }
    }

    private parseBindingIdentifier(context: Context): ESTree.Identifier {

        const pos = this.getLocations();

        const name = this.tokenValue;
        const token = this.token;

        if (!this.isIdentifier(context, token)) this.error(Errors.Unexpected);

        if (context & Context.Strict && this.isEvalOrArguments(name)) this.error(Errors.StrictLHSAssignment);

        if (context & Context.Async && token === Token.AwaitKeyword) {
            this.error(Errors.UnexpectedToken, tokenDesc(token));
        }

        if (this.flags & Flags.HasUnicode && this.token === Token.YieldKeyword) this.error(Errors.InvalidEscapedReservedWord);

        this.addVarOrBlock(context, name);

        this.nextToken(context);

        return this.finishNode(pos, {
            type: 'Identifier',
            name
        });
    }

    private parseAssignmentRestElement(context: Context): ESTree.RestElement {
        const pos = this.getLocations();
        this.expect(context, Token.Ellipsis);
        const argument = this.parseBindingPatternOrIdentifier(context, pos);
        if (this.token === Token.Assign) this.error(Errors.DefaultRestParameter);
        return this.finishNode(pos, {
            type: 'RestElement',
            argument
        });
    }

    private parseAssignmentElementList(context: Context) {
        const pos = this.getLocations();
        this.expect(context, Token.LeftBracket);

        const elements: (ESTree.Pattern | null)[] = [];
        while (this.token !== Token.RightBracket) {
            if (this.parseOptional(context, Token.Comma)) {
                elements.push(null);
            } else {
                if (this.token === Token.Ellipsis) {
                    elements.push(this.parseAssignmentRestElement(context));
                    break;
                }
                elements.push(this.parseArrayAssignmentPattern(context | Context.AllowIn));

                if (this.token !== Token.RightBracket) this.expect(context, Token.Comma);
            }
        }

        this.expect(context, Token.RightBracket);

        return this.finishNode(pos, {
            type: 'ArrayPattern',
            elements
        });
    }

    private parseArrayAssignmentPattern(context: Context): ESTree.AssignmentPattern {
        return this.parseAssignmentPattern(context);
    }

    private ObjectAssignmentPattern(context: Context, pos: Location) {
        const properties: (ESTree.AssignmentProperty | ESTree.RestElement)[] = [];

        this.expect(context, Token.LeftBrace);

        while (this.token !== Token.RightBrace) {
            if (this.token === Token.Ellipsis) {
                if (!(this.flags & Flags.OptionsNext)) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                properties.push(this.parseRestProperty(context));
            } else {
                properties.push(this.parseAssignmentProperty(context));
            }
            if (this.token !== Token.RightBrace) this.parseOptional(context, Token.Comma);
        }

        this.expect(context, Token.RightBrace);

        return this.finishNode(pos, {
            type: 'ObjectPattern',
            properties
        });
    }

    private parseRestProperty(context: Context): ESTree.RestElement {
        const pos = this.getLocations();
        this.expect(context, Token.Ellipsis);

        if (this.token !== Token.Identifier) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        const arg = this.parseBindingPatternOrIdentifier(context, pos);
        if (this.token === Token.Assign) this.error(Errors.DefaultRestProperty);

        return this.finishNode(pos, {
            type: 'RestElement',
            argument: arg
        });
    }

    private parseAssignmentProperty(context: Context): ESTree.AssignmentProperty {

        let pos = this.getLocations();

        let computed = false;
        let shorthand = false;
        const method = false;

        let key;
        let value;

        if (this.isIdentifier(context, this.token)) {
            pos = this.getLocations();
            const keyToken = this.token;
            const tokenValue = this.tokenValue;
            key = this.parsePropertyName(context);
            const init = this.finishNode(pos, {
                type: 'Identifier',
                name: tokenValue
            });
            if (this.token === Token.Assign) {
                shorthand = true;
                this.nextToken(context);
                const expr = this.parseAssignmentExpression(context);
                value = this.finishNode(pos, {
                    type: 'AssignmentPattern',
                    left: init,
                    right: expr
                });
            } else if (this.token !== Token.Colon) {
                shorthand = true;
                value = init;
            } else {
                this.expect(context, Token.Colon);
                value = this.parseAssignmentPattern(context);
            }
        } else {
            computed = this.token === Token.LeftBracket;
            key = this.parsePropertyName(context);
            this.expect(context, Token.Colon);
            value = this.parseAssignmentPattern(context);
        }

        return this.finishNode(pos, {
            type: 'Property',
            kind: 'init',
            key,
            computed,
            value,
            method,
            shorthand
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

    /** V8 */

    private parseDoExpression(context: Context): ESTree.Expression {
        const pos = this.getLocations();
        this.expect(context, Token.DoKeyword);
        const body = this.parseBlockStatement(context);
        return this.finishNode(pos, {
            type: 'DoExpression',
            body
        });
    }
}