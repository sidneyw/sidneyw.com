// ------------------------------------
// Generic Style Components
// ------------------------------------

// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

import Img from 'gatsby-image';

import { Center, Rounded, ZDepth1, ZDepth3 } from './mixins';
import { BackgroundImg } from './Img';

export const Banner = styled.section`
  display: flex;
  color: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 7rem;
  padding: 3rem 1.5rem;
  background-color: ${({ theme, secondary }) =>
    secondary ? theme.secondary : theme.primary};
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
  max-height: 1em;
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
  ${Center};
  background-color: transparent;
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
