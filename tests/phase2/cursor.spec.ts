import { test, expect } from '@playwright/test';

// The custom cursor must never get stuck hidden while the pointer is over and
// moving within the page. The original implementation only restored opacity on
// `mouseenter`; a stray `mouseleave` (leaving the window, opening a native
// <select>, etc.) set opacity to 0 and nothing reasserted it on movement.
test.describe('Phase 2 — custom cursor', () => {
  test('cursor stays mounted + visible after a window-leave then in-page movement', async ({
    page,
  }) => {
    await page.goto('/');
    await page.mouse.move(200, 200);

    const cursor = page.getByTestId('cursor');
    await expect(cursor).toBeAttached();

    // Simulate the pointer leaving the window (browser chrome, native dropdown).
    await page.evaluate(() => document.dispatchEvent(new MouseEvent('mouseleave')));

    // Move again inside the page — the cursor must come back.
    await page.mouse.move(320, 280);
    await page.mouse.move(360, 300);

    await expect
      .poll(async () => cursor.evaluate((el) => getComputedStyle(el).opacity))
      .toBe('1');
  });

  test('cursor survives hovering interactive elements', async ({ page }) => {
    await page.goto('/');
    const cursor = page.getByTestId('cursor');

    const targets = [
      page.getByRole('tab').first(),
      page.getByRole('link', { name: /VAULT/ }).first(),
      page.getByRole('button', { name: 'KA', exact: true }),
    ];
    for (const target of targets) {
      await target.hover();
      await expect(cursor).toBeAttached();
      const opacity = await cursor.evaluate((el) => getComputedStyle(el).opacity);
      expect(opacity).toBe('1');
    }
  });
});
