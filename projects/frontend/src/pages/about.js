// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  createAssetIdx,
  imgListPropType,
  imgPropTypeShape,
  matchAssets,
  mergeBy,
} from '../components/Img';

import { Jumbo, Darken } from '../components/';
import { Center } from '../components/mixins';

const AboutPage = ({ data: { dataJson, icons, hq } }) => {
  const assetIdx = createAssetIdx(icons, hq);

  return (
    <About>
      <AboutJumbo img={assetIdx['sidney-hack-dartmouth.jpg']}>
        <AboutJumboContent>
          <h1>Sidney Wijngaarde</h1>
        </AboutJumboContent>
      </AboutJumbo>
      <MeBlurb>
        <h2>About Me</h2>
        <p>
          Dolor commodi recusandae dolorem natus necessitatibus natus deleniti
          Omnis facilis minima quasi architecto officiis. Obcaecati expedita
          nostrum vel doloremque dolores dicta laudantium. Quo rerum ad
          molestiae deserunt eaque Dicta amet!{' '}
        </p>
      </MeBlurb>
    </About>
  );
};

const About = styled.div`
  width: 100vw;
  overflow-x: hidden;
`;

export default AboutPage;

const AboutJumbo = styled(Jumbo)`
  height: 30rem;
`;

const AboutJumboContent = styled(Darken)`
  ${Center};
  position: relative;
  flex-direction: column;

  color: #fff;
  h1 {
    text-align: center;
    font-size: 3em;
  }
`;

const MeBlurb = styled.div``;

export const query = graphql`
  query AboutQuery {
    hq: allImageSharp(filter: { id: { regex: "/.*assets/hq/.*/" } }) {
      edges {
        node {
          id
          sizes(maxWidth: 2400) {
            ...GatsbyImageSharpSizes_withWebp
          }
        }
      }
    }

    icons: allImageSharp(filter: { id: { regex: "/.*assets/icons/.*/" } }) {
      edges {
        node {
          id
          sizes(maxWidth: 200) {
            ...GatsbyImageSharpSizes_withWebp
          }
        }
      }
    }

    dataJson {
      social {
        name
        href
      }
    }
  }
`;
