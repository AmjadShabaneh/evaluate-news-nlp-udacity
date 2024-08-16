/**
 * @jest-environment jsdom
 */

const {handleSubmit} = require('../js/formHandler');


describe('handleSubmit', () => {
    test('should be defined', () => {
        expect(handleSubmit).toBeDefined();
    });
});
