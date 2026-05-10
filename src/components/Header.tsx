import { Search, MapPin, Calendar, User as UserIcon, Sparkles, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, Link } from 'react-router-dom';
import { User } from '../types';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface HeaderProps {
  user: User | null;
  onAuthClick: () => void;
  onLogout: () => void;
  onNavigate: (view: any) => void;
}

export default function Header({ user, onAuthClick, onLogout, onNavigate }: HeaderProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Matches', path: '/matches', hiddenDesktop: false },
    { name: 'Countdown', path: '/countdown', hiddenDesktop: true, lgOnly: true },
    { name: 'Stadiums', path: '/stadiums', hiddenDesktop: false },
    { name: 'Host Cities', path: '/cities', hiddenDesktop: true, xlOnly: true },
    { name: 'Teams', path: '/teams', hiddenDesktop: true, lgOnly: true },
    { name: 'Booking', path: '/book', hiddenDesktop: false },
  ];

  return (
    <header className={`sticky top-0 z-[100] w-full border-b border-white/10 backdrop-blur-xl transition-colors duration-300 ${isMobileMenuOpen ? 'bg-black' : 'bg-black/95'}`}>
      <div className="container mx-auto h-20 px-4 md:px-6 relative z-[101]">
        <div className="grid grid-cols-3 md:flex h-full items-center justify-between">
          {/* Left Area (Mobile Menu Button / Search) */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded border border-white/10 hover:border-accent hover:text-accent transition-all text-white bg-black/50"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:flex h-10 w-10 items-center justify-center rounded border border-white/10 text-white hover:border-accent hover:text-accent transition-all cursor-pointer">
              <Search size={18} />
            </div>
          </div>

          {/* Logo Area (Middle on mobile, Left on desktop) */}
          <div className="flex items-center justify-center md:justify-start shrink-0 mr-6">
            <Link 
              to="/matches"
              className="flex items-center gap-3 lg:gap-4 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-accent text-black font-black italic text-xl shadow-[0_0_15px_rgba(207,255,0,0.3)] shrink-0">
                TD
              </div>
              <span className="font-display text-xl lg:text-2xl font-black tracking-tighter text-white italic uppercase hidden sm:block whitespace-nowrap">
                Ticket<span className="text-accent underline decoration-white/20">dome</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden flex-1 items-center justify-center md:gap-4 lg:gap-6 xl:gap-10 md:flex uppercase text-[10px] lg:text-[11px] font-black tracking-widest text-slate-400 italic">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap transition-colors ${
                  link.lgOnly ? 'hidden lg:block' : ''
                } ${
                  link.xlOnly ? 'hidden xl:block' : ''
                } ${currentPath === link.path ? 'text-accent border-b-2 border-accent pb-1' : 'hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Area (Auth) */}
          <div className="flex items-center justify-end gap-3 md:gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Verified Fan</span>
                  <span className="text-[11px] font-black text-white uppercase italic">{user.name}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="flex h-10 w-10 items-center justify-center rounded border border-white/10 hover:border-accent hover:text-accent transition-all text-white"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={onAuthClick}
                className="flex items-center gap-2 px-4 md:px-5 py-2 rounded bg-white text-black font-black text-[11px] uppercase tracking-widest hover:bg-accent transition-all italic shadow-lg whitespace-nowrap"
              >
                <UserIcon size={14} />
                <span className="hidden sm:inline">Sign In</span>
                <span className="sm:hidden">Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[10000] bg-black md:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full bg-black min-h-screen">
                {/* Mobile Header Overlay */}
                <div className="flex h-20 items-center justify-between px-4 border-b border-white/10 shrink-0 bg-black">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-accent text-black font-black italic text-xl">
                      TD
                    </div>
                    <span className="font-display text-xl font-black tracking-tighter text-white italic uppercase whitespace-nowrap">
                      Ticket<span className="text-accent">dome</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="h-10 w-10 flex items-center justify-center rounded border border-white/10 text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col p-8 space-y-6 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-2 italic border-b border-white/5 pb-2">Navigational Protocol</p>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`text-4xl font-black italic uppercase tracking-tighter block transition-colors ${
                          currentPath === link.path ? 'text-accent' : 'text-white/60 hover:text-white'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  <div className="pt-12 border-t border-white/5 mt-auto pb-10">
                    <div className="flex items-center gap-4 text-slate-500 mb-8">
                        <p className="text-[10px] font-black uppercase tracking-widest italic">Official World Cup Ticketing Platform</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-left">
                        <div className="bg-white/5 p-4 rounded-sm border border-white/5">
                            <p className="text-white text-xs font-black uppercase italic mb-1">Fan Access</p>
                            <p className="text-slate-600 text-[9px] font-bold uppercase italic">Secure Protocol Active</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-sm border border-white/5">
                            <p className="text-white text-xs font-black uppercase italic mb-1">Host Cities</p>
                            <p className="text-slate-600 text-[9px] font-bold uppercase italic">Venue Status: Online</p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
