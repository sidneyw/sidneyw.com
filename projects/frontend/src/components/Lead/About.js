// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SplitSection } from '..';
import PostPreview from '../Blog/Preview';
import { ZDepth1, ZDepth3 } from '../mixins';
import Button from '../Button';
import { BackgroundImg, imgPropType, matchAssets } from '../Img';

const borderRadius = '0.5rem';

const AboutSection = ({ posts, assetIdx, chauoanShot, terminal, newyork }) => (
  <SplitSection>
    <AboutSidney>
      <AboutCard
        img={chauoanShot}
        title="About Me"
        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
        vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
        no sea takimata sanctus est Lorem ipsum dolor sit amet."
      />
    </AboutSidney>
    <Posts>
      <h2>Check Out My Blog</h2>
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
      <BlogButton to="/">All Posts</BlogButton>
    </Posts>
  </SplitSection>
);

AboutSection.propTypes = {
  newyork: PropTypes.shape({ sizes: imgPropType }),
  chauoanShot: PropTypes.shape({ sizes: imgPropType }),
};

AboutSection.assets = ['terminal.png', 'chauoanShot.jpg', 'newyork.png'];
export default AboutSection;

const BlogButton = styled(Button)`
  width: 50%;
  margin: 0 auto 2rem;
`;

const AboutSidney = styled.div`
  display: flex;
  justify-content: center;
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

const AboutButton = styled(Button)`
  width: 45%;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1em;
`;

const AboutCard = ({ img, title, text, to, children }) => (
  <AboutStyle>
    <AboutImg img={img} />
    <AboutContent>
      <h2>{title}</h2>
      <p>{text}</p>
      <ButtonWrap>
        <AboutButton to="/">Learn More</AboutButton>
        <AboutButton secondary to="/">
          Contact Me
        </AboutButton>
      </ButtonWrap>
    </AboutContent>
  </AboutStyle>
);
