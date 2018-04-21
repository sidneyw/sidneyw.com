const { bodyParser } = require('./modules/common');

async function contact({ mailClient, sender, recipient }, event) {
  try {
    bodyParser(event);

    if (event.httpMethod !== 'POST' || !event.body || !event.body.message || !event.body.name || !event.body.email) {
      return {
        statusCode: 400,
        body: ''
      };
    }

    await mailClient.sendEmail({
      to: recipient,
      from: `${event.body.name} <${sender}>`,
      subject: 'sidneyw.com - Contact Form',
      message: event.body.message,
      html: event.body.message // TODO: format html
    });

    return {
      statusCode: 200,
      body: 'Contact Form Recieved'
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: err.details || 'Internal Server Error'
    };
  }
}

module.exports = contact;
