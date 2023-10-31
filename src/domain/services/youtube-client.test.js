const nock = require('nock')
const searchResponse = require('../../../fixtures/youtube-kitten-search.json')
const YoutubeClient = require('./youtube-client')
const YouTubeSearchResponse = require('./youtube-search-response')
const BadClientResponse = require('./bad-client-response')

describe('youtube client', () => {
  it('calls youtube endpoint with passed search string & queries', async () => {
    const scope = setupGoodHttpMock()

    await client.searchVideo(searchString)

    expect(scope.isDone()).toBe(true)
  })

  it('Returns a response object with search result URL', async () => {
    const searchResultURL = 'https://www.youtube.com/watch?v=l3iIccjlgu4'
    setupGoodHttpMock()

    const response = await client.searchVideo(searchString)

    expect(response).toBeInstanceOf(YouTubeSearchResponse)
    expect(response.messageString()).toEqual(searchResultURL)
  })

  describe('Returns a bad response object' , () => {
    it('when axios replies with error', async () => {
      const errorObject = {
        response: { data: { error: { message: 'Invalid Key' } } }
      }
      setupErrorHttpMock(errorObject)

      const response = await client.searchVideo(searchString)

      expect(response).toBeInstanceOf(BadClientResponse)
      expect(response.messageString()).toMatch(/error: invalid key/i)
    })

    it('when axios request is bad', async () => {
      setupErrorHttpMock({ request: {} })

      const response = await client.searchVideo(searchString)

      expect(response).toBeInstanceOf(BadClientResponse)
      expect(response.messageString()).toMatch(/error: bad request/i)
    })
  })

  const setupGoodHttpMock = (statusCode = 200) => {
    return nock(process.env.YOUTUBE_END_POINT)
      .get('/search')
      .query(queries)
      .reply(statusCode, searchResponse)
  }

  const setupErrorHttpMock = (errorObject) => {
    return nock(process.env.YOUTUBE_END_POINT)
    .get('/search')
    .query(queries)
    .replyWithError(errorObject)
  }

  const client = new YoutubeClient(),
    searchString = 'kittens',
    queries = {
    part: 'snippet',
    maxResults: 1,
    q: searchString,
    type: 'video',
    videoDuration: 'short',
    key: process.env.YOUTUBE_API_KEY,
  }
})
