import { test, expect } from '@playwright/test';

// Bug: the hero eyebrow tannage was hardcoded ("VEG · 28D") and never tracked
// the selected specimen. It must reflect the active specimen's TAN meta.
test('hero eyebrow tannage tracks the selected specimen', async ({ page }) => {
  await page.goto('/');
  const tabs = page.getByRole('tab');
  // Scope to the hero section — the grid below statically lists every meta.
  const hero = page.locator('section').first();

  // Specimen 01 (Tbilisi Tote) → VEG · 21D
  await tabs.nth(0).click();
  await expect(hero.getByText('VEG · 21D')).toBeVisible();

  // Specimen 03 (Carrara//Steed) → VEG · 28D
  await tabs.nth(2).click();
  await expect(hero.getByText('VEG · 28D')).toBeVisible();
  await expect(hero.getByText('VEG · 21D')).toHaveCount(0);

  // Specimen 04 (Field Belt) → OIL · 35D
  await tabs.nth(3).click();
  await expect(hero.getByText('OIL · 35D')).toBeVisible();
});
