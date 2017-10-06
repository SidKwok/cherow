export const enum Context {
    None                   = 0,
    Module                 = 1 << 0,
    Strict                 = 1 << 1,
    Assignment             = 1 << 2,
    Pattern                = 1 << 3,
    AllowIn                = 1 << 4,
    Async                  = 1 << 5,
    Yield                  = 1 << 6,
    AllowCall              = 1 << 7,
    Declaration            = 1 << 8,
    NonSimpleParameter     = 1 << 9,
    OptionalIdentifier    = 1 << 10,
    NewExpression         = 1 << 11,
    AnnexB                = 1 << 12,
    Statement             = 1 << 13,
    Method                = 1 << 14,
    Constructor           = 1 << 15,
    Import                = 1 << 16,
    Export                = 1 << 17,
    inParameter           = 1 << 18,
    ArrowParameterList    = 1 << 19,

    /* Variable declaration */
    Const                  = 1 << 20,
    Let                    = 1 << 21,
    Var                    = 1 << 22,

     // An Lexical declaration can be either 'const¨' or 'let
    Lexical = Let | Const,
}

export const enum Flags {
    None                         = 0,
    LineTerminator               = 1 << 0,
    HasUnicode                   = 1 << 1,
    HasNonSimpleParameter        = 1 << 2,
    HasPrototype                 = 1 << 3,
    InFunctionBody               = 1 << 4,
    ArgumentList                 = 1 << 5,

    /* Numeric */
    Noctal                       = 1 << 4, // e.g. `0777`
    BigInt                       = 1 << 5, // e.g. `100n`
    Float                        = 1 << 6, // e.g. `09.01`
    Exponent                     = 1 << 7, // e.g. `10e2`

    /* Options */
    OptionsRanges                = 1 << 8,
    OptionsLoc                   = 1 << 9,
    OptionsSource                = 1 << 10,
    OptionsJSX                   = 1 << 11,
    OptionsRaw                   = 1 << 12,
    OptionsNext                  = 1 << 13,
    OptionsOnComment             = 1 << 14,
    OptionsOnToken               = 1 << 15,
    OptionsV8                    = 1 << 16,

    // BigInt implementation can't handle either float or exponent acc. TC-39
    FloatOrExponent = Float | Exponent
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