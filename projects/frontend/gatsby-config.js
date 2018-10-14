module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.sidneyw.com',
    title: 'Sidney Wijngaarde',
    social: [
      {
        name: 'twitter',
        href: 'https://twitter.com/sidneywijn',
      },
      {
        name: 'medium',
        href: 'https://medium.com/@sidneywijngaarde',
      },
      {
        name: 'github',
        href: 'https://github.com/rcrsvsquid',
      },
      {
        name: 'linkedin',
        href: 'https://www.linkedin.com/in/swijngaarde',
      },
    ],
  },
  proxy: {
    prefix: '/localhost:3000',
    url: 'http:/',
  },
  plugins: [
    'gatsby-plugin-netlify',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-json',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/src/assets/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`,
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
          'gatsby-remark-smartypants',
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: ',',
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
