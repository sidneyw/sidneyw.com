// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';

const SocialIconStyle = styled.a`
  transition: all 200ms ease;

  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.14))
    drop-shadow(0 1px 5px rgba(0, 0, 0, 0.12));

  &:hover {
    transform: scale(1.1);
  }
`;

const SocialImg = styled(Img)`
  height: 100%;
  width: 100%;
  margin: 0;
  border-radius: 20%;
`;

const SocialIcon = ({ name = '', img, ...props }) => (
  <SocialIconStyle {...props}>
    <SocialImg alt={name} {...img} />
  </SocialIconStyle>
);

SocialIcon.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  img: PropTypes.object,
  link: PropTypes.string,
  name: PropTypes.string,
};

export default SocialIcon;
