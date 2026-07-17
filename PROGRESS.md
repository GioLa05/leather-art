# LEATHER//ART Autonomous Build — Progress Log

| Phase | Sub-task | Status | Commit |
|-------|----------|--------|--------|
| 0 | Setup: branches, docs, Playwright + ts-morph + prettier + bcryptjs | done | (phase1 commit) |
| 1 | Route scan + scope (DECISIONS.md) | done | (phase1 commit) |
| 1 | `/about` page + i18n | done | (phase1 commit) |
| 1 | `/journal` page + data + i18n | done | (phase1 commit) |
| 1 | `/archive` page + i18n | done | (phase1 commit) |
| 1 | `/contact` page (fake queue + mailto) + i18n | done | (phase1 commit) |
| 1 | `/vault/[serial]` detail + modal "open dossier" link | done | (phase1 commit) |
| 1 | Nav hrefs repointed, footer link block | done | (phase1 commit) |
| 1 | Playwright: links, pages, detail, responsive (16 + 15 green) | done | (phase1 commit) |
| 1 | Production build green (9 routes) | done | (phase1 commit) |
| 2 | **BUG #1** cursor stuck hidden — `mouseleave` set opacity 0, only `mouseenter` restored it, so a stray window-leave/native-select left the cursor invisible while the pointer moved in-page. Root-cause fix: reassert opacity=1 on every `mousemove` in `Cursor.tsx`. Repro test first (red→green). | fixed | (phase2 commit) |
| 2 | **BUG #2** hero eyebrow tannage hardcoded `VEG · 28D` regardless of selected specimen. Fixed `Hero.tsx` to read the active specimen's TAN meta. | fixed | (phase2 commit) |
| 2 | Health sweep: console/hydration clean on all 7 routes × 3 langs; no broken images; marquee animates; nav routes; lang toggle switches copy; vault filter/sort/category/compare/modal/prev-next/view-toggle all pass; keyboard reaches interactive elements. | done | (phase2 commit) |
| 2 | Touch degradation (cursor hidden, mobile menu) + no overflow @390 + lang-switch preserves scroll. | done | (phase2 commit) |
| 2 | Full suite green: **57 passed**. | done | (phase2 commit) |
| 3 | Extract telemetry → src/data/telemetry.ts | done | (phase3 commit) |
| 3 | ts-morph writers + serializer + Prettier (round-trip validated) | done | (phase3 commit) |
| 3 | NextAuth credentials + middleware + per-route session guard | done | (phase3 commit) |
| 3 | Admin UI kit, shell, toasts, unsaved guard, ⌘S | done | (phase3 commit) |
| 3 | Panels: login, dashboard, specimens list + editor, categories, nav, translations, telemetry, media | done | (phase3 commit) |
| 3 | **BUG** (my own admin code): `useToast()` returned a fresh object each render → load effects re-ran every render and wiped edits. Fixed by memoizing the hook. | fixed | (phase3 commit) |
| 3 | **GOTCHA** bcrypt `$` mangled by dotenv-expand → escape as `\$`; script emits escaped line. | resolved | (phase3 commit) |
| 3 | **GOTCHA** login cookie race → `signIn(redirect:true)`. | resolved | (phase3 commit) |
| 3 | Playwright phase3: auth, category constraint, CRUD, translations — 7 green | done | (phase3 commit) |
| 3 | Full suite (all phases, sequential): **64 passed**. Data files restored by teardown; build green. | done | (phase3 commit) |
| 4 | **BUG #7 (user)** language reset to EN on every navigation — per-page `useState<Lang>('EN')`. Fixed with app-wide `LangProvider` (localStorage-persisted) mounted in the root layout; default is now **KA**. | fixed | (phase4 commit) |
| 4 | **BUG #2 (user)** currency: ₾ (`priceGel`) for KA, $ (`price`) for EN/RU via `formatPrice`; both prices per specimen, editable in admin. Removed all hardcoded `€`. | fixed | (phase4 commit) |
| 4 | **BUG #1a (user)** no Georgian for products — vault `name/quote/finish/editorial` now `Record<Lang,string>` with KA/RU content for all 16 specimens; admin vault editor gained EN/KA/RU tabs. | fixed | (phase4 commit) |
| 4 | **BUG #1b (user)** photos: `image?` on vault+landing specimens, admin ImagePicker (upload/library/remove via existing media API), cover-fit render with silhouette fallback on all public surfaces + admin previews. Upload→attach→save→render verified end-to-end. | fixed | (phase4 commit) |
| 4 | **BUG #3 (user)** cursor invisible on dark areas — white crosshair/trail + `mix-blend-mode: difference` (auto-inverts against any backdrop). | fixed | (phase4 commit) |
| 4 | **BUG #4 (user)** `--mid` `#8B6B4D` → `#5E432B` (globals.css + theme.ts). | fixed | (phase4 commit) |
| 4 | **BUG #6 (user)** mobile filter drawer → bottom sheet (backdrop, grabber, sticky ✕ header, sticky localized apply button, body-scroll lock). | fixed | (phase4 commit) |
| 4 | **BUG #5 (user)** mobile pass: dossier table refit ≤600px (no clipped price column); 0px horizontal overflow on all 7 public routes @375. | fixed | (phase4 commit) |
| 4 | **BUG** (found in audit) leaked E2E specimen `LA·017·2099` committed in `specimens.ts` — broke the suite's 16-specimen invariants. Removed. | fixed | (phase4 commit) |
| 4 | Tests: EN seeded via config `storageState` for legacy suites; new `phase4/i18n.spec.ts` (KA default, persistence across nav+reload, ₾/$ by language, bottom sheet); hydration-aware poll in translations spec. | done | (phase4 commit) |
| 4 | Docs: `docs/pages/*.md` — one file per page (7 public + 9 admin + index). | done | (phase4 commit) |
| 4 | Full suite green: **68 passed**. `tsc` clean; production build green. | done | (phase4 commit) |
