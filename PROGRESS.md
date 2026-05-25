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
