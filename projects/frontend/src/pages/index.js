// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';

import About from '../components/About';
// import NewsLetter from '../components/NewsLetter';
import Experience from '../components/Experience';
import IndexJumbo from '../components/IndexJumbo';
import Services from '../components/Services';
// import Testimonials from '../components/Testimonials';
import Companies from '../components/Companies';

const IndexPage = ({ data }) => (
  <div>
    <IndexJumbo headshot={data.headshot} />
    <Services />
    <About newyork={data.newyork} chauoanShot={data.chauoanShot} />
    <Experience exp={data.allMarkdownRemark.edges} />
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

  query IndexQuery {
    headshot: imageSharp(id: { regex: "/headshot2.jpg/" }) {
      ...ImgQuery
    }

    chauoanShot: imageSharp(id: { regex: "/chauoan-shot1.jpg/" }) {
      ...ImgQuery
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
