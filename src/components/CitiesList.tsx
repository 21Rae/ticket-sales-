import React from 'react';
import { motion } from 'motion/react';
import { Landmark, MapPin, Sparkles } from 'lucide-react';
import { MOCK_CITIES } from '../constants';

export default function CitiesList() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4"
        >
          Host <span className="text-accent underline decoration-accent/20 underline-offset-8">Cities</span> 2026
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 font-bold uppercase tracking-widest text-xs"
        >
          Discover the cultural epicenters hosting the world's game
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {MOCK_CITIES.map((city, index) => (
          <motion.div
            key={city.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-secondary border border-white/5 rounded-sm overflow-hidden flex flex-col md:flex-row h-full md:h-[400px]"
          >
            <div className="w-full md:w-2/5 relative overflow-hidden h-64 md:h-auto">
              <img 
                src={city.image} 
                alt={city.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/40 to-secondary hidden md:block" />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/10 rounded-sm">
                <span className="text-accent text-[10px] font-black uppercase tracking-widest italic">{city.country}</span>
              </div>
            </div>
            
            <div className="p-10 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4 text-slate-500">
                <MapPin size={14} className="text-accent" />
                <span className="text-[10px] font-black uppercase tracking-widest italic">{city.name}</span>
              </div>
              
              <h3 className="text-4xl font-black text-white italic uppercase mb-6 leading-none">
                {city.name}
              </h3>
              
              <p className="text-slate-400 text-[11px] font-bold leading-relaxed uppercase mb-8 max-w-sm">
                {city.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                 {city.highlights.map((highlight) => (
                    <span key={highlight} className="text-[9px] font-black uppercase tracking-tighter bg-white/5 text-slate-300 px-2 py-1 rounded-sm border border-white/5">
                       {highlight}
                    </span>
                 ))}
              </div>
              
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Landmark size={18} className="text-accent" />
                  <div>
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1 text-left">Primary Venue</p>
                    <p className="text-[11px] font-black text-white italic uppercase">{city.stadium}</p>
                  </div>
                </div>
                <button className="h-10 px-4 bg-white text-black text-[10px] font-black uppercase tracking-widest italic hover:bg-accent transition-all">
                  Guide
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
