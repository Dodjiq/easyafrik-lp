import { defineCloudflareConfig } from '@opennextjs/cloudflare';

/*
  Configuration de l'adaptateur OpenNext pour Cloudflare Workers.

  Volontairement nue. `defineCloudflareConfig()` sans argument n'installe aucun
  cache incrémental : pas de bucket R2, pas de file d'attente, pas de liaison
  du Worker vers lui-même.

  C'est ce qu'il faut ici. La landing compte quatre routes, dont trois
  pré-rendues au build et une rendue à la demande (/signup, qui lit un
  paramètre d'URL). Rien à revalider, donc rien à mettre en cache côté serveur
  — les assets statiques sont déjà servis par le binding ASSETS.

  Ce fichier existe surtout pour être versionné : sans lui, la CI Cloudflare
  lançait `@opennextjs/cloudflare migrate` à chaque build et régénérait une
  configuration différente, avec un cache R2 et une auto-référence qui
  pointaient vers un nom de Worker erroné.
*/
export default {
  ...defineCloudflareConfig(),

  /*
    Sans cette ligne, `opennextjs-cloudflare build` lance `npm run build` par
    défaut pour construire l'app Next. Or `npm run build` pointe justement sur
    `opennextjs-cloudflare build`, pour que la CI Cloudflare produise le Worker
    sans réglage particulier — la commande s'appellerait donc elle-même en
    boucle. On la renvoie explicitement vers le build Next.
  */
  buildCommand: 'npm run build:next',
};
