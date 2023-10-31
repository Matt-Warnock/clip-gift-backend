const nock = require('nock'),
  searchResponse = require('../../../fixtures/youtube-kitten-search.json'),
  queries = {
    part: 'snippet',
    maxResults: 1,
    q: 'kittens',
    type: 'video',
    videoDuration: 'short',
    key: process.env.YOUTUBE_API_KEY,
  }

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

module.exports = { setupErrorHttpMock, setupGoodHttpMock }