import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing, type Locale} from '@/i18n/routing';

type Params = Promise<{locale: string}>;
type MetadataKey = 'aboutMetaTitle' | 'interventionsMetaTitle' | 'actionsMetaTitle' | 'galleryMetaTitle' | 'partnersMetaTitle' | 'contactMetaTitle';
type DescriptionKey = 'aboutMetaDescription' | 'interventionsMetaDescription' | 'actionsMetaDescription' | 'galleryMetaDescription' | 'partnersMetaDescription' | 'contactMetaDescription';

export async function resolvePageLocale(params: Params): Promise<Locale> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return locale;
}

export async function internalPageMetadata(params: Params, titleKey: MetadataKey, descriptionKey: DescriptionKey): Promise<Metadata> {
  const locale = await resolvePageLocale(params);
  const t = await getTranslations({locale});
  return {title: t(titleKey), description: t(descriptionKey)};
}
