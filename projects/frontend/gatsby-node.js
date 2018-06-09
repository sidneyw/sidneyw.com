// eslint-disable-next-line import/no-extraneous-dependencies
const Webpack = require('webpack');
// const path = require('path');
// const { createFilePath } = require('gatsby-source-filesystem');

// exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
//   const { createNodeField } = boundActionCreators;
//   if (node.internal.type === `MarkdownRemark`) {
//     const slug = createFilePath({ node, getNode, basePath: `pages` });

//     createNodeField({ node, name: `slug`, value: slug });
//   }
// };

// exports.createPages = async ({ graphql, boundActionCreators }) => {
//   const { createPage } = boundActionCreators;

//   // Query the nodes that we added slugs to in the onCreateNode function
//   const { data } = await graphql(`
//     {
//       allMarkdownRemark {
//         edges {
//           node {
//             fields {
//               slug
//             }
//           }
//         }
//       }
//     }
//   `);

//   data.allMarkdownRemark.edges.forEach(({ node }) => {
//     createPage({
//       path: node.fields.slug,
//       component: path.resolve(`./src/templates/experience.js`),
//       layout: `experience`,
//       context: {
//         // Data passed to context is available in page queries as GraphQL variables.
//         slug: node.fields.slug,
//       },
//     });
//   });
// };

exports.modifyWebpackConfig = ({ config }) => {
  config.plugin('webpack-environment', Webpack.EnvironmentPlugin, [
    'NODE_ENV',
    'SERVERLESS_URL',
  ]);

  return config;
};