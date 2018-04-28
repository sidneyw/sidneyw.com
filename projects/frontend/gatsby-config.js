module.exports = {
  siteMetadata: {
    title: 'Sidney Wijngaarde',
    twitter: 'https://twitter.com/sidneywijn',
    pinterest: 'https://br.pinterest.com/the_squidd/',
    linkedin: 'https://www.linkedin.com/in/swijngaarde/',
    github: 'github.com/rcrsvsquid',
    email: 'sidneywijngaarde@gmail.com',
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
  ],
};
