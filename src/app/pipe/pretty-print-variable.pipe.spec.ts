import { PrettyPrintVariablePipe } from './pretty-print-variable.pipe';

describe('PrettyPrintVariablePipe', () => {
    it('create an instance', () => {
        const pipe = new PrettyPrintVariablePipe();
        expect(pipe).toBeTruthy();
    });
});
