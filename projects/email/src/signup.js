const axios = require('axios');
const Config = require('@sidneyw/config');

const MailChimp = require('./modules/mailchimp');
const chimpSignup = require('./functions/chimp-signup');

const config = new Config({
  mailChimp: {
    init: conf => axios.create(conf.client),
    default: {
      list: process.env.MAILCHIMP_LIST,
      client: {
        baseURL: 'https://us12.api.mailchimp.com/3.0',
        auth: {
          username: process.env.MAILCHIMP_USER,
          password: process.env.MAILCHIMP_PASS
        }
      }
    }
  }
});

exports.handler = chimpSignup.bind(null, {
  chimpClient: new MailChimp(config.createClient('mailChimp')),
  list: config.get('mailChimp').list
});
