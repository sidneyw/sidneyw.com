const axios = require('axios');
const aws = require('aws-sdk');

const config = {
  awsSES: {
    init: config => {
      const ses = new aws.SES(config.auth);
      return {
        sendEmail(params) {
          return new Promise((resolve, reject) => {
            ses.sendEmail(params, (err, res) => {
              if (err) return reject(err);

              resolve(res);
            });
          });
        },
      };
    },
    default: {
      auth: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
        secret: process.env.MY_AWS_SECRET_ACCESS_KEY,
        region: process.env.MY_AWS_REGION,
      },
      params: {
        sender: process.env.AWS_SES_SENDER,
        recipient: process.env.AWS_SES_RECIPIENT,
      },
    },
  },
  mailChimp: {
    init: conf => axios.create(conf.client),
    default: {
      list: process.env.MAILCHIMP_LIST,
      client: {
        baseURL: 'https://us12.api.mailchimp.com/3.0',
        responseType: 'json',
        auth: {
          username: process.env.MAILCHIMP_USER,
          password: process.env.MAILCHIMP_PASS,
        },
      },
    },
  },
  serverless: {
    init: conf => axios.create(conf.client),
    default: {
      client: {
        baseURL: '/localhost:9000',
      },
    },
    production: {
      client: {
        baseURL: '/.netlify/functions/',
      },
    },
  },
};

class Config {
  constructor(configuration) {
    this._configuration = configuration;
    this._env = process.env.NODE_ENV;
  }

  get(key) {
    let conf;
    const defaultConf = this._configuration[key].default;
    const envConf = this._configuration[key][this._env];

    return Object.assign({}, defaultConf, envConf);
  }

  createClient(key) {
    const clientConf = this._configuration[key];

    return clientConf.init(this.get(key));
  }
}

module.exports = new Config(config);
