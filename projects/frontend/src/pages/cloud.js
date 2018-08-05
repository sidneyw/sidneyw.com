// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import About from '../components/Lead/About';
import Companies from '../components/Lead/Companies';
import IndexJumbo from '../components/Lead/IndexJumbo';
import Nav from '../components/Nav';
import Services from '../components/Lead/Services';
import Stack from '../components/Lead/Stack';
import NewsLetterForm from '../components/NewsLetterForm';

import { Banner } from '../components/';

import { createAssetIdx, matchAssets, mergeBy } from '../components/Img';

const IndexPage = ({ data: { dataJson, icons, hq } }) => {
  const assetIdx = createAssetIdx(icons, hq);
  return (
    <div>
      <Nav
        {...matchAssets(assetIdx, ['hamburger.png'])}
        links={[
          { href: '#services', text: 'Services' },
          { href: '#stack', text: 'Stack' },
          { href: '#about', text: 'About' },
          { to: '/', text: 'Blog' },
        ]}
        socialIcons={mergeBy(assetIdx, dataJson.social)}
      />

      <IndexJumbo {...matchAssets(assetIdx, IndexJumbo.assets)} />
      <Services
        services={mergeBy(assetIdx, dataJson.services, svc => svc.img)}
      />
      <Banner>
        <Callout>
          The Modern Web Runs on Container Tech and Serverless Platforms
        </Callout>
      </Banner>
      <Stack
        stack={mergeBy(
          assetIdx,
          dataJson.stack.map(stack => ({ name: stack }))
        )}
      />
      <Banner>
        <Callout>
          get my latest and greatest content delivered straight to your inbox
        </Callout>
        <NewsLetterForm
          {...matchAssets(assetIdx, NewsLetterForm.assets)}
          secondary
        />
      </Banner>
      <About {...matchAssets(assetIdx, About.assets)} />
      <Companies
        companies={mergeBy(
          assetIdx,
          dataJson.companies.map(company => ({ name: company }))
        )}
      />
    </div>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

const Callout = styled.h1`
  text-align: center;
  text-transform: Capitalize;
  margin: 1rem auto;
`;

export const query = graphql`
  fragment ImgQuery on ImageSharp {
    sizes(maxWidth: 200) {
      ...GatsbyImageSharpSizes_withWebp
    }
  }

  fragment HQ_ImgQuery on ImageSharp {
    sizes(maxWidth: 2400) {
      ...GatsbyImageSharpSizes_withWebp
    }
  }

  query IndexQuery {
    dataJson {
      social {
        name
        href
      }
      services {
        name
        text
        img
      }
      stack
      companies
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

    servicesImgs: allImageSharp(
      filter: { id: { regex: "/.*assets/services/.*/" } }
    ) {
      edges {
        node {
          id
          sizes {
            ...GatsbyImageSharpSizes_withWebp
          }
        }
      }
    }

    stackImgs: allImageSharp(filter: { id: { regex: "/.*assets/stack/.*/" } }) {
      edges {
        node {
          id
          sizes(maxWidth: 200) {
            ...GatsbyImageSharpSizes_withWebp
          }
        }
      }
    }

    chauoanShot: imageSharp(id: { regex: "/chauoan-shot1.jpg/" }) {
      ...HQ_ImgQuery
    }

    newyork: imageSharp(id: { regex: "/newyork.png/" }) {
      ...HQ_ImgQuery
    }

    ibm: imageSharp(id: { regex: "/ibm-bw.png/" }) {
      ...ImgQuery
    }

    magicLeap: imageSharp(id: { regex: "/magic-leap-bw.png/" }) {
      ...ImgQuery
    }

    dali: imageSharp(id: { regex: "/dali-bw.png/" }) {
      ...ImgQuery
    }
  }
`;

export default IndexPage;
