// eslint-disable-next-line import/no-extraneous-dependencies
const Webpack = require('webpack');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (
    node.internal.type === 'MarkdownRemark' &&
    node.fileAbsolutePath.includes('/src/pages')
  ) {
    const slug = createFilePath({ node, getNode });
    createNodeField({ node, name: 'slug', value: slug });
  }
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  // Query the nodes that we added slugs to in the onCreateNode function
  const {
    data: {
      allMarkdownRemark: { edges: posts },
    },
  } = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: frontmatter___date }
        filter: { fileAbsolutePath: { regex: "/src/pages/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  posts.forEach(({ node: { fields: { slug } } }) => {
    console.log(`\n\n${slug}\n`);
    createPage({
      path: slug,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  // console.log('PLUGINS', JSON.stringify(plugins, null, 2));
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    plugins: [new Webpack.EnvironmentPlugin(['NODE_ENV', 'SERVERLESS_URL'])],
  });
};