# Landing — `/`

**Source:** `src/app/page.tsx`

## Purpose

The front door of LEATHER//ART: presents the six featured ("landing") specimens as a brutalist specimen-archive, sets the brand tone, and routes visitors into the vault.

## Sections (top to bottom)

1. **Status bar** (`components/StatusBar.tsx`) — fictional archive readout (clock, coordinates, batch) and the **EN / KA / RU language switcher**. Sticky.
2. **Primary nav** (`components/Nav.tsx`) — INDEX / VAULT / ARCHIVE / JOURNAL / CONTACT plus search and cart buttons. Collapses to a hamburger overlay on mobile.
3. **Hero** (`components/landing/Hero.tsx`) — the active featured specimen: display-type name, sub, script quote, photo (or line silhouette) with a scanline effect, and a material-telemetry spec sheet. A tab strip below switches between the six specimens.
4. **Marquee** (`components/landing/Marquee.tsx`) — scrolling brand taglines, localized.
5. **Specimen grid** (`components/landing/SpecimenGrid.tsx`) — the six featured pieces as cards (photo/silhouette, name, meta). Clicking a card selects it in the hero.
6. **Telemetry** (`components/landing/Telemetry.tsx`) — "live" vault readout (humidity, queue, tannage hours, hands) driven by `src/data/telemetry.ts`, editable in the admin.
7. **Footer** (`components/landing/LandingFooter.tsx`) — colophon (house, cycle, coordinates, copyright) and an index of internal links.

## Data

- `LANDING_SPECIMENS` in `src/data/specimens.ts` — trilingual name/sub/quote, spec block, meta pairs, silhouette kind, optional `image`.
- All chrome copy comes from the i18n dictionary.

## Usage notes

- The page loads in Georgian by default; the switcher choice sticks site-wide.
- Featured specimens are managed in the admin (`/admin/specimens`, "Landing" panel); a vault piece can be promoted with **→Landing**.
