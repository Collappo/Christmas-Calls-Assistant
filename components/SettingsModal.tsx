
import React from 'react';
import { X, Check } from 'lucide-react';
import { Theme } from '../types';

interface SettingsModalProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  currentTheme,
  onThemeChange,
  onClose
}) => {
  const themes: { id: Theme; label: string; color: string }[] = [
    { id: 'green', label: 'Klasyczny', color: '#24bb30' },
    { id: 'blue', label: 'Nowoczesny', color: '#1d4ed8' },
    { id: 'purple', label: 'Dostojny', color: '#7e22ce' },
    { id: 'gold', label: 'Szlachetny', color: '#a16207' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-white/10">
        <div className="flex items-center justify-between p-7 border-b border-white/5">
          <h3 className="text-xl font-extrabold" style={{ color: 'var(--text)' }}>Ustawienia</h3>
          <button
            onClick={onClose}
            className="p-2.5 bg-slate-800 rounded-2xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-7 space-y-8">
          {/* Theme Switcher */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest opacity-60" style={{ color: 'var(--text)' }}>Motyw kolorystyczny</p>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onThemeChange(theme.id)}
                  className={`relative flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${currentTheme === theme.id ? 'theme-border-primary bg-slate-800 shadow-lg' : 'border-white/5 hover:border-white/10'}`}
                >
                  <div
                    className="w-8 h-8 rounded-xl shadow-sm shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: theme.color }}
                  >
                    {currentTheme === theme.id && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`text-xs font-bold ${currentTheme === theme.id ? 'theme-primary' : 'text-slate-400'}`}>{theme.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-7 pt-0">
          <button
            onClick={onClose}
            className="w-full py-4 theme-bg-primary text-white font-extrabold rounded-2xl shadow-lg active:scale-95 transition-all"
          >
            Gotowe
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
