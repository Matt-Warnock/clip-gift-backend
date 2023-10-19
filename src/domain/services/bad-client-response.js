const ClientResponse = require('./client-response');

class BadClientResponse extends ClientResponse {
  #error;

  constructor(error) {
    super();
    this.#error = error;
  }

  messageString() {
    let message;
    
    if (this.#error.response) {
      message = this.#error.response.data.error.message;
      console.log(this.#error.response.data);

    } else if (this.#error.request) {
      message = "Bad request";
      console.log(this.#error.request);

    } else {
      message = this.#error.message;
      console.log(this.#error.message);
    }
    return 'Error: ' + message;
  }
}

module.exports = BadClientResponse;