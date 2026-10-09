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
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0C0C0C]/95 backdrop-blur-md border-b border-white/5 py-3'
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

        {/* Join Button (desktop) */}
        <button
          onClick={onJoinClick}
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-[#D91515] text-white text-sm font-semibold hover:bg-[#F3B334] hover:text-[#0C0C0C] transition-all duration-300 glow-red"
        >
          Join the Family
        </button>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0C0C0C]/98 backdrop-blur-lg border-b border-white/5 animate-slide-up">
          <ul className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block py-3 px-4 text-base font-medium text-gray-200 hover:text-[#F3B334] hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onJoinClick();
                }}
                className="w-full py-3 px-4 mt-2 rounded-lg bg-[#D91515] text-white font-semibold text-base hover:bg-[#F3B334] hover:text-[#0C0C0C] transition-colors"
              >
                Join the Family
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
