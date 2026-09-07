import { test, expect } from '@playwright/test';

/**
 * Phase 4 — language default, persistence, and currency-by-language.
 * These tests run with a clean storage state (no persisted language) to
 * exercise the real first-visit behavior, unlike the legacy suites which
 * seed EN via the shared storageState in playwright.config.
 */
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Phase 4 — i18n & currency', () => {
  test('site defaults to Georgian (KA)', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'KA', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    // Primary nav renders Georgian labels.
    await expect(page.getByRole('link', { name: /ინდექსი/ })).toBeVisible();
  });

  test('chosen language survives navigation and reload', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'RU', exact: true }).click();
    await expect(page.getByRole('button', { name: 'RU', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    // Client-side navigation keeps the language. Use the nav position (second
    // item = vault) so the click is locale-independent.
    await page
      .getByRole('navigation', { name: 'Primary navigation' })
      .getByRole('link')
      .nth(1)
      .click();
    await page.waitForURL(/\/vault/);
    await expect(page.getByRole('button', { name: 'RU', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    // Full reload keeps it too (localStorage).
    await page.reload();
    await expect(page.getByRole('button', { name: 'RU', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  test('KA shows lari, EN shows dollars', async ({ page }) => {
    await page.goto('/vault');
    // Default KA → first dossier price is in lari.
    await expect(page.locator('main .price').first()).toHaveText(/^₾/);

    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await expect(page.locator('main .price').first()).toHaveText(/^\$/);
  });
});

test.describe('Phase 4 — mobile filter bottom sheet', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('sheet opens from FILTERS, applies, and closes', async ({ page }) => {
    await page.goto('/vault');
    // Default is KA; the FILTERS trigger is localized.
    const sheet = page.getByTestId('filter-sheet');
    await expect(sheet).not.toBeInViewport();

    await page.getByRole('button', { name: 'ფილტრები', exact: true }).click();
    await expect(sheet).toBeInViewport();

    await page.getByRole('button', { name: /შედეგების ჩვენება/ }).click();
    await expect(sheet).not.toBeInViewport();
  });

  test('sheet is a focus-trapped dialog: focus moves in, Escape closes', async ({ page }) => {
    await page.goto('/vault');
    const sheet = page.getByTestId('filter-sheet');

    await page.getByRole('button', { name: 'ფილტრები', exact: true }).click();
    await expect(sheet).toBeInViewport();
    await expect(sheet).toHaveAttribute('aria-modal', 'true');

    // Focus must land inside the sheet, not stay on the page behind it.
    await expect
      .poll(() => sheet.evaluate((el) => el.contains(document.activeElement)))
      .toBe(true);

    // Tabbing must not escape into the controls hidden behind the backdrop.
    for (let i = 0; i < 25; i++) await page.keyboard.press('Tab');
    expect(await sheet.evaluate((el) => el.contains(document.activeElement))).toBe(true);

    await page.keyboard.press('Escape');
    await expect(sheet).not.toBeInViewport();
  });
});
