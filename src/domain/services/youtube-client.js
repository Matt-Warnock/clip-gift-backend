const axios = require('axios');

require('dotenv').config();

class YoutubeClient {
    async request () {
        const youtube_endpoint = process.env.YOUTUBE_END_POINT;

        const response = await axios.get(`${youtube_endpoint}/`)
    };
};

module.exports = YoutubeClient;