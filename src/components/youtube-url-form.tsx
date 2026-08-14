'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Link2 } from 'lucide-react';
import { isProductUrl } from '@/lib/product-url';
import { cn } from '@/lib/utils';


/*
  La porte d'entrée du produit : on colle le lien de la boutique ou du produit
  à cloner. Le lien voyage jusqu'à l'inscription pour ne pas être ressaisi une
  fois le compte créé.

  Le fichier s'appelle encore youtube-url-form.tsx : à renommer en
  store-url-form.tsx lors d'une passe dédiée, pour ne pas mélanger un
  déplacement de fichier avec la réécriture du contenu.
*/
export const ProductUrlForm: React.FC = () => {
  const router = useRouter();
  const [referenceUrl, setReferenceUrl] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isProductUrl(referenceUrl)) {
      setHasError(true);
      return;
    }

    router.push(`/signup?reference=${encodeURIComponent(referenceUrl.trim())}`);
  };

  const handleChange = (value: string) => {
    setReferenceUrl(value);
    if (hasError) {
      setHasError(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 w-full max-w-[34rem]">
      <div
        className={cn(
          'flex flex-col gap-2 rounded-[2rem] border bg-surface p-2 transition-colors duration-300 sm:flex-row sm:items-center sm:rounded-full',
          hasError ? 'border-danger' : 'border-hairline focus-within:border-hairline-strong',
        )}
      >
        <span className="flex min-w-0 flex-1 items-center gap-3 px-4 py-2 sm:py-0">
          <Link2 className="size-5 shrink-0 text-accent-start" strokeWidth={2} />
          <label htmlFor="reference-url" className="sr-only">
            Lien de la boutique ou du produit à cloner
          </label>
          <input
            id="reference-url"
            type="text"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            value={referenceUrl}
            onChange={(event) => handleChange(event.target.value)}
            placeholder="Collez le lien d’une boutique à cloner…"
            aria-invalid={hasError}
            aria-describedby={hasError ? 'reference-url-error' : undefined}
            className="h-10 w-full min-w-0 bg-transparent text-body text-ink outline-none placeholder:text-ink-mute"
          />
        </span>

        <button
          type="submit"
          className="brand-gradient group flex h-[42px] shrink-0 items-center justify-center gap-2 rounded-full px-7 text-body font-bold text-white transition-all duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Cloner la boutique
          <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>

      {hasError && (
        <p id="reference-url-error" role="alert" className="mt-3 text-small text-danger">
          Ce lien n’est pas une adresse valide.
        </p>
      )}
    </form>
  );
};
