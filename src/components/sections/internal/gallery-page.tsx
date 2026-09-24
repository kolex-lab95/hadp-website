import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {homeMedia} from '@/config/media';
import {galleryImages} from '@/content/home';
import {PageHero} from './page-hero';

export async function GalleryPage() {
  const t = await getTranslations();
  const heroImage = homeMedia.communityTwo;
  return <>
    <PageHero eyebrow={t('galleryEyebrow')} title={t('galleryPageTitle')} description={t('galleryIntro')}
      image={{...heroImage, alt: t(heroImage.altKey)}} />
    <section className="section-space bg-surface reveal" aria-labelledby="gallery-page-heading">
      <Container><h2 id="gallery-page-heading" className="sr-only">{t('galleryPageTitle')}</h2>
        <div className="gallery-page-grid">
          {galleryImages.map((key, index) => { const image = homeMedia[key]; return <figure key={image.src} className={`gallery-page-item gallery-page-item--${index + 1}`}>
            <Image src={image.src} width={image.width} height={image.height} alt={t(image.altKey)}
              sizes={index === 0 ? '(max-width: 767px) 100vw, 62vw' : '(max-width: 767px) 100vw, 38vw'} className="h-full w-full object-cover" />
          </figure>; })}
        </div>
      </Container>
    </section>
  </>;
}
