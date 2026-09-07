import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';

// The toolbar shows "<NNN> SHOWING / <NNN> SPECIMENS"; read the first count.
async function showingCount(page: Page): Promise<number> {
  const txt = await page.locator('main').getByText(/SHOWING/).first().innerText();
  const m = txt.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : -1;
}

// `.nm` is also used by the category rail (outside <main>); scope to the
// dossier/grid content area.
async function firstRowName(page: Page): Promise<string> {
  return page.locator('main .nm').first().innerText();
}

test.describe('Phase 2 — vault interactions', () => {
  test('filter panel changes results', async ({ page }) => {
    await page.goto('/vault');
    await expect.poll(() => showingCount(page)).toBe(16); // all specimens
    await page.getByRole('button', { name: 'FINE', exact: true }).click();
    await expect.poll(() => showingCount(page)).toBe(7); // 7 fine-grain specimens
  });

  test('sort changes order', async ({ page }) => {
    await page.goto('/vault');
    await expect.poll(() => firstRowName(page)).toBe('BAG // PROTOCOL_07');
    await page.getByRole('button', { name: 'WEIGHT', exact: true }).click();
    // Lightest specimen first after sorting ascending by weight.
    await expect.poll(() => firstRowName(page)).toBe('PATCH // BLIND_002');
  });

  test('category rail switches category', async ({ page }) => {
    await page.goto('/vault');
    await expect.poll(() => showingCount(page)).toBe(16);
    await page.getByRole('button', { name: /BELTS/ }).click();
    await expect.poll(() => showingCount(page)).toBe(3); // 3 belts in data
    const names = await page.locator('main .nm').allInnerTexts();
    expect(names.every((n) => n.startsWith('BELT'))).toBeTruthy();
  });

  test('compare drawer opens and closes', async ({ page }) => {
    await page.goto('/vault');
    const drawer = page.getByTestId('compare-drawer');
    await expect(drawer).not.toBeInViewport();

    await page.getByRole('button', { name: 'add to compare' }).first().click();
    await expect(drawer).toBeInViewport();

    await page.getByRole('button', { name: 'CLEAR ALL' }).click();
    await expect(drawer).not.toBeInViewport();
  });

  test('specimen modal opens, navigates prev/next, and closes', async ({ page }) => {
    await page.goto('/vault');
    await page.getByText('BAG // PROTOCOL_07', { exact: true }).click();

    const modal = page.getByTestId('specimen-modal');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('PROTOCOL_07');

    await page.getByRole('button', { name: /NEXT/ }).click();
    await expect(modal).not.toContainText('PROTOCOL_07');

    await page.getByRole('button', { name: /PREV/ }).click();
    await expect(modal).toContainText('PROTOCOL_07');

    await page.getByRole('button', { name: 'close' }).click();
    await expect(modal).toBeHidden();
  });

  test('dossier/specimen view toggle works', async ({ page }) => {
    await page.goto('/vault');
    // Dossier (table) view is default — column header IDX is present.
    await expect(page.getByText('IDX', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'SPECIMEN', exact: true }).click();
    // Grid view drops the table header.
    await expect(page.getByText('IDX', { exact: true })).toHaveCount(0);

    await page.getByRole('button', { name: 'DOSSIER', exact: true }).click();
    await expect(page.getByText('IDX', { exact: true })).toBeVisible();
  });
});
