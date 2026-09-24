# HADP — Site institutionnel

Projet Next.js du site officiel de l’ONG HADP. La Phase 2 livre la page d’accueil complète en français et en anglais. Les pages internes, le CMS, les dons, la newsletter et la vidéothèque ne sont pas encore développés.

## Démarrage

Node.js 22 ou une version ultérieure et npm sont requis.

```sh
npm ci
npm run dev
```

Le site local est disponible sur `http://localhost:3000` en français et sur `http://localhost:3000/en` en anglais.

## Architecture

```text
hadp-website/
├── messages/                 # Dictionnaires FR/EN
├── public/images/            # Logo et photographies de travail
├── qa/                       # Captures de contrôle
├── scripts/                  # Contrôle des dictionnaires
├── src/
│   ├── app/[locale]/         # Layout et accueil localisés
│   ├── components/
│   │   ├── layout/           # Header, navigation mobile, footer
│   │   ├── sections/home/    # Sections de la page d’accueil
│   │   └── ui/               # Primitives du design system
│   ├── config/               # Identité, navigation, médias et réseaux
│   ├── content/              # Données institutionnelles structurées
│   ├── i18n/                 # Routage et résolution des langues
│   └── styles/globals.css    # Tokens et styles globaux
├── tests/foundations.spec.ts
├── PHASE-1.md
└── PHASE-2.md
```

## Choix techniques

- Next.js App Router, React et composants serveur par défaut.
- TypeScript strict, Tailwind CSS 4 et design system centralisé.
- `next-intl` avec français par défaut, anglais sous `/en` et mémorisation du choix.
- `next/image` pour toutes les photographies ; leurs références sont regroupées dans `src/config/media.ts`.
- Navigation mobile cliente limitée au comportement nécessaire : focus piégé, fermeture par Échap, restitution du focus et blocage du défilement.
- Animations CSS discrètes, désactivées avec `prefers-reduced-motion`.
- Réseaux sociaux conservés dans un état sans navigation tant qu’aucune URL réelle n’est renseignée ; partenaires conditionnels.
- Métadonnées bilingues et `noindex` temporaire jusqu’à la validation du domaine et de la publication.

## Données à maintenir

- `src/config/site.ts` : identité, slogan, téléphone, e-mail et localisation.
- `src/config/socials.ts` : cinq URLs sociales, initialisées à `null`. Le contact WhatsApp est centralisé dans `src/config/site.ts`.
- `src/config/media.ts` : photographies et statut provisoire.
- `src/content/home.ts` : domaines, actions, publics, régions et indicateurs d’impact.
- `src/content/partners.ts` : partenaires, actuellement vide.
- `messages/fr.json` et `messages/en.json` : tout le contenu visible.

## Contrôles

```sh
npm run test:i18n
npm run typecheck
npm run lint
npm run build
npm run test:ui
```

La recette Playwright couvre le français et l’anglais aux largeurs 360, 390, 430, 768, 1024, 1366, 1440 et 1920 px. Elle contrôle notamment le débordement horizontal, les cibles tactiles, le clavier, le menu mobile, le zoom texte à 200 %, les erreurs console et les règles automatisables WCAG 2.1 AA.

Voir `PHASE-2.md` pour le périmètre livré, les résultats et les éléments provisoires.
