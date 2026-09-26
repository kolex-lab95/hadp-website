import {getLocale, getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {ActionMediaAlbum} from '@/components/sections/internal/action-media-album';
import {homeMedia} from '@/config/media';
import {coordinationAction, coordinationGalleryImages, fieldActions, galleryImages} from '@/content/home';
import {getPublishedActivities} from '@/lib/public-content';
import {PageHero} from './page-hero';

export async function ActionsPage() {
  const [t, locale, managed] = await Promise.all([getTranslations(), getLocale(), getPublishedActivities()]);
  const heroImage = homeMedia.workshop;
  const legacyActions = fieldActions.map((action) => ({id: action.id, title: t(action.titleKey), description: t(action.descriptionKey)}));
  const actions = managed.length ? managed.map((activity) => ({id: activity.id, title: locale === 'fr' ? activity.title_fr : activity.title_en, description: locale === 'fr' ? activity.summary_fr : activity.summary_en})) : [{id: coordinationAction.id, title: t(coordinationAction.titleKey), description: t(coordinationAction.descriptionKey)}, ...legacyActions];
  const albumImages = [...galleryImages, ...coordinationGalleryImages].map((key) => ({...homeMedia[key], alt: t(homeMedia[key].altKey)}));

  return <>
    <PageHero className="actions-page-hero" eyebrow={t('actionsPageEyebrow')} title={t('actionsPageTitle')} description={t('actionsPageIntro')} image={{...heroImage, alt: t(heroImage.altKey)}} />
    <section className="actions-realised-section section-space reveal" aria-labelledby="realised-actions-heading"><Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div className="actions-page-intro"><div className="lg:sticky lg:top-28"><SectionHeading id="realised-actions-heading" eyebrow={t('realisedActionsEyebrow')} title={t('realisedActionsTitle')} description={t('realisedActionsIntro')} /><div className="mt-8"><ActionMediaAlbum images={albumImages} labels={{previous: t('albumPrevious'), next: t('albumNext'), pause: t('albumPause'), resume: t('albumResume'), navigation: t('albumNavigation'), viewImage: t('albumViewImage')}} /></div></div></div>
      <ol className="action-page-list">{actions.map((action, index) => <li key={action.id}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{action.title}</h2><p>{action.description}</p></div></li>)}</ol>
    </Container></section>
    <section className="perspectives-section reveal" aria-labelledby="perspectives-heading"><Container className="perspectives-grid"><div><p className="eyebrow text-brand-yellow">{t('perspectivesEyebrow')}</p><h2 id="perspectives-heading" className="heading-section mt-3 text-white">{t('perspectivesTitle')}</h2></div><p className="max-w-prose text-lg text-white/80">{t('perspectivesBody')}</p></Container></section>
  </>;
}
