// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PostPreview from '../components/Blog/Preview';
import NewsLetterForm from '../components/NewsLetterForm';
import Layout from '../layouts';

import { imgListPropType, imgPropTypeShape } from '../components/Img';

import SocialIcon, {
  PropType as SocialPropType,
} from '../components/SocialIcon';

const BlogPage = ({ data: { socialLinks, socialImages, posts } }) => {
  const socialLookup = socialImages.edges.reduce(
    (accum, { node: { name, childImageSharp } }) => {
      accum[name] = {
        img: childImageSharp,
        href: socialLinks.siteMetadata.social.find(
          social => social.name === name
        ).href,
      };
      return accum;
    }
  );

  return (
    <Layout>
      <Blog>
        <h1>SIDNEY WIJNGAARDE</h1>
        <h3>Sometimes I Code Things...</h3>
        <Socials>
          <SocialIcon {...socialLookup.twitter} />
          <SocialIcon {...socialLookup.medium} />
          <SocialIcon {...socialLookup.github} />
          <SocialIcon {...socialLookup.linkedin} />
        </Socials>
        <h3>Stay Updated</h3>
        <NewsLetterForm />
        <Posts>
          {posts.edges.map(({ node }) => (
            <PostPreview
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
    </Layout>
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

  h1 {
    text-align: center;
  }

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
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
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
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    socialLinks: site {
      siteMetadata {
        social {
          name
          href
        }
      }
    }
    socialImages: allFile(filter: { relativeDirectory: { eq: "social" } }) {
      edges {
        node {
          name
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
