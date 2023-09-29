const axios = require('axios');

require('dotenv').config();

class YoutubeClient {
    async request () {
        const youtube_endpoint = process.env.YOUTUBE_END_POINT;
        const APIKey = process.env.YOUTUBE_API_KEY;
        const kittenSearchQueries = 'part=snippet&maxResults=1&q=kittens&type=video&videoDuration=short'

        const response = await axios.get(`${youtube_endpoint}/search?${kittenSearchQueries}&key=${APIKey}`)
    };
};

module.exports = YoutubeClient;