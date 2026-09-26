import {createClient} from '@/lib/supabase/server';
import type {AdminActivity, GalleryImage} from '@/lib/admin/types';
export async function getPublishedActivities(): Promise<AdminActivity[]> { const client = await createClient(); if (!client) return []; const {data} = await client.from('activities').select('*').eq('status', 'published').order('featured', {ascending: false}).order('sort_order'); return (data ?? []) as AdminActivity[]; }
export async function getPublishedGallery(): Promise<GalleryImage[]> { const client = await createClient(); if (!client) return []; const {data} = await client.from('gallery_images').select('*').eq('status', 'published').order('sort_order'); return (data ?? []) as GalleryImage[]; }
