/** @type {import('next').NextConfig} */

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
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
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
