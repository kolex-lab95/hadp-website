export type SocialId = 'linkedin' | 'facebook' | 'x' | 'youtube' | 'tiktok';
export type SocialNetwork = Readonly<{
  id: SocialId;
  label: string;
  url: `https://${string}` | null;
}>;

/** Les comptes sans URL restent visibles dans le footer sans créer de navigation. */
export const socials = [
  {id: 'linkedin', label: 'LinkedIn', url: null},
  {id: 'facebook', label: 'Facebook', url: null},
  {id: 'x', label: 'X / Twitter', url: null},
  {id: 'youtube', label: 'YouTube', url: null},
  {id: 'tiktok', label: 'TikTok', url: null},
] satisfies readonly SocialNetwork[];
