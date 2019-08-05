import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import { Avatar } from '../Img';
import ShareRow from './Share';

const PostConclustion = ({ post }) => (
  <StaticQuery
    query={graphql`
      query PostConclusion {
        content: markdownRemark(
          fileAbsolutePath: { regex: "/description.md/" }
        ) {
          html
        }
        headshot: file(relativePath: { regex: "/avatar.png/" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={({ headshot, content }) => (
      <PostConclusion>
        <Bio>
          <StyledAvatar {...headshot.childImageSharp} />
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </Bio>
        <ShareRow
          slug={post.fields.slug}
          title={post.frontmatter.title}
          hideMobile
        />
      </PostConclusion>
    )}
  />
);

PostConclustion.propTypes = {
  siteUrl: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
};

const StyledAvatar = styled(Avatar)`
  margin-right: 0.7em;
`;

const PostConclusion = styled.div`
  display: flex;
  flex-flow: column;
  font-size: 0.7em;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 1em;
  padding: 1em 0;

  //pure-lg
  @media screen and (min-width: 64em) {
    flex-flow: row;
    justify-content: space-between;
  }
`;

const Bio = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;

  //pure-lg
  @media screen and (min-width: 64em) {
    width: 65%;
  }
`;

export default PostConclustion;
