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

/**
 * Attach console + page-error collectors. Returns an `errors` array that
 * accumulates console.error messages and uncaught exceptions (including React
 * hydration warnings, which surface as console errors).
 */
export function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
  return errors;
}

/** Errors we tolerate: dev-server network noise unrelated to app behavior. */
export function appErrors(errors: string[]): string[] {
  return errors.filter(
    (e) =>
      !/favicon/i.test(e) &&
      !/Failed to load resource/i.test(e) &&
      !/the server responded with a status of 404/i.test(e)
  );
}
