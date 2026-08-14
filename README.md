# easyafrik-lp

Landing pages d'**EasyAfrik** — la plateforme e-commerce pensée pour les entrepreneurs africains :
paiement à la livraison, Mobile Money, clonage de boutique par IA, 0 % de commission.

Le dépôt contient deux projets distincts.

## `edith-landing/` — landing Next.js (projet principal)

Refonte complète, en production de travail.

```bash
cd edith-landing
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 (config dans le CSS) · `lucide-react` v1 ·
DM Sans via `next/font/google`. Animations en CSS pur, aucune bibliothèque d'animation.

13 sections : Header · Hero · Vitrine boutiques · Comment ça marche · Boutiques clientes ·
Outils IA · Paiements · Équipe · Avis · Tarifs · FAQ · CTA final · Footer.

Voir [edith-landing/README.md](edith-landing/README.md) pour le design system, la provenance du
code et les points à traiter avant mise en ligne.

> Le dossier porte encore le nom `edith-landing` : la base de code vient d'un autre projet, et le
> renommage a été bloqué par un verrou de fichier Windows. Rien dans le code n'en dépend.

## `index.html` · `styles.css` · `main.js` — landing statique

Première version, sans build ni dépendance : ouvrez `index.html` dans un navigateur.
Conservée comme référence de contenu.

## À traiter avant mise en ligne

- **Données à vérifier** : les témoignages nommés (Badro, Djato, Awa Diallo) exigent un accord
  écrit, et la mention indiquant comment les avis sont vérifiés — la directive Omnibus l'impose.
- **Photos** : vérifier que la licence des portraits couvre cet usage commercial.
- **Visuels produit** : les boutiques et pages produit sont des maquettes CSS, pas des captures
  réelles. Les emplacements sont documentés dans le code.
- **Routes `/login` et `/signup`** : des placeholders, à brancher sur le vrai parcours.
- **Section comparative** « Pourquoi pas Shopify ou Youcan ? » : présente sur le site en ligne,
  absente de cette refonte.
