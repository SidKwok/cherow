export const enum Context {
    None                   = 0,
    Module                 = 1 << 0,
    Strict                 = 1 << 1,
    AllowIn                = 1 << 2,
    SimpleArrow            = 1 << 3,
    Yield                  = 1 << 4,
    Await                  = 1 << 5,
    InParenthesis          = 1 << 6,
    InParameter            = 1 << 7,
    ArrowParameterList     = 1 << 8,
    Statement              = 1 << 9,
    SimpleParameterList    = 1 << 10,
    DisallowFor            = 1 << 11,
    IfClause               = 1 << 12,
    AnnexB                 = 1 << 13,
    Export                 = 1 << 14,
    OptionalIdentifier     = 1 << 15,
    DisallowCall           = 1 << 16,
    Method                 = 1 << 17,
    HasConstructor         = 1 << 18,
    Constructor            = 1 << 19,
    AsyncFunctionBody      = 1 << 20,
    Let                    = 1 << 21,
    Const                  = 1 << 22,

    Lexical = Let | Const,
}

export const enum Flags {
    None                         = 0,
    LineTerminator               = 1 << 0,
    HasUnicode                   = 1 << 1,
    InFunctionBody               = 1 << 2,
    AllowCall                    = 1 << 3,

    Break                        = 1 << 4,
    Continue                     = 1 << 5,
    Switch                       = 1 << 6,
    HasPrototype                 = 1 << 7,
    FirstRestricted              = 1 << 8,

    /* Numeric */
    Noctal                       = 1 << 9, // e.g. `0777`
    BigInt                       = 1 << 10, // e.g. `100n`
    Float                        = 1 << 11, // e.g. `09.01`
    Exponent                     = 1 << 12, // e.g. `10e2`

    /* Options */
    OptionsRanges                = 1 << 13,
    OptionsLoc                   = 1 << 14,
    OptionsSource                = 1 << 15,
    OptionsJSX                   = 1 << 16,
    OptionsRaw                   = 1 << 17,
    OptionsNext                  = 1 << 18,
    OptionsDirectives            = 1 << 19,
    OptionsOnComment             = 1 << 20,
    OptionsOnToken               = 1 << 21,
    OptionsV8                    = 1 << 22,

    // BigInt implementation can't handle either float or exponent acc. TC-39
    FloatOrExponent = Float | Exponent
}

export const enum ParenthesizedState {
    None            = 0,
    EvalOrArg       = 1 << 0, // If (async) arrow contains eval or agruments
    Yield           = 1 << 1, // If (async) arrow contains eval or agruments
    Await           = 1 << 2, // If async arrow contains 'await'
    Parenthesized   = 1 << 3, // Tracks invalid parenthesized pattern
}

export const enum AsyncState {
    None,
    Function,
    Identifier
}

export const enum ObjectState {
    None            = 0,
    Yield           = 1 << 0,
    Async           = 1 << 1,
    Getter          = 1 << 2,
    Setter          = 1 << 3,
    Computed        = 1 << 4,
    Shorthand       = 1 << 5,
    Get             = 1 << 6,
    Set             = 1 << 7,
    Method          = 1 << 8,
    HasConstructor  = 1 << 9,
    Heritage        = 1 << 10,
    Static          = 1 << 11,
    Special         = 1 << 12,
    Constructor     = 1 << 13,
    Accessors = Get | Set,
    Modifiers = Accessors | Method | Yield
}

export const enum ScannerState {
    None = 0,
    LastIsCR        = 1 << 0,
    LineTerminator  = 1 << 1,
    MultiLine       = 1 << 2,
    SingleLine      = 1 << 3,
    Closed          = 1 << 4,

    // Collectable comments - single and multiline
    Collectable = SingleLine | MultiLine
}

// Regular expression scanning
export const enum RegExpState {
    Empty = 0,
    Escape = 0x1,
    Class = 0x2,
}

// Spidermonkey values
export const enum RegExpFlag {
    None = 0x00,
    Global = 0x01,
    Unicode = 0x02,
    Sticky = 0x04,
    Multiline = 0x08,
    IgnoreCase = 0x10,
    DotAll = 0x20,
}

export const enum ScopeMasks {
    Shadowable = 0x1,
    NonShadowable = 0x2,
}