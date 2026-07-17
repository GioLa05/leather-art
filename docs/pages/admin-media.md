# Admin — media library — `/admin/media`

**Source:** `src/app/admin/media/page.tsx` · API: `src/app/api/admin/media/route.ts`

## Purpose

Manage the image files under `public/assets/` — the pool the specimen editors' **Library** picker draws from.

## Content & controls

- **+ Upload image** — file picker; the file is POSTed as multipart form data and written to `public/assets/` under its original name.
- **Asset grid** — every image in the folder with filename and a **Delete** action (confirm dialog).

## API contract

- `GET /api/admin/media` → `{ files: [{ name, src }] }` (src is `/assets/<name>`)
- `POST` (multipart `file`) → `{ name, src }`
- `DELETE` (`{ name }`) → `{ deleted }`
- Only image extensions (`png jpg jpeg gif webp avif svg`) and safe filenames (`A-Za-z0-9._-`) are accepted — path traversal is rejected.

## Cautions

- Uploading a file with an existing name **overwrites** it.
- Deleting a file does not un-reference it from specimens; a specimen pointing at a deleted image will render a broken photo until its image is removed/changed in the editor.
- `public/assets/leather-art-logo.png` is the site logo — don't delete it.
