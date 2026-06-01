import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { contractorStats } from '../data/terminalData';

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80 ? 'bg-green-500/15 text-green-400 border-green-500/25' :
    score >= 65 ? 'bg-amber-500/15 text-amber-400 border-amber-500/25' :
    score >= 50 ? 'bg-orange-500/15 text-orange-400 border-orange-500/25' :
                  'bg-red-500/15 text-red-400 border-red-500/25';

  return (
    <span className={`inline-flex items-center justify-center w-9 h-6 rounded-md border text-xs font-bold tabular-nums ${color}`}>
      {score}
    </span>
  );
}

function TrendIcon({ trend }: { trend: 'improving' | 'stable' | 'worsening' }) {
  if (trend === 'improving') return <TrendingDown size={13} className="text-green-400" />;
  if (trend === 'worsening') return <TrendingUp size={13} className="text-red-400" />;
  return <Minus size={13} className="text-slate-500" />;
}

export function ContractorTable() {
  const sorted = [...contractorStats].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-[#111827] rounded-xl border border-white/5 p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white">Contractor ranking</h2>
        <p className="text-xs text-slate-500 mt-0.5">Gesorteerd op efficiëntiescore — deze week</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/5">
              <th className="pb-2 text-left text-[10px] text-slate-500 font-medium uppercase tracking-wide w-5">#</th>
              <th className="pb-2 text-left text-[10px] text-slate-500 font-medium uppercase tracking-wide">Contractor</th>
              <th className="pb-2 text-right text-[10px] text-slate-500 font-medium uppercase tracking-wide">Score</th>
              <th className="pb-2 text-right text-[10px] text-slate-500 font-medium uppercase tracking-wide">Gem. wacht</th>
              <th className="pb-2 text-right text-[10px] text-slate-500 font-medium uppercase tracking-wide">On time</th>
              <th className="pb-2 text-right text-[10px] text-slate-500 font-medium uppercase tracking-wide">Kosten</th>
              <th className="pb-2 text-center text-[10px] text-slate-500 font-medium uppercase tracking-wide">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sorted.map((c, i) => (
              <tr key={c.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="py-2.5 pr-3 text-slate-600 font-mono">{i + 1}</td>
                <td className="py-2.5 pr-4">
                  <div>
                    <p className="text-slate-200 font-medium">{c.name}</p>
                    <p className="text-slate-600 text-[10px]">{c.shift}</p>
                  </div>
                </td>
                <td className="py-2.5 text-right"><ScoreBadge score={c.score} /></td>
                <td className="py-2.5 text-right">
                  <span className={c.avgWait > 45 ? 'text-red-400' : c.avgWait > 30 ? 'text-amber-400' : 'text-green-400'}>
                    {c.avgWait} min
                  </span>
                </td>
                <td className="py-2.5 text-right text-slate-300">{c.onTimeRate}%</td>
                <td className="py-2.5 text-right text-slate-400">
                  €{c.costImpact.toLocaleString('nl')}
                </td>
                <td className="py-2.5 text-center"><TrendIcon trend={c.trend} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
