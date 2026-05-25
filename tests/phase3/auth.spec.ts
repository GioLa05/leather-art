import { test, expect } from '@playwright/test';

test.describe('Phase 3 — auth + middleware', () => {
  test('unauthenticated /admin redirects to /admin/login', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole('heading', { name: /Sign in/ })).toBeVisible();
  });

  test('unauthenticated admin API returns 401', async ({ request }) => {
    const res = await request.get('/api/admin/specimens');
    expect(res.status()).toBe(401);
  });

  test('wrong credentials are rejected on-brand', async ({ page }) => {
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'operator');
    await page.fill('input[name="password"]', 'wrong-pass');
    await page.getByRole('button', { name: /Authenticate/ }).click();
    await expect(page.getByTestId('login-error')).toContainText('TRANSMISSION REJECTED');
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('correct credentials sign in; session persists; logout works', async ({ page }) => {
    // Exercise the real UI login form here.
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'operator');
    await page.fill('input[name="password"]', 'specimen2099');
    await page.getByRole('button', { name: /Authenticate/ }).click();
    await page.waitForURL(/\/admin$/, { timeout: 30_000 });
    await expect(page.getByRole('heading', { name: /Vault overview/ })).toBeVisible();

    // Session persists across navigation (protected route, no redirect).
    await page.goto('/admin/specimens');
    await expect(page).toHaveURL(/\/admin\/specimens$/);
    await expect(page.getByRole('heading', { name: 'Specimens.' })).toBeVisible();

    // Authenticated API call now succeeds.
    const res = await page.request.get('/api/admin/stats');
    expect(res.ok()).toBeTruthy();

    // Logout returns to login; protected routes redirect again.
    await page.getByRole('button', { name: 'Sign out' }).click();
    await page.waitForURL(/\/admin\/login/);
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
