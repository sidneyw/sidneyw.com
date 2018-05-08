// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Footer from '../components/Footer';

import './index.css';

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,400|Ubuntu:400,700"
        rel="stylesheet"
      />
    </Helmet>

    {children()}

    <Footer
      siteMetadata={data.site.siteMetadata}
      images={data.allImageSharp.edges}
    />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.object,
    }),
  }),
};

export const query = graphql`
  query ExperienceQuery {
    site {
      siteMetadata {
        social {
          name
          link
        }
      }
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
  }
`;

export default TemplateWrapper;
