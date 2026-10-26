import { useEffect, useRef, useState } from 'react';

/**
 * Halloween Season Expiry Timestamp:
 * Automatically expires at the conclusion of Halloween Day (October 31, 2026, 23:59:59 IST).
 * Once this timestamp passes, this component renders null and completely unmounts from the DOM.
 */
export const HALLOWEEN_EXPIRY = new Date('2026-10-31T23:59:59+05:30').getTime();

export function isHalloweenSeason(): boolean {
  if (typeof window === 'undefined') return false;
  // Allows testing via ?preview=halloween query parameter
  const hasPreviewParam = window.location.search.includes('preview=halloween');
  return Date.now() <= HALLOWEEN_EXPIRY || hasPreviewParam;
}

interface Bat {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  flapSpeed: number;
  flapOffset: number;
  glideTimer: number;
  glowColor: string;
}

interface Hitodama {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swaySpeed: number;
  swayDistance: number;
  swayOffset: number;
  innerColor: string;
  outerColor: string;
  alpha: number;
  type: 'flame' | 'ghost';
}

export default function HalloweenEffect() {
  const [active, setActive] = useState(() => isHalloweenSeason());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Self-expiring timer: automatically unmounts immediately when Halloween ends
  useEffect(() => {
    if (!isHalloweenSeason()) {
      setActive(false);
      return;
    }

    const remainingMs = HALLOWEEN_EXPIRY - Date.now();
    if (remainingMs > 0 && !window.location.search.includes('preview=halloween')) {
      const timer = setTimeout(() => {
        setActive(false);
      }, remainingMs);
      return () => clearTimeout(timer);
    }
  }, []);

  // Canvas VFX Loop for Flying Bats and Anime Ghost Flames (Hitodama)
  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for interactive breeze/bat scattering
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Flying Bats (4-6 bats swooping across the sky)
    const batCount = width < 640 ? 3 : 5;
    const bats: Bat[] = [];
    const batGlows = ['rgba(255, 117, 24, 0.4)', 'rgba(168, 85, 247, 0.4)', 'rgba(217, 21, 21, 0.4)'];

    for (let i = 0; i < batCount; i++) {
      const movingRight = Math.random() > 0.5;
      bats.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.7),
        vx: (movingRight ? 1 : -1) * (Math.random() * 1.4 + 1.1),
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 0.4 + 0.75, // Scale multiplier
        flapSpeed: Math.random() * 0.08 + 0.16,
        flapOffset: Math.random() * Math.PI * 2,
        glideTimer: Math.random() * 200,
        glowColor: batGlows[Math.floor(Math.random() * batGlows.length)],
      });
    }

    // Initialize Japanese Hitodama / Anime Ghost Flames (ひとだま)
    const hitodamaCount = Math.min(Math.floor(width / 38), 16);
    const hitodamas: Hitodama[] = [];

    const flamePalettes = [
      { inner: '#FFD166', outer: '#FF6B00' }, // Jack-o'-Lantern Amber
      { inner: '#E0AAFF', outer: '#9D4EDD' }, // Spectral Violet
      { inner: '#FFAAA6', outer: '#D91515' }, // Blood Crimson
      { inner: '#A0E7E5', outer: '#00B4D8' }, // Phosphorescent Wisp
    ];

    for (let i = 0; i < hitodamaCount; i++) {
      const palette = flamePalettes[Math.floor(Math.random() * flamePalettes.length)];
      const isGhost = Math.random() > 0.75;

      hitodamas.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isGhost ? Math.random() * 6 + 10 : Math.random() * 5 + 6,
        speedY: -(Math.random() * 0.7 + 0.35),
        swaySpeed: Math.random() * 0.02 + 0.015,
        swayDistance: Math.random() * 20 + 8,
        swayOffset: Math.random() * 100,
        innerColor: palette.inner,
        outerColor: palette.outer,
        alpha: Math.random() * 0.35 + 0.25,
        type: isGhost ? 'ghost' : 'flame',
      });
    }

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      // Skip heavy animation if user requested reduced motion
      if (prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // --- 1. RENDER HITODAMA (ANIME GHOST FIRE / SPIRITS) ---
      hitodamas.forEach((h) => {
        const sway = Math.sin(tick * h.swaySpeed + h.swayOffset) * 0.6;
        h.x += sway;
        h.y += h.speedY;

        // Subtle interactive mouse repulsion
        const dx = h.x - mouseX;
        const dy = h.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90 && dist > 0) {
          const force = (90 - dist) / 90;
          h.x += (dx / dist) * force * 1.8;
          h.y += (dy / dist) * force * 1.8;
        }

        // Boundary wrapping: reset to bottom
        if (h.y < -30) {
          h.y = height + 20;
          h.x = Math.random() * width;
        }
        if (h.x < -20) h.x = width + 20;
        if (h.x > width + 20) h.x = -20;

        ctx.save();
        ctx.translate(h.x, h.y);

        if (h.type === 'flame') {
          // Teardrop Japanese anime ghost fire (Hitodama)
          const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, h.size * 2);
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(0.35, h.innerColor);
          grad.addColorStop(0.75, h.outerColor);
          grad.addColorStop(1, 'transparent');

          ctx.fillStyle = grad;
          ctx.shadowColor = h.outerColor;
          ctx.shadowBlur = 12;

          const flameWiggle = Math.sin(tick * 0.08 + h.swayOffset) * 2.5;

          ctx.beginPath();
          ctx.moveTo(flameWiggle, -h.size * 1.7); // Tapered flame tail
          ctx.bezierCurveTo(h.size * 1.2, -h.size * 0.4, h.size, h.size * 1.1, 0, h.size * 1.1);
          ctx.bezierCurveTo(-h.size, h.size * 1.1, -h.size * 1.2, -h.size * 0.4, flameWiggle, -h.size * 1.7);
          ctx.fill();

          // Spark particle trailing below
          ctx.beginPath();
          ctx.arc(flameWiggle * 0.6, -h.size * 2.1, h.size * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = h.innerColor;
          ctx.fill();
        } else {
          // Cute anime ghost silhouette
          ctx.fillStyle = `rgba(240, 240, 255, ${h.alpha * 0.85})`;
          ctx.shadowColor = h.outerColor;
          ctx.shadowBlur = 10;

          // Ghost head and draped body
          ctx.beginPath();
          ctx.arc(0, -h.size * 0.4, h.size * 0.65, Math.PI, 0, false);
          ctx.lineTo(h.size * 0.65, h.size * 0.5);
          // Ruffled skirt
          const wave = Math.sin(tick * 0.1 + h.swayOffset) * 1.5;
          ctx.quadraticCurveTo(h.size * 0.3, h.size * 0.3 + wave, 0, h.size * 0.5);
          ctx.quadraticCurveTo(-h.size * 0.3, h.size * 0.3 - wave, -h.size * 0.65, h.size * 0.5);
          ctx.closePath();
          ctx.fill();

          // Spooky anime eyes (two tiny dark dots)
          ctx.fillStyle = '#0C0C0C';
          ctx.beginPath();
          ctx.arc(-h.size * 0.25, -h.size * 0.35, 1.2, 0, Math.PI * 2);
          ctx.arc(h.size * 0.25, -h.size * 0.35, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      // --- 2. RENDER SWOOPING BATS ---
      bats.forEach((bat) => {
        // Natural undulating flight trajectory
        bat.y += Math.sin(tick * 0.04 + bat.flapOffset) * 0.8 + bat.vy;
        bat.x += bat.vx;

        // Interactive mouse scatter: bats shy away quickly
        const dx = bat.x - mouseX;
        const dy = bat.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          bat.vx += (dx / dist) * force * 1.2;
          bat.vy += (dy / dist) * force * 1.2;
        }

        // Dampen velocity back towards cruising speed
        bat.vx = bat.vx * 0.98;
        if (Math.abs(bat.vx) < 1.0) {
          bat.vx = bat.vx < 0 ? -1.2 : 1.2;
        }

        // Screen boundary wrapping
        if (bat.vx > 0 && bat.x > width + 50) {
          bat.x = -50;
          bat.y = Math.random() * (height * 0.6) + 30;
        } else if (bat.vx < 0 && bat.x < -50) {
          bat.x = width + 50;
          bat.y = Math.random() * (height * 0.6) + 30;
        }
        if (bat.y < 20) bat.y = 20;
        if (bat.y > height - 40) bat.y = height - 40;

        // Wing flapping calculation (sine wave)
        const isGliding = (tick + bat.glideTimer) % 180 > 140;
        const wingFlap = isGliding ? 2 : Math.sin(tick * bat.flapSpeed + bat.flapOffset) * 11;

        ctx.save();
        ctx.translate(bat.x, bat.y);
        // Face travel direction
        const facing = bat.vx >= 0 ? 1 : -1;
        ctx.scale(facing * bat.size, bat.size);

        // Bat Silhouette with subtle Halloween rim glow
        ctx.fillStyle = '#141418';
        ctx.strokeStyle = bat.glowColor;
        ctx.lineWidth = 0.75;
        ctx.shadowColor = bat.glowColor;
        ctx.shadowBlur = 8;

        ctx.beginPath();
        // Central body & pointy head
        ctx.ellipse(0, 0, 3.5, 7, 0, 0, Math.PI * 2);
        // Head with pointed bat ears
        ctx.arc(0, -7.5, 3, 0, Math.PI * 2);
        ctx.moveTo(-1.8, -9);
        ctx.lineTo(-3.8, -13.5);
        ctx.lineTo(-0.8, -10.5);
        ctx.moveTo(1.8, -9);
        ctx.lineTo(3.8, -13.5);
        ctx.lineTo(0.8, -10.5);

        // Left Wing with 3 anatomical scalloped edges
        ctx.moveTo(-2.5, -3);
        ctx.quadraticCurveTo(-12, -14 + wingFlap, -26, -4 + wingFlap * 1.3);
        ctx.quadraticCurveTo(-20, 4 + wingFlap * 0.5, -16, 2 + wingFlap * 0.3);
        ctx.quadraticCurveTo(-12, 5 + wingFlap * 0.2, -8, 3);
        ctx.quadraticCurveTo(-4, 4, -2.5, 2);

        // Right Wing with 3 anatomical scalloped edges
        ctx.moveTo(2.5, -3);
        ctx.quadraticCurveTo(12, -14 + wingFlap, 26, -4 + wingFlap * 1.3);
        ctx.quadraticCurveTo(20, 4 + wingFlap * 0.5, 16, 2 + wingFlap * 0.3);
        ctx.quadraticCurveTo(12, 5 + wingFlap * 0.2, 8, 3);
        ctx.quadraticCurveTo(4, 4, 2.5, 2);

        ctx.fill();
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[4] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Spooky Ambient Light Vignettes (Deep Halloween Violet & Pumpkin Orange) */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#7B2CBF]/15 rounded-full blur-[110px] animate-pulse-slow" />
      <div className="absolute top-1/3 -right-24 w-88 h-88 bg-[#FF6B00]/15 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-[#9D4EDD]/10 rounded-full blur-[100px]" />

      {/* 2. Top-Left Delicate Corner Spiderweb SVG */}
      <div className="absolute top-0 left-0 w-28 h-28 xs:w-36 xs:h-36 opacity-30 transition-opacity">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-none stroke-[#F3B334]/60"
          strokeWidth="0.85"
        >
          {/* Radial Spokes */}
          <line x1="0" y1="0" x2="100" y2="0" />
          <line x1="0" y1="0" x2="92" y2="38" />
          <line x1="0" y1="0" x2="71" y2="71" />
          <line x1="0" y1="0" x2="38" y2="92" />
          <line x1="0" y1="0" x2="0" y2="100" />
          {/* Concentric Web Arcs */}
          <path d="M 0,25 Q 12,24 18,18 Q 24,12 25,0" />
          <path d="M 0,50 Q 24,48 35,35 Q 48,24 50,0" />
          <path d="M 0,75 Q 36,72 53,53 Q 72,36 75,0" />
          <path d="M 0,100 Q 48,96 71,71 Q 96,48 100,0" />
          {/* Hanging Spider Silk Strand */}
          <line x1="71" y1="71" x2="71" y2="88" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="1,1" />
          <circle cx="71" cy="90" r="2.2" fill="#D91515" />
          <line x1="68" y1="89" x2="74" y2="91" stroke="#D91515" strokeWidth="0.6" />
          <line x1="68" y1="91" x2="74" y2="89" stroke="#D91515" strokeWidth="0.6" />
        </svg>
      </div>

      {/* 3. Top-Right Delicate Corner Spiderweb SVG (Mirrored) */}
      <div className="absolute top-0 right-0 w-28 h-28 xs:w-36 xs:h-36 opacity-25 scale-x-[-1] transition-opacity">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-none stroke-[#FF6B00]/60"
          strokeWidth="0.85"
        >
          {/* Radial Spokes */}
          <line x1="0" y1="0" x2="100" y2="0" />
          <line x1="0" y1="0" x2="92" y2="38" />
          <line x1="0" y1="0" x2="71" y2="71" />
          <line x1="0" y1="0" x2="38" y2="92" />
          <line x1="0" y1="0" x2="0" y2="100" />
          {/* Concentric Web Arcs */}
          <path d="M 0,25 Q 12,24 18,18 Q 24,12 25,0" />
          <path d="M 0,50 Q 24,48 35,35 Q 48,24 50,0" />
          <path d="M 0,75 Q 36,72 53,53 Q 72,36 75,0" />
          <path d="M 0,100 Q 48,96 71,71 Q 96,48 100,0" />
        </svg>
      </div>

      {/* 4. Canvas Element for Bats & Hitodama */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-90 transition-opacity duration-700"
      />
    </div>
  );
}
