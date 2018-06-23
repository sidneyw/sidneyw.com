/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { StackIcon } from './Lead/Stack';
import { Card } from '.';
import { imgPropTypeShape } from '../components/Img';
import ContactModal, { ContactModalButton } from '../components/ContactModal';
import Link from './Link';

const CTAForm = ({ headshot, send, times, check, stack, title }) => (
  <CTACard>
    <h3>{title}</h3>

    <StackWrap>
      {stack
        .splice(0, stack.length - 1)
        .map(({ name, img }) => (
          <CTAStackIcon title={name} img={img} key={name} />
        ))}
    </StackWrap>

    <ContactModal headshot={headshot} times={times} send={send} check={check}>
      {props => <ContactModalButton {...props} />}
    </ContactModal>
    <Link to="/cloud">Learn More</Link>
  </CTACard>
);

CTAForm.propTypes = {
  check: imgPropTypeShape,
  headshot: imgPropTypeShape,
  send: imgPropTypeShape,
  stack: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      img: imgPropTypeShape,
    })
  ),
  times: imgPropTypeShape,
  title: PropTypes.string,
};

CTAForm.assets = ContactModal.assets;
export default CTAForm;

const CTACard = styled(Card)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
  width: 95%;
  max-width: 20em;
  margin: 0 auto;
  border-radius: 5px;

  h3,
  a {
    text-align: center;
  }
`;

const StackWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 1em 0;
  font-size: 0.8em;
`;

const CTAStackIcon = styled(StackIcon)`
  width: 49%;
  padding: 0;
`;
