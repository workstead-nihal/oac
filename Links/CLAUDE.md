# CLAUDE CODE INSTRUCTIONS — OAC LINK HUB
# Canonical Reference: /llms.txt

Claude Code must strictly abide by the rules documented in [llms.txt](./llms.txt).

## Core Boundaries & Developer Directives

- **Primary Source File to Edit**: `src/data/links.ts`
- **UI & Layout**: LOCKED. Do not redesign, restructure, or edit components (`App.tsx`, `LinkCard.tsx`, `ParticleBackground.tsx`), CSS (`index.css`), or Tailwind configs (`tailwind.config.js`).
- **White-Label Policy**: Do NOT inject external agency or studio credits into the visible web UI or footer. UI footer must only show: `"Made with ❤️ by Odisha Anime Community"` and `"© 2020–2026 Odisha Anime Community. All rights reserved."` Engineering credits (`Crystal Studio Labs`) remain exclusively in repo source and governance files (`LICENSE`, `README.md`, `llms.txt`, etc.).
- **URL Protocol Safety**: Only `https://`, `http://`, and `mailto:` links allowed in `src/data/links.ts`.
- **Standalone Isolation**: Never modify or reference external directories or repositories.
- **Verification Command**: Run `npm run build` after modifying link data. The build must exit with status 0.

Refer to [llms.txt](./llms.txt) for the complete `LinkItem` schema, badge color palettes, and warp routing configuration.
