import Image from 'next/image';
import {getLocale, getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {siteNavigation} from '@/config/navigation';
import {phoneHref, site} from '@/config/site';
import {interventions} from '@/content/home';
import {Link} from '@/i18n/navigation';
import {LanguageSwitcher} from './language-switcher';
import {SocialLinks} from './social-links';

export async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();

  return <footer className="site-footer">
    <Container>
      <div className="footer-grid">
        <div>
          <div className="flex items-center gap-3">
            <span className="footer-logo-mark">
              <Image src={site.logo.src} width={site.logo.width} height={site.logo.height} alt="" sizes="54px" className="h-auto w-14" />
            </span>
            <span className="font-heading text-2xl font-extrabold">{site.acronym}</span>
          </div>
          <p className="mt-5 font-heading text-lg font-bold text-brand-yellow">{site.slogan[locale]}</p>
          <p className="mt-3 max-w-xs text-sm text-white/70">{t('footerAbout')}</p>
        </div>
        <div>
          <h2 className="footer-heading">{t('footerNavigation')}</h2>
          <ul className="footer-navigation-list">
            {siteNavigation.map((item) => <li key={item.href}>
              <Link href={item.href} className="footer-link block w-fit">{t(item.labelKey)}</Link>
            </li>)}
          </ul>
        </div>
        <div>
          <h2 className="footer-heading">{t('footerDomains')}</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {interventions.slice(0, 4).map((item) => <li key={item.id}>{t(item.titleKey)}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="footer-heading">{t('contact')}</h2>
          <address className="mt-4 not-italic">
            <dl className="footer-contact-list">
              <div>
                <dt>{t('email')}</dt>
                <dd><a href={`mailto:${site.email.address}`}>{site.email.address}</a></dd>
              </div>
              <div>
                <dt>{t('phone')}</dt>
                <dd><a href={phoneHref}>{site.phone}</a></dd>
              </div>
              <div>
                <dt>{t('location')}</dt>
                <dd>{site.location.city} — {site.location.country}</dd>
              </div>
            </dl>
          </address>
        </div>
      </div>
      <div className="footer-bottom">
        <div>
          <SocialLinks socialTitle={t('socialTitle')} unavailableLabel={t('socialUnavailable')}
            opensNewWindowLabel={t('opensNewWindow')} />
        </div>
        <div className="footer-language"><LanguageSwitcher /></div>
        <p className="text-sm text-white/60">© {new Date().getUTCFullYear()} {site.acronym} · {t('footerLegal')}</p>
      </div>
    </Container>
  </footer>;
}
