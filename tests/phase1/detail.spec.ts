import { test, expect } from '@playwright/test';

test.describe('Phase 1 — specimen detail', () => {
  test('vault → open specimen → open full dossier → /vault/[serial]', async ({ page }) => {
    await page.goto('/vault');

    // Default dossier view lists rows; click the first specimen to open the modal.
    await page.getByText('BAG // PROTOCOL_07', { exact: true }).click();

    // Modal exposes a link to the standalone dossier.
    const dossierLink = page.getByTestId('open-dossier').first();
    await expect(dossierLink).toBeVisible();
    await dossierLink.click();

    await expect(page).toHaveURL(/\/vault\/LA-001-2099$/);

    // Standalone dossier renders the specimen name + spec block.
    await expect(page.locator('h1')).toContainText('PROTOCOL_07');
    await expect(page.getByText('LA·001·2099').first()).toBeVisible();

    // Prev/next navigation by serial is present.
    await expect(page.getByRole('link', { name: /NEXT SPECIMEN/ })).toBeVisible();
  });

  test('direct load of a serial renders the dossier', async ({ page }) => {
    await page.goto('/vault/LA-007-2099');
    await expect(page.locator('h1')).toContainText('PROTOTYPE_A');
  });

  test('unknown serial shows not-found state', async ({ page }) => {
    await page.goto('/vault/LA-999-2099');
    await expect(page.getByText('SPECIMEN NOT ON RECORD')).toBeVisible();
  });
});
