# Recette de la Phase 1

## Périmètre livré

Architecture Next.js App Router + TypeScript strict, Tailwind, design system, dictionnaires FR/EN, préférence linguistique, données HADP centralisées, composants primitifs, layout et accueil de référence.

Le cahier a été lu intégralement. Le logo intégré est l’unique image embarquée dans ce document. Les coordonnées proviennent du cahier. Les sept URLs sociales restent nulles. Aucun site n’est déployé.

## Éléments à valider

1. Palette, Manrope/Inter, proportions et espacement de l’accueil de référence.
2. Traduction proposée du slogan : « Humanity - Inclusion ».
3. Dans les phases concernées : domaine, e-mail définitif, réseaux et WhatsApp, médias originaux, vision officielle, contenus légaux.
4. Les sections 2 et 12 du cahier donnent des listes de domaines différentes ; leur présentation institutionnelle sera à confirmer avant les pages métier.

## Limites de cette livraison

Les pages internes, le Hero final, les médias terrain, le formulaire et la publication ne font pas partie de cette phase. Le SEO est préparé ; la page de référence est volontairement en noindex. Les objectifs Lighthouse et Core Web Vitals du site final restent à mesurer lors de sa réalisation. L’audit automatisé d’accessibilité ne constitue pas une certification WCAG.

## Résultats

Vérification effectuée le 24 septembre 2026 sur Windows, Node.js 24.19.0, npm 11.17.0 et Microsoft Edge (moteur Chromium).

| Contrôle | Commande | Résultat |
| --- | --- | --- |
| TypeScript strict et types de routes | `npm run typecheck` | Réussi, aucune erreur |
| ESLint | `npm run lint` | Réussi, aucune erreur ni avertissement |
| Traductions | `npm run test:i18n` | 34 clés FR/EN présentes, non vides et identiques en structure |
| Compilation de production | `npm run build` | Réussie, accueil FR/EN pré-rendu |
| Lancement | `npm run start` | Serveur local opérationnel sur http://localhost:3000 |
| Tests navigateur | `npm run test:ui` | 20 tests réussis, 0 échec (36,2 secondes) |

Les tests navigateur utilisent le build de production. Les contrôles incluent : absence de débordement horizontal dans le document et ses éléments, contrôles d’au moins 44 × 44 px, un seul H1, absence de faux liens sociaux, absence d’erreur console, chargement des deux polices et du logo.

| Largeur | Français | Anglais |
| --- | --- | --- |
| 360 px | Conforme | Conforme |
| 390 px | Conforme | Conforme |
| 430 px | Conforme | Conforme |
| 768 px | Conforme | Conforme |
| 1024 px | Conforme | Conforme |
| 1366 px | Conforme | Conforme |
| 1440 px | Conforme | Conforme |
| 1920 px | Conforme | Conforme |

Les captures FR/EN à 390 et 1440 px ont été examinées visuellement : pas de contenu tronqué, de chevauchement ni de rupture de hiérarchie observés. Les autres largeurs sont couvertes par les mesures automatisées et leurs captures conservées dans `test-results/`.

Les deux audits axe ne signalent aucune violation parmi les règles automatisables WCAG 2.1 A/AA testées. Le lien d’évitement fonctionne au clavier, le focus atteint le contenu principal, l’ancre vers la palette fonctionne, les transitions sont supprimées lorsque le mouvement réduit est demandé, et l’agrandissement du texte à 200 % à 390 px ne provoque pas de débordement horizontal.

Le français reste la langue initiale avec un navigateur configuré en anglais. Le passage à l’anglais conserve `hadp_locale=en` ; un nouvel accès à la racine reprend ce choix. Le retour explicite au français fonctionne.

Les tests ont permis de corriger le routage local et la ressource favicon manquante. Utiliser le nom d’hôte `localhost`, cohérent entre Next.js, les rewrites et la recette. L’icône fournie est une réduction du logo original, avec ses proportions conservées.

Versions verrouillées : Next.js 16.3.6, React 19.3.0, TypeScript 6.0.3, Tailwind CSS 4.3.3, next-intl 4.14.6. Le fichier `package-lock.json` permet une installation reproductible avec `npm ci`.

Recette réalisée avec Edge/Chromium ; Firefox, Safari, appareils physiques, lecteurs d’écran et mesures Lighthouse ne sont pas couverts par cette livraison.

La Phase 2 n’est pas commencée. Attente de validation.

