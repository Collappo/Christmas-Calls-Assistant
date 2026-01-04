
import React, { useState } from 'react';
import { Minus, Plus, Save, PlusCircle } from 'lucide-react';
import { NewKoledaData, KoledaSession } from '../types';

interface VisitFormProps {
  initialData?: KoledaSession;
  onSubmit: (data: NewKoledaData) => void;
  onCancel: () => void;
}

const VisitForm: React.FC<VisitFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [houses, setHouses] = useState(initialData?.housesVisited || 0);
  const [amount, setAmount] = useState(initialData?.totalOfferings?.toString() || '0');
  const [addAmount, setAddAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Podaj nazwę ulicy / rejonu.");

    onSubmit({
      name,
      date,
      housesVisited: houses,
      totalOfferings: parseFloat(amount) || 0,
    });
  };

  const adjustHouses = (delta: number) => {
    setHouses(prev => Math.max(0, prev + delta));
  };

  const handleAddToTotal = () => {
    const toAdd = parseFloat(addAmount) || 0;
    if (toAdd > 0) {
      const current = parseFloat(amount) || 0;
      setAmount((current + toAdd).toString());
      setAddAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-7 px-4 space-y-7 max-h-[80%] overflow-y-auto bg-slate-900 flex flex-col">
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest ml-1 text-slate-500">Ulica / Rejon</label>
          <input
            type="text"
            required
            placeholder="np. ul. Lipowa (strona nieparzysta)"
            className="w-full px-5 py-4 bg-slate-800 border border-white/5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/5 font-medium text-slate-100 placeholder:text-slate-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest ml-1 text-slate-500">Data</label>
          <input
            type="date"
            required
            className="w-full px-5 py-4 bg-slate-800 border border-white/5 rounded-2xl focus:outline-none font-medium text-slate-100"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Quick Add Section */}
        <div className="p-4 glass-theme rounded-3xl space-y-3">
          <label className="text-xs font-bold theme-primary uppercase tracking-widest ml-1 flex items-center gap-2">
            <PlusCircle className="w-3.5 h-3.5" />
            Dolicz nową ofiarę
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              inputMode="decimal"
              placeholder="Kwota..."
              className="flex-1 px-3 py-3 bg-slate-900 border border-white/10 rounded-xl focus:outline-none font-bold tabular-nums text-slate-100"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
            // onKeyDown={(e) => {
            //   if (e.key === 'Enter') {
            //     e.preventDefault();
            //     handleAddToTotal();
            //   }
            // }}
            />
            <button
              type="button"
              onClick={handleAddToTotal}
              className="px-6 theme-bg-primary text-white font-bold rounded-xl active:scale-95  shadow-sm"
            >
              Dodaj
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest ml-1 text-slate-500">Liczba domów</label>
            <div className="flex items-center justify-between p-2 bg-slate-800 border border-white/5 rounded-2xl">
              <button
                type="button"
                onClick={() => adjustHouses(-1)}
                className="w-10 h-10 flex items-center justify-center bg-slate-700 border border-white/5 text-slate-300 rounded-xl shadow-sm  active:scale-90"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-extrabold text-xl tabular-nums text-slate-100">{houses}</span>
              <button
                type="button"
                onClick={() => adjustHouses(1)}
                className="w-10 h-10 flex items-center justify-center bg-slate-700 border border-white/5 text-slate-300 rounded-xl shadow-sm  active:scale-90"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest ml-1 text-slate-500">Suma ofiar (zł)</label>
            <input
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="w-full px-5 py-4 bg-slate-800 border border-white/5 rounded-2xl focus:outline-none font-extrabold text-lg tabular-nums theme-primary"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 bg-slate-900">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-4 font-bold text-slate-500 hover:text-slate-300 rounded-2xl"
        >
          Anuluj
        </button>
        <button
          type="submit"
          className="flex-[1.5] flex items-center justify-center gap-3 py-4 theme-bg-primary text-white font-extrabold rounded-2xl shadow-xl"
        >
          <Save className="w-5 h-5" />
          {initialData ? 'Zaktualizuj' : 'Zapisz kolędę'}
        </button>
      </div>
    </form>
  );
};

export default VisitForm;
