import { Search, MapPin, Calendar, User, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  activeView: 'matches' | 'stadiums' | 'cities';
  onNavigate: (view: 'matches' | 'stadiums' | 'cities') => void;
}

export default function Header({ activeView, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div 
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => onNavigate('matches')}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded bg-accent text-black font-black italic text-xl">
            WC
          </div>
          <span className="font-display text-2xl font-black tracking-tighter text-white italic uppercase">
            Goal<span className="text-accent underline decoration-white/20">Flow</span>
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex uppercase text-[11px] font-black tracking-widest text-slate-400">
          <button 
            onClick={() => onNavigate('matches')}
            className={`${activeView === 'matches' ? 'text-accent border-b-2 border-accent pb-1' : 'hover:text-white transition-colors'}`}
          >
            Matches
          </button>
          <button 
            onClick={() => onNavigate('stadiums')}
            className={`${activeView === 'stadiums' ? 'text-accent border-b-2 border-accent pb-1' : 'hover:text-white transition-colors'}`}
          >
            Stadiums
          </button>
          <button 
            onClick={() => onNavigate('cities')}
            className={`${activeView === 'cities' ? 'text-accent border-b-2 border-accent pb-1' : 'hover:text-white transition-colors'}`}
          >
            Host Cities
          </button>
          <button className="hover:text-white transition-colors">Fan ID</button>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white md:block transition-colors">
            Help
          </button>
          <div className="h-10 w-10 rounded bg-secondary border border-white/10 flex items-center justify-center text-slate-400 hover:text-accent cursor-pointer transition-colors">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
