# Archive — `/archive`

**Source:** `src/app/archive/page.tsx`

## Purpose

The redacted index: specimens filed without provenance (`origin: 'ARCHIVE_UNKNOWN'` in the vault data). A lore-driven collection page for pieces with incomplete documentation.

## Content

- **Interior header** — tag ("Redacted index"), title, lede.
- **Count** — number of filed specimens.
- **Card grid** — one card per redacted specimen: photo (or silhouette) frame, serial, trilingual name, an "ORIGIN REDACTED" stamp, and the (obscured `??.??/??.??`) coordinates. Each card links to the specimen's full dossier at `/vault/[serial]`.
- **Empty state** — "ARCHIVE SEALED" when no specimen carries the ARCHIVE_UNKNOWN origin.

## Notes

- Membership is derived from `VAULT_SPECIMENS` — set a specimen's origin to `ARCHIVE_UNKNOWN` in the admin editor and it appears here automatically.
- Wrapped in `PageShell`; fully localized.
