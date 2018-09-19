// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import About from '../components/Lead/About';
import Companies from '../components/Lead/Companies';
import IndexJumbo from '../components/Lead/IndexJumbo';
import Nav from '../components/Nav';
import Services from '../components/Lead/Services';
import Stack from '../components/Lead/Stack';
import NewsLetterForm from '../components/NewsLetterForm';
import Layout from '../layouts';

import { Banner } from '../components/';

const IndexPage = () => {
  return (
    <Layout>
      <div>
        {/* <Nav
               {...matchAssets(assetIdx, ['hamburger.png'])}
               links={[
                 { href: '#services', text: 'Services' },
                 { href: '#stack', text: 'Stack' },
                 { href: '/about', text: 'About' },
                 { to: '/blog', text: 'Blog' },
               ]}
               socialIcons={mergeBy(assetIdx, contentNode.social)}
             /> */}

        <IndexJumbo />
      </div>
    </Layout>
  );
};

// <Services
//   services={mergeBy(assetIdx, contentNode.services, svc => svc.img)}
// />
// <Banner>
//   <Callout>The web is mobile and social.</Callout>
// </Banner>
// <Stack
//   stack={mergeBy(
//     assetIdx,
//     contentNode.stack.map(stack => ({ name: stack }))
//   )}
// />
// <Banner>
//   <Callout>
//     get my latest and greatest content delivered straight to your inbox
//   </Callout>
//   <NewsLetterForm
//     {...matchAssets(assetIdx, NewsLetterForm.assets)}
//     secondary
//   />
// </Banner>
// <About
//   {...matchAssets(assetIdx, About.assets)}
//   assetIdx={assetIdx}
//   posts={posts}
// />
// <Companies
//   companies={mergeBy(
//     assetIdx,
//     contentNode.companies.map(company => ({ name: company }))
//   )}
// />
IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

const Callout = styled.h1`
  text-align: center;
  text-transform: Capitalize;
  margin: 1rem auto;
  width: 100%;
`;

// export const pageQuery = graphql`
// `;

export default IndexPage;
