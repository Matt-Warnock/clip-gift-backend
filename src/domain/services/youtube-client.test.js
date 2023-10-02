const nock = require("nock");
const searchResponse = require("../../../fixtures/youtube-kitten-search.json");
const YoutubeClient = require("./youtube-client");
const YouTubeServiceResponse = require("./youtube-service-response");

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
    expect(response.getSearchResult()).toEqual(searchResult);
  });

  const setupHttpMock = () => {
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
      .reply(200, searchResponse);
  };
});
