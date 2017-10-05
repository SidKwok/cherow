import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Next - Import meta', () => {

    it('should fail if "ariya" are used as property name', () => {
        expect(() => {
            parseScript('import.ariya', { next: true });
        }).to.throw();
    });

    it('should parse import meta with one dot and no assignment', () => {
        expect(parseScript(`import.meta;`, {
            ranges: true,
            locations: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "meta": {
                            "type": "Identifier",
                            "name": "import",
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
                        "type": "MetaProperty",
                        "property": {
                            "type": "Identifier",
                            "name": "meta",
                            "start": 7,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        },
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
                        }
                    },
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
    });

    it('should parse import meta with two dots and no assignments', () => {
        expect(parseScript(`import.meta.url;`, {
            ranges: true,
            locations: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "MemberExpression",
                        "object": {
                            "meta": {
                                "type": "Identifier",
                                "name": "import",
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
                            "type": "MetaProperty",
                            "property": {
                                "type": "Identifier",
                                "name": "meta",
                                "start": 7,
                                "end": 11,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 7
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 11
                                    }
                                }
                            },
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
                            }
                        },
                        "computed": false,
                        "property": {
                            "type": "Identifier",
                            "name": "url",
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
                            }
                        },
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
                        }
                    },
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
    });

    it('should parse import meta with two dots and boolean assignment', () => {
        expect(parseScript(`import.meta.couldBeMutable = true;`, {
            ranges: true,
            locations: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "MemberExpression",
                            "object": {
                                "meta": {
                                    "type": "Identifier",
                                    "name": "import",
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
                                "type": "MetaProperty",
                                "property": {
                                    "type": "Identifier",
                                    "name": "meta",
                                    "start": 7,
                                    "end": 11,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 7
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 11
                                        }
                                    }
                                },
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
                                }
                            },
                            "computed": false,
                            "property": {
                                "type": "Identifier",
                                "name": "couldBeMutable",
                                "start": 12,
                                "end": 26,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 26
                                    }
                                }
                            },
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
                            }
                        },
                        "operator": "=",
                        "right": {
                            "type": "Literal",
                            "value": true,
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
                            }
                        },
                        "start": 0,
                        "end": 33,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 33
                            }
                        }
                    },
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
    });
});