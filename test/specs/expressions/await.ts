import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Await', () => {

  it('should fail on invalid identifier inside an async function', () => {
    expect(() => {
        parseScript(`async function foo(await) { }`)
    }).to.throw();
});

it('should fail on invalid identifieri inside an async function with lineterminator', () => {
    expect(() => {
        parseScript(`async function wrap() {\nasync function await() { }\n}`)
    }).to.throw();
});

it('should fail on await binding identifier nested', () => {
    expect(() => {
        parseScript(`async function foo() {
            function await() {
            }
          }`)
    }).to.not.throw();
});

    it('should parse await as identifier', () => {
        expect(parseScript('await', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 5,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 5
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 5,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 5
                    }
                },
                "expression": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 5,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 5
                        }
                    },
                    "name": "await"
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse a call expression with "await" reference', () => {
        expect(parseScript('(async (a) => await a)', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 22
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 22,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 22
                    }
                },
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "start": 1,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 1
                        },
                        "end": {
                            "line": 1,
                            "column": 21
                        }
                    },
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": true,
                    "params": [{
                        "type": "Identifier",
                        "start": 8,
                        "end": 9,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        },
                        "name": "a"
                    }],
                    "body": {
                        "type": "AwaitExpression",
                        "start": 14,
                        "end": 21,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 14
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        },
                        "argument": {
                            "type": "Identifier",
                            "start": 20,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 20
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            },
                            "name": "a"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "async function foo(a, b) { await a + await b }"', () => {
        expect(parseScript('async function foo(a, b) { await a + await b }', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 46,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 46
                }
            },
            "body": [{
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 46,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 46
                    }
                },
                "id": {
                    "type": "Identifier",
                    "start": 15,
                    "end": 18,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 15
                        },
                        "end": {
                            "line": 1,
                            "column": 18
                        }
                    },
                    "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [{
                        "type": "Identifier",
                        "start": 19,
                        "end": 20,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 19
                            },
                            "end": {
                                "line": 1,
                                "column": 20
                            }
                        },
                        "name": "a"
                    },
                    {
                        "type": "Identifier",
                        "start": 22,
                        "end": 23,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 22
                            },
                            "end": {
                                "line": 1,
                                "column": 23
                            }
                        },
                        "name": "b"
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "start": 25,
                    "end": 46,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 25
                        },
                        "end": {
                            "line": 1,
                            "column": 46
                        }
                    },
                    "body": [{
                        "type": "ExpressionStatement",
                        "start": 27,
                        "end": 44,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 27
                            },
                            "end": {
                                "line": 1,
                                "column": 44
                            }
                        },
                        "expression": {
                            "type": "BinaryExpression",
                            "start": 27,
                            "end": 44,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 27
                                },
                                "end": {
                                    "line": 1,
                                    "column": 44
                                }
                            },
                            "left": {
                                "type": "AwaitExpression",
                                "start": 27,
                                "end": 34,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 27
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 34
                                    }
                                },
                                "argument": {
                                    "type": "Identifier",
                                    "start": 33,
                                    "end": 34,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 33
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 34
                                        }
                                    },
                                    "name": "a"
                                }
                            },
                            "operator": "+",
                            "right": {
                                "type": "AwaitExpression",
                                "start": 37,
                                "end": 44,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 37
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 44
                                    }
                                },
                                "argument": {
                                    "type": "Identifier",
                                    "start": 43,
                                    "end": 44,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 43
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 44
                                        }
                                    },
                                    "name": "b"
                                }
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "function foo() { await + 1 }"', () => {
        expect(parseScript('function foo() { await + 1 }', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "body": [{
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 28,
                "id": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 12,
                    "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "start": 15,
                    "end": 28,
                    "body": [{
                        "type": "ExpressionStatement",
                        "start": 17,
                        "end": 26,
                        "expression": {
                            "type": "BinaryExpression",
                            "start": 17,
                            "end": 26,
                            "left": {
                                "type": "Identifier",
                                "start": 17,
                                "end": 22,
                                "name": "await"
                            },
                            "operator": "+",
                            "right": {
                                "type": "Literal",
                                "start": 25,
                                "end": 26,
                                "value": 1,
                                "raw": "1"
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "async function foo() { await + 1 }"', () => {
        expect(parseScript('async function foo() { await + 1 }', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 34,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 34
                }
            },
            "body": [{
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 34,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 34
                    }
                },
                "id": {
                    "type": "Identifier",
                    "start": 15,
                    "end": 18,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 15
                        },
                        "end": {
                            "line": 1,
                            "column": 18
                        }
                    },
                    "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "start": 21,
                    "end": 34,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 21
                        },
                        "end": {
                            "line": 1,
                            "column": 34
                        }
                    },
                    "body": [{
                        "type": "ExpressionStatement",
                        "start": 23,
                        "end": 32,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 23
                            },
                            "end": {
                                "line": 1,
                                "column": 32
                            }
                        },
                        "expression": {
                            "type": "AwaitExpression",
                            "start": 23,
                            "end": 32,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 23
                                },
                                "end": {
                                    "line": 1,
                                    "column": 32
                                }
                            },
                            "argument": {
                                "type": "UnaryExpression",
                                "start": 29,
                                "end": 32,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 29
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                },
                                "operator": "+",
                                "prefix": true,
                                "argument": {
                                    "type": "Literal",
                                    "start": 31,
                                    "end": 32,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 31
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    },
                                    "value": 1,
                                    "raw": "1"
                                }
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse await as an identifier in a function', () => {
        expect(parseScript('async function foo(a = async function foo() { await b }) {}', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 59,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 59
                }
            },
            "body": [{
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 59,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 59
                    }
                },
                "id": {
                    "type": "Identifier",
                    "start": 15,
                    "end": 18,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 15
                        },
                        "end": {
                            "line": 1,
                            "column": 18
                        }
                    },
                    "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [{
                    "type": "AssignmentPattern",
                    "start": 19,
                    "end": 55,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 19
                        },
                        "end": {
                            "line": 1,
                            "column": 55
                        }
                    },
                    "left": {
                        "type": "Identifier",
                        "start": 19,
                        "end": 20,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 19
                            },
                            "end": {
                                "line": 1,
                                "column": 20
                            }
                        },
                        "name": "a"
                    },
                    "right": {
                        "type": "FunctionExpression",
                        "start": 23,
                        "end": 55,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 23
                            },
                            "end": {
                                "line": 1,
                                "column": 55
                            }
                        },
                        "id": {
                            "type": "Identifier",
                            "start": 38,
                            "end": 41,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 38
                                },
                                "end": {
                                    "line": 1,
                                    "column": 41
                                }
                            },
                            "name": "foo"
                        },
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 44,
                            "end": 55,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 44
                                },
                                "end": {
                                    "line": 1,
                                    "column": 55
                                }
                            },
                            "body": [{
                                "type": "ExpressionStatement",
                                "start": 46,
                                "end": 53,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 46
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 53
                                    }
                                },
                                "expression": {
                                    "type": "AwaitExpression",
                                    "start": 46,
                                    "end": 53,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 46
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 53
                                        }
                                    },
                                    "argument": {
                                        "type": "Identifier",
                                        "start": 52,
                                        "end": 53,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 52
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 53
                                            }
                                        },
                                        "name": "b"
                                    }
                                }
                            }]
                        }
                    }
                }],
                "body": {
                    "type": "BlockStatement",
                    "start": 57,
                    "end": 59,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 57
                        },
                        "end": {
                            "line": 1,
                            "column": 59
                        }
                    },
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse await in a generator as an identifier', () => {
        expect(parseScript('function* foo(await) { yield await; };', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 38,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 38
                }
            },
            "body": [{
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 37,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 37
                        }
                    },
                    "id": {
                        "type": "Identifier",
                        "start": 10,
                        "end": 13,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 10
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        },
                        "name": "foo"
                    },
                    "generator": true,
                    "expression": false,
                    "async": false,
                    "params": [{
                        "type": "Identifier",
                        "start": 14,
                        "end": 19,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 14
                            },
                            "end": {
                                "line": 1,
                                "column": 19
                            }
                        },
                        "name": "await"
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "start": 21,
                        "end": 37,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 1,
                                "column": 37
                            }
                        },
                        "body": [{
                            "type": "ExpressionStatement",
                            "start": 23,
                            "end": 35,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 23
                                },
                                "end": {
                                    "line": 1,
                                    "column": 35
                                }
                            },
                            "expression": {
                                "type": "YieldExpression",
                                "start": 23,
                                "end": 34,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 23
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 34
                                    }
                                },
                                "delegate": false,
                                "argument": {
                                    "type": "Identifier",
                                    "start": 29,
                                    "end": 34,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 29
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 34
                                        }
                                    },
                                    "name": "await"
                                }
                            }
                        }]
                    }
                },
                {
                    "type": "EmptyStatement",
                    "start": 37,
                    "end": 38,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 37
                        },
                        "end": {
                            "line": 1,
                            "column": 38
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse a call expression with "await" reference', () => {
        expect(parseScript('(async (a) => await a)', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 22
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 22,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 22
                    }
                },
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "start": 1,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 1
                        },
                        "end": {
                            "line": 1,
                            "column": 21
                        }
                    },
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": true,
                    "params": [{
                        "type": "Identifier",
                        "start": 8,
                        "end": 9,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        },
                        "name": "a"
                    }],
                    "body": {
                        "type": "AwaitExpression",
                        "start": 14,
                        "end": 21,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 14
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        },
                        "argument": {
                            "type": "Identifier",
                            "start": 20,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 20
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            },
                            "name": "a"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse a call expression with "await" reference', () => {
        expect(parseScript('async (await)', {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 13,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "expression": {
                    "type": "CallExpression",
                    "start": 0,
                    "end": 13,
                    "callee": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 5,
                        "name": "async"
                    },
                    "arguments": [{
                        "type": "Identifier",
                        "start": 7,
                        "end": 12,
                        "name": "await"
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it.skip('should parse await in function', () => {
        expect(parseScript('function foo(await) { return await; }', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 37,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 37
            }
          },
          "body": [
            {
              "type": "FunctionDeclaration",
              "start": 0,
              "end": 37,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 37
                }
              },
              "id": {
                "type": "Identifier",
                "start": 9,
                "end": 12,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 9
                  },
                  "end": {
                    "line": 1,
                    "column": 12
                  }
                },
                "name": "foo"
              },
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 13,
                  "end": 18,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 1,
                      "column": 18
                    }
                  },
                  "name": "await"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 20,
                "end": 37,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 20
                  },
                  "end": {
                    "line": 1,
                    "column": 37
                  }
                },
                "body": [
                  {
                    "type": "ReturnStatement",
                    "start": 22,
                    "end": 35,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 22
                      },
                      "end": {
                        "line": 1,
                        "column": 35
                      }
                    },
                    "argument": {
                      "type": "Identifier",
                      "start": 29,
                      "end": 34,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 29
                        },
                        "end": {
                          "line": 1,
                          "column": 34
                        }
                      },
                      "name": "await"
                    }
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it.skip('should parse await in nested generator', () => {
        expect(parseScript(`async function foo() {
          function* bar() {
            await = 1;
          }
          bar().next();
        }
        foo();`, {
            ranges: true,
            raw: true,
            locations: true,
            next: true
        })).to.eql({});
    });

    it('should parse await as unary expression', () => {
        expect(parseScript(`async function foo() {
           y = await x++;
        }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 58,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 9
            }
          },
          "body": [
            {
              "type": "FunctionDeclaration",
              "start": 0,
              "end": 58,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 3,
                  "column": 9
                }
              },
              "id": {
                "type": "Identifier",
                "start": 15,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 15
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "name": "foo"
              },
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 21,
                "end": 58,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 21
                  },
                  "end": {
                    "line": 3,
                    "column": 9
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 34,
                    "end": 48,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 11
                      },
                      "end": {
                        "line": 2,
                        "column": 25
                      }
                    },
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 34,
                      "end": 47,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 11
                        },
                        "end": {
                          "line": 2,
                          "column": 24
                        }
                      },
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "start": 34,
                        "end": 35,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 11
                          },
                          "end": {
                            "line": 2,
                            "column": 12
                          }
                        },
                        "name": "y"
                      },
                      "right": {
                        "type": "AwaitExpression",
                        "start": 38,
                        "end": 47,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 15
                          },
                          "end": {
                            "line": 2,
                            "column": 24
                          }
                        },
                        "argument": {
                          "type": "UpdateExpression",
                          "start": 44,
                          "end": 47,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 21
                            },
                            "end": {
                              "line": 2,
                              "column": 24
                            }
                          },
                          "operator": "++",
                          "prefix": false,
                          "argument": {
                            "type": "Identifier",
                            "start": 44,
                            "end": 45,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 21
                              },
                              "end": {
                                "line": 2,
                                "column": 22
                              }
                            },
                            "name": "x"
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse await expressions in async function', () => {
        expect(parseScript('async function foo(a, b) { await a }', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 36,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 36
            }
          },
          "body": [
            {
              "type": "FunctionDeclaration",
              "start": 0,
              "end": 36,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 36
                }
              },
              "id": {
                "type": "Identifier",
                "start": 15,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 15
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "name": "foo"
              },
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 19,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 19
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "name": "a"
                },
                {
                  "type": "Identifier",
                  "start": 22,
                  "end": 23,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 22
                    },
                    "end": {
                      "line": 1,
                      "column": 23
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 25,
                "end": 36,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 25
                  },
                  "end": {
                    "line": 1,
                    "column": 36
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 27,
                    "end": 34,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 27
                      },
                      "end": {
                        "line": 1,
                        "column": 34
                      }
                    },
                    "expression": {
                      "type": "AwaitExpression",
                      "start": 27,
                      "end": 34,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 27
                        },
                        "end": {
                          "line": 1,
                          "column": 34
                        }
                      },
                      "argument": {
                        "type": "Identifier",
                        "start": 33,
                        "end": 34,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 33
                          },
                          "end": {
                            "line": 1,
                            "column": 34
                          }
                        },
                        "name": "a"
                      }
                    }
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse await expressions are an unary expression', () => {
        expect(parseScript('async function foo(a, b) { await a + await b }', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 46,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 46
            }
          },
          "body": [
            {
              "type": "FunctionDeclaration",
              "start": 0,
              "end": 46,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 46
                }
              },
              "id": {
                "type": "Identifier",
                "start": 15,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 15
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "name": "foo"
              },
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 19,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 19
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "name": "a"
                },
                {
                  "type": "Identifier",
                  "start": 22,
                  "end": 23,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 22
                    },
                    "end": {
                      "line": 1,
                      "column": 23
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 25,
                "end": 46,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 25
                  },
                  "end": {
                    "line": 1,
                    "column": 46
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 27,
                    "end": 44,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 27
                      },
                      "end": {
                        "line": 1,
                        "column": 44
                      }
                    },
                    "expression": {
                      "type": "BinaryExpression",
                      "start": 27,
                      "end": 44,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 27
                        },
                        "end": {
                          "line": 1,
                          "column": 44
                        }
                      },
                      "left": {
                        "type": "AwaitExpression",
                        "start": 27,
                        "end": 34,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 27
                          },
                          "end": {
                            "line": 1,
                            "column": 34
                          }
                        },
                        "argument": {
                          "type": "Identifier",
                          "start": 33,
                          "end": 34,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 33
                            },
                            "end": {
                              "line": 1,
                              "column": 34
                            }
                          },
                          "name": "a"
                        }
                      },
                      "operator": "+",
                      "right": {
                        "type": "AwaitExpression",
                        "start": 37,
                        "end": 44,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 37
                          },
                          "end": {
                            "line": 1,
                            "column": 44
                          }
                        },
                        "argument": {
                          "type": "Identifier",
                          "start": 43,
                          "end": 44,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 43
                            },
                            "end": {
                              "line": 1,
                              "column": 44
                            }
                          },
                          "name": "b"
                        }
                      }
                    }
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse "await + 1" as a binary expression outside of async function', () => {
        expect(parseScript('function foo() { await + 1 }', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 28,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 28
            }
          },
          "body": [
            {
              "type": "FunctionDeclaration",
              "start": 0,
              "end": 28,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 28
                }
              },
              "id": {
                "type": "Identifier",
                "start": 9,
                "end": 12,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 9
                  },
                  "end": {
                    "line": 1,
                    "column": 12
                  }
                },
                "name": "foo"
              },
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 15,
                "end": 28,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 15
                  },
                  "end": {
                    "line": 1,
                    "column": 28
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 17,
                    "end": 26,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 17
                      },
                      "end": {
                        "line": 1,
                        "column": 26
                      }
                    },
                    "expression": {
                      "type": "BinaryExpression",
                      "start": 17,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 17
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "left": {
                        "type": "Identifier",
                        "start": 17,
                        "end": 22,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 17
                          },
                          "end": {
                            "line": 1,
                            "column": 22
                          }
                        },
                        "name": "await"
                      },
                      "operator": "+",
                      "right": {
                        "type": "Literal",
                        "start": 25,
                        "end": 26,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 25
                          },
                          "end": {
                            "line": 1,
                            "column": 26
                          }
                        },
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse "await + 1" as an await expression in async functions', () => {
      expect(parseScript('async function foo() { await + 1 }', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 34,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 34
          }
        },
        "body": [
          {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 34,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 34
              }
            },
            "id": {
              "type": "Identifier",
              "start": 15,
              "end": 18,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 15
                },
                "end": {
                  "line": 1,
                  "column": 18
                }
              },
              "name": "foo"
            },
            "generator": false,
            "expression": false,
            "async": true,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 21,
              "end": 34,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 21
                },
                "end": {
                  "line": 1,
                  "column": 34
                }
              },
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 23,
                  "end": 32,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 23
                    },
                    "end": {
                      "line": 1,
                      "column": 32
                    }
                  },
                  "expression": {
                    "type": "AwaitExpression",
                    "start": 23,
                    "end": 32,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 23
                      },
                      "end": {
                        "line": 1,
                        "column": 32
                      }
                    },
                    "argument": {
                      "type": "UnaryExpression",
                      "start": 29,
                      "end": 32,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 29
                        },
                        "end": {
                          "line": 1,
                          "column": 32
                        }
                      },
                      "operator": "+",
                      "prefix": true,
                      "argument": {
                        "type": "Literal",
                        "start": 31,
                        "end": 32,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 31
                          },
                          "end": {
                            "line": 1,
                            "column": 32
                          }
                        },
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should allow await expressions inside functions in default parameters', () => {
      expect(parseScript('async function foo(a = async function foo() { await b }) {}', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 59,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 59
          }
        },
        "body": [
          {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 59,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 59
              }
            },
            "id": {
              "type": "Identifier",
              "start": 15,
              "end": 18,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 15
                },
                "end": {
                  "line": 1,
                  "column": 18
                }
              },
              "name": "foo"
            },
            "generator": false,
            "expression": false,
            "async": true,
            "params": [
              {
                "type": "AssignmentPattern",
                "start": 19,
                "end": 55,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 19
                  },
                  "end": {
                    "line": 1,
                    "column": 55
                  }
                },
                "left": {
                  "type": "Identifier",
                  "start": 19,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 19
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "name": "a"
                },
                "right": {
                  "type": "FunctionExpression",
                  "start": 23,
                  "end": 55,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 23
                    },
                    "end": {
                      "line": 1,
                      "column": 55
                    }
                  },
                  "id": {
                    "type": "Identifier",
                    "start": 38,
                    "end": 41,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 38
                      },
                      "end": {
                        "line": 1,
                        "column": 41
                      }
                    },
                    "name": "foo"
                  },
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 44,
                    "end": 55,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 44
                      },
                      "end": {
                        "line": 1,
                        "column": 55
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 46,
                        "end": 53,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 46
                          },
                          "end": {
                            "line": 1,
                            "column": 53
                          }
                        },
                        "expression": {
                          "type": "AwaitExpression",
                          "start": 46,
                          "end": 53,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 46
                            },
                            "end": {
                              "line": 1,
                              "column": 53
                            }
                          },
                          "argument": {
                            "type": "Identifier",
                            "start": 52,
                            "end": 53,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 52
                              },
                              "end": {
                                "line": 1,
                                "column": 53
                              }
                            },
                            "name": "b"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 57,
              "end": 59,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 57
                },
                "end": {
                  "line": 1,
                  "column": 59
                }
              },
              "body": []
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should distinguish ParenthesizedExpression or ArrowFunctionExpression', () => {
      expect(parseScript('async function wrap() {\n(a = await b)\n}', {
          ranges: true,
          raw: true,
          locations: false
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 39,
        "body": [
          {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 39,
            "id": {
              "type": "Identifier",
              "start": 15,
              "end": 19,
              "name": "wrap"
            },
            "generator": false,
            "expression": false,
            "async": true,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 22,
              "end": 39,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 24,
                  "end": 37,
                  "expression": {
                    "type": "AssignmentExpression",
                    "start": 25,
                    "end": 36,
                    "operator": "=",
                    "left": {
                      "type": "Identifier",
                      "start": 25,
                      "end": 26,
                      "name": "a"
                    },
                    "right": {
                      "type": "AwaitExpression",
                      "start": 29,
                      "end": 36,
                      "argument": {
                        "type": "Identifier",
                        "start": 35,
                        "end": 36,
                        "name": "b"
                      }
                    }
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse https://github.com/ternjs/acorn/issues/464"', () => {
      expect(parseScript('f = ({ w = counter(), x = counter(), y = counter(), z = counter() } = { w: null, x: 0, y: false, z: "" }) => {}', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 111,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 111
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 111,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 111
              }
            },
            "expression": {
              "type": "AssignmentExpression",
              "start": 0,
              "end": 111,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 111
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "start": 0,
                "end": 1,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 1
                  }
                },
                "name": "f"
              },
              "right": {
                "type": "ArrowFunctionExpression",
                "start": 4,
                "end": 111,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 4
                  },
                  "end": {
                    "line": 1,
                    "column": 111
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 5,
                    "end": 104,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 5
                      },
                      "end": {
                        "line": 1,
                        "column": 104
                      }
                    },
                    "left": {
                      "type": "ObjectPattern",
                      "start": 5,
                      "end": 67,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 5
                        },
                        "end": {
                          "line": 1,
                          "column": 67
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 7,
                          "end": 20,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 20
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 7,
                            "end": 8,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 7
                              },
                              "end": {
                                "line": 1,
                                "column": 8
                              }
                            },
                            "name": "w"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 7,
                            "end": 20,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 7
                              },
                              "end": {
                                "line": 1,
                                "column": 20
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 7,
                              "end": 8,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 7
                                },
                                "end": {
                                  "line": 1,
                                  "column": 8
                                }
                              },
                              "name": "w"
                            },
                            "right": {
                              "type": "CallExpression",
                              "start": 11,
                              "end": 20,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 11
                                },
                                "end": {
                                  "line": 1,
                                  "column": 20
                                }
                              },
                              "callee": {
                                "type": "Identifier",
                                "start": 11,
                                "end": 18,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 11
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 18
                                  }
                                },
                                "name": "counter"
                              },
                              "arguments": []
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 22,
                          "end": 35,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 22
                            },
                            "end": {
                              "line": 1,
                              "column": 35
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 22,
                            "end": 23,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 22
                              },
                              "end": {
                                "line": 1,
                                "column": 23
                              }
                            },
                            "name": "x"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 22,
                            "end": 35,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 22
                              },
                              "end": {
                                "line": 1,
                                "column": 35
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 22,
                              "end": 23,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 22
                                },
                                "end": {
                                  "line": 1,
                                  "column": 23
                                }
                              },
                              "name": "x"
                            },
                            "right": {
                              "type": "CallExpression",
                              "start": 26,
                              "end": 35,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 26
                                },
                                "end": {
                                  "line": 1,
                                  "column": 35
                                }
                              },
                              "callee": {
                                "type": "Identifier",
                                "start": 26,
                                "end": 33,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 26
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 33
                                  }
                                },
                                "name": "counter"
                              },
                              "arguments": []
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 37,
                          "end": 50,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 37
                            },
                            "end": {
                              "line": 1,
                              "column": 50
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 37,
                            "end": 38,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 37
                              },
                              "end": {
                                "line": 1,
                                "column": 38
                              }
                            },
                            "name": "y"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 37,
                            "end": 50,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 37
                              },
                              "end": {
                                "line": 1,
                                "column": 50
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 37,
                              "end": 38,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 37
                                },
                                "end": {
                                  "line": 1,
                                  "column": 38
                                }
                              },
                              "name": "y"
                            },
                            "right": {
                              "type": "CallExpression",
                              "start": 41,
                              "end": 50,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 41
                                },
                                "end": {
                                  "line": 1,
                                  "column": 50
                                }
                              },
                              "callee": {
                                "type": "Identifier",
                                "start": 41,
                                "end": 48,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 41
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 48
                                  }
                                },
                                "name": "counter"
                              },
                              "arguments": []
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 52,
                          "end": 65,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 52
                            },
                            "end": {
                              "line": 1,
                              "column": 65
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 52,
                            "end": 53,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 52
                              },
                              "end": {
                                "line": 1,
                                "column": 53
                              }
                            },
                            "name": "z"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 52,
                            "end": 65,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 52
                              },
                              "end": {
                                "line": 1,
                                "column": 65
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 52,
                              "end": 53,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 52
                                },
                                "end": {
                                  "line": 1,
                                  "column": 53
                                }
                              },
                              "name": "z"
                            },
                            "right": {
                              "type": "CallExpression",
                              "start": 56,
                              "end": 65,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 56
                                },
                                "end": {
                                  "line": 1,
                                  "column": 65
                                }
                              },
                              "callee": {
                                "type": "Identifier",
                                "start": 56,
                                "end": 63,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 56
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 63
                                  }
                                },
                                "name": "counter"
                              },
                              "arguments": []
                            }
                          }
                        }
                      ]
                    },
                    "right": {
                      "type": "ObjectExpression",
                      "start": 70,
                      "end": 104,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 70
                        },
                        "end": {
                          "line": 1,
                          "column": 104
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 72,
                          "end": 79,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 72
                            },
                            "end": {
                              "line": 1,
                              "column": 79
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 72,
                            "end": 73,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 72
                              },
                              "end": {
                                "line": 1,
                                "column": 73
                              }
                            },
                            "name": "w"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 75,
                            "end": 79,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 75
                              },
                              "end": {
                                "line": 1,
                                "column": 79
                              }
                            },
                            "value": null,
                            "raw": "null"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 81,
                          "end": 85,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 81
                            },
                            "end": {
                              "line": 1,
                              "column": 85
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 81,
                            "end": 82,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 81
                              },
                              "end": {
                                "line": 1,
                                "column": 82
                              }
                            },
                            "name": "x"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 84,
                            "end": 85,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 84
                              },
                              "end": {
                                "line": 1,
                                "column": 85
                              }
                            },
                            "value": 0,
                            "raw": "0"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 87,
                          "end": 95,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 87
                            },
                            "end": {
                              "line": 1,
                              "column": 95
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 87,
                            "end": 88,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 87
                              },
                              "end": {
                                "line": 1,
                                "column": 88
                              }
                            },
                            "name": "y"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 90,
                            "end": 95,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 90
                              },
                              "end": {
                                "line": 1,
                                "column": 95
                              }
                            },
                            "value": false,
                            "raw": "false"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 97,
                          "end": 102,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 97
                            },
                            "end": {
                              "line": 1,
                              "column": 102
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 97,
                            "end": 98,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 97
                              },
                              "end": {
                                "line": 1,
                                "column": 98
                              }
                            },
                            "name": "z"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 100,
                            "end": 102,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 100
                              },
                              "end": {
                                "line": 1,
                                "column": 102
                              }
                            },
                            "value": "",
                            "raw": "\"\""
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 109,
                  "end": 111,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 109
                    },
                    "end": {
                      "line": 1,
                      "column": 111
                    }
                  },
                  "body": []
                }
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "await + 1" as a binary expression outside of async function', () => {
      expect(parseScript('({ async: true })', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 17,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 17
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 17,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 17
              }
            },
            "expression": {
              "type": "ObjectExpression",
              "start": 1,
              "end": 16,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 1
                },
                "end": {
                  "line": 1,
                  "column": 16
                }
              },
              "properties": [
                {
                  "type": "Property",
                  "start": 3,
                  "end": 14,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 3
                    },
                    "end": {
                      "line": 1,
                      "column": 14
                    }
                  },
                  "method": false,
                  "shorthand": false,
                  "computed": false,
                  "key": {
                    "type": "Identifier",
                    "start": 3,
                    "end": 8,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 3
                      },
                      "end": {
                        "line": 1,
                        "column": 8
                      }
                    },
                    "name": "async"
                  },
                  "value": {
                    "type": "Literal",
                    "start": 10,
                    "end": 14,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 10
                      },
                      "end": {
                        "line": 1,
                        "column": 14
                      }
                    },
                    "value": true,
                    "raw": "true"
                  },
                  "kind": "init"
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });

});