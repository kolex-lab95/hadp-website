'use client';

import Image from 'next/image';
import {ImagePlus, Sparkles} from 'lucide-react';
import {useEffect, useState} from 'react';
import type {AdminActivity} from '@/lib/admin/types';
import {domains, domainLabels} from '@/lib/admin/types';
import {saveActivity} from '@/app/admin/actions';
import {SubmitButton} from './submit-button';

export function ActivityForm({activity}: {activity?: AdminActivity | null}) {
  const value = (key: keyof AdminActivity) => activity?.[key] ?? '';
  const [preview, setPreview] = useState<string | null>(activity?.main_image_url ?? null);
  const [fileName, setFileName] = useState('');
  useEffect(() => () => { if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview); }, [preview]);
  const updatePreview = (file?: File) => {
    if (!file) return;
    setPreview((current) => { if (current?.startsWith('blob:')) URL.revokeObjectURL(current); return URL.createObjectURL(file); });
    setFileName(file.name);
  };

  return <form action={saveActivity} className="admin-form admin-activity-form" encType="multipart/form-data">
    <input type="hidden" name="id" value={activity?.id ?? ''} />
    <section className="admin-form-section"><div className="admin-form-section-heading"><span><Sparkles aria-hidden="true" /></span><div><h2>Informations générales</h2><p>Les titres et repères qui organisent l’activité.</p></div></div><div className="admin-form-grid"><label>Titre français<input name="title_fr" required defaultValue={String(value('title_fr'))} /></label><label>Titre anglais<input name="title_en" required defaultValue={String(value('title_en'))} /></label><label>Slug<input name="slug" defaultValue={String(value('slug'))} /></label><label>Date<input name="activity_date" type="date" defaultValue={String(value('activity_date')).slice(0, 10)} /></label><label>Lieu / région<input name="location" defaultValue={String(value('location'))} /></label><label>Domaine<select name="domain" defaultValue={String(value('domain') || 'educationDigital')}>{domains.map((domain) => <option key={domain} value={domain}>{domainLabels[domain]}</option>)}</select></label></div></section>
    <section className="admin-form-section"><div className="admin-form-section-heading"><span><Sparkles aria-hidden="true" /></span><div><h2>Contenu éditorial</h2><p>Les deux langues sont publiées selon la version du site.</p></div></div><div className="admin-form-grid admin-form-grid--content"><label>Résumé français<textarea name="summary_fr" defaultValue={String(value('summary_fr'))} /></label><label>Résumé anglais<textarea name="summary_en" defaultValue={String(value('summary_en'))} /></label><label>Description française<textarea name="description_fr" defaultValue={String(value('description_fr'))} /></label><label>Description anglaise<textarea name="description_en" defaultValue={String(value('description_en'))} /></label></div></section>
    <section className="admin-form-section"><div className="admin-form-section-heading"><span><ImagePlus aria-hidden="true" /></span><div><h2>Média principal</h2><p>Cette image représente l’activité sur le site public.</p></div></div><label className="admin-upload-zone"><input name="main_image" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => updatePreview(event.target.files?.[0])} /><span><ImagePlus aria-hidden="true" /><strong>{fileName || 'Choisir une image'}</strong><small>JPG, PNG ou WebP · 8 Mo maximum</small></span></label>{preview ? <div className="admin-upload-preview"><Image src={preview} alt="Aperçu de l’image principale" width={560} height={360} unoptimized /><span>{fileName || 'Image actuelle'}</span></div> : null}</section>
    <section className="admin-form-section admin-form-section--publication"><div className="admin-form-section-heading"><span><Sparkles aria-hidden="true" /></span><div><h2>Publication</h2><p>Définissez la visibilité et l’ordre d’affichage.</p></div></div><div className="admin-form-grid"><label>Statut<select name="status" defaultValue={String(value('status') || 'draft')}><option value="draft">Brouillon</option><option value="published">Publié</option></select></label><label>Ordre<input name="sort_order" type="number" min="0" defaultValue={String(value('sort_order') || 0)} /></label><label className="admin-checkbox"><input name="featured" type="checkbox" defaultChecked={Boolean(activity?.featured)} /><span><strong>Mettre en avant</strong><small>Prioritaire dans les contenus sélectionnés.</small></span></label></div></section>
    <div className="admin-form-actions"><SubmitButton>{activity ? 'Enregistrer les modifications' : 'Créer l’activité'}</SubmitButton></div>
  </form>;
}
