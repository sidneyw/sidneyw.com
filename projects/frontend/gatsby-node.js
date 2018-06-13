// eslint-disable-next-line import/no-extraneous-dependencies
const Webpack = require('webpack');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const isBlogPost = ({ internal: { type }, parent }) => {
  if (type !== `MarkdownRemark`) return false;

  // parent looks like: '<absPath>/<filename.md> absPath of file'
  const dirPath = path.dirname(parent.split(' ')[0]);
  const directories = dirPath.split('/');
  // all blog posts are in a subdirectory with their name and assets
  return directories[directories.length - 2] === 'blog';
};

exports.onCreateNode = ({
  node,
  getNode,
  boundActionCreators: { createNodeField },
}) => {
  if (isBlogPost(node)) {
    const slug = createFilePath({ node, getNode });
    console.log('\n\n', slug, '\n');
    createNodeField({ node, name: 'slug', value: slug });
  }
};

exports.createPages = async ({
  graphql,
  boundActionCreators: { createPage },
}) => {
  // Query the nodes that we added slugs to in the onCreateNode function
  const {
    data: {
      allMarkdownRemark: { edges: posts },
    },
  } = await graphql(`
    {
      allMarkdownRemark(
        filter: { id: { regex: "/blog*/" } }
        sort: { fields: frontmatter___date }
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

exports.modifyWebpackConfig = ({ config }) => {
  config.plugin('webpack-environment', Webpack.EnvironmentPlugin, [
    'NODE_ENV',
    'SERVERLESS_URL',
  ]);

  return config;
};