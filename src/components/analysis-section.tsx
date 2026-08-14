import { Percent } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { EasyAfrikFace } from '@/components/easyafrik-face';
import { cn } from '@/lib/utils';

const CARD = 'card flex flex-col gap-2 p-5';

/* Le clonage, découpé en blocs : ce que l'IA reconstitue d'une boutique. */
const ClonerVisual: React.FC = () => (
  <div className="mt-4 flex h-2 gap-[3px]" aria-hidden>
    {[16, 9, 22, 12, 7, 18, 11, 14].map((flex, index) => (
      <span
        key={index}
        className={cn('rounded-full', index % 3 === 0 ? 'bg-accent-mid' : 'bg-hairline-strong')}
        style={{ flex }}
      />
    ))}
  </div>
);

/* Une phrase en entrée, une boutique complète en sortie. */
const StudioVisual: React.FC = () => (
  <div className="mt-4" aria-hidden>
    <div className="flex h-3 overflow-hidden rounded-full bg-hairline">
      <span className="w-[22%] bg-gradient-to-r from-accent-start to-accent-mid" />
    </div>
    <div className="mt-2 flex justify-between text-caption text-ink-mute">
      <span>1 phrase</span>
      <span>boutique complète</span>
    </div>
  </div>
);

/* Les statuts réels d'une commande COD, le décisif mis en avant. */
const StatusVisual: React.FC = () => (
  <div className="mt-4 flex flex-wrap gap-1.5" aria-hidden>
    {['CONFIRMÉ', 'EN ROUTE', 'LIVRÉ', 'RETOURNÉ'].map((word, index) => (
      <span
        key={word}
        className={cn(
          'rounded-md px-2 py-1 text-caption font-bold',
          index === 2 ? 'bg-ink text-white' : 'bg-hairline text-ink-soft',
        )}
      >
        {word}
      </span>
    ))}
  </div>
);

const CommissionVisual: React.FC = () => (
  <div className="mt-4" aria-hidden>
    <span className="brand-gradient-plain inline-flex rounded-full p-px">
      <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5">
        <Percent className="size-3.5 text-accent-start" strokeWidth={2.5} />
        <span className="text-caption font-semibold text-ink">0 % de commission</span>
      </span>
    </span>
  </div>
);

const CARDS = [
  {
    id: 'cloner',
    title: 'Clonez une boutique en 1 clic',
    text: 'Collez le lien d’une boutique existante : structure, design et pages produit sont recréés en 30 à 60 secondes.',
    visual: <ClonerVisual />,
  },
  {
    id: 'studio',
    title: 'Ou décrivez-la en une phrase',
    text: 'Le Studio IA génère le design, les pages produit et les textes de vente à partir de votre description.',
    visual: <StudioVisual />,
  },
  {
    id: 'statuts',
    title: 'Les vrais statuts du COD',
    text: 'Confirmé, en route, livré, rejeté, retourné. Vous suivez ce qui arrive au colis, pas seulement le nombre de commandes.',
    visual: <StatusVisual />,
  },
  {
    id: 'commission',
    title: '0 % de commission sur vos ventes',
    text: 'Vous payez un abonnement fixe. Que vous fassiez 500 000 F ou 50 millions ce mois-ci, EasyAfrik ne prend rien de plus.',
    visual: <CommissionVisual />,
  },
] as const;

const AnalysisCard: React.FC<{ card: (typeof CARDS)[number] }> = ({ card }) => (
  <article className={CARD}>
    <h3 className="text-[20px] font-medium leading-[28px] text-ink">{card.title}</h3>
    <p className="text-body leading-relaxed text-ink-soft">{card.text}</p>
    {card.visual}
  </article>
);

export const AnalysisSection: React.FC = () => (
  <section id="outils-ia" className="px-5 py-[var(--section-y)] sm:px-10">
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center">
      <Reveal className="flex flex-col items-center gap-5 text-center">
        <span className="brand-gradient-plain inline-flex rounded-full p-px">
          <span className="rounded-full bg-canvas px-4 py-1">
            <span className="brand-gradient-plain bg-clip-text text-caption font-semibold text-transparent">
              Les outils IA d’EasyAfrik
            </span>
          </span>
        </span>

        <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-bold tracking-tight text-ink">
          Une boutique en ligne avant la fin de votre café
        </h2>

        <p className="max-w-[650px] text-pretty text-lead leading-relaxed text-ink-soft">
          Clonez une boutique gagnante, ou décrivez la vôtre en une phrase. EasyAfrik s’occupe du
          design, des pages produit et des textes — vous vous occupez de vendre.
        </p>
      </Reveal>

      {/*
        Trois colonnes au-delà de 1200px, la marque au centre — la grille de la
        référence. En dessous, les cartes s'empilent et la marque disparaît :
        elle n'apporte rien sur une colonne unique.
      */}
      <Reveal delay={0.1} className="mt-[var(--section-head)] w-full">
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-[1fr_minmax(280px,420px)_1fr] xl:items-center">
          <div className="flex flex-col gap-2.5">
            <AnalysisCard card={CARDS[0]} />
            <AnalysisCard card={CARDS[1]} />
          </div>

          <div className="hidden justify-center xl:flex">
            <span className="relative grid size-56 place-items-center">
              <span
                aria-hidden
                className="absolute inset-0 animate-pulse-soft rounded-full bg-accent-start/15 blur-3xl"
              />
              <EasyAfrikFace className="relative size-32 text-ink" />
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            <AnalysisCard card={CARDS[2]} />
            <AnalysisCard card={CARDS[3]} />
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
