
import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Calendar, X } from 'lucide-react';
import { KoledaSession, NewKoledaData, Theme } from './types';
import VisitCard from './components/VisitCard';
import VisitForm from './components/VisitForm';
import SummaryHeader from './components/SummaryHeader';
import SettingsModal from './components/SettingsModal';

const STORAGE_KEY = 'asystent_koledowy_data';
const THEME_KEY = 'asystent_koledowy_theme';

const App: React.FC = () => {
  const [sessions, setSessions] = useState<KoledaSession[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<KoledaSession | null>(null);

  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(THEME_KEY) as Theme) || 'green');

  // Load session data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    console.log(saved)
    if (saved) {
      try {
        console.log(1)
        setSessions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse storage data", e);
      }
    }
  }, []);

  // Save session data
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  // Handle Theme application
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const totalSum = useMemo(() =>
    sessions.reduce((acc, curr) => acc + curr.totalOfferings, 0),
    [sessions]);

  const totalChristmasCalls = sessions.length;

  const handleSave = (data: NewKoledaData) => {
    if (editingSession) {
      setSessions(prev => prev.map(s =>
        s.id === editingSession.id ? { ...s, ...data } : s
      ));
    } else {
      const newSession: KoledaSession = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      };
      setSessions(prev => [newSession, ...prev]);
    }
    closeModal();
  };

  const deleteSession = (id: string) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten rekord?")) {
      setSessions(prev => prev.filter(s => s.id !== id));
    }
  };

  const startEdit = (session: KoledaSession) => {
    setEditingSession(session);
    setIsFormOpen(true);
  };

  const closeModal = () => {
    setIsFormOpen(false);
    setEditingSession(null);
  };

  const clearAll = () => {
    if (window.confirm("UWAGA: Wszystkie dane zostaną bezpowrotnie usunięte. Kontynuować?")) {
      setSessions([]);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen h-screen flex flex-col pb-28 px-4 pt-4">
      <SummaryHeader
        totalSum={totalSum}
        totalChristmasCalls={totalChristmasCalls}
        onSettingsOpen={() => setIsSettingsOpen(true)}
      />

      <main className="flex-1 pt-8 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--text)' }}>Twoje Kolędy</h2>
          {sessions.length > 0 && (
            <button
              onClick={clearAll}
              className="text-[10px] font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest px-2 py-1 rounded-lg hover:bg-red-500/10"
            >
              Usuń wszystko
            </button>
          )}
        </div>

        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="w-20 h-20 bg-slate-800 rounded-3xl shadow-sm flex items-center justify-center border border-white/5">
              <Calendar className="w-10 h-10 theme-primary opacity-40" />
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-lg" style={{ color: 'var(--text)' }}>Zacznij liczenie</p>
              <p className="text-sm max-w-[200px] mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>Dodaj pierwszą wizytę, aby śledzić ofiary.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {sessions.map((session) => (
              <VisitCard
                key={session.id}
                session={session}
                onDelete={() => deleteSession(session.id)}
                onEdit={() => startEdit(session)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center px-6 pointer-events-none z-30">
        <button
          onClick={() => setIsFormOpen(true)}
          className="pointer-events-auto flex items-center gap-3 theme-bg-primary text-white pl-5 pr-7 py-4 rounded-[1.75rem] shadow-2xl active:scale-95 transition-all group"
          style={{ boxShadow: '0 15px 30px -10px var(--primary)' }}
        >
          <div className="bg-white/20 p-1.5 rounded-xl ">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </div>
          <span className="font-bold tracking-tight">Nowa kolęda</span>
        </button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 w-full max-w-md rounded-4xl shadow-2xl overflow-hidden border border-white/10">
            <div className="flex items-center justify-between p-7 border-b border-white/5">
              <h3 className="text-xl font-extrabold" style={{ color: 'var(--text)' }}>
                {editingSession ? 'Edytuj kolędę' : 'Nowa kolęda'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2.5 bg-slate-800 rounded-2xl"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <VisitForm
              initialData={editingSession || undefined}
              onSubmit={handleSave}
              onCancel={closeModal}
            />
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          currentTheme={theme}
          onThemeChange={setTheme}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
