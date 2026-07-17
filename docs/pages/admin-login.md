# Admin login — `/admin/login`

**Source:** `src/app/admin/login/page.tsx` · auth: `src/lib/auth/options.ts`, `src/middleware.ts`

## Purpose

Gate for the operator console. All `/admin/**` pages and `/api/admin/**` routes require a session; unauthenticated visits redirect here.

## How it works

- **NextAuth credentials provider** — a single operator account. The username and a bcrypt hash of the passphrase live in `.env.local`:
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD_HASH` (generate with `npm run hash-password`)
  - `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- **Middleware** blocks unauthenticated page access at the edge; every mutation API re-checks the session server-side (`requireAdmin` in `src/lib/admin/api.ts`) as defense in depth.

## UI

"SIGN IN." panel with OPERATOR and PASSPHRASE fields and an AUTHENTICATE → button. Invalid credentials show an inline error; success redirects to `/admin`.
