import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Async Arrow function', () => {

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

});