# Specimen detail — `/vault/[serial]`

**Source:** `src/app/vault/[serial]/page.tsx`

## Purpose

The full dossier for a single specimen — the product page. Linked from the vault modal ("OPEN FULL DOSSIER →") and from archive cards.

## URL scheme

Serials use middots (`LA·004·2099`); URLs use dashes (`/vault/LA-004-2099`). Mapping helpers live in `src/lib/specimen-url.ts`. An unknown serial renders a "SPECIMEN NOT ON RECORD" state with a link back to the vault.

## Content

- **Back link** to `/vault`.
- **Frame** — the specimen photo (cover-fit) when one is attached, otherwise the line silhouette; overlaid with index and coordinate stamps.
- **Dossier** — eyebrow (index + serial), display-type name, script quote, a material-telemetry table (tannage, hours, grain, origin, weight, coordinates, batch, finish, entry), and the editorial paragraph.
- **Foot** — language-aware price (₾ in KA, $ in EN/RU) and a REQUEST SPECIMEN call-to-action.
- **Prev / next** — wrap-around navigation through the vault in index order.

## Notes

- Wrapped in `PageShell`, so it inherits the status bar, nav, cursor, and language context. The footer is shown here as well.
- All copy fields (name, quote, finish, editorial) are trilingual and render in the active language.
