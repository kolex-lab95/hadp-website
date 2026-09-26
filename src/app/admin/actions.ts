'use server';

import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {createClient} from '@/lib/supabase/server';
import {domains, type ActivityStatus} from '@/lib/admin/types';

const maxImageSize = 8 * 1024 * 1024;
const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const text = (form: FormData, key: string) => String(form.get(key) ?? '').trim();
const slugify = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function uploadImage(file: File, folder: string) {
  if (!file.size) return null;
  if (file.size > maxImageSize || !allowedImageTypes.has(file.type)) throw new Error('Utilisez une image JPG, PNG ou WebP de 8 Mo maximum.');
  const client = await createClient(); if (!client) throw new Error('Supabase n’est pas configuré.');
  const extension = file.name.split('.').pop() ?? 'webp';
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const {error} = await client.storage.from('hadp-media').upload(path, file, {contentType: file.type, upsert: false});
  if (error) throw new Error(error.message);
  const {data} = client.storage.from('hadp-media').getPublicUrl(path);
  return data.publicUrl;
}

function activityPayload(form: FormData) {
  const title_fr = text(form, 'title_fr'); const title_en = text(form, 'title_en'); const domain = text(form, 'domain');
  if (!title_fr || !title_en || !domains.includes(domain as (typeof domains)[number])) throw new Error('Les titres FR/EN et le domaine sont requis.');
  return {title_fr, title_en, slug: slugify(text(form, 'slug') || title_fr), summary_fr: text(form, 'summary_fr'), summary_en: text(form, 'summary_en'), description_fr: text(form, 'description_fr'), description_en: text(form, 'description_en'), activity_date: text(form, 'activity_date') || null, location: text(form, 'location') || null, domain, status: (text(form, 'status') === 'published' ? 'published' : 'draft') as ActivityStatus, featured: form.get('featured') === 'on', sort_order: Number(text(form, 'sort_order') || 0)};
}

export async function signIn(form: FormData) { const client = await createClient(); if (!client) redirect('/admin/login?reason=setup'); const {error} = await client.auth.signInWithPassword({email: text(form, 'email'), password: text(form, 'password')}); if (error) redirect(`/admin/login?error=${encodeURIComponent('Identifiants invalides.')}`); redirect('/admin/dashboard'); }
export async function signOut() { const client = await createClient(); await client?.auth.signOut(); redirect('/admin/login'); }
export async function saveActivity(form: FormData) { const client = await createClient(); if (!client) throw new Error('Supabase n’est pas configuré.'); const id = text(form, 'id'); const payload = activityPayload(form); const image = form.get('main_image'); const main_image_url = image instanceof File && image.size ? await uploadImage(image, 'activities') : null; const values = {...payload, ...(main_image_url ? {main_image_url} : {})}; const result = id ? await client.from('activities').update(values).eq('id', id) : await client.from('activities').insert(values); if (result.error) throw new Error(result.error.message); revalidatePath('/actions'); revalidatePath('/gallery'); redirect('/admin/activities?success=1'); }
export async function deleteActivity(form: FormData) { const client = await createClient(); if (!client) throw new Error('Supabase n’est pas configuré.'); const {error} = await client.from('activities').delete().eq('id', text(form, 'id')); if (error) throw new Error(error.message); revalidatePath('/actions'); redirect('/admin/activities?deleted=1'); }
export async function saveGalleryImage(form: FormData) { const client = await createClient(); if (!client) throw new Error('Supabase n’est pas configuré.'); const image = form.get('image'); if (!(image instanceof File) || !image.size) throw new Error('Une image est requise.'); const image_url = await uploadImage(image, 'gallery'); const {error} = await client.from('gallery_images').insert({image_url, caption_fr: text(form, 'caption_fr') || null, caption_en: text(form, 'caption_en') || null, alt_fr: text(form, 'alt_fr'), alt_en: text(form, 'alt_en'), activity_id: text(form, 'activity_id') || null, status: text(form, 'status') === 'published' ? 'published' : 'draft', sort_order: Number(text(form, 'sort_order') || 0)}); if (error) throw new Error(error.message); revalidatePath('/gallery'); redirect('/admin/gallery?success=1'); }
export async function deleteGalleryImage(form: FormData) { const client = await createClient(); if (!client) throw new Error('Supabase n’est pas configuré.'); const {error} = await client.from('gallery_images').delete().eq('id', text(form, 'id')); if (error) throw new Error(error.message); revalidatePath('/gallery'); redirect('/admin/gallery?deleted=1'); }
