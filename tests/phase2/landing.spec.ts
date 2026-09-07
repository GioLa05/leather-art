import { test, expect } from '@playwright/test';
import { setLang } from '../helpers';

test.describe('Phase 2 — landing health', () => {
  test('marquee animates (transform changes over time)', async ({ page }) => {
    await page.goto('/');
    const track = page.locator('.marquee-track');
    await expect(track).toBeVisible();

    const read = () => track.evaluate((el) => getComputedStyle(el).transform);
    const first = await read();
    await page.waitForTimeout(900);
    const second = await read();
    expect(first).not.toBe(second);
  });

  test('primary nav routes correctly', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /VAULT/ }).first().click();
    await expect(page).toHaveURL(/\/vault$/);
    await expect(page.locator('h1')).toContainText('VAULT INDEX');
  });

  test('language toggle switches all visible copy', async ({ page }) => {
    await page.goto('/');
    // EN nav label.
    await expect(page.getByRole('link', { name: /INDEX/ }).first()).toBeVisible();
    await setLang(page, 'RU');
    // RU nav label (nav.index = ИНДЕКС).
    await expect(page.getByRole('link', { name: /ИНДЕКС/ }).first()).toBeVisible();
    await setLang(page, 'KA');
    await expect(page.getByRole('link', { name: /ინდექსი/ }).first()).toBeVisible();
  });

  test('all images load (no broken src)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const broken = await page.evaluate(() =>
      Array.from(document.images)
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.src)
    );
    expect(broken, broken.join('\n')).toEqual([]);
  });
});
