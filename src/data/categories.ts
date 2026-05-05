import { TranslationKey } from '@/i18n/translations';

export interface Category {
  id: string;
  num: string;
  k: TranslationKey | null;
  isAll?: boolean;
}

export const CATS: Category[] = [
  { id: 'all', num: '00', k: null, isAll: true },
  { id: 'bags', num: '01', k: 'cat.bags' },
  { id: 'belts', num: '02', k: 'cat.belts' },
  { id: 'wallets', num: '03', k: 'cat.wallets' },
  { id: 'jackets', num: '04', k: 'cat.jackets' },
  { id: 'smallgoods', num: '05', k: 'cat.smallgoods' },
  { id: 'archive', num: '06', k: 'cat.archive' },
];
