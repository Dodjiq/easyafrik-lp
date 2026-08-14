import { ArrowRight, Rocket } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { CONTACT_EMAIL } from '@/content/contact';

export const FinalCta: React.FC = () => (
  <section className="relative overflow-hidden px-5 py-[var(--section-y)]">
    <div className="mx-auto w-full max-w-[900px] text-center">
      <Reveal>
        <span className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface px-5 py-2">
          <Rocket className="size-4 text-accent-start" strokeWidth={2} />
          <span className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Votre boutique peut être en ligne aujourd&apos;hui
          </span>
        </span>

        {/*
          Le <br /> impose deux lignes. Sous sm, la taille de base (2rem) faisait
          déborder la première sur deux lignes de plus — soit trois au total. La
          borne mobile est donc calée sur la largeur d'écran, pour que la ligne la
          plus longue tienne d'un bloc. Au-delà de sm, la taille d'origine reprend.
        */}
        <h2 className="mt-8 text-[clamp(1.2rem,5.4vw,2rem)] font-bold leading-[1.15] tracking-tight text-ink sm:text-[clamp(2rem,4.6vw,3.5rem)] sm:leading-[1.1]">
          Prêt à vendre en COD et
          <br />
          <span className="bg-gradient-to-r from-accent-start to-accent-mid bg-clip-text text-transparent">
            à être payé facilement
          </span>{' '}
          ?
        </h2>

        {/* Le halo est un calque flouté derrière le bouton, pas une ombre :
            il déborde largement et donne la lueur de la référence. */}
        <div className="relative mt-10 inline-flex justify-center">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 scale-150 rounded-full bg-gradient-to-r from-accent-start to-accent-mid opacity-40 blur-2xl"
          />
          <a
            href="/signup"
            className="brand-gradient group inline-flex h-[42px] items-center gap-2 rounded-full px-7 text-body font-bold text-white transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            Démarrer gratuitement
            <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

        <p className="mt-8">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-body text-ink-mute transition-colors duration-200 hover:text-ink"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </Reveal>
    </div>
  </section>
);
