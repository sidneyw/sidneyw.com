// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Thirds } from './mixins';

import { Heading, SplitSection } from './index';

import ECommerce from '../assets/e-commerce.png';
import Ideation from '../assets/ideation.png';
import Security from '../assets/security.png';
import Seo from '../assets/seo.png';
import WebDes from '../assets/web-design.png';
import WebDev from '../assets/web-development.png';

export default () => (
  <SplitSection id="services">
    <ServiceInfo>
      <Heading>Here&apos;s What I Can Help With</Heading>
      <p>
        I turn your vision into a reality and can assist with every phase of the
        process. Delivering end to end web solutions is my passion. Whether it’s
        a landing page, blog, or full scale web application, I can help. I’d
        describe myself as a cloud architect. I have a wide skill set including
        web design, web development, cloud architecture, hosting, search engine
        optimization and more. I can help you clarify your vision, design a
        solution, and execute.
      </p>
    </ServiceInfo>

    <ServiceIconWrap>
      <ServiceIcon title="Ideation" img={Ideation} />
      <ServiceIcon title="Design" img={WebDes} />
      <ServiceIcon title="Development" img={WebDev} />

      <ServiceIcon title="Security" img={Security} />
      <ServiceIcon title="SEO" img={Seo} />
      <ServiceIcon title="E-Commerce" img={ECommerce} />
    </ServiceIconWrap>
  </SplitSection>
);

const ServiceInfo = styled.div`
  display: flex;
  flex-flow: column;
  padding: 20px;

  h1 {
    font-size: 1.5em;
    margin: 0;
  }

  p {
    display: block;
    margin: 5% auto;
  }

  button {
    min-width: 30%;
    min-height: 10%;
    font-size: 2em;
    font-weight: 600;
    padding: 10px;
    border-radius: 5px;
  }

  // pure-md
  @media screen and (min-width: 48em) {
    align-items: flex-end;
    justify-content: center;
    min-height: 100vh;

    h1,
    p {
      width: 75%;
      text-align: right;
    }

    h1 {
      font-size: 3em;
    }

    p {
      margin: 5% 0;
    }
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
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 20px;

  // pure-md
  @media screen and (min-width: 48em) {
    padding: 25vh 20px 25vh 0;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0;
  }
`;

const Icon = styled.div`
  ${Thirds} width: 40%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  img {
    width: 75%;
  }

  p {
    max-width: 70%;
    text-shadow: 0 0 10px #333;
    position: absolute;
    font-weight: 400;
    color: #fff;
  }

  // pure-md
  @media screen and (min-width: 48em) {
    margin-bottom: 0;
  }
`;
