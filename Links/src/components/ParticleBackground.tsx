import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  baseOpacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  swaySpeed: number;
  swayDistance: number;
  swayOffset: number;
  type: 'petal' | 'spark' | 'ring';
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for subtle interactive breeze effect
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

    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor(width / 28), 50);

    const colors = [
      'rgba(217, 21, 21, ',   // OAC Crimson Red
      'rgba(243, 179, 52, ',  // OAC Radiant Gold
      'rgba(255, 120, 120, ', // Sakura Rose
      'rgba(255, 220, 120, ', // Amber glow
    ];

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const type: 'petal' | 'spark' | 'ring' =
        typeRand > 0.45 ? 'petal' : typeRand > 0.15 ? 'spark' : 'ring';
      const baseOpacity = Math.random() * 0.4 + 0.2;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 6 + 3,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: type === 'spark' ? -(Math.random() * 0.8 + 0.3) : Math.random() * 0.9 + 0.4,
        opacity: baseOpacity,
        baseOpacity,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayDistance: Math.random() * 25 + 10,
        swayOffset: Math.random() * 100,
        type,
      });
    }

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      particles.forEach((p) => {
        // Natural swaying motion
        const sway = Math.sin(tick * p.swaySpeed + p.swayOffset) * 0.6;
        p.x += p.speedX + sway;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Interactive cursor repulsion breeze
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }

        // Screen boundary wrapping
        if (p.speedY > 0 && p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        } else if (p.speedY < 0 && p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === 'petal') {
          // Curving Anime Sakura Petal
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.8, p.size * 1.6, p.size * 0.8, 0, p.size * 1.8);
          ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.8, 0, 0, 0, 0);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.fill();
        } else if (p.type === 'spark') {
          // Floating glowing ember
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity * 1.4})`;
          ctx.shadowColor = p.color.includes('217') ? '#D91515' : '#F3B334';
          ctx.shadowBlur = 10;
          ctx.fill();
        } else {
          // Subtle anime magic ring
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
          ctx.strokeStyle = `${p.color}${p.opacity * 0.7})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
