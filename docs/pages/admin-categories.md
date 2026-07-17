# Admin — categories — `/admin/categories`

**Source:** `src/app/admin/categories/page.tsx` · data: `src/data/categories.ts` · API: `/api/admin/categories`

## Purpose

Manage the vault's category rail: the ordered list of product categories shown on `/vault` (left rail on desktop, horizontal strip on mobile).

## Content & controls

- **Rail order panel** — one row per category: `id` (the value stored on each specimen's `cat` field), its i18n translation key (e.g. `cat.bags`), ↑/↓ reordering, and **Del** for removable rows.
- The synthetic **ALL** row (`isAll: true`) is protected: its id is locked and it cannot be deleted — it renders the "everything" filter with a `null` translation key.
- **+ Add category** appends a new row; give it a unique id and a dictionary key (add the key's EN/KA/RU values at `/admin/translations`).
- **Save** persists via ts-morph into `src/data/categories.ts`.

## Cautions

- A category's **id must match** the `cat` value on specimens; renaming an id without updating specimens orphans them from the rail (they remain reachable under ALL).
- Category display names are not free text here — they resolve through the dictionary, so all three languages stay in sync.
