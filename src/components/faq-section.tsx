'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

/* Sept questions : les objections réelles d'un vendeur africain qui découvre l'outil. */
const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'carte',
    question: 'Ai-je besoin d’une carte bancaire pour commencer ?',
    answer:
      'Non. La création de votre compte est gratuite et ne demande aucune carte bancaire. Quand vous décidez de vous abonner, vous payez en Mobile Money — Wave, Orange Money, MTN, Moov — ou par carte si vous préférez.',
  },
  {
    id: 'ia',
    question: 'Puis-je concevoir ma boutique avec l’IA ?',
    answer:
      'Oui. Le Studio IA génère le design, les pages produit et les textes de vente à partir d’une simple description de votre activité. Tout reste ensuite modifiable à la main, section par section.',
  },
  {
    id: 'clonage',
    question: 'Puis-je vraiment cloner une autre boutique ?',
    answer:
      'Oui. Vous collez une URL, et EasyAfrik recrée la structure et le design de la boutique dans votre back-office en 30 à 60 secondes. Vous récupérez une base éditable : à vous d’y mettre vos produits, vos prix et votre identité.',
  },
  {
    id: 'pays',
    question: 'Dans quels pays EasyAfrik fonctionne-t-il ?',
    answer:
      'Partout en Afrique, en multi-devises et multi-pays — 54 pays couverts. Les intégrations de paiement et l’accompagnement sont particulièrement poussés en Afrique de l’Ouest et Centrale : Côte d’Ivoire, Sénégal, Togo, Burkina Faso, Bénin, Mali, Cameroun, Guinée…',
  },
  {
    id: 'commission',
    question: 'Y a-t-il une commission sur mes ventes ?',
    answer:
      'Aucune. 0 % de commission sur votre chiffre d’affaires, quel que soit votre plan. Vous payez uniquement votre abonnement mensuel. Les frais éventuels de votre prestataire de paiement restent, eux, à votre charge.',
  },
  {
    id: 'boutiques',
    question: 'Puis-je gérer plusieurs boutiques sur un seul compte ?',
    answer:
      'Oui : 1 boutique en Starter, 3 en Pro et 10 en Premium — chacune avec ses produits, son équipe et ses statistiques, depuis le même compte.',
  },
  {
    id: 'engagement',
    question: 'Puis-je annuler à tout moment ?',
    answer:
      'Oui. Aucun engagement : vous annulez quand vous voulez depuis votre tableau de bord, en un clic. L’offre −50 % s’applique au premier mois, ensuite l’abonnement passe au prix courant.',
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="px-5 py-[var(--section-y)] sm:px-10">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Colonne étroite reprise de la référence : 390px, puis 690px au-delà de 810px. */}
        <div className="mx-auto w-full max-w-[390px] min-[810px]:max-w-[690px]">
          <Reveal>
            <h2 className="mb-10 text-center text-[clamp(1.875rem,4vw,3rem)] font-bold tracking-tight text-ink sm:mb-14">
              Questions fréquentes
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex w-full flex-col gap-3 rounded-[var(--radius-card)] bg-surface p-5 shadow-[0_0_10px_0_rgba(0,0,0,0.04)]">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openId === item.id;

                return (
                  <div
                    key={item.id}
                    className="rounded-[var(--radius-card)] border border-hairline bg-field"
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-${item.id}`}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-[15px] text-left"
                      >
                        <span className="text-[18px] font-medium leading-[26px] text-ink md:text-[20px] md:leading-[28px]">
                          {item.question}
                        </span>
                        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink">
                          <Plus
                            className={cn(
                              'size-4 text-white transition-transform duration-300 ease-in-out',
                              isOpen && 'rotate-45',
                            )}
                          />
                        </span>
                      </button>
                    </h3>

                    {/*
                      `grid-rows` de 0fr à 1fr : la hauteur s'anime sans qu'on ait
                      à mesurer le contenu, contrairement à un max-height deviné.
                    */}
                    <div
                      id={`faq-${item.id}`}
                      className={cn(
                        'grid overflow-hidden transition-all duration-300 ease-in-out',
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                      )}
                    >
                      <div className="min-h-0">
                        <div className="mx-4 h-px bg-hairline" />
                        <p className="whitespace-pre-line px-4 pb-3 pt-3 text-body leading-relaxed text-ink-soft md:text-[18px]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
