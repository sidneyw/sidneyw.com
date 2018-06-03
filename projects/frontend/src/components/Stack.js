// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Center } from './mixins';

import {
  BackgroundImg,
  Heading,
  imgMatch,
  imgListPropType,
  imgPropType,
} from '.';

const StackSection = ({ stack, imgs }) => (
  <Stack id="stack">
    <Heading>A Stack for Scale</Heading>
    <p>
      Elit lorem non iure facere commodi, unde, unde, voluptatem dolorum
      consequatur. Quisquam obcaecati perspiciatis sunt ducimus beatae. Harum
      reiciendis officiis nam fugit perspiciatis. Dolores alias eos neque sit
      explicabo? Eaque. Elit lorem non iure facere commodi, unde, unde,
      voluptatem dolorum consequatur. Quisquam obcaecati perspiciatis sunt
      ducimus beatae. Harum reiciendis officiis nam fugit perspiciatis. Dolores
      alias eos neque sit explicabo? Eaque
    </p>
    <StackIconWrap>
      {stack.map(name => (
        <StackIcon title={name} img={imgMatch(imgs, name)} key={name} />
      ))}
    </StackIconWrap>
  </Stack>
);

StackSection.propTypes = {
  stack: PropTypes.arrayOf(PropTypes.string),
  imgs: imgListPropType,
};

export default StackSection;

const StackIcon = ({ title, img }) => (
  <Icon>
    <IconImg img={img} />
    <p>{title}</p>
  </Icon>
);

StackIcon.propTypes = {
  img: PropTypes.shape({
    sizes: imgPropType,
  }),
  title: PropTypes.string,
};

// ------------------------------------
// Styles
// ------------------------------------
const Stack = styled.section`
  ${Center} flex-flow: column wrap;
  padding: 5vh 0;
  h1 {
    width: 75%;
    margin-bottom: 15px;
    font-size: 1.5em;
  }

  & > p {
    font-size: 0.7em;
    width: 75%;
    margin-bottom: 2vh;
  }

  // pure-md
  @media screen and (min-width: 48em) {
    h1 {
      width: 100%;
      font-size: 3em;
    }

    p {
      font-size: 1em;
      width: 65%;
    }
  }
`;

const StackIconWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100vw;

  // pure-md
  @media screen and (min-width: 48em) {
    margin: 0 auto;
    width: 50vw;
    align-items: center;
  }
`;

const iconSize = 7;
const IconImg = styled(BackgroundImg)`
  width: ${iconSize}vh;
  height: ${iconSize}vh;
  background-size: cover;
  margin-right: 5px;
`;

const Icon = styled.div`
  padding: 10px;
  width: 40vw;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  text-transform: capitalize;

  border: 1px solid rgba(0, 0, 0, 0.2);
  // pure-md
  @media screen and (min-width: 48em) {
    width: initial;
  }

  p {
    max-width: 70%;
    font-weight: 400;
  }
`;
