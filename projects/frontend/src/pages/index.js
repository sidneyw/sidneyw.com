// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PostPreview from '../components/Blog/Preview';
import NewsLetterForm from '../components/NewsLetterForm';

import {
  createAssetIdx,
  imgListPropType,
  imgPropTypeShape,
  matchAssets,
  mergeBy,
} from '../components/Img';

import SocialIcon, {
  PropType as SocialPropType,
} from '../components/SocialIcon';

const BlogPage = ({ data: { dataJson, posts, icons } }) => {
  const assetIdx = createAssetIdx(icons);

  return (
    <Blog>
      <h1>SIDNEY WIJNGAARDE</h1>
      <h3>Sometimes I Code Things...</h3>
      <Socials>
        {mergeBy(assetIdx, dataJson.social).map(social => (
          <SocialIcon {...social} key={social.name} />
        ))}
      </Socials>
      <h3>Stay Updated</h3>
      <NewsLetterForm {...matchAssets(assetIdx, NewsLetterForm.assets)} />
      <Posts>
        {posts.edges.map(({ node }) => (
          <PostPreview
            {...matchAssets(assetIdx, PostPreview.assets)}
            excerpt={node.excerpt}
            timeToRead={node.timeToRead}
            key={node.id}
            to={node.fields.slug}
            {...node.frontmatter}
            img={node.frontmatter.img.childImageSharp}
          />
        ))}
      </Posts>
    </Blog>
  );
};

BlogPage.propTypes = {
  data: PropTypes.shape({
    calendar: imgPropTypeShape,
    clock: imgPropTypeShape,
    dataJson: PropTypes.shape({
      social: PropTypes.arrayOf(SocialPropType),
    }),
    message: imgPropTypeShape,
    socialIcons: imgListPropType,
  }),
};

export default BlogPage;

const Blog = styled.div`
  padding-top: 2rem;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    &:nth-of-type(2) {
      margin-bottom: 0.3em;
    }
  }
`;

const Socials = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1rem 0;
  width: 50vw;
  padding: 1rem 0;
  border-top: 0.1rem solid rgba(0, 0, 0, 0.1);
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);

  & > a {
    margin-bottom: 0;
    margin-right: 1rem;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Posts = styled.div`
  margin-top: 2em;
  width: 90vw;
  max-width: 40rem;

  // pure-md
  @media screen and (min-width: 48em) {
    width: 70vw;
  }

  //pure-lg
  @media screen and (min-width: 64em) {
    width: 70vw;
  }
`;

export const query = graphql`
  query BlogQuery {
    posts: allMarkdownRemark {
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

    dataJson {
      social {
        name
        href
      }
    }
  }
`;
