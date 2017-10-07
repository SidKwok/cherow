var hasOwn = Object.prototype.hasOwnProperty;
function tryCreate(pattern, flags) {
    try {
        return new RegExp(pattern, flags);
    }
    catch (e) {
        return null;
    }
}
/**
 * Convert code points
 * @param codePoint
 */
function fromCodePoint(codePoint) {
    if (codePoint <= 0xFFFF)
        { return String.fromCharCode(codePoint); }
    return String.fromCharCode(((codePoint - 0x10000) >> 10) + 0x0D800, ((codePoint - 0x10000) & (1024 - 1)) + 0x0DC00);
}
function toHex(code) {
    if (code < 48 /* Zero */)
        { return -1; }
    if (code <= 57 /* Nine */)
        { return code - 48 /* Zero */; }
    if (code < 65 /* UpperA */)
        { return -1; }
    if (code <= 70 /* UpperF */)
        { return code - 65 /* UpperA */ + 10; }
    if (code < 97 /* LowerA */)
        { return -1; }
    if (code <= 102 /* LowerF */)
        { return code - 97 /* LowerA */ + 10; }
    return -1;
}
/**
 * Returns true if the "node" contains a directive prologue
 *
 * @param node Statement
 */
/**
 * Returns true if the "node" contains a directive prologue
 *
 * @param node Statement
 */
function isDirective(node) {
    return node.type === 'ExpressionStatement' &&
        node.expression.type === 'Literal' &&
        typeof node.expression.value === 'string';
}
/**
 * Returns true if match
 *
 * @param mask number
 * @param flags number
 */
function hasMask(mask, flags) {
    return (mask & flags) === flags;
}
// Fully qualified element name, e.g. <svg:path> returns "svg:path"


function isValidSimpleAssignmentTarget(expr) {
    switch (expr.type) {
        case 'Identifier':
        case 'MemberExpression':
            return true;
        default:
            return false;
    }
}

var ErrorMessages = {};
ErrorMessages[0 /* Unexpected */] = 'Unexpected token';
ErrorMessages[1 /* UnexpectedToken */] = 'Unexpected token \'%0\'';
ErrorMessages[2 /* UnterminatedComment */] = 'Unterminated comment';
ErrorMessages[3 /* UnterminatedString */] = 'Unterminated string literal';
ErrorMessages[4 /* UnterminatedRegExp */] = 'Unterminated regular expression literal';
ErrorMessages[5 /* UnicodeOutOfRange */] = 'Unicode escape code point out of range';
ErrorMessages[6 /* InvalidUnicodeEscapeSequence */] = 'Invalid Unicode escape sequence';
ErrorMessages[7 /* StrictOctalEscape */] = 'Octal escapes are not allowed in strict mode';
ErrorMessages[8 /* InvalidEightAndNine */] = 'Escapes \\8 or \\9 are not syntactically valid escapes';
ErrorMessages[9 /* StrictOctalLiteral */] = 'Octal literals are not allowed in strict mode';
ErrorMessages[10 /* MissingShebangExclamation */] = 'Missing exclamation in shebang';
ErrorMessages[11 /* DuplicateRegExpFlag */] = 'Duplicate flags supplied to RegExp constructor %0';
ErrorMessages[12 /* UnexpectedTokenRegExp */] = 'Unexpected regular expression';
ErrorMessages[13 /* UnexpectedTokenRegExpFlag */] = 'Unexpected regular expression flag';
ErrorMessages[14 /* BadImportCallArity */] = 'Dynamic import must have one specifier as an argument';
ErrorMessages[15 /* StrictFunction */] = 'In strict mode code, functions can only be declared at top level or inside a block';
ErrorMessages[16 /* BadContinue */] = 'Continue must be inside loop or switch statement';
ErrorMessages[17 /* IllegalBreak */] = 'Unlabeled break must be inside loop or switch';
ErrorMessages[19 /* IllegalReturn */] = 'Illegal return statement';
ErrorMessages[18 /* MultipleDefaultsInSwitch */] = 'More than one default clause in switch statement';
ErrorMessages[20 /* NoCatchOrFinally */] = 'Missing catch or finally after try';
ErrorMessages[21 /* LineBreakAfterThrow */] = 'No line break is allowed between \'throw\' and its expression';
ErrorMessages[22 /* StrictModeWith */] = 'Strict mode code may not include a with statement';
ErrorMessages[23 /* DefaultRestProperty */] = 'Unexpected token =';
ErrorMessages[24 /* BadGetterArity */] = 'Getter must not have any formal parameters';
ErrorMessages[25 /* BadSetterArity */] = 'Setter must have exactly one formal parameter';
ErrorMessages[26 /* BadSetterRestParameter */] = 'Setter function argument must not be a rest parameter';
ErrorMessages[27 /* DefaultRestParameter */] = 'Unexpected token =';
ErrorMessages[28 /* IllegalUseStrict */] = 'Illegal \'use strict\' directive in function with non-simple parameter list';
ErrorMessages[29 /* ParameterAfterRestParameter */] = 'Rest parameter must be last formal parameter';
ErrorMessages[72 /* UnexpectedRestElement */] = 'Unexpected Rest element';
ErrorMessages[30 /* StrictFunctionName */] = 'Function name may not be eval or arguments in strict mode code';
ErrorMessages[31 /* UnexpectedNewTarget */] = 'new.target only allowed within functions';
ErrorMessages[32 /* MetaNotInFunctionBody */] = 'new.target only allowed within functions';
ErrorMessages[33 /* DeclarationMissingInitializer */] = 'Missing = in %0 declaration';
ErrorMessages[35 /* InvalidLHSInForLoop */] = 'Invalid left-hand side in for-loop';
ErrorMessages[34 /* InvalidVarInitForOf */] = 'Invalid variable declaration in for-of statement';
ErrorMessages[36 /* InvalidLHSInForIn */] = 'Invalid left-hand side in for-in';
ErrorMessages[37 /* StrictLHSAssignment */] = 'Eval or arguments can\'t be assigned to in strict mode code';
ErrorMessages[38 /* InvalidLHSInAssignment */] = 'Invalid left-hand side in assignment';
ErrorMessages[39 /* UnexpectedArrow */] = 'No line break is allowed before \'=>\'';
ErrorMessages[75 /* MissingArrowAfterParentheses */] = 'Missing => after parentheses';
ErrorMessages[71 /* UnexpectedRest */] = 'Unexpected token ...';
ErrorMessages[40 /* MissingAsImportSpecifier */] = 'Missing \'as\' keyword in import namespace specifier';
ErrorMessages[41 /* NoAsAfterImportNamespace */] = 'Missing \'as\' keyword after import namespace';
ErrorMessages[42 /* InvalidModuleSpecifier */] = 'Invalid module specifier';
ErrorMessages[43 /* NonEmptyJSXExpression */] = 'JSX attributes must only be assigned a non-empty  \'expression\'';
ErrorMessages[44 /* ExpectedJSXClosingTag */] = 'Expected corresponding JSX closing tag for %0';
ErrorMessages[45 /* AdjacentJSXElements */] = 'Adjacent JSX elements must be wrapped in an enclosing tag';
ErrorMessages[46 /* InvalidBinaryDigit */] = 'Invalid binary digit';
ErrorMessages[47 /* InvalidOctalDigit */] = 'Invalid octal digit';
ErrorMessages[48 /* StrictDelete */] = 'Delete of an unqualified identifier in strict mode.';
ErrorMessages[49 /* StrictLHSPrefix */] = 'Prefix increment/decrement may not have eval or arguments operand in strict mode';
ErrorMessages[50 /* StrictLHSPostfix */] = 'Postfix increment/decrement may not have eval or arguments operand in strict mode';
ErrorMessages[52 /* ExportDeclAtTopLevel */] = 'Export declarations may only appear at top level of a module';
ErrorMessages[53 /* ImportDeclAtTopLevel */] = 'Import declarations may only appear at top level of a module';
ErrorMessages[54 /* MissingMsgDeclarationAfterExport */] = 'Missing declaration after \'export\' keyword';
ErrorMessages[55 /* MissingMsgDeclarationAfterImport */] = 'Missing declaration after \'import\' keyword';
ErrorMessages[56 /* ForAwaitNotOf */] = 'For await loop should be used with \'of\'';
ErrorMessages[57 /* LetInLexicalBinding */] = 'let is disallowed as a lexically bound name';
ErrorMessages[58 /* InvalidStartOfExpression */] = 'Invalid start of an expression';
ErrorMessages[59 /* UnexpectedComma */] = 'Unexpected token ,';
ErrorMessages[60 /* DuplicateProtoProperty */] = 'Property name __proto__ appears more than once in object literal';
ErrorMessages[61 /* StrictParamDupe */] = 'Duplicate argument names not allowed in this context';
ErrorMessages[62 /* InvalidHexEscapeSequence */] = 'Invalid hexadecimal escape sequence';
ErrorMessages[63 /* ConstructorSpecialMethod */] = 'Class constructor may not be an accessor';
ErrorMessages[64 /* BadSuperCall */] = 'super() is only valid in derived class constructors';
ErrorMessages[65 /* DuplicateConstructor */] = 'A class may only have one constructor';
ErrorMessages[67 /* ConstructorIsAsync */] = 'Class constructor may not be an async method';
ErrorMessages[66 /* StaticPrototype */] = 'Classes may not have static property named prototype';
ErrorMessages[69 /* ClassDeclarationNoName */] = 'Class declaration must have a name in this context';
ErrorMessages[70 /* FunctionDeclarationNoName */] = 'Function declaration must have a name in this context';
ErrorMessages[73 /* LineBreakAfterAsync */] = 'No line break is allowed after async';
ErrorMessages[74 /* InvalidEscapedReservedWord */] = 'Keyword must not contain escaped characters';
ErrorMessages[76 /* InvalidParenthesizedPattern */] = 'Invalid parenthesized pattern';
ErrorMessages[77 /* DuplicateIdentifier */] = '\'%0\' has already been declared ';
ErrorMessages[78 /* DuplicateBinding */] = 'Duplicate binding';
ErrorMessages[79 /* Redeclaration */] = 'Label \'%0\' has already been declared';
ErrorMessages[80 /* UnknownLabel */] = 'Undefined label \'%0\'';
ErrorMessages[81 /* InvalidLHSInArrow */] = ' Invalid left-hand side in arrow function parameters';
ErrorMessages[82 /* InvalidNewTargetContext */] = 'new.target expression is not allowed here';
ErrorMessages[83 /* UnexpectedReservedWord */] = 'Unexpected reserved word';
ErrorMessages[84 /* InvalidShorthandProperty */] = '\'%0\' can not be used as shorthand property';
ErrorMessages[85 /* UnterminatedTemplate */] = 'Unterminated template literal';
ErrorMessages[86 /* UnexpectedStrictReserved */] = 'Unexpected strict mode reserved word';
ErrorMessages[87 /* YieldReservedWord */] = 'yield is a reserved word inside generator functions';
ErrorMessages[88 /* YieldInParameter */] = 'Yield expression not allowed in formal parameter';
ErrorMessages[89 /* GeneratorParameter */] = 'Generator parameters must not contain yield expressions';
ErrorMessages[90 /* StrictParamName */] = 'The identifier \'eval\' or \'arguments\' must not be in binding position in strict mode';
ErrorMessages[91 /* DisallowedInContext */] = '\'%0\' may not be used as an identifier in this context';
ErrorMessages[92 /* IllegalArrowInParamList */] = 'Illegal arrow function parameter list';
ErrorMessages[93 /* UnexpectedBigIntLiteral */] = 'Unexpected BigInt literal';
ErrorMessages[94 /* UnNamedClassStmt */] = 'Class statement requires a name';
ErrorMessages[95 /* UnNamedFunctionStmt */] = 'Function statement requires a name';
ErrorMessages[96 /* InvalidStrictExpPostion */] = 'The identifier \'%0\' must not be in expression position in strict mode';
ErrorMessages[97 /* InvalidStrictLexical */] = 'Lexical declarations must not have a binding named "let"';
ErrorMessages[98 /* MissingInitializer */] = 'Missing initializer';
ErrorMessages[99 /* InvalidLabeledForOf */] = 'The body of a for-of statement must not be a labeled function declaration';
ErrorMessages[100 /* InvalidVarDeclInForIn */] = 'Invalid variable declaration in for-in statement';
ErrorMessages[102 /* InvalidNoctalInteger */] = 'Unexpected noctal integer literal';
ErrorMessages[103 /* InvalidRadix */] = 'Expected number in radix';
ErrorMessages[104 /* UnexpectedTokenNumber */] = 'Unexpected number';
ErrorMessages[105 /* UnexpectedMantissa */] = 'Unexpected mantissa';
ErrorMessages[106 /* UnexpectedSurrogate */] = 'Unexpected surrogate pair';
ErrorMessages[107 /* ForbiddenAsStatement */] = '%0 can\'t appear in single-statement context';
ErrorMessages[108 /* InvalidAsyncGenerator */] = 'Generator function or method can\'t be async';
ErrorMessages[109 /* BadPropertyId */] = 'Invalid property id';
ErrorMessages[110 /* InvalidMethod */] = 'Only methods are allowed in classes';
function constructError(msg, column) {
    var error = new Error(msg);
    try {
        throw error;
    }
    catch (base) {
        // istanbul ignore else
        if (Object.create && Object.defineProperty) {
            error = Object.create(base);
            Object.defineProperty(error, 'column', {
                value: column
            });
        }
    }
    // istanbul ignore next
    return error;
}
function createError(type, loc) {
    var params = [], len = arguments.length - 2;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 2 ];

    var description = ErrorMessages[type].replace(/%(\d+)/g, function (_, i) { return params[i]; });
    var error = constructError('Line ' + loc.line + ': ' + description, loc.column);
    error.index = loc.index;
    error.lineNumber = loc.line;
    error.description = description;
    return error;
}

var KeywordDescTable = [
    'end of source',
    /* Constants/Bindings */
    'identifier', 'number', 'string', 'regular expression',
    'false', 'true', 'null',
    /* Template nodes */
    'template continuation', 'template end',
    /* Punctuators */
    '=>', '(', '{', '.', '...', '}', ')', ';', ',', '[', ']', ':', '?', '\'', '"', '</', '/>',
    /* Update operators */
    '++', '--',
    /* Assign operators */
    '=', '<<=', '>>=', '>>>=', '**=', '+=', '-=', '*=', '/=', '%=', '^=', '|=',
    '&=',
    /* Unary/binary operators */
    'typeof', 'delete', 'void', '!', '~', '+', '-', 'in', 'instanceof', '*', '%', '/', '**', '&&',
    '||', '===', '!==', '==', '!=', '<=', '>=', '<', '>', '<<', '>>', '>>>', '&', '|', '^', '|>',
    /* Variable declaration kinds */
    'var', 'let', 'const',
    /* Other reserved words */
    'break', 'case', 'catch', 'class', 'continue', 'debugger', 'default', 'do', 'else', 'export',
    'extends', 'finally', 'for', 'function', 'if', 'import', 'new', 'return', 'super', 'switch',
    'this', 'throw', 'try', 'while', 'with',
    /* Strict mode reserved words */
    'implements', 'interface', 'package', 'private', 'protected', 'public', 'static', 'yield',
    /* Contextual keywords */
    'as', 'async', 'await', 'constructor', 'get', 'set', 'from', 'of',
    'enum'
];
/**
 * The conversion function between token and its string description/representation.
 */
function tokenDesc(token) {
    return KeywordDescTable[token & 255 /* Type */];
}
// Used `Object.create(null)` to avoid potential `Object.prototype`
// interference.
var DescKeywordTable = Object.create(null, {
    as: { value: 69740 /* AsKeyword */ },
    async: { value: 69732 /* AsyncKeyword */ },
    await: { value: 4526190 /* AwaitKeyword */ },
    break: { value: 12363 /* BreakKeyword */ },
    case: { value: 12364 /* CaseKeyword */ },
    catch: { value: 12365 /* CatchKeyword */ },
    class: { value: 274510 /* ClassKeyword */ },
    const: { value: 8663114 /* ConstKeyword */ },
    constructor: { value: 69743 /* ConstructorKeyword */ },
    continue: { value: 12367 /* ContinueKeyword */ },
    debugger: { value: 12368 /* DebuggerKeyword */ },
    default: { value: 12369 /* DefaultKeyword */ },
    delete: { value: 4468779 /* DeleteKeyword */ },
    do: { value: 12370 /* DoKeyword */ },
    enum: { value: 12404 /* EnumKeyword */ },
    else: { value: 12371 /* ElseKeyword */ },
    export: { value: 12372 /* ExportKeyword */ },
    extends: { value: 12373 /* ExtendsKeyword */ },
    false: { value: 274437 /* FalseKeyword */ },
    finally: { value: 12374 /* FinallyKeyword */ },
    for: { value: 12375 /* ForKeyword */ },
    from: { value: 69746 /* FromKeyword */ },
    function: { value: 274520 /* FunctionKeyword */ },
    get: { value: 69744 /* GetKeyword */ },
    if: { value: 12377 /* IfKeyword */ },
    implements: { value: 20580 /* ImplementsKeyword */ },
    import: { value: 274522 /* ImportKeyword */ },
    in: { value: 2111281 /* InKeyword */ },
    instanceof: { value: 2111282 /* InstanceofKeyword */ },
    interface: { value: 20581 /* InterfaceKeyword */ },
    let: { value: 8671305 /* LetKeyword */ },
    new: { value: 274523 /* NewKeyword */ },
    null: { value: 274439 /* NullKeyword */ },
    of: { value: 69747 /* OfKeyword */ },
    package: { value: 20582 /* PackageKeyword */ },
    private: { value: 20583 /* PrivateKeyword */ },
    protected: { value: 20584 /* ProtectedKeyword */ },
    public: { value: 20585 /* PublicKeyword */ },
    return: { value: 12380 /* ReturnKeyword */ },
    set: { value: 69745 /* SetKeyword */ },
    static: { value: 20586 /* StaticKeyword */ },
    super: { value: 274525 /* SuperKeyword */ },
    switch: { value: 274526 /* SwitchKeyword */ },
    this: { value: 274527 /* ThisKeyword */ },
    throw: { value: 12384 /* ThrowKeyword */ },
    true: { value: 274438 /* TrueKeyword */ },
    try: { value: 12385 /* TryKeyword */ },
    typeof: { value: 4468778 /* TypeofKeyword */ },
    var: { value: 8663112 /* VarKeyword */ },
    void: { value: 4468780 /* VoidKeyword */ },
    while: { value: 12386 /* WhileKeyword */ },
    with: { value: 12387 /* WithKeyword */ },
    yield: { value: 282731 /* YieldKeyword */ },
});
function descKeyword(value) {
    return (DescKeywordTable[value] | 0);
}

