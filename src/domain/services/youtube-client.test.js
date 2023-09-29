const YoutubeClient = require("./youtube-client");
const nock = require("nock");

describe("youtube client", () => {
  const endpoint = process.env.YOUTUBE_END_POINT;
  const aPIKey = process.env.YOUTUBE_API_KEY;

  it("calls youtube endpoint with passed search string & queries", async () => {
    const searchString = 'kittens';
    const queries = {
      part: 'snippet',
      maxResults: 1,
      q: searchString,
      type: 'video',
      videoDuration: 'short',
      key: aPIKey,
    };

    const scope = nock(endpoint)
      .get('/search')
      .query(queries)
      .reply(200);

    const client = new YoutubeClient();
    await client.searchVideo(searchString);

    expect(scope.isDone()).toBe(true);
  });
});
