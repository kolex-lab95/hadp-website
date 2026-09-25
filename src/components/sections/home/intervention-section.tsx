import {Boxes, HandHeart, House, ShieldCheck, Stethoscope, WalletCards} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {interventions} from '@/content/home';

const icons = {
  protection: ShieldCheck,
  livelihoods: WalletCards,
  economicInclusion: HandHeart,
  health: Stethoscope,
  shelter: House,
  logistics: Boxes,
} as const;

export async function InterventionSection() {
  const t = await getTranslations();

  return <section id="interventions" aria-labelledby="interventions-heading" className="intervention-section section-space reveal">
    <Container className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
      <SectionHeading id="interventions-heading" eyebrow={t('interventionsEyebrow')} title={t('interventionsTitle')}
        description={t('interventionsIntro')} className="lg:sticky lg:top-28 lg:self-start" />
      <ol className="intervention-list">
        {interventions.map((intervention, index) => {
          const Icon = icons[intervention.id];
          return <li key={intervention.id} className="intervention-row">
            <span className="intervention-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="intervention-icon"><Icon aria-hidden="true" /></span>
            <div>
              <h3 className="font-heading text-xl font-bold text-brand-purple">{t(intervention.titleKey)}</h3>
              <p className="mt-1 text-muted">{t(intervention.descriptionKey)}</p>
            </div>
          </li>;
        })}
      </ol>
    </Container>
  </section>;
}
