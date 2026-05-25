import { test, expect } from '@playwright/test';
import { setLang } from '../helpers';

// Narrow + touch viewport on chromium (pointer: coarse, max-width breakpoints).
test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

test.describe('Phase 2 — touch / responsive degradation', () => {
  test('custom cursor is hidden on touch viewports', async ({ page }) => {
    await page.goto('/');
    const display = await page
      .getByTestId('cursor')
      .evaluate((el) => getComputedStyle(el).display);
    expect(display).toBe('none');
  });

  test('mobile nav menu opens and routes', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Menu' }).click();
    // Multiple VAULT links exist (mobile menu + footer); the menu link is first.
    await page.getByRole('link', { name: /VAULT/ }).first().click();
    await expect(page).toHaveURL(/\/vault$/);
  });

  test('no horizontal overflow on landing + vault @ 390px', async ({ page }) => {
    for (const route of ['/', '/vault']) {
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow, `overflow on ${route}`).toBeLessThanOrEqual(1);
    }
  });

  test('switching language does not reset scroll position', async ({ page }) => {
    await page.goto('/');
    // scroll-behavior: smooth is set globally; jump instantly so we can read it.
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' as ScrollBehavior }));
    await page.waitForTimeout(100);
    const before = await page.evaluate(() => window.scrollY);
    expect(before).toBeGreaterThan(100);
    await setLang(page, 'RU');
    await page.waitForTimeout(150);
    const after = await page.evaluate(() => window.scrollY);
    expect(Math.abs(after - before)).toBeLessThan(40);
  });
});
