import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';
import '../styles/globals.css';

/*
  Police du produit : DM Sans.

  ⚠️ Google Sans n'est pas utilisable ici. C'est la police de marque
  propriétaire de Google : elle n'est pas au catalogue Google Fonts (vérifié —
  absente des 251 familles), donc `next/font/google` ne peut pas la charger, et
  en embarquer une copie récupérée ailleurs serait une contrefaçon.

  DM Sans est le substitut libre le plus proche : même construction
  géométrique, faible contraste, bols circulaires et ouvertures larges. La pile
  déclarée dans globals.css nomme quand même « Google Sans » en premier — si
  vous obtenez un jour une licence et l'auto-hébergez, elle prendra le relais
  sans toucher au code.

  Aucun `weight` : DM Sans est une police variable, l'omettre donne toute la
  plage 100–1000 pour le poids d'un seul fichier, là où lister les graisses en
  téléchargerait une par valeur.

  next/font l'auto-héberge : plus aucun domaine tiers à charger.
*/
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EasyAfrik',
  description:
    'La plateforme e-commerce pensée pour les entrepreneurs africains. Vendez en paiement à la livraison, encaissez en Mobile Money, clonez une boutique avec l’IA. 0 % de commission.',
  applicationName: 'EasyAfrik',
  manifest: '/manifest.webmanifest',
  icons: {
    // `icon` couvre le favicon : le SVG d'abord, le PNG pour les navigateurs qui l'ignorent.
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  // iOS ignore le manifest : le mode plein écran de l'écran d'accueil passe par ces balises.
  appleWebApp: {
    capable: true,
    title: 'EasyAfrik',
    statusBarStyle: 'default',
  },
};

/*
  `themeColor` doit vivre dans l'export `viewport` et non dans `metadata` :
  Next le refuse dans `metadata` depuis la v15.

  La valeur reprend le token `--color-ink`, quand `background_color` du
  manifest reprend `--color-canvas` : la barre d'état est donc encrée au-dessus
  d'une interface claire. Basculer sur #fafafa si l'on préfère une barre qui se
  fond dans la page.
*/
export const viewport: Viewport = {
  themeColor: '#1d1d1f',
  /*
    `viewport-fit: cover` est la condition d'existence des variables
    `env(safe-area-inset-*)` : sans lui elles valent 0, et la barre d'onglets du
    bas comme le bandeau d'installation se collent à la barre gestuelle du
    téléphone.

    En contrepartie la page s'étend sous les barres système en mode autonome,
    d'où le retrait haut appliqué au header de l'espace de travail. Hors mode
    autonome, dans un onglet ordinaire, ces variables valent 0 et rien ne bouge.
  */
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={dmSans.variable}>
      <body className="antialiased">
        {children}

        {/*
          ⚠️ ÉCART AVEC LE DÉPÔT — bloc PWA retiré dans ce projet landing seul.

          L'original monte ici `<InstallPromptMount />` puis, en production,
          `<Script src="/sw-register.js" />`. Les deux dépendent du reste de
          l'application : install-prompt-mount tire
          @/components/dashboard/{mobile-tab-bar,workspace-ui}, et sw-register.js
          vit dans le public/ du monorepo. À rétablir tel quel le jour où cette
          landing rejoint l'app complète.
        */}
      </body>
    </html>
  );
}
