// Purpose: show OAC gatherings and clearly distinguish inactive events from open opportunities.
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

interface EventProps {
  onJoinClick: () => void;
}

const events = [
  {
    title: 'OTAKU COMMUNITY DAY 2026',
    date: '22 November 2026',
    location: '3rd Space, Near Esplanade, Rasulgarh',
    time: '12:00 pm to 5:00 pm IST',
    desc: "Introducing OTAKU COMMUNITY DAY 2026 — a day dedicated to anime, cosplay, games, creators, and bringing Odisha's POP culture community together! ❤️‍🔥\n\nWhether you're a casual anime watcher, a hardcore otaku, a cosplayer, a Gamer or just looking for people who share your interests. THIS IS YOUR PLACE.",
    ticketNotice: 'Early Bird Tickets will be live soon',
    tag: 'Flagship Event',
    featured: true,
  },
  {
    title: 'Halloween Party',
    date: '31 October 2026',
    location: 'The Space, Patia',
    time: '4:00 PM to 6:30 PM IST',
    desc: 'Bhubaneswar, let’s get spooky! 🎃 Join Coslabs for Halloween games, music, cosplay prizes and creepy bites plus complimentary cake to end the party! Come solo or bring your crew; costumes optional, fun compulsory. 👻',
    ticketUrl: 'https://greet.fydo.in/coslabs-halloween-party-2026',
    tag: 'JOIN THE PARTY NOWWWWWWW',
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
    inactive: true,
  },
  {
    title: 'Gaming Tournament Night',
    date: 'Quarterly',
    location: 'Gaming Lounge',
    time: '6 PM Onwards',
    desc: 'Compete in fighting games, racing, and party games. Prizes for champions.',
    tag: 'Gaming',
    featured: false,
    inactive: true,
  },
];

// Renders event cards; onJoinClick opens the involvement form only for active events.
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
              className={`group relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                event.inactive
                  ? 'bg-white/[0.02] border-white/10 grayscale'
                  : event.featured
                  ? 'bg-gradient-to-br from-[#D91515]/15 to-[#F3B334]/5 border-[#D91515]/30 hover:border-[#D91515]/50 hover:-translate-y-1'
                  : 'bg-white/[0.03] border-white/5 hover:border-[#F3B334]/30 hover:-translate-y-1'
              }`}
            >
              {/* Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                  event.featured
                    ? 'bg-[#D91515] text-white'
                    : 'bg-white/10 text-[#F3B334]'
                }`}>
                  {event.inactive ? 'Inactive' : event.tag}
                </span>
                {event.featured && (
                  <span className="text-[#F3B334] text-xs font-medium animate-pulse-slow">
                    Don't miss out
                  </span>
                )}
              </div>

              <h3 className={`font-display text-2xl sm:text-3xl mb-3 ${event.inactive ? 'text-gray-400' : 'text-white'}`}>
                {event.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-5 whitespace-pre-line">
                {event.desc}
              </p>

              {/* Event details */}
              {!event.inactive && (
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
              )}

              {/* CTA */}
              {event.inactive ? (
                <p className="text-sm font-medium text-gray-400">Currently inactive — updates coming later.</p>
              ) : (
                <>
                {event.ticketNotice && (
                  <p className="text-sm font-medium text-[#F3B334]" role="status">{event.ticketNotice}</p>
                )}
                <div className="flex flex-wrap items-center gap-4">
                {event.ticketUrl && (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#D91515] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#F3B334] hover:text-[#0C0C0C] transition-colors"
                  >
                    Book Tickets
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                )}
                <button
                type="button"
                onClick={onJoinClick}
                className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-white group-hover:text-[#F3B334] transition-colors"
              >
                Get Involved
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
                </div>
                </>
              )}
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
