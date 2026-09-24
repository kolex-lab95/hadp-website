import type messages from '../../messages/fr.json';
import type {Locale as SupportedLocale} from '@/i18n/routing';

declare module 'next-intl' {
  interface AppConfig {
    Locale: SupportedLocale;
    Messages: typeof messages;
  }
}
