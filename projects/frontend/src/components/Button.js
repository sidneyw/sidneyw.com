/* eslint-disable jsx-a11y/anchor-has-content */
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Img from 'gatsby-image';
import { STATE_ENUM } from './FormState';
import { Center, Rounded, ZDepth1, ZDepth3 } from './mixins';
import Link from './Link';
import { imgPropTypeShape } from './Img';

const ButtonIcon = styled(Img)`
  max-height: 90%;
  width: 3vh;
  height; 5vh;

  //pure-lg
  @media screen and (min-width: 64em) {
    // margin-right: 0;
  }
`;

export const UnifiedButton = ({
  children,
  icon,
  secondary,
  fullwidth,
  ...rest
}) => {
  const Wrapper =
    rest.href || rest.to
      ? props => <Link {...props} />
      : props => <button {...props} />;
  return (
    <Wrapper {...rest}>
      {icon && icon.fluid && icon.fluid.sizes && <ButtonIcon {...icon} />}
      {icon && !icon.fluid && icon}
      {children && children}
    </Wrapper>
  );
};

UnifiedButton.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.oneOfType([imgPropTypeShape, PropTypes.node]),
  secondary: PropTypes.bool,
  fullwidth: PropTypes.bool,
};

const getColor = ({ theme, secondary, disabled }) => {
  switch (true) {
    case secondary && disabled:
      return theme.secondaryDisabled;

    case secondary:
      return theme.secondary;

    case disabled:
      return theme.primaryDisabled;

    default:
      return theme.primary;
  }
};

const StyledButton = styled(UnifiedButton)`
  ${Center};
  ${Rounded};
  ${ZDepth1};
  padding: 1rem;
  border: none;
  color: #fff;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 1.2em;
  background-color: ${getColor};
  text-decoration: none;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);

  span {
    margin-left: 0.5em;
  }

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
  `};
`;

export default StyledButton;

export const LoaderButton = ({ state, normal, loading, success, ...rest }) => {
  let props;

  switch (state.submitted) {
    case STATE_ENUM.PENDING:
      props = { disabled: true, ...loading };
      break;

    case STATE_ENUM.SUCCESS:
      props = { disabled: true, ...success };
      break;

    default:
      props = normal;
  }

  return <StyledButton {...props} {...rest} />;
};

const LoaderPresentationType = PropTypes.shape({
  icon: PropTypes.oneOfType([imgPropTypeShape, PropTypes.node]),
  children: PropTypes.node,
});

LoaderButton.propTypes = {
  loading: LoaderPresentationType,
  normal: LoaderPresentationType,
  state: PropTypes.shape({ submitted: PropTypes.number }),
  success: LoaderPresentationType,
};
