import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {homeMedia} from '@/config/media';
import {fieldActions} from '@/content/home';
import {PageHero} from './page-hero';

export async function ActionsPage() {
  const t = await getTranslations();
  const heroImage = homeMedia.workshop;
  const image = homeMedia.communityOne;

  return <>
    <PageHero eyebrow={t('actionsPageEyebrow')} title={t('actionsPageTitle')} description={t('actionsPageIntro')}
      image={{...heroImage, alt: t(heroImage.altKey)}} />
    <section className="section-space reveal" aria-labelledby="realised-actions-heading">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div><SectionHeading id="realised-actions-heading" eyebrow={t('realisedActionsEyebrow')} title={t('realisedActionsTitle')}
          description={t('realisedActionsIntro')} className="lg:sticky lg:top-28" />
          <figure className="mt-8 overflow-hidden rounded-panel"><Image src={image.src} width={image.width} height={image.height}
            alt={t(image.altKey)} sizes="(max-width: 1023px) 100vw, 35vw" className="h-full w-full object-cover" /></figure></div>
        <ol className="action-page-list">
          {fieldActions.map((action, index) => <li key={action.id}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div><h2>{t(action.titleKey)}</h2><p>{t(action.descriptionKey)}</p></div>
          </li>)}
        </ol>
      </Container>
    </section>
    <section className="perspectives-section reveal" aria-labelledby="perspectives-heading">
      <Container className="perspectives-grid">
        <div><p className="eyebrow text-brand-yellow">{t('perspectivesEyebrow')}</p>
          <h2 id="perspectives-heading" className="heading-section mt-3 text-white">{t('perspectivesTitle')}</h2></div>
        <p className="max-w-prose text-lg text-white/80">{t('perspectivesBody')}</p>
      </Container>
    </section>
  </>;
}
