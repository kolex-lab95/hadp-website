export type ActivityStatus = 'draft' | 'published';
export type AdminActivity = {
  id: string; slug: string; title_fr: string; title_en: string; summary_fr: string; summary_en: string;
  description_fr: string; description_en: string; activity_date: string | null; location: string | null;
  domain: string; status: ActivityStatus; featured: boolean; sort_order: number; main_image_url: string | null;
  created_at: string; updated_at: string;
};
export type GalleryImage = {id: string; image_url: string; caption_fr: string | null; caption_en: string | null; alt_fr: string; alt_en: string; activity_id: string | null; status: ActivityStatus; sort_order: number; created_at: string};

export const domains = ['educationDigital', 'protection', 'livelihoods', 'economicInclusion', 'health', 'shelter', 'logistics'] as const;
export const domainLabels: Record<(typeof domains)[number], string> = {
  educationDigital: 'Éducation - Inclusion numérique', protection: 'Protection', livelihoods: 'Moyens de subsistance',
  economicInclusion: 'Inclusion économique', health: 'Santé', shelter: 'Abris et assistance humanitaire', logistics: 'Logistique',
};
