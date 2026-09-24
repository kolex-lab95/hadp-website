import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {site} from '@/config/site';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {buttonStyles} from '@/components/ui/button';
import {homeNavigation, type NavigationItem} from '@/config/navigation';
import {LanguageSwitcher} from './language-switcher';
import {MobileMenu} from './mobile-menu';

export async function Header() {
  const t = await getTranslations();
  const items: NavigationItem[] = homeNavigation.map((item) => ({href: `#${item.id}`, label: t(item.labelKey)}));
  return (
    <header className="site-header">
      <Container className="flex min-h-20 items-center justify-between gap-4 py-2.5">
        <Link href="/" aria-label={`${site.acronym} — ${t('home')}`} className="brand-link">
          <Image src={site.logo.src} width={site.logo.width} height={site.logo.height}
            alt="" sizes="52px" className="h-auto w-13" />
          <span className="font-heading text-2xl font-extrabold tracking-tight text-brand-purple">{site.acronym}</span>
        </Link>
        <nav aria-label={t('mainNavigation')} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => <li key={item.href}>
              <a className="desktop-nav-link" href={item.href}>{item.label}</a>
            </li>)}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <div className="hidden lg:block"><LanguageSwitcher /></div>
          <a href="#contact" className={buttonStyles({className: 'ml-2 hidden xl:inline-flex'})}>{t('contactUs')}</a>
          <MobileMenu items={items} openLabel={t('openMenu')} closeLabel={t('closeMenu')} ctaLabel={t('contactUs')} />
        </div>
      </Container>
    </header>
  );
}
