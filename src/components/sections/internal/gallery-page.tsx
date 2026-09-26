import {getLocale, getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {GalleryExperience} from '@/components/sections/internal/gallery-experience';
import {homeMedia} from '@/config/media';
import {coordinationGalleryImages, galleryImages} from '@/content/home';
import {getPublishedGallery} from '@/lib/public-content';
import {PageHero} from './page-hero';

export async function GalleryPage() {
  const [t, locale, managed] = await Promise.all([getTranslations(), getLocale(), getPublishedGallery()]);
  const heroImage = homeMedia.communityTwo;
  const existingImages = [...galleryImages].map((key) => ({...homeMedia[key], alt: t(homeMedia[key].altKey)}));
  const managedImages = managed.map((image) => ({src: image.image_url, width: 1600, height: 1200, alt: locale === 'fr' ? image.alt_fr : image.alt_en, unoptimized: true}));
  const coordinationImages = coordinationGalleryImages.map((key) => ({...homeMedia[key], alt: t(homeMedia[key].altKey)}));

  return <>
    <PageHero eyebrow={t('galleryEyebrow')} title={t('galleryPageTitle')} description={t('galleryIntro')} image={{...heroImage, alt: t(heroImage.altKey)}} />
    <section className="gallery-showcase section-space reveal" aria-labelledby="gallery-page-heading"><Container><div className="gallery-general-heading"><p className="eyebrow">{t('galleryKicker')}</p><h2 id="gallery-page-heading" className="heading-section mt-3">{t('galleryKicker')}</h2></div><GalleryExperience groups={[{id: 'archive', title: t('galleryPageTitle'), imageCaption: t('galleryPageTitle'), images: [...existingImages, ...managedImages]}, {id: 'coordination', title: t('galleryCoordinationTitle'), imageCaption: t('galleryCoordinationCaption'), images: coordinationImages}]} labels={{openImage: t('albumViewImage'), close: t('lightboxClose'), previous: t('lightboxPrevious'), next: t('lightboxNext'), image: t('lightboxImage')}} /></Container></section>
  </>;
}
