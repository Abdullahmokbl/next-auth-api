/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config.js')

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      import('./scripts/generate-sitemap.mjs')
    }

    return config
  },
  images: {
    domains: ['res.cloudinary.com', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  i18n,
  // i18n: {
  //   locales: ['en', 'ar'],
  //   defaultLocale: 'en',
  // },
  // localePath: path.resolve('./public/static/locales'),
  // async rewrites() {
  //   return [
  //     {
  //       source: '/sitemap.xml',
  //       destination: '/api/sitemap',
  //     },
  //   ]
  // },
}

// module.exports = {
//   distDir: 'build',
// }
