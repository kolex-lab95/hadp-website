import type {Metadata} from 'next';
import {InterventionsPage} from '@/components/sections/internal/interventions-page';
import {internalPageMetadata, resolvePageLocale} from '@/lib/localized-page';

type Props = {params: Promise<{locale: string}>};
export function generateMetadata({params}: Props): Promise<Metadata> { return internalPageMetadata(params, 'interventionsMetaTitle', 'interventionsMetaDescription'); }
export default async function Page({params}: Props) { await resolvePageLocale(params); return <InterventionsPage />; }
