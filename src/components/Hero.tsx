import { Calendar, MapPin, Sparkles } from 'lucide-react';

interface HeroProps {
  onJoinClick: () => void;
}

export default function Hero({ onJoinClick }: HeroProps) {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0C0C0C]"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1628046/pexels-photo-1628046.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Akihabara neon street scene"
          className="w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C]/80 via-[#0C0C0C]/60 to-[#0C0C0C]" />
        <div className="absolute inset-0 hero-grid-overlay" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#D91515]/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#F3B334]/10 rounded-full blur-[120px] animate-pulse-slow" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20 pb-10 md:pb-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F3B334]/30 bg-[#F3B334]/5 backdrop-blur-sm mb-8 animate-fade-in">
          <Sparkles size={16} className="text-[#F3B334]" />
          <span className="text-xs sm:text-sm font-medium text-[#F3B334] tracking-wide">
            Est. 13 February 2020 — Bhubaneswar, Odisha
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none animate-slide-up">
          ODISHA ANIME
          <br />
          <span className="text-gradient-gold">COMMUNITY</span>
        </h1>

        {/* Tagline */}
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.15s' }}>
          You didn't just find a community.
          <br className="hidden sm:block" />
          You found your <span className="text-[#F3B334] font-medium">family</span>.
        </p>

        {/* Sub description */}
        <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
          A welcoming home for anime fans, cosplayers, artists, gamers, and music lovers across Odisha and beyond.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.45s' }}>
          <button
            onClick={onJoinClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D91515] text-white font-semibold text-base hover:bg-[#F3B334] hover:text-[#0C0C0C] transition-all duration-300 glow-red transform hover:scale-105"
          >
            Join the Community
          </button>
          <button
            onClick={scrollToAbout}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-base hover:border-[#F3B334] hover:text-[#F3B334] transition-all duration-300"
          >
            Discover More
          </button>
        </div>

        {/* Quick info chips */}
        <div className="mt-12 flex flex-wrap gap-3 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <MapPin size={14} className="text-[#D91515]" />
            <span className="text-xs text-gray-400">Bhubaneswar, Odisha</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Calendar size={14} className="text-[#F3B334]" />
            <span className="text-xs text-gray-400">Since Feb 2020</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Sparkles size={14} className="text-[#D91515]" />
            <span className="text-xs text-gray-400">joinoac.in</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-500 hover:text-[#F3B334] transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-current animate-scroll-indicator" />
        </div>
      </button>
    </section>
  );
}
