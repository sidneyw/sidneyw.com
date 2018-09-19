import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Button from 'components/Button';

const ContactModalButton = ({ toggle, className = '' }) => (
  <StaticQuery
    query={graphql`
      query ContactModalButton {
        buttonIcon: file(relativePath: { regex: "/send/" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={({ buttonIcon }) => (
      <Button
        icon={buttonIcon.childImageSharp}
        secondary
        onClick={toggle}
        className={`cta-contact-launch${className || ''}`}
      >
        <span>Contact</span>
      </Button>
    )}
  />
);

ContactModalButton.propTypes = {
  className: PropTypes.string,
  toggle: PropTypes.func.isRequired,
};

export default ContactModalButton;
