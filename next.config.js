const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Static export için aktif - Hostinger'da paylaşım için
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // SWC binary sorunu nedeniyle Babel kullan
  swcMinify: false,
}

module.exports = withNextIntl(nextConfig)

