# Admin — telemetry — `/admin/telemetry`

**Source:** `src/app/admin/telemetry/page.tsx` · data: `src/data/telemetry.ts` · API: `/api/admin/telemetry`

## Purpose

Configure the "live readout from the vault" section on the landing page — the four animated stat tiles (vault humidity, hides in queue, average tannage hours, hands at the bench).

## Content & controls

One panel per telemetry item, exposing its numeric configuration:

- **Value** — the base number displayed.
- **Unit** — suffix string (e.g. `%`, `hrs`).
- **Drift lo / hi** — the band within which the public site randomly "drifts" the value to feel live.
- **Bar from / to** — the progress-bar fill range.
- **Integer** — whether drift rounds to whole numbers.

**Save** writes back into `src/data/telemetry.ts`.

## Notes

The tile labels and sublabels are dictionary keys (`telemetry.*`) edited at `/admin/translations`; this page only owns the numbers.
