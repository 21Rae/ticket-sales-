import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Trophy, User, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-accent rounded-sm flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <Trophy className="text-black" size={24} strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none block">FIFA</span>
              <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] block leading-none">World Cup 2026</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/matches" className={({ isActive }) => 
              `text-sm font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-accent' : 'text-white/70 hover:text-white'}`
            }>Matches</NavLink>
            <NavLink to="/stadiums" className={({ isActive }) => 
              `text-sm font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-accent' : 'text-white/70 hover:text-white'}`
            }>Stadiums</NavLink>
            <NavLink to="/cities" className={({ isActive }) => 
              `text-sm font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-accent' : 'text-white/70 hover:text-white'}`
            }>Host Cities</NavLink>
            
            {user ? (
              <div className="flex items-center space-x-6 border-l border-white/10 pl-6">
                <Link to="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-accent/30" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider">{user.name.split(' ')[0]}</span>
                </Link>
                <button onClick={logout} className="text-white/40 hover:text-white transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-bold text-white/70 hover:text-white uppercase tracking-widest">Sign In</Link>
                <Link to="/signup" className="px-5 py-2 bg-white text-black text-xs font-black uppercase tracking-widest rounded-sm hover:bg-accent transition-all duration-300">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <Link to="/matches" className="block text-xl font-black text-white italic uppercase py-2">Matches</Link>
              <Link to="/stadiums" className="block text-xl font-black text-white italic uppercase py-2">Stadiums</Link>
              <Link to="/cities" className="block text-xl font-black text-white italic uppercase py-2">Host Cities</Link>
              <hr className="border-white/10" />
              {user ? (
                <>
                  <Link to="/dashboard" className="block text-xl font-black text-accent italic uppercase py-2">Dashboard</Link>
                  <button onClick={logout} className="block text-xl font-black text-red-500 italic uppercase py-2">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block text-xl font-black text-white italic uppercase py-2">Sign In</Link>
                  <Link to="/signup" className="block text-xl font-black text-accent italic uppercase py-2">Register</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
