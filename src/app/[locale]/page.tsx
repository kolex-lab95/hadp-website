import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {AboutPreview} from '@/components/sections/home/about-preview';
import {CoordinationActivity} from '@/components/sections/home/coordination-activity';
import {FieldActions} from '@/components/sections/home/field-actions';
import {FinalCTA} from '@/components/sections/home/final-cta';
import {GalleryPreview} from '@/components/sections/home/gallery-preview';
import {Hero} from '@/components/sections/home/hero';
import {ImpactSection} from '@/components/sections/home/impact-section';
import {InterventionSection} from '@/components/sections/home/intervention-section';
import {Locations} from '@/components/sections/home/locations';
import {PartnersPreview} from '@/components/sections/home/partners-preview';
import {TargetGroups} from '@/components/sections/home/target-groups';
import {routing} from '@/i18n/routing';

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <>
    <Hero />
    <AboutPreview />
    <InterventionSection />
    <FieldActions />
    <CoordinationActivity />
    <ImpactSection />
    <TargetGroups />
    <Locations />
    <GalleryPreview />
    <PartnersPreview />
    <FinalCTA />
  </>;
}
