import { useState, useEffect } from 'react';
import { Flame, Ticket } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const TARGET_DATE = new Date('2026-11-22T12:00:00+05:30').getTime();

export default function EventCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft.isExpired) return null;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <a
      href="https://greet.fydo.in/otaku-community-day-2026"
      target="_blank"
      rel="noopener noreferrer"
      className="group w-full mb-3 p-3 xs:p-3.5 rounded-2xl bg-gradient-to-r from-[#D91515]/20 via-[#F3B334]/15 to-[#D91515]/20 border border-[#F3B334]/40 hover:border-[#F3B334] backdrop-blur-md shadow-glow-gold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5"
      title="Book Passes for Otaku Community Day 2026"
    >
      {/* Left: Badge & Title */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-[#D91515]/30 border border-[#D91515]/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
          <Flame className="w-4 h-4 text-[#F3B334] animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono tracking-wider text-[#F3B334] font-bold uppercase">
              COUNTDOWN TO OCD 2026
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D91515] animate-ping" />
          </div>
          <p className="text-xs text-gray-200 font-semibold group-hover:text-white transition-colors">
            Otaku Community Day • Nov 22, 2026
          </p>
        </div>
      </div>

      {/* Right: Live Ticking Counter */}
      <div className="flex items-center gap-1.5 self-center sm:self-auto font-mono text-center">
        {/* Days */}
        <div className="px-2 py-1 rounded-lg bg-black/60 border border-white/10 min-w-[36px]">
          <div className="text-xs xs:text-sm font-bold text-white leading-tight">
            {pad(timeLeft.days)}
          </div>
          <div className="text-[8px] text-gray-400 uppercase tracking-wider">Days</div>
        </div>
        <span className="text-[#F3B334] font-bold text-xs pb-2">:</span>

        {/* Hours */}
        <div className="px-2 py-1 rounded-lg bg-black/60 border border-white/10 min-w-[36px]">
          <div className="text-xs xs:text-sm font-bold text-white leading-tight">
            {pad(timeLeft.hours)}
          </div>
          <div className="text-[8px] text-gray-400 uppercase tracking-wider">Hrs</div>
        </div>
        <span className="text-[#F3B334] font-bold text-xs pb-2">:</span>

        {/* Minutes */}
        <div className="px-2 py-1 rounded-lg bg-black/60 border border-white/10 min-w-[36px]">
          <div className="text-xs xs:text-sm font-bold text-white leading-tight">
            {pad(timeLeft.minutes)}
          </div>
          <div className="text-[8px] text-gray-400 uppercase tracking-wider">Min</div>
        </div>
        <span className="text-[#F3B334] font-bold text-xs pb-2">:</span>

        {/* Seconds */}
        <div className="px-2 py-1 rounded-lg bg-black/60 border border-[#F3B334]/30 min-w-[36px] shadow-sm">
          <div className="text-xs xs:text-sm font-bold text-[#F3B334] leading-tight animate-pulse">
            {pad(timeLeft.seconds)}
          </div>
          <div className="text-[8px] text-[#F3B334]/80 uppercase tracking-wider">Sec</div>
        </div>

        {/* Action arrow */}
        <div className="hidden xs:flex items-center justify-center pl-1 text-gray-400 group-hover:text-[#F3B334] group-hover:translate-x-0.5 transition-all">
          <Ticket className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
}
