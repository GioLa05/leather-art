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

## Phase 2 — Bug Sweep  [status: pending]
- [ ] 2.1 Reproduce + fix cursor-loss bug
- [ ] 2.2 General health Playwright suite
- [ ] 2.3 Fix every failure / console error
- [ ] 2.4 Responsive + touch + lang-switch checks
- [ ] 2.5 Merge to feature/autonomous-build

## Phase 3 — Admin Panel  [status: pending]
- [ ] 3.1 /admin/login
- [ ] 3.2 /admin dashboard
- [ ] 3.3 /admin/specimens list
- [ ] 3.4 /admin/specimens/[serial] editor
- [ ] 3.5 /admin/categories
- [ ] 3.6 /admin/nav
- [ ] 3.7 /admin/translations
- [ ] 3.8 /admin/telemetry (extract src/data/telemetry.ts)
- [ ] 3.9 /admin/media
- [ ] 3.10 Auth (NextAuth credentials) + middleware + API guards
- [ ] 3.11 ts-morph writers + Prettier
- [ ] 3.12 Playwright (login, middleware, CRUD, translation, category constraint)
- [ ] 3.13 Merge to feature/autonomous-build

## Final
- [ ] F.1 Full suite green on feature/autonomous-build
- [ ] F.2 Verify main untouched
- [ ] F.3 REPORT.md
- [ ] F.4 Push all branches (no PR to main)

## Notes / Blockers
- (none yet)
