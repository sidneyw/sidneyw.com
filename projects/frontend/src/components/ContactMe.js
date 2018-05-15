// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BlueButton, Input, TextArea } from './index';

const ContactMe = ({ handleSubmit, handleChange, state }) => (
  <ContactStyle id="contact" name="contact" onSubmit={handleSubmit}>
    <h3>what are you waiting for?</h3>
    <Input
      onChange={handleChange}
      value={state.name}
      title="Name"
      name="name"
      placeholder="Sidney"
      required
    />

    <Input
      onChange={handleChange}
      value={state.email}
      title="Email"
      name="email"
      placeholder="sidthesquid@email.com"
      required
    />

    <TextArea
      onChange={handleChange}
      value={state.message}
      title="Message"
      name="message"
      required
    />

    <BlueButton type="submit" fullwidth>
      Book Me Now
    </BlueButton>
  </ContactStyle>
);

ContactMe.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  state: PropTypes.object,
};

export default ContactMe;

const ContactMeMessage = ({ success = true }) => (
  <div style={{ textAlign: 'center' }}>
    {success
      ? "I've received your message and will get back to you shortly"
      : 'There seems to have been a problem. Please try again soon'}
  </div>
);

ContactMeMessage.propTypes = {
  success: PropTypes.bool,
};

export { ContactMeMessage };

const ContactStyle = styled.form`
  width: 100%;

  & > * {
    margin-top: 10px;
  }

  p {
    font-weight: 100;
  }

  input,
  textarea {
    width: 100%;
  }

  textarea {
    min-height: 20vh;
  }
`;
