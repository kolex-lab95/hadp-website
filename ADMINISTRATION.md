# Administration HADP

L’espace d’administration permet de gérer les activités et les images publiées sur le site. Il est accessible sous `/admin` et utilise Supabase pour l’authentification, la base de données et le stockage des médias.

## Configuration

1. Créez un projet Supabase.
2. Exécutez [`supabase/schema.sql`](supabase/schema.sql) dans le SQL Editor.
3. Copiez `.env.example` vers `.env.local`.
4. Renseignez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
5. Créez le premier compte administrateur depuis Supabase Authentication.

Le bucket public `hadp-media` reçoit les images JPG, PNG et WebP, avec une taille maximale de 8 Mo. Les images sont stockées dans Supabase Storage et ne sont pas ajoutées au dépôt Git.

## Accès

Les routes `/admin/dashboard`, `/admin/activities` et `/admin/gallery` nécessitent une session authentifiée. Aucune inscription publique n’est proposée par le site.

## Données

- `activities` contient les contenus bilingues, leur statut, leur domaine, leur image principale et leurs dates.
- `gallery_images` référence les médias de la galerie et peut les associer à une activité.
- Seuls les contenus dont le statut est `published` sont visibles sur le site public.
