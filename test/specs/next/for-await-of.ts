import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Next - For await of', () => {

    it("should fail if `yield` appears within the destructuring assignment target", () => {
        expect(() => {
            parseScript(`async function fn() { for await ([[x[yield]]] of [[[]]]) }`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if `yield` appears within the Initializer of an AssignmentElement outside of a generator function body", () => {
        expect(() => {
            parseScript(`async function fn() { for await ([ x = yield ] of [[]]) }`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if `yield` appears within the Initializer of an AssignmentElement outside of a generator function body", () => {
        expect(() => {
            parseScript(`"use strict"; async function fn() { for await ([[x[yield]]] of [[[]]]) }`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail on invalid left hand side", () => {
        expect(() => {
            parseScript(`async function fn() { for await ([{ get x() {} }] of [[{}]]) }`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail if `yield` appears within the Initializer of a nested destructuring assignment outside of a generator function body", () => {
        expect(() => {
            parseScript(`async function fn() { for await ([{ x = yield }] of [[{}]]) }`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail on reset element (nested object pattern) with initializer ", () => {
        expect(() => {
            parseScript(`async function *fn() { for await (let [...{ x } = []] of foo) {} }`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail on reset element (identifier) with initializer ", () => {
        expect(() => {
            parseScript(`async function *fn() { for await (let [...x = []] of foo) {} }`, {
                next: true
            })
        }).to.throw();
    });

    it("should fail on reset element (nested array pattern) with initializer ", () => {
        expect(() => {
            parseScript(`async function *fn() { for await (let [...[ x ] = []] of foo) {} }`, {
                next: true
            })
        }).to.throw();
    });

    it('should parse statement in an async function declaration', () => {
        expect(parseScript(`async function fn() {
            for await ([ x = 'x' in {} ] of [[]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 72,
                                    "end": 87
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "AssignmentPattern",
                                            "left": {
                                                "type": "Identifier",
                                                "name": "x",
                                                "start": 47,
                                                "end": 48
                                            },
                                            "right": {
                                                "type": "BinaryExpression",
                                                "left": {
                                                    "type": "Literal",
                                                    "value": "x",
                                                    "start": 51,
                                                    "end": 54,
                                                    "raw": "'x'"
                                                },
                                                "right": {
                                                    "type": "ObjectExpression",
                                                    "properties": [],
                                                    "start": 58,
                                                    "end": 60
                                                },
                                                "operator": "in",
                                                "start": 51,
                                                "end": 60
                                            },
                                            "start": 47,
                                            "end": 60
                                        }
                                    ],
                                    "start": 45,
                                    "end": 62
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [],
                                            "start": 67,
                                            "end": 69
                                        }
                                    ],
                                    "start": 66,
                                    "end": 70
                                },
                                "await": true,
                                "start": 34,
                                "end": 87
                            }
                        ],
                        "start": 20,
                        "end": 99
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 99
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 99
        });
    });

    
    it('should parse array elem nested obj undefined hole', () => {
        expect(parseScript(`async function fn() {
            for await ([{ x }] of [[ , ]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 65,
                                    "end": 80
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "ObjectPattern",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "computed": false,
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 48,
                                                        "end": 49
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 48,
                                                        "end": 49
                                                    },
                                                    "start": 48,
                                                    "end": 49
                                                }
                                            ],
                                            "start": 46,
                                            "end": 51
                                        }
                                    ],
                                    "start": 45,
                                    "end": 52
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                null
                                            ],
                                            "start": 57,
                                            "end": 62
                                        }
                                    ],
                                    "start": 56,
                                    "end": 63
                                },
                                "await": true,
                                "start": 34,
                                "end": 80
                            }
                        ],
                        "start": 20,
                        "end": 92
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 92
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 92
        });
    });

    it('should parse func decl dstr array elem nested obj', () => {
        expect(parseScript(`async function fn() {
            for await ([{ x }] of [[{ x: 2 }]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 70,
                                    "end": 85
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "ObjectPattern",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "computed": false,
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 48,
                                                        "end": 49
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 48,
                                                        "end": 49
                                                    },
                                                    "start": 48,
                                                    "end": 49
                                                }
                                            ],
                                            "start": 46,
                                            "end": 51
                                        }
                                    ],
                                    "start": 45,
                                    "end": 52
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "ObjectExpression",
                                                    "properties": [
                                                        {
                                                            "type": "Property",
                                                            "computed": false,
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "x",
                                                                "start": 60,
                                                                "end": 61
                                                            },
                                                            "kind": "init",
                                                            "method": false,
                                                            "shorthand": false,
                                                            "value": {
                                                                "type": "Literal",
                                                                "value": 2,
                                                                "start": 63,
                                                                "end": 64,
                                                                "raw": "2"
                                                            },
                                                            "start": 60,
                                                            "end": 64
                                                        }
                                                    ],
                                                    "start": 58,
                                                    "end": 66
                                                }
                                            ],
                                            "start": 57,
                                            "end": 67
                                        }
                                    ],
                                    "start": 56,
                                    "end": 68
                                },
                                "await": true,
                                "start": 34,
                                "end": 85
                            }
                        ],
                        "start": 20,
                        "end": 97
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 97
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 97
        });
    });

    
    it('should parse array elem put const', () => {
        expect(parseScript(`async function fn() {
            for await ([ c ] of [[1]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 61,
                                    "end": 76
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "Identifier",
                                            "name": "c",
                                            "start": 47,
                                            "end": 48
                                        }
                                    ],
                                    "start": 45,
                                    "end": 50
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "Literal",
                                                    "value": 1,
                                                    "start": 56,
                                                    "end": 57,
                                                    "raw": "1"
                                                }
                                            ],
                                            "start": 55,
                                            "end": 58
                                        }
                                    ],
                                    "start": 54,
                                    "end": 59
                                },
                                "await": true,
                                "start": 34,
                                "end": 76
                            }
                        ],
                        "start": 20,
                        "end": 88
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 88
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 88
        });
    });

    it('should parse array rest iteration', () => {
        expect(parseScript(`async function fn() {
            for await ([...x] of [g()]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 62,
                                    "end": 77
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "RestElement",
                                            "argument": {
                                                "type": "Identifier",
                                                "name": "x",
                                                "start": 49,
                                                "end": 50
                                            },
                                            "start": 46,
                                            "end": 50
                                        }
                                    ],
                                    "start": 45,
                                    "end": 51
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "CallExpression",
                                            "arguments": [],
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "g",
                                                "start": 56,
                                                "end": 57
                                            },
                                            "start": 56,
                                            "end": 59
                                        }
                                    ],
                                    "start": 55,
                                    "end": 60
                                },
                                "await": true,
                                "start": 34,
                                "end": 77
                            }
                        ],
                        "start": 20,
                        "end": 89
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 89
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 89
        });
    });

    
    it('should parse array nested object null', () => {
        expect(parseScript(`async function fn() {
            for await ([...{ 0: x, length }] of [[null]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 80,
                                    "end": 95
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "RestElement",
                                            "argument": {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "computed": false,
                                                        "key": {
                                                            "type": "Literal",
                                                            "value": 0,
                                                            "start": 51,
                                                            "end": 52,
                                                            "raw": "0"
                                                        },
                                                        "kind": "init",
                                                        "method": false,
                                                        "shorthand": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "x",
                                                            "start": 54,
                                                            "end": 55
                                                        },
                                                        "start": 51,
                                                        "end": 55
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "computed": false,
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "length",
                                                            "start": 57,
                                                            "end": 63
                                                        },
                                                        "kind": "init",
                                                        "method": false,
                                                        "shorthand": true,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "length",
                                                            "start": 57,
                                                            "end": 63
                                                        },
                                                        "start": 57,
                                                        "end": 63
                                                    }
                                                ],
                                                "start": 49,
                                                "end": 65
                                            },
                                            "start": 46,
                                            "end": 65
                                        }
                                    ],
                                    "start": 45,
                                    "end": 66
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "Literal",
                                                    "value": null,
                                                    "start": 72,
                                                    "end": 76,
                                                    "raw": "null"
                                                }
                                            ],
                                            "start": 71,
                                            "end": 77
                                        }
                                    ],
                                    "start": 70,
                                    "end": 78
                                },
                                "await": true,
                                "start": 34,
                                "end": 95
                            }
                        ],
                        "start": 20,
                        "end": 107
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 107
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 107
        });
    });

    it.skip('should parse function name arrow', () => {
        expect(parseScript(`async function fn() {
            for await ({ arrow = () => {} } of [{}]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 75,
                                    "end": 90
                                },
                                "left": {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "name": "arrow",
                                                "start": 47,
                                                "end": 52
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": true,
                                            "value": {
                                                "type": "AssignmentPattern",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "arrow",
                                                    "start": 47,
                                                    "end": 52
                                                },
                                                "right": {
                                                    "type": "ArrowFunctionExpression",
                                                    "id": null,
                                                    "params": [],
                                                    "body": {
                                                        "type": "BlockStatement",
                                                        "body": [],
                                                        "start": 61,
                                                        "end": 63
                                                    },
                                                    "generator": false,
                                                    "expression": false,
                                                    "async": true,
                                                    "start": 55,
                                                    "end": 63
                                                },
                                                "start": 47,
                                                "end": 63
                                            },
                                            "start": 47,
                                            "end": 63
                                        }
                                    ],
                                    "start": 45,
                                    "end": 65
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ObjectExpression",
                                            "properties": [],
                                            "start": 70,
                                            "end": 72
                                        }
                                    ],
                                    "start": 69,
                                    "end": 73
                                },
                                "await": true,
                                "start": 34,
                                "end": 90
                            }
                        ],
                        "start": 20,
                        "end": 102
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 102
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 102
        });
    });

    
    it('should parse object property elem init yield identifier', () => {
        expect(parseScript(`async function fn() {
            for await ({ x: x = yield } of [{}]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 71,
                                    "end": 86
                                },
                                "left": {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "name": "x",
                                                "start": 47,
                                                "end": 48
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false,
                                            "value": {
                                                "type": "AssignmentPattern",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "x",
                                                    "start": 50,
                                                    "end": 51
                                                },
                                                "right": {
                                                    "type": "Identifier",
                                                    "name": "yield",
                                                    "start": 54,
                                                    "end": 59
                                                },
                                                "start": 50,
                                                "end": 59
                                            },
                                            "start": 47,
                                            "end": 59
                                        }
                                    ],
                                    "start": 45,
                                    "end": 61
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ObjectExpression",
                                            "properties": [],
                                            "start": 66,
                                            "end": 68
                                        }
                                    ],
                                    "start": 65,
                                    "end": 69
                                },
                                "await": true,
                                "start": 34,
                                "end": 86
                            }
                        ],
                        "start": 20,
                        "end": 98
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 98
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 98
        });
    });

    it('should parse object property nested array', () => {
        expect(parseScript(`async function fn() {
            for await ({ x: [y] } of [{ x: [321] }]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 75,
                                    "end": 90
                                },
                                "left": {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "computed": false,
                                            "key": {
                                                "type": "Identifier",
                                                "name": "x",
                                                "start": 47,
                                                "end": 48
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false,
                                            "value": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "Identifier",
                                                        "name": "y",
                                                        "start": 51,
                                                        "end": 52
                                                    }
                                                ],
                                                "start": 50,
                                                "end": 53
                                            },
                                            "start": 47,
                                            "end": 53
                                        }
                                    ],
                                    "start": 45,
                                    "end": 55
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ObjectExpression",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "computed": false,
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 62,
                                                        "end": 63
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false,
                                                    "value": {
                                                        "type": "ArrayExpression",
                                                        "elements": [
                                                            {
                                                                "type": "Literal",
                                                                "value": 321,
                                                                "start": 66,
                                                                "end": 69,
                                                                "raw": "321"
                                                            }
                                                        ],
                                                        "start": 65,
                                                        "end": 70
                                                    },
                                                    "start": 62,
                                                    "end": 70
                                                }
                                            ],
                                            "start": 60,
                                            "end": 72
                                        }
                                    ],
                                    "start": 59,
                                    "end": 73
                                },
                                "await": true,
                                "start": 34,
                                "end": 90
                            }
                        ],
                        "start": 20,
                        "end": 102
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 102
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 102
        });
    });
    it('should parse array element nesed array undefined', () => {
        expect(parseScript(`async function * fn() {
            for await ([[ x ]] of [[undefined]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 73,
                                    "end": 88
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "ArrayPattern",
                                            "elements": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "x",
                                                    "start": 50,
                                                    "end": 51
                                                }
                                            ],
                                            "start": 48,
                                            "end": 53
                                        }
                                    ],
                                    "start": 47,
                                    "end": 54
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "undefined",
                                                    "start": 60,
                                                    "end": 69
                                                }
                                            ],
                                            "start": 59,
                                            "end": 70
                                        }
                                    ],
                                    "start": 58,
                                    "end": 71
                                },
                                "await": true,
                                "start": 36,
                                "end": 88
                            }
                        ],
                        "start": 22,
                        "end": 100
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 17,
                        "end": 19
                    },
                    "start": 0,
                    "end": 100
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 100
        });
    });


    it('should parse array elision value array', () => {
        expect(parseScript(`async function * fn() {
            for await ([,] of [[]
          ]) {
              
              iterCount += 1;
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AssignmentExpression",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "iterCount",
                                                    "start": 102,
                                                    "end": 111
                                                },
                                                "operator": "+=",
                                                "right": {
                                                    "type": "Literal",
                                                    "value": 1,
                                                    "start": 115,
                                                    "end": 116,
                                                    "raw": "1"
                                                },
                                                "start": 102,
                                                "end": 116
                                            },
                                            "start": 102,
                                            "end": 117
                                        }
                                    ],
                                    "start": 71,
                                    "end": 131
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        null
                                    ],
                                    "start": 47,
                                    "end": 50
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [],
                                            "start": 55,
                                            "end": 57
                                        }
                                    ],
                                    "start": 54,
                                    "end": 69
                                },
                                "await": true,
                                "start": 36,
                                "end": 131
                            }
                        ],
                        "start": 22,
                        "end": 143
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 17,
                        "end": 19
                    },
                    "start": 0,
                    "end": 143
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 143
        });
    });


    it('should parse object empty num', () => {
        expect(parseScript(`async function * fn() {
            for await ({} of [0
          ]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 69,
                                    "end": 84
                                },
                                "left": {
                                    "type": "ObjectPattern",
                                    "properties": [],
                                    "start": 47,
                                    "end": 49
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "Literal",
                                            "value": 0,
                                            "start": 54,
                                            "end": 55,
                                            "raw": "0"
                                        }
                                    ],
                                    "start": 53,
                                    "end": 67
                                },
                                "await": true,
                                "start": 36,
                                "end": 84
                            }
                        ],
                        "start": 22,
                        "end": 96
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 17,
                        "end": 19
                    },
                    "start": 0,
                    "end": 96
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 96
        });
    });

    
    it('should parse const async object pattern prop id', () => {
        expect(parseScript(`async function fn() {
            for await (const { x: y } of asyncIter) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 74,
                                    "end": 89
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "kind": "init",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "x",
                                                            "start": 53,
                                                            "end": 54
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "y",
                                                            "start": 56,
                                                            "end": 57
                                                        },
                                                        "method": false,
                                                        "shorthand": false,
                                                        "start": 53,
                                                        "end": 57
                                                    }
                                                ],
                                                "start": 51,
                                                "end": 59
                                            },
                                            "start": 51,
                                            "end": 59
                                        }
                                    ],
                                    "kind": "const",
                                    "start": 45,
                                    "end": 59
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "asyncIter",
                                    "start": 63,
                                    "end": 72
                                },
                                "await": true,
                                "start": 34,
                                "end": 89
                            }
                        ],
                        "start": 20,
                        "end": 101
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 101
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 101
        });
    });

  

    it('should parse const object init null', () => {
        expect(parseScript(`async function fn() {
            for await (const {} of [null]) {
              return;
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ReturnStatement",
                                            "argument": null,
                                            "start": 81,
                                            "end": 88
                                        }
                                    ],
                                    "start": 65,
                                    "end": 102
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ObjectPattern",
                                                "properties": [],
                                                "start": 51,
                                                "end": 53
                                            },
                                            "start": 51,
                                            "end": 53
                                        }
                                    ],
                                    "kind": "const",
                                    "start": 45,
                                    "end": 53
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "Literal",
                                            "value": null,
                                            "start": 58,
                                            "end": 62,
                                            "raw": "null"
                                        }
                                    ],
                                    "start": 57,
                                    "end": 63
                                },
                                "await": true,
                                "start": 34,
                                "end": 102
                            }
                        ],
                        "start": 20,
                        "end": 114
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 114
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 114
        });
    });

    it('should parse array pattern rest id ellison', () => {
        expect(parseScript(`async function fn() {
            for await (const [ , , ...x] of [values]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 76,
                                    "end": 91
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    null,
                                                    null,
                                                    {
                                                        "type": "RestElement",
                                                        "argument": {
                                                            "type": "Identifier",
                                                            "name": "x",
                                                            "start": 60,
                                                            "end": 61
                                                        },
                                                        "start": 57,
                                                        "end": 61
                                                    }
                                                ],
                                                "start": 51,
                                                "end": 62
                                            },
                                            "start": 51,
                                            "end": 62
                                        }
                                    ],
                                    "kind": "const",
                                    "start": 45,
                                    "end": 62
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "Identifier",
                                            "name": "values",
                                            "start": 67,
                                            "end": 73
                                        }
                                    ],
                                    "start": 66,
                                    "end": 74
                                },
                                "await": true,
                                "start": 34,
                                "end": 91
                            }
                        ],
                        "start": 20,
                        "end": 103
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 103
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 103
        });
    });

    it('should parse  array pattern elem id init hole', () => {
        expect(parseScript(`async function fn() {
            for await (const [x = 23] of [[,]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 70,
                                    "end": 85
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "AssignmentPattern",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "x",
                                                            "start": 52,
                                                            "end": 53
                                                        },
                                                        "right": {
                                                            "type": "Literal",
                                                            "value": 23,
                                                            "start": 56,
                                                            "end": 58,
                                                            "raw": "23"
                                                        },
                                                        "start": 52,
                                                        "end": 58
                                                    }
                                                ],
                                                "start": 51,
                                                "end": 59
                                            },
                                            "start": 51,
                                            "end": 59
                                        }
                                    ],
                                    "kind": "const",
                                    "start": 45,
                                    "end": 59
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                null
                                            ],
                                            "start": 64,
                                            "end": 67
                                        }
                                    ],
                                    "start": 63,
                                    "end": 68
                                },
                                "await": true,
                                "start": 34,
                                "end": 85
                            }
                        ],
                        "start": 20,
                        "end": 97
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17
                    },
                    "start": 0,
                    "end": 97
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 97
        });
    });

    it('should parse array pattern empty', () => {
        expect(parseScript(`async function *fn() {
            for await (let [] of asyncIter) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 67,
                                    "end": 82
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [],
                                                "start": 50,
                                                "end": 52
                                            },
                                            "start": 50,
                                            "end": 52
                                        }
                                    ],
                                    "kind": "let",
                                    "start": 46,
                                    "end": 52
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "asyncIter",
                                    "start": 56,
                                    "end": 65
                                },
                                "await": true,
                                "start": 35,
                                "end": 82
                            }
                        ],
                        "start": 21,
                        "end": 94
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18
                    },
                    "start": 0,
                    "end": 94
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 94
        });
    });

    it('should parse array pattern elem object', () => {
        expect(parseScript(`async function *fn() {
            for await (let [{ x, y, z } = { x: 44, y: 55, z: 66 }] of asyncIter) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 104,
                                    "end": 119
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "AssignmentPattern",
                                                        "left": {
                                                            "type": "ObjectPattern",
                                                            "properties": [
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 53,
                                                                        "end": 54
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 53,
                                                                        "end": 54
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": true,
                                                                    "start": 53,
                                                                    "end": 54
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "y",
                                                                        "start": 56,
                                                                        "end": 57
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "y",
                                                                        "start": 56,
                                                                        "end": 57
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": true,
                                                                    "start": 56,
                                                                    "end": 57
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "z",
                                                                        "start": 59,
                                                                        "end": 60
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "z",
                                                                        "start": 59,
                                                                        "end": 60
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": true,
                                                                    "start": 59,
                                                                    "end": 60
                                                                }
                                                            ],
                                                            "start": 51,
                                                            "end": 62
                                                        },
                                                        "right": {
                                                            "type": "ObjectExpression",
                                                            "properties": [
                                                                {
                                                                    "type": "Property",
                                                                    "computed": false,
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 67,
                                                                        "end": 68
                                                                    },
                                                                    "kind": "init",
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": 44,
                                                                        "start": 70,
                                                                        "end": 72,
                                                                        "raw": "44"
                                                                    },
                                                                    "start": 67,
                                                                    "end": 72
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "computed": false,
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "y",
                                                                        "start": 74,
                                                                        "end": 75
                                                                    },
                                                                    "kind": "init",
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": 55,
                                                                        "start": 77,
                                                                        "end": 79,
                                                                        "raw": "55"
                                                                    },
                                                                    "start": 74,
                                                                    "end": 79
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "computed": false,
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "z",
                                                                        "start": 81,
                                                                        "end": 82
                                                                    },
                                                                    "kind": "init",
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": 66,
                                                                        "start": 84,
                                                                        "end": 86,
                                                                        "raw": "66"
                                                                    },
                                                                    "start": 81,
                                                                    "end": 86
                                                                }
                                                            ],
                                                            "start": 65,
                                                            "end": 88
                                                        },
                                                        "start": 51,
                                                        "end": 88
                                                    }
                                                ],
                                                "start": 50,
                                                "end": 89
                                            },
                                            "start": 50,
                                            "end": 89
                                        }
                                    ],
                                    "kind": "let",
                                    "start": 46,
                                    "end": 89
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "asyncIter",
                                    "start": 93,
                                    "end": 102
                                },
                                "await": true,
                                "start": 35,
                                "end": 119
                            }
                        ],
                        "start": 21,
                        "end": 131
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18
                    },
                    "start": 0,
                    "end": 131
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 131
        });
    });

    it.skip('should parse single name binding assigned name to arrow functions', () => {
        expect(parseScript(`async function *fn() {
            for await (let [arrow = () => {}] of asyncIter) {
            }
          }`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 83,
                                    "end": 98,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 60
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "AssignmentPattern",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "arrow",
                                                            "start": 51,
                                                            "end": 56,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 28
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 33
                                                                }
                                                            }
                                                        },
                                                        "right": {
                                                            "type": "ArrowFunctionExpression",
                                                            "id": null,
                                                            "params": [],
                                                            "body": {
                                                                "type": "BlockStatement",
                                                                "body": [],
                                                                "start": 65,
                                                                "end": 67,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 42
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 44
                                                                    }
                                                                }
                                                            },
                                                            "generator": false,
                                                            "expression": false,
                                                            "async": true,
                                                            "start": 59,
                                                            "end": 67,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 36
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 44
                                                                }
                                                            }
                                                        },
                                                        "start": 51,
                                                        "end": 67,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 28
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 44
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 50,
                                                "end": 68,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 27
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 45
                                                    }
                                                }
                                            },
                                            "start": 50,
                                            "end": 68,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 27
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 45
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "let",
                                    "start": 46,
                                    "end": 68,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 45
                                        }
                                    }
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "asyncIter",
                                    "start": 72,
                                    "end": 81,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 49
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 58
                                        }
                                    }
                                },
                                "await": true,
                                "start": 35,
                                "end": 98,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 21,
                        "end": 110,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    },
                    "start": 0,
                    "end": 110,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 4,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 110,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 11
                }
            }
        });
    });

    it('should parse single name binding with normal value iteration', () => {
        expect(parseScript(`async function *fn() {
            for await (let [x, y, z] of asyncIter) {
            }
          }`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 74,
                                    "end": 89,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 51
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 51,
                                                        "end": 52,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 28
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 29
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "Identifier",
                                                        "name": "y",
                                                        "start": 54,
                                                        "end": 55,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 31
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 32
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "Identifier",
                                                        "name": "z",
                                                        "start": 57,
                                                        "end": 58,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 34
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 35
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 50,
                                                "end": 59,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 27
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 36
                                                    }
                                                }
                                            },
                                            "start": 50,
                                            "end": 59,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 27
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 36
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "let",
                                    "start": 46,
                                    "end": 59,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 36
                                        }
                                    }
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "asyncIter",
                                    "start": 63,
                                    "end": 72,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 40
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 49
                                        }
                                    }
                                },
                                "await": true,
                                "start": 35,
                                "end": 89,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 21,
                        "end": 101,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    },
                    "start": 0,
                    "end": 101,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 4,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 101,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 11
                }
            }
        });
    });

    it('should parse rest element containing an object binding pattern', () => {
        expect(parseScript(`async function *fn() {
            for await (let [...{ 0: v, 1: w, 2: x, 3: y, length: z }] of [[7, 8, 9]]) {
            }
          }`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 109,
                                    "end": 124,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 86
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "RestElement",
                                                        "argument": {
                                                            "type": "ObjectPattern",
                                                            "properties": [
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Literal",
                                                                        "value": 0,
                                                                        "start": 56,
                                                                        "end": 57,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 33
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 34
                                                                            }
                                                                        },
                                                                        "raw": "0"
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "v",
                                                                        "start": 59,
                                                                        "end": 60,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 36
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 37
                                                                            }
                                                                        }
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "start": 56,
                                                                    "end": 60,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 33
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 37
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Literal",
                                                                        "value": 1,
                                                                        "start": 62,
                                                                        "end": 63,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 39
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 40
                                                                            }
                                                                        },
                                                                        "raw": "1"
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "w",
                                                                        "start": 65,
                                                                        "end": 66,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 42
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 43
                                                                            }
                                                                        }
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "start": 62,
                                                                    "end": 66,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 39
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 43
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Literal",
                                                                        "value": 2,
                                                                        "start": 68,
                                                                        "end": 69,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 45
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 46
                                                                            }
                                                                        },
                                                                        "raw": "2"
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 71,
                                                                        "end": 72,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 48
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 49
                                                                            }
                                                                        }
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "start": 68,
                                                                    "end": 72,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 45
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 49
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Literal",
                                                                        "value": 3,
                                                                        "start": 74,
                                                                        "end": 75,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 51
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 52
                                                                            }
                                                                        },
                                                                        "raw": "3"
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "y",
                                                                        "start": 77,
                                                                        "end": 78,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 54
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 55
                                                                            }
                                                                        }
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "start": 74,
                                                                    "end": 78,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 51
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 55
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "length",
                                                                        "start": 80,
                                                                        "end": 86,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 57
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 63
                                                                            }
                                                                        }
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "z",
                                                                        "start": 88,
                                                                        "end": 89,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 65
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 66
                                                                            }
                                                                        }
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "start": 80,
                                                                    "end": 89,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 57
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 66
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            "start": 51,
                                                            "end": 91,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 28
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 68
                                                                }
                                                            }
                                                        },
                                                        "start": 51,
                                                        "end": 91,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 28
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 68
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 50,
                                                "end": 92,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 27
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 69
                                                    }
                                                }
                                            },
                                            "start": 50,
                                            "end": 92,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 27
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 69
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "let",
                                    "start": 46,
                                    "end": 92,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 69
                                        }
                                    }
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "Literal",
                                                    "value": 7,
                                                    "start": 98,
                                                    "end": 99,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 75
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 76
                                                        }
                                                    },
                                                    "raw": "7"
                                                },
                                                {
                                                    "type": "Literal",
                                                    "value": 8,
                                                    "start": 101,
                                                    "end": 102,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 78
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 79
                                                        }
                                                    },
                                                    "raw": "8"
                                                },
                                                {
                                                    "type": "Literal",
                                                    "value": 9,
                                                    "start": 104,
                                                    "end": 105,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 81
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 82
                                                        }
                                                    },
                                                    "raw": "9"
                                                }
                                            ],
                                            "start": 97,
                                            "end": 106,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 74
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 83
                                                }
                                            }
                                        }
                                    ],
                                    "start": 96,
                                    "end": 107,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 73
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 84
                                        }
                                    }
                                },
                                "await": true,
                                "start": 35,
                                "end": 124,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 21,
                        "end": 136,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    },
                    "start": 0,
                    "end": 136,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 4,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 136,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 11
                }
            }
        });
    });

    it('should parse lone rest element', () => {
        expect(parseScript(`async function *fn() {
            for await (let [...x] of [values]) {
            }
          }`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 70,
                                    "end": 85,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 47
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "RestElement",
                                                        "argument": {
                                                            "type": "Identifier",
                                                            "name": "x",
                                                            "start": 54,
                                                            "end": 55,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 31
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 32
                                                                }
                                                            }
                                                        },
                                                        "start": 51,
                                                        "end": 55,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 28
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 32
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 50,
                                                "end": 56,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 27
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 33
                                                    }
                                                }
                                            },
                                            "start": 50,
                                            "end": 56,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 27
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 33
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "let",
                                    "start": 46,
                                    "end": 56,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 33
                                        }
                                    }
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "Identifier",
                                            "name": "values",
                                            "start": 61,
                                            "end": 67,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 38
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 44
                                                }
                                            }
                                        }
                                    ],
                                    "start": 60,
                                    "end": 68,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 37
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 45
                                        }
                                    }
                                },
                                "await": true,
                                "start": 35,
                                "end": 85,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 21,
                        "end": 97,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    },
                    "start": 0,
                    "end": 97,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 4,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 97,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 11
                }
            }
        });
    });

    it('should parse bindingElement with object binding pattern', () => {
        expect(parseScript(`async function *fn() {
            for await (let [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[{ x: 11, y: 22, z: 33 }]]) {
            }
          }`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 122,
                                    "end": 137,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 99
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "AssignmentPattern",
                                                        "left": {
                                                            "type": "ObjectPattern",
                                                            "properties": [
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 53,
                                                                        "end": 54,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 30
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 31
                                                                            }
                                                                        }
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 53,
                                                                        "end": 54,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 30
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 31
                                                                            }
                                                                        }
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": true,
                                                                    "start": 53,
                                                                    "end": 54,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 30
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 31
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "y",
                                                                        "start": 56,
                                                                        "end": 57,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 33
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 34
                                                                            }
                                                                        }
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "y",
                                                                        "start": 56,
                                                                        "end": 57,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 33
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 34
                                                                            }
                                                                        }
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": true,
                                                                    "start": 56,
                                                                    "end": 57,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 33
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 34
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "z",
                                                                        "start": 59,
                                                                        "end": 60,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 36
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 37
                                                                            }
                                                                        }
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "z",
                                                                        "start": 59,
                                                                        "end": 60,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 36
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 37
                                                                            }
                                                                        }
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": true,
                                                                    "start": 59,
                                                                    "end": 60,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 36
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 37
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            "start": 51,
                                                            "end": 62,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 28
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 39
                                                                }
                                                            }
                                                        },
                                                        "right": {
                                                            "type": "ObjectExpression",
                                                            "properties": [
                                                                {
                                                                    "type": "Property",
                                                                    "computed": false,
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 67,
                                                                        "end": 68,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 44
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 45
                                                                            }
                                                                        }
                                                                    },
                                                                    "kind": "init",
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": 44,
                                                                        "start": 70,
                                                                        "end": 72,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 47
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 49
                                                                            }
                                                                        },
                                                                        "raw": "44"
                                                                    },
                                                                    "start": 67,
                                                                    "end": 72,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 44
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 49
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "computed": false,
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "y",
                                                                        "start": 74,
                                                                        "end": 75,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 51
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 52
                                                                            }
                                                                        }
                                                                    },
                                                                    "kind": "init",
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": 55,
                                                                        "start": 77,
                                                                        "end": 79,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 54
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 56
                                                                            }
                                                                        },
                                                                        "raw": "55"
                                                                    },
                                                                    "start": 74,
                                                                    "end": 79,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 51
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 56
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "computed": false,
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "z",
                                                                        "start": 81,
                                                                        "end": 82,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 58
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 59
                                                                            }
                                                                        }
                                                                    },
                                                                    "kind": "init",
                                                                    "method": false,
                                                                    "shorthand": false,
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": 66,
                                                                        "start": 84,
                                                                        "end": 86,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 61
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 63
                                                                            }
                                                                        },
                                                                        "raw": "66"
                                                                    },
                                                                    "start": 81,
                                                                    "end": 86,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 58
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 63
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            "start": 65,
                                                            "end": 88,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 42
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 65
                                                                }
                                                            }
                                                        },
                                                        "start": 51,
                                                        "end": 88,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 28
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 65
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 50,
                                                "end": 89,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 27
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 66
                                                    }
                                                }
                                            },
                                            "start": 50,
                                            "end": 89,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 27
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 66
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "let",
                                    "start": 46,
                                    "end": 89,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 66
                                        }
                                    }
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "ObjectExpression",
                                                    "properties": [
                                                        {
                                                            "type": "Property",
                                                            "computed": false,
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "x",
                                                                "start": 97,
                                                                "end": 98,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 74
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 75
                                                                    }
                                                                }
                                                            },
                                                            "kind": "init",
                                                            "method": false,
                                                            "shorthand": false,
                                                            "value": {
                                                                "type": "Literal",
                                                                "value": 11,
                                                                "start": 100,
                                                                "end": 102,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 77
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 79
                                                                    }
                                                                },
                                                                "raw": "11"
                                                            },
                                                            "start": 97,
                                                            "end": 102,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 74
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 79
                                                                }
                                                            }
                                                        },
                                                        {
                                                            "type": "Property",
                                                            "computed": false,
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "y",
                                                                "start": 104,
                                                                "end": 105,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 81
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 82
                                                                    }
                                                                }
                                                            },
                                                            "kind": "init",
                                                            "method": false,
                                                            "shorthand": false,
                                                            "value": {
                                                                "type": "Literal",
                                                                "value": 22,
                                                                "start": 107,
                                                                "end": 109,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 84
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 86
                                                                    }
                                                                },
                                                                "raw": "22"
                                                            },
                                                            "start": 104,
                                                            "end": 109,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 81
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 86
                                                                }
                                                            }
                                                        },
                                                        {
                                                            "type": "Property",
                                                            "computed": false,
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "z",
                                                                "start": 111,
                                                                "end": 112,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 88
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 89
                                                                    }
                                                                }
                                                            },
                                                            "kind": "init",
                                                            "method": false,
                                                            "shorthand": false,
                                                            "value": {
                                                                "type": "Literal",
                                                                "value": 33,
                                                                "start": 114,
                                                                "end": 116,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 91
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 93
                                                                    }
                                                                },
                                                                "raw": "33"
                                                            },
                                                            "start": 111,
                                                            "end": 116,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 88
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 93
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "start": 95,
                                                    "end": 118,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 72
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 95
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 94,
                                            "end": 119,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 71
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 96
                                                }
                                            }
                                        }
                                    ],
                                    "start": 93,
                                    "end": 120,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 70
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 97
                                        }
                                    }
                                },
                                "await": true,
                                "start": 35,
                                "end": 137,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 21,
                        "end": 149,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    },
                    "start": 0,
                    "end": 149,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 4,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 149,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 11
                }
            }
        });
    });

    it('should parse async iteration with object spread and getter', () => {
        expect(parseScript(`async function *fn() {
            for await (const {...x} of [{ get v() { return 2; } }]) {
            }
          }`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 91,
                                    "end": 106,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 68
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "RestElement",
                                                        "argument": {
                                                            "type": "Identifier",
                                                            "name": "x",
                                                            "start": 56,
                                                            "end": 57,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 33
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 34
                                                                }
                                                            }
                                                        },
                                                        "start": 53,
                                                        "end": 57,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 30
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 34
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 52,
                                                "end": 58,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 29
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 35
                                                    }
                                                }
                                            },
                                            "start": 52,
                                            "end": 58,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 29
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 35
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "const",
                                    "start": 46,
                                    "end": 58,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 35
                                        }
                                    }
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ObjectExpression",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "computed": false,
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "v",
                                                        "start": 69,
                                                        "end": 70,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 46
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 47
                                                            }
                                                        }
                                                    },
                                                    "kind": "get",
                                                    "method": false,
                                                    "shorthand": false,
                                                    "value": {
                                                        "type": "FunctionExpression",
                                                        "id": null,
                                                        "params": [],
                                                        "body": {
                                                            "type": "BlockStatement",
                                                            "body": [
                                                                {
                                                                    "type": "ReturnStatement",
                                                                    "argument": {
                                                                        "type": "Literal",
                                                                        "value": 2,
                                                                        "start": 82,
                                                                        "end": 83,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 59
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 60
                                                                            }
                                                                        },
                                                                        "raw": "2"
                                                                    },
                                                                    "start": 75,
                                                                    "end": 84,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 52
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 61
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            "start": 73,
                                                            "end": 86,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 50
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 63
                                                                }
                                                            }
                                                        },
                                                        "generator": false,
                                                        "async": false,
                                                        "expression": false,
                                                        "start": 70,
                                                        "end": 86,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 47
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 63
                                                            }
                                                        }
                                                    },
                                                    "start": 65,
                                                    "end": 86,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 42
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 63
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 63,
                                            "end": 88,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 40
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 65
                                                }
                                            }
                                        }
                                    ],
                                    "start": 62,
                                    "end": 89,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 39
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 66
                                        }
                                    }
                                },
                                "await": true,
                                "start": 35,
                                "end": 106,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 21,
                        "end": 118,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    },
                    "start": 0,
                    "end": 118,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 4,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 118,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 11
                }
            }
        });
    });

    it('should parse binding as specified via property name and identifier', () => {
        expect(parseScript(`async function *fn() {
            for await (const { x: y } of [{ x: 23 }]) {
            }
          }`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 77,
                                    "end": 92,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 54
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "kind": "init",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "x",
                                                            "start": 54,
                                                            "end": 55,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 31
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 32
                                                                }
                                                            }
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "y",
                                                            "start": 57,
                                                            "end": 58,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 34
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 35
                                                                }
                                                            }
                                                        },
                                                        "method": false,
                                                        "shorthand": false,
                                                        "start": 54,
                                                        "end": 58,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 31
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 35
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 52,
                                                "end": 60,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 29
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 37
                                                    }
                                                }
                                            },
                                            "start": 52,
                                            "end": 60,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 29
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 37
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "const",
                                    "start": 46,
                                    "end": 60,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 37
                                        }
                                    }
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ObjectExpression",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "computed": false,
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 67,
                                                        "end": 68,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 44
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 45
                                                            }
                                                        }
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false,
                                                    "value": {
                                                        "type": "Literal",
                                                        "value": 23,
                                                        "start": 70,
                                                        "end": 72,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 47
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 49
                                                            }
                                                        },
                                                        "raw": "23"
                                                    },
                                                    "start": 67,
                                                    "end": 72,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 44
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 49
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 65,
                                            "end": 74,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 42
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 51
                                                }
                                            }
                                        }
                                    ],
                                    "start": 64,
                                    "end": 75,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 41
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 52
                                        }
                                    }
                                },
                                "await": true,
                                "start": 35,
                                "end": 92,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 21,
                        "end": 104,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    },
                    "start": 0,
                    "end": 104,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 4,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 104,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 11
                }
            }
        });
    });

    it('should parse object binding pattern with object coercible (null)', () => {
        expect(parseScript(`async function * gen() {
            for await (const {} of [null]) {
              return;
            }
          }`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ReturnStatement",
                                            "argument": null,
                                            "start": 84,
                                            "end": 91,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 14
                                                },
                                                "end": {
                                                    "line": 3,
                                                    "column": 21
                                                }
                                            }
                                        }
                                    ],
                                    "start": 68,
                                    "end": 105,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 43
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 13
                                        }
                                    }
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ObjectPattern",
                                                "properties": [],
                                                "start": 54,
                                                "end": 56,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 29
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 31
                                                    }
                                                }
                                            },
                                            "start": 54,
                                            "end": 56,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 29
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 31
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "const",
                                    "start": 48,
                                    "end": 56,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 31
                                        }
                                    }
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "Literal",
                                            "value": null,
                                            "start": 61,
                                            "end": 65,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 36
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 40
                                                }
                                            },
                                            "raw": "null"
                                        }
                                    ],
                                    "start": 60,
                                    "end": 66,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 35
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 41
                                        }
                                    }
                                },
                                "await": true,
                                "start": 37,
                                "end": 105,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 23,
                        "end": 117,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 23
                            },
                            "end": {
                                "line": 5,
                                "column": 11
                            }
                        }
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "gen",
                        "start": 17,
                        "end": 20,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 17
                            },
                            "end": {
                                "line": 1,
                                "column": 20
                            }
                        }
                    },
                    "start": 0,
                    "end": 117,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 5,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 117,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 5,
                    "column": 11
                }
            }
        });
    });

    it('should parse array element nested array undefined', () => {
        expect(parseScript(`async function fn() {
            for await ([[ x ]] of [[]]) {
            }
          }`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 62,
                                    "end": 77,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 40
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "ArrayPattern",
                                            "elements": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "x",
                                                    "start": 48,
                                                    "end": 49,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 26
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 27
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 46,
                                            "end": 51,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 24
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 29
                                                }
                                            }
                                        }
                                    ],
                                    "start": 45,
                                    "end": 52,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 30
                                        }
                                    }
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [],
                                            "start": 57,
                                            "end": 59,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 35
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 37
                                                }
                                            }
                                        }
                                    ],
                                    "start": 56,
                                    "end": 60,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 34
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 38
                                        }
                                    }
                                },
                                "await": true,
                                "start": 34,
                                "end": 77,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 20,
                        "end": 89,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 20
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 15
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        }
                    },
                    "start": 0,
                    "end": 89,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 4,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 89,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 11
                }
            }
        });
    });

    it('should parse array pattern rest object id', () => {
        expect(parseScript(`async function *fn() {
            for await (let [...{ length }] of [[1, 2, 3]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 82,
                                    "end": 97,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 59
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "RestElement",
                                                        "argument": {
                                                            "type": "ObjectPattern",
                                                            "properties": [
                                                                {
                                                                    "type": "Property",
                                                                    "kind": "init",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "length",
                                                                        "start": 56,
                                                                        "end": 62,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 33
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 39
                                                                            }
                                                                        }
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "length",
                                                                        "start": 56,
                                                                        "end": 62,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 33
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 39
                                                                            }
                                                                        }
                                                                    },
                                                                    "method": false,
                                                                    "shorthand": true,
                                                                    "start": 56,
                                                                    "end": 62,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 33
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 39
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            "start": 51,
                                                            "end": 64,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 28
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 41
                                                                }
                                                            }
                                                        },
                                                        "start": 51,
                                                        "end": 64,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 28
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 41
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 50,
                                                "end": 65,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 27
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 42
                                                    }
                                                }
                                            },
                                            "start": 50,
                                            "end": 65,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 27
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 42
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "let",
                                    "start": 46,
                                    "end": 65,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 42
                                        }
                                    }
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "Literal",
                                                    "value": 1,
                                                    "start": 71,
                                                    "end": 72,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 48
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 49
                                                        }
                                                    },
                                                    "raw": "1"
                                                },
                                                {
                                                    "type": "Literal",
                                                    "value": 2,
                                                    "start": 74,
                                                    "end": 75,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 51
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 52
                                                        }
                                                    },
                                                    "raw": "2"
                                                },
                                                {
                                                    "type": "Literal",
                                                    "value": 3,
                                                    "start": 77,
                                                    "end": 78,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 54
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 55
                                                        }
                                                    },
                                                    "raw": "3"
                                                }
                                            ],
                                            "start": 70,
                                            "end": 79,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 47
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 56
                                                }
                                            }
                                        }
                                    ],
                                    "start": 69,
                                    "end": 80,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 46
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 57
                                        }
                                    }
                                },
                                "await": true,
                                "start": 35,
                                "end": 97,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 21,
                        "end": 109,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    },
                    "start": 0,
                    "end": 109,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 4,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 109,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 11
                }
            }
        });
    });

    it.skip('should parse array pattern array rest', () => {
        expect(parseScript(`async function *fn() {
            for await (let [[...x] = function() { }()] of [[values]]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 93,
                                    "end": 108
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "AssignmentPattern",
                                                        "left": {
                                                            "type": "ArrayPattern",
                                                            "elements": [
                                                                {
                                                                    "type": "RestElement",
                                                                    "argument": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 55,
                                                                        "end": 56
                                                                    },
                                                                    "start": 52,
                                                                    "end": 56
                                                                }
                                                            ],
                                                            "start": 51,
                                                            "end": 57
                                                        },
                                                        "right": {
                                                            "type": "CallExpression",
                                                            "arguments": [],
                                                            "callee": {
                                                                "type": "FunctionExpression",
                                                                "params": [],
                                                                "body": {
                                                                    "type": "BlockStatement",
                                                                    "body": [],
                                                                    "start": 71,
                                                                    "end": 74
                                                                },
                                                                "async": false,
                                                                "generator": false,
                                                                "expression": false,
                                                                "id": null,
                                                                "start": 60,
                                                                "end": 74
                                                            },
                                                            "start": 60,
                                                            "end": 76
                                                        },
                                                        "start": 51,
                                                        "end": 76
                                                    }
                                                ],
                                                "start": 50,
                                                "end": 77
                                            },
                                            "start": 50,
                                            "end": 77
                                        }
                                    ],
                                    "kind": "let",
                                    "start": 46,
                                    "end": 77
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "values",
                                                    "start": 83,
                                                    "end": 89
                                                }
                                            ],
                                            "start": 82,
                                            "end": 90
                                        }
                                    ],
                                    "start": 81,
                                    "end": 91
                                },
                                "await": true,
                                "start": 35,
                                "end": 108
                            }
                        ],
                        "start": 21,
                        "end": 120
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18
                    },
                    "start": 0,
                    "end": 120
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 120
        });
    });

    it('should parse const object pattern property object', () => {
        expect(parseScript(`async function *fn() {
            for await (const { w: { x, y, z } = { x: 4, y: 5, z: 6 } } of [{ w: { x: undefined, z: 7 } }]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 130,
                                    "end": 145,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 107
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "kind": "init",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "w",
                                                            "start": 54,
                                                            "end": 55,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 31
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 32
                                                                }
                                                            }
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "AssignmentPattern",
                                                            "left": {
                                                                "type": "ObjectPattern",
                                                                "properties": [
                                                                    {
                                                                        "type": "Property",
                                                                        "kind": "init",
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "x",
                                                                            "start": 59,
                                                                            "end": 60,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 2,
                                                                                    "column": 36
                                                                                },
                                                                                "end": {
                                                                                    "line": 2,
                                                                                    "column": 37
                                                                                }
                                                                            }
                                                                        },
                                                                        "computed": false,
                                                                        "value": {
                                                                            "type": "Identifier",
                                                                            "name": "x",
                                                                            "start": 59,
                                                                            "end": 60,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 2,
                                                                                    "column": 36
                                                                                },
                                                                                "end": {
                                                                                    "line": 2,
                                                                                    "column": 37
                                                                                }
                                                                            }
                                                                        },
                                                                        "method": false,
                                                                        "shorthand": true,
                                                                        "start": 59,
                                                                        "end": 60,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 36
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 37
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        "type": "Property",
                                                                        "kind": "init",
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "y",
                                                                            "start": 62,
                                                                            "end": 63,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 2,
                                                                                    "column": 39
                                                                                },
                                                                                "end": {
                                                                                    "line": 2,
                                                                                    "column": 40
                                                                                }
                                                                            }
                                                                        },
                                                                        "computed": false,
                                                                        "value": {
                                                                            "type": "Identifier",
                                                                            "name": "y",
                                                                            "start": 62,
                                                                            "end": 63,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 2,
                                                                                    "column": 39
                                                                                },
                                                                                "end": {
                                                                                    "line": 2,
                                                                                    "column": 40
                                                                                }
                                                                            }
                                                                        },
                                                                        "method": false,
                                                                        "shorthand": true,
                                                                        "start": 62,
                                                                        "end": 63,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 39
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 40
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        "type": "Property",
                                                                        "kind": "init",
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "z",
                                                                            "start": 65,
                                                                            "end": 66,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 2,
                                                                                    "column": 42
                                                                                },
                                                                                "end": {
                                                                                    "line": 2,
                                                                                    "column": 43
                                                                                }
                                                                            }
                                                                        },
                                                                        "computed": false,
                                                                        "value": {
                                                                            "type": "Identifier",
                                                                            "name": "z",
                                                                            "start": 65,
                                                                            "end": 66,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 2,
                                                                                    "column": 42
                                                                                },
                                                                                "end": {
                                                                                    "line": 2,
                                                                                    "column": 43
                                                                                }
                                                                            }
                                                                        },
                                                                        "method": false,
                                                                        "shorthand": true,
                                                                        "start": 65,
                                                                        "end": 66,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 42
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 43
                                                                            }
                                                                        }
                                                                    }
                                                                ],
                                                                "start": 57,
                                                                "end": 68,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 34
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 45
                                                                    }
                                                                }
                                                            },
                                                            "right": {
                                                                "type": "ObjectExpression",
                                                                "properties": [
                                                                    {
                                                                        "type": "Property",
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "x",
                                                                            "start": 73,
                                                                            "end": 74,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 2,
                                                                                    "column": 50
                                                                                },
                                                                                "end": {
                                                                                    "line": 2,
                                                                                    "column": 51
                                                                                }
                                                                            }
                                                                        },
                                                                        "value": {
                                                                            "type": "Literal",
                                                                            "value": 4,
                                                                            "start": 76,
                                                                            "end": 77,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 2,
                                                                                    "column": 53
                                                                                },
                                                                                "end": {
                                                                                    "line": 2,
                                                                                    "column": 54
                                                                                }
                                                                            },
                                                                            "raw": "4"
                                                                        },
                                                                        "kind": "init",
                                                                        "computed": false,
                                                                        "method": false,
                                                                        "shorthand": false,
                                                                        "start": 73,
                                                                        "end": 77,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 50
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 54
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        "type": "Property",
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "y",
                                                                            "start": 79,
                                                                            "end": 80,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 2,
                                                                                    "column": 56
                                                                                },
                                                                                "end": {
                                                                                    "line": 2,
                                                                                    "column": 57
                                                                                }
                                                                            }
                                                                        },
                                                                        "value": {
                                                                            "type": "Literal",
                                                                            "value": 5,
                                                                            "start": 82,
                                                                            "end": 83,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 2,
                                                                                    "column": 59
                                                                                },
                                                                                "end": {
                                                                                    "line": 2,
                                                                                    "column": 60
                                                                                }
                                                                            },
                                                                            "raw": "5"
                                                                        },
                                                                        "kind": "init",
                                                                        "computed": false,
                                                                        "method": false,
                                                                        "shorthand": false,
                                                                        "start": 79,
                                                                        "end": 83,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 56
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 60
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        "type": "Property",
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "z",
                                                                            "start": 85,
                                                                            "end": 86,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 2,
                                                                                    "column": 62
                                                                                },
                                                                                "end": {
                                                                                    "line": 2,
                                                                                    "column": 63
                                                                                }
                                                                            }
                                                                        },
                                                                        "value": {
                                                                            "type": "Literal",
                                                                            "value": 6,
                                                                            "start": 88,
                                                                            "end": 89,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 2,
                                                                                    "column": 65
                                                                                },
                                                                                "end": {
                                                                                    "line": 2,
                                                                                    "column": 66
                                                                                }
                                                                            },
                                                                            "raw": "6"
                                                                        },
                                                                        "kind": "init",
                                                                        "computed": false,
                                                                        "method": false,
                                                                        "shorthand": false,
                                                                        "start": 85,
                                                                        "end": 89,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 62
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 66
                                                                            }
                                                                        }
                                                                    }
                                                                ],
                                                                "start": 71,
                                                                "end": 91,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 48
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 68
                                                                    }
                                                                }
                                                            },
                                                            "start": 57,
                                                            "end": 91,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 34
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 68
                                                                }
                                                            }
                                                        },
                                                        "method": false,
                                                        "shorthand": false,
                                                        "start": 54,
                                                        "end": 91,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 31
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 68
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 52,
                                                "end": 93,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 29
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 70
                                                    }
                                                }
                                            },
                                            "start": 52,
                                            "end": 93,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 29
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 70
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "const",
                                    "start": 46,
                                    "end": 93,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 70
                                        }
                                    }
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ObjectExpression",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "w",
                                                        "start": 100,
                                                        "end": 101,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 77
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 78
                                                            }
                                                        }
                                                    },
                                                    "value": {
                                                        "type": "ObjectExpression",
                                                        "properties": [
                                                            {
                                                                "type": "Property",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "x",
                                                                    "start": 105,
                                                                    "end": 106,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 82
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 83
                                                                        }
                                                                    }
                                                                },
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "undefined",
                                                                    "start": 108,
                                                                    "end": 117,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 85
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 94
                                                                        }
                                                                    }
                                                                },
                                                                "kind": "init",
                                                                "computed": false,
                                                                "method": false,
                                                                "shorthand": false,
                                                                "start": 105,
                                                                "end": 117,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 82
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 94
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                "type": "Property",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "z",
                                                                    "start": 119,
                                                                    "end": 120,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 96
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 97
                                                                        }
                                                                    }
                                                                },
                                                                "value": {
                                                                    "type": "Literal",
                                                                    "value": 7,
                                                                    "start": 122,
                                                                    "end": 123,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 99
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 100
                                                                        }
                                                                    },
                                                                    "raw": "7"
                                                                },
                                                                "kind": "init",
                                                                "computed": false,
                                                                "method": false,
                                                                "shorthand": false,
                                                                "start": 119,
                                                                "end": 123,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 96
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 100
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        "start": 103,
                                                        "end": 125,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 80
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 102
                                                            }
                                                        }
                                                    },
                                                    "kind": "init",
                                                    "computed": false,
                                                    "method": false,
                                                    "shorthand": false,
                                                    "start": 100,
                                                    "end": 125,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 77
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 102
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 98,
                                            "end": 127,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 75
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 104
                                                }
                                            }
                                        }
                                    ],
                                    "start": 97,
                                    "end": 128,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 74
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 105
                                        }
                                    }
                                },
                                "await": true,
                                "start": 35,
                                "end": 145,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 21,
                        "end": 157,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    },
                    "start": 0,
                    "end": 157,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 4,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 157,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 11
                }
            }
        });
    });

    it('should parse const object pattern empty', () => {
        expect(parseScript(`async function *fn() {
            for await (const {} of [obj]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 65,
                                    "end": 80,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 42
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "left": {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "ObjectPattern",
                                                "properties": [],
                                                "start": 52,
                                                "end": 54,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 29
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 31
                                                    }
                                                }
                                            },
                                            "start": 52,
                                            "end": 54,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 29
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 31
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "const",
                                    "start": 46,
                                    "end": 54,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 31
                                        }
                                    }
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "Identifier",
                                            "name": "obj",
                                            "start": 59,
                                            "end": 62,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 36
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 39
                                                }
                                            }
                                        }
                                    ],
                                    "start": 58,
                                    "end": 63,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 35
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 40
                                        }
                                    }
                                },
                                "await": true,
                                "start": 35,
                                "end": 80,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 21,
                        "end": 92,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "async": true,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 16,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    },
                    "start": 0,
                    "end": 92,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 4,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 92,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 11
                }
            }
        });
    });

    it.skip('should parse object init function name arrow', () => {
        expect(parseScript(`async function fn() {
            for await ({ arrow = () => {} } of [{}]) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ForOfStatement",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 75,
                                    "end": 90,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 53
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "left": {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "arrow",
                                                "start": 47,
                                                "end": 52,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 25
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 30
                                                    }
                                                }
                                            },
                                            "value": {
                                                "type": "AssignmentPattern",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "arrow",
                                                    "start": 47,
                                                    "end": 52,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 25
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 30
                                                        }
                                                    }
                                                },
                                                "right": {
                                                    "type": "ArrowFunctionExpression",
                                                    "body": {
                                                        "type": "BlockStatement",
                                                        "body": [],
                                                        "start": 61,
                                                        "end": 63,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 39
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 41
                                                            }
                                                        }
                                                    },
                                                    "params": [],
                                                    "id": null,
                                                    "async": true,
                                                    "generator": false,
                                                    "expression": false,
                                                    "start": 55,
                                                    "end": 63,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 33
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 41
                                                        }
                                                    }
                                                },
                                                "start": 47,
                                                "end": 63,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 25
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 41
                                                    }
                                                }
                                            },
                                            "kind": "init",
                                            "computed": false,
                                            "method": false,
                                            "shorthand": true,
                                            "start": 47,
                                            "end": 63,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 25
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 41
                                                }
                                            }
                                        }
                                    ],
                                    "start": 45,
                                    "end": 65,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 43
                                        }
                                    }
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ObjectExpression",
                                            "properties": [],
                                            "start": 70,
                                            "end": 72,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 48
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 50
                                                }
                                            }
                                        }
                                    ],
                                    "start": 69,
                                    "end": 73,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 47
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 51
                                        }
                                    }
                                },
                                "await": true,
                                "start": 34,
                                "end": 90,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 20,
                        "end": 102,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 20
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "start": 15,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 15
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        }
                    },
                    "start": 0,
                    "end": 102,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 4,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 102,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 11
                }
            }
        });
    });
});