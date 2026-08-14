'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: React.ReactNode;
  /** Décalage en secondes, pour faire entrer une série l'un après l'autre. */
  delay?: number;
  className?: string;
};

/*
  Apparition au défilement, sans bibliothèque d'animation : un
  IntersectionObserver bascule une classe, le reste est du CSS.
  L'observateur se débranche après le premier passage — l'élément
  n'est pas censé disparaître quand on remonte.
*/
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={cn('reveal', isVisible && 'is-visible', className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};
