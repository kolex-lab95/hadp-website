import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {homeMedia} from '@/config/media';
import {homeGalleryPreviewImages} from '@/content/home';

export async function GalleryPreview() {
  const t = await getTranslations();

  return <section id="gallery" aria-labelledby="gallery-heading" className="gallery-preview-section section-space reveal">
    <Container>
      <div>
        <SectionHeading id="gallery-heading" eyebrow={t('galleryEyebrow')} title={t('galleryTitle')} description={t('galleryIntro')} tone="inverse" />
      </div>
      <div className="gallery-grid gallery-grid--expanded mt-10">
        {homeGalleryPreviewImages.map((key, index) => {
          const photo = homeMedia[key];
          return <figure key={photo.src} className={`gallery-item gallery-item--${index + 1}`}>
            <Image src={photo.src} width={photo.width} height={photo.height} alt={t(photo.altKey)}
              sizes={index === 0 ? '(max-width: 767px) 100vw, 58vw' : '(max-width: 767px) 100vw, 32vw'}
              className="h-full w-full object-cover" />
          </figure>;
        })}
      </div>
    </Container>
  </section>;
}
