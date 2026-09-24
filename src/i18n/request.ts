import {hasLocale} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import fr from '../../messages/fr.json';
import en from '../../messages/en.json';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  // Dictionnaires plats : fallback FR par clé ; la QA bloque toute clé manquante.
  return {locale, messages: locale === 'en' ? {...fr, ...en} : fr};
});
