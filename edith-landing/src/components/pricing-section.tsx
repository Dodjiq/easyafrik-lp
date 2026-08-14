'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { CarouselDots } from '@/components/carousel-dots';
import { useSnapCarousel } from '@/lib/use-snap-carousel';
import { cn } from '@/lib/utils';

type Plan = {
  id: string;
  name: string;
  pitch: string;
  /* Montants mensuels en FCFA. Voir le commentaire de PLANS. */
  monthly: number;
  firstMonth: number;
  features: ReadonlyArray<{ label: string; strong?: string; included: boolean }>;
  isPopular?: boolean;
};

/*
  Grille tarifaire EasyAfrik, en FCFA (XOF).

  `firstMonth` est l'offre de bienvenue : -50 % sur le premier mois seulement.
  Le montant est écrit en dur plutôt que calculé — si vous touchez à `monthly`,
  recalculez-le à la main et vérifiez que la promesse « -50 % » de l'en-tête
  reste exacte.

  Commandes et pages sont bien illimitées sur les trois offres : elles ne
  coûtent que du stockage, pas du calcul. Ce qui est plafonné, ce sont les
  ressources réellement consommatrices — générations du Studio IA et clonages.
*/
const PLANS: readonly Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    pitch: 'Pour lancer votre première boutique et vos premières ventes COD.',
    monthly: 8900,
    firstMonth: 4450,
    features: [
      { label: 'boutique', strong: '1', included: true },
      { label: 'Commandes illimitées', included: true },
      { label: 'Pages produit illimitées', included: true },
      { label: 'membres d’équipe', strong: '3', included: true },
      { label: 'Cloner IA', included: true },
      { label: 'Agent Order (Telegram)', included: true },
      { label: 'Agent Assistante : 10 requêtes', included: true },
      { label: 'Upsell / Cross-sell auto', included: true },
      { label: 'Studio IA', included: false },
      { label: 'Support prioritaire', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    pitch: 'Pour les vendeurs qui scalent avec une équipe et plusieurs offres.',
    monthly: 14900,
    firstMonth: 7450,
    isPopular: true,
    features: [
      { label: 'boutiques', strong: '3', included: true },
      { label: 'Commandes illimitées', included: true },
      { label: 'Pages produit illimitées', included: true },
      { label: 'membres d’équipe', strong: '15', included: true },
      { label: 'Studio IA : 5 pages/mois', included: true },
      { label: 'Cloner IA (jusqu’à 3)', included: true },
      { label: 'Agent Assistante (relance / SAV)', included: true },
      { label: 'Upsell / Cross-sell auto', included: true },
      { label: 'Communauté EASYAFRIK ELITE', included: true },
      { label: 'Support prioritaire', included: true },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    pitch: 'Pour les media buyers et agences qui gèrent plusieurs marques.',
    monthly: 34900,
    firstMonth: 17450,
    features: [
      { label: 'boutiques', strong: '10', included: true },
      { label: 'Commandes illimitées', included: true },
      { label: 'Pages produit illimitées', included: true },
      { label: 'Membres d’équipe illimités', included: true },
      { label: 'Studio IA : 30 pages/mois', included: true },
      { label: 'Cloner IA (jusqu’à 10)', included: true },
      { label: 'Agent Assistante (relance / SAV)', included: true },
      { label: 'Upsell / Cross-sell auto', included: true },
      { label: 'Communauté EASYAFRIK ELITE', included: true },
      { label: 'Support prioritaire', included: true },
    ],
  },
];

/*
  Groupe les milliers avec une espace insécable : « 15 000 » ne peut pas se
  couper en fin de ligne. Formatage manuel et non `Intl.NumberFormat('fr-FR')`,
  dont le séparateur a changé d'espace fine insécable à espace insécable selon
  la version d'ICU — le serveur et le navigateur rendraient alors deux chaînes
  différentes, ce que React signale comme une erreur d'hydratation.
*/
const NON_BREAKING_SPACE = String.fromCharCode(0xa0);

const formatAmount = (amount: number): string =>
  amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, NON_BREAKING_SPACE);

