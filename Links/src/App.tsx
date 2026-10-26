import { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import ProfileHero from './components/ProfileHero';
import SocialLinks from './components/SocialLinks';
import EventCountdown from './components/EventCountdown';
import LinkCard from './components/LinkCard';
import Footer from './components/Footer';
import QRCodeModal from './components/QRCodeModal';
import ShareModal from './components/ShareModal';
import Toast from './components/Toast';
import { LINK_ITEMS } from './data/links';
import { getAssetUrl } from './utils/assets';
import { Eye, EyeOff, Radio, Sparkles } from 'lucide-react';

export default function App() {
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [currentUrl, setCurrentUrl] = useState('https://joinoac.in/links/');
  const [redirectingTo, setRedirectingTo] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);

      // Custom shortcut redirect support (e.g. ?go=tickets or ?go=discord)
      const params = new URLSearchParams(window.location.search);
      const goTarget = params.get('go') || window.location.hash.replace('#', '');
      
      if (goTarget) {
        const found = LINK_ITEMS.find(
          (item) =>
            item.id.toLowerCase().includes(goTarget.toLowerCase()) ||
            item.title.toLowerCase().includes(goTarget.toLowerCase())
        );

        if (found) {
          setRedirectingTo(found.title);
          setTimeout(() => {
            window.location.href = found.url;
          }, 800);
        }
      }
    }
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // If executing a direct shortcut redirect (?go=...)
  if (redirectingTo) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-[#0C0C0C] flex flex-col items-center justify-center text-center p-4 xs:p-6 text-white relative overflow-hidden">
        <div className="w-16 h-16 xs:w-20 xs:h-20 rounded-full border-2 border-[#D91515] p-2 flex items-center justify-center animate-spin-slow mb-4 shadow-glow-red">
          <Sparkles className="w-7 h-7 xs:w-8 xs:h-8 text-[#F3B334]" />
        </div>
        <h2 className="font-display text-2xl xs:text-3xl text-white tracking-wide">
          WARPING TO DESTINATION
        </h2>
        <p className="text-xs xs:text-sm text-gray-400 mt-2">
          Redirecting to <span className="text-[#F3B334] font-semibold">{redirectingTo}</span>...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen min-h-[100dvh] bg-[#0C0C0C] text-[#F5F5F5] overflow-x-hidden selection:bg-[#D91515]/40 selection:text-[#F3B334] flex flex-col">
      {/* Background Image & Effects - Matched with Main Website Hero */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={getAssetUrl('/images/akihabara-bg.jpg')}
          alt="Akihabara neon street scene"
          className="w-full h-full object-cover opacity-25 scale-105"
          loading="eager"
        />
        {/* Gradients, Hero Grid Overlay & Noise Texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C]/85 via-[#0C0C0C]/75 to-[#0C0C0C]" />
        <div className="absolute inset-0 hero-grid-overlay" />
        <div className="absolute inset-0 noise-texture opacity-[0.035]" />
      </div>

      {/* Floating decorative ambient light elements from main website */}
      <div className="fixed top-1/4 -left-20 w-80 h-80 bg-[#D91515]/15 rounded-full blur-[110px] pointer-events-none animate-pulse-slow" />
      <div className="fixed bottom-1/4 -right-20 w-96 h-96 bg-[#F3B334]/15 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-gradient-to-b from-[#D91515]/20 via-[#F3B334]/15 to-transparent blur-[90px] pointer-events-none" />

      {/* Floating Sakura / Embers Particle Background */}
      {particlesEnabled && <ParticleBackground />}

      {/* Top Floating Header & Live Status */}
      <header className="relative z-10 w-full max-w-xl mx-auto px-3.5 sm:px-6 pt-3 sm:pt-4 flex items-center justify-between">
        <a
          href="https://joinoac.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 group p-1.5 rounded-full hover:bg-white/[0.04] transition-all min-h-[40px]"
          title="Visit Official Website (joinoac.in)"
        >
          <img
            src={getAssetUrl('/images/oac-logo-transparent.png')}
            alt="OAC"
            className="w-10 xs:w-12 h-6 xs:h-7 object-contain group-hover:scale-105 transition-transform"
          />
          <div className="hidden xs:flex items-center gap-1.5 text-[11px] font-mono text-gray-400 group-hover:text-[#F3B334] transition-colors">
            <Radio className="w-3 h-3 text-[#D91515] animate-pulse" />
            <span>joinoac.in</span>
          </div>
        </a>

        {/* Ambient VFX Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setParticlesEnabled(!particlesEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-xs text-gray-300 transition-all active:scale-95 shadow-sm min-h-[36px]"
            title={particlesEnabled ? 'Turn off particle VFX' : 'Turn on particle VFX'}
            aria-label="Toggle background particle animation"
          >
            {particlesEnabled ? (
              <>
                <Eye className="w-3.5 h-3.5 text-[#F3B334] animate-pulse" />
                <span className="text-[11px] font-medium hidden xs:inline text-gray-200">VFX: On</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-[11px] font-medium hidden xs:inline text-gray-400">VFX: Off</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-xl mx-auto px-3.5 sm:px-6 pb-12 flex-1 flex flex-col items-center">
        {/* Profile Hero Section with Japanese Typing Animation */}
        <ProfileHero
          onOpenQR={() => setQrModalOpen(true)}
          onOpenShare={() => setShareModalOpen(true)}
          onShowToast={showToast}
        />

        {/* Social Icons Bar */}
        <div className="w-full mt-3 mb-4">
          <SocialLinks />
        </div>

        {/* Simple, Clean Links Stream with Expansion & Redirect Animation */}
        <section
          aria-label="Community Passes and Links"
          className="w-full space-y-3.5 mt-2"
        >
          {/* Live Event Countdown Ticker (Halloween 2026 -> OCD 2026 Auto-Sequence) */}
          <EventCountdown />

          {LINK_ITEMS.map((link, index) => (
            <LinkCard key={link.id} link={link} index={index} />
          ))}
        </section>

        {/* Footer */}
        <div className="w-full">
          <Footer />
        </div>
      </main>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        url={currentUrl}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        url={currentUrl}
        title="Odisha Anime Community | Official Passes & Links"
        onShowToast={showToast}
      />

      {/* Toast feedback */}
      <Toast message={toastMessage} />
    </div>
  );
}
