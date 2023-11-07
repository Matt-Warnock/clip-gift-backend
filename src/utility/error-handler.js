class ErrorHandler {
  #errors
  #statusCode

  constructor() {
    this.#errors = []
  }

  log(error) {
    if (error.clientError) {
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