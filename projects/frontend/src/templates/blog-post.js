import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import styled from 'styled-components';
import { DiscussionEmbed } from 'disqus-react';
import Nav from '../components/Nav';
import { PropType as SocialPropType } from '../components/SocialIcon';
import CTA from '../components/CTA';
import { Center } from '../components/mixins';
import Layout from '../layouts';

import {
  Avatar,
  BackgroundImg,
  imgPropTypeShape,
  imgListPropType,
} from '../components/Img';

import PostInfo from '../components/Blog/Info';
import PostMeta from '../components/Blog/Meta';
import ShareRow from '../components/Blog/Share';
import BottomBar from '../components/Blog/BottomBar';

const Post = ({ data: { ctaStack, headshot, post, site } }) => (
  <Layout>
    <PageWrap>
      <PostMeta
        {...post.frontmatter}
        slug={post.fields.slug}
        excerpt={post.excerpt}
      />
      <Nav
        links={[{ to: '/', text: 'Home' }, { to: '/#about', text: 'About' }]}
      />

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
        <PostConclusion>
          <Bio>
            <Avatar {...headshot.childImageSharp} />
            <p>
              Consectetur eaque velit eligendi eveniet laborum nihil. Illo
              facilis ut expedita natus voluptatum. Beatae explicabo ipsa eos
              excepturi ipsa labore similique Quae beatae ad velit distinctio
              expedita Nam repudiandae ex?
            </p>
          </Bio>
          <ShareRow
            siteUrl={site.siteMetadata.siteUrl}
            slug={post.fields.slug}
            title={post.frontmatter.title}
            hideMobile
          />
        </PostConclusion>
        <DiscussionEmbed
          shortname="sidneyw-com"
          config={{
            url: `${site.siteMetadata.siteUrl}/${post.fields.slug}`,
            identifier: post.fields.slug,
            title: post.frontmatter.title,
          }}
        />
      </PostContent>
      <Sidebar>
        <CTA
          stack={ctaStack.edges[0].node.childDataJson.stack}
          title="Let's Build Something Together With"
        />
      </Sidebar>
      <StickyShare>
        <ShareRow
          siteUrl={site.siteMetadata.siteUrl}
          slug={post.fields.slug}
          title={post.frontmatter.title}
          vertical
          shortText
        />
      </StickyShare>
      <BottomBar
        siteUrl={site.siteMetadata.siteUrl}
        slug={post.fields.slug}
        title={post.frontmatter.title}
      />
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
  @media screen and (min-width: 64em) {
    flex-flow: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-flow: column;
  width: 100vw;

  //pure-lg
  @media screen and (min-width: 64em) {
    margin-top: 8rem;
    margin-right: 5vw;
    width: 30vw;
  }
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
    width: 50vw;
    margin-left: 15vw;
  }

  // pure-xl
  @media screen and (min-width: 80em) {
    width: 45vw;
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
            sizes(maxWidth: 2400) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
      }
    }

    headshot: file(relativePath: { regex: "/headshot.jpg/" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    ctaStack: allFile(filter: { relativePath: { eq: "fed.json" } }) {
      edges {
        node {
          childDataJson {
            stack {
              name
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
    }

    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
