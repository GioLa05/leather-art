# LEATHER//ART — Bug-fix Context & Estimates

> Working notes for the 7-bug batch requested 2026-06-23. Read this first in future
> sessions instead of re-exploring. Line refs are approximate — confirm before editing.

## Stack / architecture (the important parts)

- **Next.js 14 (app router)** + **styled-components** + **next-auth** (admin login).
- Tests: Playwright (`tests/`, see `PLAYWRIGHT.md`).
- Design tokens in two places that must stay in sync:
  - CSS vars: `src/app/globals.css` (`:root { --tan --choc --bone --mid --hair … }`)
  - JS theme: `src/styles/theme.ts` (same values, used by styled-components).
- Content lives in **TypeScript data files**, not a database:
  - `src/data/specimens.ts` — `LANDING_SPECIMENS` + `VAULT_SPECIMENS` (+ interfaces).
  - `src/data/{categories,nav,telemetry,journal}.ts`
  - `src/i18n/translations.ts` — `I18N` dict (EN/KA/RU) + `MARQUEE`, `t(lang,key)` helper.

### ⚠️ Admin persistence model (critical caveat)
The `/admin` panel **rewrites the source `.ts` files on disk** using `ts-morph` + Prettier
(`src/lib/admin/writers.ts`) and writes uploaded images to `public/assets/` with Node `fs`
(`src/app/api/admin/media/route.ts`). 

**This only works when running locally (`next dev`/`next start` on a writable FS).** On a
serverless host (Vercel etc.) the filesystem is read-only/ephemeral, so "edit from console"
and image upload will NOT persist in production. "Add from the console" = a **local-dev
authoring workflow whose output is committed to the repo**. If the user wants to edit a
*live deployed* site, that's a separate, bigger architecture change (real DB + blob storage).
**Confirm which they expect before building #1/#2.**

### Admin routes
`src/app/admin/{page,login,specimens,specimens/[serial],translations,categories,nav,telemetry,media}/page.tsx`
API: `src/app/api/admin/{specimens,translations,categories,nav,telemetry,stats,media}/route.ts`

### Language state (root cause of bug #7)
There is **no shared language state**. Every page declares its own
`const [lang, setLang] = useState<Lang>('EN')`:
- `src/app/page.tsx:16`, `src/app/vault/page.tsx:142`, `src/components/PageShell.tsx:26`
- Switcher UI: `src/components/StatusBar.tsx:180` (`['EN','KA','RU']`).
No context, no localStorage, no URL param → navigating remounts a page → resets to `'EN'`.
`Lang = 'EN' | 'KA' | 'RU'` in `src/i18n/translations.ts:1`.

---

## The 7 bugs — file map + findings + estimate

### #4 — Mid text color `#8B6B4D` → `#5E432B`  ·  ~5 min  ·  TRIVIAL
Color is fully centralized. Change **two lines only**; everything else uses `var(--mid)` / `theme.mid`.
- `src/app/globals.css:5` → `--mid: #5E432B;`
- `src/styles/theme.ts:5` → `mid: '#5E432B',`

### #7 — KA default + persist language across navigation  ·  ~1–2 hrs  ·  LOW risk
Root cause above. Fix:
1. Create a `LangProvider` (React context + `localStorage`, default `'KA'`) — mount in
   `src/app/layout.tsx`. Guard against SSR/hydration mismatch (read storage in effect).
2. Replace the per-page `useState<Lang>` (`page.tsx:16`, `vault/page.tsx:142`,
   `PageShell.tsx:26`) with `useLang()` from context.
3. Point `StatusBar` switcher at the context setter.
- Default language → `'KA'` (also affects first paint).

### #2 — Currency by language (KA→₾ GEL, EN/RU→$ USD), editable in admin  ·  ~1–2 hrs  ·  LOW
Currency is a **hardcoded `€`** in ~7 render sites; price is a single `number`:
- `src/components/vault/CompareDrawer.tsx:188`, `SpecimenModal.tsx:444`,
  `DossierView.tsx:186`, `SpecimenGrid.tsx:242`
- `src/app/vault/[serial]/page.tsx:281`
- Admin: `src/app/admin/specimens/page.tsx:166`, `specimens/[serial]/page.tsx:171,257`
- Price field already editable in admin (`[serial]/page.tsx:171`, label "Price (€)").
Plan: add `formatPrice(lang, price)` helper → `₾{price}` for KA, `${price}` for EN/RU; replace
all `€{...}`. **DECISION NEEDED:** single base price + fixed FX rate, or store separate
GEL/USD prices per specimen? (Separate = admin gets two price fields; cleaner but more edits.)

