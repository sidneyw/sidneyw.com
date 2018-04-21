const aws = require('aws-sdk');
const axios = require('axios');
const Config = require('@sidneyw/config');

const MailChimp = require('./modules/mailchimp');
const SimpleMailer = require('./modules/simple-mail');

const chimpSignup = require('./chimp-signup');
const contactMe = require('./contact-me');

const config = new Config({
  awsSES: {
    init: () => ({
      sendEmail(params) {
        const ses = new aws.SES();
        return new Promise((resolve, reject) => {
          // eslint-disable-next-line consistent-return
          ses.sendEmail(params, (err, res) => {
            if (err) return reject(err);

            resolve(res);
          });
        });
      }
    }),
    default: {
      params: {
        sender: process.env.AWS_SES_SENDER,
        recipient: process.env.AWS_SES_RECIPIENT
      }
    }
  },
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

exports.signup = chimpSignup.bind(null, {
  chimpClient: new MailChimp(config.createClient('mailChimp')),
  list: config.get('mailChimp').list
});

exports.contact = contactMe.bind(null, {
  ...config.get('awsSES').params,
  mailClient: new SimpleMailer(config.createClient('awsSES'))
});
