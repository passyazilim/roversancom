import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['tr', 'en', 'ar', 'es'],

  // Used when no locale matches
  defaultLocale: 'tr',
  
  // Always show locale prefix in URL, even for default locale
  // This ensures consistent routing behavior across all locales
  localePrefix: 'always'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

