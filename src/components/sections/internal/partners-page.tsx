import {ArrowUpRight} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {buttonStyles} from '@/components/ui/button';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {homeMedia} from '@/config/media';
import {partnerTypes} from '@/content/internal';
import {Link} from '@/i18n/navigation';
import {PageHero} from './page-hero';

export async function PartnersPage() {
  const t = await getTranslations();
  const heroImage = homeMedia.communityOne;
  return <>
    <PageHero eyebrow={t('partnersPageEyebrow')} title={t('partnersPageTitle')} description={t('partnersPageIntro')}
      image={{...heroImage, alt: t(heroImage.altKey)}} />
    <section className="section-space reveal" aria-labelledby="partner-types-heading">
      <Container className="partners-page-layout">
        <SectionHeading id="partner-types-heading" eyebrow={t('partnerTypesEyebrow')} title={t('partnerTypesTitle')}
          description={t('partnerTypesIntro')} className="lg:sticky lg:top-28 lg:self-start" />
        <ul className="partner-types-list">
          {partnerTypes.map((partner, index) => <li key={partner.id}><span>{String(index + 1).padStart(2, '0')}</span><h3>{t(partner.labelKey)}</h3></li>)}
        </ul>
      </Container>
    </section>
    <section className="section-space bg-surface reveal" aria-labelledby="partner-approach-heading">
      <Container className="editorial-split"><div>
        <SectionHeading id="partner-approach-heading" eyebrow={t('partnerApproachEyebrow')} title={t('partnerApproachTitle')}
          description={t('partnerApproachBody')} />
        <Link href="/contact" className={buttonStyles({className: 'mt-8'})}>{t('becomePartner')}</Link>
      </div><div className="partnership-quote"><ArrowUpRight aria-hidden="true" /><p>{t('partnerQuote')}</p></div></Container>
    </section>
  </>;
}
