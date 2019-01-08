import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled, { css, keyframes } from 'styled-components';

import { Card, Jumbo } from '..';
import { Center } from '../mixins';
import ContactForm from '../ContactForm';
import ContactModal from '../ContactModal';
import ContactModalButton from '../ContactModalButton';

const IndexJumboSection = () => (
  <StaticQuery
    query={graphql`
      query IndexJumboQuery {
        background: file(relativePath: { regex: "/headshot.jpg/" }) {
          childImageSharp {
            fluid(maxWidth: 2400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={({ background }) => (
      <IndexJumbo img={background.childImageSharp}>
        <Introduction>
          <TagLine>I&apos;m Sidney,</TagLine>
          <TagLine>but they call me</TagLine>
          <Squid>Squid.</Squid>
          <ContactModal>
            {Props => <ContactMobileOnlyBtn {...Props} />}
          </ContactModal>
        </Introduction>
        <FormWrap>
          <ContactForm title="Let's Connect" />
        </FormWrap>
      </IndexJumbo>
    )}
  />
);

const ContactMobileOnlyBtn = styled(ContactModalButton)`
  //pure-lg
  @media screen and (min-width: 64em) {
    display: none;
  }
`;

export default IndexJumboSection;

const IndexJumbo = styled(Jumbo)`
  ${Center};
  flex-direction: column;
  height: 35rem;

  // pure-md
  @media screen and (min-width: 48em) {
    height: 50rem;
  }

  //pure-lg
  @media screen and (min-width: 64em) {
    height: 60rem;
    justify-content: space-between;
    padding-left: 5rem;
    flex-direction: row;
  }
`;

const SlideInRight = keyframes`
  0% {
    transform: translateX(70vw);
  }

  60% {
    transform: translateX(-5vw);
  }

  100% {
    transform: translateX(0);
  }
`;

const SlideInStyle = css`
  animation: ${SlideInRight};
  animation-fill-mode: both;
  animation-duration: 500ms;
  animation-delay: 1s;
  animation-timing-function: ease;
`;

const FormWrap = styled(Card)`
  ${SlideInStyle};
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 5vh 0;
  border-radius: 5px 0 0 5px;
  display: none;

  //pure-lg
  @media screen and (min-width: 64em) {
    display: flex;
    width: 40vw;
  }
  // pure-xl
  @media screen and (min-width: 80em) {
    width: 30vw;
  }
  form {
    width: 70%;
    color: #fff;
    text-shadow: 2px 2px 5px #333;
  }
`;

const Squid = styled.h1`
  font-size: 5.5em;
`;

const TagLine = styled.h2`
  text-align: center;
  font-family: 'Roboto Slab', serif;
  width: 100vw;

  //pure-lg
  @media screen and (min-width: 64em) {
    text-align: left;
    width: initial;
  }
`;

const Introduction = styled.div`
  ${Center};
  color: #fff;
  position: relative;
  flex-direction: column;
  height: 100%;
  width: 50vw;

  h2,
  h3 {
    font-weight: 300;
  }

  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);

  & > * {
    margin-top: 10px;
  }

  //pure-lg
  @media screen and (min-width: 64em) {
    align-items: flex-start;

    h2,
    h3 {
      font-weight: 100;
    }
  }
`;
