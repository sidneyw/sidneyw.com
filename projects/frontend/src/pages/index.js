// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import About from '../components/About';
import Companies from '../components/Companies';
import IndexJumbo from '../components/IndexJumbo';
import Nav from '../components/Nav';
import Services from '../components/Services';
import Stack from '../components/Stack';

import { Banner, mergeSocial } from '../components/';

const IndexPage = ({ data }) => (
  <div>
    <Nav
      hamburger={data.hamburger}
      socialIcons={mergeSocial(data.dataJson.social, data.allImageSharp)}
    />

    <IndexJumbo check={data.check} headshot={data.headshot} send={data.send} />
    <Services services={data.dataJson.services} imgs={data.servicesImgs} />
    <Banner>
      <Callout>
        The Modern Web Runs on Container Tech and Serverless Platforms
      </Callout>
    </Banner>
    <Stack stack={data.dataJson.stack} imgs={data.stackImgs} />
    <About newyork={data.newyork} chauoanShot={data.chauoanShot} />
    <Companies data={[data.magicLeap, data.ibm, data.dali]} />
  </div>
);

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

const Callout = styled.h1`
  text-align: center;
  padding: 3rem;
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
    }

    allImageSharp(filter: { id: { regex: "/.*assets/social/.*/" } }) {
      edges {
        node {
          id
          sizes {
            ...GatsbyImageSharpSizes_withWebp
          }
        }
      }
    }

    hamburger: imageSharp(id: { regex: "/hamburger.png/" }) {
      sizes {
        ...GatsbyImageSharpSizes_withWebp
      }
    }

    headshot: imageSharp(id: { regex: "/headshot2.jpg/" }) {
      ...HQ_ImgQuery
    }

    send: imageSharp(id: { regex: "/send.png/" }) {
      ...ImgQuery
    }

    check: imageSharp(id: { regex: "/check.png/" }) {
      ...ImgQuery
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
