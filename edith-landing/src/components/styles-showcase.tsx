import { StoreScreen } from '@/components/store-screen';
import { Reveal } from '@/components/reveal';

type StyleCard = {
  id: string;
  label: string;
  metric: string;
  /* Prix affiché sur la fiche produit de la capture. */
  price: string;
};

/*
  Douze niches pour douze positions : le cylindre fait 360° par pas de 30°,
  donc il en faut exactement douze pour le fermer sans trou.

  La seconde ligne décrit ce qui est *configuré* dans la boutique, jamais un
  résultat commercial : annoncer un chiffre d'affaires ou un taux de conversion
  qu'on ne peut pas justifier serait une allégation trompeuse.
*/
const STYLE_CARDS: readonly StyleCard[] = [
  { id: 'mode', label: 'Mode femme', metric: 'Paiement à la livraison', price: '24 900' },
  { id: 'montres', label: 'Montres & accessoires', metric: 'Upsell activé', price: '34 900' },
  { id: 'cosmetiques', label: 'Cosmétiques', metric: 'Relance auto', price: '19 900' },
  { id: 'electronique', label: 'Électronique', metric: 'Suivi livreur', price: '45 000' },
  { id: 'maison', label: 'Maison & déco', metric: 'Cross-sell', price: '38 500' },
  { id: 'sport', label: 'Sport & fitness', metric: 'Pages illimitées', price: '15 000' },
  { id: 'puericulture', label: 'Puériculture', metric: 'Orange Money', price: '12 500' },
  { id: 'parfums', label: 'Parfums', metric: 'Closeuse assignée', price: '29 000' },
  { id: 'chaussures', label: 'Chaussures', metric: 'Zones de livraison', price: '22 000' },
  { id: 'bienetre', label: 'Santé & bien-être', metric: 'SAV automatisé', price: '17 500' },
  { id: 'telephonie', label: 'Téléphonie', metric: 'MTN MoMo', price: '52 000' },
  { id: 'bijoux', label: 'Bijoux', metric: 'Agent Telegram', price: '9 500' },
];

const STEP_DEGREES = 360 / STYLE_CARDS.length;

export const StylesShowcase: React.FC = () => (
  <section
    id="boutiques"
    className="relative z-10 flex w-full flex-col items-center overflow-hidden py-[var(--section-y)]"
  >
    <Reveal className="relative z-30 flex flex-col items-center justify-center px-6 text-center">
      {/*
        `text-balance` répartit les deux lignes à parts égales : sans lui,
        « meilleurs » se retrouve seul en bas.
      */}
      <h2 className="max-w-[900px] text-balance text-[clamp(1.875rem,4vw,3rem)] font-semibold leading-[1.15] tracking-tight text-ink">
        Des boutiques qui{' '}
        <span className="bg-gradient-to-r from-accent-start to-accent-mid bg-clip-text text-transparent">
          vendent
        </span>
        , dans toutes les niches
      </h2>
      {/* Ligne de lecture volontairement plus étroite que le titre. */}
      <p className="mt-[var(--section-title)] max-w-[48ch] text-pretty text-small font-normal tracking-tight text-ink-soft md:text-lead">
        Mode, cosmétiques, électronique, puériculture… Chaque boutique arrive avec le COD, le
        Mobile Money et l’upsell déjà branchés.
      </p>
    </Reveal>

    <div className="relative flex w-full max-w-[100vw] justify-center overflow-hidden pb-[var(--section-head)] pt-[var(--section-head)]">
      {/*
        `--tz` est le rayon du cylindre : plus l'écran est large, plus il
        s'ouvre, et plus on voit de cartes à la fois. La perspective suit.
      */}
      {/*
        Les cartes sont au rapport d'un écran de téléphone (≈ 9:19). Le rayon
        `--tz` est inchangé : des cartes plus étroites se chevauchent moins, on
        en voit donc davantage à la fois, ce qui sert la démonstration.
      */}
      {/*
        Le conteneur est nettement plus haut que les cartes (~45px de marge
        de chaque côté) : une carte inclinée par le `rotateY` se projette plus
        haut que sa hauteur nominale, et sans cette réserve l'`overflow-hidden`
        du parent lui coupait le bouton « Commander » et la barre d'état.
      */}
      <div className="relative flex h-[330px] w-full max-w-7xl items-center justify-center [--tz:280px] [perspective:1200px] sm:h-[420px] sm:[--tz:420px] sm:[perspective:1600px] lg:h-[520px] lg:[--tz:580px] lg:[perspective:2400px]">
        <div className="animate-spin-carousel relative h-[236px] w-[116px] [transform-style:preserve-3d] sm:h-[312px] sm:w-[152px] lg:h-[392px] lg:w-[192px]">
          {STYLE_CARDS.map((card, index) => (
            <div
              key={card.id}
              /* `@container` : les tailles en `cqw` de StoreScreen se calent sur la carte. */
              className="card @container absolute inset-0 overflow-hidden shadow-xl"
              style={{ transform: `rotateY(${index * STEP_DEGREES}deg) translateZ(var(--tz))` }}
            >
              <StoreScreen
                seed={index}
                name={card.label}
                note={card.metric}
                price={card.price}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Masques latéraux : les cartes s'effacent au lieu d'être coupées net */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-canvas to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-canvas to-transparent"
      />
    </div>
  </section>
);
