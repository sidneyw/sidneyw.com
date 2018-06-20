// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';

import Footer from '../components/Footer';
import { mergeSocial } from '../components';

import './index.css';

require('prismjs/themes/prism-okaidia.css');

const theme = {
  primary: '#1D69B2',
  primaryDisabled: '#0f355a',
  secondary: '#ffbc3d',
  em: '#f8f8f8',
};

const TemplateWrapper = ({ children, data }) => (
  <GlobalStyles>
    <Helmet>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto+Slab:300,400|Montserrat:400,400i,700"
        rel="stylesheet"
      />
    </Helmet>

    <ThemeProvider theme={theme}>
      <React.Fragment>
        {children()}

        {/* <Footer socialIcons={mergeSocial(data.dataJson.social, data.allImageSharp)} /> */}
      </React.Fragment>
    </ThemeProvider>
  </GlobalStyles>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.object,
    }),
  }),
};

const GlobalStyles = styled.div`
  font-size: 1em;
  // pure-sm
  @media screen and (min-width: 35.5em) {
  }

  //pure-lg
  @media screen and (min-width: 64em) {
    font-size: 1.2em;
  }

  // pure-xl
  @media screen and (min-width: 80em) {
  }
`;

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
