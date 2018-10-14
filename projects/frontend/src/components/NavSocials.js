import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import SocialIcon from './SocialIcon';
import { Center } from './mixins';

const NavSocialIcons = () => (
  <StaticQuery
    query={graphql`
      query NavbarSocialIcons {
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
            img: childImageSharp,
            href: socialLinks.siteMetadata.social.find(
              social => social.name === name
            ).href,
          };
          return accum;
        }
      );

      return (
        <SocialWrap>
          <NavSocial {...socialLookup.twitter} />
          <NavSocial {...socialLookup.medium} />
          <NavSocial {...socialLookup.github} />
          <NavSocial {...socialLookup.linkedin} />
        </SocialWrap>
      );
    }}
  />
);

const SocialWrap = styled.div`
  ${Center} height: 100%;
  width: 100%;
  margin-top: 5px;
  // pure-md
  @media screen and (min-width: 48em) {
    width: initial;
    margin-top: 0px;
  }
`;

const NavSocial = styled(SocialIcon)`
  margin: 0.5em;

  // pure-md
  @media screen and (min-width: 48em) {
    margin: 0.2em;
  }
`;

export default NavSocialIcons;
