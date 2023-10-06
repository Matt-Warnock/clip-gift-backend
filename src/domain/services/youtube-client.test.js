const nock = require("nock");
const searchResponse = require("../../../fixtures/youtube-kitten-search.json");
const YoutubeClient = require("./youtube-client");
const YouTubeServiceResponse = require("./youtube-search-response");
const BadServiceResponse = require("./bad-service-response");

describe("youtube client", () => {
  const client = new YoutubeClient(),
    searchString = "kittens";

  it("calls youtube endpoint with passed search string & queries", async () => {
    const scope = setupHttpMock();

    await client.searchVideo(searchString);

    expect(scope.isDone()).toBe(true);
  });

  it("Returns a response object with search result", async () => {
    const searchResult = searchResponse.items[0];
    setupHttpMock();

    const response = await client.searchVideo(searchString);

    expect(response).toBeInstanceOf(YouTubeServiceResponse);
    expect(response.getResponseData()).toEqual(searchResult);
  });

  it("Returns a bad response object when response is not 200", async () => {
    setupHttpMock(400);

    const response = await client.searchVideo(searchString);

    expect(response).toBeInstanceOf(BadServiceResponse);
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
