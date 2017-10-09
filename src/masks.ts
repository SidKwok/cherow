export const enum Context {
    None                   = 0,
    Module                 = 1 << 0,
    Strict                 = 1 << 1,
    AllowIn                = 1 << 2,
    SimpleArrow            = 1 << 3,
    Yield                  = 1 << 4,
    Await                  = 1 << 5,
    AllowCall              = 1 << 6,
    InParenthesis          = 1 << 7,
    inParameter            = 1 << 8,
    ArrowParameterList     = 1 << 9,
    Statement              = 1 << 10,
    Assignment             = 1 << 11,
    SimpleParameterList    = 1 << 12,
    Let                    = 1 << 13,
    Const                  = 1 << 14,

    Lexical = Let | Const,
}

export const enum Flags {
    None                         = 0,
    LineTerminator               = 1 << 0,
    HasUnicode                   = 1 << 1,
    AllowAwait                   = 1 << 2,
    AllowYield                   = 1 << 3,
    DisallowCall                 = 1 << 4,

    /* Numeric */
    Noctal                       = 1 << 5, // e.g. `0777`
    BigInt                       = 1 << 6, // e.g. `100n`
    Float                        = 1 << 7, // e.g. `09.01`
    Exponent                     = 1 << 8, // e.g. `10e2`

    /* Options */
    OptionsRanges                = 1 << 9,
    OptionsLoc                   = 1 << 10,
    OptionsSource                = 1 << 11,
    OptionsJSX                   = 1 << 12,
    OptionsRaw                   = 1 << 13,
    OptionsNext                  = 1 << 14,
    OptionsOnComment             = 1 << 15,
    OptionsOnToken               = 1 << 16,
    OptionsV8                    = 1 << 17,
    InFunctionBody               = 1 << 18,

    // BigInt implementation can't handle either float or exponent acc. TC-39
    FloatOrExponent = Float | Exponent
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