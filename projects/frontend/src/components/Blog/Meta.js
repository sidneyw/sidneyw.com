// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { imgPropTypeShape } from '../Img';
import { yearMonthDay } from '../utils';

const Meta = ({
  author = 'Sidney Wijngaarde',
  date,
  excerpt,
  img,
  siteRoot = 'https://www.sidneyw.com',
  slug,
  title,
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={excerpt} />
    <meta name="robots" content="index, follow" />
    <meta name="author" content={author} />

    <meta property="og:type" content="article" />
    <meta property="og:title" content={title} />
    <meta property="og:site_name" content="sidneyw" />
    <meta property="og:url" content={`${siteRoot}/${slug}`} />
    <meta
      property="og:image"
      content={`${siteRoot}${img.childImageSharp.fluid.srcWebp}`}
    />
    <meta property="article:published_time" content={yearMonthDay(date)} />
    {/* <meta property="article:author" content="https://www.sidneyw.com/about" /> */}
  </Helmet>
);

Meta.propTypes = {
  author: PropTypes.string,
  date: PropTypes.number,
  excerpt: PropTypes.string,
  img: imgPropTypeShape,
  siteRoot: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
};

export default Meta;
