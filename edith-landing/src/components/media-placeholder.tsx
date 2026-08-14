import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
  Vignette produit en attente des vrais visuels de boutique.

  Trois teintes neutres seulement, très désaturées : une vignette est censée
  ressembler à une image filmée, pas à un aplat décoratif. Les dégradés
  saturés sont réservés aux éléments de marque — boutons, accents — pour
  qu'ils gardent leur poids.
*/
const TONES = [
  { base: '#33333d', mid: '#1e1e26', deep: '#131318', glow: 'rgba(62, 134, 198, 0.22)' },
  { base: '#3a3540', mid: '#241f28', deep: '#16131a', glow: 'rgba(236, 68, 146, 0.18)' },
  { base: '#3a3a3c', mid: '#232325', deep: '#141416', glow: 'rgba(240, 84, 39, 0.16)' },
] as const;

type MediaPlaceholderProps = {
  /** Index libre : la teinte est choisie modulo, aucune couleur à retenir. */
  seed?: number;
  className?: string;
  showPlay?: boolean;
  children?: React.ReactNode;
};

export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  seed = 0,
  className,
  showPlay = true,
  children,
}) => {
  const tone = TONES[Math.abs(seed) % TONES.length];

  return (
    <div
      className={cn('relative size-full overflow-hidden', className)}
      style={{
        background: `linear-gradient(155deg, ${tone.base} 0%, ${tone.mid} 55%, ${tone.deep} 100%)`,
      }}
    >
      {/* Halo de sujet : suggère un plan filmé sans partir dans la couleur */}
      <span
        aria-hidden
        className="absolute left-1/2 top-[38%] size-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: tone.glow }}
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}
      />

      {showPlay && (
        <span className="absolute left-1/2 top-[38%] grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/30 backdrop-blur-sm">
          <Play className="size-3.5 translate-x-px fill-white text-white" />
        </span>
      )}

      {children}
    </div>
  );
};

/** Marqueurs de coupe : la signature visuelle du rythme relevé par EasyAfrik. */
export const CutMarkers: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('flex h-[3px] gap-[2px]', className)} aria-hidden>
    {[14, 8, 19, 11, 7, 16, 10].map((flex, index) => (
      <span
        key={index}
        className={cn('rounded-full', index % 3 === 0 ? 'bg-white' : 'bg-white/40')}
        style={{ flex }}
      />
    ))}
  </div>
);
