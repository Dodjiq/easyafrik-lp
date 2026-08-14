# Edith — Landing page (Next.js 16)

Landing page d'Edith, extraite du monorepo [Dodjiq/Edith](https://github.com/Dodjiq/Edith)
(`apps/frontend`) et isolée dans un projet autonome.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

Stack : Next.js 16 (App Router) · React 19 · Tailwind CSS v4 (config dans le CSS) ·
`lucide-react` v1 · `tw-animate-css` · DM Sans via `next/font/google`. Animations en CSS pur.

---

## Provenance du code

Les fichiers de la landing sont **le code du dépôt, copié tel quel** — composants, helpers,
`globals.css` et `app/page.tsx`. Une première version de ce projet contenait des reconstructions
approximatives (le document d'export d'origine avait été tronqué) : elles ont toutes été écrasées.

Fichiers repris du dépôt :

- `src/components/` — les 20 composants de la landing
- `src/lib/` — `utils.ts`, `product-url.ts`, `use-snap-carousel.ts`
- `src/content/contact.ts`
- `src/styles/globals.css`
- `src/app/page.tsx`, `src/app/layout.tsx`

### Écarts assumés avec le dépôt

Trois seulement, tous liés à l'isolement de la landing hors du monorepo, et tous signalés par un
commentaire `⚠️ ÉCART AVEC LE DÉPÔT` à l'endroit concerné :

| Où | Écart | Pourquoi |
|---|---|---|
| `app/layout.tsx` | `<InstallPromptMount />` et `<Script src="/sw-register.js">` retirés | `install-prompt-mount` importe `@/components/dashboard/{mobile-tab-bar,workspace-ui}` ; `sw-register.js` vit dans le `public/` du monorepo |
| `styles/globals.css` | `@source '…/streamdown/dist'` neutralisé | `streamdown` (rendu Markdown du chatbot) n'est pas installé ici, et Tailwind échoue sur un chemin absent |
| `app/login`, `app/signup` | placeholders locaux | Les pages du dépôt importent `@/components/auth/*`, qui tire l'authentification Supabase |

Les versions sont alignées sur `apps/frontend/package.json` : `tailwindcss@^4.3.3`,
`@tailwindcss/postcss@^4.3.3`, `lucide-react@^1.29.0`, `tw-animate-css@^1.4.0`.
Tailwind 4.1 ne résolvait pas la condition `style` de `tw-animate-css` — d'où l'alignement en 4.3.

---

## Structure

`src/app/page.tsx` empile 13 blocs : `Header` · `Hero` · `StylesShowcase` · `HowItWorks` ·
`CreatorsShowcase` · `AnalysisSection` · `FormatsSection` · `TeamSection` · `Testimonials` ·
`PricingSection` · `FaqSection` · `FinalCta` · `Footer`.

Ancres rendues : `#styles` · `#comment-ca-marche` · `#resultats` · `#equipe` · `#avis` ·
`#tarifs` · `#faq`.

## Design system

Tout vit dans `src/styles/globals.css` : échelle typographique dérivée de deux références
(titre 42/48, corps 16/24), rythme vertical en `--section-y` / `--section-head` / `--section-title`,
rayon unique `--radius-card`, dégradé de marque unique (`.brand-gradient`), variables de header
qui doublent à `lg`.

---

## Points relevés

### `animate-pulse-soft` n'est défini nulle part

La classe est utilisée deux fois — `analysis-section.tsx:135` et `how-it-works.tsx:89` — sur des
halos décoratifs (`aria-hidden`). Elle n'existe ni dans `globals.css`, ni dans `tw-animate-css`.
**Ce n'est pas un effet de l'extraction : elle est déjà morte dans le dépôt.** Conséquence : les
deux halos s'affichent fixes au lieu de pulser. Correctif d'une ligne dans le `@theme inline` si
l'animation est voulue :

```css
--animate-pulse-soft: pulse-soft 4s ease-in-out infinite;
```

…accompagné du `@keyframes pulse-soft` correspondant.

### À traiter avant mise en ligne

- **Données à vérifier ou retirer** : `rating-pill.tsx`, `testimonials.tsx`, `team-section.tsx`
  (« Prénom Nom ») et la grille de `pricing-section.tsx` portent des emplacements ou des chiffres
  non sourcés. Les commentaires ⚠️ du dépôt le signalent déjà.
- **Aucun asset média** : tous les visuels passent par `MediaPlaceholder`.
- `CONTACT_EMAIL` dans `src/content/contact.ts`.
- `layout.tsx` référence `/icon.svg`, `/favicon-32.png`, `/apple-touch-icon.png` et
  `/manifest.webmanifest` : absents de `public/`, donc 404 en l'état.
- Les liens `/politiques/*` du footer pointent vers des pages qui vivent dans le monorepo.

## Vérifications passées

Build propre sur cache vierge (Next 16.3.1 / Turbopack), `tsc --noEmit` clean, 5 routes générées,
**zéro module non résolu**, `/` en HTTP 200 (237 Ko) avec les 13 blocs et les 7 ancres au rendu.
