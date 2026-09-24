import type {Metadata} from 'next';
import {Inter, Manrope} from 'next/font/google';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {site} from '@/config/site';
import {Header} from '@/components/layout/header';
import {Footer} from '@/components/layout/footer';
import {ScrollEffects} from '@/components/layout/scroll-effects';
import {buttonStyles} from '@/components/ui/button';
import '@/styles/globals.css';

const inter = Inter({subsets: ['latin'], variable: '--font-inter', display: 'swap'});
const manrope = Manrope({subsets: ['latin'], variable: '--font-manrope', display: 'swap'});
type Props = {children: React.ReactNode; params: Promise<{locale: string}>};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Omit<Props, 'children'>): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({locale});
  return {
    title: t('metaTitle'), description: t('metaDescription'),
    // L'accueil de validation ne doit pas être indexé comme site officiel terminé.
    robots: {index: false, follow: false},
    ...(site.url ? {metadataBase: new URL(site.url), alternates: {
      canonical: locale === 'fr' ? '/' : '/en', languages: {fr: '/', en: '/en', 'x-default': '/'},
    }} : {}),
    openGraph: {title: t('metaTitle'), description: t('metaDescription'), siteName: site.acronym,
      type: 'website', locale: locale === 'fr' ? 'fr_FR' : 'en_GB'},
    twitter: {card: 'summary', title: t('metaTitle'), description: t('metaDescription')},
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  return <html lang={locale} data-scroll-behavior="smooth" className={`${inter.variable} ${manrope.variable}`}>
    <body className="flex min-h-dvh flex-col">
      <a href="#main-content" className={buttonStyles({className: 'skip-link'})}>{t('skip')}</a>
      <NextIntlClientProvider messages={{language: t('language')}}>
        <ScrollEffects />
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </body>
  </html>;
}
