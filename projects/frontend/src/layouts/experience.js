// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Footer from '../components/Footer';

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto+Slab:100,400|Ubuntu:400,700"
        rel="stylesheet"
      />
    </Helmet>

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
  query ExperienceQuery {
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