var convert = (function (compressed, dict) {
    var result = new Uint32Array(104448);
    var index = 0;
    var subIndex = 0;
    while (index < 3293) {
        var inst = compressed[index++];
        if (inst < 0) {
            subIndex -= inst;
        }
        else {
            var code = compressed[index++];
            if (inst & 2)
                { code = dict[code]; }
            if (inst & 1) {
                result.fill(code, subIndex, subIndex += compressed[index++]);
            }
            else {
                result[subIndex++] = code;
            }
        }
    }
    return result;
})([-1, 2, 28, 2, 29, 2, 5, -1, 0, 77595648, 3, 41, 2, 3, 0, 14, 2, 52, 2, 53, 3, 0, 3, 0, 3168796671, 0, 4294956992, 2, 1, 2, 0, 2, 54, 3, 0, 4, 0, 4294966523, 3, 0, 4, 2, 55, 2, 56, 2, 4, 0, 4294836479, 0, 3221225471, 0, 4294901942, 2, 57, 0, 134152192, 3, 0, 2, 0, 4294951935, 3, 0, 2, 0, 2683305983, 0, 2684354047, 2, 17, 2, 0, 0, 4294961151, 3, 0, 2, 2, 20, 2, 0, 2, 59, 2, 0, 2, 125, 2, 6, 2, 19, -1, 2, 60, 2, 148, 2, 1, 3, 0, 3, 0, 4294901711, 2, 37, 0, 4089839103, 0, 2961209759, 0, 268697551, 0, 4294543342, 0, 3547201023, 0, 1577204103, 0, 4194240, 0, 4294688750, 2, 2, 0, 80831, 0, 4261478351, 0, 4294549486, 2, 2, 0, 2965387679, 0, 196559, 0, 3594373100, 0, 3288319768, 0, 8469959, 2, 167, 2, 3, 0, 3825204735, 0, 123747807, 0, 65487, 2, 3, 0, 4092591615, 0, 1080049119, 0, 458703, 2, 3, 2, 0, 0, 2163244511, 0, 4227923919, 0, 4236247020, 2, 64, 0, 4284449919, 0, 851904, 2, 4, 2, 16, 0, 67076095, -1, 2, 65, 0, 1006628014, 0, 4093591391, -1, 0, 50331649, 0, 3265266687, 2, 34, 0, 4294844415, 0, 4278190047, 2, 22, 2, 124, -1, 3, 0, 2, 2, 33, 2, 0, 2, 10, 2, 0, 2, 14, 2, 15, 3, 0, 10, 2, 66, 2, 0, 2, 67, 2, 68, 2, 69, 2, 0, 2, 70, 2, 0, 0, 3892314111, 0, 261632, 2, 27, 3, 0, 2, 2, 11, 2, 4, 3, 0, 18, 2, 71, 2, 5, 3, 0, 2, 2, 72, 0, 2088959, 2, 31, 2, 8, 0, 909311, 3, 0, 2, 0, 814743551, 2, 39, 0, 67057664, 3, 0, 2, 2, 9, 2, 0, 2, 32, 2, 0, 2, 18, 2, 7, 0, 268374015, 2, 30, 2, 46, 2, 0, 2, 73, 0, 134153215, -1, 2, 6, 2, 0, 2, 7, 0, 2684354559, 0, 67044351, 0, 1073676416, -2, 3, 0, 2, 2, 40, 0, 1046528, 3, 0, 3, 2, 8, 2, 0, 2, 9, 0, 4294960127, 2, 10, 2, 13, -1, 0, 4294377472, 2, 25, 3, 0, 7, 0, 4227858431, 3, 0, 8, 2, 11, 2, 0, 2, 75, 2, 10, 2, 0, 2, 76, 2, 77, 2, 78, -1, 2, 121, 0, 1048577, 2, 79, 2, 12, -1, 2, 12, 0, 131042, 2, 80, 2, 81, 2, 82, 2, 0, 2, 13, -83, 2, 0, 2, 49, 2, 7, 3, 0, 4, 0, 1046559, 2, 0, 2, 14, 2, 0, 0, 2147516671, 2, 23, 3, 83, 2, 2, 0, -16, 2, 84, 0, 524222462, 2, 4, 2, 0, 0, 4269801471, 2, 4, 2, 0, 2, 15, 2, 74, 2, 86, 3, 0, 2, 2, 43, 2, 16, -1, 2, 17, -16, 3, 0, 205, 2, 18, -2, 3, 0, 655, 2, 19, 3, 0, 36, 2, 47, -1, 2, 17, 2, 10, 3, 0, 8, 2, 87, 2, 117, 2, 0, 0, 3220242431, 3, 0, 3, 2, 20, 2, 21, 2, 88, 3, 0, 2, 2, 89, 2, 90, -1, 2, 21, 2, 0, 2, 26, 2, 0, 2, 8, 3, 0, 2, 0, 67043391, 0, 687865855, 2, 0, 2, 24, 2, 8, 2, 22, 3, 0, 2, 0, 67076097, 2, 7, 2, 0, 2, 23, 0, 67059711, 0, 4236247039, 3, 0, 2, 0, 939524103, 0, 8191999, 2, 94, 2, 95, 2, 15, 2, 92, 3, 0, 3, 0, 67057663, 3, 0, 349, 2, 96, 2, 97, 2, 6, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 25, -1, 0, 3774349439, 2, 98, 2, 99, 3, 0, 2, 2, 20, 2, 100, 3, 0, 10, 2, 10, 2, 17, 2, 0, 2, 42, 2, 0, 2, 26, 2, 101, 2, 27, 0, 1638399, 2, 165, 2, 102, 3, 0, 3, 2, 22, 2, 28, 2, 29, 2, 5, 2, 30, 2, 0, 2, 7, 2, 103, -1, 2, 104, 2, 105, 2, 106, -1, 3, 0, 3, 2, 16, -2, 2, 0, 2, 31, -3, 2, 144, -4, 2, 22, 2, 0, 2, 107, 0, 1, 2, 0, 2, 58, 2, 32, 2, 16, 2, 10, 2, 0, 2, 108, -1, 3, 0, 4, 2, 10, 2, 33, 2, 109, 2, 6, 2, 0, 2, 110, 2, 0, 2, 44, -4, 3, 0, 9, 2, 23, 2, 18, 2, 26, -4, 2, 111, 2, 112, 2, 18, 2, 23, 2, 7, -2, 2, 113, 2, 18, 2, 25, -2, 2, 0, 2, 114, -2, 0, 4277137519, 0, 2265972735, -1, 3, 22, 2, -1, 2, 34, 2, 36, 2, 0, 3, 18, 2, 2, 35, 2, 20, -3, 3, 0, 2, 2, 13, -1, 2, 0, 2, 35, 2, 0, 2, 35, -24, 3, 0, 2, 2, 36, 0, 2147549120, 2, 0, 2, 16, 2, 17, 2, 128, 2, 0, 2, 48, 2, 17, 0, 5242879, 3, 0, 2, 0, 402594847, -1, 2, 116, 0, 1090519039, -2, 2, 118, 2, 119, 2, 0, 2, 38, 2, 37, 2, 2, 0, 3766565279, 0, 2039759, -4, 3, 0, 2, 2, 38, -1, 3, 0, 2, 0, 67043519, -5, 2, 0, 0, 4282384383, 0, 1056964609, -1, 3, 0, 2, 0, 67043345, -1, 2, 0, 2, 9, 2, 39, -1, 0, 3825205247, 2, 40, -11, 3, 0, 2, 0, 2147484671, -8, 2, 0, 2, 7, 0, 4294901888, 2, 0, 0, 67108815, -1, 2, 0, 2, 45, -8, 2, 50, 2, 41, 0, 67043329, 2, 122, 2, 42, 0, 8388351, -2, 2, 123, 0, 3028287487, 0, 67043583, -21, 3, 0, 28, 2, 25, -3, 3, 0, 3, 2, 43, 3, 0, 6, 2, 44, -85, 3, 0, 33, 2, 43, -126, 3, 0, 18, 2, 36, -269, 3, 0, 17, 2, 45, 2, 7, 2, 39, -2, 2, 17, 2, 46, 2, 0, 2, 23, 0, 67043343, 2, 126, 2, 27, -27, 3, 0, 2, 0, 4294901791, 2, 7, 2, 187, -2, 0, 3, 3, 0, 191, 2, 47, 3, 0, 23, 2, 35, -296, 3, 0, 8, 2, 7, -2, 2, 17, 3, 0, 11, 2, 6, -72, 3, 0, 3, 2, 127, 0, 1677656575, -166, 0, 4161266656, 0, 4071, 0, 15360, -4, 0, 28, -13, 3, 0, 2, 2, 48, 2, 0, 2, 129, 2, 130, 2, 51, 2, 0, 2, 131, 2, 132, 2, 133, 3, 0, 10, 2, 134, 2, 135, 2, 15, 3, 48, 2, 3, 49, 2, 3, 50, 2, 0, 4294954999, 2, 0, -16, 2, 0, 2, 85, 2, 0, 0, 2105343, 0, 4160749584, 2, 194, -42, 0, 4194303871, 0, 2011, -62, 3, 0, 6, 0, 8323103, -1, 3, 0, 2, 2, 38, -37, 2, 51, 2, 138, 2, 139, 2, 140, 2, 141, 2, 142, -138, 3, 0, 1334, 2, 23, -1, 3, 0, 129, 2, 31, 3, 0, 6, 2, 10, 3, 0, 180, 2, 143, 3, 0, 233, 0, 1, -96, 3, 0, 16, 2, 10, -22583, 3, 0, 7, 2, 27, -6130, 3, 5, 2, -1, 0, 69207040, 3, 41, 2, 3, 0, 14, 2, 52, 2, 53, -3, 0, 3168731136, 0, 4294956864, 2, 1, 2, 0, 2, 54, 3, 0, 4, 0, 4294966275, 3, 0, 4, 2, 55, 2, 56, 2, 4, 2, 26, -1, 2, 17, 2, 57, -1, 2, 0, 2, 19, 0, 4294885376, 3, 0, 2, 0, 3145727, 0, 2617294944, 0, 4294770688, 2, 27, 2, 58, 3, 0, 2, 0, 131135, 2, 91, 0, 70256639, 2, 59, 0, 272, 2, 45, 2, 19, -1, 2, 60, -2, 2, 93, 0, 603979775, 0, 4278255616, 0, 4294836227, 0, 4294549473, 0, 600178175, 0, 2952806400, 0, 268632067, 0, 4294543328, 0, 57540095, 0, 1577058304, 0, 1835008, 0, 4294688736, 2, 61, 2, 62, 0, 33554435, 2, 120, 2, 61, 2, 145, 0, 131075, 0, 3594373096, 0, 67094296, 2, 62, -1, 2, 63, 0, 603979263, 2, 153, 0, 3, 0, 4294828001, 0, 602930687, 2, 175, 0, 393219, 2, 63, 0, 671088639, 0, 2154840064, 0, 4227858435, 0, 4236247008, 2, 64, 2, 36, -1, 2, 4, 0, 917503, 2, 36, -1, 2, 65, 0, 537783470, 0, 4026531935, -1, 0, 1, -1, 2, 34, 2, 47, 0, 7936, -3, 2, 0, 0, 2147485695, 0, 1010761728, 0, 4292984930, 0, 16387, 2, 0, 2, 14, 2, 15, 3, 0, 10, 2, 66, 2, 0, 2, 67, 2, 68, 2, 69, 2, 0, 2, 70, 2, 0, 2, 16, -1, 2, 27, 3, 0, 2, 2, 11, 2, 4, 3, 0, 18, 2, 71, 2, 5, 3, 0, 2, 2, 72, 0, 253951, 3, 20, 2, 0, 122879, 2, 0, 2, 8, 0, 276824064, -2, 3, 0, 2, 2, 9, 2, 0, 0, 4294903295, 2, 0, 2, 18, 2, 7, -1, 2, 17, 2, 46, 2, 0, 2, 73, 2, 39, -1, 2, 23, 2, 0, 2, 31, -2, 0, 128, -2, 2, 74, 2, 8, 0, 4064, -1, 2, 115, 0, 4227907585, 2, 0, 2, 191, 2, 0, 2, 44, 0, 4227915776, 2, 10, 2, 13, -2, 0, 6544896, 3, 0, 6, -2, 3, 0, 8, 2, 11, 2, 0, 2, 75, 2, 10, 2, 0, 2, 76, 2, 77, 2, 78, -3, 2, 79, 2, 12, -3, 2, 80, 2, 81, 2, 82, 2, 0, 2, 13, -83, 2, 0, 2, 49, 2, 7, 3, 0, 4, 0, 817183, 2, 0, 2, 14, 2, 0, 0, 33023, 2, 23, 3, 83, 2, -17, 2, 84, 0, 524157950, 2, 4, 2, 0, 2, 85, 2, 4, 2, 0, 2, 15, 2, 74, 2, 86, 3, 0, 2, 2, 43, 2, 16, -1, 2, 17, -16, 3, 0, 205, 2, 18, -2, 3, 0, 655, 2, 19, 3, 0, 36, 2, 47, -1, 2, 17, 2, 10, 3, 0, 8, 2, 87, 0, 3072, 2, 0, 0, 2147516415, 2, 10, 3, 0, 2, 2, 27, 2, 21, 2, 88, 3, 0, 2, 2, 89, 2, 90, -1, 2, 21, 0, 4294965179, 0, 7, 2, 0, 2, 8, 2, 88, 2, 8, -1, 0, 687603712, 2, 91, 2, 92, 2, 36, 2, 22, 2, 93, 2, 35, 2, 159, 0, 2080440287, 2, 0, 2, 13, 2, 136, 0, 3296722943, 2, 0, 0, 1046675455, 0, 939524101, 0, 1837055, 2, 94, 2, 95, 2, 15, 2, 92, 3, 0, 3, 0, 7, 3, 0, 349, 2, 96, 2, 97, 2, 6, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 25, -1, 0, 2700607615, 2, 98, 2, 99, 3, 0, 2, 2, 20, 2, 100, 3, 0, 10, 2, 10, 2, 17, 2, 0, 2, 42, 2, 0, 2, 26, 2, 101, -3, 2, 102, 3, 0, 3, 2, 22, -1, 3, 5, 2, 2, 30, 2, 0, 2, 7, 2, 103, -1, 2, 104, 2, 105, 2, 106, -1, 3, 0, 3, 2, 16, -2, 2, 0, 2, 31, -8, 2, 22, 2, 0, 2, 107, -1, 2, 0, 2, 58, 2, 32, 2, 18, 2, 10, 2, 0, 2, 108, -1, 3, 0, 4, 2, 10, 2, 17, 2, 109, 2, 6, 2, 0, 2, 110, 2, 0, 2, 44, -4, 3, 0, 9, 2, 23, 2, 18, 2, 26, -4, 2, 111, 2, 112, 2, 18, 2, 23, 2, 7, -2, 2, 113, 2, 18, 2, 25, -2, 2, 0, 2, 114, -2, 0, 4277075969, 2, 8, -1, 3, 22, 2, -1, 2, 34, 2, 137, 2, 0, 3, 18, 2, 2, 35, 2, 20, -3, 3, 0, 2, 2, 13, -1, 2, 0, 2, 35, 2, 0, 2, 35, -24, 2, 115, 2, 9, -2, 2, 115, 2, 27, 2, 17, 2, 13, 2, 115, 2, 36, 2, 17, 0, 4718591, 2, 115, 2, 35, 0, 335544350, -1, 2, 116, 2, 117, -2, 2, 118, 2, 119, 2, 7, -1, 2, 120, 2, 61, 0, 3758161920, 0, 3, -4, 2, 0, 2, 31, 2, 170, -1, 2, 0, 2, 27, 0, 176, -5, 2, 0, 2, 43, 2, 177, -1, 2, 0, 2, 27, 2, 189, -1, 2, 0, 2, 19, -2, 2, 25, -12, 3, 0, 2, 2, 121, -8, 0, 4294965249, 0, 67633151, 0, 4026597376, 2, 0, 0, 975, -1, 2, 0, 2, 45, -8, 2, 50, 2, 43, 0, 1, 2, 122, 2, 27, -3, 2, 123, 2, 107, 2, 124, -21, 3, 0, 28, 2, 25, -3, 3, 0, 3, 2, 43, 3, 0, 6, 2, 44, -85, 3, 0, 33, 2, 43, -126, 3, 0, 18, 2, 36, -269, 3, 0, 17, 2, 45, 2, 7, -3, 2, 17, 2, 125, 2, 0, 2, 27, 2, 44, 2, 126, 2, 27, -27, 3, 0, 2, 0, 65567, -1, 2, 100, -2, 0, 3, 3, 0, 191, 2, 47, 3, 0, 23, 2, 35, -296, 3, 0, 8, 2, 7, -2, 2, 17, 3, 0, 11, 2, 6, -72, 3, 0, 3, 2, 127, 2, 128, -187, 3, 0, 2, 2, 48, 2, 0, 2, 129, 2, 130, 2, 51, 2, 0, 2, 131, 2, 132, 2, 133, 3, 0, 10, 2, 134, 2, 135, 2, 15, 3, 48, 2, 3, 49, 2, 3, 50, 2, 2, 136, -129, 3, 0, 6, 2, 137, -1, 3, 0, 2, 2, 44, -37, 2, 51, 2, 138, 2, 139, 2, 140, 2, 141, 2, 142, -138, 3, 0, 1334, 2, 23, -1, 3, 0, 129, 2, 31, 3, 0, 6, 2, 10, 3, 0, 180, 2, 143, 3, 0, 233, 0, 1, -96, 3, 0, 16, 2, 10, -28719, 2, 0, 0, 1, -1, 2, 121, 2, 0, 0, 8193, -21, 0, 50331648, 0, 10255, 0, 4, -11, 2, 62, 2, 163, 0, 1, 0, 71936, -1, 2, 154, 0, 4292933632, 0, 805306431, -5, 2, 144, -1, 2, 172, -1, 0, 6144, -2, 2, 122, -1, 2, 164, -1, 2, 150, 2, 145, 2, 158, 2, 0, 0, 3223322624, 2, 8, 0, 4, -4, 2, 183, 0, 205128192, 0, 1333757536, 0, 3221225520, 0, 423953, 0, 747766272, 0, 2717763192, 0, 4290773055, 0, 278545, 2, 146, 0, 4294886464, 0, 33292336, 0, 417809, 2, 146, 0, 1329579616, 0, 4278190128, 0, 700594195, 0, 1006647527, 0, 4286497336, 0, 4160749631, 2, 147, 0, 469762560, 0, 4171219488, 0, 16711728, 2, 147, 0, 202375680, 0, 3214918176, 0, 4294508592, 2, 147, -1, 0, 983584, 0, 48, 0, 58720275, 0, 3489923072, 0, 10517376, 0, 4293066815, 0, 1, 0, 2013265920, 2, 171, 2, 0, 0, 17816169, 0, 3288339281, 0, 201375904, 2, 0, -2, 0, 256, 0, 122880, 0, 16777216, 2, 144, 0, 4160757760, 2, 0, -6, 2, 160, -11, 0, 3263218176, -1, 0, 49664, 0, 2160197632, 0, 8388802, -1, 0, 12713984, -1, 0, 402653184, 2, 152, 2, 155, -2, 2, 156, -20, 0, 3758096385, -2, 2, 185, 0, 4292878336, 2, 21, 2, 148, 0, 4294057984, -2, 2, 157, 2, 149, 2, 168, -2, 2, 166, -1, 2, 174, -1, 2, 162, 2, 121, 0, 4026593280, 0, 14, 0, 4292919296, -1, 2, 151, 0, 939588608, -1, 0, 805306368, -1, 2, 121, 0, 1610612736, 2, 149, 2, 150, 3, 0, 2, -2, 2, 151, 2, 152, -3, 0, 267386880, -1, 2, 153, 0, 7168, -1, 2, 180, 2, 0, 2, 154, 2, 155, -7, 2, 161, -8, 2, 156, -1, 0, 1426112704, 2, 157, -1, 2, 181, 0, 271581216, 0, 2149777408, 2, 27, 2, 154, 2, 121, 0, 851967, 0, 3758129152, -1, 2, 27, 2, 173, -4, 2, 151, -20, 2, 188, 2, 158, -56, 0, 3145728, 2, 179, 2, 184, 0, 4294443520, 2, 73, -1, 2, 159, 2, 121, -4, 0, 32505856, -1, 2, 160, -1, 0, 2147385088, 2, 21, 1, 2155905152, 2, -3, 2, 91, 2, 0, 2, 161, -2, 2, 148, -6, 2, 162, 0, 4026597375, 0, 1, -1, 0, 1, -1, 2, 163, -3, 2, 137, 2, 190, -2, 2, 159, 2, 164, -1, 2, 169, 2, 121, -6, 2, 121, -213, 2, 162, -657, 2, 158, -36, 2, 165, -1, 0, 65408, -10, 2, 193, -5, 2, 166, -5, 0, 4278222848, 2, 0, 2, 23, -1, 0, 4227919872, -1, 2, 166, -2, 0, 4227874752, 2, 157, -2, 0, 2146435072, 2, 152, -2, 0, 1006649344, 2, 121, -1, 2, 21, 0, 201375744, -3, 0, 134217720, 2, 21, 0, 4286677377, 0, 32896, -1, 2, 167, -3, 2, 168, -349, 2, 169, 2, 170, 2, 171, 3, 0, 264, -11, 2, 172, -2, 2, 155, 2, 0, 0, 520617856, 0, 2692743168, 0, 36, -3, 0, 524284, -11, 2, 27, -1, 2, 178, -1, 2, 176, 0, 3221291007, 2, 155, -1, 0, 524288, 0, 2158720, -3, 2, 152, 0, 1, -4, 2, 121, 0, 3808625411, 0, 3489628288, 0, 4096, 0, 1207959680, 0, 3221274624, 2, 0, -3, 2, 164, 0, 120, 0, 7340032, -2, 0, 4026564608, 2, 4, 2, 27, 2, 157, 3, 0, 4, 2, 152, -1, 2, 173, 2, 171, -1, 0, 8176, 2, 174, 2, 164, 2, 175, -1, 0, 4290773232, 2, 0, -4, 2, 157, 2, 182, 0, 15728640, 2, 171, -1, 2, 154, -1, 0, 4294934512, 3, 0, 4, -9, 2, 21, 2, 162, 2, 176, 3, 0, 4, 0, 704, 0, 1849688064, 0, 4194304, -1, 2, 121, 0, 4294901887, 2, 0, 0, 130547712, 0, 1879048192, 0, 2080374784, 3, 0, 2, -1, 2, 177, 2, 178, -1, 0, 17829776, 0, 2028994560, 0, 4261478144, -2, 2, 0, -1, 0, 4286580608, -1, 0, 29360128, 2, 179, 0, 16252928, 0, 3791388672, 2, 119, 3, 0, 2, -2, 2, 180, 2, 0, -1, 2, 100, -1, 0, 66584576, 3, 0, 11, 2, 121, 3, 0, 12, -2, 0, 245760, 0, 2147418112, -1, 2, 144, 2, 195, 0, 4227923456, -1, 2, 181, 2, 169, 2, 21, -2, 2, 172, 0, 4292870145, 0, 262144, 2, 121, 3, 0, 2, 0, 1073758848, 2, 182, -1, 0, 4227921920, 2, 183, 2, 146, 0, 528402016, 0, 4292927536, 3, 0, 4, -2, 0, 3556769792, 2, 0, -2, 2, 186, 3, 0, 5, -1, 2, 179, 2, 157, 2, 0, -2, 0, 4227923936, 2, 58, -1, 2, 166, 2, 91, 2, 0, 2, 184, 2, 151, 3, 0, 11, -2, 0, 2146959360, 3, 0, 8, -2, 2, 154, -1, 0, 536870960, 2, 115, -1, 2, 185, 3, 0, 8, 0, 512, 0, 8388608, 2, 167, 2, 165, 2, 178, 0, 4286578944, 3, 0, 2, 0, 1152, 0, 1266679808, 2, 186, 3, 0, 21, -28, 2, 155, 3, 0, 3, -3, 0, 4292902912, -6, 2, 93, 3, 0, 85, -33, 2, 187, 3, 0, 126, -18, 2, 188, 3, 0, 269, -17, 2, 185, 2, 121, 0, 4294917120, 3, 0, 2, 2, 27, 0, 4290822144, -2, 0, 67174336, 0, 520093700, 2, 17, 3, 0, 27, -2, 0, 65504, 2, 121, 2, 43, 3, 0, 2, 2, 88, -191, 2, 58, -23, 2, 100, 3, 0, 296, -8, 2, 121, 3, 0, 2, 2, 27, -11, 2, 171, 3, 0, 72, -3, 0, 3758159872, 0, 201391616, 3, 0, 155, -7, 2, 162, -1, 0, 384, -1, 0, 133693440, -3, 2, 180, -2, 2, 30, 3, 0, 5, -2, 2, 21, 2, 122, 3, 0, 4, -2, 2, 181, -1, 2, 144, 0, 335552923, 2, 189, -1, 0, 538974272, 0, 2214592512, 0, 132000, -10, 0, 192, -8, 0, 12288, -21, 0, 134213632, 0, 4294901761, 3, 0, 42, 0, 100663424, 0, 4294965284, 3, 0, 62, -6, 0, 4286578784, 2, 0, -2, 0, 1006696448, 3, 0, 37, 2, 189, 0, 4110942569, 0, 1432950139, 0, 2701658217, 0, 4026532864, 0, 4026532881, 2, 0, 2, 42, 3, 0, 8, -1, 2, 151, -2, 2, 148, 2, 190, 0, 65537, 2, 162, 2, 165, 2, 159, -1, 2, 151, -1, 2, 58, 2, 0, 2, 191, 0, 65528, 2, 171, 0, 4294770176, 2, 30, 3, 0, 4, -30, 2, 192, 0, 4261470208, -3, 2, 148, -2, 2, 192, 2, 0, 2, 151, -1, 2, 186, -1, 2, 154, 0, 4294950912, 3, 0, 2, 2, 151, 2, 121, 2, 165, 2, 193, 2, 166, 2, 0, 2, 194, 2, 188, 3, 0, 48, -1334, 2, 21, 2, 0, -129, 2, 192, -6, 2, 157, -180, 2, 195, -233, 2, 4, 3, 0, 96, -16, 2, 157, 3, 0, 22583, -7, 2, 17, 3, 0, 6128], [4294967295, 4294967291, 4092460543, 4294828015, 4294967294, 134217726, 268435455, 2147483647, 1048575, 16777215, 1073741823, 1061158911, 536805376, 511, 4294910143, 4160749567, 134217727, 4294901760, 4194303, 2047, 262143, 4286578688, 536870911, 8388607, 4294918143, 67108863, 255, 65535, 67043328, 2281701374, 4294967232, 2097151, 4294903807, 4294902783, 4294967039, 524287, 127, 4294549487, 67045375, 1023, 67047423, 4286578687, 4294770687, 32767, 15, 33554431, 2047999, 8191, 4292870143, 4294934527, 4294966783, 4294967279, 262083, 20511, 4290772991, 4294901759, 41943039, 460799, 4294959104, 71303167, 1071644671, 602799615, 65536, 4294828000, 805044223, 4277151126, 1031749119, 4294917631, 2134769663, 4286578493, 4282253311, 4294942719, 33540095, 4294905855, 4294967264, 2868854591, 1608515583, 265232348, 534519807, 2147614720, 1060109444, 4093640016, 17376, 2139062143, 224, 4169138175, 4294868991, 4294909951, 4294967292, 4294965759, 16744447, 4294966272, 4294901823, 4294967280, 8289918, 4294934399, 4294901775, 4294965375, 1602223615, 4294967259, 4294443008, 268369920, 4292804608, 486341884, 4294963199, 3087007615, 1073692671, 131071, 4128527, 4279238655, 4294902015, 4294966591, 2445279231, 3670015, 3238002687, 4294967288, 4294705151, 4095, 3221208447, 4294902271, 4294549472, 2147483648, 4294705152, 4294966143, 64, 16383, 3774873592, 536807423, 67043839, 3758096383, 3959414372, 3755993023, 2080374783, 4294835295, 4294967103, 4160749565, 4087, 31, 184024726, 2862017156, 1593309078, 268434431, 268434414, 4294901763, 536870912, 2952790016, 202506752, 139280, 4293918720, 4227922944, 2147532800, 61440, 3758096384, 117440512, 65280, 4227858432, 3233808384, 3221225472, 4294965248, 32768, 57152, 67108864, 4290772992, 25165824, 4160749568, 57344, 4278190080, 65472, 4227907584, 65520, 1920, 4026531840, 49152, 4294836224, 63488, 1073741824, 4294967040, 251658240, 196608, 12582912, 4294966784, 2097152, 64512, 417808, 469762048, 4261412864, 4227923712, 4294934528, 4294967168, 16, 98304, 63, 4292870144, 4294963200, 65534, 65532]);
function isvalidIdentifierContinue(code) {
    return (convert[(code >>> 5) + 0] >>> code & 31 & 1) !== 0;
}
function isValidIdentifierStart(code) {
    return (convert[(code >>> 5) + 34816] >>> code & 31 & 1) !== 0;
}
function isIdentifierStart(ch) {
    return ch >= 65 /* UpperA */ && ch <= 90 /* UpperZ */ || ch >= 97 /* LowerA */ && ch <= 122 /* LowerZ */ ||
        ch === 36 /* Dollar */ || ch === 95 /* Underscore */ ||
        ch > 127 /* MaxAsciiCharacter */ && isValidIdentifierStart(ch);
}
function isIdentifierPart(ch) {
    return ch >= 65 /* UpperA */ && ch <= 90 /* UpperZ */ || ch >= 97 /* LowerA */ && ch <= 122 /* LowerZ */ ||
        ch >= 48 /* Zero */ && ch <= 57 /* Nine */ || ch === 36 /* Dollar */ || ch === 95 /* Underscore */ ||
        ch > 127 /* MaxAsciiCharacter */ && isvalidIdentifierContinue(ch);
}

