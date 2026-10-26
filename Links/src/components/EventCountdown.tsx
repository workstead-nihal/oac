import { useState, useEffect } from 'react';
import { Flame, Ghost, Sparkles, Ticket } from 'lucide-react';

interface EventSchedule {
  id: string;
  badge: string;
  liveBadge: string;
  title: string;
  liveTitle: string;
  startDate: number;
  endDate: number;
  url: string;
  ariaLabel: string;
  theme: 'halloween' | 'otaku';
}

/**
 * Chronological event schedule with exact start and end times:
 * 1. Coslabs Halloween Party 2026:
 *    - Starts: Oct 31, 2026 at 4:00 PM IST (16:00)
 *    - Ends:   Oct 31, 2026 at 6:30 PM IST (18:30)
 * 2. Otaku Community Day 2026:
 *    - Starts: Nov 22, 2026 at 12:00 PM IST (12:00)
 *    - Ends:   Nov 22, 2026 at 5:00 PM IST (17:00)
 *
 * When Halloween concludes at 6:30 PM on Oct 31, the ticker automatically
 * transitions to counting down to Otaku Community Day 2026.
 */
const EVENT_SCHEDULE: EventSchedule[] = [
  {
    id: 'halloween-2026',
    badge: 'COUNTDOWN TO HALLOWEEN 🎃',
    liveBadge: '🎃 HALLOWEEN PARTY LIVE NOW!',
    title: 'Coslabs Halloween Party • Oct 31 (4 PM – 6:30 PM)',
    liveTitle: 'Coslabs Halloween Party • Doors Open (Until 6:30 PM)',
    startDate: new Date('2026-10-31T16:00:00+05:30').getTime(),
    endDate: new Date('2026-10-31T18:30:00+05:30').getTime(),
    url: 'https://greet.fydo.in/coslabs-halloween-party-2026',
    ariaLabel: 'Book Passes for Coslabs Halloween Party 2026',
    theme: 'halloween',
  },
  {
    id: 'ocd-2026',
    badge: 'COUNTDOWN TO OCD 2026 🔥',
    liveBadge: '🔥 OTAKU DAY IS LIVE NOW!',
    title: 'Otaku Community Day • Nov 22 (12 PM – 5 PM)',
    liveTitle: 'Otaku Community Day • Festival Underway (Until 5 PM)',
    startDate: new Date('2026-11-22T12:00:00+05:30').getTime(),
    endDate: new Date('2026-11-22T17:00:00+05:30').getTime(),
    url: 'https://greet.fydo.in/otaku-community-day-2026',
    ariaLabel: 'Book Passes for Otaku Community Day 2026',
    theme: 'otaku',
  },
];

interface CountdownState {
  activeEvent: EventSchedule | null;
  isLive: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isAllExpired: boolean;
}

function calculateState(): CountdownState {
  const now = Date.now();
  const current = EVENT_SCHEDULE.find((ev) => now < ev.endDate);

  if (!current) {
    return {
      activeEvent: null,
      isLive: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isAllExpired: true,
    };
  }

  const isLive = now >= current.startDate && now < current.endDate;
  const target = isLive ? current.endDate : current.startDate;
  const diff = target - now;

  return {
    activeEvent: current,
    isLive,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isAllExpired: false,
  };
}

