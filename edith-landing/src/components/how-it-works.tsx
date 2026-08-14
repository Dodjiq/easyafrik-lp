import { ArrowRight, Banknote, Check, Link2, ScanLine, ShoppingBag } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';

const CARD =
  'card-soft flex h-[420px] items-center justify-center overflow-hidden p-6 sm:h-[480px]';

const CHIP =
  'inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-[12px] font-medium text-ink shadow-[0_6px_18px_-8px_rgba(0,0,0,0.25)]';

/** Pastille « Étape 01 » posée en haut à droite de chaque carte. */
const StepBadge: React.FC<{ number: string; tint: string }> = ({ number, tint }) => (
  <span className="absolute right-5 top-5 z-10 inline-flex items-center gap-2 rounded-full bg-surface py-1.5 pl-4 pr-1.5 shadow-[0_8px_22px_-10px_rgba(0,0,0,0.3)]">
    <span className="text-small font-medium text-ink">Étape</span>
    <span
      className="grid size-8 place-items-center rounded-full text-[13px] font-bold text-white"
      style={{ background: tint }}
    >
      {number}
    </span>
  </span>
);

const LOOP = { animationDuration: '6s', animationIterationCount: 'infinite' } as const;

/* Étape 1 — le lien se saisit tout seul, puis la validation tombe. */
const PasteIllustration: React.FC = () => (
  <div className="relative w-full max-w-[300px]">
    <div className="rounded-[var(--radius-card)] bg-surface p-5 shadow-[0_24px_50px_-22px_rgba(0,0,0,0.35)]">
      <p className="text-caption text-ink-mute">Lien de la boutique</p>

      <div className="mt-3 flex items-center gap-2 overflow-hidden rounded-full border border-hairline bg-field px-3 py-2.5">
        <Link2 className="size-[18px] shrink-0 text-accent-start" strokeWidth={2} />
        {/* La largeur est animée : le lien paraît se taper caractère par caractère. */}
        <span
          className="h-2 shrink-0 rounded-full bg-ink-mute/45"
          style={{ ...LOOP, animationName: 'url-type', animationTimingFunction: 'steps(18, end)' }}
        />
        <span
          className="h-4 w-px shrink-0 bg-accent-start"
          style={{ animation: 'caret-blink 1s steps(1, end) infinite' }}
        />
      </div>

      <p className="mt-5 text-caption text-ink-mute">Boutique clonée</p>
      <div
        className="mt-2 flex items-center gap-2.5"
        style={{ ...LOOP, animationName: 'row-rise', animationTimingFunction: 'ease-out' }}
      >
        <span className="size-8 shrink-0 rounded-full bg-gradient-to-br from-accent-start to-accent-mid" />
        <span className="h-2.5 w-28 rounded-full bg-hairline" />
      </div>
    </div>

    <span
      className="absolute -right-3 top-1/2 grid size-11 place-items-center rounded-full bg-[#22c55e] text-white shadow-[0_10px_24px_-8px_rgba(34,197,94,0.8)]"
      style={{ ...LOOP, animationName: 'badge-pop', animationTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }}
    >
      <Check className="size-5" strokeWidth={3} />
    </span>
  </div>
);

/*
  Chaque trait relevé tourne sur son propre anneau. Le décalage négatif les
  répartit autour du cercle sans avoir à poser d'angle de départ.
*/
const ANALYSIS_TRAITS = [
  { label: 'Paiement à la livraison', radius: 84, wide: 'sm:[--r:118px]', duration: 26, offset: 0 },
  { label: 'Wave · Orange · MTN', radius: 104, wide: 'sm:[--r:148px]', duration: 26, offset: -6.5 },
  { label: 'Upsell automatique', radius: 80, wide: 'sm:[--r:112px]', duration: 26, offset: -13 },
  { label: 'Livreurs & closeuses', radius: 106, wide: 'sm:[--r:152px]', duration: 26, offset: -19.5 },
] as const;

/* Étape 2 — la boutique rayonne et les briques branchées tournent autour. */
const AnalysisIllustration: React.FC = () => (
  <div className="relative flex size-full items-center justify-center">
    {[0.55, 0.75, 0.95].map((scale) => (
      <span
        key={scale}
        aria-hidden
        className="absolute aspect-square rounded-full border border-accent-start/15"
        style={{ width: `${scale * 100}%` }}
      />
    ))}

    <span
      aria-hidden
      className="absolute size-40 animate-pulse-soft rounded-full bg-accent-start/20 blur-3xl"
    />

    <span className="relative z-10 grid size-24 place-items-center rounded-[var(--radius-card)] bg-surface shadow-[0_20px_44px_-16px_rgba(62,134,198,0.6)]">
      <ScanLine className="size-10 text-accent-start" strokeWidth={1.5} />
    </span>

    {ANALYSIS_TRAITS.map((trait) => (
      <span
        key={trait.label}
        aria-hidden
        className="absolute inset-0"
        style={{
          animation: `orbit ${trait.duration}s linear infinite`,
          animationDelay: `${trait.offset}s`,
        }}
      >
        <span
          className={cn('absolute left-1/2 top-1/2', trait.wide)}
          style={
            {
              '--r': `${trait.radius}px`,
              transform: 'translate(-50%, -50%) translateX(var(--r))',
            } as React.CSSProperties
          }
        >
          {/* Contre-rotation : la pastille reste lisible tout au long du tour. */}
          <span
            className={cn(CHIP, 'whitespace-nowrap')}
            style={{
              animation: `orbit-counter ${trait.duration}s linear infinite`,
              animationDelay: `${trait.offset}s`,
            }}
          >
            {trait.label}
          </span>
        </span>
      </span>
    ))}

    {/* Le texte reste accessible même si l'animation est désactivée. */}
    <span className="sr-only">
      Branché d’office : {ANALYSIS_TRAITS.map((trait) => trait.label).join(', ')}.
    </span>
  </div>
);

