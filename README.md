# Odisha Anime Community

React, TypeScript and Vite website for OAC.

## Development

1. Install Node.js 22 or later.
2. Run `npm ci`.
3. Copy `.env.example` to `.env` and fill in your Supabase project URL and public anon key. Never use a service-role key in this frontend.
4. Apply `supabase/migrations/20261009115416_create_join_requests_table.sql` to your Supabase database.
5. Run `npm run dev`.

The site can load without Supabase configuration, but form submissions require it.

## Checks and production build

Run `npm run lint`, `npm run typecheck`, and `npm run build`.
Run `npm run preview` to preview the production build locally.
