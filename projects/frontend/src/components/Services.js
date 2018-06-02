// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BackgroundImg, imgMatch, imgListPropType, imgPropType } from '.';

const Services = ({ services, imgs }) => (
  <ServiceSection id="services">
    {services.map(({ name, text, img }) => (
      <ServiceCard
        name={name}
        text={text}
        img={imgMatch(imgs, img)}
        key={name}
      />
    ))}
  </ServiceSection>
);

const ServiceProps = {
  name: PropTypes.string,
  text: PropTypes.string,
  img: PropTypes.shape({
    id: PropTypes.string,
    sizes: imgPropType,
  }),
};

Services.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({ ...ServiceProps, img: PropTypes.string })
  ),
  imgs: imgListPropType,
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
const borderRadius = 5;
const borderColor = 'rgba(0, 0, 0, 0.2)';
const borderStyle = `1px solid ${borderColor}`;

const ServiceImg = styled(BackgroundImg)`
  height: 20vh;
  width: 100%;
  border-radius: ${borderRadius}px ${borderRadius}px 0 0;
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
  }
`;

const ServiceCardStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 90vw;
  align-items: center;
  border-radius: ${borderRadius}px;
  border: 1px solid ${borderColor};
  flex-flow: column;
  margin-bottom: 10px;

  // pure-md
  @media screen and (min-width: 48em) {
    width: 30vw;
    min-height: 40vh;
    margin-bottom: 0;
  }

  h1 {
    font-size: 1.3em;
    text-align: center;
    padding: 1vh 0;
    margin-bottom: 1vh;
    border-bottom: ${borderStyle}
    border-top: ${borderStyle};
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
