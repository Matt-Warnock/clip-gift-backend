const YoutubeClient = require('./youtube-client');
const nock = require('nock');

describe('youtube client', () => {
    it('calls to the youtube endpoint with kitten search queries', async () => {
        const endpoint = process.env.YOUTUBE_END_POINT
        const APIKey = process.env.YOUTUBE_API_KEY
        const kittenSearchQueries = {
            part: 'snippet',
            maxResults: 1,
            q: 'kittens',
            type: 'video',
            videoDuration: 'short',
            key: APIKey
        }

        const scope = nock(endpoint)
        .get('/search')
        .query(kittenSearchQueries)
        .reply(200);


        const client = new YoutubeClient;
        await client.request();

        expect(scope.isDone()).toBe(true);
    })
})