import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {homeMedia} from '@/config/media';
import {fieldActions} from '@/content/home';

export async function FieldActions() {
  const t = await getTranslations();
  const community = homeMedia.communityOne;
  const workshop = homeMedia.workshop;

  return <section id="actions" aria-labelledby="actions-heading" className="home-field-actions section-space reveal">
    <Container>
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
        <SectionHeading id="actions-heading" eyebrow={t('actionsEyebrow')} title={t('actionsTitle')} description={t('actionsIntro')} />
        <div className="field-actions-media">
          <figure className="field-actions-image field-actions-image--main">
            <Image src={community.src} width={community.width} height={community.height} alt={t(community.altKey)}
              sizes="(max-width: 1023px) 100vw, 43vw" className="h-full w-full object-cover" />
          </figure>
          <figure className="field-actions-image field-actions-image--accent">
            <Image src={workshop.src} width={workshop.width} height={workshop.height} alt={t(workshop.altKey)}
              sizes="(max-width: 767px) 44vw, 18vw" className="h-full w-full object-cover" />
          </figure>
        </div>
      </div>
      <ol className="action-list mt-12">
        {fieldActions.map((action, index) => <li key={action.id} className="action-row">
          <span className="action-index">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{t('documentedAction')}</p>
            <h3 className="mt-2 font-heading text-xl font-bold text-brand-purple">{t(action.titleKey)}</h3>
            <p className="mt-2 text-sm text-muted">{t(action.descriptionKey)}</p>
          </div>
        </li>)}
      </ol>
    </Container>
  </section>;
}
