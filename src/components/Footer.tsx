import { Instagram, Youtube, Mail, MapPin, Heart, ArrowUp } from 'lucide-react';
import logo from '../../images/logo/Odisha Anime Community Trandsperent Logo.png';

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
              <img src={logo} alt="Odisha Anime Community logo" className="w-24 h-14 object-contain" />
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
                href="mailto:info@joinoac.in"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#F3B334] transition-colors"
              >
                <Mail size={16} />
                info@joinoac.in
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={16} className="text-[#D91515]" />
                Bhubaneswar, Odisha
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://www.instagram.com/odisha.anime.community/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D91515] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.youtube.com/@OdishaAnimeClub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D91515] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
                <a
                  href="mailto:info@joinoac.in"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D91515] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
                <a
                  href="https://discord.gg/VnUDQh4yJv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#5865F2] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="Join OAC on Discord"
                  title="Discord"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.3 4.4a19.8 19.8 0 0 0-4.9-1.5l-.6 1.2a18.3 18.3 0 0 0-5.6 0l-.6-1.2a19.8 19.8 0 0 0-4.9 1.5C.6 9 .0 13.4.3 17.7a19.8 19.8 0 0 0 6 3l1.2-2a12.7 12.7 0 0 1-1.9-.9l.5-.4c3.8 1.8 8 1.8 11.8 0l.5.4a12.7 12.7 0 0 1-1.9.9l1.2 2a19.8 19.8 0 0 0 6-3c.4-5-1-9.4-3.4-13.3ZM8.2 15.1c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.1 1.1 2.1 2.4-.9 2.4-2.1 2.4Zm7.6 0c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.1 1.1 2.1 2.4-.9 2.4-2.1 2.4Z" />
                  </svg>
                </a>
                <a
                  href="https://chat.whatsapp.com/DtaCCgJyOGqIZu3P3n3J7r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25D366] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="Join OAC on WhatsApp"
                  title="WhatsApp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.7a11.9 11.9 0 0 0 5.8 1.5c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4ZM12.1 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.9 9.9 0 1 1 8.3 4.6Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 2.9 1.3 3.1c.1.2 2.2 3.4 5.3 4.8.8.3 1.3.5 1.8.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4Z" />
                  </svg>
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
