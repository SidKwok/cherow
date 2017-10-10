
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
              "body": [{
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
              }],
              "sourceType": "script"
          });
      });
  
      it.skip('should parse object Spread operator following other properties"', () => {
          expect(parseScript('let o = {c: 3, d: 4};', {
              ranges: true,
              locations: true,
              next: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "VariableDeclaration",
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "init": {
                          "type": "ObjectExpression",
                          "properties": [{
                                  "type": "Property",
                                  "computed": false,
                                  "key": {
                                      "type": "Identifier",
                                      "name": "c",
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
                                      }
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": false,
                                  "value": {
                                      "type": "Literal",
                                      "value": 3,
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
                                      }
                                  },
                                  "start": 9,
                                  "end": 13,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 9
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 13
                                      }
                                  }
                              },
                              {
                                  "type": "Property",
                                  "computed": false,
                                  "key": {
                                      "type": "Identifier",
                                      "name": "d",
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
                                      }
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": false,
                                  "value": {
                                      "type": "Literal",
                                      "value": 4,
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
                                      }
                                  },
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
                                  }
                              }
                          ],
                          "start": 8,
                          "end": 20,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 8
                              },
                              "end": {
                                  "line": 1,
                                  "column": 20
                              }
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "name": "o",
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
                          }
                      },
                      "start": 4,
                      "end": 20,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 1,
                              "column": 20
                          }
                      }
                  }],
                  "kind": "let",
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
                  }
              }],
              "sourceType": "script",
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
              }
          });
      });
  
      it.skip('should parse spread operator applied to AssignmentExpression as only element  "', () => {
          expect(parseScript('var source = [2, 3, 4];', {
              ranges: true,
              locations: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 23,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 23
                  }
              },
              "body": [{
                  "type": "VariableDeclaration",
                  "start": 0,
                  "end": 23,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 23
                      }
                  },
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "start": 4,
                      "end": 22,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 1,
                              "column": 22
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 10,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 4
                              },
                              "end": {
                                  "line": 1,
                                  "column": 10
                              }
                          },
                          "name": "source"
                      },
                      "init": {
                          "type": "ArrayExpression",
                          "start": 13,
                          "end": 22,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 13
                              },
                              "end": {
                                  "line": 1,
                                  "column": 22
                              }
                          },
                          "elements": [{
                                  "type": "Literal",
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
                                  "value": 2,
                                  "raw": "2"
                              },
                              {
                                  "type": "Literal",
                                  "start": 17,
                                  "end": 18,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 17
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 18
                                      }
                                  },
                                  "value": 3,
                                  "raw": "3"
                              },
                              {
                                  "type": "Literal",
                                  "start": 20,
                                  "end": 21,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 20
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 21
                                      }
                                  },
                                  "value": 4,
                                  "raw": "4"
                              }
                          ]
                      }
                  }],
                  "kind": "var"
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse simple array with ellison"', () => {
          expect(parseScript(' [,,,,,]', {
              ranges: true,
              locations: true
          })).to.eql({
              "type": "Program",
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
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 1,
                  "end": 8,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 1
                      },
                      "end": {
                          "line": 1,
                          "column": 8
                      }
                  },
                  "expression": {
                      "type": "ArrayExpression",
                      "start": 1,
                      "end": 8,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 1
                          },
                          "end": {
                              "line": 1,
                              "column": 8
                          }
                      },
                      "elements": [
                          null,
                          null,
                          null,
                          null,
                          null
                      ]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse simple array with assignment expression"', () => {
          expect(parseScript('[1,2,3,4,5]', {
              ranges: true
          })).to.eql({
              "body": [{
                  "end": 11,
                  "expression": {
                      "elements": [{
                              "end": 2,
                              "start": 1,
                              "type": "Literal",
                              "value": 1
                          },
                          {
                              "end": 4,
                              "start": 3,
                              "type": "Literal",
                              "value": 2
                          },
                          {
                              "end": 6,
                              "start": 5,
                              "type": "Literal",
                              "value": 3
                          },
                          {
                              "end": 8,
                              "start": 7,
                              "type": "Literal",
                              "value": 4
                          },
                          {
                              "end": 10,
                              "start": 9,
                              "type": "Literal",
                              "value": 5
                          }
                      ],
                      "end": 11,
                      "start": 0,
                      "type": "ArrayExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
              }],
              "end": 11,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse simple array with ellison and assignment expression"', () => {
          expect(parseScript('[,,,1,2]', {
              ranges: true,
              raw: true
          })).to.eql({
              "body": [{
                  "end": 8,
                  "expression": {
                      "elements": [
                          null,
                          null,
                          null,
                          {
                              "end": 5,
                              "raw": "1",
                              "start": 4,
                              "type": "Literal",
                              "value": 1
                          },
                          {
                              "end": 7,
                              "raw": "2",
                              "start": 6,
                              "type": "Literal",
                              "value": 2
                          }
                      ],
                      "end": 8,
                      "start": 0,
                      "type": "ArrayExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
              }],
              "end": 8,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse simple array with assignment expression and ellison', () => {
          expect(parseScript('[4,5,,,,]', {
              ranges: true,
              raw: true
          })).to.eql({
              "body": [{
                  "end": 9,
                  "expression": {
                      "elements": [{
                              "end": 2,
                              "raw": "4",
                              "start": 1,
                              "type": "Literal",
                              "value": 4
                          },
                          {
                              "end": 4,
                              "raw": "5",
                              "start": 3,
                              "type": "Literal",
                              "value": 5
                          },
                          null,
                          null,
                          null,
                      ],
                      "end": 9,
                      "start": 0,
                      "type": "ArrayExpression"
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
  
      it('should parse simple array with ellison, assignment expression and ellison', () => {
          expect(parseScript('[,,3,,,]', {
              ranges: true,
              raw: true
          })).to.eql({
              "body": [{
                  "end": 8,
                  "expression": {
                      "elements": [
                          null,
                          null,
                          {
                              "end": 4,
                              "raw": "3",
                              "start": 3,
                              "type": "Literal",
                              "value": 3
                          },
                          null,
                          null,
                      ],
                      "end": 8,
                      "start": 0,
                      "type": "ArrayExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
              }],
              "end": 8,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse simple array with AssignmentExpression, Ellison, AssignmentExpression', () => {
          expect(parseScript('[1,2,,4,5]', {
              ranges: true,
              raw: true
          })).to.eql({
              "body": [{
                  "end": 10,
                  "expression": {
                      "elements": [{
                              "end": 2,
                              "raw": "1",
                              "start": 1,
                              "type": "Literal",
                              "value": 1,
                          },
                          {
                              "end": 4,
                              "raw": "2",
                              "start": 3,
                              "type": "Literal",
                              "value": 2
                          },
                          null,
                          {
                              "end": 7,
                              "raw": "4",
                              "start": 6,
                              "type": "Literal",
                              "value": 4
                          },
                          {
                              "end": 9,
                              "raw": "5",
                              "start": 8,
                              "type": "Literal",
                              "value": 5
                          }
                      ],
                      "end": 10,
                      "start": 0,
                      "type": "ArrayExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
              }],
              "end": 10,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse multi dimensional array', () => {
          expect(parseScript('[[1,2], [3], []]', {
              ranges: true,
              raw: true
          })).to.eql({
              "body": [{
                  "end": 16,
                  "expression": {
                      "elements": [{
                              "elements": [{
                                      "end": 3,
                                      "raw": "1",
                                      "start": 2,
                                      "type": "Literal",
                                      "value": 1
                                  },
                                  {
                                      "end": 5,
                                      "raw": "2",
                                      "start": 4,
                                      "type": "Literal",
                                      "value": 2
                                  }
                              ],
                              "end": 6,
                              "start": 1,
                              "type": "ArrayExpression"
                          },
                          {
                              "elements": [{
                                  "end": 10,
                                  "raw": "3",
                                  "start": 9,
                                  "type": "Literal",
                                  "value": 3
                              }],
                              "end": 11,
                              "start": 8,
                              "type": "ArrayExpression"
                          },
                          {
                              "elements": [],
                              "end": 15,
                              "start": 13,
                              "type": "ArrayExpression"
                          }
                      ],
                      "end": 16,
                      "start": 0,
                      "type": "ArrayExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
              }],
              "end": 16,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
  
      it('should parse spread multi empty', () => {
          expect(parseScript('[1, 2, 3, ...[]]', {
              ranges: true,
              raw: true
          })).to.eql({
              "body": [{
                  "end": 16,
                  "expression": {
                      "elements": [{
                              "end": 2,
                              "raw": "1",
                              "start": 1,
                              "type": "Literal",
                              "value": 1,
                          },
                          {
                              "end": 5,
                              "raw": "2",
                              "start": 4,
                              "type": "Literal",
                              "value": 2
                          },
                          {
                              "end": 8,
                              "raw": "3",
                              "start": 7,
                              "type": "Literal",
                              "value": 3
                          },
                          {
                              "argument": {
                                  "elements": [],
                                  "end": 15,
                                  "start": 13,
                                  "type": "ArrayExpression"
                              },
                              "end": 15,
                              "start": 10,
                              "type": "SpreadElement"
                          }
                      ],
                      "end": 16,
                      "start": 0,
                      "type": "ArrayExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
              }],
              "end": 16,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it.skip('should parse spread object null', () => {
          expect(parseScript('[{...null}]', {
              ranges: true,
              next: true
          })).to.eql({
              "body": [{
                  "end": 11,
                  "expression": {
                      "elements": [{
                          "end": 10,
                          "properties": [{
                              "argument": {
                                  "end": 9,
                                  "start": 5,
                                  "type": "Literal",
                                  "value": null,
                              },
                              "end": 9,
                              "start": 2,
                              "type": "SpreadElement"
                          }],
                          "start": 1,
                          "type": "ObjectExpression"
                      }],
                      "end": 11,
                      "start": 0,
                      "type": "ArrayExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
              }],
              "end": 11,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it.skip('should parse spread object undefined', () => {
          expect(parseScript('[{...undefined}]', {
              ranges: true,
              next: true
          })).to.eql({
              "body": [{
                  "end": 16,
                  "expression": {
                      "elements": [{
                          "end": 15,
                          "properties": [{
                              "argument": {
                                  "end": 14,
                                  "name": "undefined",
                                  "start": 5,
                                  "type": "Identifier"
                              },
                              "end": 14,
                              "start": 2,
                              "type": "SpreadElement"
                          }],
                          "start": 1,
                          "type": "ObjectExpression"
                      }],
                      "end": 16,
                      "start": 0,
                      "type": "ArrayExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
              }],
              "end": 16,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse "t[o][1][e]"', () => {
          expect(parseScript(`t[o][1][e]`, {
              raw: true,
              ranges: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 10,
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 10,
                  "expression": {
                      "type": "MemberExpression",
                      "start": 0,
                      "end": 10,
                      "object": {
                          "type": "MemberExpression",
                          "start": 0,
                          "end": 7,
                          "object": {
                              "type": "MemberExpression",
                              "start": 0,
                              "end": 4,
                              "object": {
                                  "type": "Identifier",
                                  "start": 0,
                                  "end": 1,
                                  "name": "t"
                              },
                              "property": {
                                  "type": "Identifier",
                                  "start": 2,
                                  "end": 3,
                                  "name": "o"
                              },
                              "computed": true
                          },
                          "property": {
                              "type": "Literal",
                              "start": 5,
                              "end": 6,
                              "value": 1,
                              "raw": "1"
                          },
                          "computed": true
                      },
                      "property": {
                          "type": "Identifier",
                          "start": 8,
                          "end": 9,
                          "name": "e"
                      },
                      "computed": true
                  }
              }],
              "sourceType": "script"
          });
      });
  
  
      it('should parse "[,,1,,,2,3,,]"', () => {
          expect(parseScript(`[,,1,,,2,3,,]`, {
              raw: true,
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
                      "type": "ArrayExpression",
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
                      "elements": [
                          null,
                          null,
                          {
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
                          },
                          null,
                          null,
                          {
                              "type": "Literal",
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
                              "value": 2,
                              "raw": "2"
                          },
                          {
                              "type": "Literal",
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
                              "value": 3,
                              "raw": "3"
                          },
                          null
                      ]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "[a, ...b=c]"', () => {
          expect(parseScript(`[a, ...b=c]`, {
              raw: true,
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
              "body": [{
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
                      "type": "ArrayExpression",
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
                      "elements": [{
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
                              "type": "SpreadElement",
                              "start": 4,
                              "end": 10,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 4
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 10
                                  }
                              },
                              "argument": {
                                  "type": "AssignmentExpression",
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
                                  "operator": "=",
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
                                      "name": "b"
                                  },
                                  "right": {
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
                                      "name": "c"
                                  }
                              }
                          }
                      ]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "([a, ...b=c])"', () => {
          expect(parseScript(`([a, ...b=c])`, {
              raw: true,
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
                      "type": "ArrayExpression",
                      "start": 1,
                      "end": 12,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 1
                          },
                          "end": {
                              "line": 1,
                              "column": 12
                          }
                      },
                      "elements": [{
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
                              "name": "a"
                          },
                          {
                              "type": "SpreadElement",
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
                              "argument": {
                                  "type": "AssignmentExpression",
                                  "start": 8,
                                  "end": 11,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 8
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 11
                                      }
                                  },
                                  "operator": "=",
                                  "left": {
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
                                      "name": "b"
                                  },
                                  "right": {
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
                                      "name": "c"
                                  }
                              }
                          }
                      ]
                  }
              }],
              "sourceType": "script"
          });
      });
  });