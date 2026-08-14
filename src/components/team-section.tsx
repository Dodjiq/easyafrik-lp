import { Reveal } from '@/components/reveal';

/*
  ⚠️ IDENTITÉ À COMPLÉTER — le nom et la fonction sont des emplacements.
  Une page « équipe » est lue comme une information vérifiable sur une personne
  réelle : ne rien inventer ici.

  PHOTO — déposez le portrait dans `public/team/ceo.jpg` (cadrage portrait,
  le sujet centré en haut). Il est chargé en `background-image` plutôt qu'en
  `next/image` pour une raison précise : tant que le fichier n'existe pas, la
  carte affiche simplement son fond neutre, là où une balise <img> laisserait
  une icône d'image cassée. Une fois le fichier en place, vous pouvez basculer
  sur `next/image` pour l'optimisation :

    import Image from 'next/image';
    <Image src="/team/ceo.jpg" alt="" fill className="object-cover" sizes="420px" />
*/
const CEO = {
  name: 'Badro Mous',
  role: 'Expert e-commerce & dropshipping',
  photo: '/team/ceo.jpg',
} as const;

const CeoCard: React.FC = () => (
  <article className="card flex h-full flex-col overflow-hidden">
    {/*
      Le portrait occupe toute la hauteur libre de la colonne : c'est la seule
      photo de la page, elle doit tenir le regard face au bloc de texte.
    */}
    <div
      className="min-h-[320px] flex-1 bg-[#e4e4e8] bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: `url(${CEO.photo})` }}
      role="img"
      aria-label={`${CEO.name}, ${CEO.role}`}
    />

    <div className="px-7 py-6">
      <p className="text-lead font-medium text-ink">{CEO.name}</p>
      <p className="mt-1 text-body text-ink-soft">{CEO.role}</p>
    </div>
  </article>
);

export const TeamSection: React.FC = () => (
  <section id="equipe" className="px-5 py-[var(--section-y)]">
    <div className="mx-auto w-full max-w-[1180px]">
      {/* Pas d'`items-start` : les deux colonnes s'étirent sur la même hauteur. */}
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <Reveal className="h-full">
          <CeoCard />
        </Reveal>

        <Reveal delay={0.12} className="h-full">
          {/* `flex-col` + `mt-auto` sur la citation : elle occupe le bas laissé libre
              par l'étirement de la colonne, au lieu d'un vide sous le texte. */}
          <div className="card flex h-full flex-col p-8 lg:p-10">
            <h2 className="text-subtitle font-bold text-ink">
              Salut ! L’équipe derrière EasyAfrik.
            </h2>

            <div className="mt-7 space-y-5 text-body leading-relaxed text-ink-soft">
              <p>
                EasyAfrik est parti d’un constat simple : les plateformes mondiales n’ont jamais
                été faites pour notre marché.
              </p>
              <p>
                Elles partent du principe que votre client paie par carte, en ligne, tout de suite.
                Ici, la vente se joue au téléphone, se confirme par un appel, et se paie au livreur
                à la porte.
              </p>
              <p>
                Résultat : le vendeur africain bricole. Un fichier Excel pour les commandes, un
                cahier pour les livreurs, WhatsApp pour le SAV, et une commission prélevée sur
                chaque vente par-dessus.
              </p>
              <p>
                On a donc construit la plateforme qui part de cette réalité : le paiement à la
                livraison comme flux natif, le Mobile Money branché sans développeur, les livreurs
                et les closeuses dans l’outil.
              </p>
              <p>
                Ce n’est pas votre métier qu’on remplace. Vous choisissez vos produits, vos prix et
                vos zones ; on s’occupe de la mécanique qui vous fait perdre vos soirées.
              </p>
            </div>

            <blockquote className="mt-auto border-l-2 border-accent-mid pl-6 pt-8">
              <p className="text-lead font-medium leading-snug text-ink">
                « Conçu pour l’Afrique. Pensé pour vous. »
              </p>
              <footer className="mt-3 text-small text-ink-mute">— L’équipe EasyAfrik</footer>
            </blockquote>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
