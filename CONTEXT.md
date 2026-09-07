# LEATHER//ART — Session Context

> Read this first in future sessions instead of re-exploring.
> Updated 2026-07-18 after the autonomous production-readiness pass — **all 7 reported bugs are fixed, tested (68/68 Playwright), and committed** on `feature/autonomous-build`.
> Per-page documentation lives in `docs/pages/` (one .md per page, incl. all admin pages).

## Stack / architecture

- **Next.js 14 (app router)** + **styled-components** + **next-auth** (admin login: env `ADMIN_USERNAME` / `ADMIN_PASSWORD_HASH`; test creds in `tests/helpers.ts`).
- Tests: Playwright (`tests/phase1..4`), single worker, dev-server reuse. Legacy suites run with **EN seeded via `storageState`** in `playwright.config.ts`; `tests/phase4/i18n.spec.ts` uses empty storage to test the real KA default, currency, and the mobile filter sheet.
- Design tokens: `src/app/globals.css` (CSS vars) mirrored in `src/styles/theme.ts`. `--mid` is **#5E432B**.
- Content lives in **TypeScript data files** (`src/data/*.ts`, `src/i18n/translations.ts`).

### ⚠️ Admin persistence model (still the key caveat)
`/admin` rewrites the source `.ts` files via **ts-morph + Prettier** (`src/lib/admin/writers.ts`) and writes uploads to `public/assets/` (`api/admin/media`). Local-authoring workflow: run dev, edit in admin, **commit the changed files**. Won't persist on serverless hosts — a live-editable production site would need a real DB + blob storage (not built, user never requested it explicitly).

## What was built (2026-07-18)

1. **Language (bug #7)** — `src/i18n/LangContext.tsx`: app-wide `LangProvider` mounted in `layout.tsx` (html lang="ka"), default **KA**, persisted in `localStorage['leather-art.lang']`. All pages consume `useLang()`; no more per-page `useState<Lang>('EN')`.
2. **Currency (bug #2)** — `VaultSpecimen` has `price` (USD, shown EN/RU) **and** `priceGel` (₾, shown KA); `src/lib/price.ts#formatPrice`. No `€` remains. Both prices editable in the admin editor (`f-price-usd` / `f-price-gel` testids).
3. **Trilingual products (bug #1a)** — `VaultSpecimen.name/quote/finish/editorial` are `Record<Lang, string>` with full KA/RU translations for all 16 specimens. Admin vault editor has a "Trilingual copy" panel with EN/KA/RU tabs.
4. **Photos (bug #1b)** — optional `image?: string` on vault + landing specimens; `src/components/admin/ImagePicker.tsx` (upload / library / remove; uses the pre-existing `/api/admin/media`). Rendered (cover-fit, silhouette fallback) in: vault grid, dossier rows, modal gallery+thumbs, detail frame, archive cards, landing hero + grid, admin previews.
5. **Cursor (bug #3)** — `Cursor.tsx` crosshair+trail are **white with `mix-blend-mode: difference`** → auto-inverts over any background.
6. **Color (bug #4)** — `--mid` / `theme.mid` = `#5E432B`.
7. **Mobile filter (bug #6)** — `FilterPanel.tsx` is a **bottom sheet** ≤820px: backdrop, grabber, sticky ✕ header, sticky "SHOW RESULTS →" (`filters.apply` i18n key), body-scroll lock, `data-testid="filter-sheet"`.
8. **Mobile audit (bug #5)** — dossier table refit for ≤600px (idx/grain/origin/weight cols hidden, no horizontal clipping); all 7 public routes have **zero horizontal overflow at 375px**.
9. **Admin audit** — full pass; found & removed **leaked test specimen LA·017·2099** from committed data (restored the 16-specimen invariant the phase2 tests assert). All admin routes 200, no console errors; media upload→attach→save→public-render verified end-to-end.

## Gotchas for future work

- The site **server-renders KA**; EN/RU appear after hydration applies the stored language. UI tests asserting non-KA strings must either seed storage (config does this) or wait for hydration (see the patched poll in `tests/phase3/translations.spec.ts`).
- Admin saves reformat data files (Prettier) — diffs can look bigger than the content change.
- `nextSerial`/`blankVault` in `admin/specimens/page.tsx` create trilingual blanks — keep `Record<Lang,…>` shape if adding fields.
- `serialize.ts` drops `undefined` object entries — that's how "remove image" persists.
- Playwright global setup/teardown backs up & restores the data files around the suite.

## Possible future work (not requested / not built)

- Live-editable production backend (DB + blob storage).
- Journal article detail pages ("READ ENTRY" is presentational).
- Cart / checkout (cart button is decorative; "REQUEST SPECIMEN" is a CTA without a flow).
- Search button in the nav is decorative.
