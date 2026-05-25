import { test, expect } from '@playwright/test';
import { internalNavLinks, expectH1 } from '../helpers';

test.describe('Phase 1 — link crawler', () => {
  test('every nav + footer link resolves to a 200 page with an h1', async ({ page }) => {
    await page.goto('/');
    const links = await internalNavLinks(page);

    // Sanity: the new routes are actually linked.
    for (const expected of ['/vault', '/about', '/journal', '/archive', '/contact']) {
      expect(links).toContain(expected);
    }

    for (const href of links) {
      const resp = await page.goto(href);
      expect(resp, `no response for ${href}`).toBeTruthy();
      expect(resp!.status(), `bad status for ${href}`).toBeLessThan(400);
      await expectH1(page);
    }
  });
});
