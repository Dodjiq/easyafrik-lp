/*
  Pilule de réassurance du hero.

  Elle affichait auparavant une note moyenne et un nombre d'avis inventés, ce
  qui n'était pas publiable : synthétiser une note de 4,9/5 sans avis réels est
  une pratique commerciale trompeuse au sens de la directive Omnibus, qui
  impose en plus d'indiquer comment les avis sont vérifiés.

  Le nombre d'entrepreneurs, lui, est une donnée factuelle fournie par
  EasyAfrik : il se vérifie en interne et n'entre pas dans le régime des avis.
  Le garder à jour reste nécessaire.

  Les portraits viennent de `public/community/` (01 à 05), repris des visuels
  du site EasyAfrik. ⚠️ Vérifiez que la licence de ces photos couvre bien cet
  usage : montrer des visages sur une page qui affirme « +5 000 entrepreneurs »
  laisse entendre que ce sont des clients.
*/

const COMMUNITY_COUNT = '+5 000' as const;

/* Cinq portraits : au-delà, la pilule dépasse la largeur du hero sur mobile. */
const AVATARS = ['01', '02', '03', '04', '05'] as const;

export const RatingPill: React.FC = () => (
  <div className="inline-flex items-center gap-3 rounded-full border border-hairline bg-surface py-2 pl-2 pr-5">
    <ul aria-hidden className="flex -space-x-2.5">
      {AVATARS.map((id) => (
        <li key={id}>
          {/*
            `alt` vide et `aria-hidden` sur la liste : ces visages sont
            décoratifs, l'information est portée par le texte à côté. Les
            annoncer un par un au lecteur d'écran n'ajouterait rien.
          */}
          <img
            src={`/community/${id}.jpg`}
            alt=""
            width={36}
            height={36}
            loading="lazy"
            decoding="async"
            className="block size-9 rounded-full bg-field object-cover ring-2 ring-surface"
          />
        </li>
      ))}
    </ul>

    <p className="text-left text-small leading-tight text-ink-soft">
      Rejoint par <span className="font-bold text-ink">{COMMUNITY_COUNT} entrepreneurs</span>
      <br />à travers l&apos;Afrique
    </p>
  </div>
);
