import { Clock, BarChart2, Euro, Truck, Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { kpis } from '../data/terminalData';

interface CardProps {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  iconBg: string;
  deltaPositiveIsGood: boolean;
  delta: number;
  highlight?: boolean;
}

function KpiCard({ label, value, sub, icon, iconBg, deltaPositiveIsGood, delta, highlight }: CardProps) {
  const isGood = deltaPositiveIsGood ? delta > 0 : delta < 0;
  return (
    <div className={`bg-[#111827] rounded-xl p-4 border flex flex-col gap-3 ${highlight ? 'border-red-500/25 shadow-[0_0_24px_rgba(239,68,68,0.08)]' : 'border-white/5'}`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-medium uppercase tracking-widest">{label}</span>
        <div className={`p-1.5 rounded-lg ${iconBg}`}>{icon}</div>
      </div>
      <div>
        <p className={`text-2xl font-bold ${highlight ? 'text-red-400' : 'text-white'}`}>{value}</p>
        <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
      </div>
      <div className={`flex items-center gap-1 text-xs font-medium ${isGood ? 'text-green-400' : 'text-red-400'}`}>
        {isGood ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
        <span>{delta > 0 ? '+' : ''}{delta}% vs gisteren</span>
      </div>
    </div>
  );
}

export function KpiStrip() {
  const [cost, setCost] = useState(kpis.costToday);

  useEffect(() => {
    const ratePerSecond = kpis.costToday / 86400;
    const t = setInterval(() => setCost(c => c + ratePerSecond), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (n: number) =>
    new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
      <KpiCard
        label="Gem. wachttijd"
        value={`${kpis.avgWaitMin} min`}
        sub="per truck vandaag"
        icon={<Clock size={14} className="text-amber-400" />}
        iconBg="bg-amber-500/10"
        deltaPositiveIsGood={false}
        delta={kpis.avgWaitDelta}
        highlight={false}
      />
      <KpiCard
        label="Dead time"
        value={`${kpis.deadTimeHours.toLocaleString('nl')} uur`}
        sub="gecumuleerd vandaag"
        icon={<BarChart2 size={14} className="text-orange-400" />}
        iconBg="bg-orange-500/10"
        deltaPositiveIsGood={false}
        delta={kpis.deadTimeDelta}
      />
      <div className="bg-[#111827] rounded-xl p-4 border border-red-500/25 shadow-[0_0_24px_rgba(239,68,68,0.08)] flex flex-col gap-3 col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium uppercase tracking-widest">Kosten vandaag</span>
          <div className="p-1.5 rounded-lg bg-red-500/10">
            <Euro size={14} className="text-red-400" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-red-400 tabular-nums">{fmt(cost)}</p>
          <p className="text-xs text-slate-500 mt-0.5">verloren aan dead time</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-red-400">
          <TrendingUp size={12} />
          <span>+{kpis.costDelta}% vs gisteren</span>
        </div>
      </div>
      <KpiCard
        label="Trucks verwerkt"
        value={kpis.trucksProcessed.toLocaleString('nl')}
        sub="vandaag totaal"
        icon={<Truck size={14} className="text-cyan-400" />}
        iconBg="bg-cyan-500/10"
        deltaPositiveIsGood={true}
        delta={kpis.trucksDelta}
      />
      <KpiCard
        label="Efficiëntiescore"
        value={`${kpis.efficiencyScore}/100`}
        sub="operationeel"
        icon={<Zap size={14} className="text-violet-400" />}
        iconBg="bg-violet-500/10"
        deltaPositiveIsGood={true}
        delta={kpis.efficiencyDelta}
      />
    </div>
  );
}
