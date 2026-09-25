import {Mail, MapPin, MessageCircle, Phone} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {buttonStyles} from '@/components/ui/button';
import {Container} from '@/components/ui/container';
import {homeMedia} from '@/config/media';
import {phoneHref, site} from '@/config/site';
import {PageHero} from './page-hero';
import {ContactForm} from './contact-form';

type Props = Readonly<{initialMessage?: string}>;

export async function ContactPage({initialMessage}: Props) {
  const t = await getTranslations();
  const heroImage = homeMedia.communityTwo;
  const labels = {name: t('formName'), email: t('formEmail'), phone: t('formPhone'), organisation: t('formOrganisation'),
    subject: t('formSubject'), message: t('formMessage'), send: t('formSend'), required: t('formRequired'), invalidEmail: t('formInvalidEmail')};

  return <>
    <PageHero eyebrow={t('contactPageEyebrow')} title={t('contactPageTitle')} description={t('contactPageIntro')}
      image={{...heroImage, alt: t(heroImage.altKey)}} />
    <section className="section-space reveal" aria-labelledby="contact-form-heading">
      <Container className="contact-page-grid">
        <div className="contact-info-panel"><p className="eyebrow text-brand-yellow">{t('contactInfoEyebrow')}</p><h2 className="heading-section mt-3 text-white">{t('contactInfoTitle')}</h2>
          <address className="contact-details mt-8 not-italic">
            <a href={`mailto:${site.email.address}`}><span className="contact-detail-icon"><Mail aria-hidden="true" /></span><span><small>{t('email')}</small><strong>{site.email.address}</strong></span></a>
            <a href={phoneHref}><span className="contact-detail-icon"><Phone aria-hidden="true" /></span><span><small>{t('phone')}</small><strong>{site.phone}</strong></span></a>
            <p><span className="contact-detail-icon"><MapPin aria-hidden="true" /></span><span><small>{t('location')}</small><strong>{site.location.city} — {site.location.country}</strong></span></p>
          </address>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${site.email.address}`} className={buttonStyles({variant: 'accent'})}><Mail aria-hidden="true" className="mr-2 size-5" />{t('writeToUs')}</a>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles({variant: 'secondary'})}
              aria-label={`WhatsApp — ${t('opensNewWindow')}`}><MessageCircle aria-hidden="true" className="mr-2 size-5" />WhatsApp</a>
          </div>
        </div>
        <div className="contact-form-panel"><h2 id="contact-form-heading" className="font-heading text-2xl font-bold text-brand-purple">{t('formTitle')}</h2>
          <ContactForm labels={labels} address={site.email.address} initialMessage={initialMessage} /></div>
      </Container>
    </section>
  </>;
}
