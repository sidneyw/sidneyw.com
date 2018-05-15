// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Banner, Button, Input, Loader } from '../components';
import FormBuilder from './FormBuilder';

const NewsLetterJoin = ({ handleChange, handleSubmit, state }) => (
  <React.Fragment>
    <p>Join my email list for updates and cool stuff</p>
    <form name="email-list" id="email-list" onSubmit={handleSubmit}>
      <Input
        onChange={handleChange}
        value={state.email}
        name="email"
        type="email"
        placeholder="someone@mail.com"
        required
      />
      <Button type="submit">Join</Button>
    </form>
  </React.Fragment>
);

NewsLetterJoin.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  state: PropTypes.object,
};

const NewsLetterSuccess = () => <div>Thanks for joining!</div>;

const NewsLetterFail = () => (
  <div>Something went wrong on my end. Try again later</div>
);

export default () => (
  <NewsLetterStyles>
    <FormBuilder
      endpoint="/signup"
      form={NewsLetterJoin}
      pending={() => <Loader />}
      success={NewsLetterSuccess}
      error={NewsLetterFail}
    />
  </NewsLetterStyles>
);

const NewsLetterStyles = styled(Banner)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 40px;

  p {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    width: 75%;

    & > * {
      height: 5vh;
      width: 100%;
    }

    div {
      height: 100%;
      min-width: 20vw;
    }

    button {
      padding: 0;
      margin-top: 10px;
    }

    // pure-md
    @media screen and (min-width: 48em) {
      flex-direction: row;
      justify-content: center;
      width: 50%;
      max-width: 400px;

      div {
        input {
          text-align: right;
        }

        width: 70%;
      }

      button {
        margin-top: 0;
        margin-left: 5px;
        width: 20%;
      }
    }
  }
`;
