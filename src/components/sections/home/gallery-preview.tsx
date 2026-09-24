import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {homeMedia} from '@/config/media';
import {galleryImages} from '@/content/home';

export async function GalleryPreview() {
  const t = await getTranslations();

  return <section id="gallery" aria-labelledby="gallery-heading" className="section-space bg-surface reveal">
    <Container>
      <div>
        <SectionHeading id="gallery-heading" eyebrow={t('galleryEyebrow')} title={t('galleryTitle')} description={t('galleryIntro')} />
      </div>
      <div className="gallery-grid mt-10">
        {galleryImages.map((key, index) => {
          const photo = homeMedia[key];
          return <figure key={photo.src} className={`gallery-item gallery-item--${index + 1}`}>
            <Image src={photo.src} width={photo.width} height={photo.height} alt={t(photo.altKey)}
              sizes={index === 0 ? '(max-width: 767px) 100vw, 60vw' : '(max-width: 767px) 100vw, 40vw'}
              className="h-full w-full object-cover" />
          </figure>;
        })}
      </div>
    </Container>
  </section>;
}
