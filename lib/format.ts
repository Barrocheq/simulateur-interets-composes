/**
 * Formate un montant en devise française (€)
 * Exemple: 1234567.89 → "1 234 567,89 €"
 */
export function formatCurrency(amount: number): string {
  if (!isFinite(amount)) return '0,00 €';
  
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

/**
 * Formate un pourcentage
 * Exemple: 0.08 → "8 %"
 */
export function formatPercentage(rate: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(rate);
}

/**
 * Formate un nombre simple avec séparateurs français
 * Exemple: 1234567 → "1 234 567"
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num);
}

/**
 * Parse une chaîne de caractères en nombre
 * Gère les formats français (virgule comme séparateur décimal)
 */
export function parseNumber(str: string): number {
  if (typeof str !== 'string') return 0;
  
  // Remplace les virgules par des points et supprime les espaces
  const cleaned = str.replace(/\s/g, '').replace(',', '.');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : parsed;
}