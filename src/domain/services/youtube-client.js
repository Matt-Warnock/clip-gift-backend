const axios = require('axios')
const YouTubeSearchResponse = require('./youtube-search-response')
const BadClientResponse = require('./bad-client-response')
require('dotenv').config()

class YoutubeClient {
  #searchEndpoint
  #aPIKey

  constructor() {
    this.#searchEndpoint = `${process.env.YOUTUBE_END_POINT}/search`
    this.#aPIKey = process.env.YOUTUBE_API_KEY
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
      return new BadClientResponse(error)
    }
  }
}

module.exports = YoutubeClient
