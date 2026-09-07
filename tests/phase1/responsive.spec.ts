import { test, expect } from '@playwright/test';

const ROUTES = ['/about', '/journal', '/archive', '/contact', '/vault/LA-001-2099'];
const WIDTHS = [1100, 820, 480];

for (const width of WIDTHS) {
  test.describe(`Phase 1 — no horizontal overflow @ ${width}px`, () => {
    for (const route of ROUTES) {
      test(`${route}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);
        await expect(page.locator('h1').first()).toBeVisible();
        // Allow a 1px rounding tolerance.
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        expect(overflow, `horizontal overflow on ${route}`).toBeLessThanOrEqual(1);
      });
    }
  });
}
