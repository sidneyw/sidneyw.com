import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { graphql } from 'gatsby';
import About from '../components/Lead/About';
import Companies from '../components/Lead/Companies';
import IndexJumbo from '../components/Lead/IndexJumbo';
import Nav from '../components/Nav';
import NewsLetterForm from '../components/NewsLetterForm';
import Layout from '../layouts';

import { Banner } from '../components/';

const IndexPage = ({ data: { posts, serviceContent } }) => {
  const pageContent = serviceContent.edges[0].node.childDataJson;

  return (
    <Layout>
      <div>
        <Nav links={[{ to: '/', text: 'Blog' }]} />
        <IndexJumbo />
        <About posts={posts} />
        <Banner>
          <Callout>
            get my latest and greatest content delivered straight to your inbox
          </Callout>
          <NewsLetterForm secondary />
        </Banner>
        <Companies companies={pageContent.companies} />
      </div>
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.shape({
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
  query AboutPageQuery {
    serviceContent: allFile(filter: { relativePath: { eq: "fed.json" } }) {
      edges {
        node {
          id
          childDataJson {
            companies {
              name
              img {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            services {
              name
              text
              img {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            stack {
              name
              img {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/src/pages/" } }
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
  }
`;

export default IndexPage;
