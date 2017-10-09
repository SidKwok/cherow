import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Async Arrow function', () => {

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
                "name": "a"
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
              "name": "a"
            }
          }
        }
      ],
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
                      "name": "a"
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
                    "name": "a"
                  }
                }
              }
            ],
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
                  "params": [
                    {
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
                    }
                  ],
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
              }
            ],
            "sourceType": "script"
          });
    });

});
