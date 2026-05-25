import { test, expect } from '@playwright/test';
import { setLang, expectH1, Lang } from '../helpers';

// One known translated eyebrow string per page, per language.
const PAGES: { path: string; strings: Record<Lang, string> }[] = [
  {
    path: '/about',
    strings: { EN: 'Atelier dossier', KA: 'ატელიეს დოსიე', RU: 'Досье ателье' },
  },
  {
    path: '/journal',
    strings: { EN: 'Field notes', KA: 'ველის ჩანაწერები', RU: 'Полевые заметки' },
  },
  {
    path: '/archive',
    strings: { EN: 'Redacted index', KA: 'რედაქტირებული ინდექსი', RU: 'Редактированный индекс' },
  },
  {
    path: '/contact',
    strings: { EN: 'Transmission', KA: 'გადაცემა', RU: 'Передача' },
  },
];

for (const p of PAGES) {
  test.describe(`Phase 1 — ${p.path}`, () => {
    for (const lang of ['EN', 'KA', 'RU'] as Lang[]) {
      test(`renders in ${lang}`, async ({ page }) => {
        await page.goto(p.path);
        await expectH1(page);
        if (lang !== 'EN') await setLang(page, lang);
        await expect(page.getByText(p.strings[lang], { exact: false }).first()).toBeVisible();
      });
    }
  });
}
