# Page Documentation — LEATHER//ART

One file per page. Public site first, then the admin console.

## Public site

| Route | Doc |
|---|---|
| `/` | [landing.md](landing.md) |
| `/vault` | [vault.md](vault.md) |
| `/vault/[serial]` | [specimen-detail.md](specimen-detail.md) |
| `/about` | [about.md](about.md) |
| `/journal` | [journal.md](journal.md) |
| `/archive` | [archive.md](archive.md) |
| `/contact` | [contact.md](contact.md) |

## Admin console (`/admin`, login required)

| Route | Doc |
|---|---|
| `/admin/login` | [admin-login.md](admin-login.md) |
| `/admin` | [admin-console.md](admin-console.md) |
| `/admin/specimens` | [admin-specimens.md](admin-specimens.md) |
| `/admin/specimens/[serial]` | [admin-specimen-editor.md](admin-specimen-editor.md) |
| `/admin/categories` | [admin-categories.md](admin-categories.md) |
| `/admin/nav` | [admin-navigation.md](admin-navigation.md) |
| `/admin/translations` | [admin-translations.md](admin-translations.md) |
| `/admin/telemetry` | [admin-telemetry.md](admin-telemetry.md) |
| `/admin/media` | [admin-media.md](admin-media.md) |

## Shared concepts

- **Language** — the whole site is trilingual (Georgian **KA** — the default, English **EN**, Russian **RU**). The choice is made in the status bar, stored in `localStorage` (`leather-art.lang`), and survives navigation and reloads. Implementation: `src/i18n/LangContext.tsx` + dictionary in `src/i18n/translations.ts`.
- **Currency** — prices follow the language: **₾ (lari)** in KA, **$ (USD)** in EN/RU. Each specimen stores both `priceGel` and `price`. Implementation: `src/lib/price.ts`.
- **Persistence model** — the admin writes edits **back into the TypeScript data files** (`src/data/*.ts`, `src/i18n/translations.ts`) via ts-morph, and uploads images into `public/assets/`. This is a local-authoring workflow: run the site locally, edit in the admin, commit the changed files. On a serverless deploy the admin cannot persist.
- **Custom cursor** — a crosshair + trailing square that blends with `mix-blend-mode: difference`, so it stays visible over both dark and light areas. Hidden on touch devices.
