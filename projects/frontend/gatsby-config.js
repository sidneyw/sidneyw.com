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
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non lectus tincidunt, posuere mi ut, maximus orci. Sed tincidunt posuere nunc sed sagittis. Sed vulputate maximus erat sit amet bibendum. Phasellus ac nunc a turpis imperdiet sodales ut quis elit. Suspendisse fermentum hendrerit felis vel ultrices.',
        img: 'architecture',
      },
      {
        name: 'Continuous Delivery',
        text:
          'Praesent dapibus eu turpis a aliquet. Proin vulputate finibus magna eu imperdiet. Donec viverra et dolor eu blandit. Mauris varius ac arcu sit amet molestie. Phasellus tempus eu libero a tincidunt. Morbi nec orci venenatis, sollicitudin ligula porttitor, mollis arcu. Cras elementum porttitor malesuada.',
        img: 'delivery',
      },
      {
        name: 'Progressive Web Applications',
        text:
          'Fusce sollicitudin efficitur accumsan. Cras ut risus ut erat sodales mollis. Etiam et faucibus eros. Maecenas in dolor dolor. Suspendisse varius tincidunt tristique. Donec tincidunt odio a diam maximus posuere. Aliquam sit amet nisi dictum, gravida ante eget, sollicitudin lectus. Cras sodales facilisis blandit.',
        img: 'pwa',
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
