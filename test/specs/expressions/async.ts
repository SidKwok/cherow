import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Async', () => {

  
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
                "arguments": [
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
        }
      ],
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
            "params": [
              {
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
            ],
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
        }
      ],
      "sourceType": "script"
    });
  });

  it('should parse await function name', () => {
    expect(parseScript(`async function await() {}`, {
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
          "type": "FunctionDeclaration",
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
          "id": {
            "type": "Identifier",
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
            "name": "await"
          },
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
      ],
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
              "arguments": [
                {
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
                }
              ]
            }
          }
        }
      ],
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
      "end": 28,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 2,
          "column": 18
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
          "start": 14,
          "end": 28,
          "loc": {
            "start": {
              "line": 2,
              "column": 4
            },
            "end": {
              "line": 2,
              "column": 18
            }
          },
          "id": {
            "type": "Identifier",
            "start": 23,
            "end": 24,
            "loc": {
              "start": {
                "line": 2,
                "column": 13
              },
              "end": {
                "line": 2,
                "column": 14
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
            "start": 26,
            "end": 28,
            "loc": {
              "start": {
                "line": 2,
                "column": 16
              },
              "end": {
                "line": 2,
                "column": 18
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
      "body": [
        {
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
      "body": [
        {
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
        }
      ],
      "sourceType": "script"
    });
  });

  it('should parse parse line terminator async', () => {
    expect(parseScript(`async
    function f() {}`, {
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
          "line": 2,
          "column": 19
        }
      },
      "body": [
        {
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
        },
        {
          "type": "FunctionDeclaration",
          "start": 10,
          "end": 25,
          "loc": {
            "start": {
              "line": 2,
              "column": 4
            },
            "end": {
              "line": 2,
              "column": 19
            }
          },
          "id": {
            "type": "Identifier",
            "start": 19,
            "end": 20,
            "loc": {
              "start": {
                "line": 2,
                "column": 13
              },
              "end": {
                "line": 2,
                "column": 14
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
            "start": 23,
            "end": 25,
            "loc": {
              "start": {
                "line": 2,
                "column": 17
              },
              "end": {
                "line": 2,
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
});
