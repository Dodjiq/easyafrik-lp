import { cn } from '@/lib/utils';

/*
  lucide a retiré ses icônes de marque en v1, donc elles vivent ici.
  Tracées à la main, assez neutres pour rester lisibles en 18 px.
*/

type GlyphProps = React.ComponentProps<'svg'>;

/**
 * Le triangle est détouré dans le rectangle, donc sa couleur dépend du fond
 * sur lequel on pose le glyphe — d'où `knockoutClassName`.
 */
export const YoutubeGlyph: React.FC<GlyphProps & { knockoutClassName?: string }> = ({
  className,
  knockoutClassName = 'fill-ink',
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={cn('shrink-0', className)}
    {...props}
  >
    <rect x="2" y="5.2" width="20" height="13.6" rx="4.2" fill="currentColor" />
    <path d="M10.3 9.1 15.5 12l-5.2 2.9V9.1Z" className={knockoutClassName} />
  </svg>
);

export const InstagramGlyph: React.FC<GlyphProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={cn('shrink-0', className)}
    {...props}
  >
    <rect
      x="3.2"
      y="3.2"
      width="17.6"
      height="17.6"
      rx="5.2"
      stroke="currentColor"
      strokeWidth="1.9"
    />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.9" />
    <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" />
  </svg>
);

export const TiktokGlyph: React.FC<GlyphProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={cn('shrink-0', className)}
    {...props}
  >
    <path
      d="M13.4 3v11.4a2.9 2.9 0 1 1-2.35-2.85"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.4 3.4c.35 2.4 2.1 4.05 4.5 4.3"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
