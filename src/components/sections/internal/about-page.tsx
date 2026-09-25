import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {homeMedia} from '@/config/media';
import {hadpValues} from '@/content/internal';
import {PageHero} from './page-hero';

export async function AboutPage() {
  const t = await getTranslations();
  const community = homeMedia.communityTwo;
  const workshop = homeMedia.workshop;

  return <>
    <PageHero eyebrow={t('aboutPageEyebrow')} title={t('aboutPageTitle')} description={t('aboutPageIntro')}
      image={{...community, alt: t(community.altKey)}} />
    <section className="section-space reveal" aria-labelledby="who-heading">
      <Container className="editorial-split">
        <div>
          <SectionHeading id="who-heading" eyebrow={t('whoEyebrow')} title={t('whoTitle')} description={t('whoIntro')} />
          <p className="mt-6 max-w-prose text-lg">{t('whoBody')}</p>
          <p className="mt-6 border-l-4 border-brand-yellow pl-5 font-heading text-xl font-bold text-brand-purple">{t('historyDate')}</p>
        </div>
        <figure className="editorial-image editorial-image--portrait">
          <Image src={workshop.src} width={workshop.width} height={workshop.height} alt={t(workshop.altKey)}
            sizes="(max-width: 1023px) 100vw, 46vw" className="h-full w-full object-cover" />
        </figure>
      </Container>
    </section>
    <section className="about-purpose reveal" aria-labelledby="mission-heading">
      <Container className="about-purpose-grid">
        <div>
          <p className="eyebrow text-brand-yellow">{t('missionEyebrow')}</p>
          <h2 id="mission-heading" className="heading-section mt-3 text-white">{t('missionTitle')}</h2>
          <p className="mt-5 max-w-prose text-white/80">{t('missionBody')}</p>
        </div>
        <div className="border-t border-white/20 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="eyebrow text-brand-yellow">{t('visionEyebrow')}</p>
          <h2 className="heading-section mt-3 text-white">{t('visionTitle')}</h2>
          <p className="mt-5 max-w-prose text-white/80">{t('visionBody')}</p>
        </div>
      </Container>
    </section>
    <section className="section-space bg-surface reveal" aria-labelledby="values-heading">
      <Container>
        <SectionHeading id="values-heading" eyebrow={t('valuesEyebrow')} title={t('valuesTitle')} description={t('valuesIntro')} />
        <ul className="value-list mt-12">
          {hadpValues.map((value, index) => <li key={value.id} className="value-item">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div><h3>{t(value.titleKey)}</h3><p>{t(value.descriptionKey)}</p></div>
          </li>)}
        </ul>
      </Container>
    </section>
    <section className="about-approach section-space reveal" aria-labelledby="approach-heading">
      <Container className="about-approach-grid editorial-split">
        <figure className="about-approach-image editorial-image"><Image src={community.src} width={community.width} height={community.height}
          alt={t(community.altKey)} sizes="(max-width: 1023px) 100vw, 46vw" className="h-full w-full object-cover" /></figure>
        <div className="about-approach-copy"><SectionHeading id="approach-heading" eyebrow={t('approachEyebrow')} title={t('approachTitle')} description={t('approachIntro')} />
          <p className="mt-6 max-w-prose text-lg">{t('approachBody')}</p></div>
      </Container>
    </section>
  </>;
}
