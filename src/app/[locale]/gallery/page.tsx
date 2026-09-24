import type {Metadata} from 'next';
import {GalleryPage} from '@/components/sections/internal/gallery-page';
import {internalPageMetadata, resolvePageLocale} from '@/lib/localized-page';

type Props = {params: Promise<{locale: string}>};
export function generateMetadata({params}: Props): Promise<Metadata> { return internalPageMetadata(params, 'galleryMetaTitle', 'galleryMetaDescription'); }
export default async function Page({params}: Props) { await resolvePageLocale(params); return <GalleryPage />; }
