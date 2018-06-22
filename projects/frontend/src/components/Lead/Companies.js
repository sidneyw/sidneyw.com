// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { mergeByImgProps } from '../Img';

const CompanySection = ({ companies }) => (
  <CompanyWrap>
    {companies.map(({ img }, ind) => <CompanyImg {...img} key={ind} />)}
  </CompanyWrap>
);

CompanySection.propTypes = {
  companies: mergeByImgProps,
};

const CompanyWrap = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  width: 100vw;
  min-height: 10vh;

  // pure-md
  @media screen and (min-width: 48em) {
    flex-flow: row wrap;
  }
`;

const CompanyImg = styled(Img)`
  width: 90vw;
  // pure-md
  @media screen and (min-width: 48em) {
    width: 20vw;
  }
`;

export default CompanySection;
