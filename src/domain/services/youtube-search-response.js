const ClientResponse = require('../interfaces/client-response')

class YouTubeSearchResponse extends ClientResponse {
  #response
  #videoURL

  constructor(response) {
    super()
    this.#response = response
    this.#videoURL = 'https://www.youtube.com/watch?v='
  }

  messageString() {
    const videoId = this.#response.data.items[0].id.videoId
    return this.#videoURL + videoId
  }
}

module.exports = YouTubeSearchResponse