import { Page, expect } from '@playwright/test';

export type Lang = 'EN' | 'KA' | 'RU';

/** Click the language toggle in the StatusBar. */
export async function setLang(page: Page, lang: Lang) {
  await page.getByRole('button', { name: lang, exact: true }).click();
}

/** Collect distinct internal hrefs from the nav + footer of the current page. */
export async function internalNavLinks(page: Page): Promise<string[]> {
  const hrefs = await page
    .locator('nav a, footer a')
    .evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  const internal = hrefs.filter(
    (h): h is string => !!h && h.startsWith('/') && !h.startsWith('//')
  );
  return Array.from(new Set(internal));
}

/** Assert the page rendered at least one visible <h1>. */
export async function expectH1(page: Page) {
  await expect(page.locator('h1').first()).toBeVisible();
}
