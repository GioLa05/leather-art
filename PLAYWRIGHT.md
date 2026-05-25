# LEATHER//ART — Playwright Tests

## Running

```bash
npm test                 # run the full suite (auto-starts `next dev`)
npx playwright test tests/phase1          # one phase
npx playwright test tests/phase1/detail.spec.ts   # one spec
npm run test:headed      # watch it run in a browser
```

The config (`playwright.config.ts`) starts `npm run dev` on
`http://localhost:3000` and reuses an already-running server locally.
Chromium only. First run requires `npx playwright install chromium`.

## Specs

### Phase 1 — missing pages (`tests/phase1/`)
- **links.spec.ts** — crawls every internal `nav`/`footer` link from `/`,
  asserts each resolves `< 400` and renders an `<h1>`; checks the new routes
  are actually linked.
- **pages.spec.ts** — loads `/about`, `/journal`, `/archive`, `/contact` in
  EN/KA/RU and asserts a known translated string is visible in each language.
- **detail.spec.ts** — `/vault` → click specimen → modal → "open full dossier"
  → `/vault/[serial]`; also direct serial load and the not-found state.
- **responsive.spec.ts** — asserts no horizontal overflow at 1100/820/480 on
  every new page.
