import { Banknote, Smartphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ProductUrlForm } from '@/components/youtube-url-form';
import { RatingPill } from '@/components/rating-pill';

/*
  Les deux mentions sous le bouton portent les deux arguments qui font basculer
  un vendeur africain : il encaisse à la livraison, et il pilote depuis son
  téléphone. Rien ici qui ne soit une capacité réelle du produit.
*/
const TRUST_BADGES: ReadonlyArray<{
  icon: LucideIcon;
  title: string;
  detail: string;
}> = [
  { icon: Banknote, title: 'Paiement à la livraison', detail: 'COD natif, pas un bricolage' },
  { icon: Smartphone, title: 'Mobile Money intégré', detail: 'Wave, Orange, MTN, Moov' },
];

/** Pilule à filet dégradé et texte dégradé. */
const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="brand-gradient-plain inline-flex rounded-full p-px">
    <span className="rounded-full bg-canvas px-4 py-1.5">
      <span className="brand-gradient-plain bg-clip-text text-body font-semibold text-transparent">
        {children}
      </span>
    </span>
  </span>
);

export const Hero: React.FC = () => (
  <section className="relative px-4 pb-[var(--section-y)] pt-14 text-center sm:pt-20">
    <Eyebrow>Conçu pour l&apos;Afrique. Pensé pour vous.</Eyebrow>

    {/* Seul titre en `display` de la page : il part de 42px et monte jusqu'à 76px. */}
    <h1 className="mx-auto mt-8 max-w-[17ch] text-display font-black text-ink">
      Vendez en paiement à la livraison. Encaissez en Mobile Money.
    </h1>

    <p className="mx-auto mt-7 max-w-[48ch] text-pretty text-lead text-ink-soft">
      Collez le lien d&apos;une boutique : l&apos;IA la clone en 60 secondes. Vous encaissez en COD
      et Mobile Money, vous pilotez livreurs et closeuses depuis votre téléphone.
      <b className="font-semibold text-ink"> 0 % de commission sur vos ventes.</b>
    </p>

    <ProductUrlForm />

    <p className="mt-4 text-small text-ink-mute">
      Création gratuite, sans carte bancaire — et sans engagement.
    </p>

    {/*
      Sur mobile les deux mentions partagent la ligne (`flex-1`) au lieu de se
      replier l'une sous l'autre. À partir de sm on rend la main au flux
      d'origine : largeur naturelle, retour à la ligne autorisé.
    */}
    <ul className="mx-auto mt-12 flex max-w-2xl items-start justify-center gap-x-4 gap-y-5 sm:flex-wrap sm:items-center sm:gap-x-10">
      {TRUST_BADGES.map((badge) => (
        <li
          key={badge.title}
          className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center sm:flex-none sm:flex-row sm:gap-2.5 sm:text-left"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-[10px] border border-hairline bg-surface text-ink">
            <badge.icon className="size-[18px]" strokeWidth={1.75} />
          </span>
          <span>
            <span className="block text-small font-semibold leading-tight text-ink">
              {badge.title}
            </span>
            {/* Détail masqué sur mobile : deux lignes de plus par mention rendaient la rangée illisible. */}
            <span className="mt-0.5 hidden text-caption leading-tight text-ink-mute sm:block">
              <span aria-hidden className="text-accent-mid">✦</span> {badge.detail}{' '}
              <span aria-hidden className="text-accent-mid">✦</span>
            </span>
          </span>
        </li>
      ))}
    </ul>

    {/* Preuve sociale : la brique la plus légère du bloc, donc la dernière. */}
    <div className="mt-7">
      <RatingPill />
    </div>
  </section>
);
