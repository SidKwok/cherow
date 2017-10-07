import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - For', () => {


    it.skip('should parse "for(;;);"', () => {
        expect(parseScript(`while (!b) {
            continue 
        }`, {
            ranges: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 8,
            "body": [{
                "type": "ForStatement",
                "start": 0,
                "end": 8,
                "init": null,
                "test": null,
                "update": null,
                "body": {
                    "type": "EmptyStatement",
                    "start": 7,
                    "end": 8
                }
            }],
            "sourceType": "script"
        });
    });




});