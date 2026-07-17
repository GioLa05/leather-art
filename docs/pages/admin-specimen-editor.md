# Admin — specimen editor — `/admin/specimens/[serial]?type=vault|landing`

**Source:** `src/app/admin/specimens/[serial]/page.tsx` · picker: `src/components/admin/ImagePicker.tsx`

## Purpose

Field-level editing of a single specimen — vault or landing, chosen by the `type` query param. This is where trilingual copy, prices, and product photos are managed.

## Vault editor panels

1. **Identity** — serial, index, category, silhouette, grid span.
2. **Material telemetry** — tannage hours, weight, grain, origin, coordinates, entry date, and **two prices**: *Price USD ($) · EN/RU* and *Price GEL (₾) · KA*.
3. **Trilingual copy** — an **EN / KA / RU tab strip**; per language: name, quote, finish, editorial. Georgian product copy is entered here.
4. **Photo** — the ImagePicker (see below).

## Landing editor panels

Identity (serial, index, silhouette, span) · Trilingual copy (name/sub/quote tabs) · Spec block (tan/grain/origin/finish/weight/edge/cert strings) · Meta pairs (add/remove key-value rows) · Photo.

## ImagePicker

- **↑ Upload** — sends the file to `/api/admin/media` (lands in `public/assets/`) and attaches it.
- **Library** — grid of everything already in `public/assets/`; click to attach.
- **Remove** — detaches the photo; the public site falls back to the line silhouette.

## Editing chrome

- **Save (⌘S)** — button or keyboard; disabled until dirty. Success/failure toasts.
- **Live preview** — sticky card showing the photo/silhouette, the name **in the currently selected language tab**, and key rows including both prices.
- **Unsaved-changes guards** on tab close and in-app back navigation.
