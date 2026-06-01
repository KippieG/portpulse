import { Clock, CheckCircle2, AlertCircle, Hourglass } from 'lucide-react';
import { recentTrucks } from '../data/terminalData';

const statusConfig = {
  completed: { icon: <CheckCircle2 size={13} className="text-green-400" />,  label: 'Gereed',  color: 'text-green-400'  },
  delayed:   { icon: <AlertCircle  size={13} className="text-red-400" />,    label: 'Vertraging', color: 'text-red-400' },
  waiting:   { icon: <Hourglass    size={13} className="text-amber-400" />,  label: 'Wachtend', color: 'text-amber-400' },
} as const;

export function TruckLog() {
  return (
    <div className="bg-[#111827] rounded-xl border border-white/5 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-white">Recente truck events</h2>
          <p className="text-xs text-slate-500 mt-0.5">Live log — meest recente transits</p>
        </div>
        <span className="text-[10px] text-slate-600 bg-white/5 px-2 py-1 rounded-md">Vandaag · 08:41 – 10:22</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/5">
              {['Kenteken', 'Gate / Lane', 'Contractor', 'Aankomst', 'Gate klaar', 'Exit', 'Wacht', 'Status'].map(h => (
                <th key={h} className="pb-2 text-left text-[10px] text-slate-500 font-medium uppercase tracking-wide pr-4 last:pr-0">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {recentTrucks.map(t => {
              const s = statusConfig[t.status];
              return (
                <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 pr-4 font-mono text-slate-300 font-medium">{t.plate}</td>
                  <td className="py-2.5 pr-4">
                    <span className="text-slate-400">{t.gate}</span>
                    <span className="text-slate-600"> / </span>
                    <span className="text-slate-500">{t.lane}</span>
                  </td>
                  <td className="py-2.5 pr-4 text-slate-400 max-w-[140px] truncate">{t.contractor}</td>
                  <td className="py-2.5 pr-4 text-slate-300 font-mono flex items-center gap-1">
                    <Clock size={10} className="text-slate-600" />{t.arrived}
                  </td>
                  <td className="py-2.5 pr-4 font-mono text-slate-400">{t.gateCleared}</td>
                  <td className="py-2.5 pr-4 font-mono text-slate-400">{t.exitTime}</td>
                  <td className="py-2.5 pr-4">
                    <span className={
                      t.waitMin > 60 ? 'text-red-400 font-bold' :
                      t.waitMin > 40 ? 'text-amber-400 font-medium' :
                      'text-slate-300'
                    }>
                      {t.waitMin} min
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span className={`flex items-center gap-1.5 ${s.color}`}>
                      {s.icon}{s.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
