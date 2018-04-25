// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Nav from '../components/Nav';
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

    <Nav siteMetadata={data.site.siteMetadata} />

    {children()}

    <Footer siteMetadata={data.site.siteMetadata} />
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
  query TemplateQuery {
    site {
      siteMetadata {
        title
        github
        linkedin
        pinterest
        twitter
        email
      }
    }
  }
`;

export default TemplateWrapper;
