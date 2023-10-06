const ServiceResponse = require('./service-response');

class YouTubeSearchResponse extends ServiceResponse {
  constructor(response) {
    super(response);
  }

  responseIsGood() {
    return true;
  }

  getResponseData() {
    return this.response.data.items[0];
  }
}

module.exports = YouTubeSearchResponse;