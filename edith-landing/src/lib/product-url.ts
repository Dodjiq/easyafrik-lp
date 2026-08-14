/**
 * Valide le lien d'une fiche produit collé dans le hero.
 *
 * Volontairement permissif : les boutiques vivent sur tous les domaines
 * possibles (Shopify, WooCommerce, marketplaces, domaines propres), donc on
 * verifie la forme de l'URL, pas l'hote. Refuser un domaine legitime coute
 * plus cher que laisser passer un lien invalide, que l'analyse rejettera.
 */
export const isProductUrl = (input: string): boolean => {
  const trimmed = input.trim();
  if (!trimmed) {
    return false;
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
  } catch {
    return false;
  }

  // Un hote doit comporter un point : « produit » seul n'est pas une adresse.
  return (
    (parsed.protocol === 'http:' || parsed.protocol === 'https:') && parsed.hostname.includes('.')
  );
};
