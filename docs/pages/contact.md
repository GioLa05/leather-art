# Contact — `/contact`

**Source:** `src/app/contact/page.tsx`

## Purpose

Commissions, archive inquiries, and press ("Make contact"). Collects a message and hands it off to the visitor's mail client.

## Content

- **Interior header** — tag ("Transmission"), title, lede.
- **Info block** — coordinates, bench hours (TUE–SAT · 10:00–18:00 UTC+4), response time (≈48h), and a direct-channel mail link.
- **Form** ("Queue a transmission") — name, return address (email), and message fields. Submitting builds a **`mailto:`** URL with the form contents and opens it; the UI then shows a "TRANSMISSION QUEUED" confirmation with a reset action.

## Notes

- There is no server-side message store — delivery is via the visitor's own email client (deliberate: the site has no backend beyond the local admin).
- Fully localized via `contact.*` dictionary keys; wrapped in `PageShell`.
