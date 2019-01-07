import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import Img from 'gatsby-image';
import Modal from './Modal';
import { Card } from '.';
import { Center } from './mixins';
import ContactForm from './ContactForm';
import { Avatar } from './Img';

export default class ContactModal extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

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
    return (
      <StaticQuery
        query={graphql`
          query ContactModal {
            headshot: file(relativePath: { regex: "/headshot.jpg/" }) {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            times: file(relativePath: { regex: "/times.png/" }) {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        `}
        render={({ headshot, times }) => (
          <div>
            <Modal
              appElement={this.appElement}
              onRequestClose={this.toggleModal}
              isOpen={this.state.isOpen}
            >
              <FormWrap>
                <IconButton onClick={this.toggleModal}>
                  <Icon {...times.childImageSharp} />
                </IconButton>
                <FormHeader>I Don&apos;t Bite</FormHeader>
                <BorderAvatar {...headshot.childImageSharp} />
                <ContactForm title="Let's Build Together" />
              </FormWrap>
            </Modal>

            {/* See ./ContactModalButton.js */}
            {this.props.children({ toggle: this.toggleModal })}
          </div>
        )}
      />
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
