import { cn } from '@/lib/utils';

/*
  Points de position d'un carrousel mobile. Le point actif s'allonge en barre
  plutôt que de changer de couleur : la position reste lisible d'un coup d'œil,
  même sur un fond clair.

  À masquer via `className` dès que la grille reprend la main sur grand écran.
*/
export const CarouselDots: React.FC<{
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  label: string;
  className?: string;
}> = ({ count, activeIndex, onSelect, label, className }) => (
  <div
    role="tablist"
    aria-label={label}
    className={cn('mt-5 flex items-center justify-center gap-2', className)}
  >
    {Array.from({ length: count }, (_, index) => (
      <button
        key={index}
        type="button"
        role="tab"
        aria-selected={index === activeIndex}
        aria-label={`${label} — ${index + 1} sur ${count}`}
        onClick={() => onSelect(index)}
        className={cn(
          'h-1.5 rounded-full transition-all duration-300',
          index === activeIndex ? 'w-6 bg-ink' : 'w-1.5 bg-hairline-strong',
        )}
      />
    ))}
  </div>
);
