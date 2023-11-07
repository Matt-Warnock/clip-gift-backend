const ErrorHandler = require('./error-handler')

describe('ErrorHandler', () => {
    beforeEach(() => console.log = jest.fn())
    afterEach(() => jest.clearAllMocks)

  it('Logs error object passed into it', () => {
    const error = { errorMessage: 'irrelevant' }
    const errorHandler = new ErrorHandler()

    errorHandler.log(error)
    errorHandler.consoleLogErrors()

    expect(console.log).toHaveBeenCalledWith(error)
  })

  it('console logs all errors it logs in order', () => {
    const errorOne = { errorMessage: 'first error' }
    const errorTwo = { errorMessage: 'second error' }
    const errorHandler = new ErrorHandler()

    

    errorHandler.log(errorOne)
    errorHandler.log(errorTwo)
    errorHandler.consoleLogErrors()

    expect(console.log).toHaveBeenNthCalledWith(1, errorOne)
    expect(console.log).toHaveBeenNthCalledWith(2, errorTwo)
  })
})