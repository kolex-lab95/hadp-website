import type {NextRequest} from 'next/server';
import {hasLocale} from 'next-intl';
import createMiddleware from 'next-intl/middleware';
import {routing, localeCookieName} from '@/i18n/routing';

export default function proxy(request: NextRequest) {
  // Ignorer la langue du navigateur au premier accès, puis respecter le choix
  // explicite conservé dans le cookie. Ne pas reconstruire la NextRequest :
  // elle porte aussi les informations d'origine utilisées par les rewrites.
  const savedLocale = request.cookies.get(localeCookieName)?.value;
  return createMiddleware({
    ...routing,
    localeDetection: hasLocale(routing.locales, savedLocale),
  })(request);
}

export const config = {matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']};
