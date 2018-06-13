import styled from 'styled-components';
import Img from 'gatsby-image';

export const PostMeta = styled.div`
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
