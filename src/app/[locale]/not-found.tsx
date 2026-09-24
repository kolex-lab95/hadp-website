import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {buttonStyles} from '@/components/ui/button';
import {Link} from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations();
  return <Container className="section-space space-y-6">
    <h1 className="heading-page">{t('notFoundTitle')}</h1>
    <p>{t('notFoundDescription')}</p>
    <Link href="/" className={buttonStyles()}>{t('backHome')}</Link>
  </Container>;
}
