// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from '../Link';

import PostInfo from './Info';
import { BackgroundImg, imgPropTypeShape } from '..';
import { ZDepth2, ZDepth3, ZDepth4 } from '../mixins';

const PostPreview = ({
  excerpt,
  img,
  previewImg,
  title,
  to,
  className = '',
  ...rest
}) => (
  <PostPreviewStyle to={to} className={className}>
    <PreviewImg img={previewImg || img} />
    <PreviewText>
      <h2>{title}</h2>
      <PostExcerpt>{excerpt}</PostExcerpt>
      <PostInfo {...rest} />
    </PreviewText>
  </PostPreviewStyle>
);

PostPreview.propTypes = {
  className: PropTypes.string,
  excerpt: PropTypes.string,
  img: imgPropTypeShape,
  previewImg: imgPropTypeShape,
  title: PropTypes.string,
  to: PropTypes.string.isRequired,
};

export default PostPreview;

// TODO: Use theme prop - 06/13/18 16:18:40 sidneywijngaarde
const borderRadius = '1rem';

const PostPreviewStyle = styled(Link)`
  display: flex;
  text-decoration: none;
  flex-flow: column wrap;
  border-radius: ${borderRadius};
  margin-bottom: 2rem;
  color: #000;

  transition: box-shadow 500ms ease;
  ${ZDepth2} &:hover {
    ${ZDepth4};
  }

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
