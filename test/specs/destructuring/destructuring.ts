import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring - Destructuring', () => {
    
        it('should fail on "[0] = 0"', () => {
            expect(() => {
                parseScript('[0] = 0');
            }).to.throw();
        });
    
        it('should fail on "[x] += 0"', () => {
            expect(() => {
                parseScript('[x] += 0');
            }).to.not.throw();
        });
    
    
        it('should fail "[...a, ] = c;"', () => {
            expect(() => {
                parseScript('[...a, ] = c;');
            }).to.not.throw();
        });
    
        it('should parse "[[x]] = 0"', () => {
            expect(parseScript('[[x]] = 0', {
                ranges: true,
                raw: true,
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
                        "type": "AssignmentExpression",
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
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "start": 0,
                            "end": 5,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 5
                                }
                            },
                            "elements": [{
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
                                    "name": "x"
                                }]
                            }]
                        },
                        "right": {
                            "type": "Literal",
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
                            "value": 0,
                            "raw": "0"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    });