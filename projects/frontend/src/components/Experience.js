// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
// import Link from 'gatsby-link';
import styled from 'styled-components';
import Img from 'gatsby-image';

import { Heading, ImgPropType } from './index';
import { Thirds, ZDepth1 } from './mixins';

const ExperienceSection = ({ exp }) => (
  <Experience id="experience">
    <Heading>Experience</Heading>
    <ExperienceWrap>
      {exp.map(({ node: { frontmatter } }, ind) => (
        <ExperienceCard
          key={ind}
          img={frontmatter.image.childImageSharp.sizes}
          title={frontmatter.title}
          link={frontmatter.link}
        />
      ))}
    </ExperienceWrap>
  </Experience>
);

ExperienceSection.propTypes = {
  exp: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        frontmatter: PropTypes.shape({
          image: PropTypes.object,
          title: PropTypes.string,
        }),
      }),
    })
  ),
};

export default ExperienceSection;

const ExperienceCard = ({ link, img }) => (
  <BlogLink href={link} target="_blanc">
    <Img sizes={img} />
  </BlogLink>
);

ExperienceCard.propTypes = {
  img: ImgPropType,
  link: PropTypes.string,
};

const Experience = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 5vh 0;

  h1 {
    margin: 5vh 0;
  }
`;

const ExperienceWrap = styled.div`
  width: 90vw;
  display: flex;
  flex-flow: column;

  // pure-md
  @media screen and (min-width: 48em) {
    flex-flow: row wrap;
  }
`;

const BlogLink = styled.a`
  ${ZDepth1} ${Thirds}
  position: relative;
  margin: 0 0 10px 0;
  text-decoration: none;
  transition: all 200ms ease-in;
  overflow-y: hidden;

  &:visited {
    text-decoration: none;
  }
`;
