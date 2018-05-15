// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

import './index.css';

const TemplateWrapper = ({ children, data }) => {
  const socialIcons = data.site.siteMetadata.social.reduce((accum, social) => {
    // eslint-disable-next-line no-param-reassign
    accum[social.name] = {
      ...social,
      img: data.allImageSharp.edges.find(({ node: { id } }) =>
        id.includes(social.name)
      ).node,
    };

    return accum;
  }, {});

  return (
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

      <Nav
        hamburger={data.hamburger}
        socialIcons={Object.values(socialIcons)}
      />

      {children()}

      <Footer socialIcons={Object.values(socialIcons)} />
    </div>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.object,
    }),
  }),
};

export const query = graphql`
  query TemplateQuery {
    site {
      siteMetadata {
        title
        social {
          name
          href
        }
      }
    }
    hamburger: imageSharp(id: { regex: "/hamburger.png/" }) {
      sizes {
        ...GatsbyImageSharpSizes_withWebp
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
