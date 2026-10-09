import { Instagram, Youtube, Mail, MapPin, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onJoinClick: () => void;
}

export default function Footer({ onJoinClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      className="relative bg-gradient-to-b from-[#0C0C0C] to-[#080808] border-t border-white/5 overflow-hidden"
    >
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D91515]/50 to-transparent" />

      {/* CTA band */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-5xl text-white leading-tight">
            Ready to Find Your <span className="text-gradient-gold">Anime Family?</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Whether you want to join as a member, partner with us, set up a stall,
            or collaborate as a creator — there's a place for you at OAC.
          </p>
          <button
            onClick={onJoinClick}
            className="mt-8 px-10 py-4 rounded-full bg-[#D91515] text-white font-semibold text-lg hover:bg-[#F3B334] hover:text-[#0C0C0C] transition-all duration-300 glow-red transform hover:scale-105"
          >
            Join the Community
          </button>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D91515] to-[#F3B334] flex items-center justify-center font-display text-xl text-white">
                OAC
              </div>
              <div>
                <p className="font-display text-lg leading-none text-white tracking-wide">
                  ODISHA ANIME
                </p>
                <p className="text-[10px] tracking-[0.3em] text-[#F3B334]/70 uppercase">
                  Community
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              A welcoming home for anime fans, cosplayers, artists, gamers, and music
              lovers. Founded Feb 13, 2020 in Bhubaneswar, Odisha.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', id: '#home' },
                { label: 'About Us', id: '#about' },
                { label: 'Gallery', id: '#gallery' },
                { label: 'Events', id: '#events' },
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={link.id}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                    className="text-sm text-gray-500 hover:text-[#F3B334] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Get Involved
            </h3>
            <ul className="space-y-2.5">
              <li>
                <button onClick={onJoinClick} className="text-sm text-gray-500 hover:text-[#F3B334] transition-colors text-left">
                  Become a Member
                </button>
              </li>
              <li>
                <button onClick={onJoinClick} className="text-sm text-gray-500 hover:text-[#F3B334] transition-colors text-left">
                  Partner / Sponsor
                </button>
              </li>
              <li>
                <button onClick={onJoinClick} className="text-sm text-gray-500 hover:text-[#F3B334] transition-colors text-left">
                  Setup a Stall
                </button>
              </li>
              <li>
                <button onClick={onJoinClick} className="text-sm text-gray-500 hover:text-[#F3B334] transition-colors text-left">
                  Creator Collab
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="space-y-3">
              <a
                href="https://joinoac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#F3B334] transition-colors"
              >
                <Mail size={16} />
                joinoac.in
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={16} className="text-[#D91515]" />
                Bhubaneswar, Odisha
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D91515] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D91515] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D91515] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 flex items-center gap-1.5 text-center">
            Made with <Heart size={12} className="text-[#D91515] fill-current" /> by the OAC community · © 2020–2026 Odisha Anime Community
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#F3B334] transition-colors"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
