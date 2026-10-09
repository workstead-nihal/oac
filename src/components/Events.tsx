import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

interface EventProps {
  onJoinClick: () => void;
}

const events = [
  {
    title: 'OAC Cosplay Con 2026',
    date: 'Coming Soon',
    location: 'Bhubaneswar',
    time: 'Full Day Event',
    desc: 'Our flagship cosplay convention featuring stage performances, costume contests, and artist alley.',
    tag: 'Flagship Event',
    featured: true,
  },
  {
    title: 'Monthly Anime Screening',
    date: 'Every 2nd Saturday',
    location: 'Community Space',
    time: '4 PM — 7 PM',
    desc: 'Catch up on seasonal anime with fellow fans. Snacks, discussions, and good vibes included.',
    tag: 'Recurring',
    featured: false,
  },
  {
    title: 'Sketch & Sip Meetup',
    date: 'Monthly',
    location: 'Cafe Hangouts',
    time: 'Evening',
    desc: 'Bring your sketchbook and draw with fellow artists. All skill levels welcome.',
    tag: 'Art Meet',
    featured: false,
  },
  {
    title: 'Gaming Tournament Night',
    date: 'Quarterly',
    location: 'Gaming Lounge',
    time: '6 PM Onwards',
    desc: 'Compete in fighting games, racing, and party games. Prizes for champions.',
    tag: 'Gaming',
    featured: false,
  },
];

export default function Events({ onJoinClick }: EventProps) {
  return (
    <section
      id="events"
      className="relative py-24 sm:py-32 bg-[#0C0C0C] overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F3B334]/40 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#D91515]/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="text-[#F3B334] text-sm tracking-[0.3em] uppercase font-medium mb-4">
            What's Happening
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
            Upcoming <span className="text-gradient-gold">Events</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            From cosplay conventions to cozy screening nights — there's always
            something happening at OAC. Come hang out.
          </p>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event.title}
              className={`group relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 ${
                event.featured
                  ? 'bg-gradient-to-br from-[#D91515]/15 to-[#F3B334]/5 border-[#D91515]/30 hover:border-[#D91515]/50'
                  : 'bg-white/[0.03] border-white/5 hover:border-[#F3B334]/30'
              }`}
            >
              {/* Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                  event.featured
                    ? 'bg-[#D91515] text-white'
                    : 'bg-white/10 text-[#F3B334]'
                }`}>
                  {event.tag}
                </span>
                {event.featured && (
                  <span className="text-[#F3B334] text-xs font-medium animate-pulse-slow">
                    Don't miss out
                  </span>
                )}
              </div>

              <h3 className="font-display text-2xl sm:text-3xl text-white mb-3">
                {event.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                {event.desc}
              </p>

              {/* Event details */}
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Calendar size={16} className="text-[#D91515] flex-shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <MapPin size={16} className="text-[#F3B334] flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Clock size={16} className="text-[#D91515] flex-shrink-0" />
                  <span>{event.time}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={onJoinClick}
                className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-[#F3B334] transition-colors"
              >
                Get involved
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Marquee strip */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] py-5">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex items-center gap-8 px-4">
                {['Cosplay', 'Anime Screenings', 'Art Showcase', 'Gaming Nights', 'Music Jams', 'Manga Club', 'Creator Collabs', 'Conventions'].map((word) => (
                  <span key={word} className="font-display text-2xl text-gray-700 flex items-center gap-8">
                    {word}
                    <span className="text-[#D91515]">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
