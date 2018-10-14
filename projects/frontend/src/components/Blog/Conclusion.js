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
        headshot: file(relativePath: { regex: "/headshot.jpg/" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={({ headshot }) => (
      <PostConclusion>
        <Bio>
          <Avatar {...headshot.childImageSharp} />
          <p>
            Consectetur eaque velit eligendi eveniet laborum nihil. Illo facilis
            ut expedita natus voluptatum. Beatae explicabo ipsa eos excepturi
            ipsa labore similique Quae beatae ad velit distinctio expedita Nam
            repudiandae ex?
          </p>
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
