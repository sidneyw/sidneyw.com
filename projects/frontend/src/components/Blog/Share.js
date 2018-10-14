// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import SocialIcon from '../SocialIcon';

const qs = {
  stringify: obj =>
    Object.entries(obj).reduce(
      (accum, [key, val], ind, arr) =>
        `${accum}${encodeURIComponent(key)}=${encodeURIComponent(val)}${
          ind !== arr.length - 1 ? '&' : ''
        }`,
      ''
    ),
};

const ShareRow = ({
  hideMobile,
  noText,
  shortText,
  siteUrl,
  slug,
  title,
  vertical,
}) => (
  <StaticQuery
    query={graphql`
      query ShareQuery {
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
    `}
    render={({ socialLinks, socialImages }) => {
      const socialLookup = socialImages.edges.reduce(
        (accum, { node: { name, childImageSharp } }) => {
          accum[name] = {
            childImageSharp,
            href: socialLinks.siteMetadata.social.find(
              social => social.name === name
            ).href,
          };
          return accum;
        }
      );

      return (
        <ShareRowStyle hideMobile={hideMobile}>
          <ShareText noText={noText} shortText={shortText}>
            Share <span>This Post</span>
          </ShareText>
          <ShareButtonWrap vertical={vertical}>
            <SocialIcon
              img={socialLookup.twitter.childImageSharp}
              href={`https://twitter.com/intent/tweet?${qs.stringify({
                text: `Check out ${title} at ${siteUrl}${slug}`,
              })}`}
            />

            <SocialIcon
              img={socialLookup.node.childImageSharp}
              href={`https://www.facebook.com/sharer/sharer.php?${qs.stringify({
                u: `${siteUrl}${slug}`,
              })}`}
            />

            <SocialIcon
              img={socialLookup.linkedin.childImageSharp}
              href={`https://www.linkedin.com/shareArticle?${qs.stringify({
                mini: true,
                source: siteUrl,
                title,
                url: `${siteUrl}${slug}`,
              })}`}
            />
          </ShareButtonWrap>
        </ShareRowStyle>
      );
    }}
  />
);
ShareRow.propTypes = {
  hideMobile: PropTypes.bool,
  noText: PropTypes.bool,
  shortText: PropTypes.bool,
  siteUrl: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
  vertical: PropTypes.bool,
};

export default ShareRow;

const shareDisplay = ({ vertical, shortText }) =>
  vertical || shortText ? 'none' : 'initial';

const ShareRowStyle = styled.div`
  display: ${({ hideMobile }) => (hideMobile ? 'none' : 'flex')};
  flex-flow: column;
  //pure-lg
  @media screen and (min-width: 64em) {
    display: flex;
  }
`;

const ShareText = styled.p`
  display: none;
  //pure-lg
  @media screen and (min-width: 64em) {
    display: block;
    margin-bottom: 0.5em;
    span {
      display: ${shareDisplay};
    }

    ${({ noText }) => noText && `display: none;`};
  }
`;

const ShareButtonWrap = styled.div`
  display: flex;
  flex-flow: ${({ vertical }) => (vertical ? 'column' : 'row')};
  align-items: center;

  & > * {
    margin: ${({ vertical }) => (vertical ? '0 0 0.5em 0' : '0 0.5em 0 0')};
  }
`;
