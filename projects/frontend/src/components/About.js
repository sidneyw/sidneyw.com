// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SplitSection, BackgroundImg, Loader, ImgPropType } from './index';

import ContactMe, { ContactMeMessage } from './ContactMe';
import FormBuilder from './FormBuilder';

const AboutSection = ({ chauoanShot, newyork }) => (
  <SplitSection>
    <CenterPiece img={chauoanShot} />
    <Section img={newyork} id="contact">
      <FormBuilder
        endpoint="/contact"
        form={ContactMe}
        pending={() => <Loader />}
        success={() => <ContactMeMessage success />}
        error={() => <ContactMeMessage success={false} />}
      />
    </Section>
  </SplitSection>
);

AboutSection.propTypes = {
  newyork: PropTypes.shape({ sizes: ImgPropType }),
  chauoanShot: PropTypes.shape({ sizes: ImgPropType }),
};

export default AboutSection;

const Section = styled(BackgroundImg)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  padding: 10%;
  color: #fff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);

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
    padding: 0 5%;
  }
`;

const CenterPiece = styled(BackgroundImg)`
  width: 100vw;
  height: 100vh;
  // box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);

  // pure-md
  @media screen and (min-width: 48em) {
    width: 40vw;
  }
`;
