# Phase 4 — Administration HADP

## Architecture
L’administration est séparée du site public : `/admin/login`, `/admin/dashboard`, `/admin/activities` et `/admin/gallery`. Les routes protégées passent par la session Supabase et le layout serveur. Aucune inscription n’est exposée : créez les comptes depuis Supabase Authentication.

## Configuration Supabase
1. Créez un projet Supabase, puis exécutez [`supabase/schema.sql`](supabase/schema.sql) dans le SQL Editor.
2. Créez le bucket public `hadp-media` si la commande SQL n’a pas pu le créer.
3. Copiez `.env.example` vers `.env.local` puis renseignez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
4. Dans Supabase Authentication, créez le premier utilisateur administrateur avec **Add user**. Désactivez toute inscription publique.

Les variables ne contiennent aucun secret serveur. Le rôle d’administration s’appuie sur les utilisateurs Auth ; pour un déploiement multi-rôles, remplacez les politiques `authenticated` du schéma par une vérification de rôle dans `auth.jwt()`.

## Données
- `activities` contient les contenus bilingues, le statut, le domaine, l’image principale et les dates.
- `gallery_images` référence une activité de façon optionnelle : une image peut servir à une activité et à la galerie sans duplication de fichier.
- Les images sont stockées dans Supabase Storage, jamais dans Git. Les uploads acceptent JPG, PNG et WebP jusqu’à 8 Mo.
- Seuls les contenus `published` sont destinés à l’affichage public ; les brouillons restent exclus des futures requêtes publiques.

## Utilisation
Les formulaires administratifs créent ou modifient les activités, permettent leur publication, et ajoutent des images à la galerie. Les suppressions demandent une confirmation explicite. Les comptes, les données et Storage doivent être configurés avant de tester les opérations réelles.

## Validation
Sans variables Supabase, `/admin/login` affiche un état de configuration et les routes protégées redirigent vers cette page. Après configuration, vérifiez connexion, déconnexion, création/modification/publication/suppression, upload, galerie et visibilité publique des contenus publiés.
