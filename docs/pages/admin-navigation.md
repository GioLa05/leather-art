# Admin — navigation — `/admin/nav`

**Source:** `src/app/admin/nav/page.tsx` · data: `src/data/nav.ts` · API: `/api/admin/nav`

## Purpose

Manage the primary navigation bar shown on every public page (desktop bar and the mobile hamburger overlay).

## Content & controls

Each nav item row exposes: display index (`01`…), the i18n translation key for its label (e.g. `nav.vault`), the `href`, and the internal `id` (used to highlight the active page). Rows can be reordered with ↑/↓, deleted, or added (**+ Add item** appends a template row to customize).

**Save** writes the array back into `src/data/nav.ts`.

## Cautions

- Labels are dictionary keys, not free text — create/edit the key's EN/KA/RU values at `/admin/translations` first.
- The `id` must match what pages pass as `activeId` to `PageShell`/`Nav` (`index`, `vault`, `archive`, `journal`, `contact`) for the active highlight to work.
- `href` should be an internal path; external links would bypass client-side navigation.
