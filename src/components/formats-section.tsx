import { Banknote, Smartphone, Truck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';

/*
  Positions relevées sur la référence : pourcentages + recentrage, plutôt
  qu'un mélange de left/top/right/bottom. Chaque pastille est ainsi ancrée
  par son centre, ce qui rend la rotation prévisible.
  Les couleurs viennent des arrêts du dégradé de marque, aucune teinte inventée.
*/
const FORMATS = [
  { label: 'Wave', color: 'text-accent-start', left: '20%', top: '20%', rotate: 9 },
  { label: 'Orange Money', color: 'text-accent-2', left: '82%', top: '24%', rotate: 9 },
  { label: 'MTN MoMo', color: 'text-accent-mid', left: '16%', top: '78%', rotate: -12 },
  { label: 'Moov Money', color: 'text-accent-4', left: '47%', top: '86%', rotate: 11 },
  { label: 'Visa · Mastercard', color: 'text-accent-end', left: '84%', top: '74%', rotate: -15 },
] as const;

const ICON_CHIPS: ReadonlyArray<{
  Icon: LucideIcon;
  tint: string;
  left: string;
  top: string;
}> = [
  { Icon: Banknote, tint: 'text-accent-4', left: '44%', top: '9%' },
  { Icon: Smartphone, tint: 'text-accent-2', left: '9%', top: '48%' },
  { Icon: Truck, tint: 'text-accent-mid', left: '68%', top: '58%' },
];

/* Ombre très douce de la référence : 12px de flou, 6 % d'opacité. */
const FLOAT_SHADOW = 'shadow-[0_2px_12px_rgba(0,0,0,0.06)]';

export const FormatsSection: React.FC = () => (
  <section id="paiements" className="overflow-hidden px-0 py-10 min-[810px]:px-5">
    <Reveal className="mx-auto w-full max-w-[1180px]">
      <div className="relative flex flex-col items-center gap-8 min-[810px]:block min-[810px]:min-h-[520px] min-[810px]:py-20">
        <h2 className="relative z-10 mx-auto max-w-[80%] text-balance text-center text-[36px] font-black leading-[44px] tracking-[-0.4px] text-ink min-[810px]:max-w-[90%] min-[810px]:text-[48px] min-[810px]:leading-[56px] lg:max-w-[1000px] lg:text-[68px] lg:leading-[78px] min-[810px]:absolute min-[810px]:left-1/2 min-[810px]:top-1/2 min-[810px]:-translate-x-1/2 min-[810px]:-translate-y-1/2">
        Soyez payé comme vos clients paient
        </h2>

        {/* En dessous de 810px les pastilles restent dans le flux, comme chez eux. */}
        <div className="flex flex-wrap items-center justify-center gap-3 min-[810px]:block">
          {FORMATS.map((format) => (
            <span
              key={format.label}
              className={cn(
                'z-[1] inline-flex items-center justify-center whitespace-nowrap rounded-full bg-surface px-7 py-2 text-[22px] leading-none min-[810px]:absolute lg:px-10 lg:py-2.5 lg:text-[32px] xl:text-[28px]',
                FLOAT_SHADOW,
                format.color,
              )}
              style={{
                left: format.left,
                top: format.top,
                transform: `translate(-50%, -50%) rotate(${format.rotate}deg)`,
              }}
            >
              {format.label}
            </span>
          ))}

          {ICON_CHIPS.map(({ Icon, tint, left, top }, index) => (
            <span
              key={index}
              aria-hidden
              className={cn(
                'z-[1] grid size-14 place-items-center rounded-full bg-surface min-[810px]:absolute',
                FLOAT_SHADOW,
                tint,
              )}
              style={{ left, top, transform: 'translate(-50%, -50%)' }}
            >
              <Icon className="size-6" strokeWidth={1.75} />
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  </section>
);
