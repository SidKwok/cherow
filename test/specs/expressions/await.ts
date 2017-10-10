import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Await', () => {

    it('should fail on await expression outside of async function', () => {
        expect(() => {
            parseScript(`await a`);
        }).to.throw()
    });

    it('should fail on await without arguments', () => {
        expect(() => {
            parseScript(`async () => await`);
        }).to.throw();
    });

    it('should fail on await expression in default parameters', () => {
        expect(() => {
            parseScript(`async (a = await b) => {}`);
        }).to.throw()
    });

    it('should parse call async await', () => {
        expect(parseScript(`a = async(await);`, {
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
});