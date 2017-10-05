import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Next - Pipeline operator', () => {

    it('should parse simple pipeline', () => {
        expect(parseScript(`a |> b`, {
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "a",
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
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "b",
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
                            }
                        },
                        "operator": "|>",
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
                        }
                    },
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
    });

    it('should parse multiline', () => {
        expect(parseScript(`result = "hello"
          |> doubleSay
          |> capitalize
          |> exclaim;`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "result",
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
                            }
                        },
                        "operator": "=",
                        "right": {
                            "type": "BinaryExpression",
                            "left": {
                                "type": "BinaryExpression",
                                "left": {
                                    "type": "BinaryExpression",
                                    "left": {
                                        "type": "Literal",
                                        "value": "hello",
                                        "start": 9,
                                        "end": 16,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 9
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 16
                                            }
                                        },
                                        "raw": "\"hello\""
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "doubleSay",
                                        "start": 30,
                                        "end": 39,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 13
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 22
                                            }
                                        }
                                    },
                                    "operator": "|>",
                                    "start": 9,
                                    "end": 39,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 9
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 22
                                        }
                                    }
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "capitalize",
                                    "start": 53,
                                    "end": 63,
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 13
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 23
                                        }
                                    }
                                },
                                "operator": "|>",
                                "start": 9,
                                "end": 63,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 23
                                    }
                                }
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "exclaim",
                                "start": 77,
                                "end": 84,
                                "loc": {
                                    "start": {
                                        "line": 4,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 20
                                    }
                                }
                            },
                            "operator": "|>",
                            "start": 9,
                            "end": 84,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 9
                                },
                                "end": {
                                    "line": 4,
                                    "column": 20
                                }
                            }
                        },
                        "start": 0,
                        "end": 84,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 4,
                                "column": 20
                            }
                        }
                    },
                    "start": 0,
                    "end": 85,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 4,
                            "column": 21
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 85,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 21
                }
            }
        });
    });

    it.skip('should parse precedence', () => {
        expect(parseScript(`
        4 || 9 |> inc;
        10 |> f || h |> inc`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "left": {
                            "type": "LogicalExpression",
                            "left": {
                                "type": "Literal",
                                "value": 4,
                                "start": 9,
                                "end": 10,
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
                                "raw": "4"
                            },
                            "right": {
                                "type": "Literal",
                                "value": 9,
                                "start": 14,
                                "end": 15,
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
                                "raw": "9"
                            },
                            "operator": "||",
                            "start": 9,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 8
                                },
                                "end": {
                                    "line": 2,
                                    "column": 14
                                }
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "inc",
                            "start": 19,
                            "end": 22,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 18
                                },
                                "end": {
                                    "line": 2,
                                    "column": 21
                                }
                            }
                        },
                        "operator": "|>",
                        "start": 9,
                        "end": 22,
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 8
                            },
                            "end": {
                                "line": 2,
                                "column": 21
                            }
                        }
                    },
                    "start": 9,
                    "end": 23,
                    "loc": {
                        "start": {
                            "line": 2,
                            "column": 8
                        },
                        "end": {
                            "line": 2,
                            "column": 22
                        }
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "left": {
                            "type": "LogicalExpression",
                            "left": {
                                "type": "BinaryExpression",
                                "left": {
                                    "type": "Literal",
                                    "value": 10,
                                    "start": 32,
                                    "end": 34,
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 10
                                        }
                                    },
                                    "raw": "10"
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "f",
                                    "start": 38,
                                    "end": 39,
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 15
                                        }
                                    }
                                },
                                "operator": "|>",
                                "start": 32,
                                "end": 39,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 15
                                    }
                                }
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "h",
                                "start": 43,
                                "end": 44,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 19
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 20
                                    }
                                }
                            },
                            "operator": "||",
                            "start": 32,
                            "end": 44,
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 8
                                },
                                "end": {
                                    "line": 3,
                                    "column": 20
                                }
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "inc",
                            "start": 48,
                            "end": 51,
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 24
                                },
                                "end": {
                                    "line": 3,
                                    "column": 27
                                }
                            }
                        },
                        "operator": "|>",
                        "start": 32,
                        "end": 51,
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 8
                            },
                            "end": {
                                "line": 3,
                                "column": 27
                            }
                        }
                    },
                    "start": 32,
                    "end": 51,
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 8
                        },
                        "end": {
                            "line": 3,
                            "column": 27
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 51,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 3,
                    "column": 27
                }
            }
        });
    });
});