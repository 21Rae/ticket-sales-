import { Search, MapPin, Calendar, User as UserIcon, Sparkles, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocation, Link } from 'react-router-dom';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onAuthClick: () => void;
  onLogout: () => void;
  onNavigate: (view: any) => void;
}

export default function Header({ user, onAuthClick, onLogout, onNavigate }: HeaderProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link 
          to="/matches"
          className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity shrink-0"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded bg-accent text-black font-black italic text-xl">
            TH
          </div>
          <span className="font-display text-xl lg:text-2xl font-black tracking-tighter text-white italic uppercase hidden sm:block whitespace-nowrap">
            Ticket<span className="text-accent underline decoration-white/20">Hub</span>
          </span>
        </Link>

        <nav className="hidden items-center md:gap-3 lg:gap-6 xl:gap-8 md:flex uppercase text-[10px] lg:text-[11px] font-black tracking-widest text-slate-400 italic">
          <Link 
            to="/matches"
            className={`whitespace-nowrap ${currentPath === '/matches' ? 'text-accent border-b-2 border-accent pb-1' : 'hover:text-white transition-colors'}`}
          >
            Matches
          </Link>
          <Link 
            to="/countdown"
            className={`hidden lg:block whitespace-nowrap ${currentPath === '/countdown' ? 'text-accent border-b-2 border-accent pb-1' : 'hover:text-white transition-colors'}`}
          >
            Countdown
          </Link>
          <Link 
            to="/stadiums"
            className={`whitespace-nowrap ${currentPath === '/stadiums' ? 'text-accent border-b-2 border-accent pb-1' : 'hover:text-white transition-colors'}`}
          >
            Stadiums
          </Link>
          <Link 
            to="/cities"
            className={`hidden xl:block whitespace-nowrap ${currentPath === '/cities' ? 'text-accent border-b-2 border-accent pb-1' : 'hover:text-white transition-colors'}`}
          >
            Host Cities
          </Link>
          <Link 
            to="/teams"
            className={`hidden lg:block whitespace-nowrap ${currentPath === '/teams' ? 'text-accent border-b-2 border-accent pb-1' : 'hover:text-white transition-colors'}`}
          >
            Teams
          </Link>
          <Link 
            to="/book"
            className={`whitespace-nowrap ${currentPath === '/book' ? 'text-accent border-b-2 border-accent pb-1' : 'hover:text-white transition-colors'}`}
          >
            Booking
          </Link>
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Verified Fan</span>
                <span className="text-[11px] font-black text-white uppercase italic">{user.name}</span>
              </div>
              <button 
                onClick={onLogout}
                className="flex h-10 w-10 items-center justify-center rounded border border-white/10 hover:border-accent hover:text-accent transition-all"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={onAuthClick}
              className="flex items-center gap-2 px-5 py-2 rounded bg-white text-black font-black text-[11px] uppercase tracking-widest hover:bg-accent transition-all italic shadow-lg whitespace-nowrap"
            >
              <UserIcon size={14} />
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
