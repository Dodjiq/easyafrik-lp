import { EasyAfrikFace } from '@/components/easyafrik-face';
import { InstagramGlyph, TiktokGlyph, YoutubeGlyph } from '@/components/social-icons';
import { CONTACT_EMAIL } from '@/content/contact';
import { cn } from '@/lib/utils';

const SOCIAL_LINKS = [
  { label: 'YouTube', href: 'https://www.youtube.com/@EASYAFRIK', Glyph: YoutubeGlyph },
  { label: 'Instagram', href: 'https://www.instagram.com/easyafrik.app/', Glyph: InstagramGlyph },
  { label: 'TikTok', href: 'https://www.tiktok.com/@easyafrik_app', Glyph: TiktokGlyph },
] as const;

const FOOTER_COLUMNS = [
  {
    title: 'Légal',
    links: [
      { label: 'Politique de remboursement', href: '/politiques/remboursement' },
      { label: 'Confidentialité', href: '/politiques/confidentialite' },
      { label: 'Conditions d’utilisation', href: '/politiques/conditions-utilisation' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Connexion', href: '/login' },
      { label: 'Nous écrire', href: `mailto:${CONTACT_EMAIL}` },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'Comment ça marche', href: '#comment-ca-marche' },
      { label: 'L’équipe', href: '#equipe' },
      { label: 'Boutiques clientes', href: '#resultats' },
    ],
  },
  {
    title: 'Produit',
    links: [
      { label: 'Outils IA', href: '#outils-ia' },
      { label: 'Paiements & COD', href: '#paiements' },
      { label: 'Tarifs', href: '#tarifs' },
    ],
  },
] as const;

export const Footer: React.FC = () => (
  <footer className="px-4 pb-12 pt-[calc(var(--section-y)*1.5)]">
    <div className="mx-auto w-full max-w-[1180px]">
      {/* Contact + accroche */}
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-body text-ink-mute">Support local en français, 24/7</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-2 block text-subtitle font-medium tracking-[-0.02em] text-ink transition-opacity duration-300 hover:opacity-60"
          >
            {CONTACT_EMAIL}
          </a>

          <ul className="mt-6 flex items-center gap-2.5">
            {SOCIAL_LINKS.map(({ label, href, Glyph }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  /* Réseaux externes : nouvel onglet, et `noopener` pour ne pas
                     exposer la page ouvrante via window.opener. */
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-11 place-items-center rounded-full bg-ink text-canvas transition-opacity duration-300 hover:opacity-80"
                >
                  <Glyph className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:text-right">
          <p className="text-lead tracking-[-0.02em] text-ink">
            Envie de voir ce que ça donne ?
          </p>
          <a
            href="/signup"
            className="brand-gradient mt-4 inline-flex h-[42px] items-center rounded-full px-6 text-body font-bold text-white transition-all duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            Lancer ma boutique
          </a>
        </div>
      </div>

      {/* Colonnes */}
      <nav className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-lead font-medium tracking-[-0.02em] text-ink">{column.title}</p>
            <ul className="mt-6 space-y-3.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body text-ink transition-opacity duration-300 hover:opacity-60"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bas de page */}
      <div className="mt-20 flex items-end justify-between gap-6">
        <p className="text-body text-ink-mute">© 2026 Tous droits réservés</p>
        <span className="flex items-center gap-2 text-ink">
          <EasyAfrikFace className="size-7" />
          <span className="text-subtitle font-bold tracking-[-0.03em]">EasyAfrik</span>
        </span>
      </div>
    </div>
  </footer>
);
