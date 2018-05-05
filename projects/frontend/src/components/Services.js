// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Thirds } from './mixins';

import { Card, Heading } from './index';

import ECommerce from '../assets/e-commerce.png';
import Ideation from '../assets/ideation.png';
import Security from '../assets/security.png';
import Seo from '../assets/seo.png';
import WebDes from '../assets/web-design.png';
import WebDev from '../assets/web-development.png';

export default () => (
  <Services id="services">
    <Heading>Here&apos;s What I Can Help With</Heading>
    <ServiceIconWrap>
      <ServiceIcon title="Ideation" img={Ideation} />
      <ServiceIcon title="Design" img={WebDes} />
      <ServiceIcon title="Development" img={WebDev} />

      <ServiceIcon title="Security" img={Security} />
      <ServiceIcon title="SEO" img={Seo} />
      <ServiceIcon title="E-Commerce" img={ECommerce} />
    </ServiceIconWrap>
  </Services>
);

const Services = styled.section`
  margin: 3vh 0;
  h1 {
    margin-bottom: 15px;
  }
`;

const ServiceIcon = ({ title, img }) => (
  <Icon>
    <img src={img} alt="" />
    <p>{title}</p>
  </Icon>
);

ServiceIcon.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
};

const ServiceIconWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  // pure-md
  @media screen and (min-width: 48em) {
    margin: 0 5vw;
    align-items: center;
  }
`;

const Icon = styled(Card)`
  ${Thirds} width: 40%;
  width: 90%;
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  text-align: center;

  border: 3px solid rgba(0, 0, 0, 0);

  // &:hover {
  //   border: 3px solid #1D69B2;
  // }

  img {
    margin: 10px;
    width: 25%;
  }

  p {
    max-width: 70%;
    font-weight: 400;
    font-size: 1.5em;
  }
`;
