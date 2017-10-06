import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Arrow function', () => {

  it('should fail on cover no duplicates  (strict)', () => {
    expect(() => {
        parseScript('var af = (x, x) => 1;');
    }).to.throw('');
});

it('should fail on cover no eval  (strict)', () => {
    expect(() => {
        parseScript('"use strict"; var af = (eval) => 1;');
    }).to.throw('');
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
  }).to.throw('');
});

it('should fail if use of future reserved word', () => {
expect(() => {
    parseScript('"use strict"; var af = (arguments) => 1;');
}).to.throw('');
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
  }).to.throw('');
});

it('should fail on bindingidentifier no eval', () => {
  expect(() => {
      parseScript('"use strict"; var af = eval => 1;');
  }).to.throw('');
});

it('should fail on bindingidentifier no arguments', () => {
  expect(() => {
      parseScript('"use strict"; var af = arguments => 1;');
  }).to.throw('');
});
it('should fail on parameter named "yield" (strict)', () => {
  expect(() => {
      parseScript('"use strict"; var af = yield => 1;');
  }).to.not.throw('');
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
  }).to.throw('');
});

it('should fail on error strict parameter arguments', () => {
  expect(() => {
      parseScript('"use strict"; (arguments, a) => 42;');
  }).to.throw('');
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
    }).to.not.throw('');
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
  }).to.not.throw();
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
  }).to.throw('');
});

it('should fail on use of await as reserved word within function generator function bondies', () => {
  expect(() => {
      parseScript(`async() => {
var await;
};`)
  }).to.not.throw();
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
  }).to.throw('');
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
    }).to.not.throw();
});

it('should fail on "(package) => {"use strict"}"', () => {
  expect(() => {
      parseScript('(package) => {"use strict"}');
  }).to.throw();
});

it('should fail on "(a) => { let a; }"', () => {
  expect(() => {
      parseScript('(a) => { let a; }');
    }).to.not.throw();
});

it('should fail on ""use strict"; (arguments)=>1"', () => {
  expect(() => {
      parseScript('"use strict"; (arguments)=>1');
  }).to.throw('');
});

it('should fail on ""use strict"; (arguments, a) => 1"', () => {
  expect(() => {
      parseScript('"use strict"; (arguments, a) => 1');
  }).to.throw('');
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
  }).to.throw('');
});

it('should fail on strict param without paran and argument', () => {
  expect(() => {
      parseScript(`"use strict"; arguments => 42;`)
  }).to.throw('');
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
          "async": true,
          "params": [
            {
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
              "properties": [
                {
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
                }
              ]
            }
          ],
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
      }
    ],
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
    "body": [
      {
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
          "params": [
            {
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
          ],
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
            "body": [
              {
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
              }
            ]
          }
        }
      }
    ],
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
    "body": [
      {
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
          "params": [
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
              "name": "a"
            }
          ],
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
      }
    ],
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
    "body": [
      {
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
        "params": [
          {
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
          }
        ],
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
        "end": 60,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 6
          }
        },
        "body": [
          {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 59,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 5
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
              "end": 59,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 22
                },
                "end": {
                  "line": 3,
                  "column": 5
                }
              },
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 32,
                  "end": 53,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 8
                    },
                    "end": {
                      "line": 2,
                      "column": 29
                    }
                  },
                  "expression": {
                    "type": "AssignmentExpression",
                    "start": 33,
                    "end": 52,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 9
                      },
                      "end": {
                        "line": 2,
                        "column": 28
                      }
                    },
                    "operator": "=",
                    "left": {
                      "type": "ObjectPattern",
                      "start": 33,
                      "end": 46,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 9
                        },
                        "end": {
                          "line": 2,
                          "column": 22
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 34,
                          "end": 45,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 10
                            },
                            "end": {
                              "line": 2,
                              "column": 21
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 34,
                            "end": 35,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 10
                              },
                              "end": {
                                "line": 2,
                                "column": 11
                              }
                            },
                            "name": "a"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 34,
                            "end": 45,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 10
                              },
                              "end": {
                                "line": 2,
                                "column": 21
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 34,
                              "end": 35,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 10
                                },
                                "end": {
                                  "line": 2,
                                  "column": 11
                                }
                              },
                              "name": "a"
                            },
                            "right": {
                              "type": "AwaitExpression",
                              "start": 38,
                              "end": 45,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 14
                                },
                                "end": {
                                  "line": 2,
                                  "column": 21
                                }
                              },
                              "argument": {
                                "type": "Identifier",
                                "start": 44,
                                "end": 45,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 21
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
                      "start": 49,
                      "end": 52,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 25
                        },
                        "end": {
                          "line": 2,
                          "column": 28
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
            "start": 59,
            "end": 60,
            "loc": {
              "start": {
                "line": 3,
                "column": 5
              },
              "end": {
                "line": 3,
                "column": 6
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
        "body": [
          {
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
            "params": [
              {
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
                    "body": [
                      {
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
                      }
                    ]
                  }
                }
              }
            ],
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
          "body": [
            {
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
                "params": [
                  {
                    "type": "Identifier",
                    "start": 1,
                    "end": 2,
                    "name": "x"
                  }
                ],
                "body": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "name": "x"
                }
              }
            }
          ],
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
      "body": [
        {
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
          "declarations": [
            {
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
                "params": [
                  {
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
                      "properties": [
                        {
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
                        }
                      ]
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
                  }
                ],
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
            }
          ],
          "kind": "var"
        }
      ],
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
      "body": [
        {
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
          "declarations": [
            {
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
            }
          ],
          "kind": "var"
        }
      ],
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
      "body": [
        {
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
          "declarations": [
            {
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
            }
          ],
          "kind": "var"
        }
      ],
      "sourceType": "script"
    });
  });

  it('should parse binary expression, yield and  slash', () => {
      expect(parseScript(`() => a + b - yield / 1`, {
          ranges: true,
          raw: true
        })).to.eql({
            "body": [
              {
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
              },
            ],
            "end": 23,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
          });
  });

  
});