import { cn } from '@/lib/utils';

/** The mark: two eyes and a small smile — `•‿•`. */
export const EasyAfrikFace: React.FC<React.ComponentProps<'svg'>> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={cn('shrink-0', className)}
    {...props}
  >
    <rect x="7.6" y="12.4" width="3.6" height="5.2" rx="1.8" fill="currentColor" />
    <rect x="20.8" y="12.4" width="3.6" height="5.2" rx="1.8" fill="currentColor" />
    <path
      d="M13.2 15.6c0 1.55 1.25 2.8 2.8 2.8s2.8-1.25 2.8-2.8"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
    />
  </svg>
);
