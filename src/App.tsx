import { Header }          from './components/Header';
import { KpiStrip }        from './components/KpiStrip';
import { AlertBanner }     from './components/AlertBanner';
import { WaitTimeChart }   from './components/WaitTimeChart';
import { LiveBottlenecks } from './components/LiveBottlenecks';
import { LaneHeatmap }     from './components/LaneHeatmap';
import { ContractorTable } from './components/ContractorTable';
import { ShiftAnalysis }   from './components/ShiftAnalysis';
import { AiInsights }      from './components/AiInsights';
import { TruckLog }        from './components/TruckLog';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0d16]">
      <Header />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-4">
        <KpiStrip />
        <AlertBanner />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <WaitTimeChart />
          </div>
          <LiveBottlenecks />
        </div>

        <LaneHeatmap />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ContractorTable />
          <ShiftAnalysis />
        </div>

        <AiInsights />
        <TruckLog />

        <footer className="pb-8 pt-4 text-center space-y-1.5">
          <div className="flex items-center justify-center gap-3 text-[11px] text-slate-600">
            <span>PortPulse</span>
            <span>·</span>
            <span>Dead Time Analytics voor haventerminals</span>
            <span>·</span>
            <a
              href="https://github.com/KippieG/portpulse"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              github.com/KippieG/portpulse
            </a>
          </div>
          <p className="text-[11px] text-slate-700">
            Gebouwd door Philippe Godfroy · Zeebrugge Container Terminal demo
          </p>
        </footer>
      </main>
    </div>
  );
}
