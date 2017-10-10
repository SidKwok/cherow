import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Async Arrow function', () => {
  
  it('should fail on arrow NSPL with USD', () => {
    expect(() => {
        parseScript(`a () => {}`);
    }).to.throw()
});
      it('should fail on arrow NSPL with USD', () => {
          expect(() => {
              parseScript(`async (x = 1) => {"use strict"}`);
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
              }
            ],
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
            "body": [
                {
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
                        "params": [
                            {
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
                }
            ],
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
  
      it('should parse parse async arrow yield', () => {
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
  
  
      it('should parse parse async arrow yield', () => {
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
  
      it('should parse parse async arrow yield', () => {
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
  
  });