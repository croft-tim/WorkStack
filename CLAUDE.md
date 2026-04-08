# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start both client (port 5173) and server (port 3000) concurrently
npm test             # Run tests in watch mode
npm test -- --run    # Run tests once (CI mode)
npm run lint         # Lint all JS/TS/JSX/TSX files
npm run format       # Format all JS/TS/JSX/TSX files with Prettier
npm run knex migrate:latest   # Run database migrations
npm run knex seed:run         # Run database seeds
npm run build        # Build client (Vite) and server (esbuild) for production
npm start            # Start production server (requires build first)
```

## Architecture

This is a fullstack TypeScript app with a React frontend and Express backend. The dev setup runs two separate servers — Vite proxies `/api` requests to Express at port 3000.

**Request flow:** React component → `client/hooks/` (TanStack Query) → `client/apis/` (superagent HTTP) → Express route (`server/routes/`) → DB function (`server/db/`) → SQLite via Knex

**Key patterns:**
- Data fetching uses TanStack Query. Custom hooks live in `client/hooks/` and wrap `client/apis/` functions. `useFruitsMutation` is the shared mutation wrapper that auto-invalidates the `fruits` query key on success.
- Server routes import from `server/db/` (never call Knex directly in routes). DB functions use the shared `server/db/connection.ts` instance.
- Auth0 JWT validation is done via `checkJwt` middleware from `server/auth0.ts`. Protected routes pass `checkJwt` as middleware and cast `req` to `JwtRequest` to access `req.auth?.sub`.
- Shared TypeScript types between client and server live in `models/`.
- Knex uses SQLite: `dev.sqlite3` for development, `:memory:` for tests (with migrations/seeds auto-applied), `/app/storage/prod.sqlite3` for production.

**Auth0 setup (not yet configured):** Set `domain`, `clientId`, `audience` in `client/index.tsx` and `domain`/`audience` in `server/auth0.ts`.

## Testing

Tests use Vitest + React Testing Library. The test environment uses an in-memory SQLite database (see `knexfile.js` test config), so tests that touch the DB must run migrations first.

Run a single test file:
```bash
npm test -- path/to/file.test.ts
```
