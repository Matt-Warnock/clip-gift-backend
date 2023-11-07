const ErrorHandler = require('./error-handler')
const BadClientResponse = require('../domain/services/bad-client-response')

describe('ErrorHandler', () => {
  const error = { errorMessage: 'irrelevant' }
  let errorHandler

  beforeEach(() => {
    errorHandler = new ErrorHandler()
    console.log = jest.fn()
  })
  afterEach(() => jest.clearAllMocks)

  it('Logs error object passed into it', () => {
    errorHandler.log(error)
    errorHandler.consoleLogErrors()

    expect(console.log).toHaveBeenCalledWith(error)
  })

  it('console logs all errors it logs in order', () => {
    const errorOne = { errorMessage: 'first error' }
    const errorTwo = { errorMessage: 'second error' }

    errorHandler.log(errorOne)
    errorHandler.log(errorTwo)
    errorHandler.consoleLogErrors()

    expect(console.log).toHaveBeenNthCalledWith(1, errorOne)
    expect(console.log).toHaveBeenNthCalledWith(2, errorTwo)
  })

  it('Assigns 500 status code when error is Bad Client Response', () => {
    const badClientResponse = new BadClientResponse(error)

    errorHandler.log(badClientResponse)

    expect(errorHandler.getStatusCode()).toBe(500)
  })
})