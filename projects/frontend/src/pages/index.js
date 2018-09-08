// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import About from '../components/Lead/About';
import Companies from '../components/Lead/Companies';
import IndexJumbo from '../components/Lead/IndexJumbo';
import Nav from '../components/Nav';
import Services from '../components/Lead/Services';
import Stack from '../components/Lead/Stack';
import NewsLetterForm from '../components/NewsLetterForm';

import { Banner } from '../components/';

import { createAssetIdx, matchAssets, mergeBy } from '../components/Img';

const IndexPage = ({ data: { content, icons, hq, posts } }) => {
  const assetIdx = createAssetIdx(icons, hq);
  const contentNode = content.edges[0].node;
  return (
    <div>
      <Nav
        {...matchAssets(assetIdx, ['hamburger.png'])}
        links={[
          { href: '#services', text: 'Services' },
          { href: '#stack', text: 'Stack' },
          { href: '/about', text: 'About' },
          { to: '/blog', text: 'Blog' },
        ]}
        socialIcons={mergeBy(assetIdx, contentNode.social)}
      />

      <IndexJumbo {...matchAssets(assetIdx, IndexJumbo.assets)} />
      <Services
        services={mergeBy(assetIdx, contentNode.services, svc => svc.img)}
      />
      <Banner>
        <Callout>The web is mobile and social.</Callout>
      </Banner>
      <Stack
        stack={mergeBy(
          assetIdx,
          contentNode.stack.map(stack => ({ name: stack }))
        )}
      />
      <Banner>
        <Callout>
          get my latest and greatest content delivered straight to your inbox
        </Callout>
        <NewsLetterForm
          {...matchAssets(assetIdx, NewsLetterForm.assets)}
          secondary
        />
      </Banner>
      <About
        {...matchAssets(assetIdx, About.assets)}
        assetIdx={assetIdx}
        posts={posts}
      />
      <Companies
        companies={mergeBy(
          assetIdx,
          contentNode.companies.map(company => ({ name: company }))
        )}
      />
    </div>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

const Callout = styled.h1`
  text-align: center;
  text-transform: Capitalize;
  margin: 1rem auto;
  width: 100%;
`;

export const query = graphql`
  query IndexQuery {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          id
          timeToRead
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            author
            date
            tags
            img {
              childImageSharp {
                sizes(maxWidth: 2400) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
          }
        }
      }
    }

    content: allDataJson(filter: { id: { regex: "/fed.json/" } }) {
      edges {
        node {
          social {
            name
            href
          }
          services {
            name
            text
            img
          }
          stack
          companies
        }
      }
    }

    icons: allImageSharp(filter: { id: { regex: "/.*assets/icons/.*/" } }) {
      edges {
        node {
          id
          sizes(maxWidth: 200) {
            ...GatsbyImageSharpSizes_withWebp
          }
        }
      }
    }

    hq: allImageSharp(filter: { id: { regex: "/.*assets/hq/.*/" } }) {
      edges {
        node {
          id
          sizes(maxWidth: 2400) {
            ...GatsbyImageSharpSizes_withWebp
          }
        }
      }
    }
  }
`;

export default IndexPage;