export default function EventCountdown() {
  const [state, setState] = useState<CountdownState>(calculateState);

  useEffect(() => {
    const updateCountdown = () => {
      setState(calculateState());
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (state.isAllExpired || !state.activeEvent) return null;

  const { activeEvent, isLive, days, hours, minutes, seconds } = state;
  const isHalloween = activeEvent.theme === 'halloween';
  const pad = (n: number) => String(n).padStart(2, '0');

  const currentBadge = isLive ? activeEvent.liveBadge : activeEvent.badge;
  const currentTitle = isLive ? activeEvent.liveTitle : activeEvent.title;

  return (
    <a
      href={activeEvent.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={activeEvent.ariaLabel}
      className={`group w-full mb-3 p-3 xs:p-3.5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 cursor-pointer ${
        isHalloween
          ? 'bg-gradient-to-r from-purple-950/40 via-orange-950/25 to-purple-950/40 border-purple-500/40 hover:border-orange-400 shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(249,115,22,0.4)]'
          : 'bg-gradient-to-r from-[#D91515]/20 via-[#F3B334]/15 to-[#D91515]/20 border-[#F3B334]/40 hover:border-[#F3B334] shadow-glow-gold'
      }`}
      title={activeEvent.ariaLabel}
    >
      {/* Left: Badge & Title */}
      <div className="flex items-center gap-2.5">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${
            isHalloween
              ? 'bg-purple-900/40 border border-purple-500/60 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
              : 'bg-[#D91515]/30 border border-[#D91515]/50 shadow-glow-red'
          }`}
        >
          {isHalloween ? (
            <Ghost className="w-4 h-4 text-orange-400 animate-pulse" />
          ) : (
            <Flame className="w-4 h-4 text-[#F3B334] animate-pulse" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[10px] font-mono tracking-wider font-bold uppercase ${
                isHalloween ? 'text-orange-400' : 'text-[#F3B334]'
              }`}
            >
              {currentBadge}
            </span>
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full animate-ping ${
                isHalloween ? 'bg-orange-500' : 'bg-[#D91515]'
              }`}
            />
          </div>
          <p className="text-xs text-gray-200 font-semibold group-hover:text-white transition-colors">
            {currentTitle}
          </p>
        </div>
      </div>

      {/* Right: Live Ticking Counter */}
      <div className="flex items-center gap-1.5 self-center sm:self-auto font-mono text-center">
        {/* Days */}
        <div className="px-2 py-1 rounded-lg bg-black/60 border border-white/10 min-w-[36px]">
          <div className="text-xs xs:text-sm font-bold text-white leading-tight">
            {pad(days)}
          </div>
          <div className="text-[8px] text-gray-400 uppercase tracking-wider">Days</div>
        </div>
        <span
          className={`font-bold text-xs pb-2 ${
            isHalloween ? 'text-orange-400' : 'text-[#F3B334]'
          }`}
        >
          :
        </span>

        {/* Hours */}
        <div className="px-2 py-1 rounded-lg bg-black/60 border border-white/10 min-w-[36px]">
          <div className="text-xs xs:text-sm font-bold text-white leading-tight">
            {pad(hours)}
          </div>
          <div className="text-[8px] text-gray-400 uppercase tracking-wider">Hrs</div>
        </div>
        <span
          className={`font-bold text-xs pb-2 ${
            isHalloween ? 'text-orange-400' : 'text-[#F3B334]'
          }`}
        >
          :
        </span>

        {/* Minutes */}
        <div className="px-2 py-1 rounded-lg bg-black/60 border border-white/10 min-w-[36px]">
          <div className="text-xs xs:text-sm font-bold text-white leading-tight">
            {pad(minutes)}
          </div>
          <div className="text-[8px] text-gray-400 uppercase tracking-wider">Min</div>
        </div>
        <span
          className={`font-bold text-xs pb-2 ${
            isHalloween ? 'text-orange-400' : 'text-[#F3B334]'
          }`}
        >
          :
        </span>

        {/* Seconds (Pulsing Highlight) */}
        <div
          className={`px-2 py-1 rounded-lg bg-black/60 min-w-[36px] shadow-sm ${
            isHalloween
              ? 'border border-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.25)]'
              : 'border border-[#F3B334]/30'
          }`}
        >
          <div
            className={`text-xs xs:text-sm font-bold leading-tight animate-pulse ${
              isHalloween ? 'text-orange-400' : 'text-[#F3B334]'
            }`}
          >
            {pad(seconds)}
          </div>
          <div
            className={`text-[8px] uppercase tracking-wider ${
              isHalloween ? 'text-orange-400/80' : 'text-[#F3B334]/80'
            }`}
          >
            Sec
          </div>
        </div>

        {/* Action Icon */}
        <div
          className={`hidden xs:flex items-center justify-center pl-1 text-gray-400 transition-all ${
            isHalloween
              ? 'group-hover:text-orange-400 group-hover:translate-x-0.5'
              : 'group-hover:text-[#F3B334] group-hover:translate-x-0.5'
          }`}
        >
          {isHalloween ? (
            <Sparkles className="w-4 h-4" />
          ) : (
            <Ticket className="w-4 h-4" />
          )}
        </div>
      </div>
    </a>
  );
}
