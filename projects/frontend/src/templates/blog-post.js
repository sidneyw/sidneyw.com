// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';

import styled, { css, keyframes } from 'styled-components';

import { BackgroundImg } from '../components';

const Post = ({ data: { post } }) => {
  return (
    <div>
      <PostContent>
        <h1>{post.frontmatter.title}</h1>
        <h3>Sidney Wijngaarde</h3>

        <PostMeta {...post} />

        <BackgroundImg img={post.frontmatter.img.childImageSharp} />
        <PostText dangerouslySetInnerHTML={{ __html: post.html }} />
      </PostContent>
    </div>
  );
};

Post.propTypes = {};

export default Post;

const PostContent = styled.div``;
const PostText = styled.div``;

const PostMeta = styled.div``;

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
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
`;
