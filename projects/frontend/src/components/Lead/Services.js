// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BackgroundImg, imgPropTypeShape } from '../Img';

const Services = ({ services }) => (
  <ServiceSection id="services">
    {services.map(({ name, text, img }) => (
      <ServiceCard name={name} text={text} img={img} key={name} />
    ))}
  </ServiceSection>
);

const ServiceProps = {
  name: PropTypes.string,
  text: PropTypes.string,
  img: imgPropTypeShape,
};

Services.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape(ServiceProps)),
};

export default Services;

const ServiceCard = ({ name, text, img }) => (
  <ServiceCardStyle>
    <ServiceImg img={img} />
    <h1>{name}</h1>
    <p>{text}</p>
  </ServiceCardStyle>
);

ServiceCard.propTypes = ServiceProps;

// ------------------------------------
// Styles
// ------------------------------------
const ServiceImg = styled(BackgroundImg)`
  height: 15rem;
  width: 100%;
  overflow: hidden;
`;

const ServiceSection = styled.section`
  padding: 30px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  width: 100vw;
  margin: 0;

  // pure-md
  @media screen and (min-width: 48em) {
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: initial;
  }
`;

const ServiceCardStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 90vw;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: ${({ theme }) => theme.borderOutline};
  overflow: hidden;
  flex-flow: column;
  margin-bottom: 10px;

  // pure-md
  @media screen and (min-width: 48em) {
    width: 30vw;
    margin-bottom: 0;
    min-height: 50vh;
  }

  h1 {
    font-size: 1.3em;
    text-align: center;
    padding: 1vh 0;
    margin-bottom: 1vh;
    border-top: ${({ theme }) => theme.borderOutline};
    border-bottom: ${({ theme }) => theme.borderOutline};
    width: 100%;
  }

  p {
    display: block;
    margin: 5px auto;
    width: 90%;
    margin-bottom: 1vh;
    font-size: 1em;
  }
`;
