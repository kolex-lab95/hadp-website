import type {NextRequest} from 'next/server';
import {hasLocale} from 'next-intl';
import createMiddleware from 'next-intl/middleware';
import {routing, localeCookieName} from '@/i18n/routing';
import {updateSession} from '@/lib/supabase/proxy';

export default async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) return updateSession(request);
  const savedLocale = request.cookies.get(localeCookieName)?.value;
  return createMiddleware({...routing, localeDetection: hasLocale(routing.locales, savedLocale)})(request);
}
export const config = {matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']};
