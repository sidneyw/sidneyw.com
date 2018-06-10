// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Img from 'gatsby-image';

import { BackgroundImg, imgPropTypeShape } from '.';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function formatDate(unix) {
  const date = new Date(unix * 1000);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

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
}) => (
  <PostPreviewStyle>
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

const borderRadius = '1rem';

const PostPreviewStyle = styled.div`
  display: flex;
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

const PostMeta = styled.div`
  margin-top: 1rem;
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

const PostMetaIcon = styled(Img)`
  height: 0.8em;
  width: 0.8em;
  // pure-md
  @media screen and (min-width: 48em) {
    height: 0.6em;
    width: 0.6em;
  }

  margin-right: 0.25em;
`;

const PostMetaText = styled.p`
  font-size: 0.6em;
  margin-right: 0.6em;
`;

const TagImg = styled(Img)`
  height: 0.6rem;
  width: 0.7rem;
  max-height: 1.5rem;
  margin-right: 0.2rem;
`;

const TagStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  padding: 0.3rem 0.5rem;
  font-size: 0.8em;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 0.5rem;
`;

const Tag = ({ icon, children }) => (
  <TagStyle>
    <TagImg {...icon} />
    {children}
  </TagStyle>
);

Tag.propTypes = {
  icon: imgPropTypeShape,
  children: PropTypes.node,
};
