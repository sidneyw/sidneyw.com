// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { imgPropType } from './Img';

const SocialIconStyle = styled.a`
  transition: all 200ms ease;

  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.14))
    drop-shadow(0 1px 5px rgba(0, 0, 0, 0.12));

  &:hover {
    transform: scale(1.1);
  }
`;

const SocialImg = styled(Img)`
  height: 3rem;
  width: 3rem;
  margin-right: 5px;
  &:last-of-type {
    margin-right: 0;
  }
`;

const SocialIcon = ({ name = '', img, ...props }) => (
  <SocialIconStyle {...props}>
    <SocialImg alt={name} {...img} />
  </SocialIconStyle>
);

SocialIcon.propTypes = {
  img: PropTypes.shape({ sizes: imgPropType }),
  name: PropTypes.string,
};

export const PropType = PropTypes.shape({
  img: PropTypes.shape({ sizes: imgPropType }),
  name: PropTypes.string,
});

export default SocialIcon;
