'use client';

import { useCallback, useRef, useState } from 'react';

/**
 * Suit la diapositive visible d'une piste à défilement horizontal, et permet
 * d'y naviguer depuis les points de position.
 *
 * Le pas est mesuré entre deux enfants réels plutôt que déduit de la largeur du
 * conteneur : la gouttière est ainsi prise en compte sans avoir à la redéclarer
 * ici, et le calcul reste juste si la largeur des cartes change.
 */
export const useSnapCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const measureStep = (track: HTMLDivElement): number => {
    const [first, second] = Array.from(track.children) as HTMLElement[];
    const step = first && second ? second.offsetLeft - first.offsetLeft : 0;
    return step > 0 ? step : track.clientWidth;
  };

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    setActiveIndex(Math.round(track.scrollLeft / measureStep(track)));
  }, []);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    track.scrollTo({ left: index * measureStep(track), behavior: 'smooth' });
  }, []);

  /** Ramène la piste au début, par exemple quand son contenu change. */
  const reset = useCallback(() => {
    trackRef.current?.scrollTo({ left: 0 });
    setActiveIndex(0);
  }, []);

  return { trackRef, activeIndex, handleScroll, goTo, reset };
};
