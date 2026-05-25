import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { adminLogin } from '../helpers';

// Create a specimen, confirm it appears on /vault, edit it, confirm the edit
// shows on /vault, delete it, confirm it's gone. Net change to the data file is
// zero; global teardown restores formatting regardless.
test.describe('Phase 3 — specimen CRUD', () => {
  test.describe.configure({ timeout: 90_000 });

  async function vaultHasName(page: Page, name: string): Promise<boolean> {
    await page.goto('/vault');
    // Dossier rows render only after the client filter effect runs (debounced);
    // wait for at least one row before reading.
    await page.locator('main .nm').first().waitFor({ timeout: 5000 }).catch(() => {});
    const names = await page.locator('main .nm').allInnerTexts();
    return names.includes(name);
  }

  test('create → edit → delete round-trips through /vault', async ({ page }) => {
    page.on('dialog', (d) => d.accept());
    await adminLogin(page);

    // ── Create ──
    await page.goto('/admin/specimens');
    await page.getByTestId('new-specimen').click();
    await page.waitForURL(/\/admin\/specimens\/LA-\d+-2099\?type=vault/);
    const created = page.url().match(/LA-(\d+)-2099/)![0]; // e.g. LA-017-2099
    const serial = created.replace(/-/g, '·');
    // Read the actual generated name from the editor (avoids padding guesswork).
    const createdName = await page.getByTestId('f-name').inputValue();

    await expect.poll(() => vaultHasName(page, createdName), { timeout: 20_000 }).toBe(true);

    // ── Edit ──
    await page.goto(`/admin/specimens/${created}?type=vault`);
    const nameField = page.getByTestId('f-name');
    await expect(nameField).toHaveValue(createdName);
    await nameField.fill('BAG // E2E_EDIT');
    await page.getByTestId('save').click();
    await expect(page.getByTestId('toast')).toBeVisible();

    await expect.poll(() => vaultHasName(page, 'BAG // E2E_EDIT'), { timeout: 20_000 }).toBe(true);

    // ── Delete ──
    await page.goto('/admin/specimens');
    const row = page.getByTestId('vault-row').filter({ hasText: serial });
    await expect(row).toHaveCount(1);
    await row.getByRole('button', { name: 'Del' }).click();
    await expect(page.getByTestId('toast')).toBeVisible();

    await expect.poll(() => vaultHasName(page, 'BAG // E2E_EDIT'), { timeout: 20_000 }).toBe(false);
  });
});
