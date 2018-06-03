// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import About from '../components/About';
import IndexJumbo from '../components/IndexJumbo';
import Services from '../components/Services';
import { Banner } from '../components/';
import Stack from '../components/Stack';
import Companies from '../components/Companies';

const IndexPage = ({ data }) => (
  <div>
    <IndexJumbo headshot={data.headshot} />
    <Services
      services={data.site.siteMetadata.services}
      imgs={data.servicesImgs}
    />
    <Banner>
      <Callout>
        The Modern Web Runs on Container Tech and Serverless Platforms
      </Callout>
    </Banner>
    <Stack stack={data.site.siteMetadata.stack} imgs={data.stackImgs} />
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
    sizes {
      ...GatsbyImageSharpSizes_withWebp
    }
  }

  fragment HQ_ImgQuery on ImageSharp {
    sizes(maxWidth: 2400) {
      ...GatsbyImageSharpSizes_withWebp
    }
  }

  query IndexQuery {
    site {
      siteMetadata {
        stack
        services {
          name
          text
          img
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

    headshot: imageSharp(id: { regex: "/headshot2.jpg/" }) {
      ...HQ_ImgQuery
    }

    chauoanShot: imageSharp(id: { regex: "/chauoan-shot1.jpg/" }) {
      ...HQ_ImgQuery
    }

    newyork: imageSharp(id: { regex: "/newyork.png/" }) {
      ...ImgQuery
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

    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            type
            technology
            link
            image {
              childImageSharp {
                ...ImgQuery
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default IndexPage;
