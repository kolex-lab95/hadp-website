# HADP — Site institutionnel

Site officiel bilingue de **Humanitarian Action for Development and Protection (HADP)**, organisation humanitaire basée au Niger.

## Fonctionnalités

- Site public en français et en anglais
- Présentation de l’organisation, de ses domaines d’intervention et de ses actions
- Galerie de médias et contenus administrables
- Espace d’administration sécurisé avec Supabase
- Interface responsive et accessible
- Métadonnées et routage localisés

## Technologies

Next.js 16, React 19, TypeScript, Tailwind CSS 4, next-intl et Supabase.

## Installation

Prérequis : Node.js 22 ou version ultérieure.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Le site est disponible sur `http://localhost:3000`. La version anglaise est accessible sous `/en`.

## Configuration

Renseignez les variables suivantes dans `.env.local` :

```env
SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Le schéma de données se trouve dans [`supabase/schema.sql`](supabase/schema.sql). La configuration de l’espace d’administration est détaillée dans [`ADMINISTRATION.md`](ADMINISTRATION.md).

## Commandes

| Commande | Utilisation |
| --- | --- |
| `npm run dev` | Lancer le serveur de développement |
| `npm run build` | Générer la version de production |
| `npm run start` | Démarrer la version de production |
| `npm run check` | Vérifier les traductions, les types, le code et le build |
| `npm run test:ui` | Exécuter les tests d’interface |

## Structure

- `src/` : application, composants, contenu et configuration
- `messages/` : traductions françaises et anglaises
- `public/images/` : logo et photographies utilisées par le site
- `supabase/` : schéma de données
- `tests/` : tests d’interface et d’accessibilité
- `scripts/` : contrôles du projet
