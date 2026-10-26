# AGENT INSTRUCTIONS — OAC LINK HUB
# Canonical Reference: /llms.txt

This repository is governed by the rules defined in [llms.txt](./llms.txt). All AI coding agents, autonomous agents, and assistants must adhere to the following strict boundaries:

## 🛑 Immutable Golden Rules

1. **Architecture & Styling Lock**:
   - Never alter the visual design, dark cyber-grid theme, Tailwind configuration (`tailwind.config.js`), CSS (`src/index.css`), animations (`ParticleBackground.tsx`), or component structure (`App.tsx`, `main.tsx`).
   - The UI engineered by Crystal Studio Labs is finalized and performance-tuned.

2. **White-Label Front-End UI**:
   - The user interface must NEVER display external developer, agency, or studio credits.
   - Footer text must strictly remain:
     - `"Made with ❤️ by Odisha Anime Community"`
     - `"© 2020–2026 Odisha Anime Community. All rights reserved."`
   - Engineering attribution (`Crystal Studio Labs`) and copyright belong solely in repository source files (`LICENSE`, `README.md`, `llms.txt`, `llm.txt`, `package.json`, `SECURITY.md`, `CONTRIBUTING.md`).

3. **Permitted Scope**:
   - Agents may ONLY modify `src/data/links.ts` (links, categories, badges, and social channels) and add image assets into `public/images/`.

4. **URL Protocol Safety**:
   - Every outbound URL must strictly start with `https://`, `http://`, or `mailto:`. Never accept or insert `javascript:`, `data:`, or unvetted pseudo-protocols.

5. **Standalone Project Isolation**:
   - Never reference or touch any external project or directory.

6. **Mandatory Verification**:
   - After any change, run `npm run build`. The build must exit with status code 0.

7. **Primary Workspace & Update Precedence**:
   - `oac/Links` is the PRIMARY source of truth. All future updates must be made in `oac/Links` first, verified with `node scripts/publish-links.mjs`, and then mirrored to `OAC-Linktree`.

For full schemas, badge color standards, warp routing, and featured card options, read [llms.txt](./llms.txt).
