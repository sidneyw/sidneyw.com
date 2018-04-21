const contact = require('../contact-me');
const SimpleMailer = require('../modules/simple-mail');

describe('Contact Form', () => {
  let mailClient;
  let mockSend;
  let event;
  let sender;
  let recipient;

  beforeEach(() => {
    event = {
      httpMethod: 'POST',
      body: {
        email: 'testemail@mail.com',
        message: "Let's work together",
        name: 'Test User'
      },
      headers: {
        'content-type': 'application/json'
      }
    };

    sender = 'sidney.sender@test.com';
    recipient = 'sidney.recipient@test.com';

    mockSend = jest.fn();
    mockSend.mockReturnValue({ MessageId: 'test-msg-id' });

    mailClient = new SimpleMailer({
      async sendEmail(params) {
        return mockSend(params);
      }
    });
  });

  test('Sends an email', async () => {
    const { statusCode, body } = await contact({ mailClient, sender, recipient }, event);

    expect(statusCode).toBe(200);
    expect(body).toBe('Contact Form Recieved');
    expect(mockSend.mock.calls).toMatchSnapshot();
  });

  test('Errors if event is missing field', async () => {
    delete event.body.name;

    const { statusCode } = await contact({ mailClient, sender, recipient }, event);
    expect(statusCode).toBe(400);
  });

  test('Returns 500 if email fails', async () => {
    mailClient = new SimpleMailer({
      async sendEmail() {
        throw new Error('Oops');
      }
    });

    const { statusCode, body } = await contact({ mailClient, sender, recipient }, event);
    expect(statusCode).toBe(500);
    expect(body).toBe('Internal Server Error');
  });
});
