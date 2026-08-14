import { cn } from '@/lib/utils';

/*
  Page produit mobile, reconstituée en CSS — trois styles de template qu'on
  peut monter avec EasyAfrik.

  ⚠️ EMPLACEMENT VISUEL — le bloc produit (`.mock__photo`) attend une vraie
  photo. Une fois les visuels disponibles, y poser un `next/image` en
  `object-cover` : le cadrage et les rayons sont déjà posés.

  Toutes les tailles sont en `cqw`, avec `@container` sur l'écran : la même
  maquette sert à 300px de large sur mobile et à 470px sur desktop sans qu'on
  ait à recaler chaque texte.
*/

export type MockVariant = 'classique' | 'promo' | 'pack';

/* Teintes du visuel produit : neutres, comme une photo de fiche. */
const TONES = [
  { from: '#efe4da', to: '#d5c1ae' },
  { from: '#e6e9f1', to: '#c2c9dc' },
  { from: '#efe3e9', to: '#d3bdc9' },
] as const;

const LABELS: Record<MockVariant, string> = {
  classique: 'Template Classique',
  promo: 'Template Promo',
  pack: 'Template Pack',
};

type ProductPageMockProps = {
  storeName: string;
  title: string;
  price: string;
  payment: string;
  /* Ville desservie, affichée sous la réassurance de paiement. */
  area: string;
  variant: MockVariant;
  seed: number;
};

/* Ligne de texte factice : évite de répéter le même span partout. */
const Line: React.FC<{ w: string; className?: string }> = ({ w, className }) => (
  <span
    aria-hidden
    className={cn('block h-[clamp(3px,1.6cqw,6px)] rounded-full bg-hairline', className)}
    style={{ width: w }}
  />
);

