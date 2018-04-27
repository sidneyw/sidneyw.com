const aws = require('aws-sdk');
const Config = require('@sidneyw/config');
const SimpleMailer = require('./modules/simple-mail');

const contactMe = require('./functions/contact-me');

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
  }
});

exports.handler = contactMe.bind(null, {
  ...config.get('awsSES').params,
  mailClient: new SimpleMailer(config.createClient('awsSES'))
});
