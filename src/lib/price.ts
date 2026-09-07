import { Lang } from '@/i18n/translations';

/**
 * Currency follows the active language: Georgian lari for KA, US dollars for
 * EN and RU. Both amounts are stored per specimen and editable in the admin.
 */
export function formatPrice(lang: Lang, spec: { price: number; priceGel: number }): string {
  return lang === 'KA' ? `₾${spec.priceGel}` : `$${spec.price}`;
}
