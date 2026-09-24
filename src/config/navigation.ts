export const homeNavigation = [
  {id: 'top', labelKey: 'home'},
  {id: 'about', labelKey: 'navAbout'},
  {id: 'interventions', labelKey: 'navInterventions'},
  {id: 'actions', labelKey: 'navActions'},
  {id: 'gallery', labelKey: 'navGallery'},
  {id: 'partners', labelKey: 'navPartners'},
  {id: 'contact', labelKey: 'navContact'},
] as const;

export type NavigationItem = Readonly<{href: `#${string}`; label: string}>;
