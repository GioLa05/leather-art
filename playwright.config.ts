import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for LEATHER//ART. Spins up the Next dev server and runs
 * the chromium suite against it. Specs live in tests/ grouped by phase.
 */
export default defineConfig({
  testDir: './tests',
  // The admin (Phase 3) tests mutate the on-disk data files and rely on dev HMR
  // recompiling. Run serially with a single worker so phases never interleave
  // and reads never observe a half-written file. Determinism > speed here.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  globalSetup: './tests/global-setup.ts',
  globalTeardown: './tests/global-teardown.ts',
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
