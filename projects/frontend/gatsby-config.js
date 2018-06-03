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
    services: [
      {
        name: 'Cloud Architecture',
        text:
          'Weeks of development can save you hours of planning. I want to work with you to understand your business needs and plan an architecture tailored to you.',
        img: 'architecture',
      },
      {
        name: 'DevOps Driven',
        text:
          'DevOps practices help your company scale quickly, sustainably, and durably. Let’s work together to implement processes that transform how you write software.',
        img: 'devops',
      },
      {
        name: 'Progressive Web Applications',
        text:
          'Your users are viewing your site on mobile browsers with spotty internet connections. I can help you write web interfaces built for the modern era.',
        img: 'pwa-lighthouse',
      },
    ],
    // Images in src/assets/stack/
    stack: [
      'serverless',
      'kubernetes',
      'docker',
      'react',
      'graphql',
      'nodejs',
      'golang',
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
