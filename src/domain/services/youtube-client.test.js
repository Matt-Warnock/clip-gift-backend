const YoutubeClient = require("./youtube-client");
const nock = require("nock");

describe("youtube client", () => {
  const client = new YoutubeClient(),
    endpoint = process.env.YOUTUBE_END_POINT,
    aPIKey = process.env.YOUTUBE_API_KEY,
    searchString = "kittens",
    queries = {
      part: "snippet",
      maxResults: 1,
      q: searchString,
      type: "video",
      videoDuration: "short",
      key: aPIKey,
    };

  it("calls youtube endpoint with passed search string & queries", async () => {
    const scope = nock(endpoint).get("/search").query(queries).reply(200);

    await client.searchVideo(searchString);

    expect(scope.isDone()).toBe(true);
  });
});
