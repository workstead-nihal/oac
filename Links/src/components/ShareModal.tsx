import { X, Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';

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

  const shareText = encodeURIComponent(`Check out Odisha Anime Community Official Passes & Links:\n${url}`);

  const shareChannels = [
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${shareText}`,
      bg: 'hover:bg-[#25D366]/20 hover:border-[#25D366]',
      color: '#25D366',
    },
    {
      name: 'X (Twitter)',
      url: `https://twitter.com/intent/tweet?text=${shareText}`,
      bg: 'hover:bg-white/20 hover:border-white',
      color: '#FFFFFF',
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      bg: 'hover:bg-[#24A1DE]/20 hover:border-[#24A1DE]',
      color: '#24A1DE',
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
          <h3 className="font-display text-xl xs:text-2xl text-white tracking-wide">
            SHARE OAC HUB
          </h3>
          <p className="text-[11px] xs:text-xs text-gray-400 mt-1">
            Spread the love with fellow anime fans & otaku friends
          </p>
        </div>

        {/* Share buttons */}
        <div className="space-y-2 mt-4 xs:mt-5">
          {shareChannels.map((ch) => (
            <a
              key={ch.name}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/10 transition-all ${ch.bg} group min-h-[44px]`}
            >
              <span className="text-xs xs:text-sm font-medium text-gray-200 group-hover:text-white flex items-center gap-2">
                Share to {ch.name}
              </span>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white flex-shrink-0" />
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
