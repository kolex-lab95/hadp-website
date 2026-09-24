export const siteNavigation = [
  {href: '/', labelKey: 'home'},
  {href: '/about', labelKey: 'navAbout'},
  {href: '/interventions', labelKey: 'navInterventions'},
  {href: '/actions', labelKey: 'navActions'},
  {href: '/gallery', labelKey: 'navGallery'},
  {href: '/partners', labelKey: 'navPartners'},
  {href: '/contact', labelKey: 'navContact'},
] as const;

export type NavigationItem = Readonly<{href: (typeof siteNavigation)[number]['href']; label: string}>;
