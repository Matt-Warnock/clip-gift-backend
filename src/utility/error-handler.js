class ErrorHandler {
  #errors
  constructor() {
    this.#errors = []
  }

  log(error) {
    this.#errors.push(error)
  }

  consoleLogErrors() {
    this.#errors.forEach(error => {
      console.log(error)
    })
  }
}

module.exports = ErrorHandler