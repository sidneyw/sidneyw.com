// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Center } from './mixins';

const SocialIconStyle = styled.a`
  ${Center} width: 20%;
  padding: 10px 5px;
  height: 8vh;
  transition: all 200ms ease;

  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.14))
    drop-shadow(0 1px 5px rgba(0, 0, 0, 0.12));

  :hover {
    transform: scale(1.1);
  }

  img {
    height: 100%;
    border-radius: 5px;
  }
`;

const SocialIcon = ({ link, img }) => (
  <SocialIconStyle href={link}>
    <img src={img} alt="" />
  </SocialIconStyle>
);

SocialIcon.propTypes = {
  link: PropTypes.string,
  img: PropTypes.string,
};

export default SocialIcon;
