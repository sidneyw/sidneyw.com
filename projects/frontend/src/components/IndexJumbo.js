// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ButtonLink, Jumbo } from './index';
import { Center } from './mixins';

const IndexJumboSection = ({ headshot }) => (
  <Jumbo img={headshot}>
    <IndexJumbo>
      <TagLine>I&apos;m Sidney,</TagLine>
      <TagLine>but they call me</TagLine>
      <Squid>Squid.</Squid>
      <TagLine>I build web solutions for</TagLine>
      <TagLine>clients just like you.</TagLine>
      <LearnMore href="#services" color="#ffbc3d">
        Let&apos;s Create Together
      </LearnMore>
      <TitleWrap>
        <h3>Web Consultant</h3>
      </TitleWrap>
    </IndexJumbo>
  </Jumbo>
);

IndexJumboSection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  headshot: PropTypes.object,
};

export default IndexJumboSection;

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

const IndexJumbo = styled('div')`
  ${Center} color: #fff;
  position: relative;
  flex-direction: column;
  height: 100%;
  width: 100%;

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
    padding-left: 10vw;

    h2,
    h3 {
      font-weight: 100;
    }
  }
`;

const LearnMore = styled(ButtonLink)`
  font-size: 1.2em;
  min-width: 50%;
  margin-top: 30px;

  // pure-md
  @media screen and (min-width: 48em) {
    min-width: 20%;
    margin-top: 20px;
  }

  //pure-lg
  @media screen and (min-width: 64em) {
    min-width: 20%;
  }
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  margin: 0 auto;
  bottom: 10px;

  h3 {
    font-size: 1.5em;
    font-family: 'Roboto Slab', serif;
    text-align: center;
  }

  // pure-sm
  @media screen and (min-width: 35.5em) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 80%;
  }
`;
