import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import { SplitSection } from '..';
import PostPreview from '../Blog/Preview';
import { ZDepth1 } from '../mixins';
import Button from '../Button';
import ContactModal from '../ContactModal';
import ContactModalButton from '../ContactModalButton';
import { BackgroundImg, imgPropType } from '../Img';

const AboutSection = ({ posts }) => (
  <StaticQuery
    query={graphql`
      query AboutQuery {
        content: markdownRemark(fileAbsolutePath: { regex: "/about.md/" }) {
          html
        }
        chauoanShot: file(relativePath: { regex: "/chauoanShot.jpg/" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={({ chauoanShot, content }) => (
      <SplitSection id="about">
        <AboutSidney>
          <AboutCard
            img={chauoanShot.childImageSharp}
            title="About Me"
            html={content.html}
          />
        </AboutSidney>
        <Posts>
          <h2>Check Out My Blog</h2>
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
          <BlogButton to="/">All Posts</BlogButton>
        </Posts>
      </SplitSection>
    )}
  />
);

AboutSection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  posts: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default AboutSection;

const BlogButton = styled(Button)`
  width: 50%;
  margin: 0 auto 2rem;
`;

const AboutSidney = styled.div`
  display: flex;
  justify-content: center;

  // pure-md
  @media screen and (min-width: 48em) {
    font-size: 1rem;
  }
`;

const Posts = styled.div`
  padding: 0 5%;

  & > h2 {
    margin: 1rem auto;
    text-align: center;
  }
`;

const AboutStyle = styled.div`
  ${ZDepth1};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: 1rem auto;
  display: flex;
  flex-flow: column wrap;
  width: 90%;
  overflow: hidden;

  // pure-md
  @media screen and (min-width: 48em) {
    width: 95%;
  }

  //pure-lg
  @media screen and (min-width: 64em) {
    max-width: 30rem;
    align-self: center;
  }
`;

const AboutImg = styled(BackgroundImg)`
  width: 100%;
  height: 15rem;
  overflow: hidden;
  border-radius: ${({ theme }) =>
    `${theme.borderRadius} ${theme.borderRadius} 0 0`};

  //pure-lg
  @media screen and (min-width: 64em) {
    height: 20rem;
  }
`;

const AboutContent = styled.div`
  padding: 1em;
  background-color: #fff;
  h2 {
    text-align: center;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1em;
  & > {
    width: 45%;
  }
`;

const AboutCard = ({ img, title, html }) => (
  <AboutStyle>
    <AboutImg img={img} />
    <AboutContent>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <ButtonWrap>
        <ContactModal>
          {props => <ContactModalButton {...props} />}
        </ContactModal>
      </ButtonWrap>
    </AboutContent>
  </AboutStyle>
);

AboutCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  assetIdx: PropTypes.object,
  chauoanShot: PropTypes.shape({ sizes: imgPropType }),
  img: PropTypes.shape({ sizes: imgPropType }),
  posts: PropTypes.arrayOf(PropTypes.object),
  text: PropTypes.string,
  title: PropTypes.string,
};
