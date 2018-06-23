// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Center } from './mixins';

const ReactModalAdapter = ({ className, ...props }) => (
  <Modal
    portalClassName={className}
    className={`${className}__content`}
    overlayClassName={`${className}__overlay`}
    {...props}
  />
);

ReactModalAdapter.propTypes = {
  className: PropTypes.string,
};

export default styled(ReactModalAdapter)`
  &__overlay {
    ${Center};
    position: fixed;
    z-index: 10;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.3);
  }

  &__content {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    outline: none;
  }
`;
