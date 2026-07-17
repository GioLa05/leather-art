# Vault — `/vault`

**Source:** `src/app/vault/page.tsx`

## Purpose

The full product catalogue ("vault index"): every specimen, filterable, sortable, comparable, and openable in a quick-view modal. This is the shop floor of the site.

## Layout

Three-column desktop grid: category rail (left), results (center), filter rail (right). On mobile the rails collapse — categories become a horizontal strip, filters become a bottom sheet.

## Key features

- **Category rail** (`components/vault/CategoryRail.tsx`) — ALL / BAGS / BELTS / WALLETS / JACKETS / SMALL GOODS / ARCHIVE with per-category counts. Data: `src/data/categories.ts`.
- **View toggle** — **DOSSIER** (dense table: thumbnail, index, name, tannage, grain, origin, weight, price) and **SPECIMEN** (mosaic card grid with hover schematics). Both render photos when a specimen has one, silhouettes otherwise.
- **Filters** (`components/vault/FilterPanel.tsx`) — tannage-hours dual range, grain density, hide-origin checklist, weight band, vault-entry date band, and sort order. On ≤820px viewports the panel is a **bottom sheet**: opened from the FILTERS button, dimmed backdrop, sticky ✕ header, "SHOW RESULTS →" apply button; background scroll is locked while open.
- **Filtering** debounces with a "CALIBRATING…" flicker; the toolbar shows `NNN SHOWING / NNN SPECIMENS`.
- **Compare drawer** (`components/vault/CompareDrawer.tsx`) — the [+] on any row/card adds the specimen to a bottom drawer with up to 3 slots for side-by-side key specs.
- **Specimen modal** (`components/vault/SpecimenModal.tsx`) — quick view with gallery (photo or silhouette), full spec table, editorial, price, compare toggle, and a link to the full dossier page. Arrow keys navigate; Escape closes.
- **Prices** are language-aware: ₾ (`priceGel`) in KA, $ (`price`) in EN/RU.

## Data

`VAULT_SPECIMENS` in `src/data/specimens.ts` — trilingual name/quote/finish/editorial, numeric telemetry, both prices, optional `image`.
