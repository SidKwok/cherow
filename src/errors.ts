export const enum Errors {
    Unexpected,
    UnexpectedToken,
    UnterminatedComment,
    UnterminatedString,
    UnterminatedRegExp,
    UnicodeOutOfRange,
    InvalidUnicodeEscapeSequence,
    StrictOctalEscape,
    InvalidEightAndNine,
    StrictOctalLiteral,
    MissingShebangExclamation,
    DuplicateRegExpFlag,
    UnexpectedTokenRegExp,
    UnexpectedTokenRegExpFlag,
    BadImportCallArity,
    StrictFunction,
    BadContinue,
    IllegalBreak,
    MultipleDefaultsInSwitch,
    IllegalReturn,
    NoCatchOrFinally,
    LineBreakAfterThrow,
    StrictModeWith,
    DefaultRestProperty,
    BadGetterArity,
    BadSetterArity,
    BadSetterRestParameter,
    DefaultRestParameter,
    IllegalUseStrict,
    ParameterAfterRestParameter,
    StrictFunctionName,
    UnexpectedNewTarget,
    MetaNotInFunctionBody,
    DeclarationMissingInitializer,
    InvalidVarInitForOf,
    InvalidLHSInForLoop,
    InvalidLHSInForIn,
    StrictLHSAssignment,
    InvalidLHSInAssignment,
    UnexpectedArrow,
    MissingAsImportSpecifier,
    NoAsAfterImportNamespace,
    InvalidModuleSpecifier,
    NonEmptyJSXExpression,
    ExpectedJSXClosingTag,
    AdjacentJSXElements,
    InvalidBinaryDigit,
    InvalidOctalDigit,
    StrictDelete,
    StrictLHSPrefix,
    StrictLHSPostfix,
    StrictFormalParameter,
    ExportDeclAtTopLevel,
    ImportDeclAtTopLevel,
    MissingMsgDeclarationAfterExport,
    MissingMsgDeclarationAfterImport,
    ForAwaitNotOf,
    LetInLexicalBinding,
    InvalidStartOfExpression,
    UnexpectedComma,
    DuplicateProtoProperty,
    StrictParamDupe,
    InvalidHexEscapeSequence,
    ConstructorSpecialMethod,
    BadSuperCall,
    DuplicateConstructor,
    StaticPrototype,
    ConstructorIsAsync,
    MissingClassName,
    ClassDeclarationNoName,
    FunctionDeclarationNoName,
    UnexpectedRest,
    UnexpectedRestElement,
    LineBreakAfterAsync,
    InvalidEscapedReservedWord,
    MissingArrowAfterParentheses,
    InvalidParenthesizedPattern,
    DuplicateIdentifier,
    DuplicateBinding,
    Redeclaration,
    UnknownLabel,
    InvalidLHSInArrow,
    InvalidNewTargetContext,
    UnexpectedReservedWord,
    InvalidShorthandProperty,
    UnterminatedTemplate,
    UnexpectedStrictReserved,
    YieldReservedWord,
    YieldInParameter,
    GeneratorParameter,
    StrictParamName,
    DisallowedInContext,
    IllegalArrowInParamList,
    UnexpectedBigIntLiteral,
    UnNamedClassStmt,
    UnNamedFunctionStmt,
    InvalidStrictExpPostion,
    InvalidStrictLexical,
    MissingInitializer,
    InvalidLabeledForOf,
    InvalidVarDeclInForIn,
    InvalidRestOperatorArg,
    InvalidNoctalInteger,
    InvalidRadix,
    UnexpectedTokenNumber,
    UnexpectedMantissa,
    UnexpectedSurrogate,
    ForbiddenAsStatement,
    InvalidAsyncGenerator,
    BadPropertyId,
    InvalidMethod
}

