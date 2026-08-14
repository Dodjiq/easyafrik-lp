import { cn } from '@/lib/utils';

/*
  Capture d'écran mobile d'une boutique, reconstituée en CSS.

  ⚠️ EMPLACEMENT — à remplacer par de vraies captures dès qu'elles existent.
  Le cadre est déjà au bon rapport (≈ 9:19, un écran de téléphone) : il suffira
  de poser un `next/image` en `object-cover` à la place du bloc `.screen__hero`,
  ou de l'ensemble du contenu si la capture couvre tout l'écran.

  Tout est dimensionné en clamp() plutôt qu'en points de rupture : les cartes du
  carrousel passent de 124px à 208px de large, et une échelle continue évite de
  recaler chaque texte à trois tailles différentes.
*/

/* Teintes du visuel produit : neutres et désaturées, comme une photo de fiche. */
const PRODUCT_TONES = [
  { from: '#f0e6dd', to: '#d9c7b8' },
  { from: '#e6e8f0', to: '#c3c8da' },
  { from: '#eee6ea', to: '#d6c2ce' },
  { from: '#e7eee9', to: '#c2d5c8' },
] as const;

type StoreScreenProps = {
  /** Nom affiché dans l'en-tête de la boutique. */
  name: string;
  /** Mention portée par la fiche : mode d'encaissement, option activée… */
  note: string;
  /** Prix affiché sur la fiche produit, en FCFA. */
  price: string;
  /** Choisit la teinte du visuel produit, modulo. */
  seed: number;
  className?: string;
};

export const StoreScreen: React.FC<StoreScreenProps> = ({
  name,
  note,
  price,
  seed,
  className,
}) => {
  const tone = PRODUCT_TONES[Math.abs(seed) % PRODUCT_TONES.length];

  return (
    <div className={cn('flex size-full flex-col bg-white', className)}>
      {/* Barre d'état : trois traits suffisent à faire lire « téléphone ». */}
      <div
        aria-hidden
        className="flex items-center justify-between px-[7%] pb-[2%] pt-[3.5%] text-[clamp(4px,3.4cqw,7px)] font-semibold text-ink"
      >
        <span>9:41</span>
        <span className="flex items-center gap-[2px]">
          <span className="h-[0.9em] w-[2px] rounded-full bg-ink/70" />
          <span className="h-[1.2em] w-[2px] rounded-full bg-ink/70" />
          <span className="h-[1.5em] w-[2px] rounded-full bg-ink" />
          <span className="ml-[2px] h-[0.9em] w-[1.6em] rounded-[2px] border border-ink/50" />
        </span>
      </div>

      {/* En-tête de la boutique */}
      <div className="flex items-center gap-[3%] border-b border-hairline px-[7%] py-[3%]">
        <span className="brand-gradient-plain size-[clamp(9px,7cqw,15px)] shrink-0 rounded-full" />
        <span className="min-w-0 flex-1 truncate text-[clamp(5px,4.6cqw,10px)] font-bold leading-none tracking-tight text-ink">
          {name}
        </span>
        <span aria-hidden className="flex flex-col gap-[2px]">
          <span className="h-[1.5px] w-[clamp(6px,4cqw,9px)] rounded-full bg-ink/60" />
          <span className="h-[1.5px] w-[clamp(6px,4cqw,9px)] rounded-full bg-ink/60" />
          <span className="h-[1.5px] w-[clamp(6px,4cqw,9px)] rounded-full bg-ink/60" />
        </span>
      </div>

      {/* Visuel produit : la zone que remplacera la vraie capture. */}
      <div
        className="screen__hero relative mx-[7%] mt-[4%] flex-1 overflow-hidden rounded-[clamp(4px,3cqw,8px)]"
        style={{ background: `linear-gradient(150deg, ${tone.from}, ${tone.to})` }}
      >
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/45 blur-[6px]"
        />
        {/* Pastille de réassurance, comme sur une vraie fiche produit. */}
        <span className="absolute left-[6%] top-[6%] rounded-full bg-white/85 px-[6%] py-[2%] text-[clamp(4px,3.2cqw,7px)] font-semibold leading-none text-ink">
          {note}
        </span>
      </div>

      {/* Titre, prix, bouton d'achat */}
      <div className="px-[7%] pb-[6%] pt-[4%]">
        <span className="block h-[clamp(3px,2cqw,5px)] w-[72%] rounded-full bg-hairline-strong" />
        <span className="mt-[3%] block h-[clamp(3px,2cqw,5px)] w-[46%] rounded-full bg-hairline" />

        <div className="mt-[6%] flex items-baseline gap-[4%]">
          <span className="text-[clamp(6px,5.4cqw,12px)] font-bold leading-none tracking-tight text-ink">
            {price}
          </span>
          <span className="text-[clamp(4px,3.2cqw,7px)] font-medium leading-none text-ink-mute">
            F CFA
          </span>
        </div>

        <span className="brand-gradient mt-[6%] flex h-[clamp(11px,9cqw,20px)] items-center justify-center rounded-full text-[clamp(4px,3.4cqw,8px)] font-bold leading-none text-white">
          Commander
        </span>
      </div>
    </div>
  );
};
