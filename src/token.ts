export const enum Token {
    Type = 0xff,

    /* Precedence for binary operators (always positive) */
    PrecStart = 8,
    Precedence = 15 << PrecStart, // 8-11

    /* Attribute names */
    Keyword         = 1 << 12,
    Reserved        = 1 << 13 | Keyword,
    FutureReserved  = 1 << 14 | Keyword,
    Contextual      = 1 << 16 | Keyword,
    BindingPattern  = 1 << 17,
    ExpressionStart = 1 << 18,
    UpdateOperator  = 1 << 19 | ExpressionStart,
    AssignOperator  = 1 << 20 | ExpressionStart,
    BinaryOperator  = 1 << 21,
    UnaryOperator   = 1 << 22 | ExpressionStart,
    VarDeclStart    = 1 << 23 | ExpressionStart,

    /* Node types */
    EndOfSource = 0, // Pseudo

    /* Constants/Bindings */
    Identifier        = 1 | ExpressionStart | BindingPattern,
    NumericLiteral    = 2 | ExpressionStart,
    StringLiteral     = 3 | ExpressionStart,
    RegularExpression = 4 | ExpressionStart,
    FalseKeyword      = 5 | ExpressionStart | Reserved,
    TrueKeyword       = 6 | ExpressionStart | Reserved,
    NullKeyword       = 7 | ExpressionStart | Reserved,

    /* Template nodes */
    TemplateCont = 8 | ExpressionStart,
    TemplateTail = 9 | ExpressionStart,

    /* Punctuators */
    Arrow        = 10, // =>
    LeftParen    = 11 | ExpressionStart , // (
    LeftBrace    = 12 | ExpressionStart | BindingPattern, // {
    Period       = 13, // .
    Ellipsis     = 14, // ...
    RightBrace   = 15, // }
    RightParen   = 16, // )
    Semicolon    = 17, // ;
    Comma        = 18, // ,
    LeftBracket  = 19 | ExpressionStart | BindingPattern, // [
    RightBracket = 20, // ]
    Colon        = 21, // :
    QuestionMark = 22, // ?
    SingleQuote  = 23, // '
    DoubleQuote  = 24, // "
    JSXClose     = 25, // </
    JSXAutoClose = 26, // />

    /* Update operators */
    Increment = 27 | UpdateOperator, // ++
    Decrement = 28 | UpdateOperator, // --

    /* Assign operators */
    Assign                  = 29 | AssignOperator, // =
    ShiftLeftAssign         = 30 | AssignOperator, // <<=
    ShiftRightAssign        = 31 | AssignOperator, // >>=
    LogicalShiftRightAssign = 32 | AssignOperator, // >>>=
    ExponentiateAssign      = 33 | AssignOperator, // **=
    AddAssign               = 34 | AssignOperator, // +=
    SubtractAssign          = 35 | AssignOperator, // -=
    MultiplyAssign          = 36 | AssignOperator, // *=
    DivideAssign            = 37 | AssignOperator, // /=
    ModuloAssign            = 38 | AssignOperator, // %=
    BitwiseXorAssign        = 39 | AssignOperator, // ^=
    BitwiseOrAssign         = 40 | AssignOperator, // |=
    BitwiseAndAssign        = 41 | AssignOperator, // &=

    /* Unary/binary operators */
    TypeofKeyword      = 42 | UnaryOperator | Reserved,
    DeleteKeyword      = 43 | UnaryOperator | Reserved,
    VoidKeyword        = 44 | UnaryOperator | Reserved,
    Negate             = 45 | UnaryOperator, // !
    Complement         = 46 | UnaryOperator, // ~
    Add                = 47 | UnaryOperator   | BinaryOperator | 9 << PrecStart, // +
    Subtract           = 48 | UnaryOperator   | BinaryOperator | 9 << PrecStart, // -
    InKeyword          = 49 | BinaryOperator  | 7 << PrecStart | Reserved,
    InstanceofKeyword  = 50 | BinaryOperator  | 7 << PrecStart | Reserved,
    Multiply           = 51 | BinaryOperator  | 10 << PrecStart, // *
    Modulo             = 52 | BinaryOperator  | 10 << PrecStart, // %
    Divide             = 53 | ExpressionStart | BinaryOperator | 10 << PrecStart, // /
    Exponentiate       = 54 | BinaryOperator  | 11 << PrecStart, // **
    LogicalAnd         = 55 | BinaryOperator  | 2 << PrecStart, // &&
    LogicalOr          = 56 | BinaryOperator  | 1 << PrecStart, // ||
    StrictEqual        = 57 | BinaryOperator  | 6 << PrecStart, // ===
    StrictNotEqual     = 58 | BinaryOperator  | 6 << PrecStart, // !==
    LooseEqual         = 59 | BinaryOperator  | 6 << PrecStart, // ==
    LooseNotEqual      = 60 | BinaryOperator  | 6 << PrecStart, // !=
    LessThanOrEqual    = 61 | BinaryOperator  | 7 << PrecStart, // <=
    GreaterThanOrEqual = 62 | BinaryOperator  | 7 << PrecStart, // >=
    LessThan           = 63 | BinaryOperator  | ExpressionStart | 7 << PrecStart, // <
    GreaterThan        = 64 | BinaryOperator  | 7 << PrecStart, // >
    ShiftLeft          = 65 | BinaryOperator  | 8 << PrecStart, // <<
    ShiftRight         = 66 | BinaryOperator  | 8 << PrecStart, // >>
    LogicalShiftRight  = 67 | BinaryOperator  | 8 << PrecStart, // >>>
    BitwiseAnd         = 68 | BinaryOperator  | 5 << PrecStart, // &
    BitwiseOr          = 69 | BinaryOperator  | 3 << PrecStart, // |
    BitwiseXor         = 70 | BinaryOperator  | 4 << PrecStart, // ^

    /* Variable declaration kinds */
    VarKeyword   = 71 | VarDeclStart | Reserved,
    LetKeyword   = 72 | VarDeclStart | FutureReserved,
    ConstKeyword = 73 | VarDeclStart | Reserved,

    /* Other reserved words */
    BreakKeyword    = 74 | Reserved,
    CaseKeyword     = 75 | Reserved,
    CatchKeyword    = 76 | Reserved,
    ClassKeyword    = 77 | Reserved | ExpressionStart,
    ContinueKeyword = 78 | Reserved,
    DebuggerKeyword = 79 | Reserved,
    DefaultKeyword  = 80 | Reserved,
    DoKeyword       = 81 | Reserved,
    ElseKeyword     = 82 | Reserved,
    ExportKeyword   = 83 | Reserved,
    ExtendsKeyword  = 84 | Reserved,
    FinallyKeyword  = 85 | Reserved,
    ForKeyword      = 86 | Reserved,
    FunctionKeyword = 87 | Reserved | ExpressionStart,
    IfKeyword       = 88 | Reserved,
    ImportKeyword   = 89 | Reserved | ExpressionStart,
    NewKeyword      = 90 | Reserved | ExpressionStart,
    ReturnKeyword   = 91 | Reserved,
    SuperKeyword    = 92 | Reserved | ExpressionStart,
    SwitchKeyword   = 93 | Reserved | ExpressionStart,
    ThisKeyword     = 94 | Reserved | ExpressionStart,
    ThrowKeyword    = 95 | Reserved,
    TryKeyword      = 96 | Reserved,
    WhileKeyword    = 97 | Reserved,
    WithKeyword     = 98 | Reserved,

    /* Strict mode reserved words */
    ImplementsKeyword = 99 | FutureReserved,
    InterfaceKeyword  = 100 | FutureReserved,
    PackageKeyword    = 101 | FutureReserved,
    PrivateKeyword    = 102 | FutureReserved,
    ProtectedKeyword  = 103 | FutureReserved,
    PublicKeyword     = 104 | FutureReserved,
    StaticKeyword     = 105 | FutureReserved,
    YieldKeyword      = 106 | FutureReserved | ExpressionStart,

    /* Contextual keywords */
    AsKeyword          = 107 | Contextual,
    AsyncKeyword       = 108 | Contextual,
    AwaitKeyword       = 109 | Contextual | ExpressionStart,
    ConstructorKeyword = 110 | Contextual,
    GetKeyword         = 111 | Contextual,
    SetKeyword         = 112 | Contextual,
    FromKeyword        = 113 | Contextual,
    OfKeyword          = 114 | Contextual,

    EnumKeyword        = 115 | Reserved
}

