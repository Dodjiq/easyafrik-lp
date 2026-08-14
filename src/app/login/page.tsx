import Link from 'next/link';

/*
  ⚠️ PLACEHOLDER — à rebrancher sur le vrai écran de connexion.
  Cible du bouton « Commencer » du header et des offres tarifaires.
*/
const LoginPage: React.FC = () => (
  <main className="mx-auto flex min-h-dvh w-full max-w-[820px] flex-col justify-center px-4 py-[var(--section-y)]">
    <h1 className="text-title text-ink">Connexion</h1>
    <p className="mt-[var(--section-title)] text-lead text-ink-soft">Écran à brancher.</p>

    <Link
      href="/"
      className="mt-8 self-start rounded-full border border-hairline bg-surface px-6 py-3 text-body font-bold text-ink transition-colors duration-200 hover:bg-field"
    >
      Retour à l&apos;accueil
    </Link>
  </main>
);

export default LoginPage;
