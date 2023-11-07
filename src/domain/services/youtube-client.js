const axios = require('axios')
const YouTubeSearchResponse = require('./youtube-search-response')
const BadClientResponse = require('./bad-client-response')
require('dotenv').config()

class YoutubeClient {
  #aPIKey
  #errorHandler
  #searchEndpoint

  constructor(errorHandler) {
    this.#aPIKey = process.env.YOUTUBE_API_KEY
    this.#errorHandler = errorHandler
    this.#searchEndpoint = `${process.env.YOUTUBE_END_POINT}/search`
  }

  async searchVideo(searchString) {
    const queries = {
      part: 'snippet',
      maxResults: 1,
      q: searchString,
      type: 'video',
      videoDuration: 'short',
      key: this.#aPIKey,
    }

    try {
      const response = await axios.get(this.#searchEndpoint, { params: queries })
      return new YouTubeSearchResponse(response)
    } catch (error) {
      this.#errorHandler.log(this.#parseError(error))
      return new BadClientResponse()
    }
  }

  #parseError(error) {
    let errorPacket

    if (error.response) {
      errorPacket = error.response.data
    } else if (error.request) {
      errorPacket = { path: error.request._currentUrl }
    } else {
      errorPacket = error.message
    }

    return { clientError: errorPacket }
  }
}

module.exports = YoutubeClient
