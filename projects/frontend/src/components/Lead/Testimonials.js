// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BackgroundImg, Card } from '..';
import { ZDepth1 } from '../mixins';

import Asilah from '../../assets/asilah.jpg';
import Nicole from '../../assets/nicole.png';

export default () => (
  <Testimonials img={Asilah}>
    <Testimonial
      img={Nicole}
      name="Nicole"
      text="Sidney was amazing. He was the most professional freelancer I’ve ever worked with. Definitely, worth your time and money!"
    />
  </Testimonials>
);

const Testimonial = ({ img, name, text }) => (
  <Tstyle>
    <Quote>&qoute;</Quote>
    <p>{text}</p>
    <Name>
      <img src={img} alt="" />
      <span>{name}</span>
    </Name>
  </Tstyle>
);

Testimonial.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
};

const Testimonials = styled(BackgroundImg)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;

const Tstyle = styled(Card)`
  border-radius: 5px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 90%;

  p {
    padding: 10px 20px 60px 20px;
    font-weight: 200;
    font-size: 1.2em;
  }

  img {
    ${ZDepth1} border-radius: 100%;
    max-height: 100px;
    margin-top: -50px;
  }

  // pure-md
  @media screen and (min-width: 48em) {
    width: 50%;
  }

  //pure-lg
  @media screen and (min-width: 64em) {
    width: 30%;
  }
`;

const Quote = styled.span`
  position: absolute;
  opacity: 0.1;
  top: -15%;
  left: 10%;
  font-size: 10em;
  font-family: cursive;
`;

const Name = styled.div`
  border-radius: 0 0 5px 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  // background-color: #1D69B2;
  background-color: #ccc6ba;
  background-color: #ffbc3d;
  font-weight: 400;
  font-size: 1.5em;
  color: #fff;
  width: 100%;

  & > span {
    margin: 15px 0;
  }
`;
