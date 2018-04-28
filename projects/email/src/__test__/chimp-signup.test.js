const signup = require('../functions/chimp-signup');
const MailChimp = require('../modules/mailchimp');

describe('Chimp Signup', () => {
  let chimpClient;
  let event;
  let list;

  beforeEach(() => {
    event = {
      httpMethod: 'POST',
      body: {
        email: 'sidney@mail.com'
      },
      headers: {
        'content-type': 'application/json'
      }
    };

    const mockGet = jest.fn();
    mockGet.mockReturnValue({ data: { status: 'not in list' } });

    chimpClient = new MailChimp({
      get: async () => mockGet(),
      post: async () => jest.fn()
    });

    list = 'test';
  });

  test('signs up user not in list', async () => {
    const { statusCode } = await signup({ chimpClient, list }, event);
    expect(statusCode).toBe(200);
  });

  test("doesn't sign up user already in list", async () => {
    const mockGet = jest.fn();
    mockGet.mockReturnValue({ data: { status: 'pending' } });

    chimpClient = new MailChimp({
      get: async () => mockGet(),
      post: async () => jest.fn()
    });

    const { statusCode } = await signup({ chimpClient, list }, event);
    expect(statusCode).toBe(409);
  });

  test('errors with invalid params', async () => {
    // Null event body - should contain email field
    const errorEvent = Object.assign({}, event, { body: null });

    const { statusCode, body } = await signup({ chimpClient, list }, errorEvent);
    expect(statusCode).toBe(400);
    expect(body).toBe('');
  });
});
