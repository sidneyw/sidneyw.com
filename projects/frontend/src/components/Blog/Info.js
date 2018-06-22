// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Img from 'gatsby-image';

import { imgPropTypeShape } from '..';
import Tag from './Tag';
import { formatDate } from '../utils';

const PostInfo = ({ calendar, date, clock, timeToRead, tag, tags }) => (
  <PostInfoStyle>
    <div>
      <PostInfoIcon {...calendar} />
      <PostInfoText>{formatDate(date)}</PostInfoText>
      <PostInfoText>‧</PostInfoText>
      <PostInfoIcon {...clock} />
      <PostInfoText>{`${timeToRead} mins`}</PostInfoText>
    </div>
    {tags && <Tag icon={tag}>{tags[0]}</Tag>}
  </PostInfoStyle>
);

PostInfo.propTypes = {
  calendar: imgPropTypeShape,
  clock: imgPropTypeShape,
  date: PropTypes.number,
  tag: imgPropTypeShape,
  tags: PropTypes.arrayOf(PropTypes.string),
  timeToRead: PropTypes.number,
};

PostInfo.assets = ['calendar.png', 'clock.png', 'tag.png'];

export default PostInfo;

export const PostInfoStyle = styled.div`
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

export const PostInfoIcon = styled(Img)`
  height: 0.8em;
  width: 0.8em;
  margin-right: 0.25em;
`;

export const PostInfoText = styled.p`
  font-size: 0.6em;
  margin-right: 0.6em;
`;
