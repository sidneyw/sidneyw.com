// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import styled from 'styled-components';
import Img from 'gatsby-image';

import { imgPropTypeShape } from '../Img';
import Tag from './Tag';
import { formatDate } from '../utils';

const PostInfo = ({ calendar, date, clock, timeToRead, tag, tags }) => (
  <StaticQuery
    query={graphql`
      query PostInfo {
        calendar: file(relativePath: { regex: "/calendar.png/" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        clock: file(relativePath: { regex: "/clock.png/" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        tag: file(relativePath: { regex: "/tag.png/" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={({ calendar, clock, tag }) => (
      <PostInfoStyle>
        <div>
          <PostInfoIcon {...calendar.childImageSharp} />
          <PostInfoText>{formatDate(date)}</PostInfoText>
          <PostInfoText>‧</PostInfoText>
          <PostInfoIcon {...clock.childImageSharp} />
          <PostInfoText>{`${timeToRead} mins`}</PostInfoText>
        </div>
        {tags && <Tag icon={tag.childImageSharp}>{tags[0]}</Tag>}
      </PostInfoStyle>
    )}
  />
);

PostInfo.propTypes = {
  calendar: imgPropTypeShape,
  clock: imgPropTypeShape,
  date: PropTypes.number,
  tag: imgPropTypeShape,
  tags: PropTypes.arrayOf(PropTypes.string),
  timeToRead: PropTypes.number,
};

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
