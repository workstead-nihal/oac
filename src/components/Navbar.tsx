import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../images/logo/Odisha Anime Community Trandsperent Logo.png';

interface NavbarProps {
  onJoinClick: () => void;
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#footer' },
];

export default function Navbar({ onJoinClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setTimeout(() => {
      setMobileOpen(false);
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200); 
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-2 group"
          aria-label="OAC Home"
        >
          <img src={logo} alt="Odisha Anime Community logo" className="w-24 h-14 object-contain group-hover:scale-105 transition-transform" />
          <div className="hidden sm:block">
            <p className="font-display text-lg leading-none text-white tracking-wide">
              ODISHA ANIME
            </p>
            <p className="text-[10px] tracking-[0.3em] text-[#F3B334]/70 uppercase">
              Community
            </p>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-gray-300 hover:text-[#F3B334] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D91515] group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Join Button (desktop only) */}
        <button
          onClick={onJoinClick}
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-[#D91515] text-white text-sm font-semibold hover:bg-[#F3B334] hover:text-white transition-all duration-300 glow-red"
        >
          Join the Family
        </button>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2 relative z-50"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {mobileOpen ? <X size={24} className="text-[#F3B334] transition-colors" /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu - FIXED Liquid Glass Background using safe Tailwind classes (bg-black/90 + backdrop-blur-2xl) */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 h-screen bg-black/90 backdrop-blur-2xl border-t border-white/10 shadow-2xl">
          <ul className="flex flex-col p-6 gap-2">
            {navLinks.map((link, index) => (
              <li 
                key={link.href} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  /* Added beautiful tap/hover background glow (active:bg-white/5) */
                  className="flex items-center justify-between py-5 px-6 text-xl font-bold text-gray-300 border-l-4 border-transparent active:border-[#F3B334] active:bg-white/5 hover:border-[#F3B334] hover:bg-white/5 rounded-r-xl transition-all duration-200 group"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {/* Text glows gold when tapped */}
                  <span className="group-active:translate-x-2 group-active:text-[#F3B334] group-active:drop-shadow-[0_0_12px_rgba(243,179,52,0.9)] group-hover:translate-x-2 group-hover:text-[#F3B334] group-hover:drop-shadow-[0_0_12px_rgba(243,179,52,0.9)] transition-all duration-200">
                    {link.label}
                  </span>
                  
                  {/* Arrow appears and glows */}
                  <span className="opacity-0 -translate-x-4 group-active:opacity-100 group-active:translate-x-0 group-active:drop-shadow-[0_0_12px_rgba(243,179,52,0.9)] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#F3B334]">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
} 