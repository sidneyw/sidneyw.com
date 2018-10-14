import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { imgPropTypeShape } from '../Img';

const CompanySection = ({ companies }) => (
  <CompanyWrap>
    {companies.map(({ name, img }) => (
      <CompanyImg {...img.childImageSharp} key={name} />
    ))}
  </CompanyWrap>
);

CompanySection.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      img: imgPropTypeShape,
    })
  ),
};

const CompanyWrap = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100vw;
  min-height: 10vh;

  // pure-md
  @media screen and (min-width: 48em) {
  }
`;

const CompanyImg = styled(Img)`
  width: 30vw;
  // pure-md
  @media screen and (min-width: 48em) {
    width: 20vw;
  }
`;

export default CompanySection;
