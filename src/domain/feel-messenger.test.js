const feelMessenger = require('./feel-messenger');

describe(feelMessenger , () => { 
    it('returns string that includes feel parameter',() => {
        const parameters = { feel: 'happy' }

        const regex = new RegExp(parameters.feel);
        
        expect(feelMessenger(parameters)).toMatch(regex);
    }) 
})