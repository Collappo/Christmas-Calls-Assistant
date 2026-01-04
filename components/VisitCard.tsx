
import React from 'react';
import { Trash2, Edit3, MapPin, Calendar, Home, Wallet } from 'lucide-react';
import { KoledaSession } from '../types';

interface VisitCardProps {
  session: KoledaSession;
  onDelete: () => void;
  onEdit: () => void;
}

const VisitCard: React.FC<VisitCardProps> = ({ session, onDelete, onEdit }) => {
  return (
    <div className="bg-slate-900/40 rounded-[2rem] border border-white/5 card-shadow overflow-hidden transition-all group active:scale-[0.98]">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              <Calendar className="w-3 h-3" />
              <span>{session.date}</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1 glass-theme p-1 rounded-md">
                <MapPin className="w-3.5 h-3.5 theme-primary" />
              </div>
              <h3 className="font-extrabold text-lg leading-tight tracking-tight" style={{ color: 'var(--text)' }}>
                {session.name}
              </h3>
            </div>
          </div>
          
          <div className="flex gap-1">
            <button 
              onClick={onEdit}
              className="p-2.5 text-slate-500 hover:theme-primary hover:bg-white/5 rounded-xl transition-all"
            >
              <Edit3 className="w-4.5 h-4.5" />
            </button>
            <button 
              onClick={onDelete}
              className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
          <div className="flex flex-col p-3 rounded-2xl bg-slate-800/40">
            <div className="flex items-center gap-2 mb-1.5 opacity-60">
              <Home className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Domy</span>
            </div>
            <span className="font-extrabold text-lg tabular-nums" style={{ color: 'var(--text)' }}>
              {session.housesVisited}
            </span>
          </div>

          <div className="flex flex-col p-3 rounded-2xl glass-theme">
            <div className="flex items-center gap-2 mb-1.5">
              <Wallet className="w-3 h-3 theme-primary" />
              <span className="text-[10px] uppercase font-bold theme-primary tracking-wider">Suma</span>
            </div>
            <span className="font-extrabold text-lg tabular-nums" style={{ color: 'var(--text)' }}>
              {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(session.totalOfferings)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitCard;
