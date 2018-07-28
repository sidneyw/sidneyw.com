// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  noText,
  hideMobile,
  shortText,
  socialIcons,
  siteUrl,
  slug,
  title,
  vertical,
}) => {
  const socialMap = socialIcons.reduce(
    (accum, curr) => ({
      ...accum,
      [curr.name]: curr.img,
    }),
    {}
  );

  return (
    <ShareRowStyle hideMobile={hideMobile}>
      <ShareText noText={noText} shortText={shortText}>
        Share <span>This Post</span>
      </ShareText>
      <ShareButtonWrap vertical={vertical}>
        <SocialIcon
          img={socialMap.twitter}
          href={`https://twitter.com/intent/tweet?${qs.stringify({
            text: `Check out ${title} at ${siteUrl}${slug}`,
          })}`}
        />

        <SocialIcon
          img={socialMap.facebook}
          href={`https://www.facebook.com/sharer/sharer.php?${qs.stringify({
            u: `${siteUrl}${slug}`,
          })}`}
        />

        <SocialIcon
          img={socialMap.linkedin}
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
};

ShareRow.propTypes = {};

export default ShareRow;

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
      display: ${({ vertical, shortText }) =>
        vertical || shortText ? 'none' : 'initial'};
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
