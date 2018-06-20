// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContactMe from './Lead/ContactMe';
import FormState from './FormState';
import Button from './Button';
import { Center } from './mixins';
import { Avatar, Card } from '.';

import Modal from 'react-modal';

const ReactModalAdapter = ({ className, ...props }) => (
  <Modal
    portalClassName={className}
    className={`${className}__content`}
    overlayClassName={`${className}__overlay`}
    {...props}
  />
);

const StyledModal = styled(ReactModalAdapter)`
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

export class ContactModal extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  constructor() {
    super();
    this.toggleModal = this.toggleModal.bind(this);
  }

  state = { isOpen: false };

  toggleModal() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { send, headshot, ...rest } = this.props;
    return (
      <div>
        <StyledModal
          onRequestClose={this.toggleModal}
          isOpen={this.state.isOpen}
        >
          <FormWrap>
            <FormHeader>I Don't Bite</FormHeader>
            <BorderAvatar {...headshot} />
            <FormState endpoint="/contact">
              {props => (
                <ContactMe
                  send={send}
                  {...rest}
                  {...props}
                  title="Let's Build Together"
                />
              )}
            </FormState>
          </FormWrap>
        </StyledModal>

        <Button icon={send} secondary onClick={this.toggleModal}>
          Contact
        </Button>
      </div>
    );
  }
}

const FormHeader = styled.h1`
  background-color: ${({ theme }) => theme.primary};
  color: #fff;
  text-align: center;
  padding: 0.5em 0 1.5em;
  border-radius: 5px 5px 0 0;
`;

const AvatarSize = 5;
const BorderAvatar = styled(Avatar)`
  height: ${AvatarSize}em;
  width: ${AvatarSize}em;
  margin: -${AvatarSize / 2}em auto 0;
`;

const FormWrap = styled(Card)`
  position: relative;
  width: 90vw;
  border-radius: 5px;
  padding-bottom: 1em;
  form {
    max-width: 90%;
    margin: 0 auto;
  }

  // pure-md
  @media screen and (min-width: 48em) {
    width: 70vw;
  }

  //pure-lg
  @media screen and (min-width: 64em) {
    width: 40vw;
  }
`;
