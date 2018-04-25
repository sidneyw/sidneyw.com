// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Img from 'gatsby-image';

import { Heading } from './index';
import { Thirds, ZDepth1, ZDepth3 } from './mixins';

const ExperienceSection = ({ exp }) => (
  <Experience id="experience">
    <Heading>Experience</Heading>
    <ExperienceWrap>
      {exp.map(({ node: { frontmatter, fields } }, ind) => (
        <ExperienceCard
          key={ind}
          img={frontmatter.image.childImageSharp.sizes}
          title={frontmatter.title}
          slug={fields.slug}
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

const ExperienceCard = ({ slug, title, img }) => (
  <BlogLink to={slug}>
    <Img sizes={img} />
    <h2>{title}</h2>
  </BlogLink>
);

ExperienceCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  img: PropTypes.object,
  slug: PropTypes.string,
  title: PropTypes.string,
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

const BlogLink = styled(Link)`
  ${ZDepth1} ${Thirds}
  position: relative;
  margin: 0 0 10px 0;
  text-decoration: none;
  transition: all 200ms ease-in;
  overflow-y: hidden;

  h2 {
    position: absolute;
    bottom: 0;
    left: 0;

    background-color: #fff;
    color: #333;
    width: 100%;
    padding: 10px 5px;

    transform: translateY(40vh);
    transition: all 200ms ease;
  }

  &:visited {
    text-decoration: none;
  }

  &:hover {
    ${ZDepth3} z-index: 5;

    h2 {
      transform: translateY(0);
    }
  }
`;
