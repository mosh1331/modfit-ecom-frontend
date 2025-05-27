import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ml'],
  defaultLocale: 'en',
  localePrefix: 'always' // Always show the locale prefix
});

export const config = {
  matcher: [
    '/',
    '/(en|ml)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};