### #3 — Adaptive cursor color (dark over light, white over dark)  ·  ~1–2 hrs  ·  MEDIUM
Custom JS cursor in `src/components/Cursor.tsx`. The `::before/::after` crosshair + trail use
`background/border: var(--choc)` (always dark) → invisible on dark backgrounds.
Cleanest fix: set cursor color to white and add `mix-blend-mode: difference` (or `exclusion`)
so it auto-inverts against whatever is under it — no per-region JS needed. Verify against the
dark `--choc` panels (modals, admin, footer). Cursor is hidden on touch/≤880px already.

### #1 — Admin: Georgian for products + attach/remove photos  ·  ~4–7 hrs  ·  HIGH (biggest)
**Two real sub-problems:**

(a) **"No Georgian" for products is REAL.** Vault products are **monolingual**:
`VaultSpecimen.name/quote/finish/editorial` are plain `string`s
(`src/data/specimens.ts:226-243`). The EN/KA/RU tabs in the editor only exist for **landing**
specimens' "Trilingual copy" panel (`src/app/admin/specimens/[serial]/page.tsx:204-215`);
the vault editor (`:128-179`) has no KA inputs. To let products be entered in Georgian,
change those fields to `Record<Lang,string>` → ripples into: the editor, `serialize`/writers,
and every public render site (`SpecimenGrid`, `SpecimenModal`, `DossierView`,
`vault/[serial]/page.tsx`, `CompareDrawer`). Lower-effort alt: add KA-only sibling fields.

(b) **Image upload ALREADY EXISTS but is not wired to products.**
- Working media library: `src/app/admin/media/page.tsx` + `src/app/api/admin/media/route.ts`
  (POST writes to `public/assets/`, GET lists, DELETE removes). User likely never found it.
- **No `image` field on any specimen** — grid/editor render an SVG `Silhouette` by `sil` kind
  (`SpecimenGrid.tsx:234`, editor preview `[serial]/page.tsx:246`), not a photo.
- Work = add `image?: string` (or `images: string[]`) to specimen types → add an image
  picker/upload in the editor (reuse the media endpoint) → render `<img>` (fallback to
  Silhouette when empty) on grid, modal, dossier, detail. Upload plumbing is done, so this
  is "wire it up + render," not "build upload."

### #6 — Rethink mobile filter  ·  ~2–4 hrs  ·  MEDIUM (needs UX decision)
Current mobile filter = full-screen slide-in panel from the right (`FilterPanel.tsx` /
`RightRail`, `@media (max-width:820px)` → `position:fixed; translateX(100%→0)`), opened by a
button, closed via `RailClose` (`✕ FILTERS`). User dislikes it. Replace with a friendlier
pattern (bottom sheet / chip bar / collapsible modal) keeping all controls (tannage range,
grain, origins, weight, entry date, sort). **DECISION NEEDED:** which pattern.

### #5 — Full mobile optimization  ·  ~3–6 hrs  ·  HIGH (open-ended)
A mobile pass already happened (commit `93a3b60` "mobile optimization pass"), and components
have `@media` breakpoints + 44px tap targets + 16px inputs (anti-iOS-zoom). So this is an
**audit/polish** across all pages (landing, vault, about, journal, archive, contact, detail,
admin) at real device widths, not a from-scratch responsive build. Open-ended by nature.

---

## Bottom-line estimate
| # | Bug | Est | Risk |
|---|-----|-----|------|
| 4 | mid color | ~5 min | none |
| 7 | KA default + persist | 1–2 h | low |
| 2 | currency by lang | 1–2 h | low |
| 3 | adaptive cursor | 1–2 h | med |
| 6 | mobile filter redesign | 2–4 h | med (UX choice) |
| 1 | admin KA + photo attach | 4–7 h | high (biggest) |
| 5 | mobile optimization | 3–6 h | high (open-ended) |

**Total ≈ 12–24 focused hours ≈ 1.5–3 days.** Fast wins (#4, #7, #2) ship in one short session.

## Open decisions to confirm with user before building
1. **Local-dev authoring vs. live-site editing?** (admin writes to repo files; won't persist on serverless prod).
2. **Currency:** single base price + FX, or separate GEL/USD fields per product?
3. **Vault product i18n:** full `Record<Lang,string>` refactor, or KA-only added fields?
4. **Mobile filter:** bottom sheet vs. collapsible modal vs. chip bar?
