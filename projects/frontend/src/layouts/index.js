// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import Footer from '../components/Footer';

import { imgMatch } from '../components';

import './index.css';

const theme = {
  primary: '#1D69B2',
  primaryDisabled: '#0f355a',
  secondary: '#ffbc3d',
};

const TemplateWrapper = ({ children, data }) => {
  const socialIcons = data.dataJson.social.map(social => ({
    ...social,
    img: imgMatch(data.allImageSharp, social.name),
  }));

  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,400|Montserrat:400,700"
          rel="stylesheet"
        />
      </Helmet>

      <ThemeProvider theme={theme}>
        <React.Fragment>
          {children()}

          <Footer socialIcons={socialIcons} />
        </React.Fragment>
      </ThemeProvider>
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
    dataJson {
      social {
        name
        href
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
