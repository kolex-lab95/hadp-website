import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {homeMedia} from '@/config/media';
import {audiences} from '@/content/home';

export async function TargetGroups() {
  const t = await getTranslations();
  const image = homeMedia.communityTwo;

  return <section aria-labelledby="people-heading" className="section-space bg-surface reveal">
    <Container className="target-groups-grid">
      <div>
        <SectionHeading id="people-heading" eyebrow={t('peopleEyebrow')} title={t('peopleTitle')} description={t('peopleIntro')} />
        <ul className="audience-list mt-8 gap-x-5 gap-y-3">
          {audiences.map((audience, index) => <li key={audience.id} className="audience-item">
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            {t(audience.labelKey)}
          </li>)}
        </ul>
      </div>
      <figure className="target-groups-image">
        <Image src={image.src} width={image.width} height={image.height} alt={t(image.altKey)}
          sizes="(max-width: 1023px) 100vw, 52vw" className="h-full w-full object-cover" />
      </figure>
    </Container>
  </section>;
}
