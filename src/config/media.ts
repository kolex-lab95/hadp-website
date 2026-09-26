export type ProjectImage = Readonly<{
  src: string;
  width: number;
  height: number;
  altKey: 'imageCommunityAltOne' | 'imageCommunityAltTwo' | 'imageWorkshopAlt' | 'imageEducationDigitalAlt' | 'imageCoordinationParticipantAlt' | 'imageCoordinationDiscussionAlt' | 'imageCoordinationSessionAlt' | 'imageCoordinationGroupAlt' | 'imageCoordinationBannerAlt' | 'imageCoordinationRoomAlt' | 'imageCoordinationGroupPortraitAlt';
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
  coordinationParticipant: {src: '/images/activities/humanitarian-coordination-workshop/hadp-workshop-participant.webp', width: 1440, height: 1080, altKey: 'imageCoordinationParticipantAlt', provisional: false},
  coordinationDiscussion: {src: '/images/activities/humanitarian-coordination-workshop/coordination-discussion.webp', width: 1440, height: 1080, altKey: 'imageCoordinationDiscussionAlt', provisional: false},
  coordinationSession: {src: '/images/activities/humanitarian-coordination-workshop/workshop-session.webp', width: 1440, height: 1080, altKey: 'imageCoordinationSessionAlt', provisional: false},
  coordinationGroup: {src: '/images/activities/humanitarian-coordination-workshop/workshop-participants.webp', width: 1440, height: 1080, altKey: 'imageCoordinationGroupAlt', provisional: false},
  coordinationBanner: {src: '/images/activities/humanitarian-coordination-workshop/workshop-banner.webp', width: 1680, height: 945, altKey: 'imageCoordinationBannerAlt', provisional: false},
  coordinationRoom: {src: '/images/activities/humanitarian-coordination-workshop/workshop-room.webp', width: 1440, height: 1080, altKey: 'imageCoordinationRoomAlt', provisional: false},
  coordinationGroupPortrait: {src: '/images/activities/humanitarian-coordination-workshop/workshop-group.webp', width: 1440, height: 1080, altKey: 'imageCoordinationGroupPortraitAlt', provisional: false},
} satisfies Record<string, ProjectImage>;
