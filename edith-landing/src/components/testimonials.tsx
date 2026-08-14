'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  /* Portrait dans `public/testimonials/`. */
  photo: string;
};

/*
  Témoignages fournis par EasyAfrik pour cette refonte.

  ⚠️ Avant mise en ligne : s'assurer que chaque personne citée a donné son
  accord écrit, et prévoir la mention indiquant comment les avis sont vérifiés
  — la directive Omnibus l'impose dès qu'on affiche des avis clients.
*/
const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 'badro',
    quote:
      'EasyAfrik a compris ce qui bloquait vraiment le e-commerce en Afrique : le paiement à la livraison, le mobile money, la logistique locale. C’est le premier outil pensé pour NOTRE marché, pas une copie adaptée.',
    name: 'Badro',
    role: 'Expert e-commerce & dropshipping',
    photo: '/testimonials/badro.jpg',
  },
  {
    id: 'djato',
    quote:
      'En quelques minutes, un débutant peut lancer une boutique professionnelle, encaisser en COD et suivre ses commandes depuis son téléphone.',
    name: 'Djato',
    role: 'Mentor e-commerce Afrique de l’Ouest',
    photo: '/testimonials/djato.jpg',
  },
  {
    id: 'awa',
    quote:
      'EasyAfrik a transformé mon business. Je gère tout depuis mon téléphone, même mes livreurs et mes paiements COD.',
    name: 'Awa Diallo',
    role: 'CEO, Boutique Awa',
    photo: '/testimonials/awa.jpg',
  },
];

/* Chiffres de réassurance fournis par EasyAfrik — à tenir à jour. */
const STATS = [
  { value: '+5 000', label: 'Entrepreneurs actifs' },
  { value: '54', label: 'Pays couverts' },
  { value: '0 %', label: 'De commission' },
] as const;

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <figure className="card-soft flex w-[300px] shrink-0 snap-center flex-col p-5 sm:w-[420px] lg:w-[480px] lg:p-6">
    <div className="flex gap-1" aria-label="5 étoiles sur 5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className="size-5 fill-accent-start text-accent-start" aria-hidden />
      ))}
    </div>

    <blockquote className="mt-4 text-body leading-relaxed text-ink">
      {testimonial.quote}
    </blockquote>

    <figcaption className="card mt-auto flex items-center gap-3 p-4">
      {/*
        `alt` vide : le nom et la fonction sont déjà lus juste à côté, répéter
        l'identité dans l'alternative textuelle ferait doublon au lecteur d'écran.
      */}
      <img
        src={testimonial.photo}
        alt=""
        width={40}
        height={40}
        loading="lazy"
        decoding="async"
        className="size-10 shrink-0 rounded-full bg-field object-cover"
      />
      <span className="flex flex-col">
        <span className="text-body font-medium text-ink">{testimonial.name}</span>
        <span className="text-small text-ink-mute">{testimonial.role}</span>
      </span>
    </figcaption>
  </figure>
);

export const Testimonials: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  /* Défilement natif : pas de calcul de position à maintenir, et le tactile marche seul. */
  const scrollByCard = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 360, behavior: 'smooth' });
  };

  return (
    <section id="avis" className="px-5 py-[var(--section-y)]">
      <div className="mx-auto w-full max-w-[1180px]">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-accent-start/30 px-6 py-2 text-body font-medium text-accent-start">
            Avis
          </span>

          <h2 className="mt-6 text-balance text-[clamp(1.875rem,4vw,3rem)] font-medium leading-tight tracking-tight text-ink">
            Ils vendent depuis leur téléphone, <span className="font-bold">et ça se voit</span>
          </h2>

          <p className="mt-[var(--section-title)] text-pretty text-small leading-relaxed text-ink-soft md:text-body">
            Des experts et des vendeurs du terrain, en Côte d’Ivoire, au Sénégal, au Togo et
            ailleurs sur le continent.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-[var(--section-head)]">
          <div
            ref={trackRef}
            className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2"
          >
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/*
            Fondu large et opaque : sur la référence les cartes latérales
            s'effacent presque entièrement, ce qui isole celle du centre.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-canvas via-canvas/85 to-transparent sm:block"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-32 bg-gradient-to-l from-canvas via-canvas/85 to-transparent sm:block"
          />

          {/* Flèches posées dans les marges du conteneur, pas au-delà. */}
          {[
            { direction: -1 as const, label: 'Témoignages précédents', Icon: ChevronLeft, side: 'left-1' },
            { direction: 1 as const, label: 'Témoignages suivants', Icon: ChevronRight, side: 'right-1' },
          ].map(({ direction, label, Icon, side }) => (
            <button
              key={label}
              type="button"
              onClick={() => scrollByCard(direction)}
              aria-label={label}
              className={cn(
                'absolute top-1/2 hidden size-10 -translate-y-1/2 place-items-center rounded-full text-accent-start transition-colors duration-200 hover:text-accent-mid lg:grid',
                side,
              )}
            >
              <Icon className="size-6" />
            </button>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="mt-[var(--section-head)]">
          <dl className="flex items-center justify-center gap-6 md:gap-12">
            {STATS.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-6 md:gap-12">
                {index > 0 && <span aria-hidden className="h-12 w-px bg-hairline md:h-16" />}
                <div className="flex flex-col items-center">
                  <dt className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-none text-ink">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 text-small text-ink-mute md:text-body">{stat.label}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Le pas suivant, une fois la preuve lue. Manquait par rapport à la référence. */}
        <Reveal delay={0.3} className="mt-[var(--section-head)] flex justify-center">
          <a
            href="/signup"
            className="brand-gradient inline-flex h-[42px] items-center rounded-full px-7 text-body font-bold text-white transition-all duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            Lancer ma boutique
          </a>
        </Reveal>
      </div>
    </section>
  );
};
