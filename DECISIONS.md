# LEATHER//ART Autonomous Build — Decisions Log

Every non-trivial autonomous choice is recorded here for later audit.

## D0 — Branch base
**Decision:** Created `feature/autonomous-build` off the current HEAD
(`refactor/file-structure-and-mobile`, commit 93a3b60), **not** off `main`.
**Why:** `main` contains only 14 source files — the original single-file pages.
The current branch contains the 27-file split-component + mobile-optimized
structure that this task's prompt explicitly describes (it references
`src/components/landing/Hero.tsx`, `src/components/vault/SpecimenModal.tsx`,
etc., none of which exist on `main`). Branching off `main` would have
discarded all of that work and produced a codebase inconsistent with the
prompt. The "off main" instruction is honored in spirit — `main` itself is
never touched — but the base is the real current state of the repo.

## Translations to review
KA (Georgian) and RU (Russian) strings I add are plausible translations
written without native fluency. The keys below should be reviewed by a
native speaker. (Updated as work proceeds.)

- **Phase 1, all new KA + RU keys** (`about.*`, `journal.*`, `archive.*`,
  `contact.*`, `detail.*`, `nav.about`, `footer.links`) — written as plausible
  translations, not by a native speaker. EN is authoritative. Also the journal
  entry titles/excerpts in `src/data/journal.ts` (KA/RU fields).

## Phase 1 — Missing Pages

### Route scan result
Internal routes referenced in the codebase:
- `/` — exists (`src/app/page.tsx`); linked from Nav (index) + StatusBar logo.
- `/vault` — exists (`src/app/vault/page.tsx`); linked from Nav (vault).
- Nav item `archive` → `href: '#'` (placeholder) → **missing → `/archive`**
- Nav item `journal` → `href: '#'` (placeholder) → **missing → `/journal`**
- Nav item `contact` → `href: '#'` (placeholder) → **missing → `/contact`**
- `LandingFooter` emits no links (text only).

### Phase 1 scope (decided)
1. `/archive` — archival index of redacted / `ARCHIVE_UNKNOWN` specimens.
2. `/journal` — field-notes journal index (catalogue idiom).
3. `/contact` — coordinates / hours / response-time readout + fake transmission.
4. `/vault/[serial]` — standalone specimen dossier (the non-modal version).
5. `/about` — atelier dossier with telemetry-style stats sidebar. Not currently
   linked anywhere, but the prompt names it as the first archetype. To satisfy
   "every internal link resolves", I add a footer link block
   (About / Journal / Archive / Contact) so `/about` is reachable.

**D1 — Contact form:** No backend exists and none may be added (ground rule 7).
The contact form uses client-side state to show a "TRANSMISSION QUEUED" success
readout, and also offers a real `mailto:` link as the actual channel. No data
leaves the browser. Documented per Phase 1 step 1.3.

**D2 — Nav stays 5 items.** Adding About to the top Nav would reflow the
5-column nav rhythm; instead About lives in the new footer link block. The
three placeholder Nav hrefs (`#`) are repointed to their real routes.

## Phase 2 — Bug Sweep

**Bug #1 — custom cursor stuck hidden (the seed bug).** Root cause in
`Cursor.tsx`: opacity was driven only by `document` `mouseenter`/`mouseleave`.
A `mouseleave` (leaving the window, opening a native `<select>`, devtools)
set opacity 0, and nothing restored it on subsequent in-page movement — only a
matching `mouseenter` would, which often never fired. Fix: reassert
`opacity = 1` on every `mousemove`, since the cursor tracks the pointer and any
in-page movement means it must be visible. No `setTimeout` band-aid. Window
exit still hides it (until the next move). Added `data-testid` to the cursor
elements for observability.

**Bug #2 — hero eyebrow tannage hardcoded.** `Hero.tsx` always printed
`VEG · 28D` in the eyebrow regardless of the selected specimen. Fixed to read
the active specimen's `TAN` meta value (the spec sheet beside it was already
dynamic, so this was a genuine inconsistency, not a style choice).

**No other defects found.** Console/hydration were clean on every route in all
three languages; images load; marquee animates; all vault interactions work.

**Observed but intentionally not changed:** `SpecimenModal`'s keydown
`useEffect` has no dependency array (re-binds each render). Functionally
correct, just slightly wasteful; left alone per ground rule 7 (no unrelated
refactors).

## Phase 3 — Admin Panel

**Persistence:** file-based via ts-morph + Prettier (`src/lib/admin/writers.ts`).
Each writer locates the exported declaration and replaces its initializer with a
serialized literal (`src/lib/admin/serialize.ts`), then Prettier-formats the
whole file. Translations also regenerate the `TranslationKey` union from the EN
keys so the file stays type-safe. No regex editing. GET/PUT API routes under
`src/app/api/admin/*` read the live module and write back.

**Auth:** NextAuth v4, Credentials provider, JWT sessions. `src/middleware.ts`
protects `/admin/*` (redirect to `/admin/login`) and `/api/admin/*` (401); every
API handler **also** re-checks the session (`requireAdmin`). Creds in
`.env.local` (`ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `NEXTAUTH_SECRET`).

**D3 — bcrypt hash must be `$`-escaped in .env.local.** Next's dotenv-expand
interprets `$2b$10$…` as variable interpolation and blanks the hash (even inside
single quotes). The fix is to escape each `$` as `\$`. `scripts/hash-password.ts`
now emits a ready-to-paste, escaped `ADMIN_PASSWORD_HASH=` line.

**D4 — login uses `signIn(redirect:true)`.** `redirect:false` + client navigation
raced the session-cookie commit and bounced back to login. With `redirect:true`
NextAuth sets the cookie and redirects in one server response; failures come back
as `?error=CredentialsSignin`, shown as the on-brand "TRANSMISSION REJECTED".

**D5 — rejected-login copy:** "TRANSMISSION REJECTED · CHECK CREDENTIALS".

**D6 — admin UI is English-only** (per the prompt) — keeps scope sane; the public
site stays trilingual.

**D7 — telemetry extraction:** the hardcoded `TEL_INIT` moved from
`Telemetry.tsx` to `src/data/telemetry.ts` (`TELEMETRY`) so `/admin/telemetry`
can edit it. This is the one sanctioned "refactor while here".

**D8 — test data safety:** Playwright runs serially (`workers:1`,
`fullyParallel:false`) so phases never interleave on the shared data files; a
`globalSetup`/`globalTeardown` snapshots and restores `src/data/*` +
`translations.ts` around the whole run. The CRUD test also self-restores
(create→delete). Phases sort so mutation specs (phase3) run after read-only ones.

**D9 — translation render test:** "add a key, use it via t()" is verified two
ways: a brand-new key round-trips through the file (API GET reflects it) **and**
an existing rendered key (`nav.contact`) is edited and shown changing on `/` —
proving `t()` picks up the file write. A page can't call `t()` on an arbitrary
runtime key without code, so editing a live key is the faithful render proof.

**Bug found + fixed in my own admin code:** `useToast()` returned a fresh object
each render; placed in load-effect deps it re-ran the fetch every render and
clobbered in-progress edits. Fixed by memoizing the hook's return
(`useMemo`/stable `push`). Also: new specimens get an in-range `entry` date so
they're visible under the vault's default date filter.
