const FeelDB = require('../db/feel-database')
const Retriever = require('./retriever')
const YoutubeClient = require('../domain/services/youtube-client')
const YouTubeSearchResponse = require('../domain/services/youtube-search-response')

describe('Retriever', () => {
  it('Returns search result URL from client based on feel', () => {
    const feel = 'soothe',
          searchString = 'kittens',
          searchResultURL = 'http.irrelevant'

    FeelDB.getSearchStringOf = jest.fn(() => searchString)
    YouTubeSearchResponse.prototype.messageString = jest.fn(
      () => searchResultURL
      )
    const mockSearchVideo = YoutubeClient.searchVideo = jest.fn(
       () => new YouTubeSearchResponse()
      )
  
    const retriever = new Retriever(FeelDB,YoutubeClient)
    const result = retriever.clipFor(feel)

    expect(mockSearchVideo).toHaveBeenLastCalledWith(searchString)
    return expect(result).resolves.toBe(searchResultURL)
  })
})