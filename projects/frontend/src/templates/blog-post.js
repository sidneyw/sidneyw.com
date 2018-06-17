// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import PostInfo from '../components/Blog/Info';
import PostMeta from '../components/Blog/Meta';
import Nav from '../components/Nav';
import { PropType as SocialPropType } from '../components/SocialIcon';
import {
  BackgroundImg,
  mergeSocial,
  imgPropTypeShape,
  imgListPropType,
} from '../components';

// const fbShare = `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.sidneyw.com%2F${
//   post.slug
// }`;
// const twitterShare = `https://twitter.com/intent/tweet?text=www.sidneyw.com`;
// const linkedinShare = `https://www.linkedin.com/shareArticle?mini=true&url=https://webcode.tools/open-graph-generator/article&title=Open%20Graph%20Article%20Generator%20-%20Web%20Code%20Tools&source=http://webcodetools.com`

const Post = ({
  data: { calendar, clock, dataJson, hamburger, post, socialIcons, tag },
}) => (
  <div>
    <PostMeta
      {...post.frontmatter}
      slug={post.fields.slug}
      excerpt={post.excerpt}
    />
    <Nav
      hamburger={hamburger}
      links={[{ to: '/', text: 'Home' }, { to: '/#about', text: 'About' }]}
      socialIcons={mergeSocial(dataJson.social, socialIcons)}
    />

    <PostContent>
      <h1>{post.frontmatter.title}</h1>
      <h5>Sidney Wijngaarde</h5>

      <PostInfo
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

const PostContent = styled.div`
  display: flex;
  flex-flow: column;
  width: 80vw;
  margin: 0 auto;

  font-size: 1em;

  & > h1 {
    margin-top: 8rem;
  }

  h5 {
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
    width: 45vw;
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
    margin: 1em 0;
  }

  blockquote {
    font-style: italic;
    background-color: ${({ theme }) => theme.em};
    border-left: 0.2em solid #333;
    padding: 0.5em;
  }

  a {
    /* text-decoration: none; */
    color: #000;
  }

  em {
    background-color: #e8e8e8;
  }

  .caption {
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 1em;
    font-size: 0.6em;
    color: rgba(0, 0, 0, 0.5);
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    font-size: 0.8em;
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
            sizes(maxWidth: 2400) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
      }
    }

    socialIcons: allImageSharp(
      filter: { id: { regex: "/.*assets/social/.*/" } }
    ) {
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
