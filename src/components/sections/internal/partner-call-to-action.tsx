import {getTranslations} from 'next-intl/server';
import {buttonStyles} from '@/components/ui/button';
import {Link} from '@/i18n/navigation';

export async function PartnerCallToAction() {
  const t = await getTranslations();
  return <Link href={{pathname: '/contact', query: {message: t('partnerContactMessage')}}} className={buttonStyles({variant: 'accent'})}>
    {t('becomePartner')}
  </Link>;
}
