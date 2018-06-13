// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from '../Link';

import { PostMeta, PostMetaIcon, PostMetaText } from './Meta';
import { Tag } from './Tag';
import { formatDate } from '../utils';
import { BackgroundImg, imgPropTypeShape } from '..';

const PostPreview = ({
  calendar,
  clock,
  date,
  excerpt,
  img,
  previewImg,
  tagIcon,
  tags,
  timeToRead,
  title,
  ...rest
}) => (
  <PostPreviewStyle {...rest}>
    <PreviewImg img={previewImg || img} />
    <PreviewText>
      <h2>{title}</h2>
      <PostExcerpt>{excerpt}</PostExcerpt>
      <PostMeta>
        <div>
          <PostMetaIcon {...calendar} />
          <PostMetaText>{formatDate(date)}</PostMetaText>
          <PostMetaText>‧</PostMetaText>
          <PostMetaIcon {...clock} />
          <PostMetaText>{`${timeToRead} mins`}</PostMetaText>
        </div>
        {tags && <Tag icon={tagIcon}>{tags[0]}</Tag>}
      </PostMeta>
    </PreviewText>
  </PostPreviewStyle>
);

PostPreview.propTypes = {
  calendar: imgPropTypeShape,
  clock: imgPropTypeShape,
  date: PropTypes.number,
  excerpt: PropTypes.string,
  img: imgPropTypeShape,
  previewImg: imgPropTypeShape,
  tagIcon: imgPropTypeShape,
  tags: PropTypes.arrayOf(PropTypes.string),
  timeToRead: PropTypes.number,
  title: PropTypes.string,
};

export default PostPreview;

// TODO: Use theme prop - 06/13/18 16:18:40 sidneywijngaarde
const borderRadius = '1rem';

const PostPreviewStyle = styled(Link)`
  display: flex;
  text-decoration: none;
  box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.3);
  flex-flow: column wrap;
  border-radius: ${borderRadius};
  margin-bottom: 2rem;

  // pure-md
  @media screen and (min-width: 48em) {
    width: 100%;
    min-height: 20vh;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: stretch;
  }

  //pure-lg
  @media screen and (min-width: 64em) {
    min-height: 15vh;
  }

  // pure-xl
  @media screen and (min-width: 80em) {
    min-height: 10vh;
  }
`;

const PreviewImg = styled(BackgroundImg)`
  width: 100%;
  height: 20vh;
  overflow: hidden;
  border-radius: ${borderRadius} ${borderRadius} 0 0;

  // pure-sm
  @media screen and (min-width: 35.5em) {
    height: 15vh;
  }

  // pure-md
  @media screen and (min-width: 48em) {
    width: 50%;
    height: initial;
    min-height: 100%;
    border-radius: ${borderRadius} 0 0 ${borderRadius};
  }

  //pure-lg
  @media screen and (min-width: 64em) {
    width: 45%;
  }
`;

const PreviewText = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 0.5rem 1rem;
  width: 100%;

  font-size: 1.3em;

  h2 {
    font-weight: 400;
  }

  //pure-lg
  @media screen and (min-width: 64em) {
    font-size: 1.1em;
  }
`;

const PostExcerpt = styled.p`
  width: 100%;
  font-size: 0.7em;
`;
