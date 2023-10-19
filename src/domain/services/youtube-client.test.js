const nock = require("nock");
const searchResponse = require("../../../fixtures/youtube-kitten-search.json");
const YoutubeClient = require("./youtube-client");
const YouTubeSearchResponse = require("./youtube-search-response");
const BadClientResponse = require("./bad-client-response");

describe("youtube client", () => {
  const client = new YoutubeClient(),
    searchString = "kittens";

  it("calls youtube endpoint with passed search string & queries", async () => {
    const scope = setupHttpMock();

    await client.searchVideo(searchString);

    expect(scope.isDone()).toBe(true);
  });

  it("Returns a response object with search result URL", async () => {
    const searchResultURL = 'https://www.youtube.com/watch?v=l3iIccjlgu4';
    setupHttpMock();

    const response = await client.searchVideo(searchString);

    expect(response).toBeInstanceOf(YouTubeSearchResponse);
    expect(response.messageString()).toEqual(searchResultURL);
  });

  it("Returns a bad response object when axios response is not 200", async () => {
    setupHttpMock(400);

    const response = await client.searchVideo(searchString);

    expect(response).toBeInstanceOf(BadClientResponse);
    expect(response.messageString()).toMatch(/error/i);
  });

  const setupHttpMock = (statusCode = 200) => {
    const queries = {
      part: "snippet",
      maxResults: 1,
      q: searchString,
      type: "video",
      videoDuration: "short",
      key: process.env.YOUTUBE_API_KEY,
    };

    return nock(process.env.YOUTUBE_END_POINT)
      .get("/search")
      .query(queries)
      .reply(statusCode, searchResponse);
  };
});
