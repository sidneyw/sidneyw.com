// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

import { Card, Jumbo, imgPropType } from '..';
import { Center } from '../mixins';
import ContactForm from '../ContactForm';

const IndexJumboSection = ({ headshot, ...rest }) => (
  <IndexJumbo img={headshot}>
    <Introduction>
      <TagLine>I&apos;m Sidney,</TagLine>
      <TagLine>but they call me</TagLine>
      <Squid>Squid.</Squid>
      <TagLine>I build web solutions for</TagLine>
      <TagLine>clients just like you.</TagLine>
    </Introduction>
    <FormWrap>
      <ContactForm {...rest} />
    </FormWrap>
  </IndexJumbo>
);

IndexJumboSection.propTypes = {
  headshot: PropTypes.shape({ imgPropType }),
};

IndexJumboSection.assets = [...ContactForm.assets, 'headshot.jpg'];

export default IndexJumboSection;

const SlideInRight = keyframes`
  0% {
    transform: translateX(70vw);
  }

  60% {
    transform: translateX(-5vw);
  }

  100% {
    transform: translateX(0);
  }
`;

const SlideInStyle = css`
  animation: ${SlideInRight};
  animation-fill-mode: both;
  animation-duration: 500ms;
  animation-delay: 1s;
  animation-timing-function: ease;
`;

const IndexJumbo = styled(Jumbo)`
  ${Center} flex-direction: column;

  //pure-lg
  @media screen and (min-width: 64em) {
    justify-content: space-between;
    flex-direction: row;
  }
`;

const FormWrap = styled(Card)`
  ${SlideInStyle} justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 5vh 0;
  border-radius: 5px 0 0 5px;
  display: none;

  //pure-lg
  @media screen and (min-width: 64em) {
    display: flex;
    width: 40vw;
  }
  // pure-xl
  @media screen and (min-width: 80em) {
    width: 30vw;
  }
  form {
    width: 70%;
    color: #fff;
    text-shadow: 2px 2px 5px #333;
  }
`;

const Squid = styled.h1`
  font-size: 5.5em;
`;

const TagLine = styled.h2`
  text-align: center;
  font-family: 'Roboto Slab', serif;

  // pure-md
  @media screen and (min-width: 48em) {
    text-align: left;
  }
`;

const Introduction = styled.div`
  ${Center} color: #fff;
  position: relative;
  flex-direction: column;
  height: 100%;
  width: 50vw;

  h2,
  h3 {
    font-weight: 300;
  }

  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);

  & > * {
    margin-top: 10px;
  }

  // pure-md
  @media screen and (min-width: 48em) {
    align-items: flex-start;
    // padding-left: 10vw;

    h2,
    h3 {
      font-weight: 100;
    }
  }
`;
