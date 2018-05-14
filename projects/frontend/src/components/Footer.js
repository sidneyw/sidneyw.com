// TODO: Change the siteMetadata format - 04/24/18 21:01:19 sidneywijngaarde
/* eslint-disable */
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SocialIcon from './SocialIcon';

const FooterSection = ({ socialIcons }) => (
  <Footer>
    <h1>Sidney Wijngaarde</h1>
    <SocialIconWrap>
      {socialIcons.map((social, ind) => (
        <SocialIcon {...social} key={social.name} />
      ))}
    </SocialIconWrap>
  </Footer>
);

FooterSection.propTypes = {
  socialIcons: PropTypes.array,
};

export default FooterSection;

const Footer = styled.footer`
  min-height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 2.5vw;

  flex-flow: column wrap;

  h1 {
    text-align: center;
    opacity: 0.2;
    width: 100%;
    margin-bottom: 10px;
    font-family: 'Roboto Slab', serif;
  }

  // pure-md
  @media screen and (min-width: 48em) {
  }
`;

const SocialIconWrap = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & > a {
    height: 8vh;
    width: 8vh;
  }

  // pure-md
  @media screen and (min-width: 48em) {
    width: 50%;
  }

  //pure-lg
  @media screen and (min-width: 64em) {
    width: 35%;
  }
`;
