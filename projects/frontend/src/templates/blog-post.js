import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import styled from 'styled-components';
import { DiscussionEmbed } from 'disqus-react';
import Nav from '../components/Nav';
import { PropType as SocialPropType } from '../components/SocialIcon';
import { Center } from '../components/mixins';
import Layout from '../layouts';

import {
  BackgroundImg,
  imgPropTypeShape,
  imgListPropType,
} from '../components/Img';

import {
  BottomBar,
  PostConclusion,
  PostInfo,
  PostMeta,
  PostText,
  ShareRow,
} from '../components/Blog/';

const Post = ({ data: { post, site } }) => (
  <Layout>
    <PageWrap>
      <PostMeta
        {...post.frontmatter}
        slug={post.fields.slug}
        excerpt={post.excerpt}
      />
      <Nav links={[{ to: '/about', text: 'About' }]} />

      <PostContent>
        <h1>{post.frontmatter.title}</h1>
        <h5>Sidney Wijngaarde</h5>

        <PostInfo
          timeToRead={post.timeToRead}
          date={post.frontmatter.date}
          tags={post.frontmatter.tags}
        />

        <PostHeroImage img={post.frontmatter.img.childImageSharp} />
        <PostText dangerouslySetInnerHTML={{ __html: post.html }} />
        <PostConclusion post={post} />
        <DiscussionEmbed
          shortname="sidneyw-com"
          config={{
            url: `${site.siteMetadata.siteUrl}/${post.fields.slug}`,
            identifier: post.fields.slug,
            title: post.frontmatter.title,
          }}
        />
      </PostContent>
      <StickyShare>
        <ShareRow
          siteUrl={site.siteMetadata.siteUrl}
          slug={post.fields.slug}
          title={post.frontmatter.title}
          vertical
          shortText
        />
      </StickyShare>
      <BottomBar post={post} />
    </PageWrap>
  </Layout>
);

Post.propTypes = {
  data: PropTypes.shape({
    calendar: imgPropTypeShape,
    clock: imgPropTypeShape,
    dataJson: PropTypes.shape({
      social: PropTypes.arrayOf(SocialPropType),
    }),
    hamburger: imgPropTypeShape,
    message: imgPropTypeShape,
    socialIcons: imgListPropType,
    tag: imgPropTypeShape,
  }),
};

export default Post;

const PageWrap = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-bottom: 15vh;

  //pure-lg
  // @media screen and (min-width: 64em) {
  //   flex-flow: row;
  //   justify-content: space-between;
  //   align-items: flex-start;
  // }
`;

const PostContent = styled.div`
  display: flex;
  flex-flow: column;
  width: 90vw;

  font-size: 1em;

  & > h1 {
    margin-top: 6rem;
  }

  h5 {
    margin-top: 0.5rem;
  }

  //pure-lg
  @media screen and (min-width: 64em) {
    & > h1 {
      margin-top: 8rem;
    }

    h1 {
      font-weight: 400;
    }
    font-size: 1em;
    width: 60vw;
  }

  // pure-xl
  @media screen and (min-width: 80em) {
    // width: 50vw;
  }
`;

const PostHeroImage = styled(BackgroundImg)`
  width: 100%;
  height: 17rem;
  border-radius: 1rem;
  overflow: hidden;
  margin: 0.5em 0;

  //pure-lg
  @media screen and (min-width: 64em) {
    height: 25rem;
  }
`;

const StickyShare = styled.div`
  display: none;
  position: fixed;

  //pure-lg
  @media screen and (min-width: 64em) {
    ${Center};
    border-radius: 0 5px 5px 0;
    height: 30vh;
    width: 7vw;
    max-width: 7rem;
    bottom: 35vh;
    left: 0;
  }
`;

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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
            fluid(maxWidth: 2400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
