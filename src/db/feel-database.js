class FeelDB {
  #data
  constructor(data) {
    this.#data = data
  }
  getSearchStringOf(feelString) {
    return this.#data[feelString]
  }
}

module.exports = FeelDB