import { TranslationKey } from '@/i18n/translations';

export interface NavItem {
  idx: string;
  k: TranslationKey;
  href: string;
  id: string;
}

export const NAV: NavItem[] = [
  { idx: '01', k: 'nav.index', href: '/', id: 'index' },
  { idx: '02', k: 'nav.vault', href: '/vault', id: 'vault' },
  { idx: '03', k: 'nav.archive', href: '/archive', id: 'archive' },
  { idx: '04', k: 'nav.journal', href: '/journal', id: 'journal' },
  { idx: '05', k: 'nav.contact', href: '/contact', id: 'contact' },
];
