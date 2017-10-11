import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Declarations - Functions', () => {

    it('should fail on anonymous function declaration', () => {
        expect(() => {
            parseScript('function () {}');
        }).to.throw();
    });

    it('should fail on ""use strict"; function eval() {  }function eval() {  }"', () => {
        expect(() => {
            parseScript('"use strict"; function eval() {  }function eval() {  }');
        }).to.throw();
    });

    it('should fail on "function static() { "use strict"; }"', () => {
        expect(() => {
            parseModule('function static() { "use strict"; }');
        }).to.throw();
    });

    it('should fail on "function arguments() { "use strict"; }"', () => {
        expect(() => {
            parseModule('function arguments() { "use strict"; }');
        }).to.throw();
    });

    it('should fail on anonymous function declaration', () => {
        expect(() => {
            parseScript('"use strict"; function package() {}');
        }).to.throw();
    });

    it('should fail on function with keyword', () => {
        expect(() => {
            parseScript('function true() {}');
        }).to.throw();
    });

    it('should fail on function with keyword', () => {
        expect(() => {
            parseScript('function if() {}');
        }).to.throw();
    });

    it('should fail on nested anonymous function declaration', () => {
        expect(() => {
            parseScript('function foo() { function () {} }');
        }).to.throw();
    });

    it('should fail on RestParameter without an initializer "', () => {
        expect(() => {
            parseScript('function f(...x = []) {}');
        }).to.throw();
    });

    it('should fail on RestParameter without an initializer "', () => {
        expect(() => {
            parseScript('function f([...x, y]) {}');
        }).to.throw('');
    });

    it('should fail on "class A extends yield B { }"', () => {
        expect(() => {
            parseScript('function foo() { "use strict"; return {yield} }');
        }).to.throw('');
    });

    it('should fail if FormalParameters contains any duplicate element', () => {
        expect(() => {
            parseScript('(function f(x = 0, x) {}');
        }).to.throw('');
    });

    it('should fail if `yield` token is interpreted as an IdentifierReference within a generator', () => {
        expect(() => {
            parseScript(`"use strict"; function *g() {
                0, function(x = yield) {
                  paramValue = x;
                };
              }`);
        }).to.throw('');
    });

    it('should fail if `yield` token is interpreted as an IdentifierReference within a generator', () => {
        expect(() => {
            parseScript(`var gen = function *g() {
                var yi\\u0065ld;
              };`);
            }).to.throw('');
    });

    it('should fail if a FunctionDeclaration has two identical parameters', () => {
        expect(() => {
            parseScript('0, function*(x = yield) {};');
        }).to.throw('');
    });

    it('should fail if a FunctionDeclaration has two identical parameters', () => {
        expect(() => {
            parseScript('"use strict"; function _13_1_5_fun(param, param) { }');
        }).to.throw('');
    });

    it('should fail if any Identifier value occurs more than once within a FormalParameterList', () => {
        expect(() => {
            parseScript('"use strict"; var _13_1_9_fun = function (param1, param2, param1) { };');
        }).to.throw('');
    });

    it('should fail if a FunctionDeclaration has two identical parameters', () => {
        expect(() => {
            parseScript('"use strict"; function _13_1_5_fun(param, param) { }');
        }).to.throw('');
    });

    it('should fail on "class A extends yield B { }"', () => {
        expect(() => {
            parseScript('"use strict"; function foo() { eval = 42; };');
          }).to.not.throw();
    });

    it('should fail on "function __func(){\A\B\C};"', () => {
        expect(() => {
            parseScript('function __func(){\\A\\B\\C};');
        }).to.throw('');
    });

    it('should fail on "function __func(){\a\b\c};"', () => {
      expect(() => {
          parseScript('function __func(){\\a\\b\\c};');
      }).to.throw('');
  });

    it('should fail if function name is "eval" in module code only"', () => {
        expect(() => {
            parseModule('function eval() {  }');
        }).to.throw('');
    });

    it('should fail if function name is "arguments" in strict mode"', () => {
        expect(() => {
            parseScript('"use strict"; function arguments() {  }');
        }).to.throw('');
    });

    it('should fail on duplicate params', () => {
        expect(() => {
            parseScript(`"use strict"; function foo(bar, bar) {}`);
        }).to.throw('');
    });

    it('should fail on yield as function name in strict mode', () => {
        expect(() => {
            parseScript(`"use strict"; function yield() {}`);
        }).to.throw('');
    });

    it.skip('should fail on yield as function name in strict mode', () => {
        expect(() => {
            parseScript(`a: function* a(){}`);
        }).to.throw('');
    });

    it('should parse two function decl on top-level with same name', () => {
      expect(parseScript(`function a() {}`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 15,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 15
          }
        },
        "body": [
          {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 15,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 15
              }
            },
            "id": {
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
              "name": "a"
            },
            "generator": false,
            "expression": false,
            "async": false,
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
        ],
        "sourceType": "script"
      });
    });

    it('should parse two function decl on top-level with same name', () => {
        expect(parseScript(`function a() {}
        function a() {}`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 39,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 2,
              "column": 23
            }
          },
          "body": [
            {
              "type": "FunctionDeclaration",
              "start": 0,
              "end": 15,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 15
                }
              },
              "id": {
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
                "name": "a"
              },
              "generator": false,
              "expression": false,
              "async": false,
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
            },
            {
              "type": "FunctionDeclaration",
              "start": 24,
              "end": 39,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 8
                },
                "end": {
                  "line": 2,
                  "column": 23
                }
              },
              "id": {
                "type": "Identifier",
                "start": 33,
                "end": 34,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 17
                  },
                  "end": {
                    "line": 2,
                    "column": 18
                  }
                },
                "name": "a"
              },
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 37,
                "end": 39,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 21
                  },
                  "end": {
                    "line": 2,
                    "column": 23
                  }
                },
                "body": []
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse one function decl on top-level with two nested func decl with same name', () => {
        expect(parseScript(`function a() {
            function a() {}
            function a() {}
            }`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 84,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 13
            }
          },
          "body": [
            {
              "type": "FunctionDeclaration",
              "start": 0,
              "end": 84,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 4,
                  "column": 13
                }
              },
              "id": {
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
                "name": "a"
              },
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 13,
                "end": 84,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 13
                  },
                  "end": {
                    "line": 4,
                    "column": 13
                  }
                },
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 27,
                    "end": 42,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 12
                      },
                      "end": {
                        "line": 2,
                        "column": 27
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 36,
                      "end": 37,
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
                      "name": "a"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 40,
                      "end": 42,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 25
                        },
                        "end": {
                          "line": 2,
                          "column": 27
                        }
                      },
                      "body": []
                    }
                  },
                  {
                    "type": "FunctionDeclaration",
                    "start": 55,
                    "end": 70,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 12
                      },
                      "end": {
                        "line": 3,
                        "column": 27
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 64,
                      "end": 65,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 21
                        },
                        "end": {
                          "line": 3,
                          "column": 22
                        }
                      },
                      "name": "a"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 68,
                      "end": 70,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 25
                        },
                        "end": {
                          "line": 3,
                          "column": 27
                        }
                      },
                      "body": []
                    }
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse yield as function name in sloppy mode', () => {
        expect(parseScript(`function yield() {}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 19,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 14,
                  "name": "yield"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 17,
                  "end": 19,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it.skip('should parse yield as function expression name wrapped in a function declaration  in sloppy mode', () => {
        expect(parseScript(`function* fn() {
              (function yield() {});
            }`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 67,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 67,
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 12,
                  "name": "fn"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 15,
                  "end": 67,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 31,
                      "end": 53,
                      "expression": {
                        "type": "FunctionExpression",
                        "start": 32,
                        "end": 51,
                        "id": {
                          "type": "Identifier",
                          "start": 41,
                          "end": 46,
                          "name": "yield"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 49,
                          "end": 51,
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

    it('should parse yield unary as function name in sloppy mode', () => {
        expect(parseScript(`function fn() { function yield() {} }`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 37,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 37,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 11,
                  "name": "fn"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 14,
                  "end": 37,
                  "body": [
                    {
                      "type": "FunctionDeclaration",
                      "start": 16,
                      "end": 35,
                      "id": {
                        "type": "Identifier",
                        "start": 25,
                        "end": 30,
                        "name": "yield"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 33,
                        "end": 35,
                        "body": []
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it.skip('should parse yield unary as function name in sloppy mode', () => {
        expect(parseScript(`function* fn() {
              () => yield;
              () => { yield };
            }`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 88,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 88,
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 12,
                  "name": "fn"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 15,
                  "end": 88,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 31,
                      "end": 43,
                      "expression": {
                        "type": "ArrowFunctionExpression",
                        "start": 31,
                        "end": 42,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "Identifier",
                          "start": 37,
                          "end": 42,
                          "name": "yield"
                        }
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 58,
                      "end": 74,
                      "expression": {
                        "type": "ArrowFunctionExpression",
                        "start": 58,
                        "end": 73,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 64,
                          "end": 73,
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 66,
                              "end": 71,
                              "expression": {
                                "type": "Identifier",
                                "start": 66,
                                "end": 71,
                                "name": "yield"
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

    it('should parse yield unary as function name in sloppy mode', () => {
        expect(parseScript(`+function yield() {}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 20,
                "expression": {
                  "type": "UnaryExpression",
                  "start": 0,
                  "end": 20,
                  "operator": "+",
                  "prefix": true,
                  "argument": {
                    "type": "FunctionExpression",
                    "start": 1,
                    "end": 20,
                    "id": {
                      "type": "Identifier",
                      "start": 10,
                      "end": 15,
                      "name": "yield"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 18,
                      "end": 20,
                      "body": []
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "function eval() {"use strict"; }"', () => {
        expect(parseScript(`function Foo(x = new.target) {}
        function Bar() { (x = new.target) => {} }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 81,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 31,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 12,
                  "name": "Foo"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 13,
                    "end": 27,
                    "left": {
                      "type": "Identifier",
                      "start": 13,
                      "end": 14,
                      "name": "x"
                    },
                    "right": {
                      "type": "MetaProperty",
                      "start": 17,
                      "end": 27,
                      "meta": {
                        "type": "Identifier",
                        "start": 17,
                        "end": 20,
                        "name": "new"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 21,
                        "end": 27,
                        "name": "target"
                      }
                    }
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 29,
                  "end": 31,
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 40,
                "end": 81,
                "id": {
                  "type": "Identifier",
                  "start": 49,
                  "end": 52,
                  "name": "Bar"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 55,
                  "end": 81,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 57,
                      "end": 79,
                      "expression": {
                        "type": "ArrowFunctionExpression",
                        "start": 57,
                        "end": 79,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "AssignmentPattern",
                            "start": 58,
                            "end": 72,
                            "left": {
                              "type": "Identifier",
                              "start": 58,
                              "end": 59,
                              "name": "x"
                            },
                            "right": {
                              "type": "MetaProperty",
                              "start": 62,
                              "end": 72,
                              "meta": {
                                "type": "Identifier",
                                "start": 62,
                                "end": 65,
                                "name": "new"
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 66,
                                "end": 72,
                                "name": "target"
                              }
                            }
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 77,
                          "end": 79,
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

    it('should parse "function eval() {"use strict"; }"', () => {
        expect(parseScript(`function eval() {"use strict"; }`, {
            ranges: false
        })).to.eql({
              "body": [
                {
                 "async": false,
                  "body": {
                    "body": [
                     {
                        "expression": {
                          "type": "Literal",
                          "value": "use strict"
                        },
                        "type": "ExpressionStatement"
                      }
                    ],
                    "type": "BlockStatement"
                  },
                  "expression": false,
                  "generator": false,
                 "id": {
                    "name": "eval",
                    "type": "Identifier"
                  },
                  "params": [],
                 "type": "FunctionDeclaration"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "function static() {"use strict"; }"', () => {
        expect(parseScript(`function static() {"use strict"; }`, {
            ranges: false
        })).to.eql({
              "body": [
                {
                 "async": false,
                  "body": {
                    "body": [
                     {
                        "expression": {
                          "type": "Literal",
                          "value": "use strict"
                        },
                        "type": "ExpressionStatement"
                      }
                    ],
                    "type": "BlockStatement"
                  },
                  "expression": false,
                  "generator": false,
                 "id": {
                    "name": "static",
                    "type": "Identifier"
                  },
                  "params": [],
                 "type": "FunctionDeclaration"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

   

    it('should parse "function ref(a, b,) { }"', () => {
        expect(parseScript(`function ref(a, b,) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "ref"
                    },
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "a"
                        },
                        {
                            "type": "Identifier",
                            "name": "b"
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function ref(a,) { }"', () => {
        expect(parseScript(`function ref(a,) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "ref"
                    },
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "a"
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([...[,]] = g()) { }"', () => {
        expect(parseScript(`function f([...[,]] = g()) {}`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "ArrayPattern",
                                "elements": [
                                    {
                                        "type": "RestElement",
                                        "argument": {
                                            "type": "ArrayPattern",
                                            "elements": [
                                                null
                                            ]
                                        }
                                    }
                                ]
                            },
                            "right": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "g"
                                },
                                "arguments": []
                            }
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function* g() {  yield; };"', () => {
        expect(parseScript(`    function* g() {  yield; };`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "g"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "YieldExpression",
                                    "argument": null,
                                    "delegate": false
                                }
                            }
                        ]
                    },
                    "generator": true,
                    "expression": false,
                    "async": false
                },
                {
                    "type": "EmptyStatement"
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([, ...x]) {}"', () => {
        expect(parseScript(`function f([, ...x]) {}`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                null,
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "x"
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([...[...x]]) {}"', () => {
        expect(parseScript(`function f([...[...x]]) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "RestElement",
                                                "argument": {
                                                    "type": "Identifier",
                                                    "name": "x"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([...[]]) { }"', () => {
        expect(parseScript(`function f([...[]]) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "elements": []
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([...[,]]) {}"', () => {
        expect(parseScript(`function f([...[,]]) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            null
                                        ]
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([...[x, y, z]]) { }"', () => {
        expect(parseScript(`function f([...[x, y, z]]) {}`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "Identifier",
                                                "name": "x"
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "y"
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "z"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([]) {}"', () => {
        expect(parseScript(`function f([]) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": []
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([x = 23]) {}"', () => {
        expect(parseScript(`function f([x = 23]) {}`, {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 23,
                                        "raw": "23"
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([[...x] = values]) {}"', () => {
        expect(parseScript(`function f([[...x] = values]) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
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
                                                    "name": "x"
                                                }
                                            }
                                        ]
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "values"
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([[] = function() { }()]) {}"', () => {
        expect(parseScript(`function f([[] = function() { }()]) {}`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "ArrayPattern",
                                        "elements": []
                                    },
                                    "right": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": []
                                            },
                                            "generator": false,
                                            "expression": false,
                                            "async": false
                                        },
                                        "arguments": []
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function f([[,] = g()]) {}"', () => {
        expect(parseScript(`function f([[,] = g()]) {}`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "params": [
                        {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            null
                                        ]
                                    },
                                    "right": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "g"
                                        },
                                        "arguments": []
                                    }
                                }
                            ]
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function ref(a, b = 39,) {}"', () => {
        expect(parseScript(`function ref(a, b = 39,) { }`, {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "ref"
                    },
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "a"
                        },
                        {
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "b"
                            },
                            "right": {
                                "type": "Literal",
                                "value": 39,
                                "raw": "39"
                            }
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function ref(x, y = x, z = y) {}"', () => {
        expect(parseScript(`function ref(x, y = x, z = y) { }`, {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "ref"
                    },
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "x"
                        },
                        {
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "x"
                            }
                        },
                        {
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "z"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "y"
                            }
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "function __func(){ x = true; }"', () => {
        expect(parseScript(`function __func(){ x = true; }`, {
            ranges: true
        })).to.eql({
            "body": [{
                "async": false,
                "body": {
                    "body": [{
                        "end": 28,
                        "expression": {
                            "end": 27,
                            "left": {
                                "end": 20,
                                "name": "x",
                                "start": 19,
                                "type": "Identifier"
                            },
                            "operator": "=",
                            "right": {
                                "end": 27,
                                "start": 23,
                                "type": "Literal",
                                "value": true
                            },
                            "start": 19,
                            "type": "AssignmentExpression"
                        },
                        "start": 19,
                        "type": "ExpressionStatement"
                    }],
                    "end": 30,
                    "start": 17,
                    "type": "BlockStatement"
                },
                "end": 30,
                "expression": false,
                "generator": false,
                "id": {
                    "end": 15,
                    "name": "__func",
                    "start": 9,
                    "type": "Identifier"
                },
                "params": [],
                "start": 0,
                "type": "FunctionDeclaration"
            }],
            "end": 30,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "function func(){return "id_string";}"', () => {
        expect(parseScript(`function func(){return "id_string";}`, {
            ranges: true
        })).to.eql({
            "body": [{
                "async": false,
                "body": {
                    "body": [{
                        "argument": {
                            "end": 34,
                            "start": 23,
                            "type": "Literal",
                            "value": "id_string"
                        },
                        "end": 35,
                        "start": 16,
                        "type": "ReturnStatement"
                    }],
                    "end": 36,
                    "start": 15,
                    "type": "BlockStatement"
                },
                "end": 36,
                "expression": false,
                "generator": false,
                "id": {
                    "end": 13,
                    "name": "func",
                    "start": 9,
                    "type": "Identifier"
                },
                "params": [],
                "start": 0,
                "type": "FunctionDeclaration"
            }],
            "end": 36,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "function __func(){ x = true; }"', () => {
        expect(parseScript(`function __func(arguments){
            return arguments;
            
        };`, {
            ranges: true
        })).to.eql({
            "body": [{
                    "async": false,
                    "body": {
                        "body": [{
                            "argument": {
                                "end": 56,
                                "name": "arguments",
                                "start": 47,
                                "type": "Identifier"
                            },
                            "end": 57,
                            "start": 40,
                            "type": "ReturnStatement"
                        }],
                        "end": 80,
                        "start": 26,
                        "type": "BlockStatement"
                    },
                    "end": 80,
                    "expression": false,
                    "generator": false,
                    "id": {
                        "end": 15,
                        "name": "__func",
                        "start": 9,
                        "type": "Identifier"
                    },
                    "params": [{
                        "end": 25,
                        "name": "arguments",
                        "start": 16,
                        "type": "Identifier"
                    }],
                    "start": 0,
                    "type": "FunctionDeclaration"
                },
                {
                    "end": 81,
                    "start": 80,
                    "type": "EmptyStatement"
                }
            ],
            "end": 81,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "function __func(){ x = true; }"', () => {
        expect(parseScript(`function
        x
        (
        )
        {
        }
        ;
        
        x();
        
        function                                                    y                                   (                                          )                                              {};
        
        y();
        
        function
        
        z
        
        (
        
        )
        
        {
            
        }
        
        ;
        
        z();`, {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "body": {
                    "body": [],
                    "end": 58,
                    "start": 47,
                   "type": "BlockStatement"
                  },
                  "end": 58,
                  "expression": false,
                  "generator": false,
                  "async": false,
                  "id": {
                    "end": 18,
                    "start": 17,
                    "type": "Identifier",
                    "name": "x",
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
                },
                {
                  "end": 68,
                  "start": 67,
                  "type": "EmptyStatement"
               },
                {
                  "end": 90,
                  "expression": {
                    "arguments": [],
                    "callee": {
                      "end": 87,
                      "name": "x",
                      "start": 86,
                      "type": "Identifier"
                    },
                    "end": 89,
                    "start": 86,
                    "type": "CallExpression"
                  },
                  "start": 86,
                  "type": "ExpressionStatement"
               },
                {
                  "body": {
                    "body": [],
                    "end": 296,
                    "start": 294,
                    "type": "BlockStatement"
                  },
                  "end": 296,
                  "expression": false,
                  "generator": false,
                  "async": false,
                 "id": {
                    "end": 169,
                  "name": "y",
                    "start": 168,
                   "type": "Identifier"
                  },
                  "params": [],
                  "start": 108,
                  "type": "FunctionDeclaration"
               },
                {
                  "end": 297,
                  "start": 296,
                  "type": "EmptyStatement"
                },
                {
                  "end": 319,
                  "expression": {
                    "arguments": [],
                    "callee": {
                      "end": 316,
                      "name": "y",
                      "start": 315,
                      "type": "Identifier"
                   },
                    "end": 318,
                   "start": 315,
                    "type": "CallExpression"
                  },
                  "start": 315,
                  "type": "ExpressionStatement"
               },
                {
                  "body": {
                    "body": [],
                    "end": 444,
                    "start": 420,
                    "type": "BlockStatement"
                  },
                  "end": 444,
                  "expression": false,
                 "generator": false,
                 "async": false,
                  "id": {
                    "end": 364,
                    "name": "z",
                    "start": 363,
                    "type": "Identifier"
                  },
                  "params": [],
                  "start": 337,
                  "type": "FunctionDeclaration"
                },
                {
                 "end": 463,
                  "start": 462,
                  "type": "EmptyStatement"
               },
                {
                  "end": 485,
                  "expression": {
                    "arguments": [],
                    "callee": {
                      "end": 482,
                      "name": "z",
                      "start": 481,
                      "type": "Identifier"
                    },
                    "end": 484,
                    "start": 481,
                    "type": "CallExpression"
                  },
                  "start": 481,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 485,
             "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "function* bar() { yield class {} }"', () => {
        expect(parseScript(`function* bar() { yield class {} }`, {
            ranges: false,
            raw: true
        })).to.eql({
          "type": "Program",
          "body": [
              {
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "bar"
                  },
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": [
                          {
                              "type": "ExpressionStatement",
                              "expression": {
                                  "type": "YieldExpression",
                                  "argument": {
                                      "type": "ClassExpression",
                                      "id": null,
                                      "superClass": null,
                                      "body": {
                                          "type": "ClassBody",
                                          "body": []
                                      }
                                  },
                                  "delegate": false
                              }
                          }
                      ]
                  },
                  "generator": true,
                  "expression": false,
                  "async": false
              }
          ],
          "sourceType": "script"
      });
      });


      it('should parse parameter default inside arrow', () => {
        expect(parseScript(`(x = yield) => {}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 17,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 17,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "AssignmentPattern",
                      "start": 1,
                      "end": 10,
                      "left": {
                        "type": "Identifier",
                        "start": 1,
                        "end": 2,
                        "name": "x"
                      },
                      "right": {
                        "type": "Identifier",
                        "start": 5,
                        "end": 10,
                        "name": "yield"
                      }
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 15,
                    "end": 17,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield unary as function name in sloppy mode', () => {
        expect(parseScript(`function* fn() {
              function fn2(x = yield) {}
            }`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 71,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 71,
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 12,
                  "name": "fn"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 15,
                  "end": 71,
                  "body": [
                    {
                      "type": "FunctionDeclaration",
                      "start": 31,
                      "end": 57,
                      "id": {
                        "type": "Identifier",
                        "start": 40,
                        "end": 43,
                        "name": "fn2"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "AssignmentPattern",
                          "start": 44,
                          "end": 53,
                          "left": {
                            "type": "Identifier",
                            "start": 44,
                            "end": 45,
                            "name": "x"
                          },
                          "right": {
                            "type": "Identifier",
                            "start": 48,
                            "end": 53,
                            "name": "yield"
                          }
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 55,
                        "end": 57,
                        "body": []
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse parameter default inside function', () => {
        expect(parseScript(`function fn(x = yield) {} `, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 26,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 25,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 11,
                  "name": "fn"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 12,
                    "end": 21,
                    "left": {
                      "type": "Identifier",
                      "start": 12,
                      "end": 13,
                      "name": "x"
                    },
                    "right": {
                      "type": "Identifier",
                      "start": 16,
                      "end": 21,
                      "name": "yield"
                    }
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 23,
                  "end": 25,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield unary as function name in sloppy mode', () => {
        expect(parseScript(`yield => {};`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 11,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 0,
                      "end": 5,
                      "name": "yield"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 9,
                    "end": 11,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse parameter name arrow', () => {
        expect(parseScript(`(yield) => {}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 13,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 13,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 1,
                      "end": 6,
                      "name": "yield"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 11,
                    "end": 13,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse parameter name function', () => {
        expect(parseScript(`function fn(yield) {}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 21,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 11,
                  "name": "fn"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 12,
                    "end": 17,
                    "name": "yield"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 19,
                  "end": 21,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield star parameter default inside function', () => {
        expect(parseScript(`function fn(x = yield* yield) {}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 32,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 32,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 11,
                  "name": "fn"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 12,
                    "end": 28,
                    "left": {
                      "type": "Identifier",
                      "start": 12,
                      "end": 13,
                      "name": "x"
                    },
                    "right": {
                      "type": "BinaryExpression",
                      "start": 16,
                      "end": 28,
                      "left": {
                        "type": "Identifier",
                        "start": 16,
                        "end": 21,
                        "name": "yield"
                      },
                      "operator": "*",
                      "right": {
                        "type": "Identifier",
                        "start": 23,
                        "end": 28,
                        "name": "yield"
                      }
                    }
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 30,
                  "end": 32,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse function decl wrapped around function expr with retun statement', () => {
        expect(parseScript(`function a() {
          b =function () { return c }
          return d;
        }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 82,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 82,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 10,
                  "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 82,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 25,
                      "end": 52,
                      "expression": {
                        "type": "AssignmentExpression",
                        "start": 25,
                        "end": 52,
                        "operator": "=",
                        "left": {
                          "type": "Identifier",
                          "start": 25,
                          "end": 26,
                          "name": "b"
                        },
                        "right": {
                          "type": "FunctionExpression",
                          "start": 28,
                          "end": 52,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 40,
                            "end": 52,
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 42,
                                "end": 50,
                                "argument": {
                                  "type": "Identifier",
                                  "start": 49,
                                  "end": 50,
                                  "name": "c"
                                }
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      "type": "ReturnStatement",
                      "start": 63,
                      "end": 72,
                      "argument": {
                        "type": "Identifier",
                        "start": 70,
                        "end": 71,
                        "name": "d"
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });  
        });  

        it('should parse "function eval() { }"', () => {
            expect(parseScript(`function eval() { }`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 19,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 19
                  }
                },
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 19,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 19
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 13,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 13
                        }
                      },
                      "name": "eval"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 16,
                      "end": 19,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 16
                        },
                        "end": {
                          "line": 1,
                          "column": 19
                        }
                      },
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "function test(t, t) { }"', () => {
            expect(parseScript(`function test(t, t) { }`, {
                ranges: true,
                raw: true,
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
                    "type": "FunctionDeclaration",
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
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 13,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 13
                        }
                      },
                      "name": "test"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
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
                        "name": "t"
                      },
                      {
                        "type": "Identifier",
                        "start": 17,
                        "end": 18,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 17
                          },
                          "end": {
                            "line": 1,
                            "column": 18
                          }
                        },
                        "name": "t"
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 20,
                      "end": 23,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 23
                        }
                      },
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "function eval() { function inner() { "use strict" } }"', () => {
            expect(parseScript(`function eval() { function inner() { "use strict" } }`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 53,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 53
                  }
                },
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 53,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 53
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 13,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 13
                        }
                      },
                      "name": "eval"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 16,
                      "end": 53,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 16
                        },
                        "end": {
                          "line": 1,
                          "column": 53
                        }
                      },
                      "body": [
                        {
                          "type": "FunctionDeclaration",
                          "start": 18,
                          "end": 51,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 1,
                              "column": 51
                            }
                          },
                          "id": {
                            "type": "Identifier",
                            "start": 27,
                            "end": 32,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 27
                              },
                              "end": {
                                "line": 1,
                                "column": 32
                              }
                            },
                            "name": "inner"
                          },
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 35,
                            "end": 51,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 35
                              },
                              "end": {
                                "line": 1,
                                "column": 51
                              }
                            },
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "start": 37,
                                "end": 49,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 37
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 49
                                  }
                                },
                                "expression": {
                                  "type": "Literal",
                                  "start": 37,
                                  "end": 49,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 37
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 49
                                    }
                                  },
                                  "value": "use strict",
                                  "raw": "\"use strict\""
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "function hello(a) { z(); }"', () => {
            expect(parseScript(`function hello(a) { z(); }`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 26,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 26
                  }
                },
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 26,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 26
                      }
                    },
                    "id": {
                      "type": "Identifier",
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
                      "name": "hello"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
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
                        "name": "a"
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 18,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 20,
                          "end": 24,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 20
                            },
                            "end": {
                              "line": 1,
                              "column": 24
                            }
                          },
                          "expression": {
                            "type": "CallExpression",
                            "start": 20,
                            "end": 23,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 20
                              },
                              "end": {
                                "line": 1,
                                "column": 23
                              }
                            },
                            "callee": {
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
                              "name": "z"
                            },
                            "arguments": []
                          }
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "function hello(a, b) { z(); }"', () => {
            expect(parseScript(`function hello(a, b) { z(); }`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 29,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 29
                  }
                },
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 29,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 29
                      }
                    },
                    "id": {
                      "type": "Identifier",
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
                      "name": "hello"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
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
                        "name": "a"
                      },
                      {
                        "type": "Identifier",
                        "start": 18,
                        "end": 19,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 19
                          }
                        },
                        "name": "b"
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 21,
                      "end": 29,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 21
                        },
                        "end": {
                          "line": 1,
                          "column": 29
                        }
                      },
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 23,
                          "end": 27,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 23
                            },
                            "end": {
                              "line": 1,
                              "column": 27
                            }
                          },
                          "expression": {
                            "type": "CallExpression",
                            "start": 23,
                            "end": 26,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 23
                              },
                              "end": {
                                "line": 1,
                                "column": 26
                              }
                            },
                            "callee": {
                              "type": "Identifier",
                              "start": 23,
                              "end": 24,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 23
                                },
                                "end": {
                                  "line": 1,
                                  "column": 24
                                }
                              },
                              "name": "z"
                            },
                            "arguments": []
                          }
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "function a(...b) { }"', () => {
            expect(parseScript(`function a(...b) { }`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 20,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 20
                  }
                },
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "id": {
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
                      "name": "a"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "RestElement",
                        "start": 11,
                        "end": 15,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 11
                          },
                          "end": {
                            "line": 1,
                            "column": 15
                          }
                        },
                        "argument": {
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
                          "name": "b"
                        }
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
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
                      },
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "function a(...[]) { }"', () => {
            expect(parseScript(`function a(...[]) { }`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
              "type": "Program",
              "body": [
                  {
                      "type": "FunctionDeclaration",
                      "params": [
                          {
                              "type": "RestElement",
                              "argument": {
                                  "type": "ArrayPattern",
                                  "elements": [],
                                  "start": 14,
                                  "end": 16,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 14
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 16
                                      }
                                  }
                              },
                              "start": 11,
                              "end": 16,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 11
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 16
                                  }
                              }
                          }
                      ],
                      "body": {
                          "type": "BlockStatement",
                          "body": [],
                          "start": 18,
                          "end": 21,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 18
                              },
                              "end": {
                                  "line": 1,
                                  "column": 21
                              }
                          }
                      },
                      "async": false,
                      "generator": false,
                      "expression": false,
                      "id": {
                          "type": "Identifier",
                          "name": "a",
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
                          }
                      },
                      "start": 0,
                      "end": 21,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 21
                          }
                      }
                  }
              ],
              "sourceType": "script",
              "start": 0,
              "end": 21,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 21
                  }
              }
          });
        });

        it('should parse "function universe(__proto__) { }"', () => {
            expect(parseScript(`function universe(__proto__) { }`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 32,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 32
                  }
                },
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 32,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 32
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "name": "universe"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
                        "start": 18,
                        "end": 27,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "name": "__proto__"
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
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
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "function eval() { }"', () => {
            expect(parseScript(`function test() { "use strict"\n + 0; }`, {
                ranges: true,
            })).to.eql({
                  "body": [
                    {
                      "async": false,
                      "body": {
                        "body": [
                          {
                            "end": 36,
                            "expression": {
                              "end": 35,
                              "left": {
                                "end": 30,
                                "start": 18,
                                "type": "Literal",
                                "value": "use strict",
                              },
                              "operator": "+",
                              "right": {
                                "end": 35,
                                "start": 34,
                                "type": "Literal",
                                "value": 0,
                              },
                              "start": 18,
                              "type": "BinaryExpression",
                            },
                            "start": 18,
                            "type": "ExpressionStatement"
                          },
                        ],
                        "end": 38,
                        "start": 16,
                        "type": "BlockStatement",
                      },
                      "end": 38,
                      "expression": false,
                      "generator": false,
                      "id": {
                        "end": 13,
                        "name": "test",
                        "start": 9,
                        "type": "Identifier"
                      },
                      "params": [],
                      "start": 0,
                      "type": "FunctionDeclaration",
                    },
                  ],
                  "end": 38,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program",
                });
        });

        it('should parse "function a() {} function a() {}"', () => {
            expect(parseScript(`function a() {} function a() {}`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
  "type": "Program",
  "start": 0,
  "end": 31,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 1,
      "column": 31
    }
  },
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 15,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 15
        }
      },
      "id": {
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
        "name": "a"
      },
      "generator": false,
      "expression": false,
      "async": false,
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
    },
    {
      "type": "FunctionDeclaration",
      "start": 16,
      "end": 31,
      "loc": {
        "start": {
          "line": 1,
          "column": 16
        },
        "end": {
          "line": 1,
          "column": 31
        }
      },
      "id": {
        "type": "Identifier",
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
        "name": "a"
      },
      "generator": false,
      "expression": false,
      "async": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 29,
        "end": 31,
        "loc": {
          "start": {
            "line": 1,
            "column": 29
          },
          "end": {
            "line": 1,
            "column": 31
          }
        },
        "body": []
      }
    }
  ],
  "sourceType": "script"
});
        });

        it('should parse "function a() { function a() {} function a() {} }"', () => {
            expect(parseScript(`function a() { function a() {} function a() {} }`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 48,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 48
                  }
                },
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 48,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 48
                      }
                    },
                    "id": {
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
                      "name": "a"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 13,
                      "end": 48,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 1,
                          "column": 48
                        }
                      },
                      "body": [
                        {
                          "type": "FunctionDeclaration",
                          "start": 15,
                          "end": 30,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 15
                            },
                            "end": {
                              "line": 1,
                              "column": 30
                            }
                          },
                          "id": {
                            "type": "Identifier",
                            "start": 24,
                            "end": 25,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 24
                              },
                              "end": {
                                "line": 1,
                                "column": 25
                              }
                            },
                            "name": "a"
                          },
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 28,
                            "end": 30,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 28
                              },
                              "end": {
                                "line": 1,
                                "column": 30
                              }
                            },
                            "body": []
                          }
                        },
                        {
                          "type": "FunctionDeclaration",
                          "start": 31,
                          "end": 46,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 31
                            },
                            "end": {
                              "line": 1,
                              "column": 46
                            }
                          },
                          "id": {
                            "type": "Identifier",
                            "start": 40,
                            "end": 41,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 40
                              },
                              "end": {
                                "line": 1,
                                "column": 41
                              }
                            },
                            "name": "a"
                          },
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 44,
                            "end": 46,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 44
                              },
                              "end": {
                                "line": 1,
                                "column": 46
                              }
                            },
                            "body": []
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