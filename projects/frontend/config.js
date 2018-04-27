const axios = require('axios');
const Config = require('@sidneyw/config');

module.exports = new Config({
  serverless: {
    init: conf => axios.create(conf.client),
    default: {
      client: {
        baseURL: '/localhost:3000',
      },
    },
    production: {
      client: {
        baseURL: process.env.SERVERLESS_URL,
      },
    },
  },
});
