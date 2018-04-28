exports.bodyParser = event => {
  const contentType = event.headers['Content-Type'] || event.headers['content-type'];
  if (contentType && contentType.includes('application/json') && typeof event.body === 'string')
    // eslint-disable-next-line no-param-reassign
    event.body = JSON.parse(event.body);

  return event;
};
