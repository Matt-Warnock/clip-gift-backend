const httpMocks = require('../helpers/http-mocks')
const Retriever = require('../retriever.js')
const YoutubeClient = require('../services/youtube-client.js')

describe('Retriever', () => {
  it('Retrieves a youtube clip url based on soothe feel', () => {
    httpMocks.setupGoodHttpMock()

    const feelDB = { soothe: 'kittens' }
    const retriever = new Retriever(feelDB, new YoutubeClient())
    const youtubeClipURL = retriever.clipFor('soothe')

    expect(youtubeClipURL).toMatch('https://www.youtube.com/watch?v=l3iIccjlgu4')
  })
})