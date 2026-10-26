# GitHub Copilot Instructions — OAC Link Hub
Canonical specification: [/llms.txt](../llms.txt)

When generating code, suggestions, or reviewing changes in this repository:

1. **Permitted Scope**:
   - Only modify `src/data/links.ts` for link/social additions, edits, or re-ordering.
   - Do NOT redesign or modify UI components, animations, styles (`index.css`), or Tailwind configuration (`tailwind.config.js`).

2. **White-Label UI Policy**:
   - The visible web UI is white-labeled for Odisha Anime Community. Never add external studio or developer branding to UI components or the footer.
   - Engineering attribution (`Crystal Studio Labs`) is strictly confined to repo source files (`LICENSE`, `README.md`, `llms.txt`, `package.json`, etc.).

3. **URL Security**:
   - URLs in `src/data/links.ts` must use `https://`, `http://`, or `mailto:`. Prohibit `javascript:` or `data:` URIs.

4. **Verification**:
   - Verify all TypeScript and asset references by running `npm run build`.

For full details and `LinkItem` schema, see [llms.txt](../llms.txt).
