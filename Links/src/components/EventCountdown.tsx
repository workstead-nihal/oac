import { useState, useEffect } from 'react';
import { Flame, Ticket } from 'lucide-react';

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
}

/**
 * Chronological event schedule:
 * Otaku Community Day 2026:
 * - Starts: Nov 22, 2026 at 12:00 PM IST (12:00)
 * - Ends:   Nov 22, 2026 at 5:00 PM IST (17:00)
 */
const EVENT_SCHEDULE: EventSchedule[] = [
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
  const pad = (n: number) => String(n).padStart(2, '0');

  const currentBadge = isLive ? activeEvent.liveBadge : activeEvent.badge;
  const currentTitle = isLive ? activeEvent.liveTitle : activeEvent.title;

  return (
    <a
      href={activeEvent.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={activeEvent.ariaLabel}
      className="group w-full mb-3 p-3 xs:p-3.5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 cursor-pointer bg-gradient-to-r from-[#D91515]/20 via-[#F3B334]/15 to-[#D91515]/20 border-[#F3B334]/40 hover:border-[#F3B334] shadow-glow-gold"
      title={activeEvent.ariaLabel}
    >
      {/* Left: Badge & Title */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform bg-[#D91515]/30 border border-[#D91515]/50 shadow-glow-red">
          <Flame className="w-4 h-4 text-[#F3B334] animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono tracking-wider font-bold uppercase text-[#F3B334]">
              {currentBadge}
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full animate-ping bg-[#D91515]" />
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
        <span className="font-bold text-xs pb-2 text-[#F3B334]">:</span>

        {/* Hours */}
        <div className="px-2 py-1 rounded-lg bg-black/60 border border-white/10 min-w-[36px]">
          <div className="text-xs xs:text-sm font-bold text-white leading-tight">
            {pad(hours)}
          </div>
          <div className="text-[8px] text-gray-400 uppercase tracking-wider">Hrs</div>
        </div>
        <span className="font-bold text-xs pb-2 text-[#F3B334]">:</span>

        {/* Minutes */}
        <div className="px-2 py-1 rounded-lg bg-black/60 border border-white/10 min-w-[36px]">
          <div className="text-xs xs:text-sm font-bold text-white leading-tight">
            {pad(minutes)}
          </div>
          <div className="text-[8px] text-gray-400 uppercase tracking-wider">Min</div>
        </div>
        <span className="font-bold text-xs pb-2 text-[#F3B334]">:</span>

        {/* Seconds (Pulsing Highlight) */}
        <div className="px-2 py-1 rounded-lg bg-black/60 min-w-[36px] shadow-sm border border-[#F3B334]/30">
          <div className="text-xs xs:text-sm font-bold leading-tight animate-pulse text-[#F3B334]">
            {pad(seconds)}
          </div>
          <div className="text-[8px] uppercase tracking-wider text-[#F3B334]/80">
            Sec
          </div>
        </div>

        {/* Action Icon */}
        <div className="hidden xs:flex items-center justify-center pl-1 text-gray-400 transition-all group-hover:text-[#F3B334] group-hover:translate-x-0.5">
          <Ticket className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
}
