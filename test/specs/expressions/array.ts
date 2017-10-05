
import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Array', () => {

       it('should parse simple array"', () => {
            expect(parseScript('[]', {
                ranges: true,
                locations: true
            })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 2,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 2
                }
              },
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 2,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 2
                    }
                  },
                  "expression": {
                    "type": "ArrayExpression",
                    "start": 0,
                    "end": 2,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 2
                      }
                    },
                    "elements": []
                  }
                }
              ],
              "sourceType": "script"
            });
        });
    });