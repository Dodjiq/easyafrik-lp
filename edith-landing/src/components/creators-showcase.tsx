'use client';

import { useState } from 'react';
import { Reveal } from '@/components/reveal';
import { ProductPageMock, type MockVariant } from '@/components/product-page-mock';
import { CarouselDots } from '@/components/carousel-dots';
import { useSnapCarousel } from '@/lib/use-snap-carousel';
import { cn } from '@/lib/utils';

type StoreProduct = {
  id: string;
  title: string;
  format: string;
  /* Prix affiché sur la fiche : une donnée de configuration, pas un résultat. */
  price: string;
  /* Mode d'encaissement branché sur cette page. */
  payment: string;
  /* Ville de livraison desservie. */
  area: string;
  /* Style de template monté pour cette page produit. */
  variant: MockVariant;
};

type Store = {
  id: string;
  name: string;
  descriptor: string;
  products: readonly StoreProduct[];
};

/*
  ⚠️ BOUTIQUES D'ILLUSTRATION — à remplacer par de vraies boutiques clientes.

  Les profils ci-dessous sont volontairement anonymes, et les valeurs affichées
  décrivent une *configuration* (prix, mode de paiement, zone de livraison),
  jamais une performance commerciale. Afficher un chiffre d'affaires ou un taux
  de conversion attribué à une boutique nommée, sans son accord écrit et sans
  mesure réelle, serait une allégation trompeuse.
*/
const STORES: readonly Store[] = [
  {
    id: 'mode',
    name: 'Boutique mode',
    descriptor: 'Dakar · COD',
    products: [
      { id: 'm1', title: 'Sac à main cuir', format: 'Page produit', price: '45 000', payment: 'COD', area: 'Dakar', variant: 'classique' },
      { id: 'm2', title: 'Ensemble deux pièces', format: 'Page produit', price: '28 500', payment: 'Wave', area: 'Thiès', variant: 'promo' },
      { id: 'm3', title: 'Foulard soie', format: 'Upsell panier', price: '12 000', payment: 'COD', area: 'Dakar', variant: 'pack' },
    ],
  },
  {
    id: 'cosmetique',
    name: 'Boutique cosmétiques',
    descriptor: 'Abidjan · COD + Mobile Money',
    products: [
      { id: 'c1', title: 'Sérum éclaircissant', format: 'Page produit', price: '19 900', payment: 'Orange Money', area: 'Cocody', variant: 'classique' },
      { id: 'c2', title: 'Coffret soin visage', format: 'Cross-sell', price: '52 000', payment: 'COD', area: 'Abidjan', variant: 'pack' },
      { id: 'c3', title: 'Huile capillaire', format: 'Page produit', price: '9 500', payment: 'COD', area: 'Yopougon', variant: 'promo' },
    ],
  },
  {
    id: 'agence',
    name: 'Media buyer',
    descriptor: '10 boutiques gérées',
    products: [
      { id: 'a1', title: 'Montre homme acier', format: 'Boutique clonée', price: '34 900', payment: 'COD', area: 'Lomé', variant: 'promo' },
      { id: 'a2', title: 'Écouteurs sans fil', format: 'Page produit', price: '15 000', payment: 'MTN MoMo', area: 'Cotonou', variant: 'classique' },
      { id: 'a3', title: 'Tapis de prière', format: 'Upsell panier', price: '7 500', payment: 'COD', area: 'Ouagadougou', variant: 'pack' },
    ],
  },
];

/* Avatar neutre : la couleur de marque reste réservée aux éléments actifs. */
const StoreAvatar: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
  <span
    aria-hidden
    className={cn(
      'grid shrink-0 place-items-center rounded-full bg-[#e4e4e8] font-bold text-ink-soft',
      className,
    )}
  >
    {name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)}
  </span>
);

