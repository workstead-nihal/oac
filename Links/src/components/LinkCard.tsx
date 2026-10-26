import { useState } from 'react';
import { ArrowUpRight, Ticket, Sparkles, Mic, Store, Users, MessageCircle, MessageSquare, Globe, ExternalLink, Loader2, Instagram, Youtube, Gamepad2, Trophy, Swords, Flame } from 'lucide-react';
import { LinkItem } from '../types';
import { getAssetUrl } from '../utils/assets';

interface LinkCardProps {
  link: LinkItem;
  index: number;
}

export default function LinkCard({ link, index }: LinkCardProps) {
  const [isExpanding, setIsExpanding] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isExpanding) return;

    // Strict security check: prevent javascript: and data: URI execution
    const isSafeUrl = /^(https?:\/\/|mailto:)/i.test(link.url);
    if (!isSafeUrl) return;

    setIsExpanding(true);

    // Expand & burst animation, then redirect after 380ms
    setTimeout(() => {
      window.open(link.url, '_blank', 'noopener,noreferrer');
      // Reset expansion after a brief delay
      setTimeout(() => {
        setIsExpanding(false);
      }, 400);
    }, 380);
  };

  const getIcon = (name?: string) => {
    switch (name) {
      case 'Ticket':
        return <Ticket className="w-5 h-5 text-[#F3B334]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Mic':
        return <Mic className="w-5 h-5 text-[#F3B334]" />;
      case 'Store':
        return <Store className="w-5 h-5 text-emerald-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#D91515]" />;
      case 'MessageCircle':
        return <MessageCircle className="w-5 h-5 text-emerald-400" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-blue-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-[#F3B334]" />;
      case 'Instagram':
        return <Instagram className="w-5 h-5 text-[#E1306C]" />;
      case 'Youtube':
        return <Youtube className="w-5 h-5 text-[#FF0000]" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5 text-[#D91515]" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-[#F3B334]" />;
      case 'Swords':
        return <Swords className="w-5 h-5 text-[#D91515]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#F3B334]" />;
      default:
        return <ExternalLink className="w-5 h-5 text-gray-400" />;
    }
  };

  const getBadgeClasses = (color?: string) => {
    switch (color) {
      case 'red':
        return 'bg-[#D91515]/20 text-[#FF5A5A] border-[#D91515]/50';
      case 'gold':
        return 'bg-[#F3B334]/20 text-[#F3B334] border-[#F3B334]/50';
      case 'purple':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case 'emerald':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
      case 'blue':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      default:
        return 'bg-white/10 text-gray-300 border-white/20';
    }
  };

  const animationDelayStyle = {
    animationDelay: `${Math.min(index * 60, 600)}ms`,
  };

  // If the card is featured (e.g. Otaku Community Day 2026 Tickets)
  if (link.isFeatured) {
    return (
      <a
        href={link.url}
        onClick={handleClick}
        style={animationDelayStyle}
        className={`group relative block w-full rounded-2xl sm:rounded-3xl p-[2px] transition-all duration-300 focus:outline-none animate-card-enter shine-sweep cursor-pointer ${
          isExpanding
            ? 'scale-[1.03] sm:scale-105 z-30 shadow-[0_0_60px_rgba(243,179,52,0.85),0_0_90px_rgba(217,21,21,0.6)]'
            : 'hover:scale-[1.015] sm:hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        {/* Animated Gradient Border with Pulsing Anime Flame Glow */}
        <div
          className={`absolute -inset-0.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D91515] via-[#F3B334] to-[#D91515] transition duration-500 ${
            isExpanding
              ? 'opacity-100 blur-md animate-pulse'
              : 'opacity-80 blur-[3px] group-hover:opacity-100 group-hover:blur-md animate-pulse-slow'
          }`}
        />

        <div className="relative rounded-2xl sm:rounded-3xl bg-[#141414] border border-white/10 p-3.5 xs:p-4 sm:p-5 overflow-hidden flex flex-col gap-3 sm:gap-4 shadow-2xl">
          {/* Energy ripple overlay on expansion */}
          {isExpanding && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#D91515]/20 via-[#F3B334]/30 to-[#D91515]/20 animate-pulse pointer-events-none z-20" />
          )}

          {/* Top Banner thumbnail - True 16:9 Responsive Aspect Ratio */}
          {link.thumbnailUrl && (
            <div className="relative w-full aspect-[16/9] min-h-[160px] xs:min-h-[180px] sm:min-h-[220px] rounded-xl sm:rounded-2xl overflow-hidden bg-black/60 border border-white/10">
              <img
                src={getAssetUrl(link.thumbnailUrl)}
                alt={link.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isExpanding ? 'scale-110' : 'group-hover:scale-105'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />

              {/* Top floating pill badge with radar ping animation */}
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase border shadow-lg backdrop-blur-md ${getBadgeClasses(link.badgeColor)}`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D91515] opacity-80" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D91515]" />
                  </span>
                  {link.badge}
                </span>
              </div>
            </div>
          )}

          {/* Content details */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
            <div className="flex-1 min-w-0">
              {!link.thumbnailUrl && link.badge && (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border mb-2 ${getBadgeClasses(link.badgeColor)}`}>
                  {link.badge}
                </span>
              )}
              <h2 className={`font-display text-xl xs:text-2xl sm:text-3xl transition-colors leading-tight ${
                isExpanding ? 'text-[#F3B334]' : 'text-white group-hover:text-[#F3B334]'
              }`}>
                {link.title}
              </h2>
              {link.subtitle && (
                <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-relaxed line-clamp-2">
                  {link.subtitle}
                </p>
              )}
            </div>

            {/* CTA Button with Glow and Expanding State */}
            <div className="w-full sm:w-auto self-stretch sm:self-center">
              <div
                className={`w-full sm:w-auto px-4 xs:px-5 py-2.5 sm:py-3 min-h-[44px] rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  isExpanding
                    ? 'bg-[#F3B334] text-[#0C0C0C] shadow-glow-gold scale-105'
                    : 'bg-[#D91515] group-hover:bg-[#F3B334] text-white group-hover:text-[#0C0C0C] shadow-glow-red group-hover:shadow-glow-gold'
                }`}
              >
                {isExpanding ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#0C0C0C]" />
                    <span>Opening Link...</span>
                  </>
                ) : (
                  <>
                    <span>{link.actionText || 'Open Link'}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-[-8deg]" />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  }

  // Standard Link Card with Expanding Animation
  return (
    <a
      href={link.url}
      onClick={handleClick}
      style={animationDelayStyle}
      className={`group relative block w-full rounded-2xl p-[1px] transition-all duration-300 focus:outline-none animate-card-enter shine-sweep cursor-pointer ${
        isExpanding
          ? 'scale-[1.02] sm:scale-105 z-30 shadow-[0_0_45px_rgba(217,21,21,0.7),0_0_65px_rgba(243,179,52,0.5)] bg-gradient-to-r from-[#D91515] via-[#F3B334] to-[#D91515]'
          : 'bg-white/[0.06] hover:bg-gradient-to-r hover:from-[#D91515]/90 hover:via-[#F3B334]/80 hover:to-[#D91515]/90 hover:scale-[1.012] active:scale-[0.985]'
      }`}
    >
      <div
        className={`relative rounded-2xl border p-3 xs:p-3.5 sm:p-4 backdrop-blur-md transition-all flex items-center gap-3 sm:gap-4 overflow-hidden min-h-[72px] ${
          isExpanding
            ? 'bg-[#181818] border-[#F3B334]/60'
            : 'bg-[#121212]/95 group-hover:bg-[#151515]/95 border-white/10 group-hover:border-transparent'
        }`}
      >
        {/* Subtle energy sheen during expansion */}
        {isExpanding && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#D91515]/20 via-[#F3B334]/25 to-[#D91515]/20 animate-pulse pointer-events-none" />
        )}

        {/* Left Thumbnail or Icon */}
        <div className="flex-shrink-0 relative z-10">
          {link.thumbnailUrl ? (
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/10 group-hover:border-[#D91515]/50 transition-colors">
              <img
                src={getAssetUrl(link.thumbnailUrl)}
                alt={link.title}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isExpanding ? 'scale-125' : 'group-hover:scale-110'
                }`}
              />
            </div>
          ) : (
            <div
              className={`w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 aspect-square rounded-xl border flex items-center justify-center transition-all duration-300 shadow-inner ${
                isExpanding
                  ? 'bg-[#F3B334]/20 border-[#F3B334] scale-110'
                  : 'bg-white/[0.04] border-white/10 group-hover:border-[#F3B334]/40 group-hover:scale-110 group-hover:bg-white/[0.08]'
              }`}
            >
              {isExpanding ? <Sparkles className="w-5 h-5 text-[#F3B334] animate-spin" /> : getIcon(link.iconName)}
            </div>
          )}
        </div>

        {/* Center Details */}
        <div className="flex-1 min-w-0 relative z-10 pr-0.5">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {link.badge && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] xs:text-[10px] font-bold uppercase tracking-wider border ${getBadgeClasses(link.badgeColor)}`}>
                {link.badge}
              </span>
            )}
          </div>
          <h2 className={`font-semibold text-xs xs:text-sm sm:text-base transition-colors truncate ${
            isExpanding ? 'text-[#F3B334]' : 'text-gray-100 group-hover:text-white'
          }`}>
            {link.title}
          </h2>
          {link.subtitle && (
            <p className="text-[11px] xs:text-xs text-gray-400 mt-0.5 line-clamp-1 group-hover:text-gray-300 transition-colors">
              {link.subtitle}
            </p>
          )}
        </div>

        {/* Right Arrow Action / Expanding Indicator */}
        <div className="flex-shrink-0 self-center relative z-10">
          <div
            className={`w-7 h-7 xs:w-8 xs:h-8 rounded-full border flex items-center justify-center transition-all shadow-sm ${
              isExpanding
                ? 'bg-[#F3B334] text-[#0C0C0C] border-transparent scale-110 shadow-glow-gold'
                : 'bg-white/[0.04] group-hover:bg-[#D91515] border-white/10 group-hover:border-transparent text-gray-400 group-hover:text-white'
            }`}
          >
            {isExpanding ? (
              <Loader2 className="w-3.5 h-3.5 xs:w-4 xs:h-4 animate-spin text-black" />
            ) : (
              <ArrowUpRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-[-8deg]" />
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
