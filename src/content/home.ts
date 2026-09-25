export const interventions = [
  {id: 'protection', titleKey: 'interventionProtection', descriptionKey: 'interventionProtectionDescription'},
  {id: 'livelihoods', titleKey: 'interventionLivelihoods', descriptionKey: 'interventionLivelihoodsDescription'},
  {id: 'economicInclusion', titleKey: 'interventionEconomicInclusion', descriptionKey: 'interventionEconomicInclusionDescription'},
  {id: 'health', titleKey: 'interventionHealth', descriptionKey: 'interventionHealthDescription'},
  {id: 'shelter', titleKey: 'interventionShelter', descriptionKey: 'interventionShelterDescription'},
  {id: 'logistics', titleKey: 'interventionLogistics', descriptionKey: 'interventionLogisticsDescription'},
  {id: 'educationDigital', titleKey: 'interventionEducationDigital', descriptionKey: 'interventionEducationDigitalDescription'},
] as const;

export type ImpactStat = Readonly<{
  id: string;
  value: string;
  labelKey: 'impactYears' | 'impactRegions' | 'impactBeneficiaries' | 'impactActions';
}>;

export const impactStats: readonly ImpactStat[] = [
  {id: 'years', value: '4+', labelKey: 'impactYears'},
  {id: 'regions', value: '8', labelKey: 'impactRegions'},
  {id: 'beneficiaries', value: 'X+', labelKey: 'impactBeneficiaries'},
  {id: 'actions', value: 'X+', labelKey: 'impactActions'},
];

export const fieldActions = [
  {id: 'cohesion', titleKey: 'actionCohesion', descriptionKey: 'actionCohesionDescription'},
  {id: 'protection', titleKey: 'actionProtection', descriptionKey: 'actionProtectionDescription'},
  {id: 'entrepreneurship', titleKey: 'actionEntrepreneurship', descriptionKey: 'actionEntrepreneurshipDescription'},
  {id: 'education', titleKey: 'actionGirlsEducation', descriptionKey: 'actionGirlsEducationDescription'},
  {id: 'training', titleKey: 'actionTraining', descriptionKey: 'actionTrainingDescription'},
] as const;

export const audiences = [
  {id: 'women', labelKey: 'audienceWomen'},
  {id: 'youth', labelKey: 'audienceYouth'},
  {id: 'children', labelKey: 'audienceChildren'},
  {id: 'refugees', labelKey: 'audienceRefugees'},
  {id: 'displaced', labelKey: 'audienceDisplaced'},
  {id: 'vulnerable', labelKey: 'audienceVulnerable'},
] as const;

export const regions = ['Tahoua', 'Niamey', 'Agadez', 'Maradi', 'Zinder', 'Diffa', 'Tillabéri', 'Dosso'] as const;

export const galleryImages = ['communityOne', 'workshop', 'communityTwo'] as const;
