
import React from 'react';
import { Home, TrendingUp, Settings } from 'lucide-react';

interface SummaryHeaderProps {
  totalSum: number;
  totalChristmasCalls: number;
  onSettingsOpen: () => void;
}

const SummaryHeader: React.FC<SummaryHeaderProps> = ({ totalSum, totalChristmasCalls, onSettingsOpen }) => {
  return (
    <header className="sticky z-40 w-full px-5 pt-6 pb-8 glass rounded-2xl border-b border-slate-200/60 dark:border-white/5 shadow-sm">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full flex justify-between items-start">
          <div className="w-10"></div> {/* Spacer */}
          <div className="text-center space-y-1">
            <p className="text-[11px] font-extrabold theme-primary uppercase tracking-[0.3em] opacity-90">
              Suma zebranych ofiar
            </p>
            <h1 className="text-4xl font-extrabold tracking-tighter tabular-nums" style={{ color: 'var(--text)' }}>
              {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(totalSum)}
            </h1>
          </div>
          <button
            onClick={onSettingsOpen}
            className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Settings className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="glass-theme rounded-2xl p-4 flex flex-col items-center shadow-sm transition-all">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <Home className="w-3.5 h-3.5 theme-primary" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Kolędy</span>
            </div>
            <span className="text-2xl font-black tabular-nums leading-none" style={{ color: 'var(--text)' }}>{totalChristmasCalls}</span>
          </div>

          <div className="glass-theme rounded-2xl p-4 flex flex-col items-center shadow-sm transition-all">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <TrendingUp className="w-3.5 h-3.5 theme-primary" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Średnia</span>
            </div>
            <span className="text-2xl font-black tabular-nums leading-none" style={{ color: 'var(--text)' }}>
              {totalChristmasCalls > 0 ? Math.floor(totalSum / totalChristmasCalls) : 0}<span className="text-xs font-bold ml-0.5 opacity-50">zł</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SummaryHeader;
