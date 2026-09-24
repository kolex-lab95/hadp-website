import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {buttonStyles} from '@/components/ui/button';
import {Container} from '@/components/ui/container';
import {partners} from '@/content/partners';
import {Link} from '@/i18n/navigation';

export async function PartnersPreview() {
  const t = await getTranslations();

  return <section id="partners" aria-labelledby="partnership-heading" className="section-space reveal">
    <Container>
      <div className="partnership-panel">
        <div>
          <p className="eyebrow text-brand-yellow">{t('partnershipEyebrow')}</p>
          <h2 id="partnership-heading" className="heading-section mt-3 text-white">{t('partnershipTitle')}</h2>
          <p className="mt-4 max-w-2xl text-white/75">{t('partnershipIntro')}</p>
        </div>
        {partners.length > 0 && <ul className="partner-list">
          {partners.map((partner) => <li key={partner.name}>
            {partner.url
              ? <a href={partner.url} rel="noopener noreferrer"><Image src={partner.logo} width={160} height={80} alt={partner.name} /></a>
              : <Image src={partner.logo} width={160} height={80} alt={partner.name} />}
          </li>)}
        </ul>}
        <Link href="/contact" className={buttonStyles({variant: 'accent'})}>{t('becomePartner')}</Link>
      </div>
    </Container>
  </section>;
}
