const feelMessenger = require('./feel-messenger');

describe(feelMessenger , () => { 
    it('returns string that includes feel parameter',() => {
        const parameters = { feel: 'happy' }
        const regex = new RegExp(parameters.feel);
        
        expect(feelMessenger(parameters)).toMatch(regex);
    })

    it('If no feel pram given, returns default message' , () => {
        const parameters = {}
        const defaultMessage = "I don't know what type of clip you want!";

        const regex = new RegExp(defaultMessage);

        expect(feelMessenger(parameters)).toMatch(regex);
    })
})