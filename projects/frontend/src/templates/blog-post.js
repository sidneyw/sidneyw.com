// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';

import styled, { css, keyframes } from 'styled-components';
import PostMeta from '../components/Blog/Meta';

import Nav from '../components/Nav';
import { BackgroundImg, mergeSocial } from '../components';

const Post = ({ data: { post, clock, calendar, tag, ...data } }) => {
  return (
    <div>
      <Nav
        hamburger={data.hamburger}
        links={[
          { to: '/blog', text: 'Home' },
          { to: '/#about', text: 'About' },
        ]}
        socialIcons={mergeSocial(data.dataJson.social, data.allImageSharp)}
      />

      <PostContent>
        <h1>{post.frontmatter.title}</h1>
        <h6>Sidney Wijngaarde</h6>

        <PostMeta
          calendar={calendar}
          clock={clock}
          timeToRead={post.timeToRead}
          date={post.frontmatter.date}
          tags={post.frontmatter.tags}
          tagIcon={tag}
        />

        <PostHeroImage img={post.frontmatter.img.childImageSharp} />
        <PostText dangerouslySetInnerHTML={{ __html: post.html }} />
      </PostContent>
    </div>
  );
};

Post.propTypes = {};

export default Post;

const PostContent = styled.div`
  display: flex;
  flex-flow: column;
  width: 80vw;
  margin: 0 auto;

  font-size: 0.8em;
  h1 {
    margin-top: 8rem;
  }
  h6 {
    font-weight: 300;
    margin-top: 0.5rem;
  }

  //pure-lg
  @media screen and (min-width: 64em) {
    h1 {
      font-weight: 400;
    }
    font-size: 1em;
    width: 50vw;
  }

  // pure-xl
  @media screen and (min-width: 80em) {
    width: 40vw;
  }
`;

const PostHeroImage = styled(BackgroundImg)`
  width: 100%;
  height: 30vh;
  border-radius: 1rem;
  overflow: hidden;
  margin: 0.5em 0;
`;

const PostText = styled.div`
  p {
    margin: 0.5em 0;
  }
`;

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

    calendar: imageSharp(id: { regex: "/calendar-alt.png/" }) {
      sizes(maxWidth: 200) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }

    clock: imageSharp(id: { regex: "/clock.png/" }) {
      sizes(maxWidth: 200) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }

    dataJson {
      social {
        name
        href
      }
    }

    hamburger: imageSharp(id: { regex: "/hamburger.png/" }) {
      sizes {
        ...GatsbyImageSharpSizes_withWebp
      }
    }

    tag: imageSharp(id: { regex: "/tag.png/" }) {
      sizes(maxWidth: 200) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
  }
`;
