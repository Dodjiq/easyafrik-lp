# EasyAfrik — Landing page

Landing page d'**EasyAfrik**, la plateforme e-commerce pensée pour les entrepreneurs africains :
paiement à la livraison, Mobile Money, clonage de boutique par IA, 0 % de commission.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 (config dans le CSS, pas de
`tailwind.config.js`) · `lucide-react` v1 · `tw-animate-css` · DM Sans via `next/font/google`.
Animations en CSS pur — aucune bibliothèque d'animation.

## Déploiement

Le projet Next.js est **à la racine du dépôt** : tout hébergeur le détecte sans réglage.

Il a d'abord vécu dans un sous-dossier, et l'hébergeur servait alors l'`index.html` de la racine
comme site statique sans jamais construire l'application. D'où cette structure — ne pas remettre
de `index.html` à la racine.

## Structure

`src/app/page.tsx` empile 13 blocs :

| Composant | Ancre |
|---|---|
| `Header` | — |
| `Hero` | — |
| `StylesShowcase` — carrousel 3D de boutiques mobiles | `#boutiques` |
| `HowItWorks` — 3 étapes illustrées | `#comment-ca-marche` |
| `CreatorsShowcase` — templates de pages produit | `#resultats` |
| `AnalysisSection` — outils IA | `#outils-ia` |
| `FormatsSection` — moyens de paiement | `#paiements` |
| `TeamSection` | `#equipe` |
| `Testimonials` | `#avis` |
| `PricingSection` | `#tarifs` |
| `FaqSection` | `#faq` |
| `FinalCta` · `Footer` | — |

`legacy-static/` conserve la première version en HTML/CSS/JS, sans build. Elle sert de référence
de contenu et n'est pas déployée.

## Design system

Tout vit dans `src/styles/globals.css` :

- **Échelle typographique dérivée de deux références** : titre 42/48 et corps 16/24.
  `--text-display` est un `clamp(2.125rem, 6vw, 4.75rem)` — le plancher à 34px évite que le titre
  du hero déborde sur un écran de 360px.
- **Rythme vertical** : chaque section pose `--section-y` en haut *et* en bas (112px entre deux
  sections), `--section-head` de l'en-tête au contenu, `--section-title` du titre au sous-titre.
- **Un seul rayon** : `--radius-card: 20px`, porté par `.card` et `.card-soft`.
- **Un seul dégradé** : `.brand-gradient` / `.brand-gradient-plain`, en 5 arrêts.
- **Header** : trois pilules flottantes, `--header-gap` et `--header-pad` qui doublent à `lg`.

## Maquettes en CSS

Les visuels de boutique sont reconstitués en CSS, pas des captures :

- `store-screen.tsx` — écran mobile de boutique, pour le carrousel 3D
- `product-page-mock.tsx` — page produit en trois templates (Classique, Promo, Pack)

Les emplacements photo sont commentés dans chaque fichier, cadrage prêt pour un `next/image`.

## À traiter avant mise en ligne

- **Témoignages nommés** (Badro, Djato, Awa Diallo) : accord écrit des personnes citées, et
  mention indiquant comment les avis sont vérifiés — la directive Omnibus l'impose dès qu'on
  affiche des avis clients.
- **Portraits** : vérifier que leur licence couvre cet usage commercial. Ils sont versionnés dans
  `public/`, donc publics si le dépôt l'est.
- **Boutiques de la vitrine** : anonymes et sans donnée de performance, volontairement. Ne pas y
  mettre de chiffre d'affaires ou de taux de conversion non mesuré.
- **Visuels produit** : maquettes CSS, à remplacer par de vraies photos.
- **Routes `/login` et `/signup`** : placeholders, à brancher sur le vrai parcours.
- `CONTACT_EMAIL` dans `src/content/contact.ts`.
- **Section comparative** « Pourquoi pas Shopify ou Youcan ? » : présente sur easyafrik.com et
  dans le cahier des charges, absente de cette refonte.
- **`animate-pulse-soft`** : classe utilisée dans `analysis-section.tsx` et `how-it-works.tsx`
  mais définie nulle part — les deux halos restent fixes au lieu de pulser.
