// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import styled from 'styled-components';

export const imgLinksPropType = PropTypes.shape({
  aspectRatio: PropTypes.number,
  base64: PropTypes.string,
  sizes: PropTypes.string,
  src: PropTypes.string,
  srcSet: PropTypes.string,
  srcSetWebp: PropTypes.string,
  srcWebp: PropTypes.string,
});

export const imgPropType = PropTypes.shape({
  fluid: imgLinksPropType,
  fixed: imgLinksPropType,
});

export const imgPropTypeShape = PropTypes.shape({
  childImageSharp: PropTypes.shape({
    fluid: imgLinksPropType,
    fixed: imgLinksPropType,
  }),
});

export const imgListPropType = PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        id: PropTypes.string,
        childImageSharp: PropTypes.shape(imgPropType),
      }),
    })
  ),
});

const BgWrap = styled.div`
  position: relative;
  // Make sure children display on top of the image
  & > * {
    z-index: 1;
  }
`;

export const BackgroundImg = ({ img, children, ...props }) => (
  <BgWrap {...props}>
    {img && (
      <Img
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
        }}
        {...img}
      />
    )}
    {children}
  </BgWrap>
);

BackgroundImg.propTypes = {
  img: PropTypes.shape({
    fluid: PropTypes.object,
    fixed: PropTypes.object,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  props: PropTypes.object,
  children: PropTypes.node,
};

export const Avatar = styled(Img)`
  border-radius: 2%;
  // margin-right: 0.5em;
  // height: 5rem;
  width: 10rem;
`;
