import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';

// Tab through the page and collect the tag names / roles of focused elements.
async function reachableByTab(page: Page, steps: number): Promise<number> {
  const seen = new Set<string>();
  for (let i = 0; i < steps; i++) {
    await page.keyboard.press('Tab');
    const desc = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return '';
      return `${el.tagName}:${el.getAttribute('aria-label') ?? el.textContent?.slice(0, 16) ?? ''}`;
    });
    if (desc) seen.add(desc);
  }
  return seen.size;
}

test.describe('Phase 2 — keyboard navigation', () => {
  test('landing: Tab reaches multiple interactive elements', async ({ page }) => {
    await page.goto('/');
    await page.locator('body').click({ position: { x: 2, y: 2 } });
    const count = await reachableByTab(page, 14);
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('vault: Tab reaches multiple interactive elements', async ({ page }) => {
    await page.goto('/vault');
    await page.locator('body').click({ position: { x: 2, y: 2 } });
    const count = await reachableByTab(page, 16);
    expect(count).toBeGreaterThanOrEqual(6);
  });
});
