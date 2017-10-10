import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Async Arrow function', () => {

    it('should fail on arrow NSPL with USD', () => {
        expect(() => {
            parseScript(`a () => {}`);
        }).to.throw()
    });

    it('should fail on invalid parenthesized pattern', () => {
        expect(() => {
            parseScript(`f = async ((x)) => x`);
        }).to.throw()
    });
    
    it('should fail on arrow NSPL with USD', () => {
        expect(() => {
            parseScript(`async (x = 1) => {"use strict"}`);
        }).to.throw()
    });

    it('should fail on invalid async line terminator with await', () => {
        expect(() => {
            parseScript(`async a
            => await a`);
        }).to.throw()
    });

    it('should fail if "async()" call expression has arrow', () => {
        expect(() => {
            parseScript(`async\n() => a`);
        }).to.throw()
    });

    it('should fail if use of "await" inside async function (parenthesized)', () => {
        expect(() => {
            parseScript(`async (await) => 1`);
        }).to.throw()
    });

    it('should fail if use of "await" inside async function (non-parenthesized)', () => {
        expect(() => {
            parseScript(`async await => 1`);
        }).to.throw()
    });

    it('should fail on invalid async line terminator after paren', () => {
        expect(() => {
            parseScript(`async ()
            => 0`);
        }).to.throw()
    });

    it('should fail on invalid async line terminator after async', () => {
        expect(() => {
            parseScript(`async
            (a) => await a`);
        }).to.throw()
    });

    it('should fail if FormalParameters contains "arguments" ( strict)', () => {
        expect(() => {
            parseScript(`"use strict"; async(arguments) => {  }`);
        }).to.throw()
    });

    it('should fail if FormalParameters contains "eval" ( strict)', () => {
        expect(() => {
            parseScript(`"use strict"; async(eval) => {  }`);
        }).to.throw()
    });

    it('should fail if FormalParameters "eval" after comma ( strict)', () => {
        expect(() => {
            parseScript(`"use strict"; async(a, eval) => {  }`);
        }).to.throw()
    });

    it('should fail if await in formals', () => {
        expect(() => {
            parseScript(`async(await) => {  }`);
        }).to.throw()
    });

    it('should fail if duplicate parameters (strict)', () => {
        expect(() => {
            parseScript(`"use strict"; async(a, a) => { }`);
        }).to.throw()
    });

    it('should fail if formals body has duplicates', () => {
        expect(() => {
            parseScript(`async(bar) => { let bar; }`);
        }).to.throw()
    });

    it('should fail if linebreak between "async" and formals', () => {
        expect(() => {
            parseScript(`async
        (foo) => { }`);
        }).to.throw()
    })
    // This need to be recorded **before* parsing out the async conextual keyword
    it('should fail if async contain unicode', () => {
        expect(() => {
            parseScript(`\\u0061sync () => {}`);
        }).to.not.throw()
    })

    

    it('should parse with comma dangle', () => {
        expect(parseScript(`async () => a
        async () => {
        
         () => {
            async () => a
         }
          
        
        }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 128,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 9,
                "column": 9
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 13
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "Identifier",
                    "start": 12,
                    "end": 13,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 12
                      },
                      "end": {
                        "line": 1,
                        "column": 13
                      }
                    },
                    "name": "a"
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 22,
                "end": 128,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 8
                  },
                  "end": {
                    "line": 9,
                    "column": 9
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 22,
                  "end": 128,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 8
                    },
                    "end": {
                      "line": 9,
                      "column": 9
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 34,
                    "end": 128,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 20
                      },
                      "end": {
                        "line": 9,
                        "column": 9
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 54,
                        "end": 98,
                        "loc": {
                          "start": {
                            "line": 4,
                            "column": 9
                          },
                          "end": {
                            "line": 6,
                            "column": 10
                          }
                        },
                        "expression": {
                          "type": "ArrowFunctionExpression",
                          "start": 54,
                          "end": 98,
                          "loc": {
                            "start": {
                              "line": 4,
                              "column": 9
                            },
                            "end": {
                              "line": 6,
                              "column": 10
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 60,
                            "end": 98,
                            "loc": {
                              "start": {
                                "line": 4,
                                "column": 15
                              },
                              "end": {
                                "line": 6,
                                "column": 10
                              }
                            },
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "start": 74,
                                "end": 87,
                                "loc": {
                                  "start": {
                                    "line": 5,
                                    "column": 12
                                  },
                                  "end": {
                                    "line": 5,
                                    "column": 25
                                  }
                                },
                                "expression": {
                                  "type": "ArrowFunctionExpression",
                                  "start": 74,
                                  "end": 87,
                                  "loc": {
                                    "start": {
                                      "line": 5,
                                      "column": 12
                                    },
                                    "end": {
                                      "line": 5,
                                      "column": 25
                                    }
                                  },
                                  "id": null,
                                  "generator": false,
                                  "expression": true,
                                  "async": true,
                                  "params": [],
                                  "body": {
                                    "type": "Identifier",
                                    "start": 86,
                                    "end": 87,
                                    "loc": {
                                      "start": {
                                        "line": 5,
                                        "column": 24
                                      },
                                      "end": {
                                        "line": 5,
                                        "column": 25
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
              }
            ],
            "sourceType": "script"
          });
    });
    
    it.skip('should parse with comma dangle', () => {
        expect(parseScript(`
              async c => c => 123
              a(b, c => 123)
              `, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({});
    });
    

    it('should parse with comma dangle', () => {
        expect(parseScript(`async(a, b, ) => { }`, {
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
            "body": [{
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "ArrowFunctionExpression",
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
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": true,
                    "params": [{
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
                            "name": "a"
                        },
                        {
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
                            "name": "b"
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
            }],
            "sourceType": "script"
        });
    });

    it('should parse duplicate params (sloppy mode)', () => {
        expect(parseScript(`async(a, a) => { }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
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
                        }
                    },
                    "params": [{
                            "type": "Identifier",
                            "name": "a",
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
                        {
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
                        }
                    ],
                    "id": null,
                    "async": true,
                    "generator": false,
                    "expression": false,
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
                    }
                },
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
                }
            }],
            "sourceType": "script",
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
            }
        });
    });

    it('should parse with multiple params', () => {
        expect(parseScript(`async (a, b, c) => a`, {
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
            "body": [{
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "ArrowFunctionExpression",
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
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": true,
                    "params": [{
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
                            "name": "a"
                        },
                        {
                            "type": "Identifier",
                            "start": 10,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            },
                            "name": "b"
                        },
                        {
                            "type": "Identifier",
                            "start": 13,
                            "end": 14,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 14
                                }
                            },
                            "name": "c"
                        }
                    ],
                    "body": {
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
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async arrow yield', () => {
        expect(parseScript(`async (a) => a`, {
            ranges: true,
            raw: true,
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
            "body": [{
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "ArrowFunctionExpression",
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
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": true,
                    "params": [{
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
                        "name": "a"
                    }],
                    "body": {
                        "type": "Identifier",
                        "start": 13,
                        "end": 14,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        },
                        "name": "a"
                    }
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse async arrow yield', () => {
        expect(parseScript(`async a => a`, {
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
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": true,
                    "params": [{
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
                        "name": "a"
                    }],
                    "body": {
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
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async arrow yield', () => {
        expect(parseScript(`async yield => 0;`, {
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
                    "type": "ArrowFunctionExpression",
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
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": true,
                    "params": [{
                        "type": "Identifier",
                        "start": 6,
                        "end": 11,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 11
                            }
                        },
                        "name": "yield"
                    }],
                    "body": {
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
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse assigned async arrow', () => {
        expect(parseScript(`id = async x => x, square = async (y) => { y * y }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 50,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 50
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 50,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 50
                  }
                },
                "expression": {
                  "type": "SequenceExpression",
                  "start": 0,
                  "end": 50,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 50
                    }
                  },
                  "expressions": [
                    {
                      "type": "AssignmentExpression",
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
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 2,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 0
                          },
                          "end": {
                            "line": 1,
                            "column": 2
                          }
                        },
                        "name": "id"
                      },
                      "right": {
                        "type": "ArrowFunctionExpression",
                        "start": 5,
                        "end": 17,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 5
                          },
                          "end": {
                            "line": 1,
                            "column": 17
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
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
                            "name": "x"
                          }
                        ],
                        "body": {
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
                          "name": "x"
                        }
                      }
                    },
                    {
                      "type": "AssignmentExpression",
                      "start": 19,
                      "end": 50,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 19
                        },
                        "end": {
                          "line": 1,
                          "column": 50
                        }
                      },
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "start": 19,
                        "end": 25,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 19
                          },
                          "end": {
                            "line": 1,
                            "column": 25
                          }
                        },
                        "name": "square"
                      },
                      "right": {
                        "type": "ArrowFunctionExpression",
                        "start": 28,
                        "end": 50,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 28
                          },
                          "end": {
                            "line": 1,
                            "column": 50
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 35,
                            "end": 36,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 35
                              },
                              "end": {
                                "line": 1,
                                "column": 36
                              }
                            },
                            "name": "y"
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
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
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 43,
                              "end": 48,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 43
                                },
                                "end": {
                                  "line": 1,
                                  "column": 48
                                }
                              },
                              "expression": {
                                "type": "BinaryExpression",
                                "start": 43,
                                "end": 48,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 43
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 48
                                  }
                                },
                                "left": {
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
                                  "name": "y"
                                },
                                "operator": "*",
                                "right": {
                                  "type": "Identifier",
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
                                  },
                                  "name": "y"
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

    it('should parse async arrow last parameter', () => {
        expect(parseScript(`f(a, async b => await b)`, {
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
                  "type": "CallExpression",
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
                  "arguments": [
                    {
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
                      "name": "a"
                    },
                    {
                      "type": "ArrowFunctionExpression",
                      "start": 5,
                      "end": 23,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 5
                        },
                        "end": {
                          "line": 1,
                          "column": 23
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
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
                          "name": "b"
                        }
                      ],
                      "body": {
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
                          "name": "b"
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

    it('should parse async arrow as parameter', () => {
        expect(parseScript(`f(a, async (b, c) => await [b, c], d)`, {
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "CallExpression",
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
                  "arguments": [
                    {
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
                      "name": "a"
                    },
                    {
                      "type": "ArrowFunctionExpression",
                      "start": 5,
                      "end": 33,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 5
                        },
                        "end": {
                          "line": 1,
                          "column": 33
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 12,
                          "end": 13,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 13
                            }
                          },
                          "name": "b"
                        },
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
                          "name": "c"
                        }
                      ],
                      "body": {
                        "type": "AwaitExpression",
                        "start": 21,
                        "end": 33,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 21
                          },
                          "end": {
                            "line": 1,
                            "column": 33
                          }
                        },
                        "argument": {
                          "type": "ArrayExpression",
                          "start": 27,
                          "end": 33,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 27
                            },
                            "end": {
                              "line": 1,
                              "column": 33
                            }
                          },
                          "elements": [
                            {
                              "type": "Identifier",
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
                              },
                              "name": "b"
                            },
                            {
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
                              "name": "c"
                            }
                          ]
                        }
                      }
                    },
                    {
                      "type": "Identifier",
                      "start": 35,
                      "end": 36,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 35
                        },
                        "end": {
                          "line": 1,
                          "column": 36
                        }
                      },
                      "name": "d"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async arrow multi args await', () => {
        expect(parseScript(`async (a, b) => { await a }`, {
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
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
                      "name": "a"
                    },
                    {
                      "type": "Identifier",
                      "start": 10,
                      "end": 11,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 11
                        }
                      },
                      "name": "b"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 16,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 18,
                        "end": 25,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 25
                          }
                        },
                        "expression": {
                          "type": "AwaitExpression",
                          "start": 18,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 1,
                              "column": 25
                            }
                          },
                          "argument": {
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

    it('should parse async arrow multi args concise await', () => {
        expect(parseScript(`async (a, b) => await a`, {
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
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
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
                      "name": "a"
                    },
                    {
                      "type": "Identifier",
                      "start": 10,
                      "end": 11,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 11
                        }
                      },
                      "name": "b"
                    }
                  ],
                  "body": {
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
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async arrow multi args concise', () => {
        expect(parseScript(`async (x, y) => y`, {
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
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
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
                      "name": "x"
                    },
                    {
                      "type": "Identifier",
                      "start": 10,
                      "end": 11,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 11
                        }
                      },
                      "name": "y"
                    }
                  ],
                  "body": {
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
                    "name": "y"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async arrow multi args', () => {
        expect(parseScript(`async (x, y) => { x * y }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 25
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 25,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 25
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 25,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
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
                      "name": "x"
                    },
                    {
                      "type": "Identifier",
                      "start": 10,
                      "end": 11,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 11
                        }
                      },
                      "name": "y"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 16,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 18,
                        "end": 23,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 23
                          }
                        },
                        "expression": {
                          "type": "BinaryExpression",
                          "start": 18,
                          "end": 23,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 1,
                              "column": 23
                            }
                          },
                          "left": {
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
                            "name": "x"
                          },
                          "operator": "*",
                          "right": {
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
                            "name": "y"
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

    it('should parse async arrow no args', () => {
        expect(parseScript(`async () => 42`, {
            ranges: true,
            raw: true,
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "Literal",
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
                    "value": 42,
                    "raw": "42"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it.skip('should parse async arrow object pattern parameter', () => {
        expect(parseScript(`async ({x: y = z}) => x`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({});
    });

    it('should parse async arrow one arg await', () => {
        expect(parseScript(`async a => { await a }`, {
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
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
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
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 11,
                    "end": 22,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 11
                      },
                      "end": {
                        "line": 1,
                        "column": 22
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 13,
                        "end": 20,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 13
                          },
                          "end": {
                            "line": 1,
                            "column": 20
                          }
                        },
                        "expression": {
                          "type": "AwaitExpression",
                          "start": 13,
                          "end": 20,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 13
                            },
                            "end": {
                              "line": 1,
                              "column": 20
                            }
                          },
                          "argument": {
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

    it('should parse async arrow one arg concise await', () => {
        expect(parseScript(`async a => await a`, {
            ranges: true,
            raw: true,
            locations: true
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
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
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
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "AwaitExpression",
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
                    "argument": {
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
                      "name": "a"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async arrow one arg concise', () => {
        expect(parseScript(`async y => y`, {
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
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
                      "name": "y"
                    }
                  ],
                  "body": {
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
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async arrow one arg', () => {
        expect(parseScript(`async x => { x * x }`, {
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
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
                      "name": "x"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
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
                    "body": [
                      {
                        "type": "ExpressionStatement",
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
                        "expression": {
                          "type": "BinaryExpression",
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
                          "left": {
                            "type": "Identifier",
                            "start": 13,
                            "end": 14,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 13
                              },
                              "end": {
                                "line": 1,
                                "column": 14
                              }
                            },
                            "name": "x"
                          },
                          "operator": "*",
                          "right": {
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
                            "name": "x"
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

    it('should parse async arrow parenthesized await', () => {
        expect(parseScript(`async (a) => { await a }`, {
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
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
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
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 13,
                    "end": 24,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 24
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 15,
                        "end": 22,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 15
                          },
                          "end": {
                            "line": 1,
                            "column": 22
                          }
                        },
                        "expression": {
                          "type": "AwaitExpression",
                          "start": 15,
                          "end": 22,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 15
                            },
                            "end": {
                              "line": 1,
                              "column": 22
                            }
                          },
                          "argument": {
                            "type": "Identifier",
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
                            },
                            "name": "a"
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

    it('should parse async arrow parenthesized concise await', () => {
        expect(parseScript(`async (a) => await a`, {
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
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
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "AwaitExpression",
                    "start": 13,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "argument": {
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
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async arrow yield', () => {
        expect(parseScript(`async (y) => y`, {
            ranges: true,
            raw: true,
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
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
                      "name": "y"
                    }
                  ],
                  "body": {
                    "type": "Identifier",
                    "start": 13,
                    "end": 14,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 14
                      }
                    },
                    "name": "y"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async arrow parenthesized yield', () => {
        expect(parseScript(`async (yield) => 1;`, {
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
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
                      "name": "yield"
                    }
                  ],
                  "body": {
                    "type": "Literal",
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
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async arrow parenthesized', () => {
        expect(parseScript(`async (x) => { x * x }`, {
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
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
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
                      "name": "x"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 13,
                    "end": 22,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 22
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
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
                        "expression": {
                          "type": "BinaryExpression",
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
                          "left": {
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
                            "name": "x"
                          },
                          "operator": "*",
                          "right": {
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
                            "name": "x"
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

    
});