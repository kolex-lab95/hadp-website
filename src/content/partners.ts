export type Partner = Readonly<{
  name: string;
  logo: string;
  url: `https://${string}` | null;
}>;

/** Ajouter uniquement des partenaires validés par HADP. */
export const partners: readonly Partner[] = [];