var Parser = function Parser(source, options) {
    this.flags = 0 /* None */;
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
    if (options.next)
        { this.flags |= 131072 /* OptionsNext */; }
    if (options.comments)
        { this.flags |= 262144 /* OptionsOnComment */; }
    if (options.jsx)
        { this.flags |= 32768 /* OptionsJSX */; }
    if (options.locations)
        { this.flags |= 8192 /* OptionsLoc */; }
    if (options.ranges)
        { this.flags |= 4096 /* OptionsRanges */; }
    if (options.raw)
        { this.flags |= 65536 /* OptionsRaw */; }
    if (options.v8)
        { this.flags |= 1048576 /* OptionsV8 */; }
    if (this.flags & 262144 /* OptionsOnComment */)
        { this.comments = options.comments; }
};
// 'strict' are a pre-set bitmask in 'module code',
// so no need to check for strict directives, and the
// 'body' are different. (thus the duplicate code path).
Parser.prototype.parseModule = function parseModule (context) {
    var node = {
        type: 'Program',
        body: this.ParseModuleItemList(context | 16 /* AllowIn */),
        sourceType: 'module'
    };
    if (this.flags & 4096 /* OptionsRanges */) {
        node.start = 0;
        node.end = this.source.length;
    }
    if (this.flags & 8192 /* OptionsLoc */) {
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
};
Parser.prototype.parseScript = function parseScript (context) {
    this.nextToken(context);
    var node = {
        type: 'Program',
        body: this.parseStatementList(context | 16 /* AllowIn */, 0 /* EndOfSource */),
        sourceType: 'script'
    };
    if (this.flags & 4096 /* OptionsRanges */) {
        node.start = 0;
        node.end = this.source.length;
    }
    if (this.flags & 8192 /* OptionsLoc */) {
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
};
Parser.prototype.error = function error (type) {
        var params = [], len = arguments.length - 1;
        while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    throw createError.apply(void 0, [ type, this.trackErrorLocation() ].concat( params ));
};
Parser.prototype.throwError = function throwError (type) {
        var params = [], len = arguments.length - 1;
        while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    throw createError.apply(void 0, [ type, this.errorLocation ].concat( params ));
};
Parser.prototype.trackErrorLocation = function trackErrorLocation () {
    return {
        index: this.index,
        line: this.line,
        column: this.column
    };
};
Parser.prototype.saveState = function saveState () {
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
};
Parser.prototype.rewindState = function rewindState (state) {
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
};
Parser.prototype.nextToken = function nextToken (context) {
    this.token = this.scanToken(context);
    return this.token;
};
Parser.prototype.hasNext = function hasNext () {
    return this.index < this.source.length;
};
Parser.prototype.nextChar = function nextChar () {
    return this.source.charCodeAt(this.index);
};
Parser.prototype.nextUnicodeChar = function nextUnicodeChar () {
    this.advance();
    var hi = this.nextChar();
    if (hi < 0xd800 || hi > 0xdbff)
        { return hi; }
    if (this.index === this.source.length)
        { return hi; }
    var lo = this.nextChar();
    if (lo < 0xdc00 || lo > 0xdfff)
        { return hi; }
    return (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
};
/**
 * Advance to next position
 */
Parser.prototype.advance = function advance () {
    this.index++;
    this.column++;
};
Parser.prototype.advanceTwice = function advanceTwice () {
    this.index += 2;
    this.column += 2;
};
/**
 * Advance to new line
 */
Parser.prototype.advanceNewline = function advanceNewline () {
    this.flags |= 1 /* LineTerminator */;
    this.index++;
    this.column = 0;
    this.line++;
};
/**
 * Advance if the code unit matches the UTF-16 code unit at the given index.
 *
 * @param code Number
 */
Parser.prototype.consume = function consume (code) {
    if (this.nextChar() !== code)
        { return false; }
    this.advance();
    return true;
};
Parser.prototype.peekToken = function peekToken (context) {
    var savedState = this.saveState();
    this.peekedToken = this.scanToken(context);
    this.peekedState = this.saveState();
    this.rewindState(savedState);
};
/**
 * Scan the entire source code. Skips whitespace and comments, and
 * return the token at the given index.
 *
 * @param context Context
 */
Parser.prototype.scanToken = function scanToken (context) {
        var this$1 = this;

    if (this.peekedState) {
        this.rewindState(this.peekedState);
        this.peekedState = undefined;
        return this.peekedToken;
    }
    this.flags &= ~(1 /* LineTerminator */ | 2 /* HasUnicode */);
    this.endPos = this.index;
    this.endColumn = this.column;
    this.endLine = this.line;
    var state = 0;
    while (this.hasNext()) {
        this$1.startPos = this$1.index;
        this$1.startColumn = this$1.column;
        this$1.startLine = this$1.line;
        var first = this$1.nextChar();
        switch (first) {
            case 13 /* CarriageReturn */:
                this$1.advanceNewline();
                if (this$1.nextChar() === 10 /* LineFeed */) {
                    this$1.index++;
                }
                continue;
            case 10 /* LineFeed */:
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                this$1.advanceNewline();
                continue;
            case 9 /* Tab */:
            case 11 /* VerticalTab */:
            case 12 /* FormFeed */:
            case 32 /* Space */:
            case 160 /* NonBreakingSpace */:
            case 5760 /* Ogham */:
            case 8192 /* EnQuad */:
            case 8193 /* EmQuad */:
            case 8194 /* EnSpace */:
            case 8195 /* EmSpace */:
            case 8196 /* ThreePerEmSpace */:
            case 8197 /* FourPerEmSpace */:
            case 8198 /* SixPerEmSpace */:
            case 8199 /* FigureSpace */:
            case 8200 /* PunctuationSpace */:
            case 8201 /* ThinSpace */:
            case 8202 /* HairSpace */:
            case 8239 /* NarrowNoBreakSpace */:
            case 8287 /* MathematicalSpace */:
            case 12288 /* IdeographicSpace */:
            case 65279 /* ZeroWidthNoBreakSpace */:
                this$1.advance();
                continue;
            // `/`, `/=`, `/>`
            case 47 /* Slash */:
                {
                    this$1.advance();
                    var next = this$1.nextChar();
                    if (next === 47 /* Slash */) {
                        this$1.advance();
                        this$1.skipComments(state | 8 /* SingleLine */);
                        continue;
                    }
                    else if (next === 42 /* Asterisk */) {
                        this$1.advance();
                        this$1.skipComments(state | 4 /* MultiLine */);
                        continue;
                    }
                    else if (next === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310757 /* DivideAssign */;
                    }
                    return 2361909 /* Divide */;
                }
            // `<`, `<=`, `<<`, `<<=`, `</`,  <!--
            case 60 /* LessThan */:
                {
                    this$1.advance();
                    var next$1 = this$1.nextChar();
                    if (!(context & 1 /* Module */) && next$1 === 33 /* Exclamation */) {
                        this$1.advance();
                        if (this$1.consume(45 /* Hyphen */) &&
                            this$1.consume(45 /* Hyphen */)) {
                            this$1.skipComments(state | 8 /* SingleLine */);
                        }
                        continue;
                    }
                    if (next$1 === 60 /* LessThan */) {
                        this$1.advance();
                        if (this$1.consume(61 /* EqualSign */)) {
                            return 1310750 /* ShiftLeftAssign */;
                        }
                        return 2099265 /* ShiftLeft */;
                    }
                    if (next$1 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 2099005 /* LessThanOrEqual */;
                    }
                    if (this$1.flags & 32768 /* OptionsJSX */ &&
                        this$1.consume(47 /* Slash */) &&
                        !this$1.consume(42 /* Asterisk */)) {
                        return 25 /* JSXClose */;
                    }
                    return 2361151 /* LessThan */;
                }
            // -, --, -->, -=,
            case 45 /* Hyphen */:
                {
                    this$1.advance(); // skip '-'
                    var next$2 = this$1.nextChar();
                    if (next$2 === 45 /* Hyphen */) {
                        this$1.advance();
                        if (this$1.consume(62 /* GreaterThan */)) {
                            if (!(context & 1 /* Module */) || this$1.flags & 1 /* LineTerminator */) {
                                this$1.skipComments(state | 8 /* SingleLine */);
                            }
                            continue;
                        }
                        return 786460 /* Decrement */;
                    }
                    else if (next$2 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310755 /* SubtractAssign */;
                    }
                    else {
                        return 6555952 /* Subtract */;
                    }
                }
            // `#`
            case 35 /* Hash */:
                {
                    if (this$1.index === 0 &&
                        this$1.source.charCodeAt(this$1.index + 1) === 33 /* Exclamation */) {
                        this$1.advanceTwice();
                        this$1.skipComments(state);
                        continue;
                    }
                }
            // `{`
            case 123 /* LeftBrace */:
                this$1.advance();
                return 393228 /* LeftBrace */;
            // `}`
            case 125 /* RightBrace */:
                this$1.advance();
                this$1.flags |= 1 /* LineTerminator */;
                return 15 /* RightBrace */;
            // `~`
            case 126 /* Tilde */:
                this$1.advance();
                return 4456494 /* Complement */;
            // `?`
            case 63 /* QuestionMark */:
                this$1.advance();
                return 22 /* QuestionMark */;
            // `[`
            case 91 /* LeftBracket */:
                this$1.advance();
                return 393235 /* LeftBracket */;
            // `]`
            case 93 /* RightBracket */:
                this$1.advance();
                return 20 /* RightBracket */;
            // `,`
            case 44 /* Comma */:
                this$1.advance();
                return 18 /* Comma */;
            // `:`
            case 58 /* Colon */:
                this$1.advance();
                return 21 /* Colon */;
            // `;`
            case 59 /* Semicolon */:
                this$1.advance();
                return 17 /* Semicolon */;
            // `(`
            case 40 /* LeftParen */:
                this$1.advance();
                return 262155 /* LeftParen */;
            // `)`
            case 41 /* RightParen */:
                this$1.advance();
                return 16 /* RightParen */;
            // Template
            case 96 /* Backtick */:
                return this$1.scanTemplate(context);
            // `'string'`, `"string"`
            case 34 /* DoubleQuote */:
            case 39 /* SingleQuote */:
                return this$1.scanString(context, first);
            // `&`, `&&`, `&=`
            case 38 /* Ampersand */:
                {
                    this$1.advance();
                    var next$3 = this$1.nextChar();
                    if (next$3 === 38 /* Ampersand */) {
                        this$1.advance();
                        return 2097719 /* LogicalAnd */;
                    }
                    if (next$3 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310761 /* BitwiseAndAssign */;
                    }
                    return 2098500 /* BitwiseAnd */;
                }
            // `%`, `%=`
            case 37 /* Percent */:
                this$1.advance();
                if (!this$1.consume(61 /* EqualSign */))
                    { return 2099764 /* Modulo */; }
                return 1310758 /* ModuloAssign */;
            // `!`, `!=`, `!==`
            case 33 /* Exclamation */:
                this$1.advance();
                if (!this$1.consume(61 /* EqualSign */))
                    { return 4456493 /* Negate */; }
                if (!this$1.consume(61 /* EqualSign */))
                    { return 2098748 /* LooseNotEqual */; }
                return 2098746 /* StrictNotEqual */;
            // `^`, `^=`
            case 94 /* Caret */:
                this$1.advance();
                if (!this$1.consume(61 /* EqualSign */))
                    { return 2098246 /* BitwiseXor */; }
                return 1310759 /* BitwiseXorAssign */;
            // `*`, `**`, `*=`, `**=`
            case 42 /* Asterisk */:
                {
                    this$1.advance();
                    if (!this$1.hasNext())
                        { return 2099763 /* Multiply */; }
                    var next$4 = this$1.nextChar();
                    if (next$4 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310756 /* MultiplyAssign */;
                    }
                    if (next$4 !== 42 /* Asterisk */)
                        { return 2099763 /* Multiply */; }
                    this$1.advance();
                    if (!this$1.consume(61 /* EqualSign */))
                        { return 2100022 /* Exponentiate */; }
                    return 1310753 /* ExponentiateAssign */;
                }
            // `+`, `++`, `+=`
            case 43 /* Plus */:
                {
                    this$1.advance();
                    if (!this$1.hasNext())
                        { return 6555951 /* Add */; }
                    var next$5 = this$1.nextChar();
                    if (next$5 === 43 /* Plus */) {
                        this$1.advance();
                        return 786459 /* Increment */;
                    }
                    if (next$5 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310754 /* AddAssign */;
                    }
                    return 6555951 /* Add */;
                }
            // `=`, `==`, `===`, `=>`
            case 61 /* EqualSign */:
                {
                    this$1.advance();
                    if (!this$1.hasNext())
                        { return 1310749 /* Assign */; }
                    var next$6 = this$1.nextChar();
                    if (next$6 === 61 /* EqualSign */) {
                        this$1.advance();
                        if (this$1.consume(61 /* EqualSign */)) {
                            return 2098745 /* StrictEqual */;
                        }
                        else {
                            return 2098747 /* LooseEqual */;
                        }
                    }
                    else if (next$6 === 62 /* GreaterThan */) {
                        this$1.advance();
                        return 10 /* Arrow */;
                    }
                    return 1310749 /* Assign */;
                }
            // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
            case 62 /* GreaterThan */:
                {
                    this$1.advance();
                    // Fixes '<a>= == =</a>'
                    //  if (context & Context.JSXChild) return Token.GreaterThan;
                    var next$7 = this$1.nextChar();
                    if (next$7 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 2099006 /* GreaterThanOrEqual */;
                    }
                    if (next$7 !== 62 /* GreaterThan */)
                        { return 2099008 /* GreaterThan */; }
                    this$1.advance();
                    next$7 = this$1.nextChar();
                    if (next$7 === 62 /* GreaterThan */) {
                        this$1.advance();
                        if (this$1.consume(61 /* EqualSign */)) {
                            return 1310752 /* LogicalShiftRightAssign */;
                        }
                        else {
                            return 2099267 /* LogicalShiftRight */;
                        }
                    }
                    else if (next$7 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310751 /* ShiftRightAssign */;
                    }
                    return 2099266 /* ShiftRight */;
                }
            // `|`, `||`, `|=`
            case 124 /* VerticalBar */:
                {
                    this$1.advance();
                    var next$8 = this$1.nextChar();
                    if (next$8 === 124 /* VerticalBar */) {
                        this$1.advance();
                        return 2097464 /* LogicalOr */;
                    }
                    else if (next$8 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310760 /* BitwiseOrAssign */;
                    }
                    else if (next$8 === 62 /* GreaterThan */) {
                        this$1.advance();
                        return 2097735 /* Pipeline */;
                    }
                    return 2097989 /* BitwiseOr */;
                }
            // '.'
            case 46 /* Period */:
                {
                    var index = this$1.index + 1;
                    var next$9 = this$1.source.charCodeAt(index);
                    if (next$9 >= 48 /* Zero */ && next$9 <= 57 /* Nine */) {
                        this$1.scanNumber(context);
                        return 262146 /* NumericLiteral */;
                    }
                    else if (next$9 === 46 /* Period */) {
                        index++;
                        if (index < this$1.source.length &&
                            this$1.source.charCodeAt(index) === 46 /* Period */) {
                            this$1.index = index + 1;
                            this$1.column += 3;
                            return 14 /* Ellipsis */;
                        }
                    }
                    this$1.advance();
                    return 13 /* Period */;
                }
            // '0'
            case 48 /* Zero */:
                {
                    var index$1 = this$1.index + 1;
                    if (index$1 + 1 < this$1.source.length) {
                        switch (this$1.source.charCodeAt(index$1)) {
                            case 120 /* LowerX */:
                            case 88 /* UpperX */:
                                return this$1.scanHexadecimalDigit();
                            case 98 /* LowerB */:
                            case 66 /* UpperB */:
                                return this$1.scanBinaryDigits(context);
                            case 111 /* LowerO */:
                            case 79 /* UpperO */:
                                return this$1.scanOctalDigits(context);
                            default: // ignore
                        }
                    }
                    var ch = this$1.source.charCodeAt(index$1);
                    if (index$1 < this$1.source.length && ch >= 48 /* Zero */ && ch <= 55 /* Seven */) {
                        return this$1.scanNumberLiteral(context);
                    }
                }
            // '1' - '9'
            case 49 /* One */:
            case 50 /* Two */:
            case 51 /* Three */:
            case 52 /* Four */:
            case 53 /* Five */:
            case 54 /* Six */:
            case 55 /* Seven */:
            case 56 /* Eight */:
            case 57 /* Nine */:
                return this$1.scanNumber(context);
            // '\uVar', `\u{N}var`
            case 92 /* Backslash */:
            // `A`...`Z`
            case 65 /* UpperA */:
            case 66 /* UpperB */:
            case 67 /* UpperC */:
            case 68 /* UpperD */:
            case 69 /* UpperE */:
            case 70 /* UpperF */:
            case 71 /* UpperG */:
            case 72 /* UpperH */:
            case 73 /* UpperI */:
            case 74 /* UpperJ */:
            case 75 /* UpperK */:
            case 76 /* UpperL */:
            case 77 /* UpperM */:
            case 78 /* UpperN */:
            case 79 /* UpperO */:
            case 80 /* UpperP */:
            case 81 /* UpperQ */:
            case 82 /* UpperR */:
            case 83 /* UpperS */:
            case 84 /* UpperT */:
            case 85 /* UpperU */:
            case 86 /* UpperV */:
            case 87 /* UpperW */:
            case 88 /* UpperX */:
            case 89 /* UpperY */:
            case 90 /* UpperZ */:
            // '$'
            case 36 /* Dollar */:
            // '_'
            case 95 /* Underscore */:
            //  `a`...`z`
            case 97 /* LowerA */:
            case 98 /* LowerB */:
            case 99 /* LowerC */:
            case 100 /* LowerD */:
            case 101 /* LowerE */:
            case 102 /* LowerF */:
            case 103 /* LowerG */:
            case 104 /* LowerH */:
            case 105 /* LowerI */:
            case 106 /* LowerJ */:
            case 107 /* LowerK */:
            case 108 /* LowerL */:
            case 109 /* LowerM */:
            case 110 /* LowerN */:
            case 111 /* LowerO */:
            case 112 /* LowerP */:
            case 113 /* LowerQ */:
            case 114 /* LowerR */:
            case 115 /* LowerS */:
            case 116 /* LowerT */:
            case 117 /* LowerU */:
            case 118 /* LowerV */:
            case 119 /* LowerW */:
            case 120 /* LowerX */:
            case 121 /* LowerY */:
            case 122 /* LowerZ */:
                return this$1.scanIdentifier(context);
            default:
                if (isValidIdentifierStart(first))
                    { return this$1.scanIdentifier(context); }
                this$1.error(0 /* Unexpected */);
        }
    }
    return 0 /* EndOfSource */;
};
/**
 * Skips single line, shebang and multiline comments
 *
 * @param state ScannerState
 */
Parser.prototype.skipComments = function skipComments (state) {
        var this$1 = this;

    var start = this.index;
    // It's only pre-closed for shebang and single line comments
    if (!(state & 4 /* MultiLine */))
        { state |= 16 /* Closed */; }
    loop: while (this.hasNext()) {
        switch (this$1.nextChar()) {
            // Line Terminators
            case 13 /* CarriageReturn */:
                this$1.advanceNewline();
                if (this$1.nextChar() === 10 /* LineFeed */) {
                    this$1.index++;
                }
                if (!(state & 4 /* MultiLine */))
                    { break loop; }
                break;
            case 10 /* LineFeed */:
                this$1.advanceNewline();
                if (!(state & 4 /* MultiLine */))
                    { break loop; }
                break;
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                this$1.advanceNewline();
                break;
            case 42 /* Asterisk */:
                if (state & 4 /* MultiLine */) {
                    this$1.advance();
                    if (this$1.consume(47 /* Slash */)) {
                        state |= 16 /* Closed */;
                        break loop;
                    }
                    break;
                }
            // fall through
            default:
                this$1.advance();
        }
    }
    if (!(state & 16 /* Closed */))
        { this.error(2 /* UnterminatedComment */); }
    if (state & 12 /* Collectable */ && this.flags & 262144 /* OptionsOnComment */) {
        this.collectComment(state & 4 /* MultiLine */ ? 'MultiLineComment' : 'SingleLineComment', this.source.slice(start, state & 4 /* MultiLine */ ? this.index - 2 : this.index), this.startPos, this.index);
    }
};
Parser.prototype.collectComment = function collectComment (type, value, start, end) {
    var loc;
    if (this.flags & 8192 /* OptionsLoc */) {
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
    }
    else if (Array.isArray(this.comments)) {
        var node = {
            type: type,
            value: value
        };
        if (this.flags & 4096 /* OptionsRanges */) {
            node.start = start;
            node.end = end;
        }
        if (this.flags & 8192 /* OptionsLoc */) {
            node.loc = loc;
        }
        this.comments.push(node);
    }
};
Parser.prototype.scanIdentifier = function scanIdentifier (context) {
        var this$1 = this;

    var start = this.index;
    var ret = '';
    loop: while (this.hasNext()) {
        var code = this$1.nextChar();
        switch (code) {
            case 92 /* Backslash */:
                this$1.flags |= 2 /* HasUnicode */;
                ret += this$1.source.slice(start, this$1.index);
                ret += fromCodePoint(this$1.peekUnicodeEscape());
                start = this$1.index;
                break;
            default:
                if (code >= 0xd800 && code <= 0xdc00)
                    { code = this$1.nextUnicodeChar(); }
                if (!isIdentifierPart(code))
                    { break loop; }
                this$1.advance();
        }
    }
    if (start < this.index)
        { ret += this.source.slice(start, this.index); }
    var len = ret.length;
    // Invalid: 'function f() { new.t\\u0061rget; }'
    if (this.flags & 2 /* HasUnicode */ && ret === 'target')
        { this.error(74 /* InvalidEscapedReservedWord */); }
    this.tokenValue = ret;
    // Reserved words are between 2 and 11 characters long and start with a lowercase letter
    if (len >= 2 && len <= 11) {
        var ch = ret.charCodeAt(0);
        if (ch >= 97 /* LowerA */ && ch <= 122 /* LowerZ */) {
            var token = descKeyword(ret);
            if (token > 0) {
                return token;
            }
        }
    }
    return 262145 /* Identifier */;
};
/**
 * Peek unicode escape
 */
Parser.prototype.peekUnicodeEscape = function peekUnicodeEscape () {
    this.advance();
    var code = this.peekExtendedUnicodeEscape();
    if (code >= 0xd800 && code <= 0xdc00)
        { this.error(106 /* UnexpectedSurrogate */); }
    if (!isvalidIdentifierContinue(code))
        { this.error(6 /* InvalidUnicodeEscapeSequence */); }
    this.advance();
    return code;
};
Parser.prototype.scanNumberLiteral = function scanNumberLiteral (context) {
        var this$1 = this;

    if (context & 2 /* Strict */)
        { this.error(7 /* StrictOctalEscape */); }
    if (!(this.flags & 256 /* Noctal */))
        { this.flags |= 256 /* Noctal */; }
    this.advance();
    var ch = this.nextChar();
    var code = 0;
    var isDecimal = false;
    while (this.hasNext()) {
        ch = this$1.nextChar();
        if (!isDecimal && ch >= 56 /* Eight */)
            { isDecimal = true; }
        if (!(48 /* Zero */ <= ch && ch <= 57 /* Nine */))
            { break; }
        code = code * 8 + (ch - 48);
        this$1.advance();
    }
    if (this.flags & 131072 /* OptionsNext */ && this.consume(110 /* LowerN */))
        { this.flags |= 512 /* BigInt */; }
    if (this.flags & 65536 /* OptionsRaw */)
        { this.tokenRaw = this.source.slice(this.startPos, this.index); }
    this.tokenValue = isDecimal ? parseInt(this.source.slice(this.startPos, this.index), 10) : code;
    return 262146 /* NumericLiteral */;
};
Parser.prototype.scanOctalDigits = function scanOctalDigits (context) {
        var this$1 = this;

    if (context & 2 /* Strict */)
        { this.error(7 /* StrictOctalEscape */); }
    this.advanceTwice();
    var ch = this.nextChar();
    var code = ch - 48;
    // we must have at least one octal digit after 'o'/'O'
    if (ch < 48 /* Zero */ || ch >= 56 /* Eight */)
        { this.error(46 /* InvalidBinaryDigit */); }
    this.advance();
    while (this.hasNext()) {
        ch = this$1.nextChar();
        if (!(48 /* Zero */ <= ch && ch <= 55 /* Seven */))
            { break; }
        if (ch < 48 /* Zero */ || ch >= 56 /* Eight */)
            { this$1.error(46 /* InvalidBinaryDigit */); }
        code = (code << 3) | (ch - 48 /* Zero */);
        this$1.advance();
    }
    this.tokenValue = code;
    if (this.flags & 131072 /* OptionsNext */ && this.consume(110 /* LowerN */))
        { this.flags |= 512 /* BigInt */; }
    if (this.flags & 65536 /* OptionsRaw */)
        { this.tokenRaw = this.source.slice(this.startPos, this.index); }
    return 262146 /* NumericLiteral */;
};
Parser.prototype.scanHexadecimalDigit = function scanHexadecimalDigit () {
        var this$1 = this;

    this.advanceTwice();
    var ch = this.nextChar();
    var code = toHex(ch);
    if (code < 0)
        { this.error(103 /* InvalidRadix */); }
    this.advance();
    while (this.hasNext()) {
        ch = this$1.nextChar();
        var digit = toHex(ch);
        if (digit < 0)
            { break; }
        code = code << 4 | digit;
        this$1.advance();
    }
    this.tokenValue = code;
    if (this.flags & 131072 /* OptionsNext */ && this.consume(110 /* LowerN */))
        { this.flags |= 512 /* BigInt */; }
    if (this.flags & 65536 /* OptionsRaw */)
        { this.tokenRaw = this.source.slice(this.startPos, this.index); }
    return 262146 /* NumericLiteral */;
};
Parser.prototype.scanBinaryDigits = function scanBinaryDigits (context) {
        var this$1 = this;

    this.advanceTwice();
    var ch = this.nextChar();
    var code = ch - 48;
    // Invalid:  '0b'
    if (ch !== 48 /* Zero */ && ch !== 49 /* One */) {
        this.error(46 /* InvalidBinaryDigit */);
    }
    this.advance();
    while (this.hasNext()) {
        ch = this$1.nextChar();
        if (!(ch === 48 /* Zero */ || ch === 49 /* One */))
            { break; }
        code = (code << 1) | (ch - 48 /* Zero */);
        this$1.advance();
    }
    this.tokenValue = code;
    if (this.flags & 131072 /* OptionsNext */ && this.consume(110 /* LowerN */))
        { this.flags |= 512 /* BigInt */; }
    if (this.flags & 65536 /* OptionsRaw */)
        { this.tokenRaw = this.source.slice(this.startPos, this.index); }
    return 262146 /* NumericLiteral */;
};
Parser.prototype.skipDigits = function skipDigits () {
        var this$1 = this;

    scan: while (this.hasNext()) {
        switch (this$1.nextChar()) {
            case 48 /* Zero */:
            case 49 /* One */:
            case 50 /* Two */:
            case 51 /* Three */:
            case 52 /* Four */:
            case 53 /* Five */:
            case 54 /* Six */:
            case 55 /* Seven */:
            case 56 /* Eight */:
            case 57 /* Nine */:
                this$1.advance();
                break;
            default:
                break scan;
        }
    }
};
Parser.prototype.scanNumber = function scanNumber (context) {
    var start = this.index;
    this.skipDigits();
    if (this.nextChar() === 46 /* Period */) {
        if (!(this.flags & 1024 /* Float */))
            { this.flags |= 1024 /* Float */; }
        this.advance();
        this.skipDigits();
    }
    var end = this.index;
    switch (this.nextChar()) {
        // scan exponent, if any
        case 69 /* UpperE */:
        case 101 /* LowerE */:
            this.advance();
            if (!(this.flags & 2048 /* Exponent */))
                { this.flags |= 2048 /* Exponent */; }
            // scan exponent
            switch (this.nextChar()) {
                case 43 /* Plus */:
                case 45 /* Hyphen */:
                    this.advance();
                    if (!this.hasNext())
                        { this.error(104 /* UnexpectedTokenNumber */); }
                default: // ignore
            }
            switch (this.nextChar()) {
                case 48 /* Zero */:
                case 49 /* One */:
                case 50 /* Two */:
                case 51 /* Three */:
                case 52 /* Four */:
                case 53 /* Five */:
                case 54 /* Six */:
                case 55 /* Seven */:
                case 56 /* Eight */:
                case 57 /* Nine */:
                    this.advance();
                    this.skipDigits();
                    break;
                default:
                    // we must have at least one decimal digit after 'e'/'E'
                    this.error(105 /* UnexpectedMantissa */);
            }
            end = this.index;
            break;
        // BigInt - Stage 3 proposal
        case 110 /* LowerN */:
            if (this.flags & 131072 /* OptionsNext */) {
                if (this.flags & 1024 /* Float */)
                    { this.error(0 /* Unexpected */); }
                this.advance();
                if (!(this.flags & 512 /* BigInt */))
                    { this.flags |= 512 /* BigInt */; }
                end = this.index;
            }
        default: // ignore
    }
    // The source character immediately following a numeric literal must
    // not be an identifier start or a decimal digit.
    if (isIdentifierStart(this.nextChar()))
        { this.error(104 /* UnexpectedTokenNumber */); }
    var raw = this.source.substring(start, end);
    if (this.flags & 65536 /* OptionsRaw */)
        { this.tokenRaw = raw; }
    this.tokenValue = this.flags & 3072 /* FloatOrExponent */ ? parseFloat(raw) : parseInt(raw, 10);
    return 262146 /* NumericLiteral */;
};
Parser.prototype.scanRegularExpression = function scanRegularExpression () {
        var this$1 = this;

    var index = this.startPos + 1;
    var bodyStart = index;
    var preparseState = 0;
    loop: while (true) {
        var ch = this$1.source.charCodeAt(index);
        index++;
        this$1.column++;
        if (preparseState & 1 /* Escape */) {
            preparseState &= ~1 /* Escape */;
        }
        else {
            switch (ch) {
                case 47 /* Slash */:
                    if (!preparseState)
                        { break loop; }
                    break;
                case 92 /* Backslash */:
                    preparseState |= 1 /* Escape */;
                    break;
                case 91 /* LeftBracket */:
                    preparseState |= 2 /* Class */;
                    break;
                case 93 /* RightBracket */:
                    preparseState &= 1 /* Escape */;
                    break;
                case 13 /* CarriageReturn */:
                case 10 /* LineFeed */:
                case 8232 /* LineSeparator */:
                case 8233 /* ParagraphSeparator */:
                    this$1.index = index;
                    return this$1.token;
                default: // ignore
            }
        }
        if (index >= this$1.source.length)
            { this$1.error(4 /* UnterminatedRegExp */); }
    }
    var bodyEnd = index - 1; // drop the slash from the slice
    var flagsStart = index;
    var mask = 0;
    loop: while (index < this.source.length) {
        var code = this$1.source.charCodeAt(index);
        switch (code) {
            case 103 /* LowerG */:
                if (mask & 1 /* Global */)
                    { this$1.error(11 /* DuplicateRegExpFlag */, 'g'); }
                mask |= 1 /* Global */;
                break;
            case 105 /* LowerI */:
                if (mask & 16 /* IgnoreCase */)
                    { this$1.error(11 /* DuplicateRegExpFlag */, 'i'); }
                mask |= 16 /* IgnoreCase */;
                break;
            case 109 /* LowerM */:
                if (mask & 8 /* Multiline */)
                    { this$1.error(11 /* DuplicateRegExpFlag */, 'm'); }
                mask |= 8 /* Multiline */;
                break;
            case 117 /* LowerU */:
                if (mask & 2 /* Unicode */)
                    { this$1.error(11 /* DuplicateRegExpFlag */, 'u'); }
                mask |= 2 /* Unicode */;
                break;
            case 121 /* LowerY */:
                if (mask & 4 /* Sticky */)
                    { this$1.error(11 /* DuplicateRegExpFlag */, 'y'); }
                mask |= 4 /* Sticky */;
                break;
            // Stage 3 proposal
            case 115 /* LowerS */:
                if (this$1.flags & 131072 /* OptionsNext */) {
                    if (mask & 32 /* DotAll */)
                        { this$1.error(11 /* DuplicateRegExpFlag */, 's'); }
                    mask |= 32 /* DotAll */;
                    break;
                }
            default:
                if (code >= 0xd800 && code <= 0xdc00)
                    { code = this$1.nextUnicodeChar(); }
                if (!isIdentifierPart(code))
                    { break loop; }
                this$1.error(13 /* UnexpectedTokenRegExpFlag */);
        }
        index++;
        this$1.column++;
    }
    this.endPos = this.index;
    this.index = index;
    var pattern = this.source.slice(bodyStart, bodyEnd);
    var flags = this.source.slice(flagsStart, this.index);
    this.tokenRegExp = {
        pattern: pattern,
        flags: flags
    };
    this.tokenValue = tryCreate(pattern, flags);
    if (this.flags & 65536 /* OptionsRaw */)
        { this.tokenRaw = this.source.slice(this.startPos, this.index); }
    return 262148 /* RegularExpression */;
};
Parser.prototype.scanString = function scanString (context, quote) {
        var this$1 = this;

    var rawStart = this.index;
    this.advance();
    if (!this.hasNext())
        { this.error(3 /* UnterminatedString */); }
    var ret = '';
    var start = this.index;
    var ch;
    while (this.hasNext()) {
        ch = this$1.nextChar();
        if (ch === quote)
            { break; }
        switch (ch) {
            case 92 /* Backslash */:
                ret += this$1.source.slice(start, this$1.index);
                ret += this$1.scanStringEscape(context);
                this$1.advance();
                start = this$1.index;
                continue;
            case 13 /* CarriageReturn */:
            case 10 /* LineFeed */:
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                this$1.error(3 /* UnterminatedString */);
            default: // ignore
        }
        this$1.advance();
    }
    if (start !== this.index)
        { ret += this.source.slice(start, this.index); }
    if (ch !== quote)
        { this.error(3 /* UnterminatedString */); }
    this.advance(); // skip the quote
    this.tokenValue = ret;
    // raw
    if (this.flags & 65536 /* OptionsRaw */)
        { this.tokenRaw = this.source.slice(rawStart, this.index); }
    return 262147 /* StringLiteral */;
};
Parser.prototype.peekExtendedUnicodeEscape = function peekExtendedUnicodeEscape () {
        var this$1 = this;

    this.advance(); // 'u'
    if (!this.hasNext())
        { this.error(0 /* Unexpected */); }
    var ch = this.nextChar();
    // '\u{DDDDDDDD}'
    if (ch === 123 /* LeftBrace */) {
        var code = 0;
        this.advance();
        if (!this.hasNext())
            { this.error(62 /* InvalidHexEscapeSequence */); }
        ch = this.nextChar();
        // At least, one hex digit is required.
        if (ch === 125 /* RightBrace */)
            { this.error(62 /* InvalidHexEscapeSequence */); }
        while (ch !== 125 /* RightBrace */) {
            var digit = toHex(ch);
            if (digit < 0)
                { this$1.error(62 /* InvalidHexEscapeSequence */); }
            code = (code << 4) | digit;
            if (code > 1114111 /* LastUnicodeChar */)
                { this$1.error(5 /* UnicodeOutOfRange */); }
            this$1.advance();
            // At least one digit is expected
            if (!this$1.hasNext())
                { this$1.error(62 /* InvalidHexEscapeSequence */); }
            ch = this$1.nextChar();
        }
        if (ch !== 125 /* RightBrace */)
            { this.error(62 /* InvalidHexEscapeSequence */); }
        return code;
        // '\uDDDD'
    }
    else if (this.index + 3 < this.source.length) {
        var code$1 = toHex(ch);
        if (code$1 < 0)
            { this.error(62 /* InvalidHexEscapeSequence */); }
        for (var i = 0; i < 3; i++) {
            this$1.advance();
            if (!this$1.hasNext())
                { this$1.error(62 /* InvalidHexEscapeSequence */); }
            ch = this$1.nextChar();
            var digit$1 = toHex(ch);
            if (code$1 < 0)
                { this$1.error(62 /* InvalidHexEscapeSequence */); }
            code$1 = code$1 << 4 | digit$1;
        }
        // Invalid:  "'foo\u000u bar'", "'foo\u000U bar'"
        switch (ch) {
            case 117 /* LowerU */:
            case 85 /* UpperU */:
                this.error(62 /* InvalidHexEscapeSequence */);
            default: // ignore
        }
        return code$1;
    }
    this.error(6 /* InvalidUnicodeEscapeSequence */);
};
Parser.prototype.scanStringEscape = function scanStringEscape (context) {
    this.advance();
    if (!this.hasNext)
        { this.error(6 /* InvalidUnicodeEscapeSequence */); }
    var cp = this.nextChar();
    switch (cp) {
        case 98 /* LowerB */:
            return '\b';
        case 116 /* LowerT */:
            return '\t';
        case 110 /* LowerN */:
            return '\n';
        case 118 /* LowerV */:
            return '\v';
        case 102 /* LowerF */:
            return '\f';
        case 114 /* LowerR */:
            return '\r';
        case 92 /* Backslash */:
            return '\\';
        case 39 /* SingleQuote */:
            return '\'';
        case 34 /* DoubleQuote */:
            return '\"';
        // Unicode character specification.
        case 117 /* LowerU */:
            return fromCodePoint(this.peekExtendedUnicodeEscape());
        // Hexadecimal character specification.
        case 120 /* LowerX */:
            {
                this.advance();
                var ch = this.nextChar();
                if (!this.hasNext())
                    { this.error(3 /* UnterminatedString */); }
                var ch1 = this.nextChar();
                var hi = toHex(ch1);
                if (hi < 0)
                    { this.error(62 /* InvalidHexEscapeSequence */); }
                this.advance();
                if (!this.hasNext())
                    { this.error(3 /* UnterminatedString */); }
                var ch2 = this.nextChar();
                var lo = toHex(ch2);
                if (lo < 0)
                    { this.error(62 /* InvalidHexEscapeSequence */); }
                return fromCodePoint(hi << 4 | lo);
            }
        // Octal character specification.
        case 48 /* Zero */:
        // falls through
        case 49 /* One */:
        // falls through
        case 50 /* Two */:
        // falls through
        case 51 /* Three */:
            {
                var code = cp - 48;
                var index = this.index + 1;
                var column = this.column + 1;
                if (index < this.source.length) {
                    var next = this.source.charCodeAt(index);
                    if (next < 48 /* Zero */ || next > 55 /* Seven */) {
                        if (code !== 0 && context & 2 /* Strict */)
                            { this.error(9 /* StrictOctalLiteral */); }
                    }
                    else if (context & 2 /* Strict */) {
                        this.error(9 /* StrictOctalLiteral */);
                    }
                    else {
                        code = (code << 3) | (next - 48 /* Zero */);
                        index++;
                        column++;
                        if (index < this.source.length) {
                            next = this.source.charCodeAt(index);
                            if (next >= 48 /* Zero */ && next <= 55 /* Seven */) {
                                code = (code << 3) | (next - 48 /* Zero */);
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
        case 52 /* Four */:
        // falls through
        case 53 /* Five */:
        // falls through
        case 54 /* Six */:
        // falls through
        case 55 /* Seven */:
            {
                if (context & 2 /* Strict */)
                    { this.error(7 /* StrictOctalEscape */); }
                var code$1 = cp - 48;
                var index$1 = this.index + 1;
                var column$1 = this.column + 1;
                if (index$1 < this.source.length) {
                    var next$1 = this.source.charCodeAt(index$1);
                    if (next$1 >= 48 /* Zero */ && next$1 <= 55 /* Seven */) {
                        code$1 = (code$1 << 3) | (next$1 - 48 /* Zero */);
                        this.index = index$1;
                        this.column = column$1;
                    }
                }
                return String.fromCharCode(code$1);
            }
        case 56 /* Eight */:
        // falls through
        case 57 /* Nine */:
            this.error(8 /* InvalidEightAndNine */);
        case 13 /* CarriageReturn */:
            // Allow escaped CR+LF newlines in multiline string literals.
            if (this.hasNext() && this.nextChar() === 10 /* LineFeed */)
                { this.advance(); }
        case 10 /* LineFeed */:
        case 8232 /* LineSeparator */:
        case 8233 /* ParagraphSeparator */:
            this.column = -1;
            this.line++;
            return '';
        default:
            // Other escaped characters are interpreted as their non-escaped version.
            return this.source.charAt(cp);
    }
};
Parser.prototype.scanJSXIdentifier = function scanJSXIdentifier (context) {
        var this$1 = this;

    switch (this.token) {
        case 262145 /* Identifier */:
            var firstCharPosition = this.index;
            scan: while (this.hasNext()) {
                var ch = this$1.nextChar();
                switch (ch) {
                    case 45 /* Hyphen */:
                        this$1.advance();
                        break;
                    default:
                        if ((firstCharPosition === this$1.index) ? isIdentifierStart(ch) : isIdentifierPart(ch)) {
                            this$1.advance();
                        }
                        else {
                            break scan;
                        }
                }
            }
            this.tokenValue += this.source.slice(firstCharPosition, this.index - firstCharPosition);
        default:
            return this.token;
    }
};
Parser.prototype.scanTemplateNext = function scanTemplateNext (context) {
    if (!this.hasNext())
        { this.error(0 /* Unexpected */); }
    this.index--;
    this.column--;
    return this.scanTemplate(context);
};
Parser.prototype.scanTemplate = function scanTemplate (context) {
        var this$1 = this;

    var start = this.index;
    var tail = true;
    var ret = '';
    this.advance();
    if (!this.hasNext())
        { this.error(85 /* UnterminatedTemplate */); }
    var ch = this.nextChar();
    loop: while (ch !== 96 /* Backtick */) {
        switch (ch) {
            case 36 /* Dollar */:
                {
                    var index = this$1.index + 1;
                    if (index < this$1.source.length &&
                        this$1.source.charCodeAt(index) === 123 /* LeftBrace */) {
                        this$1.index = index;
                        this$1.column++;
                        tail = false;
                        break loop;
                    }
                    ret += '$';
                    break;
                }
            case 92 /* Backslash */:
                this$1.advance();
                if (!this$1.hasNext())
                    { this$1.error(85 /* UnterminatedTemplate */); }
                if (ch >= 128) {
                    ret += fromCodePoint(ch);
                }
                else {
                    ret += this$1.scanStringEscape(context);
                }
                break;
            case 13 /* CarriageReturn */:
                if (this$1.hasNext() && this$1.nextChar() === 10 /* LineFeed */) {
                    if (ret != null)
                        { ret += fromCodePoint(ch); }
                    ch = this$1.nextChar();
                    this$1.index++;
                }
            case 10 /* LineFeed */:
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                this$1.column = -1;
                this$1.line++;
            default:
                if (ret != null)
                    { ret += fromCodePoint(ch); }
        }
        this$1.advance();
        if (!this$1.hasNext())
            { this$1.error(85 /* UnterminatedTemplate */); }
        ch = this$1.nextChar();
    }
    this.advance();
    this.tokenValue = ret;
    if (tail) {
        this.tokenRaw = this.source.slice(start + 1, this.index - 1);
        return 262153 /* TemplateTail */;
    }
    else {
        this.tokenRaw = this.source.slice(start + 1, this.index - 2);
        return 262152 /* TemplateCont */;
    }
};
Parser.prototype.ParseModuleItemList = function ParseModuleItemList (context) {
        var this$1 = this;

    // ecma262/#prod-Module
    // Module :
    //ModuleBody?
    //
    // ecma262/#prod-ModuleItemList
    // ModuleBody :
    //   ModuleItem*
    var pos = this.getLocations();
    this.nextToken(context);
    var statements = [];
    while (this.token !== 0 /* EndOfSource */) {
        statements.push(this$1.parseModuleItem(context));
    }
    return statements;
};
Parser.prototype.parseStatementList = function parseStatementList (context, endToken) {
        var this$1 = this;

    var statements = [];
    while (this.token !== endToken) {
        if (this$1.token !== 262147 /* StringLiteral */)
            { break; }
        var item = this$1.parseStatementListItem(context);
        statements.push(item);
        if (!isDirective(item))
            { break; }
        if (item.expression.value === 'use strict') {
            if (this$1.flags & 4 /* HasNonSimpleParameter */)
                { this$1.error(28 /* IllegalUseStrict */); }
            context |= 2 /* Strict */;
            break;
        }
    }
    while (this.token !== endToken) {
        statements.push(this$1.parseStatementListItem(context));
    }
    return statements;
};
Parser.prototype.getLocations = function getLocations () {
    return {
        start: this.startPos,
        line: this.startLine,
        column: this.startColumn
    };
};
Parser.prototype.finishNode = function finishNode (loc, node) {
    if (this.flags & 4096 /* OptionsRanges */) {
        node.start = loc.start;
        node.end = this.endPos;
    }
    if (this.flags & 8192 /* OptionsLoc */) {
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
};
Parser.prototype.parseOptional = function parseOptional (context, t) {
    if (this.token !== t)
        { return false; }
    this.nextToken(context);
    return true;
};
Parser.prototype.expect = function expect (context, t) {
    if (this.token !== t)
        { this.error(1 /* UnexpectedToken */, tokenDesc(t)); }
    this.nextToken(context);
};
Parser.prototype.isEvalOrArguments = function isEvalOrArguments (value) {
    return value === 'eval' || value === 'arguments';
};
Parser.prototype.canConsumeSemicolon = function canConsumeSemicolon () {
    // Bail out quickly if we have seen a LineTerminator
    if (this.flags & 1 /* LineTerminator */)
        { return true; }
    switch (this.token) {
        case 17 /* Semicolon */:
        case 15 /* RightBrace */:
        case 0 /* EndOfSource */:
            return true;
        default:
            return false;
    }
};
/**
 * Consume a semicolon between tokens, optionally inserting it if necessary.
 */
Parser.prototype.consumeSemicolon = function consumeSemicolon (context) {
    if (!this.canConsumeSemicolon())
        { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
    if (this.token === 17 /* Semicolon */)
        { this.expect(context, 17 /* Semicolon */); }
};
Parser.prototype.nextTokenIsFuncKeywordOnSameLine = function nextTokenIsFuncKeywordOnSameLine (context) {
    this.peekToken(context);
    return this.line === this.peekedState.line && this.peekedToken === 274520 /* FunctionKeyword */;
};
Parser.prototype.isIdentifier = function isIdentifier (context, t) {
    if (context & 1 /* Module */) {
        if (hasMask(t, 20480 /* FutureReserved */))
            { this.error(86 /* UnexpectedStrictReserved */); }
        return t === 262145 /* Identifier */ || (t & 69632 /* Contextual */) === 69632 /* Contextual */;
    }
    if (context & 2 /* Strict */) {
        if (hasMask(t, 12288 /* Reserved */))
            { this.error(86 /* UnexpectedStrictReserved */); }
        return t === 262145 /* Identifier */ || (t & 69632 /* Contextual */) === 69632 /* Contextual */;
    }
    return t === 262145 /* Identifier */ || (t & 69632 /* Contextual */) === 69632 /* Contextual */ || (t & 20480 /* FutureReserved */) === 20480 /* FutureReserved */;
};
Parser.prototype.isIdentifierOrKeyword = function isIdentifierOrKeyword (t) {
    switch (t) {
        case 262145 /* Identifier */:
            return true;
        default:
            return hasMask(t, 4096 /* Keyword */);
    }
};
// 'import', 'import.meta'
Parser.prototype.nextTokenIsLeftParenOrPeriod = function nextTokenIsLeftParenOrPeriod (context) {
    this.peekToken(context);
    return this.peekedToken === 262155 /* LeftParen */ || this.peekedToken === 13 /* Period */;
};
Parser.prototype.isLexical = function isLexical (context) {
    // In ES6 'let' always starts a lexical declaration if followed by an identifier or {
    // or [.
    this.peekToken(context);
    return this.peekedToken === 262145 /* Identifier */ || hasMask(this.peekedToken, 131072 /* BindingPattern */);
};
Parser.prototype.parseExportDeclaration = function parseExportDeclaration (context) { };
Parser.prototype.parseImportDeclaration = function parseImportDeclaration (context) { };
Parser.prototype.parseModuleItem = function parseModuleItem (context) {
    // ecma262/#prod-ModuleItem
    // ModuleItem :
    //ImportDeclaration
    //ExportDeclaration
    //StatementListItem
    switch (this.token) {
        // 'export'
        case 12372 /* ExportKeyword */:
            return this.parseExportDeclaration(context);
        // 'import'
        case 274522 /* ImportKeyword */:
            if (!(this.flags & 131072 /* OptionsNext */ && this.nextTokenIsLeftParenOrPeriod(context))) {
                return this.parseImportDeclaration(context);
            }
        default:
            return this.parseStatementListItem(context);
    }
};
Parser.prototype.parseStatementListItem = function parseStatementListItem (context) {
    switch (this.token) {
        case 274520 /* FunctionKeyword */:
            return this.parseFunctionDeclaration(context);
        // VariableStatement[?Yield]
        case 8671305 /* LetKeyword */:
            // If let follows identifier on the same line, it is an declaration. Parse it as a variable statement
            if (this.isLexical(context))
                { return this.parseVariableStatement(context |= (2097152 /* DisallowFor */ | 33554432 /* Let */)); }
            return this.parseStatement(context);
        case 8663114 /* ConstKeyword */:
            return this.parseVariableStatement(context | (2097152 /* DisallowFor */ | 16777216 /* Const */));
        // VariableStatement[?Yield]
        case 274510 /* ClassKeyword */:
            return this.parseClassDeclaration(context);
        case 274522 /* ImportKeyword */:
            // We must be careful not to parse a 'import()'
            // expression or 'import.meta' as an import declaration.
            if (this.flags & 131072 /* OptionsNext */ && this.nextTokenIsLeftParenOrPeriod(context))
                { return this.parseExpressionStatement(context); }
            if (!(context & 1 /* Module */))
                { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
        default:
            return this.parseStatement(context);
    }
};
Parser.prototype.parseStatement = function parseStatement (context) {
    switch (this.token) {
        case 262155 /* LeftParen */:
            return this.parseExpressionStatement(context);
        case 262145 /* Identifier */:
            return this.parseLabelledStatement(context);
        // EmptyStatement
        case 17 /* Semicolon */:
            return this.parseEmptyStatement(context);
        // BlockStatement[?Yield, ?Return]
        case 393228 /* LeftBrace */:
            return this.parseBlockStatement(context);
        // VariableStatement[?Yield]
        case 8663112 /* VarKeyword */:
            return this.parseVariableStatement(context);
        // VariableStatement[?Yield]
        // [+Return] ReturnStatement[?Yield]
        case 12380 /* ReturnKeyword */:
            return this.parseReturnStatement(context);
        // IfStatement[?Yield, ?Return]
        case 12377 /* IfKeyword */:
            return this.parseIfStatement(context);
        // BreakStatement[?Yield]
        case 12363 /* BreakKeyword */:
            return this.parseBreakStatement(context);
        case 12375 /* ForKeyword */:
            return this.parseForStatement(context);
        case 12367 /* ContinueKeyword */:
            return this.parseContinueStatement(context);
        // DebuggerStatement
        case 12368 /* DebuggerKeyword */:
            return this.parseDebuggerStatement(context);
        // BreakableStatement[?Yield, ?Return]
        //
        // BreakableStatement[Yield, Return]:
        //   IterationStatement[?Yield, ?Return]
        //   SwitchStatement[?Yield, ?Return]
        case 12370 /* DoKeyword */:
            return this.parseDoWhileStatement(context);
        case 12386 /* WhileKeyword */:
            return this.parseWhileStatement(context);
        // WithStatement[?Yield, ?Return]
        case 12387 /* WithKeyword */:
            return this.parseWithStatement(context);
        case 274526 /* SwitchKeyword */:
            return this.parseSwitchStatement(context | 4096 /* Statement */);
        // ThrowStatement[?Yield]
        case 12384 /* ThrowKeyword */:
            return this.parseThrowStatement(context);
        // TryStatement[?Yield, ?Return]
        case 12385 /* TryKeyword */:
            return this.parseTryStatement(context);
        // Both 'class' and 'function' are forbidden by lookahead restriction.
        case 274510 /* ClassKeyword */:
        case 274520 /* FunctionKeyword */:
            this.error(107 /* ForbiddenAsStatement */, tokenDesc(this.token));
        case 282731 /* YieldKeyword */:
            return this.parseLabelledStatement(context);
        case 69732 /* AsyncKeyword */:
            if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                return this.parseFunctionDeclaration(context);
            }
            return this.parseLabelledStatement(context);
        default:
            return this.parseExpressionStatement(context);
    }
};
Parser.prototype.parseLabelledStatement = function parseLabelledStatement (context) {
    var pos = this.getLocations();
    var expr = this.parseExpression(context | 16 /* AllowIn */, pos);
    if (this.token === 21 /* Colon */ && expr.type === 'Identifier') {
        this.expect(context, 21 /* Colon */);
        var key = '@' + expr.name;
        if (this.labelSet === undefined)
            { this.labelSet = {}; }
        else if (this.labelSet[key] === true)
            { this.error(79 /* Redeclaration */, expr.name); }
        this.labelSet[key] = true;
        var body;
        if (this.token === 274520 /* FunctionKeyword */) {
            // '13.1.1 - Static Semantics: ContainsDuplicateLabels', says it's a syntax error if
            // LabelledItem: FunctionDeclaration is ever matched. Annex B.3.2 changes this behaviour.
            if (context & 2 /* Strict */)
                { this.error(15 /* StrictFunction */); }
            // AnnexB allows function declaration as labels, but not async func or generator func because the
            // generator declaration is only matched by a hoistable declaration in StatementListItem.
            // To fix this we need to pass the 'AnnexB' mask, and let it throw in 'parseFunctionDeclaration'
            // We also unset the 'ForStatement' mask because we are no longer inside a 'ForStatement'.
            body = this.parseFunctionDeclaration(context | 2048 /* AnnexB */);
        }
        else {
            body = this.parseStatement(context);
        }
        this.labelSet[key] = false;
        return this.finishNode(pos, {
            type: 'LabeledStatement',
            label: expr,
            body: body
        });
    }
    else {
        this.consumeSemicolon(context);
        return this.finishNode(pos, {
            type: 'ExpressionStatement',
            expression: expr
        });
    }
};
Parser.prototype.parseBlockStatement = function parseBlockStatement (context) {
        var this$1 = this;

    var pos = this.getLocations();
    var body = [];
    var flag = this.flags;
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    if (blockScope != null)
        { this.parentScope = blockScope; }
    this.blockScope = context & 524288 /* IfClause */ ? blockScope : undefined;
    this.expect(context, 393228 /* LeftBrace */);
    while (this.token !== 15 /* RightBrace */)
        { body.push(this$1.parseStatementListItem(context | 4096 /* Statement */)); }
    this.expect(context, 15 /* RightBrace */);
    this.flags = flag;
    this.blockScope = blockScope;
    if (parentScope != null)
        { this.parentScope = parentScope; }
    return this.finishNode(pos, {
        type: 'BlockStatement',
        body: body
    });
};
Parser.prototype.parseTryStatement = function parseTryStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12385 /* TryKeyword */);
    var block = this.parseBlockStatement(context);
    var handler = null;
    var finalizer = null;
    if (this.token === 12365 /* CatchKeyword */) {
        handler = this.parseCatchClause(context);
    }
    if (this.parseOptional(context, 12374 /* FinallyKeyword */)) {
        finalizer = this.parseBlockStatement(context);
    }
    if (!handler && !finalizer)
        { this.error(20 /* NoCatchOrFinally */); }
    return this.finishNode(pos, {
        type: 'TryStatement',
        block: block,
        handler: handler,
        finalizer: finalizer
    });
};
Parser.prototype.parseCatchClause = function parseCatchClause (context) {
    var pos = this.getLocations();
    this.expect(context, 12365 /* CatchKeyword */);
    // Create a lexical scope node around the whole catch clause
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    if (blockScope !== undefined)
        { this.parentScope = blockScope; }
    this.blockScope = undefined;
    var param = null;
    if (!(this.flags & 131072 /* OptionsNext */) || this.token === 262155 /* LeftParen */) {
        this.expect(context, 262155 /* LeftParen */);
        // if (this.token !== Token.Identifier || !hasMask(this.token, Token.BindingPattern)) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        this.addCatchArg(this.tokenValue, 1 /* Shadowable */);
        param = this.parseBindingPatternOrIdentifier(context, pos);
        this.expect(context, 16 /* RightParen */);
    }
    var body = this.parseBlockStatement(context | 524288 /* IfClause */);
    this.blockScope = blockScope;
    if (blockScope !== undefined)
        { this.parentScope = parentScope; }
    return this.finishNode(pos, {
        type: 'CatchClause',
        param: param,
        body: body
    });
};
Parser.prototype.parseThrowStatement = function parseThrowStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12384 /* ThrowKeyword */);
    if (this.flags & 1 /* LineTerminator */)
        { this.error(21 /* LineBreakAfterThrow */); }
    var argument = this.parseExpression(context, pos);
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'ThrowStatement',
        argument: argument
    });
};
Parser.prototype.parseWithStatement = function parseWithStatement (context) {
    var pos = this.getLocations();
    // Invalid `"use strict"; with ({}) { }`
    if (context & 2 /* Strict */)
        { this.error(22 /* StrictModeWith */); }
    this.expect(context, 12387 /* WithKeyword */);
    this.expect(context, 262155 /* LeftParen */);
    var object = this.parseExpression(context, pos);
    this.expect(context, 16 /* RightParen */);
    var body = this.parseStatement(context);
    return this.finishNode(pos, {
        type: 'WithStatement',
        object: object,
        body: body
    });
};
Parser.prototype.parseWhileStatement = function parseWhileStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12386 /* WhileKeyword */);
    this.expect(context, 262155 /* LeftParen */);
    var test = this.parseExpression(context, pos);
    this.expect(context, 16 /* RightParen */);
    var savedFlag = this.flags;
    if (!(this.flags & 128 /* Break */))
        { this.flags |= (32 /* Continue */ | 128 /* Break */); }
    var body = this.parseStatement(context);
    this.flags = savedFlag;
    return this.finishNode(pos, {
        type: 'WhileStatement',
        test: test,
        body: body
    });
};
Parser.prototype.parseDoWhileStatement = function parseDoWhileStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12370 /* DoKeyword */);
    var savedFlag = this.flags;
    if (!(this.flags & 128 /* Break */))
        { this.flags |= (32 /* Continue */ | 128 /* Break */); }
    var body = this.parseStatement(context);
    this.flags = savedFlag;
    this.expect(context, 12386 /* WhileKeyword */);
    this.expect(context, 262155 /* LeftParen */);
    var test = this.parseExpression(context, pos);
    this.expect(context, 16 /* RightParen */);
    this.parseOptional(context, 17 /* Semicolon */);
    return this.finishNode(pos, {
        type: 'DoWhileStatement',
        body: body,
        test: test
    });
};
Parser.prototype.parseContinueStatement = function parseContinueStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12367 /* ContinueKeyword */);
    var label = null;
    if (!(this.flags & 1 /* LineTerminator */) && this.token === 262145 /* Identifier */) {
        label = this.parseIdentifier(context);
        if (!hasOwn.call(this.labelSet, '@' + label.name))
            { this.error(80 /* UnknownLabel */, label.name); }
    }
    if (!(this.flags & 32 /* Continue */) && !label)
        { this.error(16 /* BadContinue */); }
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'ContinueStatement',
        label: label
    });
};
Parser.prototype.parseBreakStatement = function parseBreakStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12363 /* BreakKeyword */);
    if (this.parseOptional(context, 17 /* Semicolon */)) {
        if (!(this.flags & (32 /* Continue */ | 64 /* Switch */)))
            { this.error(0 /* Unexpected */); }
        return this.finishNode(pos, {
            type: 'BreakStatement',
            label: null
        });
    }
    var label = null;
    if (!(this.flags & 1 /* LineTerminator */) && this.token === 262145 /* Identifier */) {
        label = this.parseIdentifier(context);
        if (!hasOwn.call(this.labelSet, '@' + label.name))
            { this.error(80 /* UnknownLabel */, label.name); }
    }
    if (!(this.flags & (128 /* Break */ | 64 /* Switch */)) && !label)
        { this.error(17 /* IllegalBreak */); }
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'BreakStatement',
        label: label
    });
};
Parser.prototype.parseIfStatementChild = function parseIfStatementChild (context) {
    // Annex B.3.4 says that unbraced FunctionDeclarations under if/else in
    // non-strict code act as if they were braced: '(if (x) function f() {})'
    // parses as '(if (x) { function f() {} })'.
    //
    if (this.token === 274520 /* FunctionKeyword */) {
        if (context & 2 /* Strict */)
            { this.error(107 /* ForbiddenAsStatement */, tokenDesc(this.token)); }
        // Pass the 'AnnexB' mask
        return this.parseFunctionDeclaration(context | 2048 /* AnnexB */);
    }
    return this.parseStatement(context | 4096 /* Statement */);
};
Parser.prototype.parseIfStatement = function parseIfStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12377 /* IfKeyword */);
    this.expect(context, 262155 /* LeftParen */);
    // An IF node has three kids: test, alternate, and optional else
    var test = this.parseExpression(context | 16 /* AllowIn */, pos);
    this.expect(context, 16 /* RightParen */);
    var savedFlag = this.flags;
    var consequent = this.parseIfStatementChild(context);
    var alternate = null;
    if (this.parseOptional(context, 12371 /* ElseKeyword */))
        { alternate = this.parseIfStatementChild(context); }
    this.flags = savedFlag;
    return this.finishNode(pos, {
        type: 'IfStatement',
        test: test,
        alternate: alternate,
        consequent: consequent
    });
};
Parser.prototype.parseForStatement = function parseForStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12375 /* ForKeyword */);
    var init = null;
    var declarations = null;
    var kind = '';
    var body;
    var test = null;
    var isAwait = false;
    var token = this.token;
    // Asynchronous Iteration - Stage 3 proposal
    if (context & 32 /* Async */ && this.parseOptional(context, 4526190 /* AwaitKeyword */)) {
        // Throw " Unexpected token 'await'" if the option 'next' flag isn't set
        if (!(this.flags & 131072 /* OptionsNext */))
            { this.error(1 /* UnexpectedToken */, tokenDesc(token)); }
        // state |= IterationState.Async;
        isAwait = true;
    }
    var savedFlag = this.flags;
    this.expect(context, 262155 /* LeftParen */);
    if (this.token !== 17 /* Semicolon */) {
        if (hasMask(this.token, 8650752 /* VarDeclStart */)) {
            var startPos = this.getLocations();
            kind = tokenDesc(this.token);
            if (this.parseOptional(context, 8663112 /* VarKeyword */)) {
                // ignore
            }
            else if (this.parseOptional(context, 8671305 /* LetKeyword */)) {
                context |= 33554432 /* Let */;
            }
            else if (this.parseOptional(context, 8663114 /* ConstKeyword */)) {
                context |= 16777216 /* Const */;
            }
            declarations = this.parseVariableDeclarationList(context);
            init = this.finishNode(startPos, {
                type: 'VariableDeclaration',
                declarations: declarations,
                kind: kind
            });
        }
        else {
            init = this.parseExpression(context & ~16 /* AllowIn */, pos);
        }
    }
    this.flags = savedFlag;
    switch (this.token) {
        // 'of'
        case 69747 /* OfKeyword */:
            this.parseOptional(context, 69747 /* OfKeyword */);
            /* if (state & IterationState.Variable) {
                 // Only a single variable declaration is allowed in a for of statement
                 if (declarations && declarations[0].init != null) this.error(Errors.InvalidVarInitForOf);
             } else {
                 this.reinterpretExpressionAsPattern(context | Context.ForStatement, init);
                 if (!isValidDestructuringAssignmentTarget(init)) this.error(Errors.InvalidLHSInForLoop);
             }*/
            var right = this.parseAssignmentExpression(context | 16 /* AllowIn */);
            this.expect(context, 16 /* RightParen */);
            this.flags |= (32 /* Continue */ | 128 /* Break */);
            body = this.parseStatement(context);
            this.flags = savedFlag;
            return this.finishNode(pos, {
                type: 'ForOfStatement',
                body: body,
                left: init,
                right: right,
                await: isAwait
            });
        // 'in'
        case 2111281 /* InKeyword */:
            if (isAwait)
                { this.error(56 /* ForAwaitNotOf */); }
            this.expect(context, 2111281 /* InKeyword */);
            /*  if (!(state & IterationState.Variable)) {
                  this.reinterpretExpressionAsPattern(context | Context.ForStatement, init);
              } else if (declarations && declarations.length !== 1) {
                  this.error(Errors.Unexpected);
              }*/
            test = this.parseExpression(context | 16 /* AllowIn */, pos);
            this.expect(context, 16 /* RightParen */);
            this.flags |= (32 /* Continue */ | 128 /* Break */);
            body = this.parseStatement(context);
            this.flags = savedFlag;
            return this.finishNode(pos, {
                type: 'ForInStatement',
                body: body,
                left: init,
                right: test
            });
        default:
            if (isAwait)
                { this.error(56 /* ForAwaitNotOf */); }
            var update = null;
            // Invalid: `for (var a = ++effects in {});`
            // Invalid: `for (var a = (++effects, -1) in stored = a, {a: 0, b: 1, c: 2}) {  ++iterations;  }`
            //if (this.token === Token.RightParen) this.error(Errors.InvalidVarDeclInForIn);
            this.expect(context, 17 /* Semicolon */);
            if (this.token !== 17 /* Semicolon */ && this.token !== 16 /* RightParen */) {
                test = this.parseExpression(context | 16 /* AllowIn */, pos);
            }
            this.expect(context, 17 /* Semicolon */);
            if (this.token !== 16 /* RightParen */)
                { update = this.parseExpression(context | 16 /* AllowIn */, pos); }
            this.expect(context, 16 /* RightParen */);
            this.flags |= (32 /* Continue */ | 128 /* Break */);
            body = this.parseStatement(context);
            this.flags = savedFlag;
            return this.finishNode(pos, {
                type: 'ForStatement',
                body: body,
                init: init,
                test: test,
                update: update
            });
    }
};
Parser.prototype.parseDebuggerStatement = function parseDebuggerStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12368 /* DebuggerKeyword */);
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'DebuggerStatement'
    });
};
Parser.prototype.parseSwitchStatement = function parseSwitchStatement (context) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 274526 /* SwitchKeyword */);
    this.expect(context, 262155 /* LeftParen */);
    var discriminant = this.parseExpression(context, pos);
    this.expect(context, 16 /* RightParen */);
    this.expect(context, 393228 /* LeftBrace */);
    var cases = [];
    var seenDefault = false;
    var SavedFlag = this.flags;
    if (!(this.flags & 128 /* Break */))
        { this.flags |= (128 /* Break */ | 64 /* Switch */); }
    while (this.token !== 15 /* RightBrace */) {
        var clause = this$1.parseSwitchCase(context);
        if (clause.test === null) {
            // Error on duplicate 'default' clauses
            if (seenDefault)
                { this$1.error(18 /* MultipleDefaultsInSwitch */); }
            seenDefault = true;
        }
        cases.push(clause);
    }
    this.flags = SavedFlag;
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(pos, {
        type: 'SwitchStatement',
        discriminant: discriminant,
        cases: cases
    });
};
Parser.prototype.parseSwitchCase = function parseSwitchCase (context) {
        var this$1 = this;

    var pos = this.getLocations();
    var test = null;
    switch (this.token) {
        // 'case'
        case 12364 /* CaseKeyword */:
            this.nextToken(context);
            test = this.parseExpression(context, pos);
            break;
        // 'default'
        case 12369 /* DefaultKeyword */:
            this.nextToken(context);
            break;
        default: // ignore
    }
    this.expect(context, 21 /* Colon */);
    var consequent = [];
    loop: while (true) {
        switch (this$1.token) {
            // '}'
            case 15 /* RightBrace */:
            // 'default'
            case 12369 /* DefaultKeyword */:
            // 'case'
            case 12364 /* CaseKeyword */:
                break loop;
            default:
                consequent.push(this$1.parseStatementListItem(context));
        }
    }
    return this.finishNode(pos, {
        type: 'SwitchCase',
        test: test,
        consequent: consequent,
    });
};
Parser.prototype.parseReturnStatement = function parseReturnStatement (context) {
    var pos = this.getLocations();
    if (!(this.flags & 16 /* InFunctionBody */))
        { this.error(19 /* IllegalReturn */); }
    this.expect(context, 12380 /* ReturnKeyword */);
    var argument = null;
    if (!this.canConsumeSemicolon())
        { argument = this.parseExpression(context, pos); }
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'ReturnStatement',
        argument: argument
    });
};
Parser.prototype.parseEmptyStatement = function parseEmptyStatement (context) {
    var pos = this.getLocations();
    this.nextToken(context);
    return this.finishNode(pos, {
        type: 'EmptyStatement'
    });
};
Parser.prototype.parseExpressionStatement = function parseExpressionStatement (context) {
    var pos = this.getLocations();
    var expr = this.parseExpression(context, pos);
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'ExpressionStatement',
        expression: expr
    });
};
Parser.prototype.parseVariableStatement = function parseVariableStatement (context) {
    var pos = this.getLocations();
    var token = this.token;
    if (this.flags & 2 /* HasUnicode */)
        { this.error(0 /* Unexpected */); }
    this.nextToken(context);
    var declarations = this.parseVariableDeclarationList(context);
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'VariableDeclaration',
        declarations: declarations,
        kind: tokenDesc(token)
    });
};
Parser.prototype.parseVariableDeclarationList = function parseVariableDeclarationList (context) {
        var this$1 = this;

    var list = [this.parseVariableDeclaration(context)];
    while (this.token === 18 /* Comma */) {
        this$1.expect(context, 18 /* Comma */);
        list.push(this$1.parseVariableDeclaration(context));
    }
    return list;
};
Parser.prototype.parseVariableDeclaration = function parseVariableDeclaration (context) {
    var pos = this.getLocations();
    var init = null;
    var id = this.parseBindingPatternOrIdentifier(context, pos);
    if (context & 50331648 /* Lexical */) {
        if (context & 16777216 /* Const */) {
            if (!(this.token === 2111281 /* InKeyword */ || this.token === 69747 /* OfKeyword */)) {
                if (this.token === 1310749 /* Assign */) {
                    this.nextToken(context);
                    init = this.parseAssignmentExpression(context);
                }
                else {
                    this.error(33 /* DeclarationMissingInitializer */, 'const');
                }
            }
        }
        else if (context & 2097152 /* DisallowFor */ && id.type !== 'Identifier' || this.token === 1310749 /* Assign */) {
            this.expect(context, 1310749 /* Assign */);
            init = this.parseAssignmentExpression(context);
        }
    }
    else {
        if (this.token === 1310749 /* Assign */) {
            this.expect(context, 1310749 /* Assign */);
            init = this.parseAssignmentExpression(context);
        }
        else if (id.type !== 'Identifier' && context & 2097152 /* DisallowFor */) {
            this.expect(context, 1310749 /* Assign */);
        }
    }
    return this.finishNode(pos, {
        type: 'VariableDeclarator',
        init: init,
        id: id
    });
};
Parser.prototype.parseExpression = function parseExpression (context, pos) {
        var this$1 = this;

    var expr = this.parseAssignmentExpression(context);
    if (this.token !== 18 /* Comma */)
        { return expr; }
    var expressions = [expr];
    while (this.parseOptional(context, 18 /* Comma */)) {
        expressions.push(this$1.parseAssignmentExpression(context));
    }
    return this.finishNode(pos, {
        type: 'SequenceExpression',
        expressions: expressions
    });
};
Parser.prototype.parseYieldExpression = function parseYieldExpression (context, pos) {
    this.expect(context, 282731 /* YieldKeyword */);
    var argument = null;
    var delegate = false;
    if (!(this.flags & 1 /* LineTerminator */)) {
        delegate = this.parseOptional(context, 2099763 /* Multiply */);
        if (delegate) {
            argument = this.parseAssignmentExpression(context);
        }
        else if (hasMask(this.token, 262144 /* ExpressionStart */)) {
            argument = this.parseAssignmentExpression(context);
        }
    }
    return this.finishNode(pos, {
        type: 'YieldExpression',
        argument: argument,
        delegate: delegate
    });
};
Parser.prototype.parseAssignmentExpression = function parseAssignmentExpression (context) {
    var pos = this.getLocations();
    var token = this.token;
    var tokenValue = this.tokenValue;
    if (context & 64 /* Yield */ && this.token === 282731 /* YieldKeyword */)
        { return this.parseYieldExpression(context, pos); }
    var expr = this.parseBinaryExpression(context, 0, pos);
    if (this.token === 10 /* Arrow */ && this.isIdentifier(context, token)) {
        if (context & 2 /* Strict */ && this.isEvalOrArguments(tokenValue))
            { this.error(86 /* UnexpectedStrictReserved */); }
        return this.parseArrowExpression(context, pos, [expr]);
    }
    if (hasMask(this.token, 1310720 /* AssignOperator */)) {
        var operator = this.token;
        if (!(context & 131072 /* inParameter */) && this.token === 1310749 /* Assign */) {
            this.reinterpretAsPattern(context, expr);
        }
        this.nextToken(context);
        var right = this.parseAssignmentExpression(context);
        return this.finishNode(pos, {
            type: 'AssignmentExpression',
            left: expr,
            operator: tokenDesc(operator),
            right: right
        });
    }
    return this.parseConditionalExpression(context, expr, pos);
};
Parser.prototype.reinterpretAsPattern = function reinterpretAsPattern (context, params) {
        var this$1 = this;

    switch (params.type) {
        case 'Identifier':
            if (context & 262144 /* ArrowParameterList */)
                { this.addFunctionArg(params.name); }
            return;
        case 'ObjectExpression':
            params.type = 'ObjectPattern';
        // Fall through
        case 'ObjectPattern':
            // ObjectPattern and ObjectExpression are isomorphic
            for (var i = 0; i < params.properties.length; i++) {
                var property = params.properties[i];
                if (property.kind !== 'init')
                    { this$1.error(1 /* UnexpectedToken */, tokenDesc(this$1.token)); }
                this$1.reinterpretAsPattern(context, property.type === 'SpreadElement' ? property : property.value);
            }
            return;
        case 'ArrayExpression':
            params.type = 'ArrayPattern';
        // Fall through
        case 'ArrayPattern':
            for (var i$1 = 0; i$1 < params.elements.length; ++i$1) {
                // skip holes in pattern
                if (params.elements[i$1] !== null)
                    { this$1.reinterpretAsPattern(context, params.elements[i$1]); }
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
            if (!(context & 262144 /* ArrowParameterList */))
                { return; }
        // Fall through
        default:
            this.error(1 /* UnexpectedToken */, params.type);
    }
};
Parser.prototype.parseConditionalExpression = function parseConditionalExpression (context, expression, pos) {
    if (!(this.parseOptional(context, 22 /* QuestionMark */)))
        { return expression; }
    // Valid: '(b = c) => d ? (e, f) : g;'
    // Invalid: '() => {} ? 1 : 2;'
    if (context & 8388608 /* ArrowBody */)
        { return expression; }
    var consequent = this.parseAssignmentExpression(context);
    this.expect(context, 21 /* Colon */);
    var alternate = this.parseAssignmentExpression(context);
    return this.finishNode(pos, {
        type: 'ConditionalExpression',
        test: expression,
        consequent: consequent,
        alternate: alternate
    });
};
Parser.prototype.parseBinaryExpression = function parseBinaryExpression (context, precedence, pos, expression) {
        var this$1 = this;
        if ( expression === void 0 ) expression = this.parseUnaryExpression(context, pos);

    while (hasMask(this.token, 2097152 /* BinaryOperator */)) {
        var binaryPrecedence = this$1.token & 3840;
        if (!(context & 16 /* AllowIn */) && this$1.token === 2111281 /* InKeyword */)
            { break; }
        var operator = this$1.token === 2100022 /* Exponentiate */ ? binaryPrecedence >= precedence : binaryPrecedence > precedence;
        if (!operator)
            { break; }
        var binaryOperator = this$1.token;
        this$1.nextToken(context);
        expression = this$1.finishNode(pos, {
            type: (binaryOperator === 2097719 /* LogicalAnd */ || binaryOperator === 2097464 /* LogicalOr */) ?
                'LogicalExpression' : 'BinaryExpression',
            left: expression,
            right: this$1.parseBinaryExpression(context, binaryPrecedence, this$1.getLocations()),
            operator: tokenDesc(binaryOperator)
        });
    }
    return expression;
};
Parser.prototype.parseAwaitExpression = function parseAwaitExpression (context) {
    var pos = this.getLocations();
    this.expect(context, 4526190 /* AwaitKeyword */);
    var argument = this.buildUnaryExpression(context);
    return this.finishNode(pos, {
        type: 'AwaitExpression',
        argument: argument
    });
};
Parser.prototype.parseUnaryExpression = function parseUnaryExpression (context, pos) {
    var expr;
    if (hasMask(this.token, 4456448 /* UnaryOperator */)) {
        if (context & 32 /* Async */ && this.token === 4526190 /* AwaitKeyword */)
            { return this.parseAwaitExpression(context); }
        var token = this.token;
        expr = this.buildUnaryExpression(context);
        // When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
        // UnaryExpression is a direct reference to a variable, function argument, or function name
        if (context & 2 /* Strict */ && token === 4468779 /* DeleteKeyword */ && expr.argument.type === 'Identifier') {
            this.error(48 /* StrictDelete */);
        }
        if (this.token === 2100022 /* Exponentiate */)
            { this.error(0 /* Unexpected */); }
    }
    else {
        expr = this.parseUpdateExpression(context, pos);
    }
    if (this.token !== 2100022 /* Exponentiate */)
        { return expr; }
    var precedence = hasMask(this.token, 2097152 /* BinaryOperator */) ? this.token & 3840 /* Precedence */ : 0;
    return this.parseBinaryExpression(context, precedence, pos, expr);
};
Parser.prototype.buildUnaryExpression = function buildUnaryExpression (context) {
    var pos = this.getLocations();
    if (!hasMask(this.token, 4456448 /* UnaryOperator */) || this.token === 4526190 /* AwaitKeyword */)
        { return this.parseUpdateExpression(context, pos); }
    var operator = this.token;
    this.nextToken(context);
    return this.finishNode(pos, {
        type: 'UnaryExpression',
        operator: tokenDesc(operator),
        argument: this.buildUnaryExpression(context),
        prefix: true
    });
};
Parser.prototype.parseUpdateExpression = function parseUpdateExpression (context, pos) {
    var expr;
    if (hasMask(this.token, 786432 /* UpdateOperator */)) {
        var operator = this.token;
        this.nextToken(context);
        expr = this.parseLeftHandSideExpression(context, pos);
        if (context & 2 /* Strict */ && this.isEvalOrArguments(expr.name)) {
            this.error(49 /* StrictLHSPrefix */);
        }
        else if (!isValidSimpleAssignmentTarget(expr))
            { this.error(38 /* InvalidLHSInAssignment */); }
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
    expr = this.parseLeftHandSideExpression(context | 128 /* AllowCall */, pos);
    if (hasMask(this.token, 786432 /* UpdateOperator */) && !(this.flags & 1 /* LineTerminator */)) {
        // The identifier eval or arguments may not appear as the LeftHandSideExpression of an
        // Assignment operator(12.15) or of a PostfixExpression or as the UnaryExpression
        // operated upon by a Prefix Increment(12.4.6) or a Prefix Decrement(12.4.7) operator.
        if (context & 2 /* Strict */ && this.isEvalOrArguments(expr.name)) {
            this.error(50 /* StrictLHSPostfix */);
        }
        if (!isValidSimpleAssignmentTarget(expr))
            { this.error(38 /* InvalidLHSInAssignment */); }
        var operator$1 = this.token;
        this.nextToken(context);
        return this.finishNode(pos, {
            type: 'UpdateExpression',
            argument: expr,
            operator: tokenDesc(operator$1),
            prefix: false
        });
    }
    return expr;
};
Parser.prototype.parseMetaProperty = function parseMetaProperty (context, meta, pos) {
    var property = this.parseIdentifier(context);
    return this.finishNode(pos, {
        meta: meta,
        type: 'MetaProperty',
        property: property
    });
};
Parser.prototype.parseImport = function parseImport (context, pos) {
    var id = this.parseIdentifier(context);
    switch (this.token) {
        // Import.meta - Stage 3 proposal
        case 13 /* Period */:
            if (!(context & 1 /* Module */))
                { this.error(0 /* Unexpected */); }
            this.expect(context, 13 /* Period */);
            if (this.tokenValue !== 'meta')
                { this.error(0 /* Unexpected */); }
            return this.parseMetaProperty(context, id, pos);
        default:
            return this.finishNode(pos, {
                type: 'Import'
            });
    }
};
Parser.prototype.parseLeftHandSideExpression = function parseLeftHandSideExpression (context, pos) {
    switch (this.token) {
        // 'import'
        case 274522 /* ImportKeyword */:
            if (!(this.flags & 131072 /* OptionsNext */))
                { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
            return this.parseCallExpression(context | 32768 /* Import */, pos, this.parseImport(context, pos));
        // 'super'
        case 274525 /* SuperKeyword */:
            return this.parseCallExpression(context, pos, this.parseSuper(context));
        default:
            var expr = this.parseMemberExpression(context, pos);
            if (!(context & 128 /* AllowCall */))
                { return expr; }
            return this.parseCallExpression(context, pos, expr);
    }
};
Parser.prototype.parseMemberExpression = function parseMemberExpression (context, pos, expr) {
        var this$1 = this;
        if ( expr === void 0 ) expr = this.parsePrimaryExpression(context, pos);

    while (true) {
        switch (this$1.token) {
            // '.'
            case 13 /* Period */:
                {
                    this$1.expect(context, 13 /* Period */);
                    if (!this$1.isIdentifierOrKeyword(this$1.token))
                        { this$1.error(1 /* UnexpectedToken */, tokenDesc(this$1.token)); }
                    var property = this$1.parseIdentifier(context);
                    expr = this$1.finishNode(pos, {
                        type: 'MemberExpression',
                        object: expr,
                        computed: false,
                        property: property,
                    });
                    break;
                }
            // '['
            case 393235 /* LeftBracket */:
                {
                    this$1.expect(context, 393235 /* LeftBracket */);
                    var start = this$1.getLocations();
                    var property$1 = this$1.parseExpression(context, start);
                    this$1.expect(context, 20 /* RightBracket */);
                    expr = this$1.finishNode(pos, {
                        type: 'MemberExpression',
                        object: expr,
                        computed: true,
                        property: property$1,
                    });
                    break;
                }
            case 262152 /* TemplateCont */:
                {
                    var quasi = this$1.parseTemplate(context, this$1.getLocations());
                    expr = this$1.parseTaggedTemplateExpression(context, expr, quasi, this$1.getLocations());
                    break;
                }
            case 262153 /* TemplateTail */:
                {
                    var quasi$1 = this$1.parseTemplateTail(context, this$1.getLocations());
                    expr = this$1.parseTaggedTemplateExpression(context, expr, quasi$1, pos);
                    break;
                }
            default:
                return expr;
        }
    }
};
Parser.prototype.parseCallExpression = function parseCallExpression (context, pos, expr) {
        var this$1 = this;

    while (true) {
        expr = this$1.parseMemberExpression(context, pos, expr);
        switch (this$1.token) {
            case 262155 /* LeftParen */:
                var args = this$1.parseArguments(context & ~131072 /* inParameter */, pos);
                if (this$1.token === 10 /* Arrow */) {
                    return this$1.parseArrowExpression(context | 32 /* Async */, pos, args);
                }
                if (context & 32768 /* Import */ && args.length !== 1 &&
                    expr.type === 'Import')
                    { this$1.error(14 /* BadImportCallArity */); }
                expr = this$1.finishNode(pos, {
                    type: 'CallExpression',
                    callee: expr,
                    arguments: args
                });
                break;
            default:
                return expr;
        }
    }
};
Parser.prototype.parseNewExpression = function parseNewExpression (context) {
    var pos = this.getLocations();
    var id = this.parseIdentifier(context);
    switch (this.token) {
        // '.'
        case 13 /* Period */:
            this.expect(context, 13 /* Period */);
            if (this.token === 262145 /* Identifier */) {
                if (this.tokenValue !== 'target')
                    { this.error(32 /* MetaNotInFunctionBody */); }
                if (context & 131072 /* inParameter */)
                    { return this.parseMetaProperty(context, id, pos); }
                if (!(this.flags & 16 /* InFunctionBody */))
                    { this.error(32 /* MetaNotInFunctionBody */); }
            }
            return this.parseMetaProperty(context, id, pos);
        // 'import'
        case 274522 /* ImportKeyword */:
            this.error(1 /* UnexpectedToken */, tokenDesc(this.token));
        default:
            return this.finishNode(pos, {
                type: 'NewExpression',
                callee: this.parseMemberExpression(context & ~131072 /* inParameter */ | 1024 /* NewExpression */, pos),
                arguments: this.token === 262155 /* LeftParen */ ? this.parseArguments(context & ~131072 /* inParameter */, pos) : []
            });
    }
};
Parser.prototype.parseSuper = function parseSuper (context) {
    var pos = this.getLocations();
    this.expect(context, 274525 /* SuperKeyword */);
    switch (this.token) {
        // '('
        case 262155 /* LeftParen */:
            // The super property has to be within a class constructor
            if (!(context & 16384 /* Constructor */))
                { this.error(64 /* BadSuperCall */); }
            break;
        // '.'
        case 13 /* Period */:
            if (!(context & 8192 /* Method */))
                { this.error(64 /* BadSuperCall */); }
            break;
        // '['
        case 393235 /* LeftBracket */:
            if (!(context & 8192 /* Method */))
                { this.error(64 /* BadSuperCall */); }
            break;
        default:
            this.error(1 /* UnexpectedToken */, tokenDesc(this.token));
    }
    return this.finishNode(pos, {
        type: 'Super'
    });
};
Parser.prototype.parseSpreadElement = function parseSpreadElement (context) {
    var pos = this.getLocations();
    // Disallow SpreadElement inside dynamic import
    if (context & 32768 /* Import */)
        { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
    this.expect(context, 14 /* Ellipsis */);
    var arg = this.parseAssignmentExpression(context);
    return this.finishNode(pos, {
        type: 'SpreadElement',
        argument: arg
    });
};
Parser.prototype.parseArguments = function parseArguments (context, pos) {
        var this$1 = this;

    this.expect(context, 262155 /* LeftParen */);
    var args = [];
    if (this.token !== 16 /* RightParen */) {
        while (true) {
            var expr = this$1.token === 14 /* Ellipsis */ ? this$1.parseSpreadElement(context) :
                this$1.parseAssignmentExpression(context & ~32768 /* Import */);
            args.push(expr);
            if (this$1.token === 16 /* RightParen */) {
                break;
            }
            this$1.expect(context, 18 /* Comma */);
            if (this$1.token === 16 /* RightParen */) {
                break;
            }
        }
    }
    this.expect(context, 16 /* RightParen */);
    return args;
};
Parser.prototype.matchAsyncFunction = function matchAsyncFunction (context) {
    this.peekToken(context);
    if (this.line !== this.peekedState.line)
        { return 0 /* None */; }
    switch (this.peekedToken) {
        case 274520 /* FunctionKeyword */:
            return 1 /* Function */;
        default:
            if (this.isIdentifier(context, this.peekedToken))
                { return 2 /* Identifier */; }
            return 0 /* None */;
    }
};
Parser.prototype.parseClassDeclaration = function parseClassDeclaration (context) {
    var pos = this.getLocations();
    this.expect(context, 274510 /* ClassKeyword */);
    var superClass = null;
    var id = null;
    var classBody;
    var flags = 0;
    var savedFlags = this.flags;
    if (this.isIdentifier(context, this.token)) {
        var name = this.tokenValue;
        if (context & 4096 /* Statement */) {
            if (!this.initBlockScope() && name in this.blockScope) {
                if (this.blockScope !== this.functionScope || this.blockScope[name] === 2 /* NonShadowable */) {
                    this.error(77 /* DuplicateIdentifier */, name);
                }
            }
            this.blockScope[name] = 1 /* Shadowable */;
        }
        // Invalid: 'export class a{}  export class a{}'
        if (context & 65536 /* Export */ && this.token === 262145 /* Identifier */)
            { this.addFunctionArg(this.tokenValue); }
        id = this.parseBindingIdentifier(context | 2 /* Strict */);
        // Valid: `export default class {};`
        // Invalid: `class {};`
    }
    else if (!(context & 512 /* OptionalIdentifier */)) {
        this.error(94 /* UnNamedClassStmt */);
    }
    if (this.parseOptional(context, 12373 /* ExtendsKeyword */)) {
        superClass = this.parseLeftHandSideExpression(context & ~512 /* OptionalIdentifier */ | 2 /* Strict */, pos);
        flags |= 1024 /* Heritage */;
    }
    classBody = this.parseClassBody(context | 2 /* Strict */, flags);
    this.flags = savedFlags;
    return this.finishNode(pos, {
        type: 'ClassDeclaration',
        id: id,
        superClass: superClass,
        body: classBody
    });
};
Parser.prototype.parseClassExpression = function parseClassExpression (context) {
    var pos = this.getLocations();
    this.expect(context, 274510 /* ClassKeyword */);
    var superClass = null;
    var id = null;
    var classBody;
    var flags = 0;
    var savedFlags = this.flags;
    if (this.token === 262145 /* Identifier */) {
        var name = this.tokenValue;
        if (context & 4096 /* Statement */) {
            if (!this.initBlockScope() && name in this.blockScope) {
                if (this.blockScope !== this.functionScope || this.blockScope[name] === 2 /* NonShadowable */) {
                    this.error(77 /* DuplicateIdentifier */, name);
                }
            }
            this.blockScope[name] = 1 /* Shadowable */;
        }
        id = this.isIdentifier(context, this.token) ? this.parseIdentifier(context | 2 /* Strict */) : null;
        // Valid: `export default class {};`
        // Invalid: `class {};`
    }
    if (this.parseOptional(context, 12373 /* ExtendsKeyword */)) {
        superClass = this.parseLeftHandSideExpression(context | 2 /* Strict */, pos);
        flags |= 1024 /* Heritage */;
    }
    classBody = this.parseClassBody(context | 2 /* Strict */, flags);
    this.flags = savedFlags;
    return this.finishNode(pos, {
        type: 'ClassExpression',
        id: id,
        superClass: superClass,
        body: classBody
    });
};
Parser.prototype.parseClassBody = function parseClassBody (context, flags) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 393228 /* LeftBrace */);
    var body = [];
    while (this.token !== 15 /* RightBrace */) {
        if (!this$1.parseOptional(context, 17 /* Semicolon */)) {
            var node = this$1.parseClassElement(context, flags);
            body.push(node);
            if (node.kind === 'constructor')
                { context |= 1048576 /* HasConstructor */; }
        }
    }
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(pos, {
        type: 'ClassBody',
        body: body
    });
};
Parser.prototype.parseClassElement = function parseClassElement (context, state) {
    var pos = this.getLocations();
    var key = null;
    var value = null;
    var token = this.token;
    if (this.parseOptional(context, 2099763 /* Multiply */))
        { state |= 1 /* Yield */; }
    if (!(state & 1 /* Yield */)) {
        if (this.token === 393235 /* LeftBracket */)
            { state |= 16 /* Computed */; }
        if (this.tokenValue === 'constructor')
            { state |= 512 /* HasConstructor */; }
        key = this.parsePropertyName(context & ~2 /* Strict */);
        if (token === 20586 /* StaticKeyword */ && (this.qualifiedPropertyName() || this.token === 2099763 /* Multiply */)) {
            token = this.token;
            state |= 2048 /* Static */;
            if (this.parseOptional(context, 2099763 /* Multiply */)) {
                state |= 1 /* Yield */;
            }
            else {
                if (token === 393235 /* LeftBracket */)
                    { state |= 16 /* Computed */; }
                key = this.parsePropertyName(context);
            }
        }
        if (!(this.flags & 1 /* LineTerminator */) && (token === 69732 /* AsyncKeyword */)) {
            if (this.token !== 21 /* Colon */ && this.token !== 262155 /* LeftParen */) {
                state |= 2 /* Async */;
                token = this.token;
                if (!(this.flags & 131072 /* OptionsNext */) && this.token === 2099763 /* Multiply */) {
                    this.error(108 /* InvalidAsyncGenerator */);
                }
                // Async generator
                if (this.parseOptional(context, 2099763 /* Multiply */))
                    { state |= 1 /* Yield */; }
                switch (this.token) {
                    case 393235 /* LeftBracket */:
                        state |= 16 /* Computed */;
                        break;
                    // Invalid: `class X { async static f() {} }`
                    case 20586 /* StaticKeyword */:
                        this.error(110 /* InvalidMethod */);
                    default: // ignore
                }
                key = this.parsePropertyName(context);
                if (token === 69743 /* ConstructorKeyword */)
                    { this.error(67 /* ConstructorIsAsync */); }
            }
        }
    }
    // MethodDeclaration
    if (this.qualifiedPropertyName()) {
        switch (token) {
            case 69744 /* GetKeyword */:
                state |= 64 /* Get */;
                break;
            case 69745 /* SetKeyword */:
                state |= 128 /* Set */;
                break;
            case 2099763 /* Multiply */:
                state |= 256 /* Method */;
                break;
        }
        if (state & 2 /* Async */ && state & 192 /* Accessors */) {
            this.error(1 /* UnexpectedToken */, tokenDesc(token));
        }
        switch (this.token) {
            // '['
            case 393235 /* LeftBracket */:
                state |= 16 /* Computed */;
                break;
            // 'constructor'
            case 69743 /* ConstructorKeyword */:
                state |= 512 /* HasConstructor */;
                break;
            default: // ignore
        }
        key = this.parsePropertyName(context);
        value = this.parseMethodDefinition(context | 8192 /* Method */, state);
    }
    if (!(state & 449 /* Modifiers */) || (key && this.token === 262155 /* LeftParen */)) {
        if (!(state & 1 /* Yield */)) {
            if (state & 1024 /* Heritage */ && state & 512 /* HasConstructor */) {
                context |= 16384 /* Constructor */;
            }
        }
        value = this.parseMethodDefinition(context | 8192 /* Method */, state);
        state |= 256 /* Method */;
    }
    // Invalid: `class Foo { * }`
    if (state & 1 /* Yield */ && !key)
        { this.error(0 /* Unexpected */); }
    if (state & 512 /* HasConstructor */)
        { state |= 4096 /* Special */; }
    if (!(state & 16 /* Computed */)) {
        if (state & 2048 /* Static */ && this.tokenValue === 'prototype') {
            this.error(66 /* StaticPrototype */);
        }
        if (!(state & 2048 /* Static */) && state & 512 /* HasConstructor */) {
            if (!(state & 4096 /* Special */) || !(state & 256 /* Method */) || (value && value.generator))
                { this.error(63 /* ConstructorSpecialMethod */); }
            if (context & 1048576 /* HasConstructor */)
                { this.error(65 /* DuplicateConstructor */); }
            state |= 8192 /* Constructor */;
        }
    }
    return this.finishNode(pos, {
        type: 'MethodDefinition',
        computed: !!(state & 16 /* Computed */),
        key: key,
        kind: (state & 8192 /* Constructor */) ? 'constructor' : (state & 64 /* Get */) ? 'get' :
            (state & 128 /* Set */) ? 'set' : 'method',
        static: !!(state & 2048 /* Static */),
        value: value
    });
};
Parser.prototype.parseObjectExpression = function parseObjectExpression (context) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 393228 /* LeftBrace */);
    var properties = [];
    while (!this.parseOptional(context, 15 /* RightBrace */)) {
        if (this$1.token === 14 /* Ellipsis */) {
            // Object rest spread - Stage 3 proposal
            if (!(this$1.flags & 131072 /* OptionsNext */))
                { this$1.error(1 /* UnexpectedToken */, tokenDesc(this$1.token)); }
            properties.push(this$1.parseSpreadElement(context));
        }
        else {
            properties.push(this$1.parseObjectElement(context));
        }
        if (this$1.token !== 15 /* RightBrace */)
            { this$1.parseOptional(context, 18 /* Comma */); }
    }
    return this.finishNode(pos, {
        type: 'ObjectExpression',
        properties: properties
    });
};
Parser.prototype.isAsync = function isAsync (t) {
    switch (t) {
        case 21 /* Colon */:
        case 1310749 /* Assign */:
        case 262155 /* LeftParen */:
        case 18 /* Comma */:
            return false;
        default:
            return true;
    }
};
Parser.prototype.qualifiedPropertyName = function qualifiedPropertyName () {
    switch (this.token) {
        case 262147 /* StringLiteral */:
        case 262146 /* NumericLiteral */:
        case 2099763 /* Multiply */:
        case 393235 /* LeftBracket */:
        case 262145 /* Identifier */:
            return true;
        default:
            return hasMask(this.token, 4096 /* Keyword */);
    }
};
Parser.prototype.parseObjectElement = function parseObjectElement (context) {
    var pos = this.getLocations();
    var key = null;
    var value = null;
    var token = this.token;
    var tokenValue = this.tokenValue;
    var state = 0;
    if (this.isIdentifier(context & ~2 /* Strict */, token)) {
        this.nextToken(context);
        if (this.token === 393235 /* LeftBracket */)
            { state |= 16 /* Computed */; }
        if (!(this.flags & 1 /* LineTerminator */) && (token === 69732 /* AsyncKeyword */) && this.isAsync(this.token)) {
            state |= 2 /* Async */;
            // Asynchronous Iteration - Stage 3 proposal
            if (!(this.flags & 131072 /* OptionsNext */) && this.token === 2099763 /* Multiply */)
                { this.error(108 /* InvalidAsyncGenerator */); }
            if (this.parseOptional(context, 2099763 /* Multiply */))
                { state |= 1 /* Yield */; }
            key = this.parsePropertyName(context);
        }
        else {
            key = this.finishNode(pos, {
                type: 'Identifier',
                name: tokenValue
            });
        }
    }
    else if (this.parseOptional(context, 2099763 /* Multiply */)) {
        state |= 1 /* Yield */;
    }
    else {
        if (this.token === 393235 /* LeftBracket */)
            { state |= 16 /* Computed */; }
        key = this.parsePropertyName(context);
    }
    if (this.qualifiedPropertyName()) {
        switch (token) {
            case 69744 /* GetKeyword */:
                // `({ g\\u0065t m() {} })`
                if (state & 512 /* HasConstructor */)
                    { this.error(74 /* InvalidEscapedReservedWord */); }
                state |= 64 /* Get */;
                break;
            case 69745 /* SetKeyword */:
                // `({ s\\u0065t m(v) {} })`
                if (state & 512 /* HasConstructor */)
                    { this.error(74 /* InvalidEscapedReservedWord */); }
                state |= 128 /* Set */;
                break;
            case 2099763 /* Multiply */:
                state |= 256 /* Method */;
                break;
            default: // ignore;
        }
        if (this.token === 393235 /* LeftBracket */)
            { state |= 16 /* Computed */; }
        key = this.parsePropertyName(context);
        value = this.parseMethodDefinition(context | 8192 /* Method */, state);
    }
    else {
        if (!key)
            { this.error(0 /* Unexpected */); }
        switch (this.token) {
            // ':'
            case 21 /* Colon */:
                if (state & (1 /* Yield */ | 2 /* Async */))
                    { this.error(109 /* BadPropertyId */); }
                if (!(state & 16 /* Computed */) && tokenValue === '__proto__') {
                    if (this.flags & 8 /* HasPrototype */)
                        { this.error(60 /* DuplicateProtoProperty */); }
                    this.flags |= 8 /* HasPrototype */;
                }
                this.expect(context, 21 /* Colon */);
                value = this.parseAssignmentExpression(context);
                if (context & 2 /* Strict */ && this.isEvalOrArguments(value.name)) {
                    this.error(86 /* UnexpectedStrictReserved */);
                }
                break;
            // '('
            case 262155 /* LeftParen */:
                value = this.parseMethodDefinition(context | 8192 /* Method */, state);
                state |= 256 /* Method */;
                break;
            default:
                if (this.isIdentifier(context, token)) {
                    // Invalid: `"use strict"; for ({ eval } of [{}]) ;`
                    if (context & 2 /* Strict */ && this.isEvalOrArguments(tokenValue))
                        { this.error(83 /* UnexpectedReservedWord */); }
                    // Invalid: '({async foo() { return {await} }})'
                    if (token === 4526190 /* AwaitKeyword */)
                        { this.error(1 /* UnexpectedToken */, tokenDesc(token)); }
                    var id = this.finishNode(pos, {
                        type: 'Identifier',
                        name: tokenValue
                    });
                    if (this.parseOptional(context, 1310749 /* Assign */)) {
                        // Invalid: '({ async f = function() {} })'
                        if (state & (1 /* Yield */ | 2 /* Async */))
                            { this.error(109 /* BadPropertyId */); }
                        state |= 32 /* Shorthand */;
                        var init = this.parseAssignmentExpression(context);
                        value = this.finishNode(pos, {
                            type: 'AssignmentPattern',
                            left: id,
                            right: init
                        });
                        // shorthand
                    }
                    else {
                        if (state & 16 /* Computed */ ||
                            //this.token !== Token.AsyncKeyword && hasMask(token, Token.Contextual) ||
                            !this.isIdentifier(context, token))
                            { this.error(1 /* UnexpectedToken */, tokenDesc(token)); }
                        // Invalid: `"use strict"; for ({ eval } of [{}]) ;`
                        if (context & 2 /* Strict */ && this.isEvalOrArguments(this.tokenValue))
                            { this.error(83 /* UnexpectedReservedWord */); }
                        state |= 32 /* Shorthand */;
                        value = id;
                    }
                }
                else {
                    this.error(0 /* Unexpected */);
                }
        }
    }
    return this.finishNode(pos, {
        type: 'Property',
        key: key,
        value: value,
        kind: !(state & 192 /* Accessors */) ? 'init' : (state & 128 /* Set */) ? 'set' : 'get',
        computed: !!(state & 16 /* Computed */),
        method: !!(state & 256 /* Method */),
        shorthand: !!(state & 32 /* Shorthand */)
    });
};
Parser.prototype.parseMethodDefinition = function parseMethodDefinition (context, state) {
    var pos = this.getLocations();
    { context &= ~(64 /* Yield */ | 32 /* Async */); }
    if (state & 1 /* Yield */ && !(state & 64 /* Get */))
        { context |= 64 /* Yield */; }
    if (state & 2 /* Async */)
        { context |= 32 /* Async */; }
    var savedFlag = this.flags;
    var savedScope = this.enterFunctionScope();
    var params = this.parseParameterList(context | 131072 /* inParameter */);
    var body = this.parseFunctionBody(context);
    this.flags = savedFlag;
    this.exitFunctionScope(savedScope);
    return this.finishNode(pos, {
        type: 'FunctionExpression',
        id: null,
        params: params,
        body: body,
        generator: !!(state & 1 /* Yield */),
        async: !!(state & 2 /* Async */),
        expression: false
    });
};
Parser.prototype.parseFunctionDeclaration = function parseFunctionDeclaration (context) {
    var pos = this.getLocations();
    var parentHasYield = !!(context & 64 /* Yield */);
    if (context & (32 /* Async */ | 64 /* Yield */))
        { context &= ~(32 /* Async */ | 64 /* Yield */); }
    if (this.token === 69732 /* AsyncKeyword */) {
        // use 'expect' instead of 'parseOptional' here for perf reasons when it
        // comes to Annex B.3.4. Avoid extra CPU cycle parsing out the 'async' keyword
        // in case this is an invalid generator function.
        this.expect(context, 69732 /* AsyncKeyword */);
        if (this.flags & 1 /* LineTerminator */)
            { this.error(73 /* LineBreakAfterAsync */); }
        context |= 32 /* Async */;
    }
    this.expect(context, 274520 /* FunctionKeyword */);
    var savedFlags = this.flags;
    if (this.token === 2099763 /* Multiply */) {
        // Annex B.3.4 doesn't allow generators functions
        if (context & 2048 /* AnnexB */)
            { this.error(107 /* ForbiddenAsStatement */, tokenDesc(this.token)); }
        // If we are in the 'await' context. Check if the 'Next' option are set
        // and allow use of async generators. Throw a decent error message if this isn't the case
        if (context & 32 /* Async */ && !(this.flags & 131072 /* OptionsNext */))
            { this.error(108 /* InvalidAsyncGenerator */); }
        this.expect(context, 2099763 /* Multiply */);
        context |= 64 /* Yield */;
    }
    // Invalid: 'export function a() {} export function a() {}'
    if (context & 65536 /* Export */ && this.token === 262145 /* Identifier */)
        { this.addFunctionArg(this.tokenValue); }
    var id = null;
    if (this.token !== 262155 /* LeftParen */ && this.isIdentifier(context, this.token)) {
        var name = this.tokenValue;
        // If the parent has the 'yield' mask, and the func decl name is 'yield' we have to throw an decent error message
        if (parentHasYield && this.token === 282731 /* YieldKeyword */)
            { this.error(91 /* DisallowedInContext */, tokenDesc(this.token)); }
        if (context & 2 /* Strict */ && this.isEvalOrArguments(name))
            { this.error(86 /* UnexpectedStrictReserved */); }
        if (hasMask(this.token, 12288 /* Reserved */))
            { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
        if (context & 4096 /* Statement */ && !(context & 2048 /* AnnexB */)) {
            if (!this.initBlockScope() && (this.blockScope !== this.functionScope && this.blockScope[name] ||
                this.blockScope[name] === 2 /* NonShadowable */)) {
                this.error(77 /* DuplicateIdentifier */, name);
            }
            this.blockScope[name] = 1 /* Shadowable */;
        }
        id = this.parseBindingIdentifier(context);
    }
    else if (!(context & 512 /* OptionalIdentifier */)) {
        this.error(95 /* UnNamedFunctionStmt */);
    }
    var savedScope = this.enterFunctionScope();
    var params = this.parseParameterList(context & ~(4096 /* Statement */ | 512 /* OptionalIdentifier */) | 131072 /* inParameter */);
    var body = this.parseFunctionBody(context & ~(4096 /* Statement */ | 512 /* OptionalIdentifier */));
    this.exitFunctionScope(savedScope);
    this.flags = savedFlags;
    return this.finishNode(pos, {
        type: 'FunctionDeclaration',
        params: params,
        body: body,
        async: !!(context & 32 /* Async */),
        generator: !!(context & 64 /* Yield */),
        expression: false,
        id: id
    });
};
Parser.prototype.parseFunctionExpression = function parseFunctionExpression (context) {
    var pos = this.getLocations();
    var parentHasYield = !!(context & 64 /* Yield */);
    if (context & (64 /* Yield */ | 32 /* Async */))
        { context &= ~(64 /* Yield */ | 32 /* Async */); }
    if (this.token === 69732 /* AsyncKeyword */) {
        this.expect(context, 69732 /* AsyncKeyword */);
        if (this.flags & 1 /* LineTerminator */)
            { this.error(73 /* LineBreakAfterAsync */); }
        context |= 32 /* Async */;
    }
    this.expect(context, 274520 /* FunctionKeyword */);
    if (this.token === 2099763 /* Multiply */) {
        // If we are in the 'await' context. Check if the 'Next' option are set
        // and allow us to use async generators. If not, throw a decent error message if this isn't the case
        if (context & 32 /* Async */ && !(this.flags & 131072 /* OptionsNext */))
            { this.error(108 /* InvalidAsyncGenerator */); }
        this.expect(context, 2099763 /* Multiply */);
        context |= 64 /* Yield */;
    }
    var id = null;
    if (this.token !== 262155 /* LeftParen */ && this.isIdentifier(context, this.token)) {
        if (context & 2 /* Strict */ && this.isEvalOrArguments(this.tokenValue))
            { this.error(37 /* StrictLHSAssignment */); }
        if ((context & (32 /* Async */ | 64 /* Yield */) || (context & 2 /* Strict */ && parentHasYield)) && this.token === 282731 /* YieldKeyword */) {
            this.error(87 /* YieldReservedWord */);
        }
        id = this.parseIdentifier(context);
    }
    var savedScope = this.enterFunctionScope();
    var params = this.parseParameterList(context | 131072 /* inParameter */);
    var body = this.parseFunctionBody(context);
    this.exitFunctionScope(savedScope);
    return this.finishNode(pos, {
        type: 'FunctionExpression',
        params: params,
        body: body,
        async: !!(context & 32 /* Async */),
        generator: !!(context & 64 /* Yield */),
        expression: false,
        id: id
    });
};
Parser.prototype.parseParameterList = function parseParameterList (context) {
        var this$1 = this;

    // FormalParameters [Yield,Await]: (modified)
    //  [empty]
    //  FormalParameterList[?Yield,Await]
    //
    // FormalParameter[Yield,Await]: (modified)
    //  BindingElement[?Yield,Await]
    //
    // BindingElement [Yield,Await]: (modified)
    //  SingleNameBinding[?Yield,?Await]
    //  BindingPattern[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
    //
    // SingleNameBinding [Yield,Await]:
    //  BindingIdentifier[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
    this.expect(context, 262155 /* LeftParen */);
    this.flags &= ~4 /* HasNonSimpleParameter */;
    var result = [];
    while (this.token !== 16 /* RightParen */) {
        if (this$1.token === 14 /* Ellipsis */) {
            this$1.flags |= 4 /* HasNonSimpleParameter */;
            result.push(this$1.parseRestElement(context));
            this$1.parseOptional(context, 18 /* Comma */);
            break;
        }
        result.push(this$1.parseFormalParameter(context));
        if (this$1.token !== 16 /* RightParen */)
            { this$1.expect(context, 18 /* Comma */); }
    }
    this.expect(context, 16 /* RightParen */);
    return result;
};
Parser.prototype.parseFormalParameter = function parseFormalParameter (context) {
    var pos = this.getLocations();
    var left = this.token === 14 /* Ellipsis */ ? this.parseRestElement(context) : this.parseBindingPatternOrIdentifier(context, pos);
    // Initializer[In, Yield] :
    // = AssignmentExpression[?In, ?Yield]
    if (!this.parseOptional(context, 1310749 /* Assign */))
        { return left; }
    if (context & 64 /* Yield */ && this.token === 282731 /* YieldKeyword */)
        { this.error(0 /* Unexpected */); }
    var right = this.parseAssignmentExpression(context);
    return this.finishNode(pos, {
        type: 'AssignmentPattern',
        left: left,
        right: right
    });
};
Parser.prototype.parsePrimaryExpression = function parsePrimaryExpression (context, pos) {
    switch (this.token) {
        case 2361909 /* Divide */:
        case 1310757 /* DivideAssign */:
            if (this.scanRegularExpression() === 262148 /* RegularExpression */)
                { return this.parseRegularExpression(context); }
        case 262145 /* Identifier */:
            return this.parseIdentifier(context);
        case 262146 /* NumericLiteral */:
            if (this.flags & 512 /* BigInt */)
                { return this.parseBigIntLiteral(context); }
        case 262147 /* StringLiteral */:
            return this.parseLiteral(context);
        case 274527 /* ThisKeyword */:
            return this.parseThisExpression(context);
        case 274439 /* NullKeyword */:
            return this.parseNullExpression(context);
        case 274438 /* TrueKeyword */:
        case 274437 /* FalseKeyword */:
            return this.parseTrueOrFalseExpression(context);
        case 262155 /* LeftParen */:
            return this.parseParenthesizedExpression(context & ~(128 /* AllowCall */ | 131072 /* inParameter */ | 256 /* NonSimpleParameter */));
        case 393235 /* LeftBracket */:
            return this.parseArrayExpression(context);
        case 274520 /* FunctionKeyword */:
            return this.parseFunctionExpression(context);
        case 393228 /* LeftBrace */:
            return this.parseObjectExpression(context);
        case 274523 /* NewKeyword */:
            return this.parseNewExpression(context);
        case 274510 /* ClassKeyword */:
            return this.parseClassExpression(context);
        case 262153 /* TemplateTail */:
            return this.parseTemplateTail(context, pos);
        case 262152 /* TemplateCont */:
            return this.parseTemplate(context, pos);
        case 274525 /* SuperKeyword */:
            return this.parseSuper(context);
        case 12370 /* DoKeyword */:
            if (this.flags & 1048576 /* OptionsV8 */)
                { return this.parseDoExpression(context); }
        case 12384 /* ThrowKeyword */:
            if (this.flags & 131072 /* OptionsNext */)
                { return this.parseThrowExpression(context); }
        case 69732 /* AsyncKeyword */:
            var state = this.matchAsyncFunction(context);
            switch (state) {
                case 1 /* Function */:
                    return this.parseFunctionExpression(context);
                case 2 /* Identifier */:
                    this.expect(context, 69732 /* AsyncKeyword */);
                    var expr = this.parseIdentifier(context);
                    return this.parseArrowExpression(context | 32 /* Async */, pos, [expr]);
                default:
                    return this.parseIdentifier(context);
            }
        case 8671305 /* LetKeyword */:
            return this.parseLetIdentifier(context);
        case 282731 /* YieldKeyword */:
            if (!(context & 2 /* Strict */ && context & 64 /* Yield */))
                { return this.parseIdentifier(context); }
        case 4526190 /* AwaitKeyword */:
            if (!(context & (1 /* Module */ | 32 /* Async */)))
                { return this.parseIdentifier(context); }
        default:
            if (this.isIdentifier(context, this.token))
                { return this.parseIdentifier(context); }
            this.error(1 /* UnexpectedToken */, tokenDesc(this.token));
    }
};
Parser.prototype.parseArrowFormalList = function parseArrowFormalList (context, params) {
        var this$1 = this;

    for (var idx = 0; idx < params.length; idx++) {
        this$1.reinterpretAsPattern(context | 262144 /* ArrowParameterList */, params[idx]);
    }
    return params;
};
Parser.prototype.parseArrowExpression = function parseArrowExpression (context, pos, params) {
    if (this.flags & 16 /* InFunctionBody */)
        { context &= ~64 /* Yield */; }
    if (this.flags & 1 /* LineTerminator */)
        { this.error(73 /* LineBreakAfterAsync */); }
    this.expect(context, 10 /* Arrow */);
    var savedScope = this.enterFunctionScope();
    this.parseArrowFormalList(context, params);
    var expression = false;
    var body;
    if (this.token === 393228 /* LeftBrace */) {
        body = this.parseFunctionBody(context | 8388608 /* ArrowBody */);
    }
    else {
        body = this.parseAssignmentExpression(context);
        expression = true;
    }
    this.exitFunctionScope(savedScope);
    return this.finishNode(pos, {
        type: 'ArrowFunctionExpression',
        body: body,
        params: params,
        id: null,
        async: !!(context & 32 /* Async */),
        generator: !!(context & 64 /* Yield */),
        expression: expression
    });
};
Parser.prototype.parseRestElement = function parseRestElement (context) {
    var pos = this.getLocations();
    this.expect(context, 14 /* Ellipsis */);
    var argument = this.parseBindingPatternOrIdentifier(context, pos);
    if (this.token === 1310749 /* Assign */)
        { this.error(27 /* DefaultRestParameter */); }
    if (this.token !== 16 /* RightParen */)
        { this.error(29 /* ParameterAfterRestParameter */); }
    return this.finishNode(pos, {
        type: 'RestElement',
        argument: argument
    });
};
Parser.prototype.parseParenthesizedExpression = function parseParenthesizedExpression (context) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 262155 /* LeftParen */);
    if (this.parseOptional(context, 16 /* RightParen */)) {
        if (this.token === 10 /* Arrow */)
            { return this.parseArrowExpression(context, pos, []); }
        this.error(75 /* MissingArrowAfterParentheses */);
    }
    var expr;
    if (this.token === 14 /* Ellipsis */) {
        expr = this.parseRestElement(context | 256 /* NonSimpleParameter */);
        this.expect(context, 16 /* RightParen */);
        return this.parseArrowExpression(context, pos, [expr]);
    }
    var sequencePos = this.getLocations();
    expr = this.parseAssignmentExpression(context | 128 /* AllowCall */);
    if (this.token === 18 /* Comma */) {
        var expressions = [expr];
        while (this.parseOptional(context, 18 /* Comma */)) {
            if (this$1.parseOptional(context, 262155 /* LeftParen */)) {
                return this$1.parseArrowExpression(context, pos, expressions);
            }
            else if (this$1.token === 14 /* Ellipsis */) {
                expressions.push(this$1.parseRestElement(context | 256 /* NonSimpleParameter */));
                this$1.expect(context, 16 /* RightParen */);
                return this$1.parseArrowExpression(context, pos, expressions);
            }
            else {
                expressions.push(this$1.parseAssignmentExpression(context | 128 /* AllowCall */));
            }
        }
        expr = this.finishNode(sequencePos, {
            type: 'SequenceExpression',
            expressions: expressions
        });
    }
    this.expect(context, 16 /* RightParen */);
    if (this.token === 10 /* Arrow */) {
        return this.parseArrowExpression(context, pos, expr.type === 'SequenceExpression' ? expr.expressions : [expr]);
    }
    return expr;
};
Parser.prototype.parseThrowExpression = function parseThrowExpression (context) {
    var pos = this.getLocations();
    this.nextToken(context);
    return this.finishNode(pos, {
        type: 'ThrowExpression',
        expressions: this.buildUnaryExpression(context)
    });
};
Parser.prototype.parseArrayExpression = function parseArrayExpression (context) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 393235 /* LeftBracket */);
    var elements = [];
    while (this.token !== 20 /* RightBracket */) {
        if (this$1.parseOptional(context, 18 /* Comma */)) {
            elements.push(null);
        }
        else if (this$1.token === 14 /* Ellipsis */) {
            var element = this$1.parseSpreadElement(context);
            if (this$1.token !== 20 /* RightBracket */) {
                this$1.expect(context, 18 /* Comma */);
            }
            elements.push(element);
        }
        else {
            elements.push(this$1.parseAssignmentExpression(context));
            if (this$1.token !== 20 /* RightBracket */) {
                this$1.expect(context, 18 /* Comma */);
            }
        }
    }
    this.expect(context, 20 /* RightBracket */);
    return this.finishNode(pos, {
        type: 'ArrayExpression',
        elements: elements
    });
};
Parser.prototype.parseRegularExpression = function parseRegularExpression (context) {
    var pos = this.getLocations();
    var regex = this.tokenRegExp;
    var value = this.tokenValue;
    var raw = this.tokenRaw;
    this.nextToken(context);
    var node = this.finishNode(pos, {
        type: 'Literal',
        value: value,
        regex: regex
    });
    if (this.flags & 65536 /* OptionsRaw */)
        { node.raw = raw; }
    return node;
};
Parser.prototype.parseTemplateTail = function parseTemplateTail (context, pos) {
    var quasis = this.parseTemplateElement(context, pos);
    return this.finishNode(pos, {
        type: 'TemplateLiteral',
        expressions: [],
        quasis: [quasis]
    });
};
Parser.prototype.parseTemplateHead = function parseTemplateHead (context, cooked, raw) {
    var pos = this.getLocations();
    this.token = this.scanTemplateNext(context);
    return this.finishNode(pos, {
        type: 'TemplateElement',
        value: {
            cooked: cooked,
            raw: raw
        },
        tail: false
    });
};
Parser.prototype.parseTemplateElement = function parseTemplateElement (context, pos) {
    var cooked = this.tokenValue;
    var raw = this.tokenRaw;
    this.expect(context, 262153 /* TemplateTail */);
    return this.finishNode(pos, {
        type: 'TemplateElement',
        value: {
            cooked: cooked,
            raw: raw
        },
        tail: true
    });
};
Parser.prototype.parseTaggedTemplateExpression = function parseTaggedTemplateExpression (context, expr, quasi, pos) {
    return this.finishNode(pos, {
        type: 'TaggedTemplateExpression',
        tag: expr,
        quasi: quasi
    });
};
Parser.prototype.parseTemplate = function parseTemplate (context, pos) {
        var this$1 = this;

    var expressions = [];
    var quasis = [];
    while (this.token === 262152 /* TemplateCont */) {
        if (this$1.token === 15 /* RightBrace */)
            { this$1.error(1 /* UnexpectedToken */, tokenDesc(this$1.token)); }
        var cooked = this$1.tokenValue;
        var raw = this$1.tokenRaw;
        this$1.expect(context, 262152 /* TemplateCont */);
        expressions.push(this$1.parseExpression(context, pos));
        quasis.push(this$1.parseTemplateHead(context, cooked, raw));
    }
    while (this.token === 262153 /* TemplateTail */) {
        quasis.push(this$1.parseTemplateElement(context, pos));
    }
    return this.finishNode(pos, {
        type: 'TemplateLiteral',
        expressions: expressions,
        quasis: quasis
    });
};
Parser.prototype.parseBigIntLiteral = function parseBigIntLiteral (context) {
    var pos = this.getLocations();
    var value = this.tokenValue;
    var raw = this.tokenRaw;
    this.nextToken(context);
    var node = this.finishNode(pos, {
        type: 'Literal',
        value: value,
        bigint: raw
    });
    if (this.flags & 65536 /* OptionsRaw */)
        { node.raw = raw; }
    return node;
};
Parser.prototype.parseLiteral = function parseLiteral (context) {
    var pos = this.getLocations();
    var value = this.tokenValue;
    var raw = this.tokenRaw;
    if (context & 2 /* Strict */ && this.flags & 256 /* Noctal */) {
        this.error(0 /* Unexpected */);
    }
    this.nextToken(context);
    var node = this.finishNode(pos, {
        type: 'Literal',
        value: value
    });
    if (this.flags & 65536 /* OptionsRaw */)
        { node.raw = raw; }
    return node;
};
Parser.prototype.parseTrueOrFalseExpression = function parseTrueOrFalseExpression (context) {
    var pos = this.getLocations();
    var value = this.tokenValue === 'true';
    var raw = this.tokenValue;
    this.nextToken(context);
    var node = this.finishNode(pos, {
        type: 'Literal',
        value: value
    });
    if (this.flags & 65536 /* OptionsRaw */)
        { node.raw = raw; }
    return node;
};
Parser.prototype.parseThisExpression = function parseThisExpression (context) {
    var pos = this.getLocations();
    this.nextToken(context);
    return this.finishNode(pos, {
        type: 'ThisExpression'
    });
};
Parser.prototype.parseNullExpression = function parseNullExpression (context) {
    var pos = this.getLocations();
    this.nextToken(context);
    var node = this.finishNode(pos, {
        type: 'Literal',
        value: null
    });
    if (this.flags & 65536 /* OptionsRaw */)
        { node.raw = 'null'; }
    return node;
};
/**
 * 'Let' is a special in module code, so just to avoid double-checking
 * for the 'let' keyword token, it got it's own method
 *
 * @param context  Context
 */
