// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import FormState from './FormState';
import { StackIcon } from './Lead/Stack';
import { Card, imgMatch } from '.';
import Button from './Button';
import { ContactModal } from '../components/Modal';
import Link from './Link';

export default class CTAForm extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  constructor() {
    super();
  }

  render() {
    const { headshot, send, check, stack, imgs, avatar, title } = this.props;
    return (
      <CTACard>
        <h3>{title}</h3>

        <StackWrap>
          {stack
            .splice(0, stack.length - 1)
            .map(name => (
              <CTAStackIcon
                title={name}
                img={imgMatch(imgs, name)}
                key={name}
              />
            ))}
        </StackWrap>

        <ContactModal headshot={headshot} send={send} check={check} />
        <Link to="/cloud">Learn More</Link>
      </CTACard>
    );
  }
}

const CTACard = styled(Card)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
  width: 95%;
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
  justify-content: center;
  margin: 1em 0;
`;

const CTAStackIcon = styled(StackIcon)`
  width: 48%;
  padding: 0;
`;