export const ErrorMessages: {
    [key: string]: string
} = {
    [Errors.Unexpected]: 'Unexpected token',
    [Errors.UnexpectedToken]: 'Unexpected token \'%0\'',
    [Errors.UnterminatedComment]: 'Unterminated comment',
    [Errors.UnterminatedString]: 'Unterminated string literal',
    [Errors.UnterminatedRegExp]: 'Unterminated regular expression literal',
    [Errors.UnicodeOutOfRange]: 'Unicode escape code point out of range',
    [Errors.InvalidUnicodeEscapeSequence]: 'Invalid Unicode escape sequence',
    [Errors.StrictOctalEscape]: 'Octal escapes are not allowed in strict mode',
    [Errors.InvalidEightAndNine]: 'Escapes \\8 or \\9 are not syntactically valid escapes',
    [Errors.StrictOctalLiteral]: 'Octal literals are not allowed in strict mode',
    [Errors.MissingShebangExclamation]: 'Missing exclamation in shebang',
    [Errors.DuplicateRegExpFlag]: 'Duplicate flags supplied to RegExp constructor %0',
    [Errors.UnexpectedTokenRegExp]: 'Unexpected regular expression',
    [Errors.UnexpectedTokenRegExpFlag]: 'Unexpected regular expression flag',
    [Errors.BadImportCallArity]: 'Dynamic import must have one specifier as an argument',
    [Errors.StrictFunction]: 'In strict mode code, functions can only be declared at top level or inside a block',
    [Errors.BadContinue]: 'Continue must be inside loop or switch statement',
    [Errors.IllegalBreak]: 'Unlabeled break must be inside loop or switch',
    [Errors.IllegalReturn]: 'Illegal return statement',
    [Errors.MultipleDefaultsInSwitch]: 'More than one default clause in switch statement',
    [Errors.NoCatchOrFinally]: 'Missing catch or finally after try',
    [Errors.LineBreakAfterThrow]: 'No line break is allowed between \'throw\' and its expression',
    [Errors.StrictModeWith]: 'Strict mode code may not include a with statement',
    [Errors.DefaultRestProperty]: 'Unexpected token =',
    [Errors.BadGetterArity]: 'Getter must not have any formal parameters',
    [Errors.BadSetterArity]: 'Setter must have exactly one formal parameter',
    [Errors.BadSetterRestParameter]: 'Setter function argument must not be a rest parameter',
    [Errors.DefaultRestParameter]: 'Unexpected token =',
    [Errors.IllegalUseStrict]: 'Illegal \'use strict\' directive in function with non-simple parameter list',
    [Errors.ParameterAfterRestParameter]: 'Rest parameter must be last formal parameter',
    [Errors.UnexpectedRestElement]: 'Unexpected Rest element',
    [Errors.StrictFunctionName]: 'Function name may not be eval or arguments in strict mode code',
    [Errors.UnexpectedNewTarget]: 'new.target only allowed within functions',
    [Errors.MetaNotInFunctionBody]: 'new.target only allowed within functions',
    [Errors.DeclarationMissingInitializer]: 'Missing = in %0 declaration',
    [Errors.InvalidLHSInForLoop]: 'Invalid left-hand side in for-loop',
    [Errors.InvalidVarInitForOf]: 'Invalid variable declaration in for-of statement',
    [Errors.InvalidLHSInForIn]: 'Invalid left-hand side in for-in',
    [Errors.StrictLHSAssignment]: 'Eval or arguments can\'t be assigned to in strict mode code',
    [Errors.InvalidLHSInAssignment]: 'Invalid left-hand side in assignment',
    [Errors.UnexpectedArrow]: 'No line break is allowed before \'=>\'',
    [Errors.MissingArrowAfterParentheses]: 'Missing => after parentheses',
    [Errors.UnexpectedRest]: 'Unexpected token ...',
    [Errors.MissingAsImportSpecifier]: 'Missing \'as\' keyword in import namespace specifier',
    [Errors.NoAsAfterImportNamespace]: 'Missing \'as\' keyword after import namespace',
    [Errors.InvalidModuleSpecifier]: 'Invalid module specifier',
    [Errors.NonEmptyJSXExpression]: 'JSX attributes must only be assigned a non-empty  \'expression\'',
    [Errors.ExpectedJSXClosingTag]: 'Expected corresponding JSX closing tag for %0',
    [Errors.AdjacentJSXElements]: 'Adjacent JSX elements must be wrapped in an enclosing tag',
    [Errors.InvalidBinaryDigit]: 'Invalid binary digit',
    [Errors.InvalidOctalDigit]: 'Invalid octal digit',
    [Errors.StrictDelete]: 'Delete of an unqualified identifier in strict mode.',
    [Errors.StrictLHSPrefix]: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
    [Errors.StrictLHSPostfix]: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
    [Errors.ExportDeclAtTopLevel]: 'Export declarations may only appear at top level of a module',
    [Errors.ImportDeclAtTopLevel]: 'Import declarations may only appear at top level of a module',
    [Errors.MissingMsgDeclarationAfterExport]: 'Missing declaration after \'export\' keyword',
    [Errors.MissingMsgDeclarationAfterImport]: 'Missing declaration after \'import\' keyword',
    [Errors.ForAwaitNotOf]: 'For await loop should be used with \'of\'',
    [Errors.LetInLexicalBinding]: 'let is disallowed as a lexically bound name',
    [Errors.InvalidStartOfExpression]: 'Invalid start of an expression',
    [Errors.UnexpectedComma]: 'Unexpected token ,',
    [Errors.DuplicateProtoProperty]: 'Property name __proto__ appears more than once in object literal',
    [Errors.StrictParamDupe]: 'Duplicate argument names not allowed in this context',
    [Errors.InvalidHexEscapeSequence]: 'Invalid hexadecimal escape sequence',
    [Errors.ConstructorSpecialMethod]: 'Class constructor may not be an accessor',
    [Errors.BadSuperCall]: 'super() is only valid in derived class constructors',
    [Errors.DuplicateConstructor]: 'A class may only have one constructor',
    [Errors.ConstructorIsAsync]: 'Class constructor may not be an async method',
    [Errors.StaticPrototype]: 'Classes may not have static property named prototype',
    [Errors.ClassDeclarationNoName]: 'Class declaration must have a name in this context',
    [Errors.FunctionDeclarationNoName]: 'Function declaration must have a name in this context',
    [Errors.LineBreakAfterAsync]: 'No line break is allowed after async',
    [Errors.InvalidEscapedReservedWord]: 'Keyword must not contain escaped characters',
    [Errors.InvalidParenthesizedPattern]: 'Invalid parenthesized pattern',
    [Errors.DuplicateIdentifier]: '\'%0\' has already been declared ',
    [Errors.DuplicateBinding]: 'Duplicate binding',
    [Errors.Redeclaration]: 'Label \'%0\' has already been declared',
    [Errors.UnknownLabel]: 'Undefined label \'%0\'',

    [Errors.InvalidLHSInArrow]: ' Invalid left-hand side in arrow function parameters',
    [Errors.InvalidNewTargetContext]: 'new.target expression is not allowed here',
    [Errors.UnexpectedReservedWord]: 'Unexpected reserved word',
    [Errors.InvalidShorthandProperty]: '\'%0\' can not be used as shorthand property',

    [Errors.UnterminatedTemplate]: 'Unterminated template literal',

    [Errors.UnexpectedStrictReserved]: 'Unexpected strict mode reserved word',
    [Errors.YieldReservedWord]: 'yield is a reserved word inside generator functions',
    [Errors.YieldInParameter]: 'Yield expression not allowed in formal parameter',
    [Errors.GeneratorParameter]: 'Generator parameters must not contain yield expressions',
    [Errors.StrictParamName]: 'The identifier \'eval\' or \'arguments\' must not be in binding position in strict mode',
    [Errors.DisallowedInContext]: '\'%0\' may not be used as an identifier in this context',
    [Errors.IllegalArrowInParamList]: 'Illegal arrow function parameter list',
    [Errors.UnexpectedBigIntLiteral]: 'Unexpected BigInt literal',
    [Errors.UnNamedClassStmt]: 'Class statement requires a name',
    [Errors.UnNamedFunctionStmt]: 'Function statement requires a name',
    [Errors.InvalidStrictExpPostion]: 'The identifier \'%0\' must not be in expression position in strict mode',
    [Errors.InvalidStrictLexical]: 'Lexical declarations must not have a binding named "let"',
    [Errors.MissingInitializer]: 'Missing initializer',
    [Errors.InvalidLabeledForOf]: 'The body of a for-of statement must not be a labeled function declaration',
    [Errors.InvalidVarDeclInForIn]: 'Invalid variable declaration in for-in statement',
    [Errors.InvalidNoctalInteger]: 'Unexpected noctal integer literal',
    [Errors.InvalidRadix]: 'Expected number in radix',
    [Errors.UnexpectedTokenNumber]: 'Unexpected number',
    [Errors.UnexpectedMantissa]: 'Unexpected mantissa',
    [Errors.UnexpectedSurrogate]: 'Unexpected surrogate pair',
    [Errors.ForbiddenAsStatement]: '%0 can\'t appear in single-statement context',
    [Errors.InvalidAsyncGenerator]: 'Generator function or method can\'t be async',
    [Errors.BadPropertyId]: 'Invalid property id',
    [Errors.InvalidMethod]: 'Only methods are allowed in classes',
};

function constructError(msg: string, column: number): Error {
    let error: Error = new Error(msg);
    try {
        throw error;
    } catch (base) {
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
export function createError(type: Errors, loc: any, ...params: string[]): Error {
    const description = ErrorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
    const error: any = constructError('Line ' + loc.line + ': ' + description, loc.column);
    error.index = loc.index;
    error.lineNumber = loc.line;
    error.description = description;
    return error;
}