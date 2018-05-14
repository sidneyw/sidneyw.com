// ------------------------------------
// Generic Style Components
// ------------------------------------

// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import styled, { css, keyframes } from 'styled-components';

import { Center, Rounded, ZDepth1, ZDepth3 } from './mixins';

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
  color: #333;
  flex-direction: row;
  align-items: center;
  min-height: 10vh;
  background-color: #fff;
`;

const ButtonStyle = css`
  ${Center} ${Rounded} ${ZDepth1} padding: 10px;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.2em;
  background-color: ${props => props.color || '#1D69B2'};
  text-decoration: none;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);

  transition: all 200ms ease;

  &:visited,
  &:focus {
    text-decoration: none;
    color: #fff;
  }

  &:hover {
    ${ZDepth3};
  }
`;
export const Button = styled.button`
  ${ButtonStyle};
`;
export const ButtonLink = styled.a`
  ${ButtonStyle};
`;

export const BlueButton = styled(Button)`
  background-color: #1d69b2;
  width: ${props => (props.fullwidth ? '100%' : '')};
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
  ${Rounded} ${ZDepth1} padding: 0 5px;
  min-height: 5vh;
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

  textarea {
    padding-top: 5px;
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
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #1d69b2; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
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
