// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { mergeByImgProps } from '../Img';

const CompanySection = ({ companies }) => (
  <CompanyWrap>
    {companies.map(({ name, img }) => (
      <CompanyImg {...img.childImageSharp} key={name} />
    ))}
  </CompanyWrap>
);

CompanySection.propTypes = {
  companies: mergeByImgProps,
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
