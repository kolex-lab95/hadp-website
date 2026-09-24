import {Mail, MessageCircle} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {ButtonLink} from '@/components/ui/button';
import {Container} from '@/components/ui/container';
import {site} from '@/config/site';

export async function FinalCTA() {
  const t = await getTranslations();

  return <section aria-labelledby="final-cta-heading" className="final-cta reveal">
    <Container className="final-cta-layout">
      <div>
        <p className="eyebrow">{t('finalCtaEyebrow')}</p>
        <h2 id="final-cta-heading" className="final-cta-title mt-3">{t('finalCtaTitle')}</h2>
        <p className="mt-4 max-w-2xl text-brand-purple/80">{t('finalCtaIntro')}</p>
      </div>
      <div className="final-cta-actions">
        <div className="contact-methods" aria-label={t('contact')}>
          <a className="contact-method contact-method--email" href={`mailto:${site.email.address}`}>
            <Mail aria-hidden="true" />
            <span>{t('writeToUs')}</span>
          </a>
          <a className="contact-method contact-method--whatsapp" href={site.whatsappUrl} target="_blank" rel="noopener noreferrer"
            aria-label={`WhatsApp — ${t('opensNewWindow')}`}>
            <MessageCircle aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
        </div>
        <ButtonLink href="#actions" variant="secondary" className="contact-actions-link">{t('contactDetails')}</ButtonLink>
      </div>
    </Container>
  </section>;
}
