const ClientResponse = require('../interfaces/client-response')

class BadClientResponse extends ClientResponse {
  messageString() {
    return ''
  }
}

module.exports = BadClientResponse