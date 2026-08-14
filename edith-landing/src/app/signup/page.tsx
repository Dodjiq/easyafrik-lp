import Link from 'next/link';

/*
  ⚠️ PLACEHOLDER — à rebrancher sur le vrai parcours d'inscription.

  Le hero pousse ici avec le lien produit en paramètre (`?reference=…`) pour
  qu'il n'ait pas à être ressaisi une fois le compte créé. Cette page existe
  pour que ce `router.push()` ne tombe pas sur un 404 dans le projet neuf ;
  elle affiche le paramètre reçu, rien de plus.
*/
type SignupPageProps = {
  searchParams: Promise<{ reference?: string }>;
};

const SignupPage = async ({ searchParams }: SignupPageProps) => {
  const { reference } = await searchParams;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[820px] flex-col justify-center px-4 py-[var(--section-y)]">
      <h1 className="text-title text-ink">Inscription</h1>
      <p className="mt-[var(--section-title)] text-lead text-ink-soft">
        Parcours à brancher. Le lien produit transmis par le hero arrive ici.
      </p>

      {reference && (
        <p className="card mt-8 break-all p-5 text-small text-ink-soft">
          <span className="font-semibold text-ink">Référence reçue :</span> {reference}
        </p>
      )}

      <Link
        href="/"
        className="mt-8 self-start rounded-full border border-hairline bg-surface px-6 py-3 text-body font-bold text-ink transition-colors duration-200 hover:bg-field"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
};

export default SignupPage;
