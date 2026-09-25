import type {Metadata} from 'next';
import {ContactPage} from '@/components/sections/internal/contact-page';
import {internalPageMetadata, resolvePageLocale} from '@/lib/localized-page';

type Props = {params: Promise<{locale: string}>; searchParams: Promise<{message?: string | string[]}>};
export function generateMetadata({params}: Props): Promise<Metadata> { return internalPageMetadata(params, 'contactMetaTitle', 'contactMetaDescription'); }
export default async function Page({params, searchParams}: Props) {
  await resolvePageLocale(params);
  const {message} = await searchParams;
  return <ContactPage initialMessage={Array.isArray(message) ? message[0] : message} />;
}
