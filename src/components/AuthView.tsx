import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Lock, User, Sparkles, ShieldCheck } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthViewProps {
  onLogin: (user: UserType) => void;
  onClose: () => void;
}

export default function AuthView({ onLogin, onClose }: AuthViewProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-validating fields
    if (!email || !password || (!isLogin && !name)) return;

    // Simulate authentication
    const mockUser: UserType = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: isLogin ? email.split('@')[0] : name,
    };
    
    // In a real app, this would verify with a backend
    onLogin(mockUser);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-[320px] bg-secondary border border-white/10 rounded-sm overflow-hidden shadow-2xl"
      >
        <div className="p-6">
          <div className="mb-6 text-center">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded bg-accent text-black font-black italic text-lg mb-3 shadow-xl">
              TH
            </div>
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-1">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[8px] leading-tight px-4">
              {isLogin ? 'Access your 2026 match tickets' : 'Join the biggest tournament in history'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 italic ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="EMMANUEL SOLOMON"
                    className="w-full bg-black border border-white/5 h-11 pl-11 pr-4 text-white font-bold uppercase text-[10px] focus:border-accent outline-none transition-all placeholder:text-slate-800"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 italic ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="FAN@WC2026.COM"
                  className="w-full bg-black border border-white/5 h-11 pl-11 pr-4 text-white font-bold uppercase text-[10px] focus:border-accent outline-none transition-all placeholder:text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 italic">Password</label>
                {isLogin && <button type="button" className="text-[7px] font-black uppercase text-accent hover:underline">Forgot?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black border border-white/5 h-11 pl-11 pr-4 text-white font-bold uppercase text-[10px] focus:border-accent outline-none transition-all placeholder:text-slate-800"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-black h-12 font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-all italic flex items-center justify-center gap-2 active:scale-95 group shadow-xl mt-3"
            >
              {isLogin ? 'Access Match' : 'Register Now'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-3">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-400 font-black uppercase tracking-widest text-[8px] hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? Create one" : "Already registered? Log in here"}
            </button>

            <div className="w-full pt-6 border-t border-white/5 flex items-center justify-center gap-5 opacity-20">
              <div className="flex items-center gap-2">
                <ShieldCheck size={12} />
                <span className="text-[8px] font-black uppercase tracking-tighter">Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={12} />
                <span className="text-[8px] font-black uppercase tracking-tighter">Instant</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
