# Journal — `/journal`

**Source:** `src/app/journal/page.tsx` · data: `src/data/journal.ts`

## Purpose

Field notes from the bench — tannage logs, material studies, and dispatches from the vault. Editorial/SEO surface for the brand.

## Content

- **Interior header** — tag ("Field notes"), title, lede.
- **Entry list** — each `JournalEntry` renders as a card with: entry number, date (2099-cycle fiction), read time, trilingual title, trilingual excerpt, a FIELD NOTE label, and a "READ ENTRY →" affordance.

## Data shape

```ts
interface JournalEntry {
  id: string;        // slug, e.g. 'pit-014'
  num: string;       // '01'
  date: string;      // '2099.03.02'
  read: string;      // '6 MIN'
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
}
```

## Notes

- Entries are authored directly in `src/data/journal.ts` (not yet editable from the admin).
- Full article pages do not exist yet — "READ ENTRY" is presentational.
