import { test, expect } from '@playwright/test';
import { adminLogin } from '../helpers';

test.describe('Phase 3 — category constraint', () => {
  test('deleting a category that still has specimens is blocked', async ({ page }) => {
    await adminLogin(page);
    await page.goto('/admin/categories');
    await expect(page.getByRole('heading', { name: 'Categories.' })).toBeVisible();

    page.on('dialog', (d) => d.accept()); // accept the confirm()

    // "bags" has specimens in the vault → server must reject the delete.
    await page.getByTestId('del-bags').click();

    const warning = page.getByTestId('cat-warning');
    await expect(warning).toBeVisible();
    await expect(warning).toContainText('bags');
    await expect(warning).toContainText('LA·001·2099'); // an affected specimen serial

    // The category is still present (delete did not go through).
    await expect(page.getByTestId('del-bags')).toBeVisible();
  });
});
