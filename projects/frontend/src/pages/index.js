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
    <IndexJumbo />

    <Services />

    <About />

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
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            type
            technology
            image {
              childImageSharp {
                sizes(maxWidth: 630) {
                  ...GatsbyImageSharpSizes
                  srcWebp
                }
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