const TIMELINE_ROWS = [
  { widths: ['18%', '26%', '14%', '30%'], tone: 'bg-accent-mid' },
  { widths: ['30%', '20%', '34%'], tone: 'bg-accent-start/60' },
  { widths: ['62%', '24%'], tone: 'bg-ink-mute/30' },
] as const;

/* Étape 3 — les commandes tombent, les statuts avancent, l'encaissement sort. */
const RenderIllustration: React.FC = () => (
  <div className="w-full max-w-[300px] space-y-4">
    <div className="space-y-2">
      {['Commande #1249 · Dakar', 'Commande #1250 · Abidjan'].map((order, index) => (
        <div
          key={order}
          className="flex items-center gap-2.5 rounded-xl bg-surface px-3 py-2.5 shadow-[0_8px_20px_-14px_rgba(0,0,0,0.4)]"
          style={{
            ...LOOP,
            animationName: 'file-drop',
            animationTimingFunction: 'cubic-bezier(0.34,1.4,0.64,1)',
            animationDelay: `${index * 0.18}s`,
          }}
        >
          <ShoppingBag className="size-4 shrink-0 text-accent-mid" />
          <span className="text-[12px] text-ink-soft">{order}</span>
        </div>
      ))}
    </div>

    <div className="rounded-[var(--radius-card)] bg-surface p-4 shadow-[0_24px_50px_-22px_rgba(0,0,0,0.35)]">
      {/* La tête de lecture balaie la timeline une fois les blocs posés. */}
      <div className="relative space-y-2">
        {TIMELINE_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1.5">
            {row.widths.map((width, blockIndex) => (
              <span
                key={blockIndex}
                className={cn('h-3.5 origin-left rounded', row.tone)}
                style={{
                  width,
                  ...LOOP,
                  animationName: 'block-grow',
                  animationTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
                  animationDelay: `${(rowIndex * 3 + blockIndex) * 0.06}s`,
                }}
              />
            ))}
          </div>
        ))}

        <span
          aria-hidden
          className="absolute -top-1 bottom-[-4px] w-px bg-accent-mid shadow-[0_0_10px_2px_rgba(236,68,146,0.5)]"
          style={{ ...LOOP, animationName: 'playhead-sweep', animationTimingFunction: 'linear' }}
        />
      </div>

      {/*
        L'encaissement clôt la séquence : c'est le seul moment où un montant
        apparaît, et il tombe après que les statuts ont défilé.
      */}
      <div
        className="relative mt-4 aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-accent-start/80 via-accent-mid/70 to-accent-end/80"
        style={{ ...LOOP, animationName: 'result-pop', animationTimingFunction: 'cubic-bezier(0.34,1.5,0.64,1)' }}
      >
        <span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/25 backdrop-blur-sm">
          <Banknote className="size-5 text-white" strokeWidth={1.8} />
        </span>
        <span className="absolute bottom-2 right-2 rounded-md bg-black/45 px-2 py-0.5 text-[10px] font-medium text-white">
          Encaissé à la livraison
        </span>
      </div>
    </div>
  </div>
);

const STEPS = [
  {
    number: '01',
    tint: 'var(--color-accent-start)',
    title: 'Collez un lien de boutique',
    description:
      'L’IA en recrée la structure, le design et les pages produit en 30 à 60 secondes. Rien à installer.',
    illustration: <PasteIllustration />,
  },
  {
    number: '02',
    tint: 'var(--color-accent-mid)',
    title: 'Tout est déjà branché',
    description:
      'Paiement à la livraison, Wave, Orange Money, MTN, upsell et rôles d’équipe : la boutique encaisse dès le premier jour.',
    illustration: <AnalysisIllustration />,
  },
  {
    number: '03',
    tint: 'var(--color-accent-end)',
    title: 'Vendez, livrez, encaissez',
    description:
      'Les commandes tombent sur Telegram, vos closeuses confirment, vos livreurs encaissent. Tout depuis votre téléphone.',
    illustration: <RenderIllustration />,
  },
] as const;

export const HowItWorks: React.FC = () => (
  <section id="comment-ca-marche" className="px-5 py-[var(--section-y)]">
    <div className="mx-auto w-full max-w-[1180px]">
      <Reveal className="mx-auto max-w-[46rem] text-center">
        <h2 className="text-balance text-[clamp(1.875rem,4vw,3rem)] font-semibold leading-[1.15] tracking-tight text-ink">
          Trois étapes, une boutique qui encaisse
        </h2>
        <p className="mt-[var(--section-title)] text-pretty text-small text-ink-soft md:text-lead">
          Du lien collé à la première commande livrée — sans développeur, sans carte bancaire.
        </p>
      </Reveal>

      <div className="mt-[var(--section-head)] grid gap-6 lg:grid-cols-3">
        {STEPS.map((step, index) => (
          <Reveal key={step.number} delay={index * 0.12}>
            <div className="relative">
              <StepBadge number={step.number} tint={step.tint} />
              <div className={CARD}>{step.illustration}</div>

              <h3 className="mt-6 text-subtitle font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-body text-ink-soft">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Le pas suivant, une fois les trois étapes lues. Entre après les cartes. */}
      <Reveal delay={0.36} className="mt-[var(--section-head)] flex justify-center">
        <a
          href="/signup"
          className="brand-gradient group inline-flex h-[42px] items-center gap-2 rounded-full px-7 text-body font-bold text-white transition-all duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          Démarrer gratuitement
          <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </Reveal>
    </div>
  </section>
);
