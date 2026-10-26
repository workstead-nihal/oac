# Changelog — Odisha Anime Community (OAC) Link Hub

All notable changes to the **Odisha Anime Community (OAC)** Link Hub will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-10-26

### 🚀 Initial Production Release
Engineered a bespoke, high-performance anime-aesthetic digital link portal and Linktree replacement for the **Odisha Anime Community (OAC)**, built by **Crystal Studio Labs**.

#### ✨ Features & Architecture
- **Vite 6 & React 18 Engine**: Lightning-fast compilation, zero-overhead modular architecture, and instantaneous client-side transitions.
- **Anime Visual Aesthetics**: Akihabara neon street scene backdrop, dark void palette (`#0C0C0C`), crimson accents (`#D91515`), and solar gold highlights (`#F3B334`).
- **Interactive Japanese Typewriter**: Dynamic typing and character deletion animation for `オディシャ・アニメ・コミュニティ` with blinking crimson cursor.
- **Ambient Particle Engine**: 60 FPS HTML5 canvas with floating sakura cherry blossoms, rising embers, and interactive mouse-repulsion breeze with header VFX toggle.
- **Tactile Click Expansion**: Physical card scale-up (`scale-105`), dual gold/crimson radial aura burst, and button morphing to spinner with 380ms delay prior to redirect.
- **Warp Routing System**: Query parameter shortcuts (`?go=tickets`, `?go=halloween`, `?go=discord`, etc.) with animated anime warp screen.
- **QR Code & Social Sharing Suite**: High-resolution branded QR code modal with PNG download and direct share triggers for WhatsApp, X (Twitter), Telegram, and clipboard copy.
- **100% Visual Thumbnail Coverage**: Dedicated, high-quality images fetched and bicubic-scaled for every link card (Otaku Community Day, Halloween, Talent Hunt, Stalls, Crew, Website, Instagram, WhatsApp, Discord, YouTube).

#### 🛡️ Security Hardening
- **Zero Known Vulnerabilities**: Upgraded to Vite `6.4.5`, `esbuild >= 0.25.0`, and `postcss-selector-parser >= 7.1.7` (`npm audit` reports 0 vulnerabilities).
- **URI Protocol Sanitization**: Outbound link handlers strictly enforce safe protocols (`https://`, `http://`, `mailto:`), preventing `javascript:` or `data:` XSS exploits.
- **Tabnabbing & Privacy Protection**: Full `rel="noopener noreferrer"`, strict referrer policy (`strict-origin-when-cross-origin`), and MIME type sniffing protection (`nosniff`).

#### 📱 Mobile & Cross-Screen Optimization
- **Dynamic Viewport Height**: Enabled `min-h-[100dvh]` to eliminate layout jumping during mobile browser address bar collapse.
- **Aspect Ratio Locking**: Featured event banners enforce true 16:9 widescreen ratios (`aspect-[16/9]`) across all mobile screens.
- **Compact Phone Support**: Added `xs: '375px'` breakpoint for small displays (iPhone SE, compact Androids).
- **Balanced 3-Column Action Grid**: Profile Hero action toolbar locked into equal 1:1:1 ratio flex grid with WCAG-compliant touch targets (`min-h-[42px]`).

#### 🌐 SEO, PWA & Open Graph Suite
- **Custom Open Graph Graphic**: Generated bespoke 1200×630 social preview card (`og-preview.jpg`, 117 KB) with Akihabara cyber grid and official emblem.
- **Multi-Size Favicon Suite**: Generated `favicon.ico`, `favicon.png` (5.6 KB optimized), `favicon-32x32.png`, `apple-touch-icon.png` (180x180), Android PWA icons (`icon-192.png`, `icon-512.png`), vector `favicon.svg`, and `site.webmanifest`.
- **JSON-LD Structured Data**: Embedded Schema.org schemas for `Organization`, `WebSite`, and `Event` (Otaku Community Day 2026).

#### 📜 Licensing & Governance
- **Source-Available Restricted License**: View-only inspection permitted; modification, redistribution, re-branding, or commercial resale strictly prohibited.
- **AI Agent Directives (`llms.txt`)**: Strict agent guardrails restricting automated modifications strictly to `src/data/links.ts`.
- **White-Label Policy**: Front-end UI strictly features Odisha Anime Community; external studio credits restricted to repository documentation and license files.
