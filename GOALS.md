# LEATHER//ART Autonomous Build — Goal Tree

## Phase 1 — Missing Pages  [status: done]
- [x] 1.1 Scan codebase for all internal routes
- [x] 1.2 Cross-reference against app/ to find missing routes (scope in DECISIONS.md)
- [x] 1.3 Build About page (`/about`)
    - [x] EN/KA/RU strings added
    - [x] Mobile layout verified at 480/820/1100 (responsive spec)
    - [x] Playwright spec
- [x] 1.4 Build Journal page (`/journal`)
    - [x] EN/KA/RU strings added
    - [x] Playwright spec
- [x] 1.5 Build Archive page (`/archive`)
    - [x] EN/KA/RU strings added
    - [x] Playwright spec
- [x] 1.6 Build Contact page (`/contact`) — fake "TRANSMISSION QUEUED" + mailto
    - [x] EN/KA/RU strings added
    - [x] Playwright spec
- [x] 1.7 Build Specimen detail page (`/vault/[serial]`)
    - [x] EN/KA/RU strings added
    - [x] prev/next + back-to-vault nav
    - [x] Playwright spec (vault → modal → dossier link → detail)
- [x] 1.8 Link crawler spec (Nav + footer → 200 + h1)
- [x] 1.9 Merge to feature/autonomous-build

## Phase 2 — Bug Sweep  [status: done]
- [x] 2.1 Reproduce + fix cursor-loss bug (root cause: opacity desync; fixed by
      reasserting visibility on mousemove. cursor.spec.ts)
- [x] 2.2 General health Playwright suite (marquee, nav routing, lang toggle,
      images, console/hydration, vault interactions, keyboard)
- [x] 2.3 Fix every failure / console error — found 2 bugs (cursor, hero eyebrow);
      console clean across all routes/langs (logged in PROGRESS.md)
- [x] 2.4 Responsive 1100/820/480 + touch degradation + lang-switch scroll checks
- [x] 2.5 Merge to feature/autonomous-build

## Phase 3 — Admin Panel  [status: done]
- [x] 3.1 /admin/login (branded, "TRANSMISSION REJECTED" error)
- [x] 3.2 /admin dashboard (totals, per-category, cycle, last-edited, links)
- [x] 3.3 /admin/specimens list (vault+landing, new/dup/delete/reorder/move)
- [x] 3.4 /admin/specimens/[serial] editor (vault + landing, trilingual tabs, live preview, ⌘S, unsaved guard)
- [x] 3.5 /admin/categories (add/rename/reorder/delete + non-empty constraint)
- [x] 3.6 /admin/nav
- [x] 3.7 /admin/translations (dictionary + search + add/delete + marquee editor)
- [x] 3.8 /admin/telemetry (extracted src/data/telemetry.ts)
- [x] 3.9 /admin/media (list/upload/delete)
- [x] 3.10 Auth (NextAuth credentials) + middleware + API guards (re-checked server-side)
- [x] 3.11 ts-morph writers + Prettier (round-trip validated)
- [x] 3.12 Playwright (login, middleware/401, CRUD, translation, category constraint) — 7 green
- [x] 3.13 Merge to feature/autonomous-build

## Final
- [x] F.1 Full suite green on feature/autonomous-build (64 passed)
- [x] F.2 Verify main untouched (still at 1c63909, 14 src files)
- [x] F.3 REPORT.md
- [x] F.4 Push all branches (no PR to main)

## Notes / Blockers
- D0: branched off the current HEAD (split/mobile structure), not bare `main`,
  because `main` lacks the component structure this prompt describes. `main`
  itself is never modified. (See DECISIONS.md.)
- KA/RU strings for all new keys are plausible, non-native translations — listed
  in DECISIONS.md "translations to review" and REPORT.md.
- `.env.local` is required for the admin (gitignored). Setup in REPORT.md.
