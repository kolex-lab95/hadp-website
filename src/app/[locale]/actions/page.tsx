import type {Metadata} from 'next';
import {ActionsPage} from '@/components/sections/internal/actions-page';
import {internalPageMetadata, resolvePageLocale} from '@/lib/localized-page';

type Props = {params: Promise<{locale: string}>};
export function generateMetadata({params}: Props): Promise<Metadata> { return internalPageMetadata(params, 'actionsMetaTitle', 'actionsMetaDescription'); }
export default async function Page({params}: Props) { await resolvePageLocale(params); return <ActionsPage />; }
