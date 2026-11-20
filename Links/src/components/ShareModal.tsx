import { X, Copy, Check, Share2, Mail } from 'lucide-react';
import React, { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  onShowToast: (msg: string) => void;
}

export default function ShareModal({ isOpen, onClose, url, title, onShowToast }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    onShowToast('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const rawShareText = `Check out Odisha Anime Community Official Passes & Links: ${url}`;
  const shareText = encodeURIComponent(rawShareText);

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: rawShareText,
          url,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const shareChannels = [
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${shareText}`,
      hoverBg: 'hover:bg-[#25D366]/20 hover:border-[#25D366]',
      icon: (
        <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.7a11.9 11.9 0 0 0 5.8 1.5c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4ZM12.1 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.9 9.9 0 1 1 8.3 4.6Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 2.9 1.3 3.1c.1.2 2.2 3.4 5.3 4.8.8.3 1.3.5 1.8.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4Z" />
        </svg>
      ),
    },
    {
      name: 'X',
      url: `https://twitter.com/intent/tweet?text=${shareText}`,
      hoverBg: 'hover:bg-white/20 hover:border-white',
      icon: (
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      hoverBg: 'hover:bg-[#24A1DE]/20 hover:border-[#24A1DE]',
      icon: (
        <svg className="w-5 h-5 text-[#24A1DE]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
        </svg>
      ),
    },
    {
      name: 'Reddit',
      url: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      hoverBg: 'hover:bg-[#FF4500]/20 hover:border-[#FF4500]',
      icon: (
        <svg className="w-5 h-5 text-[#FF4500]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm5.91 11.45c.06.2.09.41.09.62 0 2.22-2.68 4.02-6 4.02s-6-1.8-6-4.02c0-.21.03-.42.09-.62-.48-.34-.79-.89-.79-1.52 0-1.03.84-1.87 1.87-1.87.5 0 .96.2 1.3.52 1.02-.7 2.4-1.15 3.93-1.2l.74-3.48 2.42.52c.04-.54.49-.96 1.04-.96.58 0 1.05.47 1.05 1.05s-.47 1.05-1.05 1.05c-.48 0-.88-.33-1-.77l-1.92-.41-.57 2.68c1.55.05 2.95.5 3.98 1.2.34-.33.8-.52 1.3-.52 1.03 0 1.87.84 1.87 1.87 0 .63-.31 1.18-.79 1.52zm-8.41-.05c-.58 0-1.05.47-1.05 1.05s.47 1.05 1.05 1.05 1.05-.47 1.05-1.05-.47-1.05-1.05-1.05zm5 0c-.58 0-1.05.47-1.05 1.05s.47 1.05 1.05 1.05 1.05-.47 1.05-1.05-.47-1.05-1.05-1.05zm-4.7 3.32c.24.24.62.24.86 0 .61-.61 1.63-.61 2.24 0 .24.24.62.24.86 0 .24-.24.24-.62 0-.86-.96-.96-2.52-.96-3.48 0-.24.24-.24.62 0 .86z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      hoverBg: 'hover:bg-[#1877F2]/20 hover:border-[#1877F2]',
      icon: (
        <svg className="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      hoverBg: 'hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]',
      icon: (
        <svg className="w-5 h-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24"/>
        </svg>
      ),
    },
    {
      name: 'Email',
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${shareText}`,
      hoverBg: 'hover:bg-[#D91515]/20 hover:border-[#D91515]',
      icon: <Mail className="w-5 h-5 text-[#D91515]" />,
    },
    {
      name: 'More',
      url: '#',
      onClick: handleNativeShare,
      hoverBg: 'hover:bg-[#F3B334]/20 hover:border-[#F3B334]',
      icon: <Share2 className="w-5 h-5 text-[#F3B334]" />,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Share Odisha Anime Community Hub"
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[92vw] sm:max-w-sm rounded-3xl bg-[#121212] border border-white/10 p-4 xs:p-5 sm:p-6 shadow-2xl overflow-hidden max-h-[92dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 xs:top-4 xs:right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
          aria-label="Close share modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mt-2 px-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D91515]/10 border border-[#D91515]/30 text-[#F3B334] text-[10px] xs:text-xs font-semibold mb-2">
            <span>QUICK SHARE</span>
          </div>
          <h3 className="font-display text-xl xs:text-2xl text-white tracking-wide">
            SHARE OAC HUB
          </h3>
          <p className="text-[11px] xs:text-xs text-gray-400 mt-1">
            Spread the love with fellow anime fans & otaku friends
          </p>
        </div>

        {/* Social Share Icon Grid */}
        <div className="grid grid-cols-4 gap-2.5 xs:gap-3 mt-4 xs:mt-5">
          {shareChannels.map((ch) => (
            <a
              key={ch.name}
              href={ch.url}
              onClick={ch.onClick}
              target={ch.onClick ? undefined : '_blank'}
              rel={ch.onClick ? undefined : 'noopener noreferrer'}
              className="flex flex-col items-center gap-1.5 p-1.5 xs:p-2 rounded-2xl hover:bg-white/[0.04] transition-all group cursor-pointer"
              title={`Share via ${ch.name}`}
            >
              <div
                className={`w-11 h-11 xs:w-12 xs:h-12 rounded-2xl bg-[#0C0C0C] border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 active:scale-95 shadow-md ${ch.hoverBg}`}
              >
                {ch.icon}
              </div>
              <span className="text-[10px] xs:text-[11px] font-medium text-gray-300 group-hover:text-white truncate max-w-[62px] text-center">
                {ch.name}
              </span>
            </a>
          ))}
        </div>

        {/* Copy bar */}
        <div className="mt-4 xs:mt-5 pt-3.5 xs:pt-4 border-t border-white/5">
          <label className="block text-[10px] xs:text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5 xs:mb-2">
            Or copy link directly
          </label>
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 p-1.5 rounded-2xl bg-[#0C0C0C] border border-white/10">
            <input
              type="text"
              readOnly
              value={url}
              className="bg-transparent text-xs text-gray-300 font-mono px-3 py-1 flex-1 outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-[#D91515] hover:bg-[#F3B334] text-white hover:text-[#0C0C0C] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-glow-red min-h-[38px] active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