export const PricingSection: React.FC = () => {
  /*
    Le sélecteur bascule entre le prix courant et l'offre de bienvenue, pas
    entre deux périodicités : EasyAfrik ne facture qu'au mois.
  */
  const [isFirstMonth, setIsFirstMonth] = useState<boolean>(true);
  const { trackRef, activeIndex, handleScroll, goTo } = useSnapCarousel();

  return (
    <section id="tarifs" className="px-5 py-[var(--section-y)]">
      <div className="mx-auto w-full max-w-[1180px]">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <span className="brand-gradient-plain inline-flex rounded-full p-px">
            <span className="rounded-full bg-canvas px-4 py-1">
              <span className="brand-gradient-plain bg-clip-text text-caption font-semibold text-transparent">
                Tarifs
              </span>
            </span>
          </span>

          {/* Coupure explicite : une phrase par ligne, comme sur la référence. */}
          <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-medium leading-tight tracking-tight text-ink">
            Un abonnement, tout inclus.
            <br />
            <span className="font-bold">0 % de commission.</span>
          </h2>

          <p className="text-body text-ink-soft">
            Payez en Mobile Money ou par carte. Sans engagement, sans carte bancaire pour
            commencer.
          </p>

          <div className="mt-2 inline-flex items-center rounded-full border border-hairline bg-surface p-1">
            {[
              { id: 'promo', label: '🎁 1er mois', firstMonth: true },
              { id: 'monthly', label: 'Prix courant', firstMonth: false },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setIsFirstMonth(option.firstMonth)}
                aria-pressed={isFirstMonth === option.firstMonth}
                className={cn(
                  'rounded-full px-6 py-2 text-body font-medium transition-colors duration-200',
                  isFirstMonth === option.firstMonth
                    ? 'bg-accent-start text-white'
                    : 'text-ink-soft hover:text-ink',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          <p className="text-small text-ink-mute">
            <span className="font-semibold text-accent-mid">−50 %</span> sur votre premier mois
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-[var(--section-head)]">
          {/* Une offre à la fois sur mobile ; la grille reprend la main à lg. */}
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto lg:grid lg:items-start lg:overflow-visible lg:grid-cols-3"
          >
            {PLANS.map((plan) => {
              const price = isFirstMonth ? plan.firstMonth : plan.monthly;

              return (
                <div
                  key={plan.id}
                  className={cn(
                    'relative w-full shrink-0 snap-center rounded-[var(--radius-card)] lg:w-auto lg:snap-align-none',
                    /* L'offre mise en avant porte le filet dégradé, pas une couleur pleine. */
                    plan.isPopular && 'brand-gradient-plain p-px lg:-mt-4',
                  )}
                >
                  <div
                    className={cn(
                      'flex h-full flex-col rounded-[var(--radius-card)] bg-surface p-7',
                      !plan.isPopular && 'border border-hairline',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-subtitle font-bold text-ink">{plan.name}</h3>
                      {plan.isPopular && (
                        <span className="brand-gradient shrink-0 rounded-full px-3 py-1 text-caption font-bold text-white">
                          Populaire
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-body leading-relaxed text-ink-soft">{plan.pitch}</p>

                    {/*
                      Corps réduit par rapport aux anciens prix en euros :
                      « 45 500 FCFA » est trois fois plus large que « 99 € » et
                      débordait de la carte à 52px. La devise passe en second
                      plan pour garder le montant lisible d'un coup d'œil.
                    */}
                    <p className="mt-7 flex flex-wrap items-baseline gap-x-1.5">
                      <span className="text-[clamp(2rem,4.5vw,2.75rem)] font-bold leading-none tracking-tight text-ink">
                        {formatAmount(price)}
                      </span>
                      <span className="text-body font-bold text-ink">F CFA</span>
                      <span className="text-body text-ink-mute">/ mois</span>
                    </p>

                    {/*
                      Le prix courant reste visible pendant que la promo est
                      affichée : le lecteur voit ce qu'il paiera au 2e mois,
                      sans avoir à basculer le sélecteur.
                    */}
                    {isFirstMonth && (
                      <p className="mt-2 text-small text-ink-mute">
                        puis {formatAmount(plan.monthly)} F CFA / mois
                      </p>
                    )}

                    <ul className="mt-7 flex-1 space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature.label}
                          className={cn(
                            'flex items-start gap-2.5 text-body',
                            feature.included ? 'text-ink-soft' : 'text-ink-mute line-through',
                          )}
                        >
                          {feature.included ? (
                            <Check
                              className="mt-[3px] size-4 shrink-0 text-accent-start"
                              strokeWidth={3}
                            />
                          ) : (
                            <X className="mt-[3px] size-4 shrink-0 text-ink-mute" strokeWidth={3} />
                          )}
                          <span>
                            {feature.strong && (
                              <span className="font-bold text-ink">{feature.strong} </span>
                            )}
                            {feature.label}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="/signup"
                      className={cn(
                        'mt-8 inline-flex h-[42px] w-full items-center justify-center rounded-full text-body font-bold transition-all duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
                        plan.isPopular
                          ? 'brand-gradient text-white'
                          : 'border border-hairline bg-field text-ink',
                      )}
                    >
                      Choisir {plan.name}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <CarouselDots
            count={PLANS.length}
            activeIndex={activeIndex}
            onSelect={goTo}
            label="Offre"
            className="lg:hidden"
          />
        </Reveal>

        <Reveal delay={0.2} className="mt-8 text-center">
          <p className="text-small text-ink-mute">
            L&apos;offre −50 % s&apos;applique au premier mois seulement ; l&apos;abonnement passe
            ensuite au prix courant. Paiement par Wave, Orange Money, MTN, Moov ou carte
            bancaire. Les frais éventuels de votre prestataire de paiement restent à votre charge.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
