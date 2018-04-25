// ------------------------------------
// Generic Style Components
// ------------------------------------

// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Center, Rounded, ZDepth1, ZDepth3 } from './mixins';

export const BackgroundImg = styled.div`
  background-image: url(${props => props.img});
  background-position: center;
  background-size: cover;
`;

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

export const Jumbo = styled.div`
  background-image: url(${props => props.img});
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
`;

export const Lighten = styled.div`
  color: #fff;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, ${({ percent }) => percent || 0.2});
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
