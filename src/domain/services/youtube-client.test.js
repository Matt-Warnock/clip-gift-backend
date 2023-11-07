const httpMocks = require('../helpers/http-mocks')
const YoutubeClient = require('./youtube-client')
const YouTubeSearchResponse = require('./youtube-search-response')
const BadClientResponse = require('./bad-client-response')

describe('youtube client', () => {
  jest.mock('../../utility/error-handler')
  const ErrorHandler = require('../../utility/error-handler')

  const client = new YoutubeClient(new ErrorHandler())
  const searchString = 'kittens'

  it('calls youtube endpoint with passed search string & queries', async () => {
    const scope = httpMocks.setupGoodHttpMock()

    await client.searchVideo(searchString)

    expect(scope.isDone()).toBe(true)
  })

  it('Returns a response object with search result URL', async () => {
    const searchResultURL = 'https://www.youtube.com/watch?v=l3iIccjlgu4'
    httpMocks.setupGoodHttpMock()

    const response = await client.searchVideo(searchString)

    expect(response).toBeInstanceOf(YouTubeSearchResponse)
    expect(response.messageString()).toEqual(searchResultURL)
  })

  describe('When axios response is an error', () => {
    const errorObject = {
      response: { data: { error: { message: 'Invalid Key' } } }
    }

    beforeEach(() => {
      httpMocks.setupErrorHttpMock(errorObject)
    })

    it('Returns a bad response object with empty string', async () => {
      const response = await client.searchVideo(searchString)

      expect(response).toBeInstanceOf(BadClientResponse)
      expect(response.messageString()).toBe('')
    })

    it('Passes client error to error handler', async () => {
      const errorPacket = { clientError: errorObject.response.data }
      const spy = jest.spyOn(ErrorHandler.prototype, 'log')

      await client.searchVideo(searchString)

      expect(spy).toHaveBeenCalledWith(errorPacket)
    })
  })

  describe('When axios request is bad' , () => {
    const path = 'https://www.youtube_endpoint/search?part=snippet&maxResults=1&q=kittens&type=video&videoDuration=short&key=youtube_key'
    const errorObject = { request: { path: path } }
  
    beforeEach(() => {
      httpMocks.setupErrorHttpMock(errorObject)
    })

    it('Returns a bad response object with empty string', async () => {
      const response = await client.searchVideo(searchString)

      expect(response).toBeInstanceOf(BadClientResponse)
      expect(response.messageString()).toBe('')
    })

    it('Passes client error to error handler', async () => {
      const errorPacket = { clientError: errorObject.request }
      const spy = jest.spyOn(ErrorHandler.prototype, 'log')

      await client.searchVideo(searchString)

      expect(spy).toHaveBeenCalledWith(errorPacket)
    })
  })
})
