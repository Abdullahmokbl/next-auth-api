import { writeFileSync } from 'fs'
import { globby } from 'globby'
// const { writeFileSync } = require('fs')
// const globby = require('globby')

function addPage(page) {
  const path = page.replace('pages', '').replace('/index', '').replace('.jsx', '').replace('.mdx', '')
  // const route = path === '/index' ? '' : path

  return `  <url>
    <loc>${`${process.env.NEXT_PUBLIC_HOST}${path}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`
}

async function generateSitemap() {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby(['pages/**/*{.jsx,.mdx}', '!pages/_*.js', '!pages/admin', '!pages/api'])
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join('\n')}
</urlset>`

  writeFileSync('public/sitemap.xml', sitemap)
}

generateSitemap()
