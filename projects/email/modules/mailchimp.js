const crypto = require('crypto');

const md5 = str =>
  crypto
    .createHash('md5')
    .update(str)
    .digest('hex');

const listEndpoint = (list, email) => `/lists/${list}/members/${email ? md5(email) : ''}`;

class MailChimp {
  constructor(client) {
    this.client = client;
  }

  async isInChimpList(list, email) {
    let data;
    try {
      const { data: resData } = await this.client.get(listEndpoint(list, email));
      data = resData;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return false;
      }

      // We don't know what went wrong in this case
      throw err;
    }

    return data.status === 'subscribed' || data.status === 'pending';
  }

  async subscribeToList(list, email) {
    if (!list || !email) {
      throw new Error('List and email are required');
    }

    const emailExists = await this.isInChimpList(list, email);
    if (emailExists) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    return this.client.post(listEndpoint(list), {
      emailaddress: email,
      status: 'subscribed'
    });
  }
}

module.exports = MailChimp;
