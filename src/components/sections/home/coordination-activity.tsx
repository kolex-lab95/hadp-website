import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {homeMedia} from '@/config/media';

export async function CoordinationActivity() {
  const t = await getTranslations();
  const participant = homeMedia.coordinationParticipant;
  const discussion = homeMedia.coordinationDiscussion;
  const session = homeMedia.coordinationSession;

  return <section className="home-capacity-building section-space reveal" aria-labelledby="coordination-home-heading"><Container><div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16"><SectionHeading id="coordination-home-heading" eyebrow={t('capacityBuildingEyebrow')} title={t('coordinationHomeTitle')} description={t('actionCoordinationDescription')} /><div className="field-actions-media"><figure className="field-actions-image field-actions-image--main"><Image src={participant.src} width={participant.width} height={participant.height} alt={t(participant.altKey)} sizes="(max-width: 1023px) 100vw, 43vw" className="h-full w-full object-cover" /></figure><figure className="field-actions-image field-actions-image--accent"><Image src={discussion.src} width={discussion.width} height={discussion.height} alt={t(discussion.altKey)} sizes="(max-width: 767px) 44vw, 18vw" className="h-full w-full object-cover" /></figure><figure className="field-actions-image field-actions-image--detail hidden sm:block"><Image src={session.src} width={session.width} height={session.height} alt={t(session.altKey)} sizes="(max-width: 1023px) 26vw, 12vw" className="h-full w-full object-cover" /></figure></div></div></Container></section>;
}
