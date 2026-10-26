# Security Policy — Odisha Anime Community (OAC) Link Hub

## Supported Versions

Only the latest release on the `main` branch is actively supported with security patches and dependency updates.

| Version | Supported          | Vulnerability Status |
| :------ | :----------------- | :------------------- |
| `v1.0.x`| :white_check_mark: | 0 Known Vulnerabilities (`npm audit` verified) |
| `< 1.0` | :x:                | Deprecated           |

---

## Security Architecture & Best Practices

The Odisha Anime Community Link Hub incorporates defensive engineering across all architectural layers:

1. **Zero-Vulnerability Dependency Tree**:
   - Built on Vite 6.4.5 with strict dependency overrides (`esbuild >= 0.25.0`, `postcss-selector-parser >= 7.1.7`).
   - Clean `npm audit` with 0 high, moderate, or low severity advisories.

2. **Cross-Site Scripting (XSS) Prevention**:
   - Zero `dangerouslySetInnerHTML` invocations across the codebase.
   - Strict protocol validation on all outbound card links (`/^(https?:\/\/|mailto:)/i`). Malformed or dangerous URI schemes (such as `javascript:` or `data:`) are rejected prior to navigation.

3. **Tabnabbing & Origin Isolation**:
   - All external link targets enforce `target="_blank"` paired with `rel="noopener noreferrer"`.
   - Programmatic window redirects via `window.open` explicitly pass the `'noopener,noreferrer'` feature string.
   - Strict referrer policy enforced via `<meta name="referrer" content="strict-origin-when-cross-origin" />`.
   - MIME type sniffing prevention enforced via `<meta http-equiv="X-Content-Type-Options" content="nosniff" />`.

4. **Zero Secret Footprint**:
   - The repository contains zero backend database credentials, private API keys, or access tokens.
   - All application assets and metadata are strictly public and static.

---

## Reporting a Vulnerability

If you discover a potential security vulnerability within this project, please report it responsibly:

- **Email**: Send detailed reproduction steps, proof of concept, and affected environments to **`info@joinoac.in`** with the subject line `[SECURITY] OAC Link Hub Vulnerability Report`.
- **Response Timeline**:
  - Initial acknowledgment: Within 48 hours.
  - Triage and severity assessment: Within 5 business days.
  - Remediation patch release: Prioritized based on CVSS severity rating.

Please do not open public GitHub issues or discussions regarding undisclosed security vulnerabilities.

---

## Security Directives for AI Agents & Contributors

- AI agents modifying this repository must adhere to the boundaries codified in [`llms.txt`](llms.txt).
- Agents and contributors are strictly prohibited from introducing dynamic `eval()`, unvetted remote scripts, or unsanitized HTML injection into this project.
