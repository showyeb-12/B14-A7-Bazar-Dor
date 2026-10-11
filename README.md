# বাজার দর (BazarDor)

Practical, Bengali-focused price tracker for everyday essentials. Browse current prices, see which items rose/fell today, compare market-wise prices, and track across categories — all in a clean, responsive UI.

## Features

- **Home dashboard**: Top 6 risers (▲) and top 6 fallers (▼), plus a full product grid.
- **Category pages**: Filter by category with a price sort dropdown (default / low→high / high→low). Handles invalid categories with a friendly 404-style empty state.
- **Product details**: Price summary (min/max/avg), last day/week/month, and market-wise comparison table by division.
- **Auth**: Email/password + Google/GitHub via BetterAuth. Toast feedback on login, signup, logout and validation errors.
- **Protected routes**: `/product/[slug]` and `/profile` require login. Middleware redirects to `/signin` with a toast.
- **Profile & update**: View profile info and update display name (C3).
- **Price ticker**: Infinite marquee of today's prices with % change.
- **Bengali UI**: Bengali labels, Bongabdo (বাংলা) date and Bengali numerals throughout.
- **Responsive**: Mobile, tablet, desktop friendly with Tailwind + DaisyUI.
- **Loading states**: Skeletons across home, category, product details and auth flows.
- **Toasts**: Consistent success/error/info via react-hot-toast.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, TypeScript, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [BetterAuth](https://www.better-auth.com/) (email/password + social)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- [react-hot-toast](https://react-hot-toast.com/)
- API: `openapi.programming-hero.com/api/bazardor` (with automatic fallback)

## Getting started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm install
```

### Environment

Copy `.env.example` to `.env.local` and fill values (at minimum for auth).

```bash
cp .env.example .env.local
```

Key variables:

- `NEXT_PUBLIC_API_URL` / `NEXT_PUBLIC_API_URL_ALT` — product API
- `BETTER_AUTH_SECRET` — generate with `npx @better-auth/cli secret`
- `BETTER_AUTH_URL` — e.g. `http://localhost:3000`
- `DATABASE_URL` — local SQLite path (`./bazardor.db`) or remote DB URL
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — optional (social)
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — optional (social)

### Database (BetterAuth)

Create/migrate tables:

```bash
npm run auth:migrate
# or
npx auth migrate
```

### Run dev

```bash
npm run dev
```

Visit `http://localhost:3000`.

### Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Deployment

Works on Vercel/Netlify/Cloudflare Pages. For serverless:

1. Set all env vars (use a hosted DB e.g. Turso/Neon for `DATABASE_URL`).
2. Run migrations as part of deploy (or ahead of time).
3. `NEXT_PUBLIC_*` vars must be exposed.
4. Dynamic routes (`/product/[slug]`, `/category/[slug]`) work fine with Next.js App Router.

## Notes

- No email verification / forget password (per assignment).
- Single SQLite file in dev; swap `DATABASE_URL` + adapter if you prefer Postgres.
- Social login placeholders included — add real OAuth creds to enable.

## Credits

Data from the provided bazardor API. Built as an assignment project.