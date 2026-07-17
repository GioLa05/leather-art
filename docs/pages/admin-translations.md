# Admin — translations (dictionary) — `/admin/translations`

**Source:** `src/app/admin/translations/page.tsx` · data: `src/i18n/translations.ts` · API: `/api/admin/translations`

## Purpose

Edit every UI string on the public site in all three languages (EN / KA / RU), plus the scrolling marquee lines. This is the site's copy deck.

## Content & controls

- **Add key** — create a new `namespace.key` entry (then fill its three values).
- **Dictionary panel** — searchable list of all keys (~178). Each key shows three inputs — EN, KA, RU — and a DELETE action.
- **Marquee tab** — per-language editing of the landing marquee lines.
- **Save** rewrites `src/i18n/translations.ts`: the `I18N` dictionary, the `MARQUEE` arrays, **and the `TranslationKey` union type**, regenerated from the EN key set so the file stays type-safe.

## Cautions

- Deleting a key that components reference falls back to the EN value or the raw key string at runtime (`t()` fallback), and will fail the type-check at build time — prefer editing values over deleting keys.
- Product copy (names, quotes, editorials) is **not** here — that's per-specimen in the [specimen editor](admin-specimen-editor.md). This page is for interface strings.
