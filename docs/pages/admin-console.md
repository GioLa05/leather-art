# Admin console (dashboard) — `/admin`

**Source:** `src/app/admin/page.tsx` · shell: `src/components/admin/AdminShell.tsx`

## Purpose

Landing page of the operator console: a status overview plus jump-off points to every editor.

## Content

- **Vault overview stats** — vault specimen count, landing specimen count, category count, current cycle/batch.
- **Per-category breakdown** — specimen counts for bags, belts, wallets, jackets, small goods, archive.
- **Editors** — shortcut buttons to Specimens, Categories, Navigation, Dictionary, Telemetry, and Media, with a "last edit" timestamp (from `/api/admin/stats`).

## Shell (shared by all admin pages)

- Left sidebar: 00 CONSOLE · 01 SPECIMENS · 02 CATEGORIES · 03 NAVIGATION · 04 DICTIONARY · 05 TELEMETRY · 06 MEDIA, plus **SIGN OUT** and **View site ↗**.
- Chocolate-ground "vault operator" theme (`components/admin/ui.tsx`); toasts for save results (`components/admin/Toast.tsx`).
- The admin UI itself is English-only by design; the *content* it edits is trilingual.

## Persistence model (important)

Admin saves rewrite the real source files (`src/data/*.ts`, `src/i18n/translations.ts`) via ts-morph + Prettier, and media uploads write into `public/assets/`. Run locally, edit, then commit the resulting file changes. On a read-only/serverless host the admin cannot persist.
