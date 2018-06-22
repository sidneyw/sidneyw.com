// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import styled from 'styled-components';

import Modal from './Modal';
import Button from './Button';
import { Card } from '.';
import ContactForm from './ContactForm';
import { Avatar, imgPropTypeShape } from './Img';
import { dedupe } from './utils';

export default class ContactModal extends React.Component {
  static propTypes = {
    headshot: imgPropTypeShape,
    send: imgPropTypeShape,
  };

  static assets = dedupe(...ContactForm.assets, 'headshot.jpg');

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
        <Modal onRequestClose={this.toggleModal} isOpen={this.state.isOpen}>
          <FormWrap>
            <FormHeader>I Don&apos;t Bite</FormHeader>
            <BorderAvatar {...headshot} />
            <ContactForm send={send} title="Let's Build Together" {...rest} />
          </FormWrap>
        </Modal>

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
