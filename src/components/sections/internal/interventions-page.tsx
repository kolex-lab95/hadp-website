import Image from 'next/image';
import {Boxes, HandHeart, House, Laptop, ShieldCheck, Stethoscope, WalletCards} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {homeMedia} from '@/config/media';
import {interventions} from '@/content/home';
import {PageHero} from './page-hero';

const icons = {protection: ShieldCheck, livelihoods: WalletCards, economicInclusion: HandHeart, health: Stethoscope, shelter: House, logistics: Boxes, educationDigital: Laptop} as const;
const images = {
  protection: homeMedia.communityOne,
  livelihoods: homeMedia.workshop,
  economicInclusion: homeMedia.communityTwo,
  health: homeMedia.communityOne,
  shelter: homeMedia.workshop,
  logistics: homeMedia.communityTwo,
  educationDigital: homeMedia.educationDigital,
} as const;

export async function InterventionsPage() {
  const t = await getTranslations();
  const heroImage = homeMedia.communityOne;

  return <>
    <PageHero eyebrow={t('interventionsPageEyebrow')} title={t('interventionsPageTitle')} description={t('interventionsPageIntro')}
      image={{...heroImage, alt: t(heroImage.altKey)}} />
    <section className="section-space reveal" aria-labelledby="interventions-detail-heading">
      <Container>
        <SectionHeading id="interventions-detail-heading" eyebrow={t('interventionsEyebrow')} title={t('interventionsDetailTitle')}
          description={t('interventionsDetailIntro')} />
        <ol className="intervention-details mt-12">
          {interventions.map((item, index) => {
            const Icon = icons[item.id];
            const image = images[item.id];
            return <li key={item.id} className="intervention-detail">
              <div className="intervention-detail-copy">
                <span className="intervention-detail-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="intervention-icon"><Icon aria-hidden="true" /></span>
                <h2>{t(item.titleKey)}</h2>
                <p>{t(item.descriptionKey)}</p>
              </div>
              <figure className="intervention-detail-image"><Image src={image.src} width={image.width} height={image.height}
                alt={t(image.altKey)} sizes="(max-width: 767px) 100vw, 42vw" className="h-full w-full object-cover" /></figure>
            </li>;
          })}
        </ol>
      </Container>
    </section>
  </>;
}
