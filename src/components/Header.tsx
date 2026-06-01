import { Activity, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="border-b border-white/5 bg-[#0b0d16]/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-cyan-500 rounded-lg flex items-center justify-center shrink-0">
              <Activity size={14} className="text-black" strokeWidth={3} />
            </div>
            <span className="font-bold text-white tracking-tight text-[15px]">PortPulse</span>
          </div>
          <span className="hidden sm:block text-slate-700 select-none">·</span>
          <button className="hidden sm:flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
            Zeebrugge Container Terminal (ZCT)
            <ChevronDown size={13} />
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="hidden md:block text-[11px] text-slate-600">
            Bijgewerkt {seconds}s geleden
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 rounded-full border border-green-500/20">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[11px] text-green-400 font-semibold tracking-wide">LIVE</span>
          </div>
          <span className="hidden sm:block text-[11px] text-slate-600">ma 2 jun 2026</span>
        </div>
      </div>
    </header>
  );
}
