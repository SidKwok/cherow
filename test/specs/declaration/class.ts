import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Declarations - Class', () => {

    it('should fail on invalid class declaration', () => {
        expect(() => {
            parseScript(`class {};`);
        }).to.throw();
    });

    it('should fail on invalid use of await as label', () => {
        expect(() => {
            parseScript(`class C { async method() { await: ;  }}`);
        }).to.throw();
    });

    it('should fail on rest element (array binding pattern) followed by any element', () => {
        expect(() => {
            parseScript(`class C {
                async *method([...[x], y] = [1, 2, 3]) {
                }
              };`);
        }).to.throw();
    });

    it('should fail on invalid use of await as binding', () => {
        expect(() => {
            parseScript(`class C { async method() { var await;  }}`);
        }).to.throw();
    });
    
    it('should fail on invalid use of static await as identifier', () => {
        expect(() => {
            parseScript(`void \\u0061wait;`);
        }).to.not.throw();
    });

    it('should fail on invalid use of eval in strict mode', () => {
        expect(() => {
            parseScript(`class A {a(eval){}}`);
        }).to.throw();
    });

    it('should fail on invalid use of arguments in strict mode', () => {
        expect(() => {
            parseScript(`class A {a(arguments){}}`);
        }).to.throw();
    });

    it('should fail if static has async generator', () => {
        expect(() => {
            parseScript(`class C { static async *method(x = 0, x) { } }`);
        }).to.throw();
    });

    it('should fail if async generator contain escaped keyword', () => {
        expect(() => {
            parseScript(`class C { static async *gen() {  \\u0061wait: ; }}`, {
                next: true
            });
        }).to.throw();
    });
    it('should fail if await is used as label identifier inside async generator body', () => {
        expect(() => {
            parseScript(`class C { static async *gen() {  await: ;}}`, {
                next: true
            });
        }).to.throw();
    });
    it('should fail if yield as reserved keyword are used within generator function bodies as binding identifier', () => {
        expect(() => {
            parseScript(`class C { async *gen() { var yield; }}`, {
                next: true
            });
        }).to.throw();
    });
    it('should fail if escaped yield as reserved keyword are used within generator function bodies as binding identifier', () => {
        expect(() => {
            parseScript(`class C { async *gen() { void yi\u0065ld; }}`, {
                next: true
            });
        }).to.throw();
    });
    it('should fail if escaped yield as reserved keyword are used within generator function bodies as binding identifier', () => {
        expect(() => {
            parseScript(`class C { async *gen() { void yield; }}`, {
                next: true
            });
        }).to.throw();
    });
    it('should fail on await as binding identifier', () => {
        expect(() => {
            parseScript(`class C { async method() { var await; }}`);
        }).to.throw();
    });

    it('should fail if duplicate constructor in the same class', () => {
        expect(() => {
            parseScript(`class A { constructor() {} 'constructor'() }`, {
                next: true
            });
        }).to.throw('');
    });
    it('should fail if constructor has a get modifier', () => {
        expect(() => {
            parseScript(`class A { get constructor() {} }`, {
                next: true
            });
        }).to.throw();
    });
    it('should fail if constructor is a generator', () => {
        expect(() => {
            parseScript(`class A { *constructor() {} }`, {
                next: true
            });
        }).to.throw();
    });

    it('should fail if async constructor', () => {
        expect(() => {
            parseScript(`class A {async constructor() { }}`, {
                next: true
            });
        }).to.throw('');
    });
    it('should fail if constructor has a get modifier', () => {
        expect(() => {
            parseScript(`class A {async get foo() { }}`, {
                next: true
            });
        }).to.throw('');
    });
    it('should fail if constructor is a generator', () => {
        expect(() => {
            parseScript(`class A {static async set foo(value) { }}`, {
                next: true
            });
        }).to.throw('');
    });


    it('should parse class static method named prototype"', () => {
        expect(parseScript(`class A {static ["prototype"](){}};`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 35,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 35
              }
            },
            "body": [
              {
                "type": "ClassDeclaration",
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
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 34,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 34
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 9,
                      "end": 33,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 33
                        }
                      },
                      "computed": true,
                      "key": {
                        "type": "Literal",
                        "start": 17,
                        "end": 28,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 17
                          },
                          "end": {
                            "line": 1,
                            "column": 28
                          }
                        },
                        "value": "prototype",
                        "raw": "\"prototype\""
                      },
                      "static": true,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 29,
                        "end": 33,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 29
                          },
                          "end": {
                            "line": 1,
                            "column": 33
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 31,
                          "end": 33,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 31
                            },
                            "end": {
                              "line": 1,
                              "column": 33
                            }
                          },
                          "body": []
                        }
                      }
                    }
                  ]
                }
              },
              {
                "type": "EmptyStatement",
                "start": 34,
                "end": 35,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 34
                  },
                  "end": {
                    "line": 1,
                    "column": 35
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse class static method named static"', () => {
        expect(parseScript(`class A {static static(){};};`, {
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
                "type": "ClassDeclaration",
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
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 28,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 28
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 9,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 16,
                        "end": 22,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 22
                          }
                        },
                        "name": "static"
                      },
                      "static": true,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 22,
                        "end": 26,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 22
                          },
                          "end": {
                            "line": 1,
                            "column": 26
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 24,
                          "end": 26,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 24
                            },
                            "end": {
                              "line": 1,
                              "column": 26
                            }
                          },
                          "body": []
                        }
                      }
                    }
                  ]
                }
              },
              {
                "type": "EmptyStatement",
                "start": 28,
                "end": 29,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 28
                  },
                  "end": {
                    "line": 1,
                    "column": 29
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse static method', () => {
        expect(parseScript(`class A {static a(){};};`, {
            ranges: true,
            raw: true,
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
                "type": "ClassDeclaration",
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
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 23,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 23
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 9,
                      "end": 21,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 21
                        }
                      },
                      "computed": false,
                      "key": {
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
                        "name": "a"
                      },
                      "static": true,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 17,
                        "end": 21,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 17
                          },
                          "end": {
                            "line": 1,
                            "column": 21
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
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
              },
              {
                "type": "EmptyStatement",
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
                }
              }
            ],
            "sourceType": "script"
          });
    });
    
    it('should parse static methods and accessor properties', () => {
        expect(parseScript(`class A {static a(){} static get a(){} static set a(b){} };`, {
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
                "type": "ClassDeclaration",
                "start": 0,
                "end": 58,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 58
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 58,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 58
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 9,
                      "end": 21,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 21
                        }
                      },
                      "computed": false,
                      "key": {
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
                        "name": "a"
                      },
                      "static": true,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 17,
                        "end": 21,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 17
                          },
                          "end": {
                            "line": 1,
                            "column": 21
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
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
                    },
                    {
                      "type": "MethodDefinition",
                      "start": 22,
                      "end": 38,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 22
                        },
                        "end": {
                          "line": 1,
                          "column": 38
                        }
                      },
                      "computed": false,
                      "key": {
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
                      },
                      "static": true,
                      "kind": "get",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 34,
                        "end": 38,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 34
                          },
                          "end": {
                            "line": 1,
                            "column": 38
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 36,
                          "end": 38,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 36
                            },
                            "end": {
                              "line": 1,
                              "column": 38
                            }
                          },
                          "body": []
                        }
                      }
                    },
                    {
                      "type": "MethodDefinition",
                      "start": 39,
                      "end": 56,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 39
                        },
                        "end": {
                          "line": 1,
                          "column": 56
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 50,
                        "end": 51,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 50
                          },
                          "end": {
                            "line": 1,
                            "column": 51
                          }
                        },
                        "name": "a"
                      },
                      "static": true,
                      "kind": "set",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 51,
                        "end": 56,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 51
                          },
                          "end": {
                            "line": 1,
                            "column": 56
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
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
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 54,
                          "end": 56,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 54
                            },
                            "end": {
                              "line": 1,
                              "column": 56
                            }
                          },
                          "body": []
                        }
                      }
                    }
                  ]
                }
              },
              {
                "type": "EmptyStatement",
                "start": 58,
                "end": 59,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 58
                  },
                  "end": {
                    "line": 1,
                    "column": 59
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse two computed static methods', () => {
        expect(parseScript(`class A {static[a](){}; static[b](){}};`, {
            ranges: true,
            raw: true,
            locations: true
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
                "line": 1,
                "column": 39
              }
            },
            "body": [
              {
                "type": "ClassDeclaration",
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
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 38,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 38
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 9,
                      "end": 22,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 22
                        }
                      },
                      "computed": true,
                      "key": {
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
                        "name": "a"
                      },
                      "static": true,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 18,
                        "end": 22,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 22
                          }
                        },
                        "id": null,
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
                      }
                    },
                    {
                      "type": "MethodDefinition",
                      "start": 24,
                      "end": 37,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 24
                        },
                        "end": {
                          "line": 1,
                          "column": 37
                        }
                      },
                      "computed": true,
                      "key": {
                        "type": "Identifier",
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
                        "name": "b"
                      },
                      "static": true,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 33,
                        "end": 37,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 33
                          },
                          "end": {
                            "line": 1,
                            "column": 37
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 35,
                          "end": 37,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 35
                            },
                            "end": {
                              "line": 1,
                              "column": 37
                            }
                          },
                          "body": []
                        }
                      }
                    }
                  ]
                }
              },
              {
                "type": "EmptyStatement",
                "start": 38,
                "end": 39,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 38
                  },
                  "end": {
                    "line": 1,
                    "column": 39
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse two methods computed constructors', () => {
        expect(parseScript(`class A {"constructor"(){} ["constructor"](){}};`, {
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
                "type": "ClassDeclaration",
                "start": 0,
                "end": 47,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 47
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 47,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 47
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 9,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "start": 9,
                        "end": 22,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 9
                          },
                          "end": {
                            "line": 1,
                            "column": 22
                          }
                        },
                        "value": "constructor",
                        "raw": "\"constructor\""
                      },
                      "static": false,
                      "kind": "constructor",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 22,
                        "end": 26,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 22
                          },
                          "end": {
                            "line": 1,
                            "column": 26
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 24,
                          "end": 26,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 24
                            },
                            "end": {
                              "line": 1,
                              "column": 26
                            }
                          },
                          "body": []
                        }
                      }
                    },
                    {
                      "type": "MethodDefinition",
                      "start": 27,
                      "end": 46,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 27
                        },
                        "end": {
                          "line": 1,
                          "column": 46
                        }
                      },
                      "computed": true,
                      "key": {
                        "type": "Literal",
                        "start": 28,
                        "end": 41,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 28
                          },
                          "end": {
                            "line": 1,
                            "column": 41
                          }
                        },
                        "value": "constructor",
                        "raw": "\"constructor\""
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 42,
                        "end": 46,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 42
                          },
                          "end": {
                            "line": 1,
                            "column": 46
                          }
                        },
                        "id": null,
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
                    }
                  ]
                }
              },
              {
                "type": "EmptyStatement",
                "start": 47,
                "end": 48,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 47
                  },
                  "end": {
                    "line": 1,
                    "column": 48
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse two methods semi', () => {
        expect(parseScript(`class A {a(){};b(){}};`, {
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
            "body": [
              {
                "type": "ClassDeclaration",
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
                },
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 21,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 21
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
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
                        "name": "a"
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
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
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 12,
                          "end": 14,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 14
                            }
                          },
                          "body": []
                        }
                      }
                    },
                    {
                      "type": "MethodDefinition",
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
                      "computed": false,
                      "key": {
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
                        "name": "b"
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 16,
                        "end": 20,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 20
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
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
              },
              {
                "type": "EmptyStatement",
                "start": 21,
                "end": 22,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 21
                  },
                  "end": {
                    "line": 1,
                    "column": 22
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse two methods', () => {
        expect(parseScript(`class A {a(){}b(){}};`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "ClassDeclaration",
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
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
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
                        "name": "a"
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
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
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 12,
                          "end": 14,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 14
                            }
                          },
                          "body": []
                        }
                      }
                    },
                    {
                      "type": "MethodDefinition",
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
                      "computed": false,
                      "key": {
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
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 15,
                        "end": 19,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 15
                          },
                          "end": {
                            "line": 1,
                            "column": 19
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
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
              },
              {
                "type": "EmptyStatement",
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
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse derivered class assign', () => {
        expect(parseScript(`var x = class A extends 0{};`, {
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 5,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 5
                        }
                      },
                      "name": "x"
                    },
                    "init": {
                      "type": "ClassExpression",
                      "start": 8,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "id": {
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
                        "name": "A"
                      },
                      "superClass": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                      },
                      "body": {
                        "type": "ClassBody",
                        "start": 25,
                        "end": 27,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 25
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "body": []
                      }
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse empty class semi', () => {
        expect(parseScript(`class A {;};`, {
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
            "body": [
              {
                "type": "ClassDeclaration",
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
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 11,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 11
                    }
                  },
                  "body": []
                }
              },
              {
                "type": "EmptyStatement",
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
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "class A {;;}"', () => {
        expect(parseScript(`class A {;;}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 12,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 12,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {a(){}}"', () => {
        expect(parseScript(`class A {a(){}}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 15,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 15,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 15,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 14,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 10,
                            "name": "a"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 10,
                            "end": 14,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 12,
                                "end": 14,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {a(){}b(){}}"', () => {
        expect(parseScript(`class A {a(){}b(){}}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 20,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 20,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 9,
                            "end": 14,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 9,
                                "end": 10,
                                "name": "a"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 10,
                                "end": 14,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 12,
                                    "end": 14,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 14,
                            "end": 19,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 14,
                                "end": 15,
                                "name": "b"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 15,
                                "end": 19,
                                "id": null,
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
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {a(){};b(){};}"', () => {
        expect(parseScript(`class A {a(){};b(){};}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 22,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 22,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 9,
                            "end": 14,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 9,
                                "end": 10,
                                "name": "a"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 10,
                                "end": 14,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 12,
                                    "end": 14,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 15,
                            "end": 20,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 15,
                                "end": 16,
                                "name": "b"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 16,
                                "end": 20,
                                "id": null,
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
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {;a(){};b(){};}"', () => {
        expect(parseScript(`class A {;a(){};b(){};}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 23,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 23,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 10,
                            "end": 15,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 10,
                                "end": 11,
                                "name": "a"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 11,
                                "end": 15,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 13,
                                    "end": 15,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 16,
                            "end": 21,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 16,
                                "end": 17,
                                "name": "b"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 17,
                                "end": 21,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 19,
                                    "end": 21,
                                    "body": []
                                }
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {static(){};}"', () => {
        expect(parseScript(`class A {static(){};}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 21,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 21,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 19,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 15,
                            "name": "static"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 15,
                            "end": 19,
                            "id": null,
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
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {get a(){} set b(c){};}"', () => {
        expect(parseScript(`class A {get a(){} set b(c){};}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 31,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 31,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 31,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 9,
                            "end": 18,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 13,
                                "end": 14,
                                "name": "a"
                            },
                            "static": false,
                            "kind": "get",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 14,
                                "end": 18,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 16,
                                    "end": 18,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 19,
                            "end": 29,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 23,
                                "end": 24,
                                "name": "b"
                            },
                            "static": false,
                            "kind": "set",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 24,
                                "end": 29,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [{
                                    "type": "Identifier",
                                    "start": 25,
                                    "end": 26,
                                    "name": "c"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 27,
                                    "end": 29,
                                    "body": []
                                }
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {static a(){} static get a(){} static set a(b){} }"', () => {
        expect(parseScript(`class A {static a(){} static get a(){} static set a(b){} }`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 58,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 58,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 58,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 9,
                            "end": 21,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 16,
                                "end": 17,
                                "name": "a"
                            },
                            "static": true,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 17,
                                "end": 21,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 19,
                                    "end": 21,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 22,
                            "end": 38,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 33,
                                "end": 34,
                                "name": "a"
                            },
                            "static": true,
                            "kind": "get",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 34,
                                "end": 38,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 36,
                                    "end": 38,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 39,
                            "end": 56,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 50,
                                "end": 51,
                                "name": "a"
                            },
                            "static": true,
                            "kind": "set",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 51,
                                "end": 56,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [{
                                    "type": "Identifier",
                                    "start": 52,
                                    "end": 53,
                                    "name": "b"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 54,
                                    "end": 56,
                                    "body": []
                                }
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {static a(){};}"', () => {
        expect(parseScript(`class A {static a(){};}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 23,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 23,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 21,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 17,
                            "name": "a"
                        },
                        "static": true,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 17,
                            "end": 21,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 19,
                                "end": 21,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {static [a](){};}"', () => {
        expect(parseScript(`class A {static [a](){};}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 25,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 25,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 23,
                        "computed": true,
                        "key": {
                            "type": "Identifier",
                            "start": 17,
                            "end": 18,
                            "name": "a"
                        },
                        "static": true,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 19,
                            "end": 23,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 21,
                                "end": 23,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {static[a](){}; static[b](){}}"', () => {
        expect(parseScript(`class A {static[a](){}; static[b](){}}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 38,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 38,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 38,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 9,
                            "end": 22,
                            "computed": true,
                            "key": {
                                "type": "Identifier",
                                "start": 16,
                                "end": 17,
                                "name": "a"
                            },
                            "static": true,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 18,
                                "end": 22,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 20,
                                    "end": 22,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 24,
                            "end": 37,
                            "computed": true,
                            "key": {
                                "type": "Identifier",
                                "start": 31,
                                "end": 32,
                                "name": "b"
                            },
                            "static": true,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 33,
                                "end": 37,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 35,
                                    "end": 37,
                                    "body": []
                                }
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {static static(){};}"', () => {
        expect(parseScript(`class A {static static(){};}`, {
            ranges: true,
            locations: true,
            raw: true
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
                "type": "ClassDeclaration",
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
                  "start": 6,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 28,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 28
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 9,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 16,
                        "end": 22,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 22
                          }
                        },
                        "name": "static"
                      },
                      "static": true,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 22,
                        "end": 26,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 22
                          },
                          "end": {
                            "line": 1,
                            "column": 26
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 24,
                          "end": 26,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 24
                            },
                            "end": {
                              "line": 1,
                              "column": 26
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

    it('should parse "var x = class A extends 0{}"', () => {
        expect(parseScript(`var x = class A extends 0{}`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 5,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 5
                        }
                      },
                      "name": "x"
                    },
                    "init": {
                      "type": "ClassExpression",
                      "start": 8,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "id": {
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
                        "name": "A"
                      },
                      "superClass": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                      },
                      "body": {
                        "type": "ClassBody",
                        "start": 25,
                        "end": 27,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 25
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "body": []
                      }
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "class A {prototype(){}}"', () => {
        expect(parseScript(`class A {prototype(){}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 23,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 23,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 22,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 18,
                            "name": "prototype"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 18,
                            "end": 22,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 20,
                                "end": 22,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {constructor(){}}"', () => {
        expect(parseScript(`class A {constructor(){}}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 25,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 25,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 24,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 20,
                            "name": "constructor"
                        },
                        "static": false,
                        "kind": "constructor",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 20,
                            "end": 24,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 22,
                                "end": 24,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {"constructor"(){} ["constructor"](){}}"', () => {
        expect(parseScript(`class A {"constructor"(){} ["constructor"](){}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 47,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 47,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 47,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 9,
                            "end": 26,
                            "computed": false,
                            "key": {
                                "type": "Literal",
                                "start": 9,
                                "end": 22,
                                "value": "constructor",
                                "raw": "\"constructor\""
                            },
                            "static": false,
                            "kind": "constructor",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 22,
                                "end": 26,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 24,
                                    "end": 26,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 27,
                            "end": 46,
                            "computed": true,
                            "key": {
                                "type": "Literal",
                                "start": 28,
                                "end": 41,
                                "value": "constructor",
                                "raw": "\"constructor\""
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 42,
                                "end": 46,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 44,
                                    "end": 46,
                                    "body": []
                                }
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {static constructor(){} static constructor(){}}"', () => {
        expect(parseScript(`class A {static constructor(){} static constructor(){}}`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 55,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 55,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 55,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 9,
                            "end": 31,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 16,
                                "end": 27,
                                "name": "constructor"
                            },
                            "static": true,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 27,
                                "end": 31,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 29,
                                    "end": 31,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 32,
                            "end": 54,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 39,
                                "end": 50,
                                "name": "constructor"
                            },
                            "static": true,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 50,
                                "end": 54,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 52,
                                    "end": 54,
                                    "body": []
                                }
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {static ["prototype"](){}}"', () => {
        expect(parseScript(`class A {static ["prototype"](){}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 34,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 34,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 34,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 33,
                        "computed": true,
                        "key": {
                            "type": "Literal",
                            "start": 17,
                            "end": 28,
                            "value": "prototype",
                            "raw": "\"prototype\""
                        },
                        "static": true,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 29,
                            "end": 33,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 31,
                                "end": 33,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(class {})"', () => {
        expect(parseScript(`(class {})`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 10,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 10,
                "expression": {
                    "type": "ClassExpression",
                    "start": 1,
                    "end": 9,
                    "id": null,
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "start": 7,
                        "end": 9,
                        "body": []
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse computed values as accessor property names (numeric literal in exponent notation)', () => {
        expect(parseScript(`class C {
            static get 1E+9() { return 'get string'; }
            static set 1E+9(param) { stringSet = param; }
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 134,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 134,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "C"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 134,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 22,
                            "end": 64,
                            "computed": false,
                            "key": {
                                "type": "Literal",
                                "start": 33,
                                "end": 37,
                                "value": 1000000000,
                                "raw": "1E+9"
                            },
                            "static": true,
                            "kind": "get",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 37,
                                "end": 64,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 40,
                                    "end": 64,
                                    "body": [{
                                        "type": "ReturnStatement",
                                        "start": 42,
                                        "end": 62,
                                        "argument": {
                                            "type": "Literal",
                                            "start": 49,
                                            "end": 61,
                                            "value": "get string",
                                            "raw": "'get string'"
                                        }
                                    }]
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 77,
                            "end": 122,
                            "computed": false,
                            "key": {
                                "type": "Literal",
                                "start": 88,
                                "end": 92,
                                "value": 1000000000,
                                "raw": "1E+9"
                            },
                            "static": true,
                            "kind": "set",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 92,
                                "end": 122,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [{
                                    "type": "Identifier",
                                    "start": 93,
                                    "end": 98,
                                    "name": "param"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 100,
                                    "end": 122,
                                    "body": [{
                                        "type": "ExpressionStatement",
                                        "start": 102,
                                        "end": 120,
                                        "expression": {
                                            "type": "AssignmentExpression",
                                            "start": 102,
                                            "end": 119,
                                            "operator": "=",
                                            "left": {
                                                "type": "Identifier",
                                                "start": 102,
                                                "end": 111,
                                                "name": "stringSet"
                                            },
                                            "right": {
                                                "type": "Identifier",
                                                "start": 114,
                                                "end": 119,
                                                "name": "param"
                                            }
                                        }
                                    }]
                                }
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "yield" keyword behaves like a Yield expression withing a generator function', () => {
        expect(parseScript(`function* g() {
            class C_ {
              get [yield]() { return 'get yield'; }
              set [yield](param) { yieldSet = param; }
            }
          
            C = C_;
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 202,
            "body": [{
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 202,
                "id": {
                    "type": "Identifier",
                    "start": 10,
                    "end": 11,
                    "name": "g"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "start": 14,
                    "end": 202,
                    "body": [{
                            "type": "ClassDeclaration",
                            "start": 28,
                            "end": 159,
                            "id": {
                                "type": "Identifier",
                                "start": 34,
                                "end": 36,
                                "name": "C_"
                            },
                            "superClass": null,
                            "body": {
                                "type": "ClassBody",
                                "start": 37,
                                "end": 159,
                                "body": [{
                                        "type": "MethodDefinition",
                                        "start": 53,
                                        "end": 90,
                                        "computed": true,
                                        "key": {
                                            "type": "YieldExpression",
                                            "start": 58,
                                            "end": 63,
                                            "delegate": false,
                                            "argument": null
                                        },
                                        "static": false,
                                        "kind": "get",
                                        "value": {
                                            "type": "FunctionExpression",
                                            "start": 64,
                                            "end": 90,
                                            "id": null,
                                            "generator": false,
                                            "expression": false,
                                            "async": false,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "start": 67,
                                                "end": 90,
                                                "body": [{
                                                    "type": "ReturnStatement",
                                                    "start": 69,
                                                    "end": 88,
                                                    "argument": {
                                                        "type": "Literal",
                                                        "start": 76,
                                                        "end": 87,
                                                        "value": "get yield",
                                                        "raw": "'get yield'"
                                                    }
                                                }]
                                            }
                                        }
                                    },
                                    {
                                        "type": "MethodDefinition",
                                        "start": 105,
                                        "end": 145,
                                        "computed": true,
                                        "key": {
                                            "type": "YieldExpression",
                                            "start": 110,
                                            "end": 115,
                                            "delegate": false,
                                            "argument": null
                                        },
                                        "static": false,
                                        "kind": "set",
                                        "value": {
                                            "type": "FunctionExpression",
                                            "start": 116,
                                            "end": 145,
                                            "id": null,
                                            "generator": false,
                                            "expression": false,
                                            "async": false,
                                            "params": [{
                                                "type": "Identifier",
                                                "start": 117,
                                                "end": 122,
                                                "name": "param"
                                            }],
                                            "body": {
                                                "type": "BlockStatement",
                                                "start": 124,
                                                "end": 145,
                                                "body": [{
                                                    "type": "ExpressionStatement",
                                                    "start": 126,
                                                    "end": 143,
                                                    "expression": {
                                                        "type": "AssignmentExpression",
                                                        "start": 126,
                                                        "end": 142,
                                                        "operator": "=",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "start": 126,
                                                            "end": 134,
                                                            "name": "yieldSet"
                                                        },
                                                        "right": {
                                                            "type": "Identifier",
                                                            "start": 137,
                                                            "end": 142,
                                                            "name": "param"
                                                        }
                                                    }
                                                }]
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "ExpressionStatement",
                            "start": 183,
                            "end": 190,
                            "expression": {
                                "type": "AssignmentExpression",
                                "start": 183,
                                "end": 189,
                                "operator": "=",
                                "left": {
                                    "type": "Identifier",
                                    "start": 183,
                                    "end": 184,
                                    "name": "C"
                                },
                                "right": {
                                    "type": "Identifier",
                                    "start": 187,
                                    "end": 189,
                                    "name": "C_"
                                }
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {;;}"', () => {
        expect(parseScript(`class C {
            get 0o10() { return 'get string'; }
            set 0o10(param) { stringSet = param; }
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 120,
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 120,
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "name": "C"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 120,
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 22,
                      "end": 57,
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "start": 26,
                        "end": 30,
                        "value": 8,
                        "raw": "0o10"
                      },
                      "static": false,
                      "kind": "get",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 30,
                        "end": 57,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 33,
                          "end": 57,
                          "body": [
                            {
                              "type": "ReturnStatement",
                              "start": 35,
                              "end": 55,
                              "argument": {
                                "type": "Literal",
                                "start": 42,
                                "end": 54,
                                "value": "get string",
                                "raw": "'get string'"
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      "type": "MethodDefinition",
                      "start": 70,
                      "end": 108,
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "start": 74,
                        "end": 78,
                        "value": 8,
                        "raw": "0o10"
                      },
                      "static": false,
                      "kind": "set",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 78,
                        "end": 108,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 79,
                            "end": 84,
                            "name": "param"
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 86,
                          "end": 108,
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 88,
                              "end": 106,
                              "expression": {
                                "type": "AssignmentExpression",
                                "start": 88,
                                "end": 105,
                                "operator": "=",
                                "left": {
                                  "type": "Identifier",
                                  "start": 88,
                                  "end": 97,
                                  "name": "stringSet"
                                },
                                "right": {
                                  "type": "Identifier",
                                  "start": 100,
                                  "end": 105,
                                  "name": "param"
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

    it('should parse yield as class name in sloppy mode', () => {
        expect(parseScript(`class A {
              yield() {}
            }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 48,
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 48,
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 48,
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 24,
                      "end": 34,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 24,
                        "end": 29,
                        "name": "yield"
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 29,
                        "end": 34,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 32,
                          "end": 34,
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

    it('should parse "class A {;;}"', () => {
        expect(parseScript(`(class{} / 5)`, {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "/",
                        "left": {
                            "type": "ClassExpression",
                            "id": null,
                            "superClass": null,
                            "body": {
                                "type": "ClassBody",
                                "body": []
                            }
                        },
                        "right": {
                            "type": "Literal",
                            "value": 5,
                            "raw": "5"
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "class Foo {} /regexp/"', () => {
        expect(parseScript(`class Foo {} /regexp/`, {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [{
                    "type": "ClassDeclaration",
                    "start": 0,
                    "end": 12,
                    "id": {
                        "type": "Identifier",
                        "start": 6,
                        "end": 9,
                        "name": "Foo"
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "start": 10,
                        "end": 12,
                        "body": []
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "start": 13,
                    "end": 21,
                    "expression": {
                        "type": "Literal",
                        "start": 13,
                        "end": 21,
                        "value": /regexp/,
                        "regex": {
                            "flags": "",
                            "pattern": "regexp"
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });



    it('should parse "class Foo {} / 2)"', () => {
        expect(parseScript(`(class Foo {} / 2)`, {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "/",
                    "left": {
                        "type": "ClassExpression",
                        "id": {
                            "type": "Identifier",
                            "name": "Foo"
                        },
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": []
                        }
                    },
                    "right": {
                        "type": "Literal",
                        "value": 2,
                        "raw": "2"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse generator method static params trailing comma multiple', () => {
        expect(parseScript(`class C {
            static async *method(a, b,) {
            }
          }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "body": [{
                "body": {
                    "body": [{
                        "computed": false,
                        "end": 65,
                        "key": {
                            "end": 42,
                            "name": "method",
                            "start": 36,
                            "type": "Identifier",
                        },
                        "kind": "method",
                        "start": 22,
                        "static": true,
                        "type": "MethodDefinition",
                        "value": {
                            "async": true,
                            "body": {
                                "body": [],
                                "end": 65,
                                "start": 50,
                                "type": "BlockStatement"
                            },
                            "end": 65,
                            "expression": false,
                            "generator": true,
                            "id": null,
                            "params": [{
                                    "end": 44,
                                    "name": "a",
                                    "start": 43,
                                    "type": "Identifier"
                                },
                                {
                                    "end": 47,
                                    "name": "b",
                                    "start": 46,
                                    "type": "Identifier"
                                },
                            ],
                            "start": 42,
                            "type": "FunctionExpression"
                        }
                    }],
                    "end": 77,
                    "start": 8,
                    "type": "ClassBody"
                },
                "end": 77,
                "id": {
                    "end": 7,
                    "name": "C",
                    "start": 6,
                    "type": "Identifier"
                },
                "start": 0,
                "superClass": null,
                "type": "ClassDeclaration"
            }],
            "end": 77,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse simple async generator with call', () => {
        expect(parseScript(`class C { async *gen() { yield* obj; }}`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "body": [{
                "body": {
                    "body": [{
                        "computed": false,
                        "end": 38,
                        "key": {
                            "end": 20,
                            "name": "gen",
                            "start": 17,
                            "type": "Identifier"
                        },
                        "kind": "method",
                        "start": 10,
                        "static": false,
                        "type": "MethodDefinition",
                        "value": {
                            "async": true,
                            "body": {
                                "body": [{
                                    "end": 36,
                                    "expression": {
                                        "argument": {
                                            "end": 35,
                                            "name": "obj",
                                            "start": 32,
                                            "type": "Identifier"
                                        },
                                        "delegate": true,
                                        "end": 35,
                                        "start": 25,
                                        "type": "YieldExpression"
                                    },
                                    "start": 25,
                                    "type": "ExpressionStatement"
                                }],
                                "end": 38,
                                "start": 23,
                                "type": "BlockStatement"
                            },
                            "end": 38,
                            "expression": false,
                            "generator": true,
                            "id": null,
                            "params": [],
                            "start": 20,
                            "type": "FunctionExpression"
                        }
                    }],
                    "end": 39,
                    "start": 8,
                    "type": "ClassBody"
                },
                "end": 39,
                "id": {
                    "end": 7,
                    "name": "C",
                    "start": 6,
                    "type": "Identifier"
                },
                "start": 0,
                "superClass": null,
                "type": "ClassDeclaration"
            }],
            "end": 39,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse binding with trailing comma', () => {
        expect(parseScript(`class C {
            static async method(a, b = 39,) {
            }
        }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 79,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 79,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "C"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 79,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 22,
                        "end": 69,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 35,
                            "end": 41,
                            "name": "method"
                        },
                        "static": true,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 41,
                            "end": 69,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [{
                                    "type": "Identifier",
                                    "start": 42,
                                    "end": 43,
                                    "name": "a"
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "start": 45,
                                    "end": 51,
                                    "left": {
                                        "type": "Identifier",
                                        "start": 45,
                                        "end": 46,
                                        "name": "b"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "start": 49,
                                        "end": 51,
                                        "value": 39,
                                        "raw": "39"
                                    }
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "start": 54,
                                "end": 69,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse BindingElement with object binding pattern and initializer', () => {
        expect(parseScript(`class C {
            async *method([{ x, y, z } = { x: 44, y: 55, z: 66 }]) {}
        };`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "body": [{
                    "body": {
                        "body": [{
                            "computed": false,
                            "end": 79,
                            "key": {
                                "end": 35,
                                "name": "method",
                                "start": 29,
                                "type": "Identifier"
                            },
                            "kind": "method",
                            "start": 22,
                            "static": false,
                            "type": "MethodDefinition",
                            "value": {
                                "async": true,
                                "body": {
                                    "body": [],
                                    "end": 79,
                                    "start": 77,
                                    "type": "BlockStatement"
                                },
                                "end": 79,
                                "expression": false,
                                "generator": true,
                                "id": null,
                                "params": [{
                                    "elements": [{
                                        "end": 74,
                                        "left": {
                                            "end": 48,
                                            "properties": [{
                                                    "computed": false,
                                                    "end": 40,
                                                    "key": {
                                                        "end": 40,
                                                        "name": "x",
                                                        "start": 39,
                                                        "type": "Identifier"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true,
                                                    "start": 39,
                                                    "type": "Property",
                                                    "value": {
                                                        "end": 40,
                                                        "name": "x",
                                                        "start": 39,
                                                        "type": "Identifier"
                                                    }
                                                },
                                                {
                                                    "computed": false,
                                                    "end": 43,
                                                    "key": {
                                                        "end": 43,
                                                        "name": "y",
                                                        "start": 42,
                                                        "type": "Identifier"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true,
                                                    "start": 42,
                                                    "type": "Property",
                                                    "value": {
                                                        "end": 43,
                                                        "name": "y",
                                                        "start": 42,
                                                        "type": "Identifier"
                                                    }
                                                },
                                                {
                                                    "computed": false,
                                                    "end": 46,
                                                    "key": {
                                                        "end": 46,
                                                        "name": "z",
                                                        "start": 45,
                                                        "type": "Identifier"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true,
                                                    "start": 45,
                                                    "type": "Property",
                                                    "value": {
                                                        "end": 46,
                                                        "name": "z",
                                                        "start": 45,
                                                        "type": "Identifier"
                                                    }
                                                }
                                            ],
                                            "start": 37,
                                            "type": "ObjectPattern"
                                        },
                                        "right": {
                                            "end": 74,
                                            "properties": [{
                                                    "computed": false,
                                                    "end": 58,
                                                    "key": {
                                                        "end": 54,
                                                        "name": "x",
                                                        "start": 53,
                                                        "type": "Identifier"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false,
                                                    "start": 53,
                                                    "type": "Property",
                                                    "value": {
                                                        "end": 58,
                                                        "raw": "44",
                                                        "start": 56,
                                                        "type": "Literal",
                                                        "value": 44,
                                                    }
                                                },
                                                {
                                                    "computed": false,
                                                    "end": 65,
                                                    "key": {
                                                        "end": 61,
                                                        "name": "y",
                                                        "start": 60,
                                                        "type": "Identifier"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false,
                                                    "start": 60,
                                                    "type": "Property",
                                                    "value": {
                                                        "end": 65,
                                                        "raw": "55",
                                                        "start": 63,
                                                        "type": "Literal",
                                                        "value": 55
                                                    }
                                                },
                                                {
                                                    "computed": false,
                                                    "end": 72,
                                                    "key": {
                                                        "end": 68,
                                                        "name": "z",
                                                        "start": 67,
                                                        "type": "Identifier"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false,
                                                    "start": 67,
                                                    "type": "Property",
                                                    "value": {
                                                        "end": 72,
                                                        "raw": "66",
                                                        "start": 70,
                                                        "type": "Literal",
                                                        "value": 66,
                                                    }
                                                }
                                            ],
                                            "start": 51,
                                            "type": "ObjectExpression"
                                        },
                                        "start": 37,
                                        "type": "AssignmentPattern"
                                    }],
                                    "end": 75,
                                    "start": 36,
                                    "type": "ArrayPattern"
                                }],
                                "start": 35,
                                "type": "FunctionExpression"
                            }
                        }],
                        "end": 89,
                        "start": 8,
                        "type": "ClassBody",
                    },
                    "end": 89,
                    "id": {
                        "end": 7,
                        "name": "C",
                        "start": 6,
                        "type": "Identifier",
                    },
                    "start": 0,
                    "superClass": null,
                    "type": "ClassDeclaration"
                },
                {
                    "end": 90,
                    "start": 89,
                    "type": "EmptyStatement"
                }
            ],
            "end": 90,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse double extends', () => {
        expect(parseScript(`class A extends class B extends C {} {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 39,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 39,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": {
                    "type": "ClassExpression",
                    "start": 16,
                    "end": 36,
                    "id": {
                        "type": "Identifier",
                        "start": 22,
                        "end": 23,
                        "name": "B"
                    },
                    "superClass": {
                        "type": "Identifier",
                        "start": 32,
                        "end": 33,
                        "name": "C"
                    },
                    "body": {
                        "type": "ClassBody",
                        "start": 34,
                        "end": 36,
                        "body": []
                    }
                },
                "body": {
                    "type": "ClassBody",
                    "start": 37,
                    "end": 39,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {get() {}}"', () => {
        expect(parseScript(`class A {get() {}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 18,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 18,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 17,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 12,
                            "name": "get"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 12,
                            "end": 17,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 15,
                                "end": 17,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A { static get() {}}"', () => {
        expect(parseScript(`class A { static get() {}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 26,
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 26,
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 26,
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 10,
                      "end": 25,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 17,
                        "end": 20,
                        "name": "get"
                      },
                      "static": true,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 20,
                        "end": 25,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 23,
                          "end": 25,
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

    it('should parse "class A extends B {get foo() {}}"', () => {
        expect(parseScript(`class A extends B {get foo() {}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 32,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 32,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 17,
                    "name": "B"
                },
                "body": {
                    "type": "ClassBody",
                    "start": 18,
                    "end": 32,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 19,
                        "end": 31,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 23,
                            "end": 26,
                            "name": "foo"
                        },
                        "static": false,
                        "kind": "get",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 26,
                            "end": 31,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 29,
                                "end": 31,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {set a(v) {}}"', () => {
        expect(parseScript(`class A {set a(v) {}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 21,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 21,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 20,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 13,
                            "end": 14,
                            "name": "a"
                        },
                        "static": false,
                        "kind": "set",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 14,
                            "end": 20,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [{
                                "type": "Identifier",
                                "start": 15,
                                "end": 16,
                                "name": "v"
                            }],
                            "body": {
                                "type": "BlockStatement",
                                "start": 18,
                                "end": 20,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A { static set a(v) {}}"', () => {
        expect(parseScript(`class A { static set a(v) {}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 29,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 29,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 29,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 10,
                        "end": 28,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 21,
                            "end": 22,
                            "name": "a"
                        },
                        "static": true,
                        "kind": "set",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 22,
                            "end": 28,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [{
                                "type": "Identifier",
                                "start": 23,
                                "end": 24,
                                "name": "v"
                            }],
                            "body": {
                                "type": "BlockStatement",
                                "start": 26,
                                "end": 28,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {set(v) {};}"', () => {
        expect(parseScript(`class A {set(v) {};}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 20,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 20,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 18,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 12,
                            "name": "set"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 12,
                            "end": 18,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [{
                                "type": "Identifier",
                                "start": 13,
                                "end": 14,
                                "name": "v"
                            }],
                            "body": {
                                "type": "BlockStatement",
                                "start": 16,
                                "end": 18,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A { static set(v) {};}"', () => {
        expect(parseScript(`class A { static set(v) {};}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 28,
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 28,
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 10,
                      "end": 26,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 17,
                        "end": 20,
                        "name": "set"
                      },
                      "static": true,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 20,
                        "end": 26,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 21,
                            "end": 22,
                            "name": "v"
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 24,
                          "end": 26,
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
    it('should parse "class A {*gen(v) { yield v; }}"', () => {
        expect(parseScript(`class A {*gen(v) { yield v; }}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 30,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 30,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 29,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 10,
                            "end": 13,
                            "name": "gen"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 13,
                            "end": 29,
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "async": false,
                            "params": [{
                                "type": "Identifier",
                                "start": 14,
                                "end": 15,
                                "name": "v"
                            }],
                            "body": {
                                "type": "BlockStatement",
                                "start": 17,
                                "end": 29,
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "start": 19,
                                    "end": 27,
                                    "expression": {
                                        "type": "YieldExpression",
                                        "start": 19,
                                        "end": 26,
                                        "delegate": false,
                                        "argument": {
                                            "type": "Identifier",
                                            "start": 25,
                                            "end": 26,
                                            "name": "v"
                                        }
                                    }
                                }]
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class Foo { async get() { return 42; }  }"', () => {
        expect(parseScript(`class Foo { async get() { return 42; }  }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 41,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 41
              }
            },
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 41,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 41
                  }
                },
                "id": {
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
                  "name": "Foo"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 10,
                  "end": 41,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 41
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 12,
                      "end": 38,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 12
                        },
                        "end": {
                          "line": 1,
                          "column": 38
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Identifier",
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
                        },
                        "name": "get"
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 21,
                        "end": 38,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 21
                          },
                          "end": {
                            "line": 1,
                            "column": 38
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 24,
                          "end": 38,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 24
                            },
                            "end": {
                              "line": 1,
                              "column": 38
                            }
                          },
                          "body": [
                            {
                              "type": "ReturnStatement",
                              "start": 26,
                              "end": 36,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 26
                                },
                                "end": {
                                  "line": 1,
                                  "column": 36
                                }
                              },
                              "argument": {
                                "type": "Literal",
                                "start": 33,
                                "end": 35,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 33
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 35
                                  }
                                },
                                "value": 42,
                                "raw": "42"
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

    it('should parse "class A { static *gen(v) { yield v; }}"', () => {
        expect(parseScript(`class A { static *gen(v) { yield v; }}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 38,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 38,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 38,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 10,
                        "end": 37,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 18,
                            "end": 21,
                            "name": "gen"
                        },
                        "static": true,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 21,
                            "end": 37,
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "async": false,
                            "params": [{
                                "type": "Identifier",
                                "start": 22,
                                "end": 23,
                                "name": "v"
                            }],
                            "body": {
                                "type": "BlockStatement",
                                "start": 25,
                                "end": 37,
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "start": 27,
                                    "end": 35,
                                    "expression": {
                                        "type": "YieldExpression",
                                        "start": 27,
                                        "end": 34,
                                        "delegate": false,
                                        "argument": {
                                            "type": "Identifier",
                                            "start": 33,
                                            "end": 34,
                                            "name": "v"
                                        }
                                    }
                                }]
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "class A {"constructor"() {}}"', () => {
        expect(parseScript(`class A {"constructor"() {}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 28,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 28,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 27,
                        "computed": false,
                        "key": {
                            "type": "Literal",
                            "start": 9,
                            "end": 22,
                            "value": "constructor",
                            "raw": "\"constructor\""
                        },
                        "static": false,
                        "kind": "constructor",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 22,
                            "end": 27,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 25,
                                "end": 27,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {static foo() {}}"', () => {
        expect(parseScript(`class A {static foo() {}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 25,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 25,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 24,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 19,
                            "name": "foo"
                        },
                        "static": true,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 19,
                            "end": 24,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 22,
                                "end": 24,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {foo() {} static bar() {}}"', () => {
        expect(parseScript(`class A {foo() {} static bar() {}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 34,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 34,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 34,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 9,
                            "end": 17,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 9,
                                "end": 12,
                                "name": "foo"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 12,
                                "end": 17,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 15,
                                    "end": 17,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 18,
                            "end": 33,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 25,
                                "end": 28,
                                "name": "bar"
                            },
                            "static": true,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 28,
                                "end": 33,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 31,
                                    "end": 33,
                                    "body": []
                                }
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A { foo() {} bar() {}}"', () => {
        expect(parseScript(`class A { foo() {} bar() {}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 28,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 28,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 10,
                            "end": 18,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 10,
                                "end": 13,
                                "name": "foo"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 13,
                                "end": 18,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 16,
                                    "end": 18,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 19,
                            "end": 27,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 19,
                                "end": 22,
                                "name": "bar"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 22,
                                "end": 27,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 25,
                                    "end": 27,
                                    "body": []
                                }
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A { get foo() {} set foo(v) {}}"', () => {
        expect(parseScript(`class A { get foo() {} set foo(v) {}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 37,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 37,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 37,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 10,
                            "end": 22,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 14,
                                "end": 17,
                                "name": "foo"
                            },
                            "static": false,
                            "kind": "get",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 17,
                                "end": 22,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 20,
                                    "end": 22,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 23,
                            "end": 36,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 27,
                                "end": 30,
                                "name": "foo"
                            },
                            "static": false,
                            "kind": "set",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 30,
                                "end": 36,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [{
                                    "type": "Identifier",
                                    "start": 31,
                                    "end": 32,
                                    "name": "v"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 34,
                                    "end": 36,
                                    "body": []
                                }
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A { static get foo() {} get foo() {}}"', () => {
        expect(parseScript(`class A { static get foo() {} get foo() {}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 43,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 43,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 43,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 10,
                            "end": 29,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 21,
                                "end": 24,
                                "name": "foo"
                            },
                            "static": true,
                            "kind": "get",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 24,
                                "end": 29,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 27,
                                    "end": 29,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 30,
                            "end": 42,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 34,
                                "end": 37,
                                "name": "foo"
                            },
                            "static": false,
                            "kind": "get",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 37,
                                "end": 42,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 40,
                                    "end": 42,
                                    "body": []
                                }
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A { static get foo() {} static get bar() {} }"', () => {
        expect(parseScript(`class A { static get foo() {} static get bar() {} }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 51,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 51,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 51,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 10,
                            "end": 29,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 21,
                                "end": 24,
                                "name": "foo"
                            },
                            "static": true,
                            "kind": "get",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 24,
                                "end": 29,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 27,
                                    "end": 29,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 30,
                            "end": 49,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 41,
                                "end": 44,
                                "name": "bar"
                            },
                            "static": true,
                            "kind": "get",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 44,
                                "end": 49,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 47,
                                    "end": 49,
                                    "body": []
                                }
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A { static get foo() {} static set foo(v) {} get foo() {} set foo(v) {}}"', () => {
        expect(parseScript(`class A { static get foo() {} static set foo(v) {} get foo() {} set foo(v) {}}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 78,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 78,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 78,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 10,
                            "end": 29,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 21,
                                "end": 24,
                                "name": "foo"
                            },
                            "static": true,
                            "kind": "get",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 24,
                                "end": 29,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 27,
                                    "end": 29,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 30,
                            "end": 50,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 41,
                                "end": 44,
                                "name": "foo"
                            },
                            "static": true,
                            "kind": "set",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 44,
                                "end": 50,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [{
                                    "type": "Identifier",
                                    "start": 45,
                                    "end": 46,
                                    "name": "v"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 48,
                                    "end": 50,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 51,
                            "end": 63,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 55,
                                "end": 58,
                                "name": "foo"
                            },
                            "static": false,
                            "kind": "get",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 58,
                                "end": 63,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 61,
                                    "end": 63,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 64,
                            "end": 77,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 68,
                                "end": 71,
                                "name": "foo"
                            },
                            "static": false,
                            "kind": "set",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 71,
                                "end": 77,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [{
                                    "type": "Identifier",
                                    "start": 72,
                                    "end": 73,
                                    "name": "v"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 75,
                                    "end": 77,
                                    "body": []
                                }
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A { static [foo]() {} }"', () => {
        expect(parseScript(`class A { static [foo]() {} }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 29,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 29,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 29,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 10,
                        "end": 27,
                        "computed": true,
                        "key": {
                            "type": "Identifier",
                            "start": 18,
                            "end": 21,
                            "name": "foo"
                        },
                        "static": true,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 22,
                            "end": 27,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 25,
                                "end": 27,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A { static get [foo]() {} }"', () => {
        expect(parseScript(`class A { static get [foo]() {} }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 33,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 33,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 33,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 10,
                        "end": 31,
                        "computed": true,
                        "key": {
                            "type": "Identifier",
                            "start": 22,
                            "end": 25,
                            "name": "foo"
                        },
                        "static": true,
                        "kind": "get",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 26,
                            "end": 31,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 29,
                                "end": 31,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A { foo() {} get foo() {} }"', () => {
        expect(parseScript(`class A { foo() {} get foo() {} }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 33,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 33,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 33,
                    "body": [{
                            "type": "MethodDefinition",
                            "start": 10,
                            "end": 18,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 10,
                                "end": 13,
                                "name": "foo"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 13,
                                "end": 18,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 16,
                                    "end": 18,
                                    "body": []
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "start": 19,
                            "end": 31,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 23,
                                "end": 26,
                                "name": "foo"
                            },
                            "static": false,
                            "kind": "get",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 26,
                                "end": 31,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 29,
                                    "end": 31,
                                    "body": []
                                }
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class Semicolon { ; }"', () => {
        expect(parseScript(`class Semicolon { ; }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 21,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 15,
                    "name": "Semicolon"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 16,
                    "end": 21,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {async foo() { }}"', () => {
        expect(parseScript(`class A {async foo() { }}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 25,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 25,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 24,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 15,
                            "end": 18,
                            "name": "foo"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 18,
                            "end": 24,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 21,
                                "end": 24,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {static async foo() { }}"', () => {
        expect(parseScript(`class A {static async foo() { }}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 32,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 32,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 32,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 31,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 22,
                            "end": 25,
                            "name": "foo"
                        },
                        "static": true,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 25,
                            "end": 31,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 28,
                                "end": 31,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {async() { }}"', () => {
        expect(parseScript(`class A {async() { }}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 21,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 21,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 20,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 14,
                            "name": "async"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 14,
                            "end": 20,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 17,
                                "end": 20,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "class A {static* async() { }}"', () => {
        expect(parseScript(`class A {static* async() { }}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 29,
            "body": [{
                "type": "ClassDeclaration",
                "start": 0,
                "end": 29,
                "id": {
                    "type": "Identifier",
                    "start": 6,
                    "end": 7,
                    "name": "A"
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 8,
                    "end": 29,
                    "body": [{
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 28,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 17,
                            "end": 22,
                            "name": "async"
                        },
                        "static": true,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 22,
                            "end": 28,
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 25,
                                "end": 28,
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse lexical super property', () => {
        expect(parseScript(`class B extends A {
                incrementer() {
                  (_ => super.increment())();
                }
              }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 131,
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 131,
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "name": "B"
                },
                "superClass": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 17,
                  "name": "A"
                },
                "body": {
                  "type": "ClassBody",
                  "start": 18,
                  "end": 131,
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 36,
                      "end": 115,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 36,
                        "end": 47,
                        "name": "incrementer"
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 47,
                        "end": 115,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 50,
                          "end": 115,
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 70,
                              "end": 97,
                              "expression": {
                                "type": "CallExpression",
                                "start": 70,
                                "end": 96,
                                "callee": {
                                  "type": "ArrowFunctionExpression",
                                  "start": 71,
                                  "end": 93,
                                  "id": null,
                                  "generator": false,
                                  "expression": true,
                                  "async": false,
                                  "params": [
                                    {
                                      "type": "Identifier",
                                      "start": 71,
                                      "end": 72,
                                      "name": "_"
                                    }
                                  ],
                                  "body": {
                                    "type": "CallExpression",
                                    "start": 76,
                                    "end": 93,
                                    "callee": {
                                      "type": "MemberExpression",
                                      "start": 76,
                                      "end": 91,
                                      "object": {
                                        "type": "Super",
                                        "start": 76,
                                        "end": 81
                                      },
                                      "property": {
                                        "type": "Identifier",
                                        "start": 82,
                                        "end": 91,
                                        "name": "increment"
                                      },
                                      "computed": false
                                    },
                                    "arguments": []
                                  }
                                },
                                "arguments": []
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

    it('should parse bindingElement with array binding pattern ', () => {
        expect(parseScript(`class C {
            async *method([[x, y, z] = [4, 5, 6]]) {
            }
          };`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "C",
                        "start": 6,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "method",
                                    "start": 29,
                                    "end": 35,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 25
                                        }
                                    }
                                },
                                "kind": "method",
                                "static": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
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
                                                                "type": "Identifier",
                                                                "name": "x",
                                                                "start": 38,
                                                                "end": 39,
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
                                                                "start": 41,
                                                                "end": 42,
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
                                                                "start": 44,
                                                                "end": 45,
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
                                                        "start": 37,
                                                        "end": 46,
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
                                                    "right": {
                                                        "type": "ArrayExpression",
                                                        "elements": [
                                                            {
                                                                "type": "Literal",
                                                                "value": 4,
                                                                "start": 50,
                                                                "end": 51,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 40
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 41
                                                                    }
                                                                },
                                                                "raw": "4"
                                                            },
                                                            {
                                                                "type": "Literal",
                                                                "value": 5,
                                                                "start": 53,
                                                                "end": 54,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 43
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 44
                                                                    }
                                                                },
                                                                "raw": "5"
                                                            },
                                                            {
                                                                "type": "Literal",
                                                                "value": 6,
                                                                "start": 56,
                                                                "end": 57,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 46
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 47
                                                                    }
                                                                },
                                                                "raw": "6"
                                                            }
                                                        ],
                                                        "start": 49,
                                                        "end": 58,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 39
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 48
                                                            }
                                                        }
                                                    },
                                                    "start": 37,
                                                    "end": 58,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 27
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 48
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 36,
                                            "end": 59,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 26
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 49
                                                }
                                            }
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
                                        "start": 61,
                                        "end": 76,
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
                                    "generator": true,
                                    "async": true,
                                    "expression": false,
                                    "start": 35,
                                    "end": 76,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "start": 22,
                                "end": 76,
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
                        "start": 8,
                        "end": 88,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "start": 0,
                    "end": 88,
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
                },
                {
                    "type": "EmptyStatement",
                    "start": 88,
                    "end": 89,
                    "loc": {
                        "start": {
                            "line": 4,
                            "column": 11
                        },
                        "end": {
                            "line": 4,
                            "column": 12
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
                    "column": 12
                }
            }
        });
    });

    it('should parse destructuring initializer with an undefined value ', () => {
        expect(parseScript(`class C {
            async *method([x = 23]) {
            }
          };`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "C",
                        "start": 6,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "method",
                                    "start": 29,
                                    "end": 35,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 25
                                        }
                                    }
                                },
                                "kind": "method",
                                "static": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [
                                        {
                                            "type": "ArrayPattern",
                                            "elements": [
                                                {
                                                    "type": "AssignmentPattern",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 37,
                                                        "end": 38,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 27
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 28
                                                            }
                                                        }
                                                    },
                                                    "right": {
                                                        "type": "Literal",
                                                        "value": 23,
                                                        "start": 41,
                                                        "end": 43,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 31
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 33
                                                            }
                                                        },
                                                        "raw": "23"
                                                    },
                                                    "start": 37,
                                                    "end": 43,
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
                                            "start": 36,
                                            "end": 44,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 26
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 34
                                                }
                                            }
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
                                        "start": 46,
                                        "end": 61,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 36
                                            },
                                            "end": {
                                                "line": 3,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "generator": true,
                                    "async": true,
                                    "expression": false,
                                    "start": 35,
                                    "end": 61,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "start": 22,
                                "end": 61,
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
                        "start": 8,
                        "end": 73,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "start": 0,
                    "end": 73,
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
                },
                {
                    "type": "EmptyStatement",
                    "start": 73,
                    "end": 74,
                    "loc": {
                        "start": {
                            "line": 4,
                            "column": 11
                        },
                        "end": {
                            "line": 4,
                            "column": 12
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 74,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 12
                }
            }
        });
    });

    it('should parse computed generator', () => {
        expect(parseScript(`class Foo {
            *[Symbol.iterator]() {
            }
        }`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 70,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 9
              }
            },
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 70,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 4,
                    "column": 9
                  }
                },
                "id": {
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
                  "name": "Foo"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 10,
                  "end": 70,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 4,
                      "column": 9
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 24,
                      "end": 60,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 12
                        },
                        "end": {
                          "line": 3,
                          "column": 13
                        }
                      },
                      "computed": true,
                      "key": {
                        "type": "MemberExpression",
                        "start": 26,
                        "end": 41,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 14
                          },
                          "end": {
                            "line": 2,
                            "column": 29
                          }
                        },
                        "object": {
                          "type": "Identifier",
                          "start": 26,
                          "end": 32,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 14
                            },
                            "end": {
                              "line": 2,
                              "column": 20
                            }
                          },
                          "name": "Symbol"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 33,
                          "end": 41,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 21
                            },
                            "end": {
                              "line": 2,
                              "column": 29
                            }
                          },
                          "name": "iterator"
                        },
                        "computed": false
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 42,
                        "end": 60,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 30
                          },
                          "end": {
                            "line": 3,
                            "column": 13
                          }
                        },
                        "id": null,
                        "generator": true,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 45,
                          "end": 60,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 33
                            },
                            "end": {
                              "line": 3,
                              "column": 13
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

    it('should parse nested object destructuring with a null value', () => {
        expect(parseScript(`class C {
            async *method([{ x }]) {
              
            }
          };`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "C",
                        "start": 6,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "method",
                                    "start": 29,
                                    "end": 35,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 25
                                        }
                                    }
                                },
                                "kind": "method",
                                "static": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [
                                        {
                                            "type": "ArrayPattern",
                                            "elements": [
                                                {
                                                    "type": "ObjectPattern",
                                                    "properties": [
                                                        {
                                                            "type": "Property",
                                                            "kind": "init",
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "x",
                                                                "start": 39,
                                                                "end": 40,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 29
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 30
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "value": {
                                                                "type": "Identifier",
                                                                "name": "x",
                                                                "start": 39,
                                                                "end": 40,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 29
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 30
                                                                    }
                                                                }
                                                            },
                                                            "method": false,
                                                            "shorthand": true,
                                                            "start": 39,
                                                            "end": 40,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 29
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 30
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "start": 37,
                                                    "end": 42,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 27
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 32
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 36,
                                            "end": 43,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 26
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 33
                                                }
                                            }
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
                                        "start": 45,
                                        "end": 75,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 35
                                            },
                                            "end": {
                                                "line": 4,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "generator": true,
                                    "async": true,
                                    "expression": false,
                                    "start": 35,
                                    "end": 75,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 13
                                        }
                                    }
                                },
                                "start": 22,
                                "end": 75,
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
                        "start": 8,
                        "end": 87,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 5,
                                "column": 11
                            }
                        }
                    },
                    "start": 0,
                    "end": 87,
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
                },
                {
                    "type": "EmptyStatement",
                    "start": 87,
                    "end": 88,
                    "loc": {
                        "start": {
                            "line": 5,
                            "column": 11
                        },
                        "end": {
                            "line": 5,
                            "column": 12
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 88,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 5,
                    "column": 12
                }
            }
        });
    });

    it('should parse with elison', () => {
        expect(parseScript(`class C {
            async *method([,]) {
              
            }
          };`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "C",
                        "start": 6,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "method",
                                    "start": 29,
                                    "end": 35,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 25
                                        }
                                    }
                                },
                                "kind": "method",
                                "static": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [
                                        {
                                            "type": "ArrayPattern",
                                            "elements": [
                                                null
                                            ],
                                            "start": 36,
                                            "end": 39,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 26
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 29
                                                }
                                            }
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
                                        "start": 41,
                                        "end": 71,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 31
                                            },
                                            "end": {
                                                "line": 4,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "generator": true,
                                    "async": true,
                                    "expression": false,
                                    "start": 35,
                                    "end": 71,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 13
                                        }
                                    }
                                },
                                "start": 22,
                                "end": 71,
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
                        "start": 8,
                        "end": 83,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 5,
                                "column": 11
                            }
                        }
                    },
                    "start": 0,
                    "end": 83,
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
                },
                {
                    "type": "EmptyStatement",
                    "start": 83,
                    "end": 84,
                    "loc": {
                        "start": {
                            "line": 5,
                            "column": 11
                        },
                        "end": {
                            "line": 5,
                            "column": 12
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 84,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 5,
                    "column": 12
                }
            }
        });
    });

    it('should parse rest element following elision elements', () => {
        expect(parseScript(`class C {
            async *method([ , , ...x]) {
            }
          };`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "C",
                        "start": 6,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "method",
                                    "start": 29,
                                    "end": 35,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 25
                                        }
                                    }
                                },
                                "kind": "method",
                                "static": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [
                                        {
                                            "type": "ArrayPattern",
                                            "elements": [
                                                null,
                                                null,
                                                {
                                                    "type": "RestElement",
                                                    "argument": {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 45,
                                                        "end": 46,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 35
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 36
                                                            }
                                                        }
                                                    },
                                                    "start": 42,
                                                    "end": 46,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 32
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 36
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 36,
                                            "end": 47,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 26
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 37
                                                }
                                            }
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
                                        "start": 49,
                                        "end": 64,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 39
                                            },
                                            "end": {
                                                "line": 3,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "generator": true,
                                    "async": true,
                                    "expression": false,
                                    "start": 35,
                                    "end": 64,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "start": 22,
                                "end": 64,
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
                        "start": 8,
                        "end": 76,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "start": 0,
                    "end": 76,
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
                },
                {
                    "type": "EmptyStatement",
                    "start": 76,
                    "end": 77,
                    "loc": {
                        "start": {
                            "line": 4,
                            "column": 11
                        },
                        "end": {
                            "line": 4,
                            "column": 12
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 77,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 12
                }
            }
        });
    });

    it('should parse bindingElement with array binding pattern', () => {
        expect(parseScript(`class C {
            async *method([[] = function() { return function*() {}(); }()] = []) {
            }
          };`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "C",
                        "start": 6,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "method",
                                    "start": 29,
                                    "end": 35,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 25
                                        }
                                    }
                                },
                                "kind": "method",
                                "static": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [
                                        {
                                            "type": "AssignmentPattern",
                                            "left": {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "AssignmentPattern",
                                                        "left": {
                                                            "type": "ArrayPattern",
                                                            "elements": [],
                                                            "start": 37,
                                                            "end": 39,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 27
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 29
                                                                }
                                                            }
                                                        },
                                                        "right": {
                                                            "type": "CallExpression",
                                                            "arguments": [],
                                                            "callee": {
                                                                "type": "FunctionExpression",
                                                                "params": [],
                                                                "body": {
                                                                    "type": "BlockStatement",
                                                                    "body": [
                                                                        {
                                                                            "type": "ReturnStatement",
                                                                            "argument": {
                                                                                "type": "CallExpression",
                                                                                "arguments": [],
                                                                                "callee": {
                                                                                    "type": "FunctionExpression",
                                                                                    "params": [],
                                                                                    "body": {
                                                                                        "type": "BlockStatement",
                                                                                        "body": [],
                                                                                        "start": 74,
                                                                                        "end": 76,
                                                                                        "loc": {
                                                                                            "start": {
                                                                                                "line": 2,
                                                                                                "column": 64
                                                                                            },
                                                                                            "end": {
                                                                                                "line": 2,
                                                                                                "column": 66
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    "async": false,
                                                                                    "generator": true,
                                                                                    "expression": false,
                                                                                    "id": null,
                                                                                    "start": 62,
                                                                                    "end": 76,
                                                                                    "loc": {
                                                                                        "start": {
                                                                                            "line": 2,
                                                                                            "column": 52
                                                                                        },
                                                                                        "end": {
                                                                                            "line": 2,
                                                                                            "column": 66
                                                                                        }
                                                                                    }
                                                                                },
                                                                                "start": 62,
                                                                                "end": 78,
                                                                                "loc": {
                                                                                    "start": {
                                                                                        "line": 2,
                                                                                        "column": 52
                                                                                    },
                                                                                    "end": {
                                                                                        "line": 2,
                                                                                        "column": 68
                                                                                    }
                                                                                }
                                                                            },
                                                                            "start": 55,
                                                                            "end": 79,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 2,
                                                                                    "column": 45
                                                                                },
                                                                                "end": {
                                                                                    "line": 2,
                                                                                    "column": 69
                                                                                }
                                                                            }
                                                                        }
                                                                    ],
                                                                    "start": 53,
                                                                    "end": 81,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 43
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 71
                                                                        }
                                                                    }
                                                                },
                                                                "async": false,
                                                                "generator": false,
                                                                "expression": false,
                                                                "id": null,
                                                                "start": 42,
                                                                "end": 81,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 32
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 71
                                                                    }
                                                                }
                                                            },
                                                            "start": 42,
                                                            "end": 83,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 32
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 73
                                                                }
                                                            }
                                                        },
                                                        "start": 37,
                                                        "end": 83,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 27
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 73
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 36,
                                                "end": 84,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 26
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 74
                                                    }
                                                }
                                            },
                                            "right": {
                                                "type": "ArrayExpression",
                                                "elements": [],
                                                "start": 87,
                                                "end": 89,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 77
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 79
                                                    }
                                                }
                                            },
                                            "start": 36,
                                            "end": 89,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 26
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 79
                                                }
                                            }
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
                                        "start": 91,
                                        "end": 106,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 81
                                            },
                                            "end": {
                                                "line": 3,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "generator": true,
                                    "async": true,
                                    "expression": false,
                                    "start": 35,
                                    "end": 106,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "start": 22,
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
                        "start": 8,
                        "end": 118,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 4,
                                "column": 11
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
                },
                {
                    "type": "EmptyStatement",
                    "start": 118,
                    "end": 119,
                    "loc": {
                        "start": {
                            "line": 4,
                            "column": 11
                        },
                        "end": {
                            "line": 4,
                            "column": 12
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 119,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 12
                }
            }
        });
    });

    it('should parse object binding pattern with "nested" array binding pattern', () => {
        expect(parseScript(`class C {
            async *method({ w: [x, y, z] = [4, 5, 6] }) {
            }
          };`, {
            ranges: true,
            locations: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "C",
                        "start": 6,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "method",
                                    "start": 29,
                                    "end": 35,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 25
                                        }
                                    }
                                },
                                "kind": "method",
                                "static": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [
                                        {
                                            "type": "ObjectPattern",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "kind": "init",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "w",
                                                        "start": 38,
                                                        "end": 39,
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
                                                    "computed": false,
                                                    "value": {
                                                        "type": "AssignmentPattern",
                                                        "left": {
                                                            "type": "ArrayPattern",
                                                            "elements": [
                                                                {
                                                                    "type": "Identifier",
                                                                    "name": "x",
                                                                    "start": 42,
                                                                    "end": 43,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 32
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 33
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "type": "Identifier",
                                                                    "name": "y",
                                                                    "start": 45,
                                                                    "end": 46,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 35
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 36
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "type": "Identifier",
                                                                    "name": "z",
                                                                    "start": 48,
                                                                    "end": 49,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 38
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 39
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            "start": 41,
                                                            "end": 50,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 31
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 40
                                                                }
                                                            }
                                                        },
                                                        "right": {
                                                            "type": "ArrayExpression",
                                                            "elements": [
                                                                {
                                                                    "type": "Literal",
                                                                    "value": 4,
                                                                    "start": 54,
                                                                    "end": 55,
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
                                                                {
                                                                    "type": "Literal",
                                                                    "value": 5,
                                                                    "start": 57,
                                                                    "end": 58,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 47
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 48
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "type": "Literal",
                                                                    "value": 6,
                                                                    "start": 60,
                                                                    "end": 61,
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
                                                                }
                                                            ],
                                                            "start": 53,
                                                            "end": 62,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 43
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 52
                                                                }
                                                            }
                                                        },
                                                        "start": 41,
                                                        "end": 62,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 31
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 52
                                                            }
                                                        }
                                                    },
                                                    "method": false,
                                                    "shorthand": false,
                                                    "start": 38,
                                                    "end": 62,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 28
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 52
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 36,
                                            "end": 64,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 26
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 54
                                                }
                                            }
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
                                        "start": 66,
                                        "end": 81,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 56
                                            },
                                            "end": {
                                                "line": 3,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "generator": true,
                                    "async": true,
                                    "expression": false,
                                    "start": 35,
                                    "end": 81,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "start": 22,
                                "end": 81,
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
                        "start": 8,
                        "end": 93,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "start": 0,
                    "end": 93,
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
                },
                {
                    "type": "EmptyStatement",
                    "start": 93,
                    "end": 94,
                    "loc": {
                        "start": {
                            "line": 4,
                            "column": 11
                        },
                        "end": {
                            "line": 4,
                            "column": 12
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 94,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 12
                }
            }
        });
    });

    it('should parse rest element containing an elision (static class expression async generator method)', () => {
        expect(parseScript(`class C {
            static async *method([...[,]]) {
            }
          };`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "C",
                        "start": 6,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "method",
                                    "start": 36,
                                    "end": 42,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 26
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 32
                                        }
                                    }
                                },
                                "kind": "method",
                                "static": true,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
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
                                                        ],
                                                        "start": 44,
                                                        "end": 50,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 34
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 40
                                                            }
                                                        }
                                                    },
                                                    "start": 44,
                                                    "end": 50,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 34
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 40
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 43,
                                            "end": 51,
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
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
                                        "start": 53,
                                        "end": 68,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 43
                                            },
                                            "end": {
                                                "line": 3,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "generator": true,
                                    "async": true,
                                    "expression": false,
                                    "start": 42,
                                    "end": 68,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 32
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "start": 22,
                                "end": 68,
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
                        "start": 8,
                        "end": 80,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "start": 0,
                    "end": 80,
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
                },
                {
                    "type": "EmptyStatement",
                    "start": 80,
                    "end": 81,
                    "loc": {
                        "start": {
                            "line": 4,
                            "column": 11
                        },
                        "end": {
                            "line": 4,
                            "column": 12
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 81,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 12
                }
            }
        });
    });

    it('should parse trailing comma following binding property list (static class expression async generator method)', () => {
        expect(parseScript(`class C {
            static async *method({ x: y, }) {
            }
          };`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "C",
                        "start": 6,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "method",
                                    "start": 36,
                                    "end": 42,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 26
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 32
                                        }
                                    }
                                },
                                "kind": "method",
                                "static": true,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [
                                        {
                                            "type": "ObjectPattern",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "kind": "init",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "x",
                                                        "start": 45,
                                                        "end": 46,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 35
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 36
                                                            }
                                                        }
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "y",
                                                        "start": 48,
                                                        "end": 49,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 38
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 39
                                                            }
                                                        }
                                                    },
                                                    "method": false,
                                                    "shorthand": false,
                                                    "start": 45,
                                                    "end": 49,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 35
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 39
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 43,
                                            "end": 52,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 33
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 42
                                                }
                                            }
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
                                        "start": 54,
                                        "end": 69,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 44
                                            },
                                            "end": {
                                                "line": 3,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "generator": true,
                                    "async": true,
                                    "expression": false,
                                    "start": 42,
                                    "end": 69,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 32
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                },
                                "start": 22,
                                "end": 69,
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
                        "start": 8,
                        "end": 81,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 4,
                                "column": 11
                            }
                        }
                    },
                    "start": 0,
                    "end": 81,
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
                },
                {
                    "type": "EmptyStatement",
                    "start": 81,
                    "end": 82,
                    "loc": {
                        "start": {
                            "line": 4,
                            "column": 11
                        },
                        "end": {
                            "line": 4,
                            "column": 12
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 82,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 12
                }
            }
        });
    });

    it('should parse nested object destructuring with a value of `undefined` (class expression method)', () => {
        expect(parseScript(`class C {
            *method([{ x }]) {}
          };`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "C",
                        "start": 6,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "method",
                                    "start": 23,
                                    "end": 29,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 13
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 19
                                        }
                                    }
                                },
                                "kind": "method",
                                "static": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [
                                        {
                                            "type": "ArrayPattern",
                                            "elements": [
                                                {
                                                    "type": "ObjectPattern",
                                                    "properties": [
                                                        {
                                                            "type": "Property",
                                                            "kind": "init",
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "x",
                                                                "start": 33,
                                                                "end": 34,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 23
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 24
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "value": {
                                                                "type": "Identifier",
                                                                "name": "x",
                                                                "start": 33,
                                                                "end": 34,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 23
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 24
                                                                    }
                                                                }
                                                            },
                                                            "method": false,
                                                            "shorthand": true,
                                                            "start": 33,
                                                            "end": 34,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 23
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 24
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "start": 31,
                                                    "end": 36,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 21
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 26
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 30,
                                            "end": 37,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 20
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 27
                                                }
                                            }
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
                                        "start": 39,
                                        "end": 41,
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
                                    "generator": true,
                                    "async": false,
                                    "expression": false,
                                    "start": 29,
                                    "end": 41,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 31
                                        }
                                    }
                                },
                                "start": 22,
                                "end": 41,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 31
                                    }
                                }
                            }
                        ],
                        "start": 8,
                        "end": 53,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 3,
                                "column": 11
                            }
                        }
                    },
                    "start": 0,
                    "end": 53,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 3,
                            "column": 11
                        }
                    }
                },
                {
                    "type": "EmptyStatement",
                    "start": 53,
                    "end": 54,
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 11
                        },
                        "end": {
                            "line": 3,
                            "column": 12
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 54,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 3,
                    "column": 12
                }
            }
        });
    });

});