Parser.prototype.parseLetIdentifier = function parseLetIdentifier (context) {
    var name = this.tokenValue;
    var pos = this.getLocations();
    if (this.flags & (1 /* LineTerminator */ | 2 /* HasUnicode */))
        { this.error(0 /* Unexpected */); }
    if (context & 2 /* Strict */) {
        if (this.isEvalOrArguments(name))
            { this.error(86 /* UnexpectedStrictReserved */); }
        if (context & 1 /* Module */)
            { this.error(96 /* InvalidStrictExpPostion */, tokenDesc(this.token)); }
    }
    this.nextToken(context);
    return this.finishNode(pos, {
        type: 'Identifier',
        name: name
    });
};
Parser.prototype.parseIdentifier = function parseIdentifier (context) {
    var name = this.tokenValue;
    var pos = this.getLocations();
    // if (context & Context.Strict && this.isEvalOrArguments(name)) this.error(Errors.UnexpectedStrictReserved);
    this.nextToken(context);
    return this.finishNode(pos, {
        type: 'Identifier',
        name: name
    });
};
Parser.prototype.parseFunctionBody = function parseFunctionBody (context) {
    var pos = this.getLocations();
    this.expect(context, 393228 /* LeftBrace */);
    var previousLabelSet = this.labelSet;
    this.labelSet = undefined;
    this.flags |= 16 /* InFunctionBody */;
    var body = this.parseStatementList(context, 15 /* RightBrace */);
    this.expect(context, 15 /* RightBrace */);
    this.labelSet = previousLabelSet;
    return this.finishNode(pos, {
        type: 'BlockStatement',
        body: body
    });
};
Parser.prototype.parseComputedPropertyName = function parseComputedPropertyName (context) {
    this.expect(context, 393235 /* LeftBracket */);
    var expression = this.parseAssignmentExpression(context | 16 /* AllowIn */);
    this.expect(context, 20 /* RightBracket */);
    return expression;
};
Parser.prototype.parsePropertyName = function parsePropertyName (context) {
    switch (this.token) {
        case 262147 /* StringLiteral */:
        case 262146 /* NumericLiteral */:
            return this.parseLiteral(context);
        case 393235 /* LeftBracket */:
            return this.parseComputedPropertyName(context);
        default:
            return this.parseIdentifier(context);
    }
};
/****
 * Pattern
 */
