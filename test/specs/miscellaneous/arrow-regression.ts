import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Arrow regression', () => {
 

    it('should parse complex #1', () => {
        expect(parseScript(`async () => {}
        () => {}
        async b => {}
        async b => {}
        async () => {}
        async () => {}
        () => {}
        a => {}
        a => {}
        async () => {}
        () => {}
        a => {}
        async () => {}
        () => {}
        async () => {}
        a => {}
        async () => {}
        async () => {}
        () => {}`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 368,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 19,
              "column": 16
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
                "expression": false,
                "async": true,
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
              "type": "ExpressionStatement",
              "start": 23,
              "end": 31,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 8
                },
                "end": {
                  "line": 2,
                  "column": 16
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 23,
                "end": 31,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 8
                  },
                  "end": {
                    "line": 2,
                    "column": 16
                  }
                },
                "id": null,
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
                      "line": 2,
                      "column": 14
                    },
                    "end": {
                      "line": 2,
                      "column": 16
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 40,
              "end": 53,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 8
                },
                "end": {
                  "line": 3,
                  "column": 21
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 40,
                "end": 53,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 8
                  },
                  "end": {
                    "line": 3,
                    "column": 21
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 46,
                    "end": 47,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 14
                      },
                      "end": {
                        "line": 3,
                        "column": 15
                      }
                    },
                    "name": "b"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 51,
                  "end": 53,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 19
                    },
                    "end": {
                      "line": 3,
                      "column": 21
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 62,
              "end": 75,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 8
                },
                "end": {
                  "line": 4,
                  "column": 21
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 62,
                "end": 75,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 8
                  },
                  "end": {
                    "line": 4,
                    "column": 21
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 68,
                    "end": 69,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 14
                      },
                      "end": {
                        "line": 4,
                        "column": 15
                      }
                    },
                    "name": "b"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 73,
                  "end": 75,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 19
                    },
                    "end": {
                      "line": 4,
                      "column": 21
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 84,
              "end": 98,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 8
                },
                "end": {
                  "line": 5,
                  "column": 22
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 84,
                "end": 98,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 8
                  },
                  "end": {
                    "line": 5,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 96,
                  "end": 98,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 20
                    },
                    "end": {
                      "line": 5,
                      "column": 22
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 107,
              "end": 121,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 8
                },
                "end": {
                  "line": 6,
                  "column": 22
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 107,
                "end": 121,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 8
                  },
                  "end": {
                    "line": 6,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 119,
                  "end": 121,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 20
                    },
                    "end": {
                      "line": 6,
                      "column": 22
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 130,
              "end": 138,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 8
                },
                "end": {
                  "line": 7,
                  "column": 16
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 130,
                "end": 138,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 8
                  },
                  "end": {
                    "line": 7,
                    "column": 16
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 136,
                  "end": 138,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 14
                    },
                    "end": {
                      "line": 7,
                      "column": 16
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 147,
              "end": 154,
              "loc": {
                "start": {
                  "line": 8,
                  "column": 8
                },
                "end": {
                  "line": 8,
                  "column": 15
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 147,
                "end": 154,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 8
                  },
                  "end": {
                    "line": 8,
                    "column": 15
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 147,
                    "end": 148,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 8
                      },
                      "end": {
                        "line": 8,
                        "column": 9
                      }
                    },
                    "name": "a"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 152,
                  "end": 154,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 13
                    },
                    "end": {
                      "line": 8,
                      "column": 15
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 163,
              "end": 170,
              "loc": {
                "start": {
                  "line": 9,
                  "column": 8
                },
                "end": {
                  "line": 9,
                  "column": 15
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 163,
                "end": 170,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 8
                  },
                  "end": {
                    "line": 9,
                    "column": 15
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 163,
                    "end": 164,
                    "loc": {
                      "start": {
                        "line": 9,
                        "column": 8
                      },
                      "end": {
                        "line": 9,
                        "column": 9
                      }
                    },
                    "name": "a"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 168,
                  "end": 170,
                  "loc": {
                    "start": {
                      "line": 9,
                      "column": 13
                    },
                    "end": {
                      "line": 9,
                      "column": 15
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 179,
              "end": 193,
              "loc": {
                "start": {
                  "line": 10,
                  "column": 8
                },
                "end": {
                  "line": 10,
                  "column": 22
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 179,
                "end": 193,
                "loc": {
                  "start": {
                    "line": 10,
                    "column": 8
                  },
                  "end": {
                    "line": 10,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 191,
                  "end": 193,
                  "loc": {
                    "start": {
                      "line": 10,
                      "column": 20
                    },
                    "end": {
                      "line": 10,
                      "column": 22
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 202,
              "end": 210,
              "loc": {
                "start": {
                  "line": 11,
                  "column": 8
                },
                "end": {
                  "line": 11,
                  "column": 16
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 202,
                "end": 210,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 8
                  },
                  "end": {
                    "line": 11,
                    "column": 16
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 208,
                  "end": 210,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 14
                    },
                    "end": {
                      "line": 11,
                      "column": 16
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 219,
              "end": 226,
              "loc": {
                "start": {
                  "line": 12,
                  "column": 8
                },
                "end": {
                  "line": 12,
                  "column": 15
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 219,
                "end": 226,
                "loc": {
                  "start": {
                    "line": 12,
                    "column": 8
                  },
                  "end": {
                    "line": 12,
                    "column": 15
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 219,
                    "end": 220,
                    "loc": {
                      "start": {
                        "line": 12,
                        "column": 8
                      },
                      "end": {
                        "line": 12,
                        "column": 9
                      }
                    },
                    "name": "a"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 224,
                  "end": 226,
                  "loc": {
                    "start": {
                      "line": 12,
                      "column": 13
                    },
                    "end": {
                      "line": 12,
                      "column": 15
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 235,
              "end": 249,
              "loc": {
                "start": {
                  "line": 13,
                  "column": 8
                },
                "end": {
                  "line": 13,
                  "column": 22
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 235,
                "end": 249,
                "loc": {
                  "start": {
                    "line": 13,
                    "column": 8
                  },
                  "end": {
                    "line": 13,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 247,
                  "end": 249,
                  "loc": {
                    "start": {
                      "line": 13,
                      "column": 20
                    },
                    "end": {
                      "line": 13,
                      "column": 22
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 258,
              "end": 266,
              "loc": {
                "start": {
                  "line": 14,
                  "column": 8
                },
                "end": {
                  "line": 14,
                  "column": 16
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 258,
                "end": 266,
                "loc": {
                  "start": {
                    "line": 14,
                    "column": 8
                  },
                  "end": {
                    "line": 14,
                    "column": 16
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 264,
                  "end": 266,
                  "loc": {
                    "start": {
                      "line": 14,
                      "column": 14
                    },
                    "end": {
                      "line": 14,
                      "column": 16
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 275,
              "end": 289,
              "loc": {
                "start": {
                  "line": 15,
                  "column": 8
                },
                "end": {
                  "line": 15,
                  "column": 22
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 275,
                "end": 289,
                "loc": {
                  "start": {
                    "line": 15,
                    "column": 8
                  },
                  "end": {
                    "line": 15,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 287,
                  "end": 289,
                  "loc": {
                    "start": {
                      "line": 15,
                      "column": 20
                    },
                    "end": {
                      "line": 15,
                      "column": 22
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 298,
              "end": 305,
              "loc": {
                "start": {
                  "line": 16,
                  "column": 8
                },
                "end": {
                  "line": 16,
                  "column": 15
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 298,
                "end": 305,
                "loc": {
                  "start": {
                    "line": 16,
                    "column": 8
                  },
                  "end": {
                    "line": 16,
                    "column": 15
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 298,
                    "end": 299,
                    "loc": {
                      "start": {
                        "line": 16,
                        "column": 8
                      },
                      "end": {
                        "line": 16,
                        "column": 9
                      }
                    },
                    "name": "a"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 303,
                  "end": 305,
                  "loc": {
                    "start": {
                      "line": 16,
                      "column": 13
                    },
                    "end": {
                      "line": 16,
                      "column": 15
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 314,
              "end": 328,
              "loc": {
                "start": {
                  "line": 17,
                  "column": 8
                },
                "end": {
                  "line": 17,
                  "column": 22
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 314,
                "end": 328,
                "loc": {
                  "start": {
                    "line": 17,
                    "column": 8
                  },
                  "end": {
                    "line": 17,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 326,
                  "end": 328,
                  "loc": {
                    "start": {
                      "line": 17,
                      "column": 20
                    },
                    "end": {
                      "line": 17,
                      "column": 22
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 337,
              "end": 351,
              "loc": {
                "start": {
                  "line": 18,
                  "column": 8
                },
                "end": {
                  "line": 18,
                  "column": 22
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 337,
                "end": 351,
                "loc": {
                  "start": {
                    "line": 18,
                    "column": 8
                  },
                  "end": {
                    "line": 18,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 349,
                  "end": 351,
                  "loc": {
                    "start": {
                      "line": 18,
                      "column": 20
                    },
                    "end": {
                      "line": 18,
                      "column": 22
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 360,
              "end": 368,
              "loc": {
                "start": {
                  "line": 19,
                  "column": 8
                },
                "end": {
                  "line": 19,
                  "column": 16
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 360,
                "end": 368,
                "loc": {
                  "start": {
                    "line": 19,
                    "column": 8
                  },
                  "end": {
                    "line": 19,
                    "column": 16
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 366,
                  "end": 368,
                  "loc": {
                    "start": {
                      "line": 19,
                      "column": 14
                    },
                    "end": {
                      "line": 19,
                      "column": 16
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

    it('should parse complex #2', () => {
        expect(parseScript(`() => {}
        () => {}
        async () => {}
        async () => {}
        () => {}
        a => {}
        a => {}
        async () => {}
        () => {}
        async b => {}
        async b => {}
        () => {}
        () => {}
        () => {}
        () => {}
        a => {}
        async () => {}
        () => {}
        async () => {}
        a => {}
        async () => {}
        async () => {}
        a => {}
        () => {}
        async a => {}
        async () => {}`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 491,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 26,
                "column": 22
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 8,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 8
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 8,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 8
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 6,
                    "end": 8,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 8
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 17,
                "end": 25,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 8
                  },
                  "end": {
                    "line": 2,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 17,
                  "end": 25,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 8
                    },
                    "end": {
                      "line": 2,
                      "column": 16
                    }
                  },
                  "id": null,
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
                        "column": 14
                      },
                      "end": {
                        "line": 2,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 34,
                "end": 48,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 8
                  },
                  "end": {
                    "line": 3,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 34,
                  "end": 48,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 8
                    },
                    "end": {
                      "line": 3,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 46,
                    "end": 48,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 20
                      },
                      "end": {
                        "line": 3,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 57,
                "end": 71,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 8
                  },
                  "end": {
                    "line": 4,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 57,
                  "end": 71,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 8
                    },
                    "end": {
                      "line": 4,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 69,
                    "end": 71,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 20
                      },
                      "end": {
                        "line": 4,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 80,
                "end": 88,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 8
                  },
                  "end": {
                    "line": 5,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 80,
                  "end": 88,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 8
                    },
                    "end": {
                      "line": 5,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 86,
                    "end": 88,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 14
                      },
                      "end": {
                        "line": 5,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 97,
                "end": 104,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 8
                  },
                  "end": {
                    "line": 6,
                    "column": 15
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 97,
                  "end": 104,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 8
                    },
                    "end": {
                      "line": 6,
                      "column": 15
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 97,
                      "end": 98,
                      "loc": {
                        "start": {
                          "line": 6,
                          "column": 8
                        },
                        "end": {
                          "line": 6,
                          "column": 9
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 102,
                    "end": 104,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 13
                      },
                      "end": {
                        "line": 6,
                        "column": 15
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 113,
                "end": 120,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 8
                  },
                  "end": {
                    "line": 7,
                    "column": 15
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 113,
                  "end": 120,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 8
                    },
                    "end": {
                      "line": 7,
                      "column": 15
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 113,
                      "end": 114,
                      "loc": {
                        "start": {
                          "line": 7,
                          "column": 8
                        },
                        "end": {
                          "line": 7,
                          "column": 9
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 118,
                    "end": 120,
                    "loc": {
                      "start": {
                        "line": 7,
                        "column": 13
                      },
                      "end": {
                        "line": 7,
                        "column": 15
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 129,
                "end": 143,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 8
                  },
                  "end": {
                    "line": 8,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 129,
                  "end": 143,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 8
                    },
                    "end": {
                      "line": 8,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 141,
                    "end": 143,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 20
                      },
                      "end": {
                        "line": 8,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 152,
                "end": 160,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 8
                  },
                  "end": {
                    "line": 9,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 152,
                  "end": 160,
                  "loc": {
                    "start": {
                      "line": 9,
                      "column": 8
                    },
                    "end": {
                      "line": 9,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 158,
                    "end": 160,
                    "loc": {
                      "start": {
                        "line": 9,
                        "column": 14
                      },
                      "end": {
                        "line": 9,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 169,
                "end": 182,
                "loc": {
                  "start": {
                    "line": 10,
                    "column": 8
                  },
                  "end": {
                    "line": 10,
                    "column": 21
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 169,
                  "end": 182,
                  "loc": {
                    "start": {
                      "line": 10,
                      "column": 8
                    },
                    "end": {
                      "line": 10,
                      "column": 21
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 175,
                      "end": 176,
                      "loc": {
                        "start": {
                          "line": 10,
                          "column": 14
                        },
                        "end": {
                          "line": 10,
                          "column": 15
                        }
                      },
                      "name": "b"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 180,
                    "end": 182,
                    "loc": {
                      "start": {
                        "line": 10,
                        "column": 19
                      },
                      "end": {
                        "line": 10,
                        "column": 21
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 191,
                "end": 204,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 8
                  },
                  "end": {
                    "line": 11,
                    "column": 21
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 191,
                  "end": 204,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 8
                    },
                    "end": {
                      "line": 11,
                      "column": 21
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 197,
                      "end": 198,
                      "loc": {
                        "start": {
                          "line": 11,
                          "column": 14
                        },
                        "end": {
                          "line": 11,
                          "column": 15
                        }
                      },
                      "name": "b"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 202,
                    "end": 204,
                    "loc": {
                      "start": {
                        "line": 11,
                        "column": 19
                      },
                      "end": {
                        "line": 11,
                        "column": 21
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 213,
                "end": 221,
                "loc": {
                  "start": {
                    "line": 12,
                    "column": 8
                  },
                  "end": {
                    "line": 12,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 213,
                  "end": 221,
                  "loc": {
                    "start": {
                      "line": 12,
                      "column": 8
                    },
                    "end": {
                      "line": 12,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 219,
                    "end": 221,
                    "loc": {
                      "start": {
                        "line": 12,
                        "column": 14
                      },
                      "end": {
                        "line": 12,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 230,
                "end": 238,
                "loc": {
                  "start": {
                    "line": 13,
                    "column": 8
                  },
                  "end": {
                    "line": 13,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 230,
                  "end": 238,
                  "loc": {
                    "start": {
                      "line": 13,
                      "column": 8
                    },
                    "end": {
                      "line": 13,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 236,
                    "end": 238,
                    "loc": {
                      "start": {
                        "line": 13,
                        "column": 14
                      },
                      "end": {
                        "line": 13,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 247,
                "end": 255,
                "loc": {
                  "start": {
                    "line": 14,
                    "column": 8
                  },
                  "end": {
                    "line": 14,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 247,
                  "end": 255,
                  "loc": {
                    "start": {
                      "line": 14,
                      "column": 8
                    },
                    "end": {
                      "line": 14,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 253,
                    "end": 255,
                    "loc": {
                      "start": {
                        "line": 14,
                        "column": 14
                      },
                      "end": {
                        "line": 14,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 264,
                "end": 272,
                "loc": {
                  "start": {
                    "line": 15,
                    "column": 8
                  },
                  "end": {
                    "line": 15,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 264,
                  "end": 272,
                  "loc": {
                    "start": {
                      "line": 15,
                      "column": 8
                    },
                    "end": {
                      "line": 15,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 270,
                    "end": 272,
                    "loc": {
                      "start": {
                        "line": 15,
                        "column": 14
                      },
                      "end": {
                        "line": 15,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 281,
                "end": 288,
                "loc": {
                  "start": {
                    "line": 16,
                    "column": 8
                  },
                  "end": {
                    "line": 16,
                    "column": 15
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 281,
                  "end": 288,
                  "loc": {
                    "start": {
                      "line": 16,
                      "column": 8
                    },
                    "end": {
                      "line": 16,
                      "column": 15
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 281,
                      "end": 282,
                      "loc": {
                        "start": {
                          "line": 16,
                          "column": 8
                        },
                        "end": {
                          "line": 16,
                          "column": 9
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 286,
                    "end": 288,
                    "loc": {
                      "start": {
                        "line": 16,
                        "column": 13
                      },
                      "end": {
                        "line": 16,
                        "column": 15
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 297,
                "end": 311,
                "loc": {
                  "start": {
                    "line": 17,
                    "column": 8
                  },
                  "end": {
                    "line": 17,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 297,
                  "end": 311,
                  "loc": {
                    "start": {
                      "line": 17,
                      "column": 8
                    },
                    "end": {
                      "line": 17,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 309,
                    "end": 311,
                    "loc": {
                      "start": {
                        "line": 17,
                        "column": 20
                      },
                      "end": {
                        "line": 17,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 320,
                "end": 328,
                "loc": {
                  "start": {
                    "line": 18,
                    "column": 8
                  },
                  "end": {
                    "line": 18,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 320,
                  "end": 328,
                  "loc": {
                    "start": {
                      "line": 18,
                      "column": 8
                    },
                    "end": {
                      "line": 18,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 326,
                    "end": 328,
                    "loc": {
                      "start": {
                        "line": 18,
                        "column": 14
                      },
                      "end": {
                        "line": 18,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 337,
                "end": 351,
                "loc": {
                  "start": {
                    "line": 19,
                    "column": 8
                  },
                  "end": {
                    "line": 19,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 337,
                  "end": 351,
                  "loc": {
                    "start": {
                      "line": 19,
                      "column": 8
                    },
                    "end": {
                      "line": 19,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 349,
                    "end": 351,
                    "loc": {
                      "start": {
                        "line": 19,
                        "column": 20
                      },
                      "end": {
                        "line": 19,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 360,
                "end": 367,
                "loc": {
                  "start": {
                    "line": 20,
                    "column": 8
                  },
                  "end": {
                    "line": 20,
                    "column": 15
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 360,
                  "end": 367,
                  "loc": {
                    "start": {
                      "line": 20,
                      "column": 8
                    },
                    "end": {
                      "line": 20,
                      "column": 15
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 360,
                      "end": 361,
                      "loc": {
                        "start": {
                          "line": 20,
                          "column": 8
                        },
                        "end": {
                          "line": 20,
                          "column": 9
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 365,
                    "end": 367,
                    "loc": {
                      "start": {
                        "line": 20,
                        "column": 13
                      },
                      "end": {
                        "line": 20,
                        "column": 15
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 376,
                "end": 390,
                "loc": {
                  "start": {
                    "line": 21,
                    "column": 8
                  },
                  "end": {
                    "line": 21,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 376,
                  "end": 390,
                  "loc": {
                    "start": {
                      "line": 21,
                      "column": 8
                    },
                    "end": {
                      "line": 21,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 388,
                    "end": 390,
                    "loc": {
                      "start": {
                        "line": 21,
                        "column": 20
                      },
                      "end": {
                        "line": 21,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 399,
                "end": 413,
                "loc": {
                  "start": {
                    "line": 22,
                    "column": 8
                  },
                  "end": {
                    "line": 22,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 399,
                  "end": 413,
                  "loc": {
                    "start": {
                      "line": 22,
                      "column": 8
                    },
                    "end": {
                      "line": 22,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 411,
                    "end": 413,
                    "loc": {
                      "start": {
                        "line": 22,
                        "column": 20
                      },
                      "end": {
                        "line": 22,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 422,
                "end": 429,
                "loc": {
                  "start": {
                    "line": 23,
                    "column": 8
                  },
                  "end": {
                    "line": 23,
                    "column": 15
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 422,
                  "end": 429,
                  "loc": {
                    "start": {
                      "line": 23,
                      "column": 8
                    },
                    "end": {
                      "line": 23,
                      "column": 15
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 422,
                      "end": 423,
                      "loc": {
                        "start": {
                          "line": 23,
                          "column": 8
                        },
                        "end": {
                          "line": 23,
                          "column": 9
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 427,
                    "end": 429,
                    "loc": {
                      "start": {
                        "line": 23,
                        "column": 13
                      },
                      "end": {
                        "line": 23,
                        "column": 15
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 438,
                "end": 446,
                "loc": {
                  "start": {
                    "line": 24,
                    "column": 8
                  },
                  "end": {
                    "line": 24,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 438,
                  "end": 446,
                  "loc": {
                    "start": {
                      "line": 24,
                      "column": 8
                    },
                    "end": {
                      "line": 24,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 444,
                    "end": 446,
                    "loc": {
                      "start": {
                        "line": 24,
                        "column": 14
                      },
                      "end": {
                        "line": 24,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 455,
                "end": 468,
                "loc": {
                  "start": {
                    "line": 25,
                    "column": 8
                  },
                  "end": {
                    "line": 25,
                    "column": 21
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 455,
                  "end": 468,
                  "loc": {
                    "start": {
                      "line": 25,
                      "column": 8
                    },
                    "end": {
                      "line": 25,
                      "column": 21
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 461,
                      "end": 462,
                      "loc": {
                        "start": {
                          "line": 25,
                          "column": 14
                        },
                        "end": {
                          "line": 25,
                          "column": 15
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 466,
                    "end": 468,
                    "loc": {
                      "start": {
                        "line": 25,
                        "column": 19
                      },
                      "end": {
                        "line": 25,
                        "column": 21
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 477,
                "end": 491,
                "loc": {
                  "start": {
                    "line": 26,
                    "column": 8
                  },
                  "end": {
                    "line": 26,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 477,
                  "end": 491,
                  "loc": {
                    "start": {
                      "line": 26,
                      "column": 8
                    },
                    "end": {
                      "line": 26,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 489,
                    "end": 491,
                    "loc": {
                      "start": {
                        "line": 26,
                        "column": 20
                      },
                      "end": {
                        "line": 26,
                        "column": 22
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


    it('should parse complex #3', () => {
        expect(parseScript(`a => a => a => async a => a`, {
            ranges: true,
            locations: true,
            raw: true
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
                  "expression": true,
                  "async": false,
                  "params": [
                    {
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
                    }
                  ],
                  "body": {
                    "type": "ArrowFunctionExpression",
                    "start": 5,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 5
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
                        "start": 5,
                        "end": 6,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 5
                          },
                          "end": {
                            "line": 1,
                            "column": 6
                          }
                        },
                        "name": "a"
                      }
                    ],
                    "body": {
                      "type": "ArrowFunctionExpression",
                      "start": 10,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
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
                          "name": "a"
                        }
                      ],
                      "body": {
                        "type": "ArrowFunctionExpression",
                        "start": 15,
                        "end": 27,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 15
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": true,
                        "params": [
                          {
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
                        ],
                        "body": {
                          "type": "Identifier",
                          "start": 26,
                          "end": 27,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 26
                            },
                            "end": {
                              "line": 1,
                              "column": 27
                            }
                          },
                          "name": "a"
                        }
                      }
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });


    it('should parse complex #4', () => {
        expect(parseScript(`a => a => a => async a => a
        async a => a
        a => a => a => async a => a
        async () => {}
        async a => a`, {
            ranges: true,
            locations: true,
            raw: true
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
                "line": 5,
                "column": 20
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
                  "expression": true,
                  "async": false,
                  "params": [
                    {
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
                    }
                  ],
                  "body": {
                    "type": "ArrowFunctionExpression",
                    "start": 5,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 5
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
                        "start": 5,
                        "end": 6,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 5
                          },
                          "end": {
                            "line": 1,
                            "column": 6
                          }
                        },
                        "name": "a"
                      }
                    ],
                    "body": {
                      "type": "ArrowFunctionExpression",
                      "start": 10,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
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
                          "name": "a"
                        }
                      ],
                      "body": {
                        "type": "ArrowFunctionExpression",
                        "start": 15,
                        "end": 27,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 15
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": true,
                        "params": [
                          {
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
                        ],
                        "body": {
                          "type": "Identifier",
                          "start": 26,
                          "end": 27,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 26
                            },
                            "end": {
                              "line": 1,
                              "column": 27
                            }
                          },
                          "name": "a"
                        }
                      }
                    }
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 36,
                "end": 48,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 8
                  },
                  "end": {
                    "line": 2,
                    "column": 20
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 36,
                  "end": 48,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 8
                    },
                    "end": {
                      "line": 2,
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
                      "start": 42,
                      "end": 43,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 14
                        },
                        "end": {
                          "line": 2,
                          "column": 15
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "Identifier",
                    "start": 47,
                    "end": 48,
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
                    "name": "a"
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 57,
                "end": 84,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 8
                  },
                  "end": {
                    "line": 3,
                    "column": 35
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 57,
                  "end": 84,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 8
                    },
                    "end": {
                      "line": 3,
                      "column": 35
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 57,
                      "end": 58,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 8
                        },
                        "end": {
                          "line": 3,
                          "column": 9
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "ArrowFunctionExpression",
                    "start": 62,
                    "end": 84,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 13
                      },
                      "end": {
                        "line": 3,
                        "column": 35
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
                        "start": 62,
                        "end": 63,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 13
                          },
                          "end": {
                            "line": 3,
                            "column": 14
                          }
                        },
                        "name": "a"
                      }
                    ],
                    "body": {
                      "type": "ArrowFunctionExpression",
                      "start": 67,
                      "end": 84,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 18
                        },
                        "end": {
                          "line": 3,
                          "column": 35
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 67,
                          "end": 68,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 18
                            },
                            "end": {
                              "line": 3,
                              "column": 19
                            }
                          },
                          "name": "a"
                        }
                      ],
                      "body": {
                        "type": "ArrowFunctionExpression",
                        "start": 72,
                        "end": 84,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 23
                          },
                          "end": {
                            "line": 3,
                            "column": 35
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": true,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 78,
                            "end": 79,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 29
                              },
                              "end": {
                                "line": 3,
                                "column": 30
                              }
                            },
                            "name": "a"
                          }
                        ],
                        "body": {
                          "type": "Identifier",
                          "start": 83,
                          "end": 84,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 34
                            },
                            "end": {
                              "line": 3,
                              "column": 35
                            }
                          },
                          "name": "a"
                        }
                      }
                    }
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 93,
                "end": 107,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 8
                  },
                  "end": {
                    "line": 4,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 93,
                  "end": 107,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 8
                    },
                    "end": {
                      "line": 4,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 105,
                    "end": 107,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 20
                      },
                      "end": {
                        "line": 4,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 116,
                "end": 128,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 8
                  },
                  "end": {
                    "line": 5,
                    "column": 20
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 116,
                  "end": 128,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 8
                    },
                    "end": {
                      "line": 5,
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
                      "start": 122,
                      "end": 123,
                      "loc": {
                        "start": {
                          "line": 5,
                          "column": 14
                        },
                        "end": {
                          "line": 5,
                          "column": 15
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "Identifier",
                    "start": 127,
                    "end": 128,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 19
                      },
                      "end": {
                        "line": 5,
                        "column": 20
                      }
                    },
                    "name": "a"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex #5', () => {
        expect(parseScript(`() => {}
        () => {}
        () => {}
        () => {}
        () => {}
        () => {}
        () => {}
        async b => {}
        async b => {}
        async b => {}
        async () => {}
        async () => {}
        async () => {}
        async () => {}
        async () => {}
        () => {}
        async () => {}
        () => {}
        async () => {}
        () => {}
        a => {}
        a => {}
        async () => {}
        () => {}
        a => {}
        () => {}
        async () => {}
        async () => {}
        () => {}
        async () => {}
        a => {}
        async () => {}
        async () => {}
        () => {}`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
  "type": "Program",
  "start": 0,
  "end": 658,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 34,
      "column": 16
    }
  },
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 8,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 8
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 0,
        "end": 8,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 8
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 6,
          "end": 8,
          "loc": {
            "start": {
              "line": 1,
              "column": 6
            },
            "end": {
              "line": 1,
              "column": 8
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 17,
      "end": 25,
      "loc": {
        "start": {
          "line": 2,
          "column": 8
        },
        "end": {
          "line": 2,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 17,
        "end": 25,
        "loc": {
          "start": {
            "line": 2,
            "column": 8
          },
          "end": {
            "line": 2,
            "column": 16
          }
        },
        "id": null,
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
              "column": 14
            },
            "end": {
              "line": 2,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 34,
      "end": 42,
      "loc": {
        "start": {
          "line": 3,
          "column": 8
        },
        "end": {
          "line": 3,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 34,
        "end": 42,
        "loc": {
          "start": {
            "line": 3,
            "column": 8
          },
          "end": {
            "line": 3,
            "column": 16
          }
        },
        "id": null,
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
              "line": 3,
              "column": 14
            },
            "end": {
              "line": 3,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 51,
      "end": 59,
      "loc": {
        "start": {
          "line": 4,
          "column": 8
        },
        "end": {
          "line": 4,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 51,
        "end": 59,
        "loc": {
          "start": {
            "line": 4,
            "column": 8
          },
          "end": {
            "line": 4,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 57,
          "end": 59,
          "loc": {
            "start": {
              "line": 4,
              "column": 14
            },
            "end": {
              "line": 4,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 68,
      "end": 76,
      "loc": {
        "start": {
          "line": 5,
          "column": 8
        },
        "end": {
          "line": 5,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 68,
        "end": 76,
        "loc": {
          "start": {
            "line": 5,
            "column": 8
          },
          "end": {
            "line": 5,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 74,
          "end": 76,
          "loc": {
            "start": {
              "line": 5,
              "column": 14
            },
            "end": {
              "line": 5,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 85,
      "end": 93,
      "loc": {
        "start": {
          "line": 6,
          "column": 8
        },
        "end": {
          "line": 6,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 85,
        "end": 93,
        "loc": {
          "start": {
            "line": 6,
            "column": 8
          },
          "end": {
            "line": 6,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 91,
          "end": 93,
          "loc": {
            "start": {
              "line": 6,
              "column": 14
            },
            "end": {
              "line": 6,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 102,
      "end": 110,
      "loc": {
        "start": {
          "line": 7,
          "column": 8
        },
        "end": {
          "line": 7,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 102,
        "end": 110,
        "loc": {
          "start": {
            "line": 7,
            "column": 8
          },
          "end": {
            "line": 7,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 108,
          "end": 110,
          "loc": {
            "start": {
              "line": 7,
              "column": 14
            },
            "end": {
              "line": 7,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 119,
      "end": 132,
      "loc": {
        "start": {
          "line": 8,
          "column": 8
        },
        "end": {
          "line": 8,
          "column": 21
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 119,
        "end": 132,
        "loc": {
          "start": {
            "line": 8,
            "column": 8
          },
          "end": {
            "line": 8,
            "column": 21
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [
          {
            "type": "Identifier",
            "start": 125,
            "end": 126,
            "loc": {
              "start": {
                "line": 8,
                "column": 14
              },
              "end": {
                "line": 8,
                "column": 15
              }
            },
            "name": "b"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 130,
          "end": 132,
          "loc": {
            "start": {
              "line": 8,
              "column": 19
            },
            "end": {
              "line": 8,
              "column": 21
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 141,
      "end": 154,
      "loc": {
        "start": {
          "line": 9,
          "column": 8
        },
        "end": {
          "line": 9,
          "column": 21
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 141,
        "end": 154,
        "loc": {
          "start": {
            "line": 9,
            "column": 8
          },
          "end": {
            "line": 9,
            "column": 21
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [
          {
            "type": "Identifier",
            "start": 147,
            "end": 148,
            "loc": {
              "start": {
                "line": 9,
                "column": 14
              },
              "end": {
                "line": 9,
                "column": 15
              }
            },
            "name": "b"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 152,
          "end": 154,
          "loc": {
            "start": {
              "line": 9,
              "column": 19
            },
            "end": {
              "line": 9,
              "column": 21
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 163,
      "end": 176,
      "loc": {
        "start": {
          "line": 10,
          "column": 8
        },
        "end": {
          "line": 10,
          "column": 21
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 163,
        "end": 176,
        "loc": {
          "start": {
            "line": 10,
            "column": 8
          },
          "end": {
            "line": 10,
            "column": 21
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [
          {
            "type": "Identifier",
            "start": 169,
            "end": 170,
            "loc": {
              "start": {
                "line": 10,
                "column": 14
              },
              "end": {
                "line": 10,
                "column": 15
              }
            },
            "name": "b"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 174,
          "end": 176,
          "loc": {
            "start": {
              "line": 10,
              "column": 19
            },
            "end": {
              "line": 10,
              "column": 21
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 185,
      "end": 199,
      "loc": {
        "start": {
          "line": 11,
          "column": 8
        },
        "end": {
          "line": 11,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 185,
        "end": 199,
        "loc": {
          "start": {
            "line": 11,
            "column": 8
          },
          "end": {
            "line": 11,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 197,
          "end": 199,
          "loc": {
            "start": {
              "line": 11,
              "column": 20
            },
            "end": {
              "line": 11,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 208,
      "end": 222,
      "loc": {
        "start": {
          "line": 12,
          "column": 8
        },
        "end": {
          "line": 12,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 208,
        "end": 222,
        "loc": {
          "start": {
            "line": 12,
            "column": 8
          },
          "end": {
            "line": 12,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 220,
          "end": 222,
          "loc": {
            "start": {
              "line": 12,
              "column": 20
            },
            "end": {
              "line": 12,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 231,
      "end": 245,
      "loc": {
        "start": {
          "line": 13,
          "column": 8
        },
        "end": {
          "line": 13,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 231,
        "end": 245,
        "loc": {
          "start": {
            "line": 13,
            "column": 8
          },
          "end": {
            "line": 13,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 243,
          "end": 245,
          "loc": {
            "start": {
              "line": 13,
              "column": 20
            },
            "end": {
              "line": 13,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 254,
      "end": 268,
      "loc": {
        "start": {
          "line": 14,
          "column": 8
        },
        "end": {
          "line": 14,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 254,
        "end": 268,
        "loc": {
          "start": {
            "line": 14,
            "column": 8
          },
          "end": {
            "line": 14,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 266,
          "end": 268,
          "loc": {
            "start": {
              "line": 14,
              "column": 20
            },
            "end": {
              "line": 14,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 277,
      "end": 291,
      "loc": {
        "start": {
          "line": 15,
          "column": 8
        },
        "end": {
          "line": 15,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 277,
        "end": 291,
        "loc": {
          "start": {
            "line": 15,
            "column": 8
          },
          "end": {
            "line": 15,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 289,
          "end": 291,
          "loc": {
            "start": {
              "line": 15,
              "column": 20
            },
            "end": {
              "line": 15,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 300,
      "end": 308,
      "loc": {
        "start": {
          "line": 16,
          "column": 8
        },
        "end": {
          "line": 16,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 300,
        "end": 308,
        "loc": {
          "start": {
            "line": 16,
            "column": 8
          },
          "end": {
            "line": 16,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 306,
          "end": 308,
          "loc": {
            "start": {
              "line": 16,
              "column": 14
            },
            "end": {
              "line": 16,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 317,
      "end": 331,
      "loc": {
        "start": {
          "line": 17,
          "column": 8
        },
        "end": {
          "line": 17,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 317,
        "end": 331,
        "loc": {
          "start": {
            "line": 17,
            "column": 8
          },
          "end": {
            "line": 17,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 329,
          "end": 331,
          "loc": {
            "start": {
              "line": 17,
              "column": 20
            },
            "end": {
              "line": 17,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 340,
      "end": 348,
      "loc": {
        "start": {
          "line": 18,
          "column": 8
        },
        "end": {
          "line": 18,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 340,
        "end": 348,
        "loc": {
          "start": {
            "line": 18,
            "column": 8
          },
          "end": {
            "line": 18,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 346,
          "end": 348,
          "loc": {
            "start": {
              "line": 18,
              "column": 14
            },
            "end": {
              "line": 18,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 357,
      "end": 371,
      "loc": {
        "start": {
          "line": 19,
          "column": 8
        },
        "end": {
          "line": 19,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 357,
        "end": 371,
        "loc": {
          "start": {
            "line": 19,
            "column": 8
          },
          "end": {
            "line": 19,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 369,
          "end": 371,
          "loc": {
            "start": {
              "line": 19,
              "column": 20
            },
            "end": {
              "line": 19,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 380,
      "end": 388,
      "loc": {
        "start": {
          "line": 20,
          "column": 8
        },
        "end": {
          "line": 20,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 380,
        "end": 388,
        "loc": {
          "start": {
            "line": 20,
            "column": 8
          },
          "end": {
            "line": 20,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 386,
          "end": 388,
          "loc": {
            "start": {
              "line": 20,
              "column": 14
            },
            "end": {
              "line": 20,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 397,
      "end": 404,
      "loc": {
        "start": {
          "line": 21,
          "column": 8
        },
        "end": {
          "line": 21,
          "column": 15
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 397,
        "end": 404,
        "loc": {
          "start": {
            "line": 21,
            "column": 8
          },
          "end": {
            "line": 21,
            "column": 15
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [
          {
            "type": "Identifier",
            "start": 397,
            "end": 398,
            "loc": {
              "start": {
                "line": 21,
                "column": 8
              },
              "end": {
                "line": 21,
                "column": 9
              }
            },
            "name": "a"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 402,
          "end": 404,
          "loc": {
            "start": {
              "line": 21,
              "column": 13
            },
            "end": {
              "line": 21,
              "column": 15
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 413,
      "end": 420,
      "loc": {
        "start": {
          "line": 22,
          "column": 8
        },
        "end": {
          "line": 22,
          "column": 15
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 413,
        "end": 420,
        "loc": {
          "start": {
            "line": 22,
            "column": 8
          },
          "end": {
            "line": 22,
            "column": 15
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [
          {
            "type": "Identifier",
            "start": 413,
            "end": 414,
            "loc": {
              "start": {
                "line": 22,
                "column": 8
              },
              "end": {
                "line": 22,
                "column": 9
              }
            },
            "name": "a"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 418,
          "end": 420,
          "loc": {
            "start": {
              "line": 22,
              "column": 13
            },
            "end": {
              "line": 22,
              "column": 15
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 429,
      "end": 443,
      "loc": {
        "start": {
          "line": 23,
          "column": 8
        },
        "end": {
          "line": 23,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 429,
        "end": 443,
        "loc": {
          "start": {
            "line": 23,
            "column": 8
          },
          "end": {
            "line": 23,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 441,
          "end": 443,
          "loc": {
            "start": {
              "line": 23,
              "column": 20
            },
            "end": {
              "line": 23,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 452,
      "end": 460,
      "loc": {
        "start": {
          "line": 24,
          "column": 8
        },
        "end": {
          "line": 24,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 452,
        "end": 460,
        "loc": {
          "start": {
            "line": 24,
            "column": 8
          },
          "end": {
            "line": 24,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 458,
          "end": 460,
          "loc": {
            "start": {
              "line": 24,
              "column": 14
            },
            "end": {
              "line": 24,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 469,
      "end": 476,
      "loc": {
        "start": {
          "line": 25,
          "column": 8
        },
        "end": {
          "line": 25,
          "column": 15
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 469,
        "end": 476,
        "loc": {
          "start": {
            "line": 25,
            "column": 8
          },
          "end": {
            "line": 25,
            "column": 15
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [
          {
            "type": "Identifier",
            "start": 469,
            "end": 470,
            "loc": {
              "start": {
                "line": 25,
                "column": 8
              },
              "end": {
                "line": 25,
                "column": 9
              }
            },
            "name": "a"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 474,
          "end": 476,
          "loc": {
            "start": {
              "line": 25,
              "column": 13
            },
            "end": {
              "line": 25,
              "column": 15
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 485,
      "end": 493,
      "loc": {
        "start": {
          "line": 26,
          "column": 8
        },
        "end": {
          "line": 26,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 485,
        "end": 493,
        "loc": {
          "start": {
            "line": 26,
            "column": 8
          },
          "end": {
            "line": 26,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 491,
          "end": 493,
          "loc": {
            "start": {
              "line": 26,
              "column": 14
            },
            "end": {
              "line": 26,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 502,
      "end": 516,
      "loc": {
        "start": {
          "line": 27,
          "column": 8
        },
        "end": {
          "line": 27,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 502,
        "end": 516,
        "loc": {
          "start": {
            "line": 27,
            "column": 8
          },
          "end": {
            "line": 27,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 514,
          "end": 516,
          "loc": {
            "start": {
              "line": 27,
              "column": 20
            },
            "end": {
              "line": 27,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 525,
      "end": 539,
      "loc": {
        "start": {
          "line": 28,
          "column": 8
        },
        "end": {
          "line": 28,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 525,
        "end": 539,
        "loc": {
          "start": {
            "line": 28,
            "column": 8
          },
          "end": {
            "line": 28,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 537,
          "end": 539,
          "loc": {
            "start": {
              "line": 28,
              "column": 20
            },
            "end": {
              "line": 28,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 548,
      "end": 556,
      "loc": {
        "start": {
          "line": 29,
          "column": 8
        },
        "end": {
          "line": 29,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 548,
        "end": 556,
        "loc": {
          "start": {
            "line": 29,
            "column": 8
          },
          "end": {
            "line": 29,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 554,
          "end": 556,
          "loc": {
            "start": {
              "line": 29,
              "column": 14
            },
            "end": {
              "line": 29,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 565,
      "end": 579,
      "loc": {
        "start": {
          "line": 30,
          "column": 8
        },
        "end": {
          "line": 30,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 565,
        "end": 579,
        "loc": {
          "start": {
            "line": 30,
            "column": 8
          },
          "end": {
            "line": 30,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 577,
          "end": 579,
          "loc": {
            "start": {
              "line": 30,
              "column": 20
            },
            "end": {
              "line": 30,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 588,
      "end": 595,
      "loc": {
        "start": {
          "line": 31,
          "column": 8
        },
        "end": {
          "line": 31,
          "column": 15
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 588,
        "end": 595,
        "loc": {
          "start": {
            "line": 31,
            "column": 8
          },
          "end": {
            "line": 31,
            "column": 15
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [
          {
            "type": "Identifier",
            "start": 588,
            "end": 589,
            "loc": {
              "start": {
                "line": 31,
                "column": 8
              },
              "end": {
                "line": 31,
                "column": 9
              }
            },
            "name": "a"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 593,
          "end": 595,
          "loc": {
            "start": {
              "line": 31,
              "column": 13
            },
            "end": {
              "line": 31,
              "column": 15
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 604,
      "end": 618,
      "loc": {
        "start": {
          "line": 32,
          "column": 8
        },
        "end": {
          "line": 32,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 604,
        "end": 618,
        "loc": {
          "start": {
            "line": 32,
            "column": 8
          },
          "end": {
            "line": 32,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 616,
          "end": 618,
          "loc": {
            "start": {
              "line": 32,
              "column": 20
            },
            "end": {
              "line": 32,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 627,
      "end": 641,
      "loc": {
        "start": {
          "line": 33,
          "column": 8
        },
        "end": {
          "line": 33,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 627,
        "end": 641,
        "loc": {
          "start": {
            "line": 33,
            "column": 8
          },
          "end": {
            "line": 33,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 639,
          "end": 641,
          "loc": {
            "start": {
              "line": 33,
              "column": 20
            },
            "end": {
              "line": 33,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 650,
      "end": 658,
      "loc": {
        "start": {
          "line": 34,
          "column": 8
        },
        "end": {
          "line": 34,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 650,
        "end": 658,
        "loc": {
          "start": {
            "line": 34,
            "column": 8
          },
          "end": {
            "line": 34,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 656,
          "end": 658,
          "loc": {
            "start": {
              "line": 34,
              "column": 14
            },
            "end": {
              "line": 34,
              "column": 16
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

      it('should parse complex #6', () => {
        expect(parseScript(`async () => {}
        () => {}
        async () => {}
        async () => {}
        () => {}
        () => {}
        async () => {}
        async () => {}
        () => {}
        
        async () => {}
        () => {}
        async b => {}
        async () => {}
        () => {}
        async () => {}
        async () => {}
        () => {}
        async () => {}
        () => {}
        async () => {}
        async () => {}
        () => {}
        b => {}
        () => {}
        async b => {}
        async () => {}
        async () => {}
        () => {}
        
        async () => {}
        () => {}
        
        async () => {}
        () => {}
        async () => {}
        a
        async () => {}
        () => {}`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 740,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 39,
                "column": 16
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
                  "expression": false,
                  "async": true,
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
                "type": "ExpressionStatement",
                "start": 23,
                "end": 31,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 8
                  },
                  "end": {
                    "line": 2,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 23,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 8
                    },
                    "end": {
                      "line": 2,
                      "column": 16
                    }
                  },
                  "id": null,
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
                        "line": 2,
                        "column": 14
                      },
                      "end": {
                        "line": 2,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 40,
                "end": 54,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 8
                  },
                  "end": {
                    "line": 3,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 40,
                  "end": 54,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 8
                    },
                    "end": {
                      "line": 3,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 52,
                    "end": 54,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 20
                      },
                      "end": {
                        "line": 3,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 63,
                "end": 77,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 8
                  },
                  "end": {
                    "line": 4,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 63,
                  "end": 77,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 8
                    },
                    "end": {
                      "line": 4,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 75,
                    "end": 77,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 20
                      },
                      "end": {
                        "line": 4,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 86,
                "end": 94,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 8
                  },
                  "end": {
                    "line": 5,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 86,
                  "end": 94,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 8
                    },
                    "end": {
                      "line": 5,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 92,
                    "end": 94,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 14
                      },
                      "end": {
                        "line": 5,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 103,
                "end": 111,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 8
                  },
                  "end": {
                    "line": 6,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 103,
                  "end": 111,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 8
                    },
                    "end": {
                      "line": 6,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 109,
                    "end": 111,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 14
                      },
                      "end": {
                        "line": 6,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 120,
                "end": 134,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 8
                  },
                  "end": {
                    "line": 7,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 120,
                  "end": 134,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 8
                    },
                    "end": {
                      "line": 7,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 132,
                    "end": 134,
                    "loc": {
                      "start": {
                        "line": 7,
                        "column": 20
                      },
                      "end": {
                        "line": 7,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 143,
                "end": 157,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 8
                  },
                  "end": {
                    "line": 8,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 143,
                  "end": 157,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 8
                    },
                    "end": {
                      "line": 8,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 155,
                    "end": 157,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 20
                      },
                      "end": {
                        "line": 8,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 166,
                "end": 174,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 8
                  },
                  "end": {
                    "line": 9,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 166,
                  "end": 174,
                  "loc": {
                    "start": {
                      "line": 9,
                      "column": 8
                    },
                    "end": {
                      "line": 9,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 172,
                    "end": 174,
                    "loc": {
                      "start": {
                        "line": 9,
                        "column": 14
                      },
                      "end": {
                        "line": 9,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 192,
                "end": 206,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 8
                  },
                  "end": {
                    "line": 11,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 192,
                  "end": 206,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 8
                    },
                    "end": {
                      "line": 11,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 204,
                    "end": 206,
                    "loc": {
                      "start": {
                        "line": 11,
                        "column": 20
                      },
                      "end": {
                        "line": 11,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 215,
                "end": 223,
                "loc": {
                  "start": {
                    "line": 12,
                    "column": 8
                  },
                  "end": {
                    "line": 12,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 215,
                  "end": 223,
                  "loc": {
                    "start": {
                      "line": 12,
                      "column": 8
                    },
                    "end": {
                      "line": 12,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 221,
                    "end": 223,
                    "loc": {
                      "start": {
                        "line": 12,
                        "column": 14
                      },
                      "end": {
                        "line": 12,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 232,
                "end": 245,
                "loc": {
                  "start": {
                    "line": 13,
                    "column": 8
                  },
                  "end": {
                    "line": 13,
                    "column": 21
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 232,
                  "end": 245,
                  "loc": {
                    "start": {
                      "line": 13,
                      "column": 8
                    },
                    "end": {
                      "line": 13,
                      "column": 21
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 238,
                      "end": 239,
                      "loc": {
                        "start": {
                          "line": 13,
                          "column": 14
                        },
                        "end": {
                          "line": 13,
                          "column": 15
                        }
                      },
                      "name": "b"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 243,
                    "end": 245,
                    "loc": {
                      "start": {
                        "line": 13,
                        "column": 19
                      },
                      "end": {
                        "line": 13,
                        "column": 21
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 254,
                "end": 268,
                "loc": {
                  "start": {
                    "line": 14,
                    "column": 8
                  },
                  "end": {
                    "line": 14,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 254,
                  "end": 268,
                  "loc": {
                    "start": {
                      "line": 14,
                      "column": 8
                    },
                    "end": {
                      "line": 14,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 266,
                    "end": 268,
                    "loc": {
                      "start": {
                        "line": 14,
                        "column": 20
                      },
                      "end": {
                        "line": 14,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 277,
                "end": 285,
                "loc": {
                  "start": {
                    "line": 15,
                    "column": 8
                  },
                  "end": {
                    "line": 15,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 277,
                  "end": 285,
                  "loc": {
                    "start": {
                      "line": 15,
                      "column": 8
                    },
                    "end": {
                      "line": 15,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 283,
                    "end": 285,
                    "loc": {
                      "start": {
                        "line": 15,
                        "column": 14
                      },
                      "end": {
                        "line": 15,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 294,
                "end": 308,
                "loc": {
                  "start": {
                    "line": 16,
                    "column": 8
                  },
                  "end": {
                    "line": 16,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 294,
                  "end": 308,
                  "loc": {
                    "start": {
                      "line": 16,
                      "column": 8
                    },
                    "end": {
                      "line": 16,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 306,
                    "end": 308,
                    "loc": {
                      "start": {
                        "line": 16,
                        "column": 20
                      },
                      "end": {
                        "line": 16,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 317,
                "end": 331,
                "loc": {
                  "start": {
                    "line": 17,
                    "column": 8
                  },
                  "end": {
                    "line": 17,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 317,
                  "end": 331,
                  "loc": {
                    "start": {
                      "line": 17,
                      "column": 8
                    },
                    "end": {
                      "line": 17,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 329,
                    "end": 331,
                    "loc": {
                      "start": {
                        "line": 17,
                        "column": 20
                      },
                      "end": {
                        "line": 17,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 340,
                "end": 348,
                "loc": {
                  "start": {
                    "line": 18,
                    "column": 8
                  },
                  "end": {
                    "line": 18,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 340,
                  "end": 348,
                  "loc": {
                    "start": {
                      "line": 18,
                      "column": 8
                    },
                    "end": {
                      "line": 18,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 346,
                    "end": 348,
                    "loc": {
                      "start": {
                        "line": 18,
                        "column": 14
                      },
                      "end": {
                        "line": 18,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 357,
                "end": 371,
                "loc": {
                  "start": {
                    "line": 19,
                    "column": 8
                  },
                  "end": {
                    "line": 19,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 357,
                  "end": 371,
                  "loc": {
                    "start": {
                      "line": 19,
                      "column": 8
                    },
                    "end": {
                      "line": 19,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 369,
                    "end": 371,
                    "loc": {
                      "start": {
                        "line": 19,
                        "column": 20
                      },
                      "end": {
                        "line": 19,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 380,
                "end": 388,
                "loc": {
                  "start": {
                    "line": 20,
                    "column": 8
                  },
                  "end": {
                    "line": 20,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 380,
                  "end": 388,
                  "loc": {
                    "start": {
                      "line": 20,
                      "column": 8
                    },
                    "end": {
                      "line": 20,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 386,
                    "end": 388,
                    "loc": {
                      "start": {
                        "line": 20,
                        "column": 14
                      },
                      "end": {
                        "line": 20,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 397,
                "end": 411,
                "loc": {
                  "start": {
                    "line": 21,
                    "column": 8
                  },
                  "end": {
                    "line": 21,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 397,
                  "end": 411,
                  "loc": {
                    "start": {
                      "line": 21,
                      "column": 8
                    },
                    "end": {
                      "line": 21,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 409,
                    "end": 411,
                    "loc": {
                      "start": {
                        "line": 21,
                        "column": 20
                      },
                      "end": {
                        "line": 21,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 420,
                "end": 434,
                "loc": {
                  "start": {
                    "line": 22,
                    "column": 8
                  },
                  "end": {
                    "line": 22,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 420,
                  "end": 434,
                  "loc": {
                    "start": {
                      "line": 22,
                      "column": 8
                    },
                    "end": {
                      "line": 22,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 432,
                    "end": 434,
                    "loc": {
                      "start": {
                        "line": 22,
                        "column": 20
                      },
                      "end": {
                        "line": 22,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 443,
                "end": 451,
                "loc": {
                  "start": {
                    "line": 23,
                    "column": 8
                  },
                  "end": {
                    "line": 23,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 443,
                  "end": 451,
                  "loc": {
                    "start": {
                      "line": 23,
                      "column": 8
                    },
                    "end": {
                      "line": 23,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 449,
                    "end": 451,
                    "loc": {
                      "start": {
                        "line": 23,
                        "column": 14
                      },
                      "end": {
                        "line": 23,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 460,
                "end": 467,
                "loc": {
                  "start": {
                    "line": 24,
                    "column": 8
                  },
                  "end": {
                    "line": 24,
                    "column": 15
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 460,
                  "end": 467,
                  "loc": {
                    "start": {
                      "line": 24,
                      "column": 8
                    },
                    "end": {
                      "line": 24,
                      "column": 15
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 460,
                      "end": 461,
                      "loc": {
                        "start": {
                          "line": 24,
                          "column": 8
                        },
                        "end": {
                          "line": 24,
                          "column": 9
                        }
                      },
                      "name": "b"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 465,
                    "end": 467,
                    "loc": {
                      "start": {
                        "line": 24,
                        "column": 13
                      },
                      "end": {
                        "line": 24,
                        "column": 15
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 476,
                "end": 484,
                "loc": {
                  "start": {
                    "line": 25,
                    "column": 8
                  },
                  "end": {
                    "line": 25,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 476,
                  "end": 484,
                  "loc": {
                    "start": {
                      "line": 25,
                      "column": 8
                    },
                    "end": {
                      "line": 25,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 482,
                    "end": 484,
                    "loc": {
                      "start": {
                        "line": 25,
                        "column": 14
                      },
                      "end": {
                        "line": 25,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 493,
                "end": 506,
                "loc": {
                  "start": {
                    "line": 26,
                    "column": 8
                  },
                  "end": {
                    "line": 26,
                    "column": 21
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 493,
                  "end": 506,
                  "loc": {
                    "start": {
                      "line": 26,
                      "column": 8
                    },
                    "end": {
                      "line": 26,
                      "column": 21
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 499,
                      "end": 500,
                      "loc": {
                        "start": {
                          "line": 26,
                          "column": 14
                        },
                        "end": {
                          "line": 26,
                          "column": 15
                        }
                      },
                      "name": "b"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 504,
                    "end": 506,
                    "loc": {
                      "start": {
                        "line": 26,
                        "column": 19
                      },
                      "end": {
                        "line": 26,
                        "column": 21
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 515,
                "end": 529,
                "loc": {
                  "start": {
                    "line": 27,
                    "column": 8
                  },
                  "end": {
                    "line": 27,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 515,
                  "end": 529,
                  "loc": {
                    "start": {
                      "line": 27,
                      "column": 8
                    },
                    "end": {
                      "line": 27,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 527,
                    "end": 529,
                    "loc": {
                      "start": {
                        "line": 27,
                        "column": 20
                      },
                      "end": {
                        "line": 27,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 538,
                "end": 552,
                "loc": {
                  "start": {
                    "line": 28,
                    "column": 8
                  },
                  "end": {
                    "line": 28,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 538,
                  "end": 552,
                  "loc": {
                    "start": {
                      "line": 28,
                      "column": 8
                    },
                    "end": {
                      "line": 28,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 550,
                    "end": 552,
                    "loc": {
                      "start": {
                        "line": 28,
                        "column": 20
                      },
                      "end": {
                        "line": 28,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 561,
                "end": 569,
                "loc": {
                  "start": {
                    "line": 29,
                    "column": 8
                  },
                  "end": {
                    "line": 29,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 561,
                  "end": 569,
                  "loc": {
                    "start": {
                      "line": 29,
                      "column": 8
                    },
                    "end": {
                      "line": 29,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 567,
                    "end": 569,
                    "loc": {
                      "start": {
                        "line": 29,
                        "column": 14
                      },
                      "end": {
                        "line": 29,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 587,
                "end": 601,
                "loc": {
                  "start": {
                    "line": 31,
                    "column": 8
                  },
                  "end": {
                    "line": 31,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 587,
                  "end": 601,
                  "loc": {
                    "start": {
                      "line": 31,
                      "column": 8
                    },
                    "end": {
                      "line": 31,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 599,
                    "end": 601,
                    "loc": {
                      "start": {
                        "line": 31,
                        "column": 20
                      },
                      "end": {
                        "line": 31,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 610,
                "end": 618,
                "loc": {
                  "start": {
                    "line": 32,
                    "column": 8
                  },
                  "end": {
                    "line": 32,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 610,
                  "end": 618,
                  "loc": {
                    "start": {
                      "line": 32,
                      "column": 8
                    },
                    "end": {
                      "line": 32,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 616,
                    "end": 618,
                    "loc": {
                      "start": {
                        "line": 32,
                        "column": 14
                      },
                      "end": {
                        "line": 32,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 636,
                "end": 650,
                "loc": {
                  "start": {
                    "line": 34,
                    "column": 8
                  },
                  "end": {
                    "line": 34,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 636,
                  "end": 650,
                  "loc": {
                    "start": {
                      "line": 34,
                      "column": 8
                    },
                    "end": {
                      "line": 34,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 648,
                    "end": 650,
                    "loc": {
                      "start": {
                        "line": 34,
                        "column": 20
                      },
                      "end": {
                        "line": 34,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 659,
                "end": 667,
                "loc": {
                  "start": {
                    "line": 35,
                    "column": 8
                  },
                  "end": {
                    "line": 35,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 659,
                  "end": 667,
                  "loc": {
                    "start": {
                      "line": 35,
                      "column": 8
                    },
                    "end": {
                      "line": 35,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 665,
                    "end": 667,
                    "loc": {
                      "start": {
                        "line": 35,
                        "column": 14
                      },
                      "end": {
                        "line": 35,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 676,
                "end": 690,
                "loc": {
                  "start": {
                    "line": 36,
                    "column": 8
                  },
                  "end": {
                    "line": 36,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 676,
                  "end": 690,
                  "loc": {
                    "start": {
                      "line": 36,
                      "column": 8
                    },
                    "end": {
                      "line": 36,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 688,
                    "end": 690,
                    "loc": {
                      "start": {
                        "line": 36,
                        "column": 20
                      },
                      "end": {
                        "line": 36,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 699,
                "end": 700,
                "loc": {
                  "start": {
                    "line": 37,
                    "column": 8
                  },
                  "end": {
                    "line": 37,
                    "column": 9
                  }
                },
                "expression": {
                  "type": "Identifier",
                  "start": 699,
                  "end": 700,
                  "loc": {
                    "start": {
                      "line": 37,
                      "column": 8
                    },
                    "end": {
                      "line": 37,
                      "column": 9
                    }
                  },
                  "name": "a"
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 709,
                "end": 723,
                "loc": {
                  "start": {
                    "line": 38,
                    "column": 8
                  },
                  "end": {
                    "line": 38,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 709,
                  "end": 723,
                  "loc": {
                    "start": {
                      "line": 38,
                      "column": 8
                    },
                    "end": {
                      "line": 38,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 721,
                    "end": 723,
                    "loc": {
                      "start": {
                        "line": 38,
                        "column": 20
                      },
                      "end": {
                        "line": 38,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 732,
                "end": 740,
                "loc": {
                  "start": {
                    "line": 39,
                    "column": 8
                  },
                  "end": {
                    "line": 39,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 732,
                  "end": 740,
                  "loc": {
                    "start": {
                      "line": 39,
                      "column": 8
                    },
                    "end": {
                      "line": 39,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 738,
                    "end": 740,
                    "loc": {
                      "start": {
                        "line": 39,
                        "column": 14
                      },
                      "end": {
                        "line": 39,
                        "column": 16
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


    it('should parse complex #7', () => {
      expect(parseScript(`async ()
      a(b, c)
       b => {}
      c => 123
c => 123
      a(b, c)
a(b, c => 123)`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 90,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 14
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 8,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 8
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 0,
              "end": 8,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 8
                }
              },
              "callee": {
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
              "arguments": []
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 15,
            "end": 22,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 13
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 15,
              "end": 22,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 13
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 15,
                "end": 16,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 6
                  },
                  "end": {
                    "line": 2,
                    "column": 7
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 17,
                  "end": 18,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 8
                    },
                    "end": {
                      "line": 2,
                      "column": 9
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "Identifier",
                  "start": 20,
                  "end": 21,
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
                  "name": "c"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 30,
            "end": 37,
            "loc": {
              "start": {
                "line": 3,
                "column": 7
              },
              "end": {
                "line": 3,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 30,
              "end": 37,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 7
                },
                "end": {
                  "line": 3,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 30,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 7
                    },
                    "end": {
                      "line": 3,
                      "column": 8
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 35,
                "end": 37,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 12
                  },
                  "end": {
                    "line": 3,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 44,
            "end": 52,
            "loc": {
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 4,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 44,
              "end": 52,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 4,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 44,
                  "end": 45,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 6
                    },
                    "end": {
                      "line": 4,
                      "column": 7
                    }
                  },
                  "name": "c"
                }
              ],
              "body": {
                "type": "Literal",
                "start": 49,
                "end": 52,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 11
                  },
                  "end": {
                    "line": 4,
                    "column": 14
                  }
                },
                "value": 123,
                "raw": "123"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 53,
            "end": 61,
            "loc": {
              "start": {
                "line": 5,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 8
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 53,
              "end": 61,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 0
                },
                "end": {
                  "line": 5,
                  "column": 8
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 53,
                  "end": 54,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 0
                    },
                    "end": {
                      "line": 5,
                      "column": 1
                    }
                  },
                  "name": "c"
                }
              ],
              "body": {
                "type": "Literal",
                "start": 58,
                "end": 61,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 5
                  },
                  "end": {
                    "line": 5,
                    "column": 8
                  }
                },
                "value": 123,
                "raw": "123"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 68,
            "end": 75,
            "loc": {
              "start": {
                "line": 6,
                "column": 6
              },
              "end": {
                "line": 6,
                "column": 13
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 68,
              "end": 75,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 6
                },
                "end": {
                  "line": 6,
                  "column": 13
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 68,
                "end": 69,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 6
                  },
                  "end": {
                    "line": 6,
                    "column": 7
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 70,
                  "end": 71,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 8
                    },
                    "end": {
                      "line": 6,
                      "column": 9
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "Identifier",
                  "start": 73,
                  "end": 74,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 11
                    },
                    "end": {
                      "line": 6,
                      "column": 12
                    }
                  },
                  "name": "c"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 76,
            "end": 90,
            "loc": {
              "start": {
                "line": 7,
                "column": 0
              },
              "end": {
                "line": 7,
                "column": 14
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 76,
              "end": 90,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 0
                },
                "end": {
                  "line": 7,
                  "column": 14
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 76,
                "end": 77,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 0
                  },
                  "end": {
                    "line": 7,
                    "column": 1
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 78,
                  "end": 79,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 2
                    },
                    "end": {
                      "line": 7,
                      "column": 3
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "ArrowFunctionExpression",
                  "start": 81,
                  "end": 89,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 5
                    },
                    "end": {
                      "line": 7,
                      "column": 13
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 81,
                      "end": 82,
                      "loc": {
                        "start": {
                          "line": 7,
                          "column": 5
                        },
                        "end": {
                          "line": 7,
                          "column": 6
                        }
                      },
                      "name": "c"
                    }
                  ],
                  "body": {
                    "type": "Literal",
                    "start": 86,
                    "end": 89,
                    "loc": {
                      "start": {
                        "line": 7,
                        "column": 10
                      },
                      "end": {
                        "line": 7,
                        "column": 13
                      }
                    },
                    "value": 123,
                    "raw": "123"
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse complex #8', () => {
      expect(parseScript(`async ((a => a.b()))
      a (a, b, c)
            a(b, c)
      foo = (async) => 123
             b => {}
             (a => a.b(yield))
            c => 123
      foo = (c) => 123
            a(b, (a => a.b((a => a.b()))))
      (a => a.b())
      foo = (foo = (c) => 123) => 123
      a(b, c => 123)
      async (a => b())`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 325,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 22
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
              "type": "CallExpression",
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
              "callee": {
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
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "start": 8,
                  "end": 18,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 18
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
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
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
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
                    "callee": {
                      "type": "MemberExpression",
                      "start": 13,
                      "end": 16,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 1,
                          "column": 16
                        }
                      },
                      "object": {
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
                      },
                      "property": {
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
                      "computed": false
                    },
                    "arguments": []
                  }
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 27,
            "end": 38,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 17
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 27,
              "end": 38,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 17
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 27,
                "end": 28,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 6
                  },
                  "end": {
                    "line": 2,
                    "column": 7
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 30,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 9
                    },
                    "end": {
                      "line": 2,
                      "column": 10
                    }
                  },
                  "name": "a"
                },
                {
                  "type": "Identifier",
                  "start": 33,
                  "end": 34,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 12
                    },
                    "end": {
                      "line": 2,
                      "column": 13
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "Identifier",
                  "start": 36,
                  "end": 37,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 15
                    },
                    "end": {
                      "line": 2,
                      "column": 16
                    }
                  },
                  "name": "c"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 51,
            "end": 58,
            "loc": {
              "start": {
                "line": 3,
                "column": 12
              },
              "end": {
                "line": 3,
                "column": 19
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 51,
              "end": 58,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 12
                },
                "end": {
                  "line": 3,
                  "column": 19
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 51,
                "end": 52,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 12
                  },
                  "end": {
                    "line": 3,
                    "column": 13
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 53,
                  "end": 54,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 14
                    },
                    "end": {
                      "line": 3,
                      "column": 15
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "Identifier",
                  "start": 56,
                  "end": 57,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 17
                    },
                    "end": {
                      "line": 3,
                      "column": 18
                    }
                  },
                  "name": "c"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 65,
            "end": 85,
            "loc": {
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 4,
                "column": 26
              }
            },
            "expression": {
              "type": "AssignmentExpression",
              "start": 65,
              "end": 85,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 4,
                  "column": 26
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "start": 65,
                "end": 68,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 6
                  },
                  "end": {
                    "line": 4,
                    "column": 9
                  }
                },
                "name": "foo"
              },
              "right": {
                "type": "ArrowFunctionExpression",
                "start": 71,
                "end": 85,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 12
                  },
                  "end": {
                    "line": 4,
                    "column": 26
                  }
                },
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 72,
                    "end": 77,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 13
                      },
                      "end": {
                        "line": 4,
                        "column": 18
                      }
                    },
                    "name": "async"
                  }
                ],
                "body": {
                  "type": "Literal",
                  "start": 82,
                  "end": 85,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 23
                    },
                    "end": {
                      "line": 4,
                      "column": 26
                    }
                  },
                  "value": 123,
                  "raw": "123"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 99,
            "end": 106,
            "loc": {
              "start": {
                "line": 5,
                "column": 13
              },
              "end": {
                "line": 5,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 99,
              "end": 106,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 13
                },
                "end": {
                  "line": 5,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 99,
                  "end": 100,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 13
                    },
                    "end": {
                      "line": 5,
                      "column": 14
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 104,
                "end": 106,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 18
                  },
                  "end": {
                    "line": 5,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 120,
            "end": 137,
            "loc": {
              "start": {
                "line": 6,
                "column": 13
              },
              "end": {
                "line": 6,
                "column": 30
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 121,
              "end": 136,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 14
                },
                "end": {
                  "line": 6,
                  "column": 29
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 121,
                  "end": 122,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 14
                    },
                    "end": {
                      "line": 6,
                      "column": 15
                    }
                  },
                  "name": "a"
                }
              ],
              "body": {
                "type": "CallExpression",
                "start": 126,
                "end": 136,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 19
                  },
                  "end": {
                    "line": 6,
                    "column": 29
                  }
                },
                "callee": {
                  "type": "MemberExpression",
                  "start": 126,
                  "end": 129,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 19
                    },
                    "end": {
                      "line": 6,
                      "column": 22
                    }
                  },
                  "object": {
                    "type": "Identifier",
                    "start": 126,
                    "end": 127,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 19
                      },
                      "end": {
                        "line": 6,
                        "column": 20
                      }
                    },
                    "name": "a"
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 128,
                    "end": 129,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 21
                      },
                      "end": {
                        "line": 6,
                        "column": 22
                      }
                    },
                    "name": "b"
                  },
                  "computed": false
                },
                "arguments": [
                  {
                    "type": "Identifier",
                    "start": 130,
                    "end": 135,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 23
                      },
                      "end": {
                        "line": 6,
                        "column": 28
                      }
                    },
                    "name": "yield"
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 150,
            "end": 158,
            "loc": {
              "start": {
                "line": 7,
                "column": 12
              },
              "end": {
                "line": 7,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 150,
              "end": 158,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 12
                },
                "end": {
                  "line": 7,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 150,
                  "end": 151,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 12
                    },
                    "end": {
                      "line": 7,
                      "column": 13
                    }
                  },
                  "name": "c"
                }
              ],
              "body": {
                "type": "Literal",
                "start": 155,
                "end": 158,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 17
                  },
                  "end": {
                    "line": 7,
                    "column": 20
                  }
                },
                "value": 123,
                "raw": "123"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 165,
            "end": 181,
            "loc": {
              "start": {
                "line": 8,
                "column": 6
              },
              "end": {
                "line": 8,
                "column": 22
              }
            },
            "expression": {
              "type": "AssignmentExpression",
              "start": 165,
              "end": 181,
              "loc": {
                "start": {
                  "line": 8,
                  "column": 6
                },
                "end": {
                  "line": 8,
                  "column": 22
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "start": 165,
                "end": 168,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 6
                  },
                  "end": {
                    "line": 8,
                    "column": 9
                  }
                },
                "name": "foo"
              },
              "right": {
                "type": "ArrowFunctionExpression",
                "start": 171,
                "end": 181,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 12
                  },
                  "end": {
                    "line": 8,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 172,
                    "end": 173,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 13
                      },
                      "end": {
                        "line": 8,
                        "column": 14
                      }
                    },
                    "name": "c"
                  }
                ],
                "body": {
                  "type": "Literal",
                  "start": 178,
                  "end": 181,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 19
                    },
                    "end": {
                      "line": 8,
                      "column": 22
                    }
                  },
                  "value": 123,
                  "raw": "123"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 194,
            "end": 243,
            "loc": {
              "start": {
                "line": 9,
                "column": 12
              },
              "end": {
                "line": 10,
                "column": 18
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 194,
              "end": 243,
              "loc": {
                "start": {
                  "line": 9,
                  "column": 12
                },
                "end": {
                  "line": 10,
                  "column": 18
                }
              },
              "callee": {
                "type": "CallExpression",
                "start": 194,
                "end": 224,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 12
                  },
                  "end": {
                    "line": 9,
                    "column": 42
                  }
                },
                "callee": {
                  "type": "Identifier",
                  "start": 194,
                  "end": 195,
                  "loc": {
                    "start": {
                      "line": 9,
                      "column": 12
                    },
                    "end": {
                      "line": 9,
                      "column": 13
                    }
                  },
                  "name": "a"
                },
                "arguments": [
                  {
                    "type": "Identifier",
                    "start": 196,
                    "end": 197,
                    "loc": {
                      "start": {
                        "line": 9,
                        "column": 14
                      },
                      "end": {
                        "line": 9,
                        "column": 15
                      }
                    },
                    "name": "b"
                  },
                  {
                    "type": "ArrowFunctionExpression",
                    "start": 200,
                    "end": 222,
                    "loc": {
                      "start": {
                        "line": 9,
                        "column": 18
                      },
                      "end": {
                        "line": 9,
                        "column": 40
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
                        "start": 200,
                        "end": 201,
                        "loc": {
                          "start": {
                            "line": 9,
                            "column": 18
                          },
                          "end": {
                            "line": 9,
                            "column": 19
                          }
                        },
                        "name": "a"
                      }
                    ],
                    "body": {
                      "type": "CallExpression",
                      "start": 205,
                      "end": 222,
                      "loc": {
                        "start": {
                          "line": 9,
                          "column": 23
                        },
                        "end": {
                          "line": 9,
                          "column": 40
                        }
                      },
                      "callee": {
                        "type": "MemberExpression",
                        "start": 205,
                        "end": 208,
                        "loc": {
                          "start": {
                            "line": 9,
                            "column": 23
                          },
                          "end": {
                            "line": 9,
                            "column": 26
                          }
                        },
                        "object": {
                          "type": "Identifier",
                          "start": 205,
                          "end": 206,
                          "loc": {
                            "start": {
                              "line": 9,
                              "column": 23
                            },
                            "end": {
                              "line": 9,
                              "column": 24
                            }
                          },
                          "name": "a"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 207,
                          "end": 208,
                          "loc": {
                            "start": {
                              "line": 9,
                              "column": 25
                            },
                            "end": {
                              "line": 9,
                              "column": 26
                            }
                          },
                          "name": "b"
                        },
                        "computed": false
                      },
                      "arguments": [
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 210,
                          "end": 220,
                          "loc": {
                            "start": {
                              "line": 9,
                              "column": 28
                            },
                            "end": {
                              "line": 9,
                              "column": 38
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": false,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 210,
                              "end": 211,
                              "loc": {
                                "start": {
                                  "line": 9,
                                  "column": 28
                                },
                                "end": {
                                  "line": 9,
                                  "column": 29
                                }
                              },
                              "name": "a"
                            }
                          ],
                          "body": {
                            "type": "CallExpression",
                            "start": 215,
                            "end": 220,
                            "loc": {
                              "start": {
                                "line": 9,
                                "column": 33
                              },
                              "end": {
                                "line": 9,
                                "column": 38
                              }
                            },
                            "callee": {
                              "type": "MemberExpression",
                              "start": 215,
                              "end": 218,
                              "loc": {
                                "start": {
                                  "line": 9,
                                  "column": 33
                                },
                                "end": {
                                  "line": 9,
                                  "column": 36
                                }
                              },
                              "object": {
                                "type": "Identifier",
                                "start": 215,
                                "end": 216,
                                "loc": {
                                  "start": {
                                    "line": 9,
                                    "column": 33
                                  },
                                  "end": {
                                    "line": 9,
                                    "column": 34
                                  }
                                },
                                "name": "a"
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 217,
                                "end": 218,
                                "loc": {
                                  "start": {
                                    "line": 9,
                                    "column": 35
                                  },
                                  "end": {
                                    "line": 9,
                                    "column": 36
                                  }
                                },
                                "name": "b"
                              },
                              "computed": false
                            },
                            "arguments": []
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "start": 232,
                  "end": 242,
                  "loc": {
                    "start": {
                      "line": 10,
                      "column": 7
                    },
                    "end": {
                      "line": 10,
                      "column": 17
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 232,
                      "end": 233,
                      "loc": {
                        "start": {
                          "line": 10,
                          "column": 7
                        },
                        "end": {
                          "line": 10,
                          "column": 8
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
                    "start": 237,
                    "end": 242,
                    "loc": {
                      "start": {
                        "line": 10,
                        "column": 12
                      },
                      "end": {
                        "line": 10,
                        "column": 17
                      }
                    },
                    "callee": {
                      "type": "MemberExpression",
                      "start": 237,
                      "end": 240,
                      "loc": {
                        "start": {
                          "line": 10,
                          "column": 12
                        },
                        "end": {
                          "line": 10,
                          "column": 15
                        }
                      },
                      "object": {
                        "type": "Identifier",
                        "start": 237,
                        "end": 238,
                        "loc": {
                          "start": {
                            "line": 10,
                            "column": 12
                          },
                          "end": {
                            "line": 10,
                            "column": 13
                          }
                        },
                        "name": "a"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 239,
                        "end": 240,
                        "loc": {
                          "start": {
                            "line": 10,
                            "column": 14
                          },
                          "end": {
                            "line": 10,
                            "column": 15
                          }
                        },
                        "name": "b"
                      },
                      "computed": false
                    },
                    "arguments": []
                  }
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 250,
            "end": 281,
            "loc": {
              "start": {
                "line": 11,
                "column": 6
              },
              "end": {
                "line": 11,
                "column": 37
              }
            },
            "expression": {
              "type": "AssignmentExpression",
              "start": 250,
              "end": 281,
              "loc": {
                "start": {
                  "line": 11,
                  "column": 6
                },
                "end": {
                  "line": 11,
                  "column": 37
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "start": 250,
                "end": 253,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 6
                  },
                  "end": {
                    "line": 11,
                    "column": 9
                  }
                },
                "name": "foo"
              },
              "right": {
                "type": "ArrowFunctionExpression",
                "start": 256,
                "end": 281,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 12
                  },
                  "end": {
                    "line": 11,
                    "column": 37
                  }
                },
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 257,
                    "end": 273,
                    "loc": {
                      "start": {
                        "line": 11,
                        "column": 13
                      },
                      "end": {
                        "line": 11,
                        "column": 29
                      }
                    },
                    "left": {
                      "type": "Identifier",
                      "start": 257,
                      "end": 260,
                      "loc": {
                        "start": {
                          "line": 11,
                          "column": 13
                        },
                        "end": {
                          "line": 11,
                          "column": 16
                        }
                      },
                      "name": "foo"
                    },
                    "right": {
                      "type": "ArrowFunctionExpression",
                      "start": 263,
                      "end": 273,
                      "loc": {
                        "start": {
                          "line": 11,
                          "column": 19
                        },
                        "end": {
                          "line": 11,
                          "column": 29
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 264,
                          "end": 265,
                          "loc": {
                            "start": {
                              "line": 11,
                              "column": 20
                            },
                            "end": {
                              "line": 11,
                              "column": 21
                            }
                          },
                          "name": "c"
                        }
                      ],
                      "body": {
                        "type": "Literal",
                        "start": 270,
                        "end": 273,
                        "loc": {
                          "start": {
                            "line": 11,
                            "column": 26
                          },
                          "end": {
                            "line": 11,
                            "column": 29
                          }
                        },
                        "value": 123,
                        "raw": "123"
                      }
                    }
                  }
                ],
                "body": {
                  "type": "Literal",
                  "start": 278,
                  "end": 281,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 34
                    },
                    "end": {
                      "line": 11,
                      "column": 37
                    }
                  },
                  "value": 123,
                  "raw": "123"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 288,
            "end": 302,
            "loc": {
              "start": {
                "line": 12,
                "column": 6
              },
              "end": {
                "line": 12,
                "column": 20
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 288,
              "end": 302,
              "loc": {
                "start": {
                  "line": 12,
                  "column": 6
                },
                "end": {
                  "line": 12,
                  "column": 20
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 288,
                "end": 289,
                "loc": {
                  "start": {
                    "line": 12,
                    "column": 6
                  },
                  "end": {
                    "line": 12,
                    "column": 7
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 290,
                  "end": 291,
                  "loc": {
                    "start": {
                      "line": 12,
                      "column": 8
                    },
                    "end": {
                      "line": 12,
                      "column": 9
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "ArrowFunctionExpression",
                  "start": 293,
                  "end": 301,
                  "loc": {
                    "start": {
                      "line": 12,
                      "column": 11
                    },
                    "end": {
                      "line": 12,
                      "column": 19
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 293,
                      "end": 294,
                      "loc": {
                        "start": {
                          "line": 12,
                          "column": 11
                        },
                        "end": {
                          "line": 12,
                          "column": 12
                        }
                      },
                      "name": "c"
                    }
                  ],
                  "body": {
                    "type": "Literal",
                    "start": 298,
                    "end": 301,
                    "loc": {
                      "start": {
                        "line": 12,
                        "column": 16
                      },
                      "end": {
                        "line": 12,
                        "column": 19
                      }
                    },
                    "value": 123,
                    "raw": "123"
                  }
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 309,
            "end": 325,
            "loc": {
              "start": {
                "line": 13,
                "column": 6
              },
              "end": {
                "line": 13,
                "column": 22
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 309,
              "end": 325,
              "loc": {
                "start": {
                  "line": 13,
                  "column": 6
                },
                "end": {
                  "line": 13,
                  "column": 22
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 309,
                "end": 314,
                "loc": {
                  "start": {
                    "line": 13,
                    "column": 6
                  },
                  "end": {
                    "line": 13,
                    "column": 11
                  }
                },
                "name": "async"
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "start": 316,
                  "end": 324,
                  "loc": {
                    "start": {
                      "line": 13,
                      "column": 13
                    },
                    "end": {
                      "line": 13,
                      "column": 21
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 316,
                      "end": 317,
                      "loc": {
                        "start": {
                          "line": 13,
                          "column": 13
                        },
                        "end": {
                          "line": 13,
                          "column": 14
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
                    "start": 321,
                    "end": 324,
                    "loc": {
                      "start": {
                        "line": 13,
                        "column": 18
                      },
                      "end": {
                        "line": 13,
                        "column": 21
                      }
                    },
                    "callee": {
                      "type": "Identifier",
                      "start": 321,
                      "end": 322,
                      "loc": {
                        "start": {
                          "line": 13,
                          "column": 18
                        },
                        "end": {
                          "line": 13,
                          "column": 19
                        }
                      },
                      "name": "b"
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

    it.skip('should parse complex #9', () => {
      expect(parseScript(`async ((a => a.b()))
      a (a, b, c)
            a(b, c)
      foo = (async) => 123
async (c) => c => 123
b => { a => a.b() }
             (a => a.b(yield))
            c => 123
      foo = (c) => 123
async (c) => c => 123
a(b, c)
async (c) => c => 123
            a(b, (a => a.b((a => a.b()))))
      (a => a.b(a => a.b(a => a.b(a => a.b()))))
      foo = (foo = (c) => 123) => 123
      a(b, c => 123)
      async c => c => 123
async c => c => 123
async c => c => 123
      a(b, c => 123)
      async (a => b())
a (a => b())
cherow(1,2,3)`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({});
    });

    it('should parse complex #10', () => {
      expect(parseScript(`async () => {}
      async () => {}`, {
          ranges: true,
          locations: true,
          raw: true
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
            "line": 2,
            "column": 20
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
              "expression": false,
              "async": true,
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
            "type": "ExpressionStatement",
            "start": 21,
            "end": 35,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 21,
              "end": 35,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
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
                "start": 33,
                "end": 35,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 18
                  },
                  "end": {
                    "line": 2,
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

    it('should parse complex #11', () => {
      expect(parseScript(`async () => {}
      () => {}`, {
          ranges: true,
          locations: true,
          raw: true
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
            "line": 2,
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
              "expression": false,
              "async": true,
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
            "type": "ExpressionStatement",
            "start": 21,
            "end": 29,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 21,
              "end": 29,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
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
                "start": 27,
                "end": 29,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 12
                  },
                  "end": {
                    "line": 2,
                    "column": 14
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

    it('should parse complex #12', () => {
      expect(parseScript(`() => { () => {} }
      () => {}`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 33,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 14
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
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 6,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 6
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 8,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 8,
                      "end": 16,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 16
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
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
                        },
                        "body": []
                      }
                    }
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 25,
            "end": 33,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 25,
              "end": 33,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
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
                "start": 31,
                "end": 33,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 12
                  },
                  "end": {
                    "line": 2,
                    "column": 14
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

    it('should parse complex #13', () => {
      expect(parseScript(`b => {}
      a(b, c => 123)`, {
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
            "line": 2,
            "column": 20
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 7,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 7
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 0,
              "end": 7,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 7
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
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
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 5,
                "end": 7,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 5
                  },
                  "end": {
                    "line": 1,
                    "column": 7
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 14,
            "end": 28,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 20
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 14,
              "end": 28,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 20
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 14,
                "end": 15,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 6
                  },
                  "end": {
                    "line": 2,
                    "column": 7
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 16,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 8
                    },
                    "end": {
                      "line": 2,
                      "column": 9
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "ArrowFunctionExpression",
                  "start": 19,
                  "end": 27,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 11
                    },
                    "end": {
                      "line": 2,
                      "column": 19
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 19,
                      "end": 20,
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
                      "name": "c"
                    }
                  ],
                  "body": {
                    "type": "Literal",
                    "start": 24,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 16
                      },
                      "end": {
                        "line": 2,
                        "column": 19
                      }
                    },
                    "value": 123,
                    "raw": "123"
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