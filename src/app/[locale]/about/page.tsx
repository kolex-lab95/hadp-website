import type {Metadata} from 'next';
import {AboutPage} from '@/components/sections/internal/about-page';
import {internalPageMetadata, resolvePageLocale} from '@/lib/localized-page';

type Props = {params: Promise<{locale: string}>};
export function generateMetadata({params}: Props): Promise<Metadata> { return internalPageMetadata(params, 'aboutMetaTitle', 'aboutMetaDescription'); }
export default async function Page({params}: Props) { await resolvePageLocale(params); return <AboutPage />; }
