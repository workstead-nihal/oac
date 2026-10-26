import { useState, useEffect, useMemo } from 'react';
import { Check, QrCode, Share2, Sparkles, MapPin, Calendar } from 'lucide-react';
import { OFFICIAL_PROFILE, COMMUNITY_TRANSLATIONS } from '../data/links';
import { getAssetUrl } from '../utils/assets';

interface ProfileHeroProps {
  onOpenQR: () => void;
  onOpenShare: () => void;
  onShowToast: (msg: string) => void;
}

/**
 * Safely extracts human-visible grapheme clusters for Unicode text.
 * Prevents broken combining marks, matras, and dotted circles in Indic (Odia/Hindi/Bengali)
 * or CJK scripts during typewriter slicing and deletion.
 */
function getGraphemes(text: string): string[] {
  const intlAny = Intl as unknown as {
    Segmenter?: new (locale: string, options: { granularity: string }) => {
      segment: (input: string) => Iterable<{ segment: string }>;
    };
  };

  if (typeof intlAny.Segmenter === 'function') {
    const segmenter = new intlAny.Segmenter('und', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

export default function ProfileHero({ onOpenQR, onOpenShare, onShowToast }: ProfileHeroProps) {
  const [langIndex, setLangIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentTranslation = COMMUNITY_TRANSLATIONS[langIndex] || COMMUNITY_TRANSLATIONS[0];
  const clusters = useMemo(() => getGraphemes(currentTranslation.text), [currentTranslation.text]);

  // Multi-Language Typing Animation with Grapheme-Aware Transitions
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (charIndex < clusters.length) {
        // Typing forward: ~85ms per grapheme cluster
        timeout = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 85);
      } else {
        // Pause at full text: ~2800ms to appreciate each language
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2800);
      }
    } else {
      if (charIndex > 0) {
        // Deleting backward: ~35ms per grapheme cluster
        timeout = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, 35);
      } else {
        // Pause briefly on empty string (~350ms) before cycling to next language
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setLangIndex((prev) => (prev + 1) % COMMUNITY_TRANSLATIONS.length);
        }, 350);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, clusters.length]);

  const displayText = useMemo(
    () => clusters.slice(0, charIndex).join(''),
    [clusters, charIndex]
  );

  const handleCopyLink = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://joinoac.in';
    navigator.clipboard.writeText(currentUrl);
    onShowToast('Page link copied to clipboard!');
  };

  return (
    <section className="relative pt-6 pb-2 text-center flex flex-col items-center">
      {/* Dynamic Background Ambient Glow */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#D91515]/20 rounded-full blur-[70px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-56 h-56 bg-[#F3B334]/15 rounded-full blur-[50px] pointer-events-none" />

      {/* Top Status Tag with Anime Pulse */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-gray-200 mb-6 backdrop-blur-md shadow-lg group hover:border-[#F3B334]/40 transition-colors">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D91515] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F3B334]" />
        </span>
        <span className="font-semibold tracking-wider text-[11px] text-gray-200">
          OFFICIAL HUB
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#F3B334] group-hover:rotate-12 transition-transform" />
      </div>

      {/* Avatar Container with Anime Energy Ki-Aura */}
      <div className="relative group mb-3 xs:mb-4">
        {/* Outer Rotating Conic Aura Ring */}
        <div className="absolute -inset-2.5 rounded-full anime-aura-border opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-700 animate-spin-slow pointer-events-none" />

        {/* Counter-rotating Dashed Energy Ring */}
        <div className="absolute -inset-1.5 rounded-full border border-dashed border-[#F3B334]/50 animate-spin-reverse pointer-events-none" />

        {/* Pulsating Crimson Base Glow */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#D91515] to-[#F3B334] opacity-80 blur-sm animate-pulse-slow pointer-events-none" />

        {/* Main Avatar Frame */}
        <div className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 rounded-full bg-[#0C0C0C] p-1 border-2 border-white/30 overflow-hidden shadow-2xl flex items-center justify-center animate-float">
          <img
            src={getAssetUrl(OFFICIAL_PROFILE.avatar)}
            alt="Odisha Anime Community"
            className="w-full h-full object-contain rounded-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Verified Shield Badge on Avatar */}
        <div
          title="Verified Official Community"
          className="absolute bottom-1 right-1 translate-x-1 translate-y-1 w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-[#0C0C0C] border-2 border-[#141414] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
        >
          <div className="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-gradient-to-tr from-[#D91515] via-[#F3B334] to-[#D91515] flex items-center justify-center shadow-glow-gold">
            <Check className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-black stroke-[3.5]" />
          </div>
        </div>
      </div>

      {/* Multi-Language Subtitle with Typing Animation & Blinking Neon Cursor */}
      <div
        className="h-7 min-h-[28px] flex items-center justify-center mb-1 max-w-full px-2"
        aria-live="polite"
        aria-atomic="true"
      >
        <span
          lang={currentTranslation.code}
          className="text-xs xs:text-[13px] font-semibold tracking-[0.12em] xs:tracking-[0.18em] text-[#F3B334] drop-shadow-sm truncate select-none"
          title={`${currentTranslation.lang} (${currentTranslation.nativeName})`}
        >
          {displayText}
        </span>
        <span
          aria-hidden="true"
          className="inline-block w-1.5 h-3.5 xs:h-4 ml-1 bg-[#D91515] animate-pulse rounded-sm flex-shrink-0"
        />
      </div>

      {/* Main Title with Fire Gradient */}
      <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl text-white tracking-wider leading-none px-2">
        ODISHA ANIME <span className="text-gradient-gold">COMMUNITY</span>
      </h1>

      {/* Handle */}
      <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
        {OFFICIAL_PROFILE.handle}
      </p>

      {/* Location & Est. meta */}
      <div className="flex items-center justify-center gap-2 xs:gap-3 mt-2 text-[11px] xs:text-xs text-gray-400 flex-wrap px-2">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#D91515]" />
          {OFFICIAL_PROFILE.location}
        </span>
        <span className="text-gray-600 hidden xs:inline">•</span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#F3B334]" />
          Est. {OFFICIAL_PROFILE.established}
        </span>
      </div>

      {/* Bio text */}
      <p className="mt-2.5 xs:mt-3 text-xs xs:text-sm sm:text-base text-gray-300 max-w-md mx-auto leading-relaxed px-2 sm:px-4">
        {OFFICIAL_PROFILE.bio}
      </p>

      {/* Feature Badges */}
      <div className="flex items-center justify-center gap-1.5 xs:gap-2 flex-wrap mt-3 px-1">
        {OFFICIAL_PROFILE.pills.map((pill) => (
          <span
            key={pill.label}
            className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] xs:text-xs font-medium text-gray-200 hover:border-[#F3B334] hover:bg-white/[0.08] hover:scale-105 active:scale-95 transition-all duration-200 cursor-default"
          >
            <span>{pill.icon}</span>
            <span>{pill.label}</span>
          </span>
        ))}
      </div>

      {/* Action Buttons Toolbar - 3 Column Equal Flex Ratio on All Screens */}
      <div className="w-full max-w-sm grid grid-cols-3 gap-2 xs:gap-2.5 mt-4 xs:mt-5 px-1">
        <button
          onClick={onOpenShare}
          className="flex items-center justify-center gap-1 xs:gap-1.5 px-2 xs:px-3 sm:px-4 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/30 text-[11px] xs:text-xs font-semibold text-gray-200 hover:text-white transition-all hover:scale-[1.03] active:scale-95 shadow-sm min-h-[42px]"
          aria-label="Share Community Hub"
        >
          <Share2 className="w-3.5 h-3.5 text-[#F3B334] flex-shrink-0" />
          <span>Share</span>
        </button>

        <button
          onClick={onOpenQR}
          className="flex items-center justify-center gap-1 xs:gap-1.5 px-2 xs:px-3 sm:px-4 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-[#D91515]/50 text-[11px] xs:text-xs font-semibold text-gray-200 hover:text-white transition-all hover:scale-[1.03] active:scale-95 shadow-sm min-h-[42px]"
          aria-label="Show QR Code"
        >
          <QrCode className="w-3.5 h-3.5 text-[#D91515] flex-shrink-0" />
          <span>QR Code</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-1 xs:gap-1.5 px-2 xs:px-3 sm:px-4 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-[#F3B334]/50 text-[11px] xs:text-xs font-semibold text-gray-200 hover:text-white transition-all hover:scale-[1.03] active:scale-95 shadow-sm min-h-[42px]"
          aria-label="Copy Link"
        >
          <span>Copy Link</span>
        </button>
      </div>
    </section>
  );
}
