import {MapPinned} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {regions} from '@/content/home';

export async function Locations() {
  const t = await getTranslations();

  return <section aria-labelledby="zones-heading" className="locations-section section-space reveal">
    <Container className="locations-layout">
      <div>
        <div className="location-mark"><MapPinned aria-hidden="true" /></div>
        <SectionHeading id="zones-heading" eyebrow={t('zonesEyebrow')} title={t('zonesTitle')} description={t('zonesIntro')} className="mt-6" />
        <p className="mt-5 max-w-prose text-sm font-medium text-brand-purple">{t('zonesCaution')}</p>
      </div>
      <ol className="locations-list">
        {regions.map((region, index) => <li key={region} className="location-item">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{region}</strong>
        </li>)}
      </ol>
    </Container>
  </section>;
}
