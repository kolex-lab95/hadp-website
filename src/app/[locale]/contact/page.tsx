import type {Metadata} from 'next';
import {ContactPage} from '@/components/sections/internal/contact-page';
import {internalPageMetadata, resolvePageLocale} from '@/lib/localized-page';

type Props = {params: Promise<{locale: string}>};
export function generateMetadata({params}: Props): Promise<Metadata> { return internalPageMetadata(params, 'contactMetaTitle', 'contactMetaDescription'); }
export default async function Page({params}: Props) { await resolvePageLocale(params); return <ContactPage />; }
