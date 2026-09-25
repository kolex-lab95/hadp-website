import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {homeMedia} from '@/config/media';
import {site} from '@/config/site';

export async function AboutPreview() {
  const t = await getTranslations();
  const image = homeMedia.communityTwo;

  return <section id="about" aria-labelledby="about-heading" className="section-space reveal">
    <Container className="editorial-split">
      <figure className="editorial-image editorial-image--portrait">
        <Image src={image.src} width={image.width} height={image.height} alt={t(image.altKey)}
          sizes="(max-width: 1023px) 100vw, 46vw" className="h-full w-full object-cover" />
      </figure>
      <div className="lg:py-8">
        <SectionHeading id="about-heading" eyebrow={t('aboutEyebrow')} title={t('aboutTitle')} description={t('aboutIntro')} />
        <p id="about-mission" className="mt-6 max-w-prose text-lg">{t('aboutBody')}</p>
        <div className="mt-8 border-l-4 border-brand-yellow pl-5">
          <p className="text-sm text-muted">{site.location.city} — {site.location.country}</p>
        </div>
      </div>
    </Container>
  </section>;
}