const KeywordDescTable = [
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
    '||', '===', '!==', '==', '!=', '<=', '>=', '<', '>', '<<', '>>', '>>>', '&', '|', '^',

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
export function tokenDesc(token: Token): string {
        return KeywordDescTable[token & Token.Type];
}

// Used `Object.create(null)` to avoid potential `Object.prototype`
// interference.
const DescKeywordTable: {[key: string]: Token} = Object.create(null, {
    as: {value: Token.AsKeyword},
    async: {value: Token.AsyncKeyword},
    await: {value: Token.AwaitKeyword},
    break: {value: Token.BreakKeyword},
    case: {value: Token.CaseKeyword},
    catch: {value: Token.CatchKeyword},
    class: {value: Token.ClassKeyword},
    const: {value: Token.ConstKeyword},
    constructor: {value: Token.ConstructorKeyword},
    continue: {value: Token.ContinueKeyword},
    debugger: {value: Token.DebuggerKeyword},
    default: {value: Token.DefaultKeyword},
    delete: {value: Token.DeleteKeyword},
    do: {value: Token.DoKeyword},
    enum: {value: Token.EnumKeyword},
    else: {value: Token.ElseKeyword},
    export: {value: Token.ExportKeyword},
    extends: {value: Token.ExtendsKeyword},
    false: {value: Token.FalseKeyword},
    finally: {value: Token.FinallyKeyword},
    for: {value: Token.ForKeyword},
    from: {value: Token.FromKeyword},
    function: {value: Token.FunctionKeyword},
    get: {value: Token.GetKeyword},
    if: {value: Token.IfKeyword},
    implements: {value: Token.ImplementsKeyword},
    import: {value: Token.ImportKeyword},
    in: {value: Token.InKeyword},
    instanceof: {value: Token.InstanceofKeyword},
    interface: {value: Token.InterfaceKeyword},
    let: {value: Token.LetKeyword},
    new: {value: Token.NewKeyword},
    null: {value: Token.NullKeyword},
    of: {value: Token.OfKeyword},
    package: {value: Token.PackageKeyword},
    private: {value: Token.PrivateKeyword},
    protected: {value: Token.ProtectedKeyword},
    public: {value: Token.PublicKeyword},
    return: {value: Token.ReturnKeyword},
    set: {value: Token.SetKeyword},
    static: {value: Token.StaticKeyword},
    super: {value: Token.SuperKeyword},
    switch: {value: Token.SwitchKeyword},
    this: {value: Token.ThisKeyword},
    throw: {value: Token.ThrowKeyword},
    true: {value: Token.TrueKeyword},
    try: {value: Token.TryKeyword},
    typeof: {value: Token.TypeofKeyword},
    var: {value: Token.VarKeyword},
    void: {value: Token.VoidKeyword},
    while: {value: Token.WhileKeyword},
    with: {value: Token.WithKeyword},
    yield: {value: Token.YieldKeyword},
});

export function descKeyword(value: string): Token {
    return (DescKeywordTable[value] | 0) as Token;
}