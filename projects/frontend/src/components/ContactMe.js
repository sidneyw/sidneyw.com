// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { STATE_ENUM } from './FormState';
import { UnifiedButton, Loader, Input, TextArea } from './index';

const LoaderMargin = styled(Loader)`
  margin-right: 0.8rem;
`;

const ContactButton = styled(UnifiedButton)`
  margin: 0 auto;
  padding: 1rem;
`;

const getContent = ({ state, loader, check, send }) => {
  switch (state.submitted) {
    case STATE_ENUM.PENDING:
      return {
        children: (
          <React.Fragment>
            <LoaderMargin />
            <span>Working on it</span>
          </React.Fragment>
        ),
        disabled: true,
        icon: loader,
      };

    case STATE_ENUM.SUCCESS:
      return {
        children: "I've received your message",
        disabled: true,
        icon: check,
      };

    // case STATE_ENUM.ERROR:
    //   return { icon: error, children: 'Oops something went wrong' };

    default:
      return { icon: send, children: 'Contact me' };
  }
};

const ContactMe = ({ handleSubmit, handleChange, state, title, ...rest }) => (
  <ContactStyle id="contact" name="contact" onSubmit={handleSubmit} {...rest}>
    <h3>{title}</h3>
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
    <ContactButton {...getContent({ state, ...rest })} type="submit" />
  </ContactStyle>
);

ContactMe.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  state: PropTypes.object,
  title: PropTypes.string,
};

export default ContactMe;

const ContactStyle = styled.form`
  width: 100%;
  h3 {
    font-size: 1.5em;
    text-align: center;
  }

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
