const {checkURL} = require('../js/URLChecker');

describe('urlValidity', ()=> {
    test('test if strings are false urls', () => {
        expect(checkURL("test")).toBeFalsy();
    })
    
    test('emails are not considered valid urls', () => {
        expect(checkURL("ahmed@gmail.com")).toBeFalsy();
    })
    
    test('expect urls to be true', () => {
        expect(checkURL("https://www.google.com")).toBeTruthy();
    })

    test('expect empty string to be falsy', () => {
        expect(checkURL("")).toBeFalsy();
    })
})