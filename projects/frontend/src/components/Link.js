// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const UnifiedLink = ({ href, text, ...rest }) => {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  const Wrapper = href ? props => <a {...props} /> : Link;

  const props = { href, children: rest.children || text, ...rest };

  return <Wrapper {...props} />;
};

UnifiedLink.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
};

export default UnifiedLink;
