import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Postfix', () => {

    it('should parse "x++"', () => {
        expect(parseScript('x++', {
            locations: true,
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
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
            "body": [
              {
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "UpdateExpression",
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
                  "operator": "++",
                  "prefix": false,
                  "argument": {
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
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x--"', () => {
        expect(parseScript('x--', {
            locations: true,
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
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
            "body": [
              {
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "UpdateExpression",
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
                  "operator": "--",
                  "prefix": false,
                  "argument": {
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
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "eval++"', () => {
        expect(parseScript('eval++')).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UpdateExpression",
                        "operator": "++",
                        "argument": {
                            "type": "Identifier",
                            "name": "eval"
                        },
                        "prefix": false
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "eval--"', () => {
        expect(parseScript('eval--')).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UpdateExpression",
                        "operator": "--",
                        "argument": {
                            "type": "Identifier",
                            "name": "eval"
                        },
                        "prefix": false
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "arguments++"', () => {
        expect(parseScript('arguments++')).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UpdateExpression",
                        "operator": "++",
                        "argument": {
                            "type": "Identifier",
                            "name": "arguments"
                        },
                        "prefix": false
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "arguments--"', () => {
        expect(parseScript('arguments--')).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UpdateExpression",
                        "operator": "--",
                        "argument": {
                            "type": "Identifier",
                            "name": "arguments"
                        },
                        "prefix": false
                    }
                }
            ],
            "sourceType": "script"
        });
    });
});
