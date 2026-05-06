import { Search, MapPin, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export default function SearchBar() {
  return (
    <div className="relative z-10 mx-auto mt-6 md:-mt-10 max-w-5xl px-4">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex flex-col gap-3 rounded bg-secondary p-3 shadow-2xl border border-white/5 md:flex-row md:items-center ring-1 ring-white/10"
      >
        <div className="flex flex-1 items-center bg-black/50 rounded border border-white/5 divide-x divide-white/10 overflow-hidden min-w-0">
          <motion.div 
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
            className="flex-[2] px-5 py-3 flex flex-col min-w-[140px] transition-colors cursor-text"
          >
            <span className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1 italic">Select Matchup</span>
            <input 
              type="text" 
              placeholder="USA vs. PANAMA" 
              className="bg-transparent border-none p-0 text-sm font-bold focus:ring-0 placeholder:text-slate-700 outline-none uppercase italic w-full"
            />
          </motion.div>
          
          <motion.div 
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
            className="flex-1 px-5 py-3 flex flex-col hidden sm:flex min-w-[120px] transition-colors cursor-text"
          >
            <span className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1 italic">Location</span>
            <input 
              type="text" 
              placeholder="LOS ANGELES, CA" 
              className="bg-transparent border-none p-0 text-sm font-bold focus:ring-0 placeholder:text-slate-700 outline-none uppercase italic w-full"
            />
          </motion.div>

          <motion.div 
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
            className="flex-1 px-5 py-3 flex flex-col hidden md:flex min-w-[100px] transition-colors cursor-text"
          >
            <span className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1 italic">Match Date</span>
            <input 
              type="text" 
              placeholder="ANY DATE" 
              className="bg-transparent border-none p-0 text-sm font-bold focus:ring-0 placeholder:text-slate-700 outline-none uppercase italic w-full"
            />
          </motion.div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02, backgroundColor: '#E5FF00' }}
          whileTap={{ scale: 0.98 }}
          className="h-16 w-full md:w-auto px-12 rounded bg-accent font-black text-base text-black shadow-[0_0_20px_rgba(204,255,0,0.2)] shrink-0 italic uppercase tracking-tighter"
        >
          Search Tickets
        </motion.button>

        <div className="flex items-center gap-3 px-4 border-l border-white/10 hidden xl:flex shrink-0">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Updates</span>
          <div className="flex gap-1">
            <motion.div 
              animate={{ opacity: [1, 0.5, 1] }} 
              transition={{ repeat: Infinity, duration: 1.5 }} 
              className="h-1 w-4 bg-accent" 
            />
            <div className="h-1 w-4 bg-accent/40" />
            <div className="h-1 w-4 bg-accent/20" />
          </div>
        </div>
      </motion.div>
      
      <div className="mt-5 flex flex-wrap items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
        <span className="text-white">HOT MATCHES:</span>
        <motion.button whileHover={{ color: '#CCFF00', x: 2 }} className="transition-colors border-b border-transparent hover:border-accent">USA vs PANAMA</motion.button>
        <motion.button whileHover={{ color: '#CCFF00', x: 2 }} className="transition-colors border-b border-transparent hover:border-accent">MEXICO vs GERMANY</motion.button>
        <motion.button whileHover={{ color: '#CCFF00', x: 2 }} className="transition-colors border-b border-transparent hover:border-accent">METLIFE FINAL</motion.button>
        <motion.button whileHover={{ color: '#CCFF00', x: 2 }} className="transition-colors border-b border-transparent hover:border-accent">CANADA vs FRANCE</motion.button>
      </div>
    </div>
  );
}
