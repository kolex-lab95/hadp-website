export type ProjectImage = Readonly<{
  src: string;
  width: number;
  height: number;
  altKey: 'imageCommunityAltOne' | 'imageCommunityAltTwo' | 'imageWorkshopAlt' | 'imageEducationDigitalAlt';
  provisional: boolean;
}>;

/**
 * Photos issues des documents du projet. Les fichiers originaux, crédits et
 * autorisations de publication restent à confirmer avant la mise en ligne.
 */
export const homeMedia = {
  communityOne: {
    src: '/images/field/sensibilisation-communautaire-01.png',
    width: 939,
    height: 538,
    altKey: 'imageCommunityAltOne',
    provisional: true,
  },
  communityTwo: {
    src: '/images/field/sensibilisation-communautaire-02.png',
    width: 934,
    height: 496,
    altKey: 'imageCommunityAltTwo',
    provisional: true,
  },
  workshop: {
    src: '/images/field/atelier-pratique-01.png',
    width: 984,
    height: 462,
    altKey: 'imageWorkshopAlt',
    provisional: true,
  },
  educationDigital: {
    src: '/images/field/education-digital-literacy.webp',
    width: 1536,
    height: 1024,
    altKey: 'imageEducationDigitalAlt',
    provisional: true,
  },
} satisfies Record<string, ProjectImage>;
