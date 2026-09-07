import fs from 'fs';
import path from 'path';
import { defineConfig, devices } from '@playwright/test';

/**
 * Admin credentials live in .env.local (gitignored) so no real passphrase is
 * committed. Next loads that file for the app itself, but the Playwright process
 * does not — read the two keys the suite needs. Deliberately minimal rather than
 * pulling in a dotenv dependency for four lines.
 */
function loadEnvLocal() {
  const file = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    const [, key, raw] = m;
    if (process.env[key] === undefined) process.env[key] = raw.trim();
  }
}
loadEnvLocal();

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
    // The site defaults to Georgian (KA). Legacy suites assert English UI
    // strings, so seed the persisted language to EN for every test context.
    // The phase4 i18n suite overrides this with an empty state to exercise
    // the real KA default.
    storageState: {
      cookies: [],
      origins: [
        {
          origin: 'http://localhost:3000',
          localStorage: [{ name: 'leather-art.lang', value: 'EN' }],
        },
      ],
    },
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
