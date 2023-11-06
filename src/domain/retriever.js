class Retriever {
  #database
  #youtubeClient

  constructor(database, youtubeClient) {
    this.#database = database
    this.#youtubeClient = youtubeClient
  }

  async clipFor(feelString) {
    const searchString = this.#database.getSearchStringOf(feelString)
    const clientResponse = await this.#youtubeClient.searchVideo(searchString)

    return clientResponse.messageString()
  }
}

module.exports = Retriever