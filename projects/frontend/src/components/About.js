// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import styled from 'styled-components';

import { BackgroundImg, BlueButton } from './index';

import ContactMe, { ContactMeMessage } from './ContactMe';
import FormBuilder from './FormBuilder';

import chauoanBlur from '../assets/chauoan-blur.png';
import chauoanShot from '../assets/chauoan-shot1.jpg';

export default () => (
  <About>
    <Section id="about" img={chauoanBlur}>
      <h3>get to know me</h3>
      <p>
        I’ve been passionate about the web since I began programming. The
        ability to go from a blank screen to an interactive web application
        gripped me early on and my fascination with the concept hasn’t faded.
      </p>
      <p>
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </p>
      <BlueButton fullwidth>Check out my blog</BlueButton>
    </Section>
    <CenterPiece img={chauoanShot} />
    <Section id="contact" img={chauoanBlur}>
      <FormBuilder
        endpoint="/contact-me"
        form={ContactMe}
        success={() => <ContactMeMessage success />}
        error={() => <ContactMeMessage success={false} />}
      />
    </Section>
  </About>
);

const Section = styled(BackgroundImg)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  padding: 10%;
  color: #fff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  h3 {
    text-align: center;
    text-transform: capitalize;
    font-size: 1.5em;
  }

  & > p {
    margin-top: 10px;
  }

  & > p:last-of-type {
    margin-bottom: 10px;
  }

  // pure-md
  @media screen and (min-width: 48em) {
    height: 100vh;
    width: 30vw;
    padding: 0 2.5%;
  }
`;

const CenterPiece = styled(BackgroundImg)`
  width: 100vw;
  height: 100vh;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);

  // pure-md
  @media screen and (min-width: 48em) {
    width: 40vw;
  }
`;

const About = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  width: 100vw;

  // pure-md
  @media screen and (min-width: 48em) {
    flex-flow: row nowrap;
  }
`;
