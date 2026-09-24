import {defineRouting} from 'next-intl/routing';

export const localeCookieName = 'hadp_locale';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
  localeCookie: {name: localeCookieName, sameSite: 'lax', maxAge: 60 * 60 * 24 * 365},
  // Métadonnées gérées explicitement, sans domaine déduit de la requête.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];

