// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormState from '../components/FormState';
import PostPreview from '../components/Blog/Preview';
import {
  formFieldStyle,
  mergeSocial,
  imgPropTypeShape,
  imgListPropType,
} from '../components';

import Button from '../components/Button';
import SocialIcon, {
  PropType as SocialPropType,
} from '../components/SocialIcon';

const BlogPage = ({ data }) => (
  <Blog>
    <h1>SIDNEY WIJNGAARDE</h1>
    <h3>Sometimes I Code Things...</h3>
    <Socials>
      {mergeSocial(data.dataJson.social, data.socialIcons).map(social => (
        <SocialIcon {...social} key={social.name} />
      ))}
    </Socials>
    <h3>Stay Updated</h3>
    <FormState endpoint="/signup">
      {({ handleChange, handleSubmit, state }) => (
        <NewsLetter name="email-list" id="email-list" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={state.email}
            name="email"
            type="email"
            placeholder="someone@mail.com"
            required
          />
          <Button icon={data.message}>
            <span>Subscribe</span>
          </Button>
        </NewsLetter>
      )}
    </FormState>
    <Posts>
      {data.posts.edges.map(({ node }) => (
        <PostPreview
          calendar={data.calendar}
          clock={data.clock}
          excerpt={node.excerpt}
          timeToRead={node.timeToRead}
          key={node.id}
          tagIcon={data.tag}
          to={node.fields.slug}
          {...node.frontmatter}
          img={node.frontmatter.img.childImageSharp}
        />
      ))}
    </Posts>
  </Blog>
);

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

  font-size: 0.7em;
  h1 {
    font-weight: 300;
  }

  h3 {
    font-weight: 100;
    &:nth-of-type(2) {
      margin-bottom: 0.3em;
    }
  }

  // pure-md
  @media screen and (min-width: 48em) {
    font-size: 1em;
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

const NewsLetter = styled.form`
  display: flex;
  flex-flow: column;
  width: 90vw;
  max-width: 20rem;
  max-height: 50rem;

  & > button,
  & > input {
    width: 100%;
    height: 6vh !important;
  }

  button {
    padding: 0;
    img {
      height: 100%;
    }

    & > div {
      display: none;
    }
  }

  input {
    ${formFieldStyle};
    margin-bottom: 0.5em;
  }
  //pure-lg
  @media screen and (min-width: 64em) {
    flex-flow: row;
    width: 50vw;
    max-width: 30rem;

    & > * {
      margin-bottom: 0;
    }

    input {
      width: 70%;
      margin-right: 0.5rem;
      text-align: right;
      max-height: 10rem;
    }

    button {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 0;
      padding: 0;

      align-items: center;
      & * {
        margin: 0;
        padding: 0;
        height: 100%;
        max-height: 100%;
      }

      & > div {
        display: initial;
      }

      span {
        display: none;
      }
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
    posts: allMarkdownRemark(filter: { id: { regex: "/blog*/" } }) {
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

    dataJson {
      social {
        name
        href
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

    tag: imageSharp(id: { regex: "/tag.png/" }) {
      sizes(maxWidth: 200) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }

    message: imageSharp(id: { regex: "/message.png/" }) {
      sizes(maxWidth: 200) {
        ...GatsbyImageSharpSizes_withWebp
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
  }
`;
