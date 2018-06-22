// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import PostInfo from '../components/Blog/Info';
import PostMeta from '../components/Blog/Meta';
import ShareRow from '../components/Blog/Share';

import Nav from '../components/Nav';
import { PropType as SocialPropType } from '../components/SocialIcon';
// import Button from '../components/Button';
import CTA from '../components/CTA';
import ContactModal from '../components/ContactModal';
import { Center, ZDepth1 } from '../components/mixins';
import {
  Avatar,
  BackgroundImg,
  imgPropTypeShape,
  imgListPropType,
} from '../components';

import { createAssetIdx, matchAssets, mergeBy } from '../components/Img';

const Post = ({ data: { dataJson, hq, icons, post, site } }) => {
  const assetIdx = createAssetIdx(icons, hq);

  return (
    <PageWrap>
      <PostMeta
        {...post.frontmatter}
        slug={post.fields.slug}
        excerpt={post.excerpt}
      />
      <Nav
        {...matchAssets(assetIdx, ['hamburger.png'])}
        links={[{ to: '/', text: 'Home' }, { to: '/#about', text: 'About' }]}
        socialIcons={mergeBy(assetIdx, dataJson.social)}
      />

      <PostContent>
        <h1>{post.frontmatter.title}</h1>
        <h5>Sidney Wijngaarde</h5>

        <PostInfo
          {...matchAssets(assetIdx, PostInfo.assets)}
          timeToRead={post.timeToRead}
          date={post.frontmatter.date}
          tags={post.frontmatter.tags}
        />

        <PostHeroImage img={post.frontmatter.img.childImageSharp} />
        <PostText dangerouslySetInnerHTML={{ __html: post.html }} />
        <PostConclusion>
          <Bio>
            <Avatar {...assetIdx['headshot.jpg']} />
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
            socialIcons={mergeBy(assetIdx, [
              { name: 'twitter' },
              { name: 'facebook' },
              { name: 'linkedin' },
              { name: 'copylink' },
            ])}
          />
        </PostConclusion>
      </PostContent>
      <Sidebar>
        <CTA
          {...matchAssets(assetIdx, CTA.assets)}
          stack={mergeBy(
            assetIdx,
            dataJson.stack.map(stack => ({ name: stack }))
          )}
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
          socialIcons={mergeBy(assetIdx, [
            { name: 'twitter' },
            { name: 'facebook' },
            { name: 'linkedin' },
            { name: 'copylink' },
          ])}
        />
      </StickyShare>
      <BottomBar>
        <ShareRow
          siteUrl={site.siteMetadata.siteUrl}
          slug={post.fields.slug}
          title={post.frontmatter.title}
          shortText
          socialIcons={mergeBy(assetIdx, [
            { name: 'twitter' },
            { name: 'facebook' },
            { name: 'linkedin' },
            { name: 'copylink' },
          ])}
        />
        <ContactModal {...matchAssets(assetIdx, ContactModal.assets)} />
      </BottomBar>
    </PageWrap>
  );
};

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
  width: 80vw;

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
  width: 80vw;

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

const PostConclusion = styled.div`
  display: flex;
  flex-flow: column;
  font-size: 0.7em;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
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
  background-color: #fff;
  ${ZDepth1};

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

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 1em;
  ${ZDepth1};

  // pure-lg
  @media screen and (min-width: 64em) {
    display: none;
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

    dataJson {
      social {
        name
        href
      }
      stack
    }

    site {
      siteMetadata {
        siteUrl
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

    hq: allImageSharp(filter: { id: { regex: "/.*assets/hq/.*/" } }) {
      edges {
        node {
          id
          sizes(maxWidth: 2400) {
            ...GatsbyImageSharpSizes_withWebp
          }
        }
      }
    }
  }
`;
