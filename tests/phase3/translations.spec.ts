import { test, expect } from '@playwright/test';
import { adminLogin } from '../helpers';

// Runs last in Phase 3 (alphabetical) and leaves the dictionary edited until
// global teardown restores it — no later phase reads these keys.
test.describe('Phase 3 — translation editor', () => {
  test.describe.configure({ timeout: 60_000 });

  test('add a key + edit an existing one; the edit renders on the site via t()', async ({ page }) => {
    await adminLogin(page);
    await page.goto('/admin/translations');
    await expect(page.getByRole('heading', { name: 'Translations.' })).toBeVisible();

    // Add a brand-new key.
    await page.getByTestId('new-key').fill('e2e.added');
    await page.getByTestId('add-key').click();
    await expect(page.getByTestId('tkey-e2e.added')).toBeVisible();

    // Edit an existing, rendered key (nav.contact EN → sentinel).
    await page.getByPlaceholder('Search keys…').fill('nav.contact');
    const enInput = page.getByTestId('tkey-nav.contact').locator('input').first();
    await expect(enInput).toHaveValue('CONTACT');
    await enInput.fill('PARLEY');

    await page.getByTestId('save-dict').click();
    await expect(page.getByTestId('toast')).toHaveText('ARCHIVED');

    // The new key + edit round-trip through the file (API reflects them once the
    // route module recompiles — poll for it).
    await expect
      .poll(
        async () => {
          const res = await page.request.get('/api/admin/translations');
          const json = await res.json();
          return json.i18n?.EN?.['e2e.added'];
        },
        { timeout: 20_000 },
      )
      .toBe('e2e.added');

    const res = await page.request.get('/api/admin/translations');
    const json = await res.json();
    expect(json.i18n.EN['nav.contact']).toBe('PARLEY');

    // The edited key renders on the public site via t() after HMR.
    await expect
      .poll(
        async () => {
          await page.goto('/');
          return page.getByRole('link', { name: /PARLEY/ }).first().isVisible().catch(() => false);
        },
        { timeout: 20_000 },
      )
      .toBe(true);
  });
});
