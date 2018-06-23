// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FormState from './FormState';
import { Loader, Input, TextArea } from '.';
import { imgPropTypeShape } from './Img';
import { LoaderButton } from './Button';

const ContactForm = ({
  check,
  send,
  title,
  endpoint = '/contact',
  ...rest
}) => (
  <FormState endpoint={endpoint}>
    {({ handleChange, handleSubmit, state }) => (
      <ContactStyle
        id="contact"
        name="contact"
        onSubmit={handleSubmit}
        {...rest}
      >
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

        <LoaderButton
          loading={{ icon: <Loader />, children: <span>Working on it</span> }}
          normal={{ icon: send, children: <span>Reach Out to Me</span> }}
          state={state}
          success={{ icon: check, children: <span>All set!</span> }}
          type="submit"
          fullwidth
        />
      </ContactStyle>
    )}
  </FormState>
);

export default ContactForm;

ContactForm.propTypes = {
  check: imgPropTypeShape,
  send: imgPropTypeShape,
  title: PropTypes.string,
  endpoint: PropTypes.string,
};

ContactForm.assets = ['check.png', 'send.png'];

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
