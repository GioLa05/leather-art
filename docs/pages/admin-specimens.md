# Admin — specimens list — `/admin/specimens`

**Source:** `src/app/admin/specimens/page.tsx` · API: `src/app/api/admin/specimens/route.ts`

## Purpose

Manage the two specimen collections: the **vault** catalogue (all products) and the **landing** set (the six featured pieces). Row-level operations here; field editing happens in the [specimen editor](admin-specimen-editor.md).

## Vault panel

Each row shows index, EN name, serial + category, **both prices (`$USD · ₾GEL`)**, and tannage hours. Actions:

- **↑ / ↓** — reorder (re-numbers display indexes sequentially).
- **Dup** — duplicate with the next free serial and "(COPY)" name suffixes in all three languages.
- **→Landing** — promote a vault piece to the landing set (derives the landing record from the vault fields, carries the photo along, and removes it from the vault).
- **Del** — delete after a confirm dialog.
- **+ New specimen** — creates a trilingual blank (EN/KA/RU names prefilled, both prices at 0, entry date inside the vault's default filter band so it is immediately visible on `/vault`) and opens it in the editor.

## Landing panel

Lists the featured pieces with an **Edit** action.

## Validation

The PUT API rejects duplicate serials (`400 duplicate serial`).
