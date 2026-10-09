# Odisha Anime Community

React, TypeScript and Vite website for OAC.

## Development

1. Install Node.js 22 or later.
2. Run `npm ci`.
3. Copy `.env.example` to `.env` and fill in `VITE_FORMS_ENDPOINT` with your Cloudflare Worker `/submit` URL.
4. Follow [form setup](integrations/google-sheets/README.md) to configure the Worker and Google Sheet.
5. Run `npm run dev`.

The site can load without a forms endpoint, but submissions require a configured Worker.

## Google Sheets sync

See [activation steps](integrations/google-sheets/README.md) to save
submissions into one spreadsheet with Members, Partners, Stalls, and Creators tabs.
Member applications require a phone number.

## Checks and production build

Run `npm run lint`, `npm run typecheck`, and `npm run build`.
Run `npm run preview` to preview the production build locally.
