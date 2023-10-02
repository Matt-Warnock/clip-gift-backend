const axios = require("axios");
const YouTubeServiceResponse = require("./youtube-service-response");
require("dotenv").config();

class YoutubeClient {
  #searchEndpoint;
  #aPIKey;

  constructor() {
    this.#searchEndpoint = `${process.env.YOUTUBE_END_POINT}/search`;
    this.#aPIKey = process.env.YOUTUBE_API_KEY;
  }

  async searchVideo(searchString) {
    const queries = {
      part: "snippet",
      maxResults: 1,
      q: searchString,
      type: "video",
      videoDuration: "short",
      key: this.#aPIKey,
    };


    const response = await axios.get(this.#searchEndpoint, { params: queries });
    const searchResult = response.data.items[0];

    return new YouTubeServiceResponse(searchResult);
  }
}

module.exports = YoutubeClient;
