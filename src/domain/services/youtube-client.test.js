const httpMocks = require('../helpers/http-mocks')
const YoutubeClient = require('./youtube-client')
const YouTubeSearchResponse = require('./youtube-search-response')
const BadClientResponse = require('./bad-client-response')

describe('youtube client', () => {
  const client = new YoutubeClient()
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

  describe('Returns a bad response object' , () => {
    beforeEach(() => {
      jest.spyOn(console, 'log').mockImplementation(() => {})
    })
    
    it('when axios replies with error', async () => {
      const errorObject = {
        response: { data: { error: { message: 'Invalid Key' } } }
      }
      httpMocks.setupErrorHttpMock(errorObject)

      const response = await client.searchVideo(searchString)

      expect(response).toBeInstanceOf(BadClientResponse)
      expect(response.messageString()).toMatch(/error: invalid key/i)
    })

    it('when axios request is bad', async () => {
      httpMocks.setupErrorHttpMock({ request: {} })

      const response = await client.searchVideo(searchString)

      expect(response).toBeInstanceOf(BadClientResponse)
      expect(response.messageString()).toMatch(/error: bad request/i)
    })
  })
})
