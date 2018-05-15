module.exports = {
  siteMetadata: {
    title: 'Sidney Wijngaarde',
    social: [
      // Images in src/assets/social/
      { name: 'twitter', href: 'https://twitter.com/sidneywijn' },
      { name: 'medium', href: 'https://medium.com/@sidneywijngaarde' },
      // { name: 'pinterest', href: 'https://br.pinterest.com/the_squidd' },
      { name: 'github', href: 'https://github.com/rcrsvsquid' },
      { name: 'linkedin', href: 'https://www.linkedin.com/in/swijngaarde' },
      // { name: 'email', href: 'mailto:sidneywijngaarde@gmail.com' },
    ],
  },
  proxy: {
    prefix: '/localhost:3000',
    url: 'http:/',
  },
  plugins: [
    'gatsby-plugin-netlify',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'jobs',
        path: `${__dirname}/src/data/jobs`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: 'gatsby-source-medium',
      options: {
        username: '@sidneywijngaarde',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-5BPGDJS',
        includeInDevelopment: false,
      },
    },
  ],
};
