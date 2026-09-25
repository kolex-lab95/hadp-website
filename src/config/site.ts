/** Source : cahier HADP V1, sections 0, 5.7 et 10.3. */
export const site = {
  name: 'Humanitarian Action for Development and Protection',
  acronym: 'HADP',
  phone: '+227 96 50 81 46',
  whatsappUrl: 'https://wa.me/22780945865',
  email: {address: 'contact@hadp-niger.org', provisional: true},
  location: {city: 'Tahoua', country: 'Niger'},
  logo: {src: '/images/hadp-logo.png', width: 1546, height: 1017},
  // Ne pas déduire le domaine officiel de l'adresse e-mail provisoire.
  url: process.env.SITE_URL || null,
} as const;

export const phoneHref = `tel:${site.phone.replaceAll(' ', '')}`;
