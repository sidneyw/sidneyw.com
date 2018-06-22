// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Img from 'gatsby-image';
import { imgPropTypeShape } from '../Img';

const TagImg = styled(Img)`
  height: 0.6rem;
  width: 0.7rem;
  max-height: 1.5rem;
  margin-right: 0.2rem;
`;

const TagStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  padding: 0.3rem 0.5rem;
  font-size: 0.8em;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 0.5rem;
`;

const Tag = ({ icon, children }) => (
  <TagStyle>
    <TagImg {...icon} />
    {children}
  </TagStyle>
);

Tag.propTypes = {
  icon: imgPropTypeShape,
  children: PropTypes.node,
};

export default Tag;
