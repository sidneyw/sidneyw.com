// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Img from 'gatsby-image';

import { BackgroundImg, imgPropTypeShape } from '..';
import Tag from './Tag';
import { formatDate } from '../utils';

const PostMeta = ({ calendar, date, clock, timeToRead, tagIcon, tags }) => {
  return (
    <PostMetaStyle>
      <div>
        <PostMetaIcon {...calendar} />
        <PostMetaText>{formatDate(date)}</PostMetaText>
        <PostMetaText>‧</PostMetaText>
        <PostMetaIcon {...clock} />
        <PostMetaText>{`${timeToRead} mins`}</PostMetaText>
      </div>
      {tags && <Tag icon={tagIcon}>{tags[0]}</Tag>}
    </PostMetaStyle>
  );
};

PostMeta.propTypes = {
  calendar: imgPropTypeShape,
  clock: imgPropTypeShape,
  date: PropTypes.number,
  tagIcon: imgPropTypeShape,
  tags: PropTypes.arrayOf(PropTypes.string),
  timeToRead: PropTypes.number,
};

export default PostMeta;

export const PostMetaStyle = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: row nowrap;
    justify-content: flex-start;
    align-items: center;
    width: initial;
  }
`;

export const PostMetaIcon = styled(Img)`
  height: 0.8em;
  width: 0.8em;
  // pure-md
  @media screen and (min-width: 48em) {
    height: 0.6em;
    width: 0.6em;
  }

  margin-right: 0.25em;
`;

export const PostMetaText = styled.p`
  font-size: 0.6em;
  margin-right: 0.6em;
`;
