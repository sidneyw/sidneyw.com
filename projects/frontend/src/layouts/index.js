// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';

import './index.css';

require('prismjs/themes/prism-okaidia.css');

const borderColor = 'rgba(0, 0, 0, 0.2)';
const theme = {
  borderRadius: '0.5rem',
  borderOutline: `1px solid ${borderColor}`,
  borderColor,
  em: '#f8f8f8',
  primary: '#1D69B2',
  primaryDisabled: '#0f355a',
  secondary: '#ffbc3d',
};

const TemplateWrapper = ({ children, data: { favicons } }) => {
  const idx = favicons.edges.reduce((accum, { node }) => {
    // /static/file-name-[hash].ext
    const [, , noFolder] = node.publicURL.split('/');
    const noHashExtIdx = noFolder.lastIndexOf('-');
    if (noHashExtIdx !== -1) {
      accum[noFolder.substr(0, noHashExtIdx)] = node.publicURL;
    } else {
      // eslint-disable-next-line no-console
      console.error('Incorrect Favicon File Path Format');
    }

    return accum;
  }, Object.create(null));

  return (
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

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={idx['apple-touch-icon']}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={idx['favicon-32x32']}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={idx['favicon-16x16']}
        />
        <link rel="mask-icon" href={idx['safari-pinned-tab']} color="#5bbad5" />
      </Helmet>

      <ThemeProvider theme={theme}>
        <React.Fragment>
          {children()}

          {/* <Footer socialIcons={mergeSocial(data.dataJson.social, data.allImageSharp)} /> */}
        </React.Fragment>
      </ThemeProvider>
    </GlobalStyles>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          publicURL: PropTypes.string,
        }),
      })
    ),
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

    favicons: allFile(filter: { id: { regex: "/.*assets/favicons/.*/" } }) {
      edges {
        node {
          publicURL
        }
      }
    }
  }
`;

export default TemplateWrapper;
