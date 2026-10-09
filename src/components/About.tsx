import { Users, Palette, Gamepad2, Music, Heart, Sparkles } from 'lucide-react';

const pillars = [
  {
    icon: Users,
    title: 'Anime Fans',
    desc: 'Watch parties, manga clubs, and discussions that bring fans together.',
  },
  {
    icon: Palette,
    title: 'Artists & Cosplayers',
    desc: 'Showcase your art, build costumes, and perform on stage with fellow creators.',
  },
  {
    icon: Gamepad2,
    title: 'Gamers',
    desc: 'Tournaments, casual meetups, and sessions across every genre.',
  },
  {
    icon: Music,
    title: 'Music Lovers',
    desc: 'From anime OPs to J-rock covers and DJ nights — we feel the beat together.',
  },
];

const stats = [
  { value: '5+', label: 'Years Strong' },
  { value: '2000+', label: 'Members' },
  { value: '50+', label: 'Events' },
  { value: '100+', label: 'Creators' },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 bg-[#0C0C0C] overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D91515]/40 to-transparent" />
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-[#D91515]/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="text-[#F3B334] text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Who We Are
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
            More Than a Community —
            <br />
            <span className="text-gradient-gold">A Family Bound by Passion</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Founded on 13 February 2020 in Bhubaneswar, the Odisha Anime Community (OAC)
            is a space where every anime fan, cosplayer, artist, gamer, and music lover
            finds belonging. We celebrate pop culture, creativity, and the bonds that
            form when people share what they love.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 hover:border-[#F3B334]/30 transition-all duration-300 group"
            >
              <p className="font-display text-4xl sm:text-5xl text-[#F3B334] group-hover:scale-110 transition-transform">
                {stat.value}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-[#D91515]/40 hover:bg-white/[0.05] transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-[#D91515]/10 flex items-center justify-center mb-5 group-hover:bg-[#D91515]/20 transition-colors">
                  <Icon size={28} className="text-[#D91515] group-hover:text-[#F3B334] transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{pillar.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Mission statement */}
        <div className="mt-20 relative">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#D91515]/10 via-[#0C0C0C] to-[#F3B334]/10 border border-white/5 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F3B334]/5 rounded-full blur-[80px]" />
            <div className="relative flex flex-col md:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D91515] to-[#F3B334] flex items-center justify-center flex-shrink-0">
                <Heart size={32} className="text-white" />
              </div>
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-white mb-3">
                  Our Mission
                </h3>
                <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                  To create a safe, inclusive, and vibrant space where every fan feels
                  at home — where you can be yourself, express your creativity, and
                  build lasting friendships with people who get it. Whether you're
                  picking up your first manga or crafting your tenth cosplay, there's
                  a place for you here.
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#F3B334]">
                  <Sparkles size={18} />
                  <span className="text-sm font-medium">Everyone belongs at OAC.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
