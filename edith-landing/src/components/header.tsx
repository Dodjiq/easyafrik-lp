'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { EasyAfrikFace } from '@/components/easyafrik-face';
import { cn } from '@/lib/utils';

/*
  Au défilement, le logo part vers la gauche et le bouton vers la droite,
  le menu restant centré. La courbe dépasse légèrement la cible (le 1.2)
  avant de revenir : c'est ce petit rebond qui donne le ressort.
*/
const SPREAD =
  'transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1.2,0.36,1)] motion-reduce:transition-none';

/* Même largeur utile que le footer, pour que les extrémités tombent au même endroit. */
const CONTENT_WIDTH = 'mx-auto w-full max-w-[1180px]';

type NavLink = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

/*
  Landing en une page : chaque entrée vise une section réelle, dans l'ordre
  où elle apparaît au défilement. « Connexion » a disparu du menu — le bouton
  Commencer mène au même endroit, le doublon n'apportait rien.
*/
const NAV_LINKS: readonly NavLink[] = [
  { label: 'Outils IA', href: '#outils-ia' },
  { label: 'Comment ça marche', href: '#comment-ca-marche' },
  { label: 'Paiements', href: '#paiements' },
  { label: 'Avis', href: '#avis' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'FAQ', href: '#faq' },
];

const PILL = 'rounded-full border border-hairline bg-surface';

const BuyNowButton: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => (
  <a
    href="/login"
    style={style}
    className={cn(
      'brand-gradient-plain group inline-flex h-12 shrink-0 rounded-full p-[2px] lg:h-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
      className,
    )}
  >
    <span className="flex h-full items-center whitespace-nowrap rounded-full bg-surface px-[var(--header-pad)] text-small font-bold lg:text-body tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:bg-white">
      Commencer
    </span>
  </a>
);

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [spread, setSpread] = useState<number>(0);

  const rowRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /*
    Le décalage n'est pas une constante : c'est l'espace libre entre le bord de
    la zone de contenu et le logo, une fois la rangée centrée. En le mesurant,
    le logo et le bouton atterrissent pile sur les bords du footer quelle que
    soit la largeur de fenêtre — et le décalage tombe à zéro dès que la rangée
    remplit la largeur, donc rien ne peut déborder.
    `offsetLeft` est une mesure de mise en page : les transformations en cours
    ne la faussent pas.
  */
  useEffect(() => {
    const measure = () => {
      const row = rowRef.current;
      const mark = markRef.current;
      if (!row || !mark) {
        return;
      }

      const isWideEnough = window.matchMedia('(min-width: 1024px)').matches;
      setSpread(isWideEnough ? Math.max(0, mark.offsetLeft) : 0);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const shift = isScrolled ? spread : 0;

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-5">
      <div
        ref={rowRef}
        className={cn(
          CONTENT_WIDTH,
          'relative flex items-center justify-center gap-[var(--header-gap)]',
        )}
      >
        {/* Marque — rejoint le bord gauche du footer au défilement */}
        <a
          ref={markRef}
          href="/"
          aria-label="EasyAfrik — accueil"
          style={{ transform: `translateX(-${shift}px)` }}
          className={cn(
            PILL,
            SPREAD,
            'grid size-12 shrink-0 place-items-center text-ink hover:border-hairline-strong lg:size-14',
          )}
        >
          <EasyAfrikFace className="size-7 lg:size-8" />
        </a>

        <nav
          className={cn(
            PILL,
            'hidden h-14 items-center gap-[var(--header-link-gap)] px-[var(--header-pad)] lg:flex',
          )}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 whitespace-nowrap text-body font-medium tracking-[-0.01em] text-ink transition-opacity duration-300 hover:opacity-60"
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDown className="size-4 stroke-[2.25] text-ink" aria-hidden />
              )}
            </a>
          ))}
        </nav>

        {/* Sous lg les liens se replient ici ; le bouton ne disparaît jamais */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          className={cn(PILL, 'grid size-12 shrink-0 place-items-center text-ink lg:hidden')}
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* Bouton — rejoint le bord droit du footer au défilement */}
        <BuyNowButton className={SPREAD} style={{ transform: `translateX(${shift}px)` }} />
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav"
          className="mx-auto mt-3 w-full max-w-md rounded-3xl border border-hairline bg-surface p-2 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.25)] lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between rounded-2xl px-5 py-3.5 text-body font-medium text-ink transition-colors hover:bg-canvas"
            >
              {link.label}
              {link.hasDropdown && <ChevronDown className="size-4 text-ink-mute" aria-hidden />}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
