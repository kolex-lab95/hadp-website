import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Badge} from '@/components/ui/badge';
import {ButtonLink} from '@/components/ui/button';
import {Container} from '@/components/ui/container';
import {homeMedia} from '@/config/media';
import {site} from '@/config/site';
import type {Locale} from '@/i18n/routing';

export async function Hero({locale}: {locale: Locale}) {
  const t = await getTranslations();
  const image = homeMedia.communityOne;

  return <section id="top" className="hero-section">
    <Container className="hero-grid">
      <div className="hero-copy">
        <Badge className="w-fit bg-white/10 text-brand-yellow">{site.slogan[locale]}</Badge>
        <h1 className="hero-title mt-6">{t('heroTitle')}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">{t('heroDescription')}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#about" variant="accent">{t('discoverHadp')}</ButtonLink>
          <ButtonLink href="#actions" className="button--hero-secondary">{t('ourActions')}</ButtonLink>
        </div>
      </div>
      <figure className="hero-media">
        <Image src={image.src} width={image.width} height={image.height} alt={t(image.altKey)} loading="eager" fetchPriority="high"
          sizes="(max-width: 1023px) 100vw, 50vw" className="h-full w-full object-cover" />
      </figure>
    </Container>
  </section>;
}
