import { test, expect } from '@playwright/test';
import { collectErrors, appErrors, setLang, Lang } from '../helpers';

const ROUTES = ['/', '/vault', '/about', '/journal', '/archive', '/contact', '/vault/LA-001-2099'];

test.describe('Phase 2 — no console errors / hydration warnings', () => {
  for (const route of ROUTES) {
    test(`${route} is clean across EN/KA/RU`, async ({ page }) => {
      const errors = collectErrors(page);
      await page.goto(route);
      await expect(page.locator('h1').first()).toBeVisible();
      for (const lang of ['KA', 'RU'] as Lang[]) {
        await setLang(page, lang);
        await page.waitForTimeout(150);
      }
      const real = appErrors(errors);
      expect(real, real.join('\n')).toEqual([]);
    });
  }
});