Parser.prototype.parseAssignmentPattern = function parseAssignmentPattern (context) {
    var pos = this.getLocations();
    var pattern = this.parseBindingPatternOrIdentifier(context, pos);
    if (!this.parseOptional(context, 1310749 /* Assign */))
        { return pattern; }
    if (context & 131072 /* inParameter */ && context & 64 /* Yield */ && this.token === 282731 /* YieldKeyword */)
        { this.error(0 /* Unexpected */); }
    var right = this.parseAssignmentExpression(context);
    return this.finishNode(pos, {
        type: 'AssignmentPattern',
        left: pattern,
        right: right
    });
};
Parser.prototype.parseBindingPatternOrIdentifier = function parseBindingPatternOrIdentifier (context, pos) {
    switch (this.token) {
        case 393235 /* LeftBracket */:
            return this.parseAssignmentElementList(context);
        case 393228 /* LeftBrace */:
            return this.ObjectAssignmentPattern(context, pos);
        case 262145 /* Identifier */:
            if (context & 131072 /* inParameter */ && context & 2 /* Strict */)
                { this.addFunctionArg(this.tokenValue); }
            return this.parseBindingIdentifier(context);
        case 8671305 /* LetKeyword */:
            if (context & 50331648 /* Lexical */)
                { this.error(57 /* LetInLexicalBinding */); }
        // falls through
        case 282731 /* YieldKeyword */:
            if (context & 64 /* Yield */ && !(context & 8192 /* Method */)) {
                this.error(91 /* DisallowedInContext */, tokenDesc(this.token));
            }
        default:
            if (!this.isIdentifier(context, this.token))
                { this.error(0 /* Unexpected */); }
            return this.parseBindingIdentifier(context);
    }
};
Parser.prototype.parseBindingIdentifier = function parseBindingIdentifier (context) {
    var pos = this.getLocations();
    var name = this.tokenValue;
    var token = this.token;
    if (context & 2 /* Strict */ && this.isEvalOrArguments(name))
        { this.error(37 /* StrictLHSAssignment */); }
    if (context & 32 /* Async */ && token === 4526190 /* AwaitKeyword */)
        { this.error(1 /* UnexpectedToken */, tokenDesc(token)); }
    if (this.flags & 2 /* HasUnicode */ && this.token === 282731 /* YieldKeyword */)
        { this.error(74 /* InvalidEscapedReservedWord */); }
    if (this.token === 262145 /* Identifier */)
        { this.addVarOrBlock(context, name); }
    this.nextToken(context);
    return this.finishNode(pos, {
        type: 'Identifier',
        name: name
    });
};
Parser.prototype.parseAssignmentRestElement = function parseAssignmentRestElement (context) {
    var pos = this.getLocations();
    this.expect(context, 14 /* Ellipsis */);
    var argument = this.parseBindingPatternOrIdentifier(context, pos);
    if (this.token === 1310749 /* Assign */)
        { this.error(27 /* DefaultRestParameter */); }
    return this.finishNode(pos, {
        type: 'RestElement',
        argument: argument
    });
};
Parser.prototype.parseAssignmentElementList = function parseAssignmentElementList (context) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 393235 /* LeftBracket */);
    var elements = [];
    while (this.token !== 20 /* RightBracket */) {
        if (this$1.parseOptional(context, 18 /* Comma */)) {
            elements.push(null);
        }
        else {
            if (this$1.token === 14 /* Ellipsis */) {
                elements.push(this$1.parseAssignmentRestElement(context));
                break;
            }
            elements.push(this$1.parseArrayAssignmentPattern(context | 16 /* AllowIn */));
            if (this$1.token !== 20 /* RightBracket */)
                { this$1.expect(context, 18 /* Comma */); }
        }
    }
    this.expect(context, 20 /* RightBracket */);
    return this.finishNode(pos, {
        type: 'ArrayPattern',
        elements: elements
    });
};
Parser.prototype.parseArrayAssignmentPattern = function parseArrayAssignmentPattern (context) {
    return this.parseAssignmentPattern(context);
};
Parser.prototype.ObjectAssignmentPattern = function ObjectAssignmentPattern (context, pos) {
        var this$1 = this;

    var properties = [];
    this.expect(context, 393228 /* LeftBrace */);
    while (this.token !== 15 /* RightBrace */) {
        if (this$1.token === 14 /* Ellipsis */) {
            if (!(this$1.flags & 131072 /* OptionsNext */))
                { this$1.error(1 /* UnexpectedToken */, tokenDesc(this$1.token)); }
            properties.push(this$1.parseRestProperty(context));
        }
        else {
            properties.push(this$1.parseAssignmentProperty(context));
        }
        if (this$1.token !== 15 /* RightBrace */)
            { this$1.parseOptional(context, 18 /* Comma */); }
    }
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(pos, {
        type: 'ObjectPattern',
        properties: properties
    });
};
Parser.prototype.parseRestProperty = function parseRestProperty (context) {
    var pos = this.getLocations();
    this.expect(context, 14 /* Ellipsis */);
    if (this.token !== 262145 /* Identifier */)
        { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
    var arg = this.parseBindingPatternOrIdentifier(context, pos);
    if (this.token === 1310749 /* Assign */)
        { this.error(23 /* DefaultRestProperty */); }
    return this.finishNode(pos, {
        type: 'RestElement',
        argument: arg
    });
};
Parser.prototype.parseAssignmentProperty = function parseAssignmentProperty (context) {
    var pos = this.getLocations();
    var computed = false;
    var shorthand = false;
    var method = false;
    var key;
    var value;
    if (this.isIdentifier(context, this.token)) {
        pos = this.getLocations();
        var tokenValue = this.tokenValue;
        key = this.parsePropertyName(context);
        var init = this.finishNode(pos, {
            type: 'Identifier',
            name: tokenValue
        });
        if (this.token === 1310749 /* Assign */) {
            shorthand = true;
            this.nextToken(context);
            var expr = this.parseAssignmentExpression(context);
            value = this.finishNode(pos, {
                type: 'AssignmentPattern',
                left: init,
                right: expr
            });
        }
        else if (this.parseOptional(context, 21 /* Colon */)) {
            value = this.parseAssignmentPattern(context);
        }
        else {
            if (context & 131136 /* YieldInParam */)
                { this.addVarName(tokenValue); }
            shorthand = true;
            value = init;
        }
    }
    else {
        computed = this.token === 393235 /* LeftBracket */;
        key = this.parsePropertyName(context);
        this.expect(context, 21 /* Colon */);
        value = this.parseAssignmentPattern(context);
    }
    return this.finishNode(pos, {
        type: 'Property',
        kind: 'init',
        key: key,
        computed: computed,
        value: value,
        method: method,
        shorthand: shorthand
    });
};
/****
 * Scope
 */
// Fast path for catch arguments
Parser.prototype.addCatchArg = function addCatchArg (name, type /* Shadowable */) {
        if ( type === void 0 ) type = 1;

    this.initBlockScope();
    this.blockScope[name] = type;
};
Parser.prototype.initBlockScope = function initBlockScope () {
    if (this.functionScope == null) {
        this.functionScope = Object.create(null);
        this.blockScope = Object.create(this.functionScope);
        this.parentScope = this.blockScope;
    }
    else if (this.blockScope == null) {
        this.blockScope = Object.create(this.parentScope);
        this.parentScope = this.blockScope;
    }
    else {
        return false;
    }
    return true;
};
Parser.prototype.initFunctionScope = function initFunctionScope () {
    if (this.functionScope !== undefined)
        { return false; }
    this.functionScope = Object.create(null);
    this.blockScope = this.functionScope;
    this.parentScope = this.functionScope;
    return true;
};
Parser.prototype.addFunctionArg = function addFunctionArg (name) {
    if (!this.initFunctionScope() && name in this.functionScope)
        { this.error(77 /* DuplicateIdentifier */, name); }
    this.functionScope[name] = 1 /* Shadowable */;
};
Parser.prototype.addVarOrBlock = function addVarOrBlock (context, name) {
    if (context & 50331648 /* Lexical */) {
        this.addBlockName(name);
    }
    else {
        this.addVarName(name);
    }
};
Parser.prototype.addVarName = function addVarName (name) {
    if (!this.initFunctionScope() && this.blockScope !== undefined &&
        this.blockScope[name] === 2 /* NonShadowable */) {
        this.error(77 /* DuplicateIdentifier */, name);
    }
    this.functionScope[name] = 1 /* Shadowable */;
};
Parser.prototype.addBlockName = function addBlockName (name) {
    switch (name) {
        case 'Infinity':
        case 'NaN':
        case 'undefined':
            this.error(77 /* DuplicateIdentifier */, name);
        default: // ignore
    }
    if (!this.initBlockScope() && (
    // Check `var` variables
    this.blockScope[name] === 1 /* Shadowable */ ||
        // Check variables in current block only
        hasOwn.call(this.blockScope, name))) {
        this.error(77 /* DuplicateIdentifier */, name);
    }
    this.blockScope[name] = 2 /* NonShadowable */;
};
Parser.prototype.enterFunctionScope = function enterFunctionScope () {
    var functionScope = this.functionScope;
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    this.functionScope = undefined;
    this.blockScope = undefined;
    this.parentScope = undefined;
    return {
        functionScope: functionScope,
        blockScope: blockScope,
        parentScope: parentScope
    };
};
Parser.prototype.exitFunctionScope = function exitFunctionScope (t) {
    this.functionScope = t.functionScope;
    this.blockScope = t.blockScope;
    this.parentScope = t.parentScope;
};
/** V8 */
Parser.prototype.parseDoExpression = function parseDoExpression (context) {
    var pos = this.getLocations();
    this.expect(context, 12370 /* DoKeyword */);
    var body = this.parseBlockStatement(context);
    return this.finishNode(pos, {
        type: 'DoExpression',
        body: body
    });
};

function parseModule(sourceText, options) {
    if ( options === void 0 ) options = {};

    return new Parser(sourceText, options).parseModule(2 /* Strict */ | 1 /* Module */);
}
function parseScript(sourceText, options) {
    if ( options === void 0 ) options = {};

    return new Parser(sourceText, options).parseScript(0 /* None */);
}

export { parseModule, parseScript };
