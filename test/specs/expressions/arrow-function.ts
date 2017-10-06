import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Arrow function', () => {

    it('should parse arrow with parenthesis', () => {
        expect(parseScript(`(a) => a;`, {
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
                    "expression": true,
                    "async": false,
                    "params": [{
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
                        "name": "a"
                    }],
                    "body": {
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
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse as param', () => {
        expect(parseScript(`foo(() => {});`, {
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
                    "type": "CallExpression",
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
                    "arguments": [{
                        "type": "ArrowFunctionExpression",
                        "start": 4,
                        "end": 12,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
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
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 10,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
                                }
                            },
                            "body": []
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse basic', () => {
        expect(parseScript(`() => "test";`, {
            ranges: true,
            locations: true,
            raw: true
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
            "body": [{
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
                    "async": false,
                    "params": [],
                    "body": {
                        "type": "Literal",
                        "start": 6,
                        "end": 12,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 12
                            }
                        },
                        "value": "test",
                        "raw": "\"test\""
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse block body not object', () => {
        expect(parseScript(`e => { label: 42 };`, {
            ranges: true,
            locations: true,
            raw: true
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
            "body": [{
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
                    "expression": false,
                    "async": false,
                    "params": [{
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
                        "name": "e"
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "start": 5,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 5
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        },
                        "body": [{
                            "type": "LabeledStatement",
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
                            "body": {
                                "type": "ExpressionStatement",
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
                                "expression": {
                                    "type": "Literal",
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
                                    "value": 42,
                                    "raw": "42"
                                }
                            },
                            "label": {
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
                                "name": "label"
                            }
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse block body', () => {
        expect(parseScript(`e => { 42; };`, {
            ranges: true,
            locations: true,
            raw: true
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
            "body": [{
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
                    "params": [{
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
                        "name": "e"
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "start": 5,
                        "end": 12,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 5
                            },
                            "end": {
                                "line": 1,
                                "column": 12
                            }
                        },
                        "body": [{
                            "type": "ExpressionStatement",
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
                            "expression": {
                                "type": "Literal",
                                "start": 7,
                                "end": 9,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 7
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 9
                                    }
                                },
                                "value": 42,
                                "raw": "42"
                            }
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse no auto return', () => {
        expect(parseScript(`(a, b) => { 42; };`, {
            ranges: true,
            locations: true,
            raw: true
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
            "body": [{
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
                    "expression": false,
                    "async": false,
                    "params": [{
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
                            "name": "a"
                        },
                        {
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
                            "name": "b"
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "start": 10,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 10
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        },
                        "body": [{
                            "type": "ExpressionStatement",
                            "start": 12,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 12
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            },
                            "expression": {
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
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse arguments (sloppy)', () => {
        expect(parseScript(`arguments => 42;`, {
            ranges: true,
            locations: true,
            raw: true
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
            "body": [{
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
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [{
                        "type": "Identifier",
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
                        "name": "arguments"
                    }],
                    "body": {
                        "type": "Literal",
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
                        "value": 42,
                        "raw": "42"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse octal (sloppy)', () => {
        expect(parseScript(`(a) => 00;`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 10,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 10
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 10,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 10
                    }
                },
                "expression": {
                    "type": "ArrowFunctionExpression",
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
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [{
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
                        "name": "a"
                    }],
                    "body": {
                        "type": "Literal",
                        "start": 7,
                        "end": 9,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        },
                        "value": 0,
                        "raw": "00"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should return arrow function', () => {
        expect(parseScript(`x => y => 42;`, {
            ranges: true,
            locations: true,
            raw: true
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
            "body": [{
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
                    "async": false,
                    "params": [{
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
                        "name": "x"
                    }],
                    "body": {
                        "type": "ArrowFunctionExpression",
                        "start": 5,
                        "end": 12,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 5
                            },
                            "end": {
                                "line": 1,
                                "column": 12
                            }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
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
                            "name": "y"
                        }],
                        "body": {
                            "type": "Literal",
                            "start": 10,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
                                }
                            },
                            "value": 42,
                            "raw": "42"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse single param parens', () => {
        expect(parseScript(`(e) => "test";`, {
            ranges: true,
            locations: true,
            raw: true
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
                    "async": false,
                    "params": [{
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
                        "name": "e"
                    }],
                    "body": {
                        "type": "Literal",
                        "start": 7,
                        "end": 13,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        },
                        "value": "test",
                        "raw": "\"test\""
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse single param return identifier', () => {
        expect(parseScript(`(sun) => earth;`, {
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
            "body": [{
                "type": "ExpressionStatement",
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
                    "async": false,
                    "params": [{
                        "type": "Identifier",
                        "start": 1,
                        "end": 4,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 4
                            }
                        },
                        "name": "sun"
                    }],
                    "body": {
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
                        "name": "earth"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse single param', () => {
        expect(parseScript(`e => "test";`, {
            ranges: true,
            locations: true,
            raw: true
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
                        "name": "e"
                    }],
                    "body": {
                        "type": "Literal",
                        "start": 5,
                        "end": 11,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 5
                            },
                            "end": {
                                "line": 1,
                                "column": 11
                            }
                        },
                        "value": "test",
                        "raw": "\"test\""
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse param with params', () => {
        expect(parseScript(`foo((x, y) => {});`, {
            ranges: true,
            locations: true,
            raw: true
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
            "body": [{
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
                    "arguments": [{
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
                        "params": [{
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
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse default param', () => {
      expect(parseScript(`(a, b=(c)=>{}) => {}`, {
          ranges: true,
          locations: true,
          raw: true
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
                  "name": "a"
                },
                {
                  "type": "AssignmentPattern",
                  "start": 4,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "left": {
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
                    "name": "b"
                  },
                  "right": {
                    "type": "ArrowFunctionExpression",
                    "start": 6,
                    "end": 13,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 13
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
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
                        "name": "c"
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 11,
                      "end": 13,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 11
                        },
                        "end": {
                          "line": 1,
                          "column": 13
                        }
                      },
                      "body": []
                    }
                  }
                }
              ],
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
        ],
        "sourceType": "script"
      });
    });

    it('should parse eval multi ( sloppy )', () => {
      expect(parseScript(`(eval, a = 10) => 42;`, {
          ranges: true,
          locations: true,
          raw: true
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
            "type": "ExpressionStatement",
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
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 1,
                  "end": 5,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "name": "eval"
                },
                {
                  "type": "AssignmentPattern",
                  "start": 7,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 7
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "left": {
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
                  "right": {
                    "type": "Literal",
                    "start": 11,
                    "end": 13,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 11
                      },
                      "end": {
                        "line": 1,
                        "column": 13
                      }
                    },
                    "value": 10,
                    "raw": "10"
                  }
                }
              ],
              "body": {
                "type": "Literal",
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
                "value": 42,
                "raw": "42"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse default param', () => {
      expect(parseScript(`(x=1) => x * x;`, {
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
            "type": "ExpressionStatement",
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
              "async": false,
              "params": [
                {
                  "type": "AssignmentPattern",
                  "start": 1,
                  "end": 4,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 4
                    }
                  },
                  "left": {
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
                  },
                  "right": {
                    "type": "Literal",
                    "start": 3,
                    "end": 4,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 3
                      },
                      "end": {
                        "line": 1,
                        "column": 4
                      }
                    },
                    "value": 1,
                    "raw": "1"
                  }
                }
              ],
              "body": {
                "type": "BinaryExpression",
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
                "left": {
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
                  "name": "x"
                },
                "operator": "*",
                "right": {
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
                }
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse local eval', () => {
      expect(parseScript(`(eval = 10) => 42;`, {
          ranges: true,
          locations: true,
          raw: true
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
              "async": false,
              "params": [
                {
                  "type": "AssignmentPattern",
                  "start": 1,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "left": {
                    "type": "Identifier",
                    "start": 1,
                    "end": 5,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 5
                      }
                    },
                    "name": "eval"
                  },
                  "right": {
                    "type": "Literal",
                    "start": 8,
                    "end": 10,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 10
                      }
                    },
                    "value": 10,
                    "raw": "10"
                  }
                }
              ],
              "body": {
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
                "value": 42,
                "raw": "42"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse arrow param array', () => {
      expect(parseScript(`([y]) => x;`, {
          ranges: true,
          locations: true,
          raw: true
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
              "type": "ArrowFunctionExpression",
              "start": 0,
              "end": 10,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 10
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "ArrayPattern",
                  "start": 1,
                  "end": 4,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 4
                    }
                  },
                  "elements": [
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
                      "name": "y"
                    }
                  ]
                }
              ],
              "body": {
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
                "name": "x"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse param arrow param nested array', () => {
      expect(parseScript(`([y, [x]]) => x;`, {
          ranges: true,
          locations: true,
          raw: true
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
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "ArrayPattern",
                  "start": 1,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "elements": [
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
                      "name": "y"
                    },
                    {
                      "type": "ArrayPattern",
                      "start": 5,
                      "end": 8,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 5
                        },
                        "end": {
                          "line": 1,
                          "column": 8
                        }
                      },
                      "elements": [
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
                      ]
                    }
                  ]
                }
              ],
              "body": {
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
                "name": "x"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse arrow param nested object named', () => {
      expect(parseScript(`({foo: y, a:{bar: x}}) => x;`, {
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
                  "type": "ObjectPattern",
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
                      "start": 2,
                      "end": 8,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 2
                        },
                        "end": {
                          "line": 1,
                          "column": 8
                        }
                      },
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 5,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 5
                          }
                        },
                        "name": "foo"
                      },
                      "value": {
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
                      },
                      "kind": "init"
                    },
                    {
                      "type": "Property",
                      "start": 10,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 20
                        }
                      },
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
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
                      },
                      "value": {
                        "type": "ObjectPattern",
                        "start": 12,
                        "end": 20,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 12
                          },
                          "end": {
                            "line": 1,
                            "column": 20
                          }
                        },
                        "properties": [
                          {
                            "type": "Property",
                            "start": 13,
                            "end": 19,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 13
                              },
                              "end": {
                                "line": 1,
                                "column": 19
                              }
                            },
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
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
                              "name": "bar"
                            },
                            "value": {
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
                            "kind": "init"
                          }
                        ]
                      },
                      "kind": "init"
                    }
                  ]
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
                "name": "x"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse arrow param object', () => {
      expect(parseScript(`({y}) => x;`, {
          ranges: true,
          locations: true,
          raw: true
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
              "type": "ArrowFunctionExpression",
              "start": 0,
              "end": 10,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 10
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "ObjectPattern",
                  "start": 1,
                  "end": 4,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 4
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
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
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
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
                        "name": "y"
                      },
                      "kind": "init",
                      "value": {
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
                        "name": "y"
                      }
                    }
                  ]
                }
              ],
              "body": {
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
                "name": "x"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse param defaults array', () => {
      expect(parseScript(`([x = 10]) => x`, {
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
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "ArrowFunctionExpression",
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
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "ArrayPattern",
                  "start": 1,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "elements": [
                    {
                      "type": "AssignmentPattern",
                      "start": 2,
                      "end": 8,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 2
                        },
                        "end": {
                          "line": 1,
                          "column": 8
                        }
                      },
                      "left": {
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
                      "right": {
                        "type": "Literal",
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
                        "value": 10,
                        "raw": "10"
                      }
                    }
                  ]
                }
              ],
              "body": {
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
                "name": "x"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse param default objects nested', () => {
      expect(parseScript(`({x = 10, y: { z = 10 }}) => [x, z]`, {
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
            "line": 1,
            "column": 35
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "ArrowFunctionExpression",
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
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "ObjectPattern",
                  "start": 1,
                  "end": 24,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 24
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 8,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 2
                        },
                        "end": {
                          "line": 1,
                          "column": 8
                        }
                      },
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
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
                      "kind": "init",
                      "value": {
                        "type": "AssignmentPattern",
                        "start": 2,
                        "end": 8,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 8
                          }
                        },
                        "left": {
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
                        "right": {
                          "type": "Literal",
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
                          "value": 10,
                          "raw": "10"
                        }
                      }
                    },
                    {
                      "type": "Property",
                      "start": 10,
                      "end": 23,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 23
                        }
                      },
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
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
                      },
                      "value": {
                        "type": "ObjectPattern",
                        "start": 13,
                        "end": 23,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 13
                          },
                          "end": {
                            "line": 1,
                            "column": 23
                          }
                        },
                        "properties": [
                          {
                            "type": "Property",
                            "start": 15,
                            "end": 21,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 15
                              },
                              "end": {
                                "line": 1,
                                "column": 21
                              }
                            },
                            "method": false,
                            "shorthand": true,
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
                              "name": "z"
                            },
                            "kind": "init",
                            "value": {
                              "type": "AssignmentPattern",
                              "start": 15,
                              "end": 21,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 15
                                },
                                "end": {
                                  "line": 1,
                                  "column": 21
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
                                "name": "z"
                              },
                              "right": {
                                "type": "Literal",
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
                                "value": 10,
                                "raw": "10"
                              }
                            }
                          }
                        ]
                      },
                      "kind": "init"
                    }
                  ]
                }
              ],
              "body": {
                "type": "ArrayExpression",
                "start": 29,
                "end": 35,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 29
                  },
                  "end": {
                    "line": 1,
                    "column": 35
                  }
                },
                "elements": [
                  {
                    "type": "Identifier",
                    "start": 30,
                    "end": 31,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 30
                      },
                      "end": {
                        "line": 1,
                        "column": 31
                      }
                    },
                    "name": "x"
                  },
                  {
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
                    "name": "z"
                  }
                ]
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse param default object', () => {
      expect(parseScript(`({x = 10}) => x`, {
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
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "ArrowFunctionExpression",
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
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "ObjectPattern",
                  "start": 1,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 8,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 2
                        },
                        "end": {
                          "line": 1,
                          "column": 8
                        }
                      },
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
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
                      "kind": "init",
                      "value": {
                        "type": "AssignmentPattern",
                        "start": 2,
                        "end": 8,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 8
                          }
                        },
                        "left": {
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
                        "right": {
                          "type": "Literal",
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
                          "value": 10,
                          "raw": "10"
                        }
                      }
                    }
                  ]
                }
              ],
              "body": {
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
                "name": "x"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });
});