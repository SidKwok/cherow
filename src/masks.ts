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
    NonSimpleParameter     = 1 << 8,
    OptionalIdentifier    = 1 << 9,
    NewExpression         = 1 << 10,
    AnnexB                = 1 << 11,
    Statement             = 1 << 12,
    Method                = 1 << 13,
    Constructor           = 1 << 14,
    Import                = 1 << 15,
    Export                = 1 << 16,
    inParameter           = 1 << 17,
    ArrowParameterList    = 1 << 18,
    IfClause              = 1 << 19,
    HasConstructor        = 1 << 20,
    DisallowFor           = 1 << 21,
    ParentHasYield        = 1 << 22,
    ArrowBody             = 1 << 23,   // If node was parsed in a arrow body context with concise body
    AsyncFunctionBody      = 1 << 24,

    /* Variable declaration */
    Const                  = 1 << 25,
    Let                    = 1 << 26,
    Var                    = 1 << 27,


     // An Lexical declaration can be either 'const¨' or 'let
    Lexical = Let | Const,

    YieldInParam = inParameter | Yield
}

export const enum Flags {
    None                         = 0,
    LineTerminator               = 1 << 0,
    HasUnicode                   = 1 << 1,
    HasNonSimpleParameter        = 1 << 2,
    HasPrototype                 = 1 << 3,
    InFunctionBody               = 1 << 4,
    Continue                     = 1 << 5,
    Switch                       = 1 << 6,
    Break                        = 1 << 7,

    /* Numeric */
    Noctal                       = 1 << 8, // e.g. `0777`
    BigInt                       = 1 << 9, // e.g. `100n`
    Float                        = 1 << 10, // e.g. `09.01`
    Exponent                     = 1 << 11, // e.g. `10e2`

    /* Options */
    OptionsRanges                = 1 << 12,
    OptionsLoc                   = 1 << 13,
    OptionsSource                = 1 << 14,
    OptionsJSX                   = 1 << 15,
    OptionsRaw                   = 1 << 16,
    OptionsNext                  = 1 << 17,
    OptionsOnComment             = 1 << 18,
    OptionsOnToken               = 1 << 19,
    OptionsV8                    = 1 << 20,

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