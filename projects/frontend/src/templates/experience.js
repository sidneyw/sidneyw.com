// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Img from 'gatsby-image';

const ExperienceTemplate = ({ data: { markdownRemark: post } }) => (
  <Experience>
    <HeaderImage color={post.frontmatter.color}>
      <ImageWrap>
        <Img sizes={post.frontmatter.image.childImageSharp.sizes} alt="" />
      </ImageWrap>
    </HeaderImage>
    <Container>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Container>
  </Experience>
);

ExperienceTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      post: PropTypes.shape({
        frontmatter: PropTypes.shape({
          color: PropTypes.string,
          image: PropTypes.object,
          title: PropTypes.string,
        }),
      }),
    }),
  }),
};

export default ExperienceTemplate;

const Experience = styled.div``;

const HeaderImage = styled.div`
  width: 100vw;
  background-color: ${({ color }) => color};
  padding: 10px;
`;

const ImageWrap = styled.div`
  max-width: 50vw;
  display: block;
  margin: 0 auto;
`;

const Container = styled.div`
  display: block;
  margin: 0 auto;
  width: 95%;
  min-height: 100vh;
  max-width: 960px;

  // pure-md
  @media screen and (min-width: 48em) {
    width: 75%;
  }
`;

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        type
        color
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
    }
  }
`;
