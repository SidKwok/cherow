import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe.skip('Expressions - Arrow function', () => {
  
      it('should fail on cover no duplicates  (strict)', () => {
          expect(() => {
              parseScript('var af = (x, x) => 1;');
          }).to.throw('');
      });
  
      it('should fail on cover no eval  (strict)', () => {
          expect(() => {
              parseScript('"use strict"; var af = (eval) => 1;');
            }).to.not.throw();
      });
  
      it('should fail on rest parameter with initializer (arrow function expression)', () => {
          expect(() => {
              parseScript('0, (...x = []) => {}');
          }).to.throw('');
      });
  
      it('should fail on cover no yield (strict)', () => {
          expect(() => {
              parseScript('"use strict"; var af = (yield) => 1;');
          }).to.not.throw('');
      });
  
      it('should fail on duplicate params', () => {
          expect(() => {
              parseScript('(a, a) => 42;');
          }).to.throw('');
      });
  
      it('should fail on invalid use of reserved word', () => {
          expect(() => {
              parseScript('var af = switch => 1;');
            }).to.throw('');
      });
  
      it('should fail if no parenthesized arrow function body', () => {
          expect(() => {
              parseScript('async () =>');
          }).to.throw('');
      });
  
      it('should fail if no un-parenthesized arrow function body', () => {
          expect(() => {
              parseScript('async a =>');
          }).to.throw('');
      });
  
      it('should fail if use of future reserved word', () => {
          expect(() => {
              parseScript('"use strict"; var af = enum => 1;');
            }).to.throw();
      });
  
      it('should fail if use of future reserved word', () => {
          expect(() => {
              parseScript('"use strict"; var af = (arguments) => 1;');
            }).to.not.throw();
      });
  
      it('should fail on arrow parameter with duplicates', () => {
          expect(() => {
              parseScript('var af = (x, [x]) => 1;');
          }).to.throw('');
      });
  
      it('should fail on arraow parameters with duplicates', () => {
          expect(() => {
              parseScript('var af = (x, {x}) => 1;');
          }).to.throw('');
      });
  
      it('should fail on cover no duplicates', () => {
          expect(() => {
              parseScript('var af = ([x], ...x) => 1;) => 1;');
          }).to.throw('');
      });
  
      it('should fail on "a ? (b): c => (d): e => f"', () => {
          expect(() => {
              parseScript('a ? (b): c => (d): e => f');
          }).to.throw('');
      });
  
      it('should fail on "a ? (b): c => (d): e => f"', () => {
          expect(() => {
              parseScript('var f = (a = 0) => { "use strict"; };');
          }).to.not.throw('');
      });
  
      it('should fail on no duplicate binding object - #1', () => {
          expect(() => {
              parseScript('var af = (x, {y: x}) => 1;');
          }).to.throw('');
      });
  
      it('should fail on no duplicate binding object - #3', () => {
          expect(() => {
              parseScript('var af = ({x}, {y: x}) => 1;');
          }).to.throw('');
      });
  
      it('should fail on no duplicate binding object - #5', () => {
          expect(() => {
              parseScript('var af = ({y: x}, ...x) => 1;');
          }).to.throw('');
      });
  
      it('should fail on "? ((b): c => d) : (e => f)"', () => {
          expect(() => {
              parseScript('? ((b): c => d) : (e => f)');
          }).to.throw('');
      });
  
      it('should fail on invalid parenless parameters expression body', () => {
          expect(() => {
              parseScript(`var af = x
          => x;`);
          }).to.throw();
      });
  
      it('should fail on invalid ASI restriction', () => {
          expect(() => {
              parseScript(`var af = ()
        => {};`);
          }).to.throw();
      });
  
      it('should fail if use of future reserved word in strict mode', () => {
          expect(() => {
              parseScript('"use strict"; var af = package => 1;');
            }).to.throw();
      });
  
      it('should fail on bindingidentifier no eval', () => {
          expect(() => {
              parseScript('"use strict"; var af = eval => 1;');
            }).to.throw();
      });
  
      it('should fail on bindingidentifier no arguments', () => {
          expect(() => {
              parseScript('"use strict"; var af = arguments => 1;');
            }).to.throw();
      });
      it('should fail on parameter named "yield" (strict)', () => {
          expect(() => {
              parseScript('"use strict"; var af = yield => 1;');
          }).to.throw('');
      });
      it('should fail if includes ...rest"', () => {
          expect(() => {
              parseScript('var af = ...x => x;');
          }).to.throw('');
      });
  
      it('should fail on no duplicates binding array', () => {
          expect(() => {
              parseScript('var af = ([x, x]) => 1;');
          }).to.throw('');
      });
  
      it('should fail if a function rest parameter is followed by a trailing comma', () => {
          expect(() => {
              parseScript('var af = (x, [x]) => 1;');
          }).to.throw('');
      });
  
      it('should fail if a FunctionRestParameter is followed by a trailing comma', () => {
          expect(() => {
              parseScript('var af = ({x}, ...x) => 1;');
          }).to.throw('');
      });
  
      it('should fail on error strict parameter eval', () => {
          expect(() => {
              parseScript('"use strict"; (eval, a) => 42;');
            }).to.not.throw();
      });
  
      it('should fail on error strict parameter arguments', () => {
          expect(() => {
              parseScript('"use strict"; (arguments, a) => 42;');
            }).to.not.throw();
      });
  
      it('should fail on asi restriction invalid parenless parameters', () => {
          expect(() => {
              parseScript(`var af = x
  => x;`);
          }).to.throw('');
      });
  
      it('should fail if a FunctionRestParameter is followed by a trailing comma', () => {
          expect(() => {
              parseScript('(...[ 5 ]) => {}');
          }).to.throw();
      });
  
      it('should fail if arrow parameters contain yield expressions', () => {
          expect(() => {
              parseScript('function *g() { (x = yield) => {} }\n');
          }).to.not.throw('');
      });
  
      it('should fail if Arrow parameters contain yield expressions', () => {
          expect(() => {
              parseScript('const foo = () => { console.log(new.target); };');
          }).to.not.throw('');
      });
  
      it('should fail on invalid unary operator after arrow body', () => {
          expect(() => {
              parseScript('(x) => {} + 2');
          }).to.not.throw();
      });
  
      it('should fail if FormalParameters also occurs in the LexicallyDeclaredNames of AsyncFunctionBody', () => {
          expect(() => {
              parseScript('(async function foo (bar) { let bar; });');
          }).to.throw('');
      });
  
      it('should fail arrow with inner paren', () => {
          expect(() => {
              parseScript(`function *g() { (x = yield) => {}; }`)
          }).to.not.throw('');
      })
  
      it('should fail arrow with inner paren', () => {
          expect(() => {
              parseScript(`"use strict"; function *g() { (x = yield) => {}; }`)
          }).to.not.throw('');
      })
  
      it('should fail arrow with inner paren', () => {
          expect(() => {
              parseScript(`var foo = ((foo)) => {};`)
          }).to.not.throw();
      })
  
      it('should fail on arrow with callee', () => {
          expect(() => {
              parseScript(`() => {}()`)
          }).to.not.throw('');
      })
  
      it('should fail on invalid arrow with ternary', () => {
          expect(() => {
              parseScript(`() => {} ? 1 : 2;`)
          }).to.not.throw('');
      })
  
  
      it('should fail on "[]=>0"', () => {
          expect(() => {
              parseScript(`[]=>0`)
          }).to.throw();
      })
  
      it('should fail on "(a)\n=> 0"', () => {
          expect(() => {
              parseScript(`(a)\n=> 0`)
          }).to.throw();
      })
  
      it('should fail on "((a)) => 1"', () => {
          expect(() => {
              parseScript(`((a)) => 1`)
          }).to.not.throw();
      })
  
      it('should fail on "((a),...a) => 1"', () => {
          expect(() => {
              parseScript(`((a),...a) => 1`)
          }).to.throw();
      })
  
      it('should fail on "(10, 20) => 0"', () => {
          expect(() => {
              parseScript(`(10, 20) => 0`)
          }).to.throw();
      })
  
      it('should fail on "() <= 0"', () => {
          expect(() => {
              parseScript(`() <= 0`)
          }).to.throw();
      })
  
      it('should fail on "a =>  let v = 0; }"', () => {
          expect(() => {
              parseScript(`a => let v = 0; }`)
          }).to.throw();
      })
  
      it('should fail on "(a,...a)/*\r\n*/ => 0"', () => {
          expect(() => {
              parseScript(`(a,...a)/*\r\n*/ => 0`)
          }).to.throw();
      })
  
      it('should fail on "(a,...a)/*\u2028*/ => 0"', () => {
          expect(() => {
              parseScript(`(a,...a)/*\u2028*/ => 0`)
          }).to.throw();
      })
  
      it('should fail on "(a,...a)/*\u2029*/ => 0"', () => {
          expect(() => {
              parseScript(`(a,...a)/*\u2029*/ => 0`)
          }).to.throw();
      })
  
      it('should fail on "(a,...a)/*\r*/ => 0"', () => {
          expect(() => {
              parseScript(`(a,...a)/*\r*/ => 0`)
          }).to.throw();
      })
  
      it('should fail on "(a,...a)/*\n*/ => d"', () => {
          expect(() => {
              parseScript(`(a,...a)/*\n*/ => d`)
          }).to.throw();
      })
  
      it('should fail on "(a,...a)\n"', () => {
          expect(() => {
              parseScript(`(a,...a)\n`)
          }).to.throw();
      })
  
      it('should fail on "(a,...a)/*\u2029*/ => 0', () => {
          expect(() => {
              parseScript(`(a,...a)/*\u2029*/ => 0`)
          }).to.throw();
      })
  
      it('should fail on non arrow param followed by arrow', () => {
          expect(() => {
              parseScript(`(...a, ...b) => 0`)
          }).to.throw();
      });
  
      it('should fail if FormalParameters contains eval in strict mode', () => {
          expect(() => {
              parseScript(`"use strict"; (eval) => 12`)
            }).to.not.throw();
      });
  
      it('should fail on use of await as reserved word within function generator function bondies', () => {
          expect(() => {
              parseScript(`async() => {
  var await;
  };`)
          }).to.throw();
      });
  
      it('([a.a]) => 42"', () => {
          expect(() => {
              parseScript(`([a.a]) => 42`)
          }).to.throw();
      });
  
      it('should fail on "(async function() { await: ; })"', () => {
          expect(() => {
              parseScript(`(async function() { await: ; })`)
          }).to.throw();
      });
  
      it('should fail on "async function() { await: ; }"', () => {
          expect(() => {
              parseScript(`async function() { await: ; }`)
          }).to.throw();
      });
  
      it('should fail on "console.log(typeof () => {});"', () => {
          expect(() => {
              parseScript(`console.log(typeof () => {});`);
          }).to.not.throw();
      });
  
      it('should fail on ""use strict"; eval => 1', () => {
          expect(() => {
              parseScript('"use strict"; eval => 1');
            }).to.throw();
      });
  
      it('should fail on "(([]) => { "use strict";})"', () => {
          expect(() => {
              parseScript('(([]) => { "use strict";})');
          }).to.not.throw();
      });
  
      it('should fail on "(a,...a)=>1"', () => {
          expect(() => {
              parseScript('(a,...a)=>1');
          }).to.throw();
      });
  
      it('should fail on ""use strict"; (a, a) => 1"', () => {
          expect(() => {
              parseScript('"use strict"; (a, a) => 1');
          }).to.throw();
      });
  
      it('should fail on "() => { let a; let a; }"', () => {
          expect(() => {
              parseScript('() => { let a; let a; }');
          }).to.throw();
      });
  
      it('should fail on "(package) => {"use strict"}"', () => {
          expect(() => {
              parseScript('(package) => {"use strict"}');
            }).to.not.throw();
      });
  
      it('should fail on "(a) => { let a; }"', () => {
          expect(() => {
              parseScript('(a) => { let a; }');
          }).to.throw();
      });
  
      it('should fail on ""use strict"; (arguments)=>1"', () => {
          expect(() => {
              parseScript('"use strict"; (arguments)=>1');
            }).to.not.throw();
      });
  
      it('should fail on ""use strict"; (arguments, a) => 1"', () => {
          expect(() => {
              parseScript('"use strict"; (arguments, a) => 1');
            }).to.not.throw();
      });
  
      it('should fail on "([a,[b],...b])=>1;"', () => {
          expect(() => {
              parseScript('([a,[b],...b])=>1;');
          }).to.throw();
      });
  
      it('should fail on invalid arrow function', () => {
          expect(() => {
              parseScript(`left = (aSize.width/2) - ()`)
          }).to.throw('');
      });
  
      it('should fail on numeric param', () => {
          expect(() => {
              parseScript(`(10, 20) => 0;`)
          }).to.throw('');
      });
  
      it('should fail on reverse arrow', () => {
          expect(() => {
              parseScript(`() <= 42;`)
          }).to.throw('');
      });
  
      it('should fail on strict octal', () => {
          expect(() => {
              parseScript(`"use strict"; (a) => 00;`)
          }).to.throw('');
      });
  
      it('should fail on strict param argument', () => {
          expect(() => {
              parseScript(`"use strict"; (arguments, a) => 42;`)
            }).to.not.throw();
      });
  
      it('should fail on strict param without paran and argument', () => {
          expect(() => {
              parseScript(`"use strict"; arguments => 42;`)
            }).to.throw();
      });
  
      it('should fail on parenthesized async in front of arrow function', () => {
          expect(() => {
              parseScript(`"use strict"; (x = yield) => {};`)
          }).to.not.throw();
      });
  
      it('should fail on parenthesized async in front of arrow function', () => {
          expect(() => {
              parseScript(`"use strict"; (1, 5, 6, x = yield, 2, 3) => {};`)
          }).to.throw('');
      });
  
  
      it('should parse arrow function destructed', () => {
          expect(parseScript(`async ({a = b}) => a;`, {
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
              "body": [{
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
                      "async": true,
                      "params": [{
                          "type": "ObjectPattern",
                          "start": 7,
                          "end": 14,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 7
                              },
                              "end": {
                                  "line": 1,
                                  "column": 14
                              }
                          },
                          "properties": [{
                              "type": "Property",
                              "start": 8,
                              "end": 13,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 13
                                  }
                              },
                              "method": false,
                              "shorthand": true,
                              "computed": false,
                              "key": {
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
                                  "name": "a"
                              },
                              "kind": "init",
                              "value": {
                                  "type": "AssignmentPattern",
                                  "start": 8,
                                  "end": 13,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 8
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 13
                                      }
                                  },
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
                                      "name": "a"
                                  },
                                  "right": {
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
                          }]
                      }],
                      "body": {
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
                          "name": "a"
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
  
      it('should parse arrow function destructed', () => {
          expect(parseScript(`(async function foo(a) { await a });`, {
              ranges: true,
              locations: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 36,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 36
                  }
              },
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 36,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 36
                      }
                  },
                  "expression": {
                      "type": "FunctionExpression",
                      "start": 1,
                      "end": 34,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 1
                          },
                          "end": {
                              "line": 1,
                              "column": 34
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "start": 16,
                          "end": 19,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 16
                              },
                              "end": {
                                  "line": 1,
                                  "column": 19
                              }
                          },
                          "name": "foo"
                      },
                      "generator": false,
                      "expression": false,
                      "async": true,
                      "params": [{
                          "type": "Identifier",
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
                          "name": "a"
                      }],
                      "body": {
                          "type": "BlockStatement",
                          "start": 23,
                          "end": 34,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 23
                              },
                              "end": {
                                  "line": 1,
                                  "column": 34
                              }
                          },
                          "body": [{
                              "type": "ExpressionStatement",
                              "start": 25,
                              "end": 32,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 25
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 32
                                  }
                              },
                              "expression": {
                                  "type": "AwaitExpression",
                                  "start": 25,
                                  "end": 32,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 25
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 32
                                      }
                                  },
                                  "argument": {
                                      "type": "Identifier",
                                      "start": 31,
                                      "end": 32,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 31
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 32
                                          }
                                      },
                                      "name": "a"
                                  }
                              }
                          }]
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse async await arrow expression', () => {
          expect(parseScript(`(async (a) => await a);`, {
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
                  "type": "ExpressionStatement",
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
                  "expression": {
                      "type": "ArrowFunctionExpression",
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
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": true,
                      "params": [{
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
                          "name": "a"
                      }],
                      "body": {
                          "type": "AwaitExpression",
                          "start": 14,
                          "end": 21,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 14
                              },
                              "end": {
                                  "line": 1,
                                  "column": 21
                              }
                          },
                          "argument": {
                              "type": "Identifier",
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
                              "name": "a"
                          }
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse await arrow param', () => {
          expect(parseScript(`async function foo(a = async () => await b) {};`, {
              ranges: true,
              locations: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 47,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 47
                  }
              },
              "body": [{
                      "type": "FunctionDeclaration",
                      "start": 0,
                      "end": 46,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 46
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "start": 15,
                          "end": 18,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 15
                              },
                              "end": {
                                  "line": 1,
                                  "column": 18
                              }
                          },
                          "name": "foo"
                      },
                      "generator": false,
                      "expression": false,
                      "async": true,
                      "params": [{
                          "type": "AssignmentPattern",
                          "start": 19,
                          "end": 42,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 19
                              },
                              "end": {
                                  "line": 1,
                                  "column": 42
                              }
                          },
                          "left": {
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
                              "name": "a"
                          },
                          "right": {
                              "type": "ArrowFunctionExpression",
                              "start": 23,
                              "end": 42,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 23
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 42
                                  }
                              },
                              "id": null,
                              "generator": false,
                              "expression": true,
                              "async": true,
                              "params": [],
                              "body": {
                                  "type": "AwaitExpression",
                                  "start": 35,
                                  "end": 42,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 35
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 42
                                      }
                                  },
                                  "argument": {
                                      "type": "Identifier",
                                      "start": 41,
                                      "end": 42,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 41
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 42
                                          }
                                      },
                                      "name": "b"
                                  }
                              }
                          }
                      }],
                      "body": {
                          "type": "BlockStatement",
                          "start": 44,
                          "end": 46,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 44
                              },
                              "end": {
                                  "line": 1,
                                  "column": 46
                              }
                          },
                          "body": []
                      }
                  },
                  {
                      "type": "EmptyStatement",
                      "start": 46,
                      "end": 47,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 46
                          },
                          "end": {
                              "line": 1,
                              "column": 47
                          }
                      }
                  }
              ],
              "sourceType": "script"
          });
      });
  
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
              "body": [{
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
                                  "params": [{
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
                                  }],
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
              }],
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
              "body": [{
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
                      "params": [{
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
              }],
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
                      }],
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
              }],
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
                      "expression": true,
                      "async": false,
                      "params": [{
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
                      }],
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
              }],
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
                      "params": [{
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
                              "name": "y"
                          }]
                      }],
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
              }],
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
                                  "elements": [{
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
                                  }]
                              }
                          ]
                      }],
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
              }],
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
              "body": [{
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
                      "params": [{
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
                          "properties": [{
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
                                      "properties": [{
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
                                      }]
                                  },
                                  "kind": "init"
                              }
                          ]
                      }],
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
              }],
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
                      "params": [{
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
                          "properties": [{
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
                          }]
                      }],
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
              }],
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
                          "elements": [{
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
                          }]
                      }],
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
              }],
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
              "body": [{
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
                      "params": [{
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
                          "properties": [{
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
                                      "properties": [{
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
                                      }]
                                  },
                                  "kind": "init"
                              }
                          ]
                      }],
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
                          "elements": [{
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
              }],
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
                          "properties": [{
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
                          }]
                      }],
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
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse arrow function destructed', () => {
          expect(parseScript(`async function wrap() {
          ({a = await b} = obj)
      };`, {
              ranges: true,
              locations: true,
              raw: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 64,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 8
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 63,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 3,
                    "column": 7
                  }
                },
                "id": {
                  "type": "Identifier",
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
                  "name": "wrap"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 22,
                  "end": 63,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 22
                    },
                    "end": {
                      "line": 3,
                      "column": 7
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 34,
                      "end": 55,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 10
                        },
                        "end": {
                          "line": 2,
                          "column": 31
                        }
                      },
                      "expression": {
                        "type": "AssignmentExpression",
                        "start": 35,
                        "end": 54,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 11
                          },
                          "end": {
                            "line": 2,
                            "column": 30
                          }
                        },
                        "operator": "=",
                        "left": {
                          "type": "ObjectPattern",
                          "start": 35,
                          "end": 48,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 11
                            },
                            "end": {
                              "line": 2,
                              "column": 24
                            }
                          },
                          "properties": [
                            {
                              "type": "Property",
                              "start": 36,
                              "end": 47,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 12
                                },
                                "end": {
                                  "line": 2,
                                  "column": 23
                                }
                              },
                              "method": false,
                              "shorthand": true,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 36,
                                "end": 37,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 12
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 13
                                  }
                                },
                                "name": "a"
                              },
                              "kind": "init",
                              "value": {
                                "type": "AssignmentPattern",
                                "start": 36,
                                "end": 47,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 12
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 23
                                  }
                                },
                                "left": {
                                  "type": "Identifier",
                                  "start": 36,
                                  "end": 37,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 12
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 13
                                    }
                                  },
                                  "name": "a"
                                },
                                "right": {
                                  "type": "AwaitExpression",
                                  "start": 40,
                                  "end": 47,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 16
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 23
                                    }
                                  },
                                  "argument": {
                                    "type": "Identifier",
                                    "start": 46,
                                    "end": 47,
                                    "loc": {
                                      "start": {
                                        "line": 2,
                                        "column": 22
                                      },
                                      "end": {
                                        "line": 2,
                                        "column": 23
                                      }
                                    },
                                    "name": "b"
                                  }
                                }
                              }
                            }
                          ]
                        },
                        "right": {
                          "type": "Identifier",
                          "start": 51,
                          "end": 54,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 27
                            },
                            "end": {
                              "line": 2,
                              "column": 30
                            }
                          },
                          "name": "obj"
                        }
                      }
                    }
                  ]
                }
              },
              {
                "type": "EmptyStatement",
                "start": 63,
                "end": 64,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 7
                  },
                  "end": {
                    "line": 3,
                    "column": 8
                  }
                }
              }
            ],
            "sourceType": "script"
          });
      });
  
      it('should parse async await function param', () => {
          expect(parseScript(`async function foo(a = async function foo() { await b }) {};`, {
              ranges: true,
              locations: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 60,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 60
                  }
              },
              "body": [{
                      "type": "FunctionDeclaration",
                      "start": 0,
                      "end": 59,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 59
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "start": 15,
                          "end": 18,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 15
                              },
                              "end": {
                                  "line": 1,
                                  "column": 18
                              }
                          },
                          "name": "foo"
                      },
                      "generator": false,
                      "expression": false,
                      "async": true,
                      "params": [{
                          "type": "AssignmentPattern",
                          "start": 19,
                          "end": 55,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 19
                              },
                              "end": {
                                  "line": 1,
                                  "column": 55
                              }
                          },
                          "left": {
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
                              "name": "a"
                          },
                          "right": {
                              "type": "FunctionExpression",
                              "start": 23,
                              "end": 55,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 23
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 55
                                  }
                              },
                              "id": {
                                  "type": "Identifier",
                                  "start": 38,
                                  "end": 41,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 38
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 41
                                      }
                                  },
                                  "name": "foo"
                              },
                              "generator": false,
                              "expression": false,
                              "async": true,
                              "params": [],
                              "body": {
                                  "type": "BlockStatement",
                                  "start": 44,
                                  "end": 55,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 44
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 55
                                      }
                                  },
                                  "body": [{
                                      "type": "ExpressionStatement",
                                      "start": 46,
                                      "end": 53,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 46
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 53
                                          }
                                      },
                                      "expression": {
                                          "type": "AwaitExpression",
                                          "start": 46,
                                          "end": 53,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 46
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 53
                                              }
                                          },
                                          "argument": {
                                              "type": "Identifier",
                                              "start": 52,
                                              "end": 53,
                                              "loc": {
                                                  "start": {
                                                      "line": 1,
                                                      "column": 52
                                                  },
                                                  "end": {
                                                      "line": 1,
                                                      "column": 53
                                                  }
                                              },
                                              "name": "b"
                                          }
                                      }
                                  }]
                              }
                          }
                      }],
                      "body": {
                          "type": "BlockStatement",
                          "start": 57,
                          "end": 59,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 57
                              },
                              "end": {
                                  "line": 1,
                                  "column": 59
                              }
                          },
                          "body": []
                      }
                  },
                  {
                      "type": "EmptyStatement",
                      "start": 59,
                      "end": 60,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 59
                          },
                          "end": {
                              "line": 1,
                              "column": 60
                          }
                      }
                  }
              ],
              "sourceType": "script"
          });
      });
  
      it('should parse expression arrow', () => {
          expect(parseScript(`(x => x);`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 9,
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 9,
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 1,
                      "end": 7,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [{
                          "type": "Identifier",
                          "start": 1,
                          "end": 2,
                          "name": "x"
                      }],
                      "body": {
                          "type": "Identifier",
                          "start": 6,
                          "end": 7,
                          "name": "x"
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse arrow functions with destructuring', () => {
          expect(parseScript(`var x = ({ a } = 'foo') => {}`, {
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
              "body": [{
                  "type": "VariableDeclaration",
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
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "start": 4,
                      "end": 29,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 1,
                              "column": 29
                          }
                      },
                      "id": {
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
                          "name": "x"
                      },
                      "init": {
                          "type": "ArrowFunctionExpression",
                          "start": 8,
                          "end": 29,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 8
                              },
                              "end": {
                                  "line": 1,
                                  "column": 29
                              }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [{
                              "type": "AssignmentPattern",
                              "start": 9,
                              "end": 22,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 9
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 22
                                  }
                              },
                              "left": {
                                  "type": "ObjectPattern",
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
                                  "properties": [{
                                      "type": "Property",
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
                                      "method": false,
                                      "shorthand": true,
                                      "computed": false,
                                      "key": {
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
                                      },
                                      "kind": "init",
                                      "value": {
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
                                  }]
                              },
                              "right": {
                                  "type": "Literal",
                                  "start": 17,
                                  "end": 22,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 17
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 22
                                      }
                                  },
                                  "value": "foo",
                                  "raw": "'foo'"
                              }
                          }],
                          "body": {
                              "type": "BlockStatement",
                              "start": 27,
                              "end": 29,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 27
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 29
                                  }
                              },
                              "body": []
                          }
                      }
                  }],
                  "kind": "var"
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse binary expression, yield and  slash', () => {
          expect(parseScript(`var fn = () => test();`, {
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
              "body": [{
                  "type": "VariableDeclaration",
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
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "start": 4,
                      "end": 21,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 1,
                              "column": 21
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 6,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 4
                              },
                              "end": {
                                  "line": 1,
                                  "column": 6
                              }
                          },
                          "name": "fn"
                      },
                      "init": {
                          "type": "ArrowFunctionExpression",
                          "start": 9,
                          "end": 21,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 9
                              },
                              "end": {
                                  "line": 1,
                                  "column": 21
                              }
                          },
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": false,
                          "params": [],
                          "body": {
                              "type": "CallExpression",
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
                              "callee": {
                                  "type": "Identifier",
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
                                  "name": "test"
                              },
                              "arguments": []
                          }
                      }
                  }],
                  "kind": "var"
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse binary expression, yield and  slash', () => {
          expect(parseScript(`var fn = () => test();`, {
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
              "body": [{
                  "type": "VariableDeclaration",
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
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "start": 4,
                      "end": 21,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 1,
                              "column": 21
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 6,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 4
                              },
                              "end": {
                                  "line": 1,
                                  "column": 6
                              }
                          },
                          "name": "fn"
                      },
                      "init": {
                          "type": "ArrowFunctionExpression",
                          "start": 9,
                          "end": 21,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 9
                              },
                              "end": {
                                  "line": 1,
                                  "column": 21
                              }
                          },
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": false,
                          "params": [],
                          "body": {
                              "type": "CallExpression",
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
                              "callee": {
                                  "type": "Identifier",
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
                                  "name": "test"
                              },
                              "arguments": []
                          }
                      }
                  }],
                  "kind": "var"
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse binary expression, yield and  slash', () => {
          expect(parseScript(`() => a + b - yield / 1`, {
              ranges: true,
              raw: true
          })).to.eql({
              "body": [{
                  "end": 23,
                  "expression": {
                      "async": false,
                      "body": {
                          "end": 23,
                          "left": {
                              "end": 11,
                              "left": {
                                  "end": 7,
                                  "name": "a",
                                  "start": 6,
                                  "type": "Identifier"
                              },
                              "operator": "+",
                              "right": {
                                  "end": 11,
                                  "name": "b",
                                  "start": 10,
                                  "type": "Identifier"
                              },
                              "start": 6,
                              "type": "BinaryExpression"
                          },
                          "operator": "-",
                          "right": {
                              "end": 23,
                              "left": {
                                  "end": 19,
                                  "name": "yield",
                                  "start": 14,
                                  "type": "Identifier",
                              },
                              "operator": "/",
                              "right": {
                                  "end": 23,
                                  "raw": "1",
                                  "start": 22,
                                  "type": "Literal",
                                  "value": 1,
                              },
                              "start": 14,
                              "type": "BinaryExpression"
                          },
                          "start": 6,
                          "type": "BinaryExpression",
                      },
                      "end": 23,
                      "expression": true,
                      "generator": false,
                      "id": null,
                      "params": [],
                      "start": 0,
                      "type": "ArrowFunctionExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
              }, ],
              "end": 23,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse arrow parameters cover includes rest concise body function body', () => {
          expect(parseScript(`f = ([,] = g()) => {}`, {
              ranges: true,
              raw: true,
              locations: true
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
              "body": [{
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
                      "type": "AssignmentExpression",
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
                          "name": "f"
                      },
                      "right": {
                          "type": "ArrowFunctionExpression",
                          "start": 4,
                          "end": 21,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 4
                              },
                              "end": {
                                  "line": 1,
                                  "column": 21
                              }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [{
                              "type": "AssignmentPattern",
                              "start": 5,
                              "end": 14,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 5
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 14
                                  }
                              },
                              "left": {
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
                                      null
                                  ]
                              },
                              "right": {
                                  "type": "CallExpression",
                                  "start": 11,
                                  "end": 14,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 11
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 14
                                      }
                                  },
                                  "callee": {
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
                                      "name": "g"
                                  },
                                  "arguments": []
                              }
                          }],
                          "body": {
                              "type": "BlockStatement",
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
                              "body": []
                          }
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse arrow parameters cover includes rest concise body function body', () => {
          expect(parseScript(`f = ([...x] = values) => {}`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 27,
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 27,
                  "expression": {
                      "type": "AssignmentExpression",
                      "start": 0,
                      "end": 27,
                      "operator": "=",
                      "left": {
                          "type": "Identifier",
                          "start": 0,
                          "end": 1,
                          "name": "f"
                      },
                      "right": {
                          "type": "ArrowFunctionExpression",
                          "start": 4,
                          "end": 27,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [{
                              "type": "AssignmentPattern",
                              "start": 5,
                              "end": 20,
                              "left": {
                                  "type": "ArrayPattern",
                                  "start": 5,
                                  "end": 11,
                                  "elements": [{
                                      "type": "RestElement",
                                      "start": 6,
                                      "end": 10,
                                      "argument": {
                                          "type": "Identifier",
                                          "start": 9,
                                          "end": 10,
                                          "name": "x"
                                      }
                                  }]
                              },
                              "right": {
                                  "type": "Identifier",
                                  "start": 14,
                                  "end": 20,
                                  "name": "values"
                              }
                          }],
                          "body": {
                              "type": "BlockStatement",
                              "start": 25,
                              "end": 27,
                              "body": []
                          }
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse arrow parameters cover includes rest concise body function body', () => {
          expect(parseScript(`x => function(){}`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 17,
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 17,
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 17,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [{
                          "type": "Identifier",
                          "start": 0,
                          "end": 1,
                          "name": "x"
                      }],
                      "body": {
                          "type": "FunctionExpression",
                          "start": 5,
                          "end": 17,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "start": 15,
                              "end": 17,
                              "body": []
                          }
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
      it('should parse arrow parameters cover includes rest concise body function body', () => {
          expect(parseScript(`var af = (x, ...y) => { return [x, y.length]; };`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 48,
              "body": [{
                  "type": "VariableDeclaration",
                  "start": 0,
                  "end": 48,
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "start": 4,
                      "end": 47,
                      "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 6,
                          "name": "af"
                      },
                      "init": {
                          "type": "ArrowFunctionExpression",
                          "start": 9,
                          "end": 47,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [{
                                  "type": "Identifier",
                                  "start": 10,
                                  "end": 11,
                                  "name": "x"
                              },
                              {
                                  "type": "RestElement",
                                  "start": 13,
                                  "end": 17,
                                  "argument": {
                                      "type": "Identifier",
                                      "start": 16,
                                      "end": 17,
                                      "name": "y"
                                  }
                              }
                          ],
                          "body": {
                              "type": "BlockStatement",
                              "start": 22,
                              "end": 47,
                              "body": [{
                                  "type": "ReturnStatement",
                                  "start": 24,
                                  "end": 45,
                                  "argument": {
                                      "type": "ArrayExpression",
                                      "start": 31,
                                      "end": 44,
                                      "elements": [{
                                              "type": "Identifier",
                                              "start": 32,
                                              "end": 33,
                                              "name": "x"
                                          },
                                          {
                                              "type": "MemberExpression",
                                              "start": 35,
                                              "end": 43,
                                              "object": {
                                                  "type": "Identifier",
                                                  "start": 35,
                                                  "end": 36,
                                                  "name": "y"
                                              },
                                              "property": {
                                                  "type": "Identifier",
                                                  "start": 37,
                                                  "end": 43,
                                                  "name": "length"
                                              },
                                              "computed": false
                                          }
                                      ]
                                  }
                              }]
                          }
                      }
                  }],
                  "kind": "var"
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse conditional after concise body', () => {
          expect(parseScript(`(b = c) => d ? (e, f) : g;`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 26,
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 26,
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 25,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [{
                          "type": "AssignmentPattern",
                          "start": 1,
                          "end": 6,
                          "left": {
                              "type": "Identifier",
                              "start": 1,
                              "end": 2,
                              "name": "b"
                          },
                          "right": {
                              "type": "Identifier",
                              "start": 5,
                              "end": 6,
                              "name": "c"
                          }
                      }],
                      "body": {
                          "type": "ConditionalExpression",
                          "start": 11,
                          "end": 25,
                          "test": {
                              "type": "Identifier",
                              "start": 11,
                              "end": 12,
                              "name": "d"
                          },
                          "consequent": {
                              "type": "SequenceExpression",
                              "start": 16,
                              "end": 20,
                              "expressions": [{
                                      "type": "Identifier",
                                      "start": 16,
                                      "end": 17,
                                      "name": "e"
                                  },
                                  {
                                      "type": "Identifier",
                                      "start": 19,
                                      "end": 20,
                                      "name": "f"
                                  }
                              ]
                          },
                          "alternate": {
                              "type": "Identifier",
                              "start": 24,
                              "end": 25,
                              "name": "g"
                          }
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse SingleNameBinding assigning name to "anonymous" generator function', () => {
          expect(parseScript(`f = ({ gen = function* () {}, xGen = function* x() {} }) => {}`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 62,
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 62,
                  "expression": {
                      "type": "AssignmentExpression",
                      "start": 0,
                      "end": 62,
                      "operator": "=",
                      "left": {
                          "type": "Identifier",
                          "start": 0,
                          "end": 1,
                          "name": "f"
                      },
                      "right": {
                          "type": "ArrowFunctionExpression",
                          "start": 4,
                          "end": 62,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [{
                              "type": "ObjectPattern",
                              "start": 5,
                              "end": 55,
                              "properties": [{
                                      "type": "Property",
                                      "start": 7,
                                      "end": 28,
                                      "method": false,
                                      "shorthand": true,
                                      "computed": false,
                                      "key": {
                                          "type": "Identifier",
                                          "start": 7,
                                          "end": 10,
                                          "name": "gen"
                                      },
                                      "kind": "init",
                                      "value": {
                                          "type": "AssignmentPattern",
                                          "start": 7,
                                          "end": 28,
                                          "left": {
                                              "type": "Identifier",
                                              "start": 7,
                                              "end": 10,
                                              "name": "gen"
                                          },
                                          "right": {
                                              "type": "FunctionExpression",
                                              "start": 13,
                                              "end": 28,
                                              "id": null,
                                              "generator": true,
                                              "expression": false,
                                              "async": false,
                                              "params": [],
                                              "body": {
                                                  "type": "BlockStatement",
                                                  "start": 26,
                                                  "end": 28,
                                                  "body": []
                                              }
                                          }
                                      }
                                  },
                                  {
                                      "type": "Property",
                                      "start": 30,
                                      "end": 53,
                                      "method": false,
                                      "shorthand": true,
                                      "computed": false,
                                      "key": {
                                          "type": "Identifier",
                                          "start": 30,
                                          "end": 34,
                                          "name": "xGen"
                                      },
                                      "kind": "init",
                                      "value": {
                                          "type": "AssignmentPattern",
                                          "start": 30,
                                          "end": 53,
                                          "left": {
                                              "type": "Identifier",
                                              "start": 30,
                                              "end": 34,
                                              "name": "xGen"
                                          },
                                          "right": {
                                              "type": "FunctionExpression",
                                              "start": 37,
                                              "end": 53,
                                              "id": {
                                                  "type": "Identifier",
                                                  "start": 47,
                                                  "end": 48,
                                                  "name": "x"
                                              },
                                              "generator": true,
                                              "expression": false,
                                              "async": false,
                                              "params": [],
                                              "body": {
                                                  "type": "BlockStatement",
                                                  "start": 51,
                                                  "end": 53,
                                                  "body": []
                                              }
                                          }
                                      }
                                  }
                              ]
                          }],
                          "body": {
                              "type": "BlockStatement",
                              "start": 60,
                              "end": 62,
                              "body": []
                          }
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse simple arrow followed by unary', () => {
          expect(parseScript(`(() => {}) + 2`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 14,
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 14,
                  "expression": {
                      "type": "BinaryExpression",
                      "start": 0,
                      "end": 14,
                      "left": {
                          "type": "ArrowFunctionExpression",
                          "start": 1,
                          "end": 9,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "start": 7,
                              "end": 9,
                              "body": []
                          }
                      },
                      "operator": "+",
                      "right": {
                          "type": "Literal",
                          "start": 13,
                          "end": 14,
                          "value": 2,
                          "raw": "2"
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
  
      it('should parse Rest element containing an object binding pattern', () => {
          expect(parseScript(`f = ([...{ 0: v, 1: w, 2: x, 3: y, length: z }]) => {}`, {
              ranges: false,
              raw: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "AssignmentExpression",
                      "operator": "=",
                      "left": {
                          "type": "Identifier",
                          "name": "f"
                      },
                      "right": {
                          "type": "ArrowFunctionExpression",
                          "id": null,
                          "params": [{
                              "type": "ArrayPattern",
                              "elements": [{
                                  "type": "RestElement",
                                  "argument": {
                                      "type": "ObjectPattern",
                                      "properties": [{
                                              "type": "Property",
                                              "key": {
                                                  "type": "Literal",
                                                  "value": 0,
                                                  "raw": "0"
                                              },
                                              "computed": false,
                                              "value": {
                                                  "type": "Identifier",
                                                  "name": "v"
                                              },
                                              "kind": "init",
                                              "method": false,
                                              "shorthand": false
                                          },
                                          {
                                              "type": "Property",
                                              "key": {
                                                  "type": "Literal",
                                                  "value": 1,
                                                  "raw": "1"
                                              },
                                              "computed": false,
                                              "value": {
                                                  "type": "Identifier",
                                                  "name": "w"
                                              },
                                              "kind": "init",
                                              "method": false,
                                              "shorthand": false
                                          },
                                          {
                                              "type": "Property",
                                              "key": {
                                                  "type": "Literal",
                                                  "value": 2,
                                                  "raw": "2"
                                              },
                                              "computed": false,
                                              "value": {
                                                  "type": "Identifier",
                                                  "name": "x"
                                              },
                                              "kind": "init",
                                              "method": false,
                                              "shorthand": false
                                          },
                                          {
                                              "type": "Property",
                                              "key": {
                                                  "type": "Literal",
                                                  "value": 3,
                                                  "raw": "3"
                                              },
                                              "computed": false,
                                              "value": {
                                                  "type": "Identifier",
                                                  "name": "y"
                                              },
                                              "kind": "init",
                                              "method": false,
                                              "shorthand": false
                                          },
                                          {
                                              "type": "Property",
                                              "key": {
                                                  "type": "Identifier",
                                                  "name": "length"
                                              },
                                              "computed": false,
                                              "value": {
                                                  "type": "Identifier",
                                                  "name": "z"
                                              },
                                              "kind": "init",
                                              "method": false,
                                              "shorthand": false
                                          }
                                      ]
                                  }
                              }]
                          }],
                          "body": {
                              "type": "BlockStatement",
                              "body": []
                          },
                          "generator": false,
                          "expression": false,
                          "async": false
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse Rest element containing an object binding pattern (arrow function expression (default parameter))', () => {
          expect(parseScript(`f = ([...{ length }] = [1, 2, 3]) => {}`, {
              ranges: false,
              raw: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "AssignmentExpression",
                      "operator": "=",
                      "left": {
                          "type": "Identifier",
                          "name": "f"
                      },
                      "right": {
                          "type": "ArrowFunctionExpression",
                          "id": null,
                          "params": [{
                              "type": "AssignmentPattern",
                              "left": {
                                  "type": "ArrayPattern",
                                  "elements": [{
                                      "type": "RestElement",
                                      "argument": {
                                          "type": "ObjectPattern",
                                          "properties": [{
                                              "type": "Property",
                                              "key": {
                                                  "type": "Identifier",
                                                  "name": "length"
                                              },
                                              "computed": false,
                                              "value": {
                                                  "type": "Identifier",
                                                  "name": "length"
                                              },
                                              "kind": "init",
                                              "method": false,
                                              "shorthand": true
                                          }]
                                      }
                                  }]
                              },
                              "right": {
                                  "type": "ArrayExpression",
                                  "elements": [{
                                          "type": "Literal",
                                          "value": 1,
                                          "raw": "1"
                                      },
                                      {
                                          "type": "Literal",
                                          "value": 2,
                                          "raw": "2"
                                      },
                                      {
                                          "type": "Literal",
                                          "value": 3,
                                          "raw": "3"
                                      }
                                  ]
                              }
                          }],
                          "body": {
                              "type": "BlockStatement",
                              "body": []
                          },
                          "generator": false,
                          "expression": false,
                          "async": false
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse Rest element containing an object binding pattern (arrow function expression (default parameter))', () => {
          expect(parseScript(`f = ([...{ 0: v, 1: w, 2: x, 3: y, length: z }] = [7, 8, 9]) => {}`, {
              ranges: false,
              raw: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "AssignmentExpression",
                      "operator": "=",
                      "left": {
                          "type": "Identifier",
                          "name": "f"
                      },
                      "right": {
                          "type": "ArrowFunctionExpression",
                          "id": null,
                          "params": [{
                              "type": "AssignmentPattern",
                              "left": {
                                  "type": "ArrayPattern",
                                  "elements": [{
                                      "type": "RestElement",
                                      "argument": {
                                          "type": "ObjectPattern",
                                          "properties": [{
                                                  "type": "Property",
                                                  "key": {
                                                      "type": "Literal",
                                                      "value": 0,
                                                      "raw": "0"
                                                  },
                                                  "computed": false,
                                                  "value": {
                                                      "type": "Identifier",
                                                      "name": "v"
                                                  },
                                                  "kind": "init",
                                                  "method": false,
                                                  "shorthand": false
                                              },
                                              {
                                                  "type": "Property",
                                                  "key": {
                                                      "type": "Literal",
                                                      "value": 1,
                                                      "raw": "1"
                                                  },
                                                  "computed": false,
                                                  "value": {
                                                      "type": "Identifier",
                                                      "name": "w"
                                                  },
                                                  "kind": "init",
                                                  "method": false,
                                                  "shorthand": false
                                              },
                                              {
                                                  "type": "Property",
                                                  "key": {
                                                      "type": "Literal",
                                                      "value": 2,
                                                      "raw": "2"
                                                  },
                                                  "computed": false,
                                                  "value": {
                                                      "type": "Identifier",
                                                      "name": "x"
                                                  },
                                                  "kind": "init",
                                                  "method": false,
                                                  "shorthand": false
                                              },
                                              {
                                                  "type": "Property",
                                                  "key": {
                                                      "type": "Literal",
                                                      "value": 3,
                                                      "raw": "3"
                                                  },
                                                  "computed": false,
                                                  "value": {
                                                      "type": "Identifier",
                                                      "name": "y"
                                                  },
                                                  "kind": "init",
                                                  "method": false,
                                                  "shorthand": false
                                              },
                                              {
                                                  "type": "Property",
                                                  "key": {
                                                      "type": "Identifier",
                                                      "name": "length"
                                                  },
                                                  "computed": false,
                                                  "value": {
                                                      "type": "Identifier",
                                                      "name": "z"
                                                  },
                                                  "kind": "init",
                                                  "method": false,
                                                  "shorthand": false
                                              }
                                          ]
                                      }
                                  }]
                              },
                              "right": {
                                  "type": "ArrayExpression",
                                  "elements": [{
                                          "type": "Literal",
                                          "value": 7,
                                          "raw": "7"
                                      },
                                      {
                                          "type": "Literal",
                                          "value": 8,
                                          "raw": "8"
                                      },
                                      {
                                          "type": "Literal",
                                          "value": 9,
                                          "raw": "9"
                                      }
                                  ]
                              }
                          }],
                          "body": {
                              "type": "BlockStatement",
                              "body": []
                          },
                          "generator": false,
                          "expression": false,
                          "async": false
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse arrow parameter with binding identifier yield (sloppy)', () => {
          expect(parseScript(`var af = yield => 1;`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 20,
              "body": [{
                  "type": "VariableDeclaration",
                  "start": 0,
                  "end": 20,
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "start": 4,
                      "end": 19,
                      "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 6,
                          "name": "af"
                      },
                      "init": {
                          "type": "ArrowFunctionExpression",
                          "start": 9,
                          "end": 19,
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": false,
                          "params": [{
                              "type": "Identifier",
                              "start": 9,
                              "end": 14,
                              "name": "yield"
                          }],
                          "body": {
                              "type": "Literal",
                              "start": 18,
                              "end": 19,
                              "value": 1,
                              "raw": "1"
                          }
                      }
                  }],
                  "kind": "var"
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse Rest element containing an object binding pattern', () => {
          expect(parseScript(`f = ([...{ length }]) => {}`, {
              ranges: true,
              raw: true
          })).to.eql({
              "body": [{
                  "end": 27,
                  "expression": {
                      "end": 27,
                      "left": {
                          "end": 1,
                          "name": "f",
                          "start": 0,
                          "type": "Identifier"
                      },
                      "operator": "=",
                      "right": {
                          "async": false,
                          "body": {
                              "body": [],
                              "end": 27,
                              "start": 25,
                              "type": "BlockStatement"
                          },
                          "end": 27,
                          "expression": false,
                          "generator": false,
                          "id": null,
                          "params": [{
                              "elements": [{
                                  "argument": {
                                      "end": 19,
                                      "properties": [{
                                          "computed": false,
                                          "end": 17,
                                          "key": {
                                              "end": 17,
                                              "name": "length",
                                              "start": 11,
                                              "type": "Identifier"
                                          },
                                          "kind": "init",
                                          "method": false,
                                          "shorthand": true,
                                          "start": 11,
                                          "type": "Property",
                                          "value": {
                                              "end": 17,
                                              "name": "length",
                                              "start": 11,
                                              "type": "Identifier"
                                          }
                                      }],
                                      "start": 9,
                                      "type": "ObjectPattern"
                                  },
                                  "end": 19,
                                  "start": 6,
                                  "type": "RestElement",
                              }],
                              "end": 20,
                              "start": 5,
                              "type": "ArrayPattern"
                          }, ],
                          "start": 4,
                          "type": "ArrowFunctionExpression"
                      },
                      "start": 0,
                      "type": "AssignmentExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
              }],
              "end": 27,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse multiple params', () => {
          expect(parseScript(`(a, b) => "test";`, {
              ranges: true,
              raw: true
          })).to.eql({
              "body": [{
                  "end": 17,
                  "expression": {
                      "body": {
                          "end": 16,
                          "raw": "\"test\"",
                          "start": 10,
                          "type": "Literal",
                          "value": "test"
                      },
                      "end": 16,
                      "expression": true,
                      "generator": false,
                      "async": false,
                      "id": null,
                      "params": [{
                              "end": 2,
                              "name": "a",
                              "start": 1,
                              "type": "Identifier"
                          },
                          {
                              "end": 5,
                              "name": "b",
                              "start": 4,
                              "type": "Identifier"
                          },
                      ],
                      "start": 0,
                      "type": "ArrowFunctionExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
              }],
              "end": 17,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse no auto return', () => {
          expect(parseScript(`(a, b) => { 42; };`, {
              ranges: false,
              raw: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "id": null,
                      "params": [{
                              "type": "Identifier",
                              "name": "a"
                          },
                          {
                              "type": "Identifier",
                              "name": "b"
                          }
                      ],
                      "body": {
                          "type": "BlockStatement",
                          "body": [{
                              "type": "ExpressionStatement",
                              "expression": {
                                  "type": "Literal",
                                  "value": 42,
                                  "raw": "42"
                              }
                          }]
                      },
                      "generator": false,
                      "expression": false,
                      "async": false
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse no strict eval param', () => {
          expect(parseScript(`(eval, a) => 42;`, {
              ranges: false,
              raw: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "id": null,
                      "params": [{
                              "type": "Identifier",
                              "name": "eval"
                          },
                          {
                              "type": "Identifier",
                              "name": "a"
                          }
                      ],
                      "body": {
                          "type": "Literal",
                          "value": 42,
                          "raw": "42"
                      },
                      "generator": false,
                      "expression": true,
                      "async": false
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse not strict octal', () => {
          expect(parseScript(`(a) => 00`, {
              ranges: false,
              raw: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "id": null,
                      "params": [{
                          "type": "Identifier",
                          "name": "a"
                      }],
                      "body": {
                          "type": "Literal",
                          "value": 0,
                          "raw": "00"
                      },
                      "generator": false,
                      "expression": true,
                      "async": false
                  }
              }],
              "sourceType": "script"
          });
      });
  
  
      it('should parse arrow function paren', () => {
          expect(parseScript('(a) => a;', {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "id": null,
                      "params": [{
                          "type": "Identifier",
                          "name": "a"
                      }],
                      "body": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "generator": false,
                      "expression": true,
                      "async": false
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse arrow function', () => {
          expect(parseScript('a => a;', {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "id": null,
                      "params": [{
                          "type": "Identifier",
                          "name": "a"
                      }],
                      "body": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "generator": false,
                      "expression": true,
                      "async": false
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "(eval, a = 10) => 42"', () => {
          expect(parseScript(`(eval, a = 10) => 42`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 20,
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 20,
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 20,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [{
                              "type": "Identifier",
                              "start": 1,
                              "end": 5,
                              "name": "eval"
                          },
                          {
                              "type": "AssignmentPattern",
                              "start": 7,
                              "end": 13,
                              "left": {
                                  "type": "Identifier",
                                  "start": 7,
                                  "end": 8,
                                  "name": "a"
                              },
                              "right": {
                                  "type": "Literal",
                                  "start": 11,
                                  "end": 13,
                                  "value": 10,
                                  "raw": "10"
                              }
                          }
                      ],
                      "body": {
                          "type": "Literal",
                          "start": 18,
                          "end": 20,
                          "value": 42,
                          "raw": "42"
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "([a]) => 0"', () => {
          expect(parseScript(`([a]) => abc`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 12,
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 12,
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 12,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [{
                          "type": "ArrayPattern",
                          "start": 1,
                          "end": 4,
                          "elements": [{
                              "type": "Identifier",
                              "start": 2,
                              "end": 3,
                              "name": "a"
                          }]
                      }],
                      "body": {
                          "type": "Identifier",
                          "start": 9,
                          "end": 12,
                          "name": "abc"
                      }
                  }
              }],
              "sourceType": "script"
          })
      });
  
      it('should parse "a => 0"', () => {
          expect(parseScript(`a => 0`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 6,
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 6,
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 6,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [{
                          "type": "Identifier",
                          "start": 0,
                          "end": 1,
                          "name": "a"
                      }],
                      "body": {
                          "type": "Literal",
                          "start": 5,
                          "end": 6,
                          "value": 0,
                          "raw": "0"
                      }
                  }
              }],
              "sourceType": "script"
          })
      });
  
      it('should parse "(...[]) => 0"', () => {
          expect(parseScript(`(...[]) => 0`, {})).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "id": null,
                      "params": [{
                          "type": "RestElement",
                          "argument": {
                              "type": "ArrayPattern",
                              "elements": []
                          }
                      }],
                      "body": {
                          "type": "Literal",
                          "value": 0
                      },
                      "generator": false,
                      "expression": true,
                      "async": false
                  }
              }],
              "sourceType": "script"
          })
      });
  
      it('should parse "(a, ...[]) => 0"', () => {
          expect(parseScript(`(a, ...[]) => 0`, {})).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "id": null,
                      "params": [{
                              "type": "Identifier",
                              "name": "a"
                          },
                          {
                              "type": "RestElement",
                              "argument": {
                                  "type": "ArrayPattern",
                                  "elements": []
                              }
                          }
                      ],
                      "body": {
                          "type": "Literal",
                          "value": 0
                      },
                      "generator": false,
                      "expression": true,
                      "async": false
                  }
              }],
              "sourceType": "script"
          })
      });
  
  
  
  });