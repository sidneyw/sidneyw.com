// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';

import About from '../components/About';
// import NewsLetter from '../components/NewsLetter';
// import Experience from '../components/Experience';
import IndexJumbo from '../components/IndexJumbo';
import Services from '../components/Services';
import { Banner } from '../components/';
import Stack from '../components/Stack';
// import Testimonials from '../components/Testimonials';
import Companies from '../components/Companies';

const IndexPage = ({ data }) => (
  <div>
    <IndexJumbo headshot={data.headshot} />
    <Services
      services={data.site.siteMetadata.services}
      imgs={data.servicesImgs}
    />
    <Banner>
      <h1>The Modern Web Runs on Container Tech and Serverless Platforms</h1>
    </Banner>
    <Stack stack={data.site.siteMetadata.stack} imgs={data.stackImgs} />
    {/* <Experience exp={data.allMarkdownRemark.edges} /> */}
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
          sizes {
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
