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

### Phase 2 — bug sweep (`tests/phase2/`)
- **cursor.spec.ts** — reproduces + guards the cursor-loss bug: the custom
  cursor must stay visible after a window-leave followed by in-page movement,
  and while hovering interactive elements.
- **console.spec.ts** — no console errors / hydration warnings on every route
  (`/`, `/vault`, `/about`, `/journal`, `/archive`, `/contact`, a detail page)
  across EN/KA/RU.
- **landing.spec.ts** — marquee animates; primary nav routes; language toggle
  switches copy; all images load.
- **vault.spec.ts** — filter changes results, sort reorders, category rail
  switches, compare drawer opens/closes, modal opens/prev-next/closes, view
  toggle.
- **keyboard.spec.ts** — Tab reaches multiple interactive elements on landing
  and vault.
- **touch-responsive.spec.ts** — custom cursor hidden on touch; mobile menu
  routes; no overflow @390px; language switch preserves scroll position.
- **hero-eyebrow.spec.ts** — guards bug #2 (eyebrow tannage tracks the selected
  specimen).

### Phase 3 — admin panel (`tests/phase3/`)
Runs serially (config `workers:1`); `global-setup`/`global-teardown` snapshot and
restore the editable data files around the whole run.
- **auth.spec.ts** — `/admin` unauth → redirect; admin API unauth → 401; wrong
  creds rejected on-brand; correct creds (UI form) → dashboard, session persists,
  logout works.
- **categories.spec.ts** — deleting a category that still has specimens is
  blocked server-side and surfaces a warning listing affected specimens.
- **crud.spec.ts** — create a specimen in the admin → it appears on `/vault` →
  edit it → the edit appears on `/vault` → delete → it's gone.
- **translations.spec.ts** — add a new key (round-trips through the file) and
  edit `nav.contact`; the edit renders on `/` via `t()`.