const ProductCard: React.FC<{
  product: StoreProduct;
  storeName: string;
  seed: number;
}> = ({ product, storeName, seed }) => (
  /*
    Le template EST la carte : plus de cadre ni de bandeau de données autour.
    Tout ce que portait l'ancien bandeau — prix, encaissement, ville — vit
    désormais dans la page produit elle-même, là où un client le verrait.
  */
  <article className="flex w-full shrink-0 snap-center flex-col items-center md:w-auto md:snap-align-none">
    <div className="w-full max-w-[280px] overflow-hidden rounded-[22px] bg-white shadow-[0_24px_60px_-22px_rgba(15,23,42,0.4)] ring-1 ring-hairline [aspect-ratio:9/19]">
      <ProductPageMock
        storeName={storeName}
        title={product.title}
        price={product.price}
        payment={
          product.payment === 'COD' ? 'Paiement à la livraison' : `Paiement ${product.payment}`
        }
        area={product.area}
        variant={product.variant}
        seed={seed}
      />
    </div>

    {/*
      Légende sobre sous l'écran. Le nom du template n'est pas repris ici :
      il est déjà porté par la pastille dans la maquette.
    */}
    <p className="mt-5 text-center text-small font-semibold text-ink">{product.format}</p>
  </article>
);

export const CreatorsShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(STORES[0].id);
  const activeStore = STORES.find((store) => store.id === activeId) ?? STORES[0];
  const { trackRef, activeIndex, handleScroll, goTo, reset } = useSnapCarousel();

  /* Changer de boutique remet le carrousel sur la première page produit. */
  const selectStore = (storeId: string) => {
    setActiveId(storeId);
    reset();
  };

  return (
    <section id="resultats" className="px-5 py-[var(--section-y)]">
      <div className="mx-auto w-full max-w-[1180px]">
        {/* Largeur calée sur le titre : 46rem coupaient la première ligne en deux. */}
        <Reveal className="mx-auto max-w-[58rem] text-center">
          {/*
            Deux lignes, la seconde colorée — même découpe que la référence.
            Pas de `text-balance` ici : il rééquilibre autour de la coupure
            explicite et peut replier la première ligne en deux.
          */}
          <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-semibold leading-[1.15] tracking-tight text-ink">
            {/* `nowrap` seulement à partir de md : en dessous la ligne déborderait. */}
            <span className="md:whitespace-nowrap">Des boutiques qui encaissent</span>
            <br />
            <span className="bg-gradient-to-r from-accent-start to-accent-mid bg-clip-text text-transparent">
              partout en Afrique
            </span>
          </h2>
          <p className="mx-auto mt-[var(--section-title)] max-w-[48ch] text-small text-ink-soft md:text-lead">
            Une boutique, ses pages produit, ses prix en FCFA et ses zones de livraison.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-[var(--section-head)]">
          {/*
            Sur mobile : une seule ligne, réduite au nom du compte. Avatar et
            descripteur sont masqués, sinon les trois onglets ne tiennent pas.
            La rangée défile si les libellés dépassent, plutôt que de tronquer.
          */}
          <div
            role="tablist"
            aria-label="Boutiques"
            className="scrollbar-none flex snap-x gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:pb-0"
          >
            {STORES.map((store) => {
              const isActive = store.id === activeId;

              return (
                <button
                  key={store.id}
                  role="tab"
                  id={`tab-${store.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${store.id}`}
                  onClick={() => selectStore(store.id)}
                  className={cn(
                    'flex shrink-0 snap-start items-center gap-3 whitespace-nowrap rounded-xl border px-3 py-2 text-left transition-colors duration-200 sm:shrink sm:whitespace-normal sm:px-4 sm:py-3',
                    isActive
                      ? 'border-accent-start bg-accent-start/[0.06] ring-1 ring-accent-start/30'
                      : 'border-hairline bg-surface hover:border-hairline-strong',
                  )}
                >
                  <StoreAvatar name={store.name} className="hidden size-10 text-[13px] sm:grid" />
                  <span>
                    <span
                      className={cn(
                        'block text-small font-semibold sm:text-body',
                        isActive ? 'text-ink' : 'text-ink-soft',
                      )}
                    >
                      {store.name}
                    </span>
                    <span className="hidden text-small text-ink-mute sm:block">
                      {store.descriptor}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          role="tabpanel"
          id={`panel-${activeStore.id}`}
          aria-labelledby={`tab-${activeStore.id}`}
          className="scrollbar-none mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto md:grid md:grid-cols-3 md:gap-6 md:overflow-visible"
        >
          {activeStore.products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              storeName={activeStore.name}
              seed={index}
            />
          ))}
        </div>

        <CarouselDots
          count={activeStore.products.length}
          activeIndex={activeIndex}
          onSelect={goTo}
          label="Page produit"
          className="md:hidden"
        />
      </div>
    </section>
  );
};
