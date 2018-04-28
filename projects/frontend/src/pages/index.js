// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';

import About from '../components/About';
import NewsLetter from '../components/NewsLetter';
import Experience from '../components/Experience';
import IndexJumbo from '../components/IndexJumbo';
import Services from '../components/Services';
// import Testimonials from '../components/Testimonials';

const IndexPage = ({ data }) => (
  <div>
    <IndexJumbo headshot={data.headshot} />

    <Services />

    <About chauoanBlur={data.chauoanBlur} chauoanShot={data.chauoanShot} />

    <Experience exp={data.allMarkdownRemark.edges} />

    <NewsLetter />
  </div>
);

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.object,
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

    chauoanBlur: imageSharp(id: { regex: "/chauoan-blur.png/" }) {
      ...ImgQuery
    }

    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            type
            technology
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
