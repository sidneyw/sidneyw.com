import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const Page = () => (
  <StaticQuery
    query={graphql`
      query TitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>
        <h1>Testing stuff</h1>
        <h2>{data.site.siteMetadata.title}</h2>
      </div>
    )}
  />
);

export default Page;
