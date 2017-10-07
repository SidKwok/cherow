import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Async', () => {
    
        it('should fail on async generators if options aren\'t set for it', () => {
            expect(() => {
                parseScript(`x = { async *g() {} }`, {});
            }).to.throw();
        });

        it('should fail on "({async foo(a = await b) {}})"', () => {
            expect(() => {
                parseScript(`({async foo(a = await b) {}})`);
            }).to.not.throw();
        });

        it('should fail on invalid async getter', () => {
            expect(() => {
                parseScript(`x = { async get g() {} }`, {});
            }).to.not.throw();
        });

        it('should fail if formal parameter contains super call"', () => {
            expect(() => {
                parseScript(`(async function foo (foo = super()) { var bar; });`)
            }).to.throw();
        });
    
        it('should fail if contain eval (strict)"', () => {
            expect(() => {
                parseScript(`"use strict"; (async function eval () { })`)
            }).to.throw();
        });
    
        it('should fail on duplicates"', () => {
            expect(() => {
                parseScript(`(async function foo (bar) { let bar; });`)
            }).to.throw();
        });
    
        it('should fail on await as identifier reference', () => {
            expect(() => {
                parseScript(`var fn = async function () {
                void await;
              };`)
            }).to.not.throw();
        });
    
        it('should fail on await as label identifier', () => {
            expect(() => {
                parseScript(`var fn = async function () {
                await: ;
              };`)
            }).to.throw();
        });
    
        it('should fail on async a"', () => {
            expect(() => {
                parseScript(`async a`)
            }).to.throw();
        });
    
        it('should fail on "* ()"', () => {
            expect(() => {
                parseScript(`* ()`);
            }).to.throw();
        });
    
        it('should fail on "await = 0"', () => {
            expect(() => {
                parseModule(`await = 0`);
              }).to.not.throw();
        });
    
        it('should fail on "({async foo() { return {await} }})"', () => {
            expect(() => {
                parseScript(`({async foo() { return {await} }})`);
            }).to.throw();
        });
    
        it('should fail on "({async foo: 1})"', () => {
            expect(() => {
                parseScript(`({async foo: 1})`);
            }).to.throw();
        });
    
        it('should fail on "async ({a = b})"', () => {
            expect(() => {
                parseScript(`async ({a = b})`);
            }).to.not.throw();
        });
    
        it('should fail on "({async\nfoo() { }})"', () => {
            expect(() => {
                parseScript(`({async\nfoo() { }})`);
            }).to.not.throw();
        });
    
        it('should fail on "({async set foo(value) { }})"', () => {
            expect(() => {
                parseScript(`({async set foo(value) { }})`);
            }).to.not.throw();
        });
    
        it('should fail on async generators if options aren\'t set for it', () => {
            expect(() => {
                parseScript(`x = { async *g() {} }`, {});
            }).to.throw();
        });
    
        it('should fail on "({async foo(a = await b) {}})"', () => {
            expect(() => {
                parseScript(`({async foo(a = await b) {}})`);
            }).to.not.throw();
        });
    
        it('should fail on invalid async getter', () => {
            expect(() => {
                parseScript(`x = { async get g() {} }`, {});
            }).to.not.throw();
        });
    
    
        it('should fail on invalid method', () => {
            expect(() => {
                parseScript(`x = { async f: function() {} }`, {});
            }).to.throw();
        });
    
        it('should fail on invalid method', () => {
            expect(() => {
                parseScript(`x = { async f = function() {} }`, {});
            }).to.throw();
        });
    
        it('should parse argument async call', () => {
            expect(parseScript(`f(x, async(y, z))`, {
                ranges: true,
                raw: true,
                locations: true,
                next: true
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
                "body": [{
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
                        "type": "CallExpression",
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
                        "callee": {
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
                        "arguments": [{
                                "type": "Identifier",
                                "start": 2,
                                "end": 3,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 2
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 3
                                    }
                                },
                                "name": "x"
                            },
                            {
                                "type": "CallExpression",
                                "start": 5,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 5
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                },
                                "callee": {
                                    "type": "Identifier",
                                    "start": 5,
                                    "end": 10,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 5
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 10
                                        }
                                    },
                                    "name": "async"
                                },
                                "arguments": [{
                                        "type": "Identifier",
                                        "start": 11,
                                        "end": 12,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 11
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 12
                                            }
                                        },
                                        "name": "y"
                                    },
                                    {
                                        "type": "Identifier",
                                        "start": 14,
                                        "end": 15,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 14
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 15
                                            }
                                        },
                                        "name": "z"
                                    }
                                ]
                            }
                        ]
                    }
                }],
                "sourceType": "script"
            });
        });
        it('should parse async arrow parameter', () => {
            expect(parseScript(`async => 42;`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 12,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 12
                    }
                },
                "body": [{
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    },
                    "expression": {
                        "type": "ArrowFunctionExpression",
                        "start": 0,
                        "end": 11,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 11
                            }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
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
                            "name": "async"
                        }],
                        "body": {
                            "type": "Literal",
                            "start": 9,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 9
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            },
                            "value": 42,
                            "raw": "42"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse call async await', () => {
            expect(parseScript(`a = async(await);`, {
                ranges: true,
                raw: true,
                locations: true,
                next: true
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
                "body": [{
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
                        "type": "AssignmentExpression",
                        "start": 0,
                        "end": 16,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 16
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
                            "name": "a"
                        },
                        "right": {
                            "type": "CallExpression",
                            "start": 4,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            },
                            "callee": {
                                "type": "Identifier",
                                "start": 4,
                                "end": 9,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 9
                                    }
                                },
                                "name": "async"
                            },
                            "arguments": [{
                                "type": "Identifier",
                                "start": 10,
                                "end": 15,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 15
                                    }
                                },
                                "name": "await"
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
        it('should parse expression async', () => {
            expect(parseScript(`a = async
          function f(){}`, {
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
                    "line": 2,
                    "column": 24
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 9,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 9
                      }
                    },
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 0,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 1,
                          "column": 9
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
                        "name": "a"
                      },
                      "right": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 9,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 9
                          }
                        },
                        "name": "async"
                      }
                    }
                  },
                  {
                    "type": "FunctionDeclaration",
                    "start": 20,
                    "end": 34,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 10
                      },
                      "end": {
                        "line": 2,
                        "column": 24
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 29,
                      "end": 30,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 19
                        },
                        "end": {
                          "line": 2,
                          "column": 20
                        }
                      },
                      "name": "f"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 32,
                      "end": 34,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 22
                        },
                        "end": {
                          "line": 2,
                          "column": 24
                        }
                      },
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse identifier async', () => {
            expect(parseScript(`async; async = 3;`, {
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
                "body": [{
                        "type": "ExpressionStatement",
                        "start": 0,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 6
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
                            "name": "async"
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "start": 7,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        },
                        "expression": {
                            "type": "AssignmentExpression",
                            "start": 7,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            },
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "start": 7,
                                "end": 12,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 7
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 12
                                    }
                                },
                                "name": "async"
                            },
                            "right": {
                                "type": "Literal",
                                "start": 15,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                },
                                "value": 3,
                                "raw": "3"
                            }
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse label async', () => {
            expect(parseScript(`async: function f() {}`, {
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
                    "type": "LabeledStatement",
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
                    "body": {
                        "type": "FunctionDeclaration",
                        "start": 7,
                        "end": 22,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 22
                            }
                        },
                        "id": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 16
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
                                }
                            },
                            "name": "f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 20,
                            "end": 22,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 20
                                },
                                "end": {
                                    "line": 1,
                                    "column": 22
                                }
                            },
                            "body": []
                        }
                    },
                    "label": {
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
                        "name": "async"
                    }
                }],
                "sourceType": "script"
            });
        });
         
        it('should parse async as an identifier', () => {
            expect(parseScript('typeof async == "string"', {
                raw: true,
                ranges: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 24,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 24
                    }
                },
                "body": [{
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 24,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 24
                        }
                    },
                    "expression": {
                        "type": "BinaryExpression",
                        "start": 0,
                        "end": 24,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 24
                            }
                        },
                        "left": {
                            "type": "UnaryExpression",
                            "start": 0,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
                                }
                            },
                            "operator": "typeof",
                            "prefix": true,
                            "argument": {
                                "type": "Identifier",
                                "start": 7,
                                "end": 12,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 7
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 12
                                    }
                                },
                                "name": "async"
                            }
                        },
                        "operator": "==",
                        "right": {
                            "type": "Literal",
                            "start": 16,
                            "end": 24,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 16
                                },
                                "end": {
                                    "line": 1,
                                    "column": 24
                                }
                            },
                            "value": "string",
                            "raw": "\"string\""
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse async as an identifier module code', () => {
            expect(parseModule('async', {
                raw: true,
                ranges: true,
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
                        "name": "async"
                    }
                }],
                "sourceType": "module"
            });
        });
    
        it('should parse async as an member expression', () => {
            expect(parseScript('async.abc', {
                raw: true,
                ranges: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 9,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 9
                    }
                },
                "body": [{
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 9,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 9
                        }
                    },
                    "expression": {
                        "type": "MemberExpression",
                        "start": 0,
                        "end": 9,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        },
                        "object": {
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
                            "name": "async"
                        },
                        "property": {
                            "type": "Identifier",
                            "start": 6,
                            "end": 9,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 9
                                }
                            },
                            "name": "abc"
                        },
                        "computed": false
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse async as an identifier in blockstatement', () => {
            expect(parseScript('{ async, foo }', {
                raw: true,
                ranges: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 14,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 14
                  }
                },
                "body": [
                  {
                    "type": "BlockStatement",
                    "start": 0,
                    "end": 14,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 14
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 2,
                        "end": 12,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 12
                          }
                        },
                        "expression": {
                          "type": "SequenceExpression",
                          "start": 2,
                          "end": 12,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 12
                            }
                          },
                          "expressions": [
                            {
                              "type": "Identifier",
                              "start": 2,
                              "end": 7,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 2
                                },
                                "end": {
                                  "line": 1,
                                  "column": 7
                                }
                              },
                              "name": "async"
                            },
                            {
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
                            }
                          ]
                        }
                      }
                    ]
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse async as an identifier', () => {
            expect(parseScript('({async})', {
                raw: true,
                ranges: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 9,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 9
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 9,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 9
                      }
                    },
                    "expression": {
                      "type": "ObjectExpression",
                      "start": 1,
                      "end": 8,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 8
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 2,
                          "end": 7,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 7
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 7,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 7
                              }
                            },
                            "name": "async"
                          },
                          "kind": "init",
                          "value": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 7,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 7
                              }
                            },
                            "name": "async"
                          }
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse async as an identifier', () => {
            expect(parseScript('({ async delete() {} })', {
                raw: true,
                ranges: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 23,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 23
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 23,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 23
                      }
                    },
                    "expression": {
                      "type": "ObjectExpression",
                      "start": 1,
                      "end": 22,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 22
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 3,
                          "end": 20,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 3
                            },
                            "end": {
                              "line": 1,
                              "column": 20
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 15,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 9
                              },
                              "end": {
                                "line": 1,
                                "column": 15
                              }
                            },
                            "name": "delete"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 15,
                            "end": 20,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 15
                              },
                              "end": {
                                "line": 1,
                                "column": 20
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 18,
                              "end": 20,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 18
                                },
                                "end": {
                                  "line": 1,
                                  "column": 20
                                }
                              },
                              "body": []
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
    
        it('should parse async as an identifier', () => {
            expect(parseScript('({ async: true })', {
                raw: true,
                ranges: true,
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
    
        it('should parse literal', () => {
            expect(parseScript('({ async "xyz"() {} })', {
                raw: true,
                ranges: true,
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
                "body": [
                  {
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
                      "type": "ObjectExpression",
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
                      "properties": [
                        {
                          "type": "Property",
                          "start": 3,
                          "end": 19,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 3
                            },
                            "end": {
                              "line": 1,
                              "column": 19
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Literal",
                            "start": 9,
                            "end": 14,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 9
                              },
                              "end": {
                                "line": 1,
                                "column": 14
                              }
                            },
                            "value": "xyz",
                            "raw": "\"xyz\""
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
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
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 17,
                              "end": 19,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 17
                                },
                                "end": {
                                  "line": 1,
                                  "column": 19
                                }
                              },
                              "body": []
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
    
        it('should parse method', () => {
            expect(parseScript(`obj = { async method() {} };`, {
                raw: true,
                locations: true,
                ranges: true
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
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 0,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 3,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 0
                          },
                          "end": {
                            "line": 1,
                            "column": 3
                          }
                        },
                        "name": "obj"
                      },
                      "right": {
                        "type": "ObjectExpression",
                        "start": 6,
                        "end": 27,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 6
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "properties": [
                          {
                            "type": "Property",
                            "start": 8,
                            "end": 25,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 8
                              },
                              "end": {
                                "line": 1,
                                "column": 25
                              }
                            },
                            "method": true,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 14,
                              "end": 20,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 14
                                },
                                "end": {
                                  "line": 1,
                                  "column": 20
                                }
                              },
                              "name": "method"
                            },
                            "kind": "init",
                            "value": {
                              "type": "FunctionExpression",
                              "start": 20,
                              "end": 25,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 20
                                },
                                "end": {
                                  "line": 1,
                                  "column": 25
                                }
                              },
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": true,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 23,
                                "end": 25,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 23
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 25
                                  }
                                },
                                "body": []
                              }
                            }
                          }
                        ]
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
    
        it('should parse number', () => {
            expect(parseScript('({ async 3() {} })', {
                raw: true,
                locations: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 18,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "expression": {
                      "type": "ObjectExpression",
                      "start": 1,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 3,
                          "end": 15,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 3
                            },
                            "end": {
                              "line": 1,
                              "column": 15
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Literal",
                            "start": 9,
                            "end": 10,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 9
                              },
                              "end": {
                                "line": 1,
                                "column": 10
                              }
                            },
                            "value": 3,
                            "raw": "3"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 10,
                            "end": 15,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 10
                              },
                              "end": {
                                "line": 1,
                                "column": 15
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 13,
                              "end": 15,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 13
                                },
                                "end": {
                                  "line": 1,
                                  "column": 15
                                }
                              },
                              "body": []
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
    
        it('should parse method', () => {
            expect(parseScript('({ async f() {} })', {
                raw: true,
                locations: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 18,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "expression": {
                      "type": "ObjectExpression",
                      "start": 1,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 3,
                          "end": 15,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 3
                            },
                            "end": {
                              "line": 1,
                              "column": 15
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 10,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 9
                              },
                              "end": {
                                "line": 1,
                                "column": 10
                              }
                            },
                            "name": "f"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 10,
                            "end": 15,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 10
                              },
                              "end": {
                                "line": 1,
                                "column": 15
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 13,
                              "end": 15,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 13
                                },
                                "end": {
                                  "line": 1,
                                  "column": 15
                                }
                              },
                              "body": []
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
    
        it('should parse computed', () => {
            expect(parseScript('({ async ["xyz"]() {} })', {
                raw: true,
                ranges: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 24,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 24
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 24,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 24
                      }
                    },
                    "expression": {
                      "type": "ObjectExpression",
                      "start": 1,
                      "end": 23,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 23
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 3,
                          "end": 21,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 3
                            },
                            "end": {
                              "line": 1,
                              "column": 21
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 10,
                            "end": 15,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 10
                              },
                              "end": {
                                "line": 1,
                                "column": 15
                              }
                            },
                            "value": "xyz",
                            "raw": "\"xyz\""
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 16,
                            "end": 21,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 16
                              },
                              "end": {
                                "line": 1,
                                "column": 21
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 19,
                              "end": 21,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 19
                                },
                                "end": {
                                  "line": 1,
                                  "column": 21
                                }
                              },
                              "body": []
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
    
        it('should parse await"', () => {
            expect(parseScript('({ async f(a) { await a } })', {
                raw: true,
                locations: true,
                ranges: true
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
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "ObjectExpression",
                      "start": 1,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 3,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 3
                            },
                            "end": {
                              "line": 1,
                              "column": 25
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 10,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 9
                              },
                              "end": {
                                "line": 1,
                                "column": 10
                              }
                            },
                            "name": "f"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 10,
                            "end": 25,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 10
                              },
                              "end": {
                                "line": 1,
                                "column": 25
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [
                              {
                                "type": "Identifier",
                                "start": 11,
                                "end": 12,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 11
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 12
                                  }
                                },
                                "name": "a"
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 14,
                              "end": 25,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 14
                                },
                                "end": {
                                  "line": 1,
                                  "column": 25
                                }
                              },
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 16,
                                  "end": 23,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 16
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 23
                                    }
                                  },
                                  "expression": {
                                    "type": "AwaitExpression",
                                    "start": 16,
                                    "end": 23,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 16
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 23
                                      }
                                    },
                                    "argument": {
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
                                      "name": "a"
                                    }
                                  }
                                }
                              ]
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
    
        it('should parse await"', () => {
            expect(parseScript('({ async f(a) { await a } })', {
                raw: true,
                ranges: true,
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
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "ObjectExpression",
                      "start": 1,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 3,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 3
                            },
                            "end": {
                              "line": 1,
                              "column": 25
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 10,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 9
                              },
                              "end": {
                                "line": 1,
                                "column": 10
                              }
                            },
                            "name": "f"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 10,
                            "end": 25,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 10
                              },
                              "end": {
                                "line": 1,
                                "column": 25
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [
                              {
                                "type": "Identifier",
                                "start": 11,
                                "end": 12,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 11
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 12
                                  }
                                },
                                "name": "a"
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 14,
                              "end": 25,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 14
                                },
                                "end": {
                                  "line": 1,
                                  "column": 25
                                }
                              },
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 16,
                                  "end": 23,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 16
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 23
                                    }
                                  },
                                  "expression": {
                                    "type": "AwaitExpression",
                                    "start": 16,
                                    "end": 23,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 16
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 23
                                      }
                                    },
                                    "argument": {
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
                                      "name": "a"
                                    }
                                  }
                                }
                              ]
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
    });