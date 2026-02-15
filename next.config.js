const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Docker deployment için gerekli
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // SWC binary sorunu nedeniyle Babel kullan
  swcMinify: false,
}

module.exports = withNextIntl(nextConfig)

