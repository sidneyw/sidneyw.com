// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Img from 'gatsby-image';
import Modal from './Modal';
import Button from './Button';
import { Card } from '.';
import { Center } from './mixins';
import ContactForm from './ContactForm';
import { Avatar, imgPropTypeShape } from './Img';
import { dedupe } from './utils';

export default class ContactModal extends React.Component {
  static propTypes = {
    headshot: imgPropTypeShape,
    send: imgPropTypeShape,
    times: imgPropTypeShape,
    children: PropTypes.func.isRequired,
  };

  static assets = dedupe(...ContactForm.assets, 'times.png', 'headshot.jpg');

  static defaultProps = {};

  constructor() {
    super();
    this.toggleModal = this.toggleModal.bind(this);

    if (typeof window !== 'undefined') {
      this.appElement = document.getElementById('___gatsby');
    }
  }

  state = { isOpen: false };

  toggleModal() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { children, send, headshot, times, ...rest } = this.props;
    return (
      <div>
        <Modal
          appElement={this.appElement}
          onRequestClose={this.toggleModal}
          isOpen={this.state.isOpen}
        >
          <FormWrap>
            <IconButton onClick={this.toggleModal}>
              <Icon {...times} />
            </IconButton>
            <FormHeader>I Don&apos;t Bite</FormHeader>
            <BorderAvatar {...headshot} />
            <ContactForm send={send} title="Let's Build Together" {...rest} />
          </FormWrap>
        </Modal>

        {children && children({ send, toggle: this.toggleModal })}
      </div>
    );
  }
}

export const ContactModalButton = ({ send, toggle, className = '' }) => (
  <Button
    icon={send}
    secondary
    onClick={toggle}
    className={`cta-contact-launch${className || ''}`}
  >
    <span>Contact</span>
  </Button>
);

ContactModalButton.propTypes = {
  className: PropTypes.string,
  send: imgPropTypeShape,
  toggle: PropTypes.func.isRequired,
};

const FormHeader = styled.h1`
  background-color: ${({ theme }) => theme.primary};
  color: #fff;
  text-align: center;
  padding: 0.5em 0 1.5em;
  border-radius: 5px 5px 0 0;
`;

const IconButton = styled.button`
  ${Center};
  background-color: transparent;
  border: none;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
`;

const Icon = styled(Img)`
  height: 1vh;
  width: 1vh;
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
