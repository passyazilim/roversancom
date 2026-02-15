import { MetadataRoute } from 'next'

const baseUrl = 'https://roversan.com'

const locales = ['tr', 'en', 'ar', 'es']

const routes = [
  '',
  'about',
  'products',
  'gallery',
  'catalog',
  'certificates',
  'contact',
  'privacy',
  'terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add homepage for each locale
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale === 'tr' ? '' : locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    })
  })

  // Add other routes for each locale
  routes.forEach((route) => {
    if (route === '') return // Skip homepage (already added)

    locales.forEach((locale) => {
      const localePrefix = locale === 'tr' ? '' : `${locale}/`
      sitemapEntries.push({
        url: `${baseUrl}/${localePrefix}${route}`,
        lastModified: new Date(),
        changeFrequency: route === 'products' || route === 'gallery' ? 'weekly' : 'monthly',
        priority: route === 'products' || route === 'contact' ? 0.9 : 0.7,
      })
    })
  })

  return sitemapEntries
}

