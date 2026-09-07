# About / Atelier — `/about`

**Source:** `src/app/about/page.tsx`

## Purpose

The atelier's story page ("ATELIER" in the nav): who makes the goods, how, and under what principles.

## Content

- **Interior header** (`components/interior/InteriorHeader.tsx`) — section number, tag ("Atelier dossier"), display title, and lede describing the single-bench Tbilisi atelier.
- **Body copy** — two paragraphs on the slow tannage process and the archive-as-record philosophy.
- **Atelier readout** — four stats with sublabels: founding cycle (MMXCI), specimens catalogued (247), pieces per edition (84), artisans at the bench (04).
- **Principles** — three key/value pairs: TANNAGE, EDITION, RECORD.

## Notes

- Fully translated; every string comes from `about.*` keys in the i18n dictionary, editable at `/admin/translations`.
- Wrapped in `PageShell` (status bar, nav, cursor, footer, language context).
