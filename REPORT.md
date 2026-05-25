# LEATHER//ART Autonomous Build — Report

## Executive summary

Three phases shipped on `feature/autonomous-build` (branched from the current
split-component/mobile HEAD, **never** touching `main`). Phase 1 built every
missing page so all internal links resolve, fully trilingual and in-aesthetic.
Phase 2 hunted and fixed bugs — the seeded custom-cursor disappearance plus a
hardcoded hero stat — behind a broad health suite (console/hydration, marquee,
vault interactions, keyboard, touch). Phase 3 added a brand-styled admin panel at
`/admin` that manages all content, persisting edits back to `src/data/*.ts` and
`src/i18n/translations.ts` via ts-morph + Prettier, guarded by NextAuth +
middleware. The full Playwright suite is **64 passing**; the production build is
green; `main` is untouched.

## Phase 1 — Missing pages

**Shipped:** `/about`, `/journal`, `/archive`, `/contact`, and the standalone
specimen dossier `/vault/[serial]`. Repointed the three placeholder Nav hrefs
(`#`) and added a footer link block (makes `/about` reachable). Contact uses an
on-brand "TRANSMISSION QUEUED" success state plus a real `mailto:` (no backend).

**Files added:** `src/app/{about,journal,archive,contact}/page.tsx`,
`src/app/vault/[serial]/page.tsx`, `src/components/PageShell.tsx`,
`src/components/interior/InteriorHeader.tsx`, `src/data/journal.ts`,
`src/lib/specimen-url.ts`.
**Changed:** `src/data/nav.ts`, `src/components/landing/LandingFooter.tsx`,
`src/components/vault/SpecimenModal.tsx` (link to standalone dossier),
`src/i18n/translations.ts` (EN/KA/RU for all new keys).
**Tests:** `tests/phase1/{links,pages,detail,responsive}.spec.ts`.

## Phase 2 — Bug sweep

**Bug #1 (seed) — custom cursor disappeared.** Opacity was driven only by
`mouseenter`/`mouseleave` on `document`; a stray `mouseleave` left the cursor
stuck hidden. Root-cause fix: reassert visibility on every `mousemove`
(`src/components/Cursor.tsx`). No `setTimeout`.

**Bug #2 — hero eyebrow tannage was hardcoded** `VEG · 28D` regardless of the
selected specimen. Now reads the active specimen's `TAN` meta
(`src/components/landing/Hero.tsx`).

Health sweep found nothing else: console/hydration clean on all routes ×3 langs,
images load, marquee animates, every vault interaction works, keyboard reaches
interactive elements, no overflow at 1100/820/480, touch degrades gracefully,
language switch preserves scroll.

**Tests:** `tests/phase2/{cursor,console,landing,vault,keyboard,touch-responsive,hero-eyebrow}.spec.ts`.

## Phase 3 — Admin panel (`/admin`)

A "vault operator console" (chocolate ground, bone ink) — an extension of the
brand, English-only UI.

**Panels:** login · dashboard (totals, per-category, cycle, last-edited) ·
specimens list (new / duplicate / delete / reorder / move to landing) · specimen
editor (vault + landing, EN/KA/RU tabs, live preview, ⌘S, unsaved-changes guard)
· categories (add/rename/reorder/delete with non-empty constraint) · nav ·
translations (search, add/delete keys, marquee editor) · telemetry · media
(upload/delete).

**Auth:** NextAuth v4 Credentials, JWT. `src/middleware.ts` protects `/admin/*`
(redirect to `/admin/login`) and `/api/admin/*` (401); every API handler also
re-checks the session.

**Persistence:** `src/lib/admin/writers.ts` uses **ts-morph** to replace the
exported declaration's initializer with a serialized literal
(`serialize.ts`), regenerates the `TranslationKey` union for type-safety, and
**Prettier**-formats the file. No regex edits. The round-trip was validated to
compile.

**Files added:** `src/app/admin/**`, `src/app/api/admin/**`,
`src/app/api/auth/[...nextauth]/route.ts`, `src/middleware.ts`,
`src/lib/{auth/options.ts,admin/*}`, `src/components/admin/*`,
`src/data/telemetry.ts`, `scripts/hash-password.ts`.
**Tests:** `tests/phase3/{auth,categories,crud,translations}.spec.ts`.

### Running the admin locally

1. Create `.env.local` (gitignored):
   ```
   ADMIN_USERNAME=operator
   ADMIN_PASSWORD_HASH=<escaped bcrypt hash>
   NEXTAUTH_SECRET=<random 32+ bytes>
   NEXTAUTH_URL=http://localhost:3000
   ```
2. Generate the hash (emits a ready-to-paste, `$`-escaped line):
   ```
   npm run hash-password -- 'your-passphrase'
   ```
   ⚠️ The bcrypt hash **must** keep its `$` escaped as `\$` in `.env.local` —
   Next's dotenv-expand otherwise blanks it. The script does this for you.
3. `npm run dev`, open `http://localhost:3000/admin`, sign in.

The test credentials used in CI/dev are `operator` / `specimen2099`.

## Decisions to review (highlights — full list in DECISIONS.md)

- **D0** — branched off the current HEAD, not `main` (main lacks the component
  structure the prompt assumes). `main` is untouched.
- **D3** — bcrypt `$` escaping in `.env.local` (dotenv-expand gotcha).
- **D4** — login uses `signIn(redirect:true)` to avoid a cookie race.
- **D8/D9** — test data snapshot/restore + the translation render-proof approach.
- A real bug in my own admin code (`useToast` instability) was found and fixed.

## Translations to review (placeholder KA/RU)

All new KA (Georgian) and RU (Russian) strings added in Phase 1 are plausible but
**not** native-reviewed; EN is authoritative. Namespaces: `about.*`, `journal.*`,
`archive.*`, `contact.*`, `detail.*`, `modal.dossier`, `nav.about`,
`footer.links`, plus the journal entry titles/excerpts in `src/data/journal.ts`.

## Known limitations / follow-ups

- Admin persistence relies on dev-mode file writes + HMR; it is a dev/authoring
  tool, not a production CMS. A production build serves static content.
- "Move to landing" derives a landing specimen from a vault one (lossy mapping of
  single-string → trilingual fields); review copy after moving.
- Media upload has no resizing/optimization (v1, as scoped).
- New translation keys created in the admin default their value to the key name
  across all three languages — translate them afterwards.

## Run the full test suite

```
npm test            # = npx playwright test  (auto-starts next dev; 64 tests)
```

Runs serially (`workers:1`) with a global snapshot/restore of the editable data
files, so the repo is left clean. Requires `.env.local` (above) for the Phase 3
admin tests and `npx playwright install chromium` once.

## Branches

`main` (untouched) → `feature/autonomous-build` (umbrella) with merges from
`phase/1-missing-pages`, `phase/2-bug-sweep`, `phase/3-admin-panel`. No PR to
`main` was opened. Ready for review.
