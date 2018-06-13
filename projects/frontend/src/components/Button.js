/* eslint-disable jsx-a11y/anchor-has-content */
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Img from 'gatsby-image';
import { Center, Rounded, ZDepth1, ZDepth3 } from './mixins';
import { imgPropTypeShape } from '.';

const ButtonIcon = styled(Img)`
  max-height: 90%;
  width: 2vw;
  margin-right: 0.3em;
`;

export const UnifiedButton = ({ children, icon, ...rest }) => {
  const Wrapper = rest.href
    ? props => <a {...props} />
    : props => <button {...props} />;

  return (
    <Wrapper {...rest}>
      {icon && <ButtonIcon {...icon} />}
      {children && children}
    </Wrapper>
  );
};

UnifiedButton.propTypes = {
  children: PropTypes.node,
  icon: imgPropTypeShape,
};

export default styled(UnifiedButton)`
  ${Center} ${Rounded} ${ZDepth1} padding: 1rem;
  border: none;
  color: #fff;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 1.2em;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.primaryDisabled : theme.primary};
  text-decoration: none;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);

  transition: all 200ms ease;
  width: ${props => (props.fullwidth ? '100%' : '')};

  &:visited,
  &:focus {
    text-decoration: none;
    color: #fff;
  }

  ${({ disabled }) =>
    !disabled &&
    `
    &:hover {
      ${ZDepth3};
    }
  `}
`;
