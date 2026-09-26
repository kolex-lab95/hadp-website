import {createClient} from '@/lib/supabase/server';
import type {AdminActivity, GalleryImage} from './types';

export async function getAdminActivities(): Promise<AdminActivity[]> { const client = await createClient(); if (!client) return []; const {data} = await client.from('activities').select('*').order('updated_at', {ascending: false}); return (data ?? []) as AdminActivity[]; }
export async function getAdminActivity(id: string): Promise<AdminActivity | null> { const client = await createClient(); if (!client) return null; const {data} = await client.from('activities').select('*').eq('id', id).maybeSingle(); return data as AdminActivity | null; }
export async function getGalleryImages(): Promise<GalleryImage[]> { const client = await createClient(); if (!client) return []; const {data} = await client.from('gallery_images').select('*').order('sort_order').order('created_at', {ascending: false}); return (data ?? []) as GalleryImage[]; }
export async function getDashboardData() { const client = await createClient(); if (!client) return {activities: [], gallery: []}; const [activities, gallery] = await Promise.all([getAdminActivities(), getGalleryImages()]); return {activities, gallery}; }
