# Contributing to Odisha Anime Community (OAC) Link Hub

Thank you for your interest in contributing to the **Odisha Anime Community (OAC)** Official Link Hub!

Please review these guidelines before submitting updates or creating pull requests.

---

## 🛑 Strict Scope & Permitted Contributions

This project is governed by immutable architecture rules codified in [`llms.txt`](llms.txt). Both human developers and AI coding agents (OpenAI Codex, Anthropic Claude, Google Gemini, GitHub Copilot, Cursor, etc.) must strictly observe these boundaries:

### ✅ What You MAY Contribute
1. **Adding New Links**: Add new events, forms, or initiatives to `LINK_ITEMS` in [`src/data/links.ts`](src/data/links.ts).
2. **Updating Existing Links**: Update URLs, dates, titles, subtitles, action labels, or badge tags.
3. **Featuring / Un-featuring Passes**: Toggle `isFeatured: true` or `false` on event cards in `src/data/links.ts`.
4. **Adding Image Assets**: Place new event posters, photos, or badges into [`public/images/`](public/images/).
5. **Updating Social Links**: Update the quick-action social bar items in `SOCIAL_LINKS` inside `src/data/links.ts`.

### ❌ What You MAY NOT Modify
1. **UI Architecture & Layout**: Do not alter `App.tsx`, `LinkCard.tsx`, `ProfileHero.tsx`, `ParticleBackground.tsx`, `Footer.tsx`, or `main.tsx`.
2. **Styling & Animations**: Do not modify `tailwind.config.js` design tokens, `index.css` animations, or color palettes.
3. **External Repository Independence**: Never import from, modify, or couple this repository to the main `oac` website directory.
4. **White-Label Policy**: Do not inject external studio credits or third-party service links into the visible user interface. The UI is dedicated exclusively to the Odisha Anime Community.

---

## 🛠️ Development Workflow

### Prerequisites
- Node.js 18+ (Node 20 or 22 LTS recommended)
- npm 9+

### Setup Instructions
```bash
# 1. Clone repository
git clone https://github.com/Crystal-Studio-Labs/OAC-Linktree.git
cd OAC-Linktree

# 2. Install dependencies (honoring Drive D: storage policy if on Windows)
npm install

# 3. Start development server
npm run dev

# 4. Run type check and production build
npm run build
```

---

## 📋 Link Data Schema (`LinkItem`)

When adding or updating links in [`src/data/links.ts`](src/data/links.ts), follow the TypeScript interface:

```typescript
export interface LinkItem {
  id: string;               // Unique kebab-case slug (e.g. 'ocd-tickets-2026')
  title: string;            // Card heading (e.g. 'Otaku Community Day 2026 Tickets')
  subtitle?: string;        // 1-2 sentence description
  url: string;              // Full https:// destination link
  isFeatured?: boolean;     // true = 16:9 cinematic hero banner | false = compact row card
  badge?: string;           // Pill badge label (e.g. '🔥 TICKETS LIVE', '🌟 AUDITIONS')
  badgeColor?: 'red' | 'gold' | 'emerald' | 'purple' | 'blue'; // Badge accent palette
  thumbnailUrl?: string;    // Local path in /images/ (e.g. '/images/ocd-poster.png')
  highlightGlow?: boolean;  // Pulsing gold/crimson halo aura
  actionText?: string;      // Button label (e.g. 'Book Tickets', 'Apply Now')
  iconName?: string;        // Lucide icon fallback (e.g. 'Ticket', 'Mic', 'Store')
}
```

---

## 🎨 Badge Color Standards

| Color | Recommended Use | Example Badges |
| :--- | :--- | :--- |
| `'red'` | Flagship event passes & urgent deadlines | `🔥 TICKETS LIVE`, `🤝 JOIN THE CREW` |
| `'gold'` | Stage auditions, official spotlights & website | `🌟 STAGE & AUDITIONS`, `🌐 OFFICIAL HUB` |
| `'purple'` | Special parties, Halloween, cosplay & art | `🎃 HALLOWEEN SPECIAL`, `📸 REELS & ART` |
| `'emerald'`| Vendors, merchandise stalls & active chats | `🛍️ STALLS & MERCH`, `💬 ACTIVE CHATS` |
| `'blue'` | Voice servers, Discord & gaming lounges | `🎮 VOICE & GAMING` |

---

## 📦 Pull Request Guidelines

1. **Atomic Commits**: Use conventional commit messages (`feat(links): ...`, `fix(links): ...`).
2. **Zero Errors**: Verify `npm run build` succeeds without TypeScript or bundling errors.
3. **Clean Security**: Verify `npm audit` reports `found 0 vulnerabilities`.
4. **License Agreement**: Contributions must align with the **Source-Available Restricted License** (`LICENSE`).
