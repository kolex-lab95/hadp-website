import {Mail, MapPin, MessageCircle, Phone} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {buttonStyles} from '@/components/ui/button';
import {Container} from '@/components/ui/container';
import {homeMedia} from '@/config/media';
import {phoneHref, site} from '@/config/site';
import {PageHero} from './page-hero';
import {ContactForm} from './contact-form';

export async function ContactPage() {
  const t = await getTranslations();
  const heroImage = homeMedia.communityTwo;
  const labels = {name: t('formName'), email: t('formEmail'), phone: t('formPhone'), organisation: t('formOrganisation'),
    subject: t('formSubject'), message: t('formMessage'), send: t('formSend'), required: t('formRequired'), invalidEmail: t('formInvalidEmail')};

  return <>
    <PageHero eyebrow={t('contactPageEyebrow')} title={t('contactPageTitle')} description={t('contactPageIntro')}
      image={{...heroImage, alt: t(heroImage.altKey)}} />
    <section className="section-space reveal" aria-labelledby="contact-form-heading">
      <Container className="contact-page-grid">
        <div><p className="eyebrow">{t('contactInfoEyebrow')}</p><h2 className="heading-section mt-3">{t('contactInfoTitle')}</h2>
          <address className="contact-details mt-8 not-italic">
            <a href={`mailto:${site.email.address}`}><Mail aria-hidden="true" /><span>{site.email.address}</span></a>
            <a href={phoneHref}><Phone aria-hidden="true" /><span>{site.phone}</span></a>
            <p><MapPin aria-hidden="true" /><span>{site.location.city} — {site.location.country}</span></p>
          </address>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${site.email.address}`} className={buttonStyles()}><Mail aria-hidden="true" className="mr-2 size-5" />{t('writeToUs')}</a>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles({variant: 'secondary'})}
              aria-label={`WhatsApp — ${t('opensNewWindow')}`}><MessageCircle aria-hidden="true" className="mr-2 size-5" />WhatsApp</a>
          </div>
        </div>
        <div className="contact-form-panel"><h2 id="contact-form-heading" className="font-heading text-2xl font-bold text-brand-purple">{t('formTitle')}</h2>
          <ContactForm labels={labels} address={site.email.address} /></div>
      </Container>
    </section>
  </>;
}
