import { parseScript, parseModule } from '../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('V8 - Do expression', () => {
    

    it('should return sequence', () => {
        expect(parseScript(`async (abc)`, {
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            "body": [
              {
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "CallExpression",
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
                      "type": "Identifier",
                      "start": 7,
                      "end": 10,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 7
                        },
                        "end": {
                          "line": 1,
                          "column": 10
                        }
                      },
                      "name": "abc"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should return sequence', () => {
        expect(parseScript(`async (abc) => 67  % 6`, {
            ranges: true,
            locations: true,
            raw: true
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
                  "expression": true,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 7,
                      "end": 10,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 7
                        },
                        "end": {
                          "line": 1,
                          "column": 10
                        }
                      },
                      "name": "abc"
                    }
                  ],
                  "body": {
                    "type": "BinaryExpression",
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
                    "left": {
                      "type": "Literal",
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
                      },
                      "value": 67,
                      "raw": "67"
                    },
                    "operator": "%",
                    "right": {
                      "type": "Literal",
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
                      "value": 6,
                      "raw": "6"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should return sequence', () => {
        expect(parseScript(`async (abc) => b`, {
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            "body": [
              {
                "type": "ExpressionStatement",
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
                      "start": 7,
                      "end": 10,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 7
                        },
                        "end": {
                          "line": 1,
                          "column": 10
                        }
                      },
                      "name": "abc"
                    }
                  ],
                  "body": {
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
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });
















    it('should return sequence', () => {
        expect(parseScript(`async () => b`, {
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
                    "name": "b"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should return sequence', () => {
        expect(parseScript(`async a => b`, {
            ranges: true,
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
                    "name": "b"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should return sequence', () => {
        expect(parseScript(`a => b`, {
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
                  "type": "ArrowFunctionExpression",
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
                    "name": "b"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should return sequence', () => {
        expect(parseScript(`foo((x, y) => {});`, {
            ranges: true,
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
                    "name": "foo"
                  },
                  "arguments": [
                    {
                      "type": "ArrowFunctionExpression",
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
                      "id": null,
                      "generator": false,
                      "expression": false,
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
                          "name": "x"
                        },
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
                          "name": "y"
                        }
                      ],
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
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

  
    it('should return sequence', () => {
        expect(parseScript(`(x) => { b }`, {
            ranges: true,
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
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 1,
                      "end": 2,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 2
                        }
                      },
                      "name": "x"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
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
                    "body": [
                      {
                        "type": "ExpressionStatement",
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
                        "expression": {
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
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should return sequence', () => {
        expect(parseScript(`(x) => ((y, z) => (x, y, z));`, {
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
                "line": 1,
                "column": 29
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 1,
                      "end": 2,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 2
                        }
                      },
                      "name": "x"
                    }
                  ],
                  "body": {
                    "type": "ArrowFunctionExpression",
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
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [
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
                        "name": "y"
                      },
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
                        "name": "z"
                      }
                    ],
                    "body": {
                      "type": "SequenceExpression",
                      "start": 19,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 19
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "expressions": [
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
                          "name": "x"
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
                          "name": "y"
                        },
                        {
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
                          "name": "z"
                        }
                      ]
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });
    
});