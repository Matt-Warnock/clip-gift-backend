class YouTubeServiceResponse {
  #searchResult;

  constructor(searchResult) {
    this.#searchResult = searchResult;
  }

  getSearchResult() {
    return this.#searchResult;
  }
}

module.exports = YouTubeServiceResponse;