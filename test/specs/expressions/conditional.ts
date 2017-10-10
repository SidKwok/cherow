import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Conditional', () => {

    it('should fail if the second assignment expression include the `in` keyword in contexts', () => {
        expect(() => {
            parseScript(`for (true ? 0 : 0 in {}; false; ) ;`)
        }).to.throw('');
    });

    it('should fail if the expression logical OR expression sub-expression include the `in` keyword', () => {
        expect(() => {
            parseScript(`for ('' in {} ? 0 : 0; false; ) ;`)
        }).to.throw('');
    });

    it('should parse with booleans', () => {
        expect(parseScript('true ? false : true', {
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
                  "type": "ConditionalExpression",
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
                  "test": {
                    "type": "Literal",
                    "start": 0,
                    "end": 4,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 4
                      }
                    },
                    "value": true,
                    "raw": "true"
                  },
                  "consequent": {
                    "type": "Literal",
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
                    "value": false,
                    "raw": "false"
                  },
                  "alternate": {
                    "type": "Literal",
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
                    "value": true,
                    "raw": "true"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse with in keyword', () => {
        expect(parseScript('b ? c : d in e;', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 15,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 15,
                "expression": {
                    "type": "ConditionalExpression",
                    "start": 0,
                    "end": 14,
                    "test": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "b"
                    },
                    "consequent": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "c"
                    },
                    "alternate": {
                        "type": "BinaryExpression",
                        "start": 8,
                        "end": 14,
                        "left": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "name": "d"
                        },
                        "operator": "in",
                        "right": {
                            "type": "Identifier",
                            "start": 13,
                            "end": 14,
                            "name": "e"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse call', () => {
        expect(parseScript('false ? 0 : f(n - 1);', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 21,
                "expression": {
                    "alternate": {
                        "arguments": [{
                            "end": 19,
                            "left": {
                                "end": 15,
                                "name": "n",
                                "start": 14,
                                "type": "Identifier"
                            },
                            "operator": "-",
                            "right": {
                                "end": 19,
                                "start": 18,
                                "type": "Literal",
                                "value": 1
                            },
                            "start": 14,
                            "type": "BinaryExpression"
                        }],
                        "callee": {
                            "end": 13,
                            "name": "f",
                            "start": 12,
                            "type": "Identifier"
                        },
                        "end": 20,
                        "start": 12,
                        "type": "CallExpression"
                    },
                    "consequent": {
                        "end": 9,
                        "start": 8,
                        "type": "Literal",
                        "value": 0
                    },
                    "end": 20,
                    "start": 0,
                    "test": {
                        "end": 5,
                        "start": 0,
                        "type": "Literal",
                        "value": false,
                    },
                    "type": "ConditionalExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 21,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse boolean', () => {
        expect(parseScript('true ? false : true', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 19,
                "expression": {
                    "alternate": {
                        "end": 19,
                        "start": 15,
                        "type": "Literal",
                        "value": true
                    },
                    "consequent": {
                        "end": 12,
                        "start": 7,
                        "type": "Literal",
                        "value": false
                    },
                    "end": 19,
                    "start": 0,
                    "test": {
                        "end": 4,
                        "start": 0,
                        "type": "Literal",
                        "value": true
                    },
                    "type": "ConditionalExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 19,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse literals', () => {
        expect(parseScript('"1" ? "" : "1"', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 14,
                "expression": {
                    "alternate": {
                        "end": 14,
                        "start": 11,
                        "type": "Literal",
                        "value": "1"
                    },
                    "consequent": {
                        "end": 8,
                        "start": 6,
                        "type": "Literal",
                        "value": ""
                    },
                    "end": 14,
                    "start": 0,
                    "test": {
                        "end": 3,
                        "start": 0,
                        "type": "Literal",
                        "value": "1"
                    },
                    "type": "ConditionalExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 14,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse boolean - undefined"', () => {
        expect(parseScript('false ? true : undefined', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 24,
                "expression": {
                    "alternate": {
                        "end": 24,
                        "name": "undefined",
                        "start": 15,
                        "type": "Identifier"
                    },
                    "consequent": {
                        "end": 12,
                        "start": 8,
                        "type": "Literal",
                        "value": true
                    },
                    "end": 24,
                    "start": 0,
                    "test": {
                        "end": 5,
                        "start": 0,
                        "type": "Literal",
                        "value": false
                    },
                    "type": "ConditionalExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 24,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "a?b:c"', () => {
        expect(parseScript('a?b:c', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 5,
                "expression": {
                    "alternate": {
                        "end": 5,
                        "name": "c",
                        "start": 4,
                        "type": "Identifier"
                    },
                    "consequent": {
                        "end": 3,
                        "name": "b",
                        "start": 2,
                        "type": "Identifier"
                    },
                    "end": 5,
                    "start": 0,
                    "test": {
                        "end": 1,
                        "name": "a",
                        "start": 0,
                        "type": "Identifier"
                    },
                    "type": "ConditionalExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 5,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "y ? 1 : 2"', () => {
        expect(parseScript('y ? 1 : 2', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 9,
                "expression": {
                    "alternate": {
                        "end": 9,
                        "start": 8,
                        "type": "Literal",
                        "value": 2
                    },
                    "consequent": {
                        "end": 5,
                        "start": 4,
                        "type": "Literal",
                        "value": 1
                    },
                    "end": 9,
                    "start": 0,
                    "test": {
                        "end": 1,
                        "name": "y",
                        "start": 0,
                        "type": "Identifier"
                    },
                    "type": "ConditionalExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 9,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "x && y ? 1 : 2"', () => {
        expect(parseScript('x && y ? 1 : 2', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 14,
                "expression": {
                    "alternate": {
                        "end": 14,
                        "start": 13,
                        "type": "Literal",
                        "value": 2,
                    },
                    "consequent": {
                        "end": 10,
                        "start": 9,
                        "type": "Literal",
                        "value": 1
                    },
                    "end": 14,
                    "start": 0,
                    "test": {
                        "end": 6,
                        "left": {
                            "end": 1,
                            "name": "x",
                            "start": 0,
                            "type": "Identifier"
                        },
                        "operator": "&&",
                        "right": {
                            "end": 6,
                            "name": "y",
                            "start": 5,
                            "type": "Identifier"
                        },
                        "start": 0,
                        "type": "LogicalExpression"
                    },
                    "type": "ConditionalExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 14,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "x = (0) ? 1 : 2"', () => {
        expect(parseScript('x = (0) ? 1 : 2', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 15,
                "expression": {
                    "end": 15,
                    "left": {
                        "end": 1,
                        "name": "x",
                        "start": 0,
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "alternate": {
                            "end": 15,
                            "start": 14,
                            "type": "Literal",
                            "value": 2
                        },
                        "consequent": {
                            "end": 11,
                            "start": 10,
                            "type": "Literal",
                            "value": 1
                        },
                        "end": 15,
                        "start": 4,
                        "test": {
                            "end": 6,
                            "start": 5,
                            "type": "Literal",
                            "value": 0
                        },
                        "type": "ConditionalExpression"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 15,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });
});