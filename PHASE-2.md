# Recette de la Phase 2

## Périmètre livré

La page d’accueil HADP est complète en français et en anglais : header responsive, Hero, présentation, domaines d’intervention, impact, actions documentées, populations accompagnées, régions, galerie, partenaires, CTA final et footer.

Le contenu est centralisé dans les dictionnaires, la configuration et les fichiers de données. Les composants serveur restent la règle ; seul le menu mobile et le sélecteur de langue utilisent le client lorsque l’interaction le demande. Aucune page interne n’a été commencée.

## Résultats

Vérification effectuée le 24 septembre 2026 sur Windows, Node.js 24.19.0 et Microsoft Edge/Chromium.

| Contrôle | Commande | Résultat |
| --- | --- | --- |
| TypeScript strict | `npm run typecheck` | Réussi |
| ESLint | `npm run lint` | Réussi, aucun avertissement |
| Traductions | `npm run test:i18n` | 101 clés FR/EN identiques et non vides |
| Build production | `npm run build` | Réussi, routes `/fr` et `/en` pré-rendues |
| Tests navigateur | `npm run test:ui` | 29 réussis, 0 échec |

Les huit largeurs demandées sont conformes dans les deux langues. Aucun débordement horizontal, lien factice, erreur console ou violation détectable par l’audit axe WCAG 2.1 A/AA n’a été relevé. Le menu mobile, le clavier, le focus, le mouvement réduit et le zoom texte à 200 % sont couverts.

## Captures

- `qa/phase-2-home-390-final.png`
- `qa/phase-2-home-1440-final.png`

## Éléments provisoires

- Les trois photographies de terrain sont identifiées comme provisoires dans `src/config/media.ts`. Les fichiers originaux, crédits, légendes définitives et autorisations de diffusion restent à valider.
- L’e-mail `contact@hadpniger.com` reste provisoire.
- Les partenaires restent sans logos ni liens jusqu’à leur renseignement.
- Les cinq URLs sociales restent à `null` ; les icônes conservent une interaction sans navigation. Le contact WhatsApp est présenté dans le CTA final.
- Les indicateurs d’impact centralisés sont `4+`, `8`, `X+` et `X+`.
- Le site reste volontairement en `noindex` jusqu’à la validation du domaine et de la publication.

La Phase 2 s’arrête à la page d’accueil et à son layout global.