export const ProductPageMock: React.FC<ProductPageMockProps> = ({
  storeName,
  title,
  price,
  payment,
  area,
  variant,
  seed,
}) => {
  const tone = TONES[Math.abs(seed) % TONES.length];

  return (
    <div className="@container flex size-full flex-col overflow-hidden bg-white">
      {/* Barre d'état */}
      <div
        aria-hidden
        className="flex items-center justify-between px-[6%] pb-[1%] pt-[2.5%] text-[clamp(6px,2.6cqw,11px)] font-semibold text-ink"
      >
        <span>9:41</span>
        <span className="flex items-center gap-[3px]">
          <span className="h-[0.8em] w-[2px] rounded-full bg-ink/60" />
          <span className="h-[1.1em] w-[2px] rounded-full bg-ink/60" />
          <span className="h-[1.4em] w-[2px] rounded-full bg-ink" />
          <span className="ml-[3px] h-[0.85em] w-[1.7em] rounded-[3px] border border-ink/45" />
        </span>
      </div>

      {/* En-tête de boutique */}
      <div className="flex items-center gap-[3%] border-b border-hairline px-[6%] py-[2.5%]">
        <span
          aria-hidden
          className="text-[clamp(9px,3.4cqw,15px)] leading-none text-ink-soft"
        >
          ‹
        </span>
        <span className="brand-gradient-plain size-[clamp(10px,3.4cqw,16px)] shrink-0 rounded-full" />
        <span className="min-w-0 flex-1 truncate text-[clamp(7px,2.9cqw,13px)] font-bold leading-none tracking-tight text-ink">
          {storeName}
        </span>
        <span aria-hidden className="flex flex-col gap-[2px]">
          <span className="h-[1.5px] w-[clamp(8px,2.6cqw,12px)] rounded-full bg-ink/55" />
          <span className="h-[1.5px] w-[clamp(8px,2.6cqw,12px)] rounded-full bg-ink/55" />
          <span className="h-[1.5px] w-[clamp(8px,2.6cqw,12px)] rounded-full bg-ink/55" />
        </span>
      </div>

      {/* Visuel produit */}
      <div
        className="mock__photo relative mx-[6%] mt-[3.5%] flex-1 overflow-hidden rounded-[clamp(6px,2.4cqw,12px)]"
        style={{ background: `linear-gradient(150deg, ${tone.from}, ${tone.to})` }}
      >
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/45 blur-[10px]"
        />

        {/* Pastille de template : dit ce qu'on regarde. */}
        <span className="absolute left-[5%] top-[5%] rounded-full bg-white/90 px-[4.5%] py-[1.8%] text-[clamp(6px,2.3cqw,10px)] font-semibold leading-none text-ink">
          {LABELS[variant]}
        </span>

        {variant === 'promo' && (
          <span className="absolute right-[5%] top-[5%] rounded-full bg-[#e5484d] px-[4.5%] py-[1.8%] text-[clamp(6px,2.3cqw,10px)] font-bold leading-none text-white">
            −30 %
          </span>
        )}

        {/* Puces de galerie : trois vignettes sous la photo principale. */}
        <span aria-hidden className="absolute inset-x-[5%] bottom-[4%] flex gap-[2%]">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={cn(
                'h-[clamp(12px,5cqw,24px)] flex-1 rounded-[clamp(3px,1.2cqw,6px)] bg-white/55',
                index === 0 && 'ring-[1.5px] ring-ink/35',
              )}
            />
          ))}
        </span>
      </div>

      {/* Titre, prix et bloc propre au template */}
      <div className="px-[6%] pb-[5%] pt-[3.5%]">
        <p className="truncate text-[clamp(8px,3.2cqw,15px)] font-bold leading-tight tracking-tight text-ink">
          {title}
        </p>
        <Line w="52%" className="mt-[2.5%]" />

        <div className="mt-[3.5%] flex items-baseline gap-[3%]">
          <span className="text-[clamp(10px,4cqw,19px)] font-bold leading-none tracking-tight text-ink">
            {price}
          </span>
          <span className="text-[clamp(6px,2.3cqw,10px)] font-medium leading-none text-ink-mute">
            F CFA
          </span>
          {variant === 'promo' && (
            <span className="text-[clamp(6px,2.3cqw,10px)] font-medium leading-none text-ink-mute line-through">
              64 000
            </span>
          )}
        </div>

        {variant === 'classique' && (
          /* Sélecteur de variante : le cas le plus courant d'une fiche produit. */
          <div aria-hidden className="mt-[4%] flex gap-[2.5%]">
            {['S', 'M', 'L', 'XL'].map((size, index) => (
              <span
                key={size}
                className={cn(
                  'grid h-[clamp(14px,5.6cqw,26px)] flex-1 place-items-center rounded-[clamp(4px,1.6cqw,8px)] border text-[clamp(6px,2.3cqw,10px)] font-semibold leading-none',
                  index === 1
                    ? 'border-ink bg-ink text-white'
                    : 'border-hairline text-ink-soft',
                )}
              >
                {size}
              </span>
            ))}
          </div>
        )}

        {variant === 'promo' && (
          /* Compte à rebours : le levier d'urgence du template Promo. */
          <div
            aria-hidden
            className="mt-[4%] flex items-center justify-center gap-[2%] rounded-[clamp(4px,1.6cqw,8px)] bg-[#fdeced] py-[2.5%] text-[clamp(6px,2.4cqw,11px)] font-bold leading-none text-[#c8323a]"
          >
            <span>02</span>:<span>14</span>:<span>39</span>
          </div>
        )}

        {variant === 'pack' && (
          /* Offres groupées : le levier de panier moyen du template Pack. */
          <div aria-hidden className="mt-[4%] space-y-[2.5%]">
            {[
              { qty: '1 article', note: 'Prix unitaire', active: false },
              { qty: '2 articles', note: '−15 % · le plus pris', active: true },
            ].map((offer) => (
              <span
                key={offer.qty}
                className={cn(
                  'flex items-center gap-[3%] rounded-[clamp(4px,1.6cqw,8px)] border px-[3.5%] py-[2.5%]',
                  offer.active ? 'border-ink bg-field' : 'border-hairline',
                )}
              >
                <span
                  className={cn(
                    'size-[clamp(7px,2.6cqw,12px)] shrink-0 rounded-full border-[1.5px]',
                    offer.active ? 'border-ink bg-ink' : 'border-hairline-strong',
                  )}
                />
                <span className="text-[clamp(6px,2.3cqw,10px)] font-bold leading-none text-ink">
                  {offer.qty}
                </span>
                <span className="ml-auto text-[clamp(5px,2.1cqw,9px)] leading-none text-ink-mute">
                  {offer.note}
                </span>
              </span>
            ))}
          </div>
        )}

        {/* Réassurance COD : la ligne qui fait la différence sur ce marché. */}
        <p className="mt-[4%] flex items-center gap-[2%] text-[clamp(5px,2.1cqw,10px)] font-medium leading-none text-ink-soft">
          <span aria-hidden className="text-[#12b76a]">✓</span>
          {payment}
        </p>
        <p className="mt-[2%] flex items-center gap-[2%] text-[clamp(5px,2.1cqw,10px)] font-medium leading-none text-ink-soft">
          <span aria-hidden className="text-[#12b76a]">✓</span>
          Livraison {area}
        </p>

        <span className="brand-gradient mt-[4%] flex h-[clamp(16px,6.4cqw,32px)] items-center justify-center rounded-full text-[clamp(6px,2.6cqw,12px)] font-bold leading-none text-white">
          Commander maintenant
        </span>
      </div>
    </div>
  );
};
