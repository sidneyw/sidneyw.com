class SimpleMailer {
  constructor(client) {
    this.client = client;
  }

  async sendEmail({ to, from, subject, message, html } = {}) {
    const params = {
      Source: from,
      Destination: {
        ToAddresses: [to]
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8'
        },
        Body: {
          Text: {
            Data: message,
            Charset: 'UTF-8'
          },
          Html: {
            Data: html,
            Charset: 'UTF-8'
          }
        }
      }
    };

    return this.client.sendEmail(params);
  }
}

module.exports = SimpleMailer;
