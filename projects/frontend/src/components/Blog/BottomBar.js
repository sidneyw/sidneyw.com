import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import { ZDepth1 } from '../mixins';
import ContactModal from '../ContactModal';
import Button from '../Button';
import ShareRow from './Share';

const BottomBar = ({ post }) => (
  <BottomBarStyle>
    <ShareRow
      slug={post.fields.slug}
      title={post.frontmatter.title}
      shortText
    />
    <ContactModal>{props => <ContactMobile {...props} />}</ContactModal>
  </BottomBarStyle>
);

BottomBar.propTypes = {
  siteUrl: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
};

const BottomBarStyle = styled.div`
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

const ContactMobile = ({ toggle }) => (
  <StaticQuery
    query={graphql`
      query ContactMobileButton {
        buttonIcon: file(relativePath: { regex: "/send.png/" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={({ buttonIcon }) => (
      <ContactMobileStyle
        secondary
        icon={buttonIcon.childImageSharp}
        onClick={toggle}
        className="cta-contact-launch"
      >
        <span>Contact</span>
      </ContactMobileStyle>
    )}
  />
);

ContactMobile.propTypes = {
  toggle: PropTypes.func.isRequired,
};

const ContactMobileStyle = styled(Button)`
  & > div {
    margin-right: 0;
  }

  span {
    display: none;
    height: 3vh;
    width: 3vh;
  }
`;

export default BottomBar;
