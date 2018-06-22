// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import styled from 'styled-components';

export const imgPropType = PropTypes.shape({
  aspectRatio: PropTypes.number,
  base64: PropTypes.string,
  sizes: PropTypes.string,
  src: PropTypes.string,
  srcSet: PropTypes.string,
  srcSetWebp: PropTypes.string,
  srcWebp: PropTypes.string,
});

export const imgPropTypeShape = PropTypes.shape({ sizes: imgPropType });

export const imgListPropType = PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        id: PropTypes.string,
        sizes: imgPropType,
      }),
    })
  ),
});

export const mergeByImgProps = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    img: imgPropTypeShape,
  })
);

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
    resolutions: PropTypes.object,
    sizes: PropTypes.object,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  props: PropTypes.object,
  children: PropTypes.node,
};

export const Avatar = styled(Img)`
  border-radius: 100%;
  margin-right: 0.5em;
  height: 5vh;
  width: 5vh;
`;

export const createAssetIdx = (...args) =>
  args.reduce((accum, curr) => {
    curr.edges.forEach(asset => {
      const pathComponents = asset.node.id.split(' ')[0].split('/');
      const file = pathComponents[pathComponents.length - 1];

      accum[file] = asset.node;
    });

    return accum;
  }, Object.create(null));

export const matchAssets = (assetIdx, componentAssets) =>
  componentAssets.reduce((accum, assetFileName) => {
    const propName = assetFileName.split('.')[0];
    accum[propName] = assetIdx[assetFileName];

    return accum;
  }, Object.create(null));

const getExt = (getField, props) => {
  const list = getField(props).split('.');
  return list.length > 1 ? '' : '.png';
};

export const mergeBy = (assetIdx, properties, getField = obj => obj.name) =>
  properties.map(props => ({
    ...props,
    img: assetIdx[`${getField(props)}${getExt(getField, props)}`],
  }));
