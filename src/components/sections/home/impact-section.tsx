import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {impactStats} from '@/content/home';

export async function ImpactSection() {
  const t = await getTranslations();

  return <section id="impact" aria-labelledby="impact-heading" className="impact-section section-space reveal">
    <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
      <SectionHeading id="impact-heading" eyebrow={t('impactEyebrow')} title={t('impactTitle')}
        description={t('impactIntro')} tone="inverse" />
      <dl className="impact-grid">
        {impactStats.map((stat) => <div key={stat.id} className="impact-stat">
          <dt className="order-2 mt-3 font-semibold text-white">{t(stat.labelKey)}</dt>
          <dd className="order-1 font-heading text-5xl font-extrabold text-brand-yellow">{stat.value}</dd>
        </div>)}
      </dl>
    </Container>
  </section>;
}
