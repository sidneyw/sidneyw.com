// ------------------------------------
// Generic Style Components
// ------------------------------------

// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import styled, { css, keyframes } from 'styled-components';

import { Center, Rounded, ZDepth1, ZDepth3 } from './mixins';

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

export const Banner = styled.section`
  display: flex;
  color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 10vh;
  background-color: ${({ theme }) => theme.primary};
`;

export const Card = styled.div`
  ${ZDepth1} background-color: #fff;

  transition: all 200ms ease;
  ${({ hover }) =>
    hover &&
    css`
      &:hover {
        ${ZDepth3};
      }
    `};
`;

export const Darken = styled.div`
  color: #fff;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, ${({ percent }) => percent || 0.2});
`;

export const Heading = styled.h1`
  text-align: center;
  font-size: 3em;
`;

export const formFieldStyle = css`
  border: none;
  ${Rounded} ${ZDepth1} padding: 0.5rem 1rem;
  font-size: 1em;
  min-height: 5vh;
  max-height: 2em;
  width: 100%;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  input,
  textarea {
    ${formFieldStyle};
  }
`;

const IconButton = ({ img, ...props }) => (
  <IconButtonStyle {...props}>
    <Icon {...img} />
  </IconButtonStyle>
);

IconButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  img: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  props: PropTypes.object,
};

const IconButtonStyle = styled.button`
  ${Center} background-color: transparent;
  height: 5vh;
  width: 5vh;
  border: none;
`;

const Icon = styled(Img)`
  height: 5vh;
  width: 5vh;
  opacity: 0.5;
`;

export { IconButton };

const Input = ({ title, value = '', ...props }) => (
  <FormField>
    {title && <p>{title}</p>}
    <input {...props} value={value} />
  </FormField>
);

Input.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
};

export { Input };

const TextArea = ({ title, ...props }) => (
  <FormField>
    <p>{title}</p>
    <textarea {...props} />
  </FormField>
);

TextArea.propTypes = {
  title: PropTypes.string,
};

export { TextArea };

export const Jumbo = styled(BackgroundImg)`
  height: 100vh;
  width: 100vw;
`;

export const Lighten = styled.div`
  color: #fff;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, ${({ percent }) => percent || 0.2});
`;

export const Spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  border: 0.2em solid #f3f3f3; /* Light grey */
  border-top: 0.2em solid ${({ theme }) => theme.secondary};
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: ${Spin} 1s ease infinite;
`;

export const SplitSection = styled(BackgroundImg)`
  display: flex;
  justify-content: space-between;
  flex-flow: column wrap;

  & > div {
    width: 100vw;
  }

  // pure-md
  @media screen and (min-width: 48em) {
    flex-flow: row wrap;
    & > div {
      width: 50vw;
    }
  }
`;

export const imgMatch = (imgs, match) =>
  imgs.edges.find(({ node: { id } }) => id.includes(match)).node;

export const mergeSocial = (socials, imgs) =>
  socials.map(social => ({
    ...social,
    img: imgMatch(imgs, social.name),
  }));
