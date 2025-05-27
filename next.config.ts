/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    i18n: {
      locales: ['en', 'ml'],
      defaultLocale: 'en',
      localeDetection: true,
    }
  };
  
  module.exports = nextConfig;