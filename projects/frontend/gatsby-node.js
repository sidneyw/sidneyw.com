// eslint-disable-next-line import/no-extraneous-dependencies
const Webpack = require('webpack');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({
  node,
  getNode,
  boundActionCreators: { createNodeField },
}) => {
  if (node.internal.type === 'MarkdownRemark') {
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
      allMarkdownRemark(sort: { fields: frontmatter___date }) {
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

// {
//     "presets": ["react", "env"],
//     "plugins": ["transform-runtime", "styled-components"]
// }

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  console.log('PLUGINS', JSON.stringify(plugins, null, 2));
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    plugins: [new Webpack.EnvironmentPlugin(['NODE_ENV', 'SERVERLESS_URL'])],
  });
};