import type {Metadata} from 'next';
import {PartnersPage} from '@/components/sections/internal/partners-page';
import {internalPageMetadata, resolvePageLocale} from '@/lib/localized-page';

type Props = {params: Promise<{locale: string}>};
export function generateMetadata({params}: Props): Promise<Metadata> { return internalPageMetadata(params, 'partnersMetaTitle', 'partnersMetaDescription'); }
export default async function Page({params}: Props) { await resolvePageLocale(params); return <PartnersPage />; }
