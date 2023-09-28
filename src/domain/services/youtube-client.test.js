const YoutubeClient = require('./youtube-client');
const nock = require('nock');

describe('youtube client', () => {
    it('calls to the youtube endpoint', async () => {
        const endpoint = process.env.YOUTUBE_END_POINT
        const scope = nock(endpoint).get('/').reply(200);

        const client = new YoutubeClient;
        await client.request();

        expect(scope.isDone()).toBe(true);
    })
})