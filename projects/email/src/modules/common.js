exports.bodyParser = event => {
  const contentType = event.headers['Content-Type'] || event.headers['content-type'];
  if (contentType && contentType.includes('application/json') && typeof event.body === 'string')
    // eslint-disable-next-line no-param-reassign
    event.body = JSON.parse(event.body);

  return event;
};

exports.response = obj =>
  Object.assign(
    {
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      }
    },
    obj
  );
