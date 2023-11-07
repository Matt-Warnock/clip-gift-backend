const BadClientResponse = require('../domain/services/bad-client-response')

class ErrorHandler {
  #errors
  #statusCode

  constructor() {
    this.#errors = []
  }

  log(error) {
    if (error instanceof BadClientResponse) {
      this.#statusCode = 500
    }

    this.#errors.push(error)
  }

  consoleLogErrors() {
    this.#errors.forEach(error => {
      console.log(error)
    })
  }

  getStatusCode() {
    return this.#statusCode
  }
}

module.exports = ErrorHandler