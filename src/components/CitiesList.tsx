import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Star, Sparkles, Navigation } from 'lucide-react';
import { MOCK_CITIES } from '../constants';

export const CitiesList: React.FC = () => {
  return (
    <div className="bg-black min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 px-4">
          <p className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-2 italic">The Continent is Calling</p>
          <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none transform -skew-x-12">
            YOUR HOST <span className="text-accent">CITIES</span>
          </h1>
        </div>

        <div className="space-y-12">
          {MOCK_CITIES.map((city, idx) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center p-8 bg-white/5 border border-white/5 rounded-sm overflow-hidden group`}
            >
              <div className="w-full md:w-1/2 aspect-video overflow-hidden relative">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6 flex items-center space-x-2 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10">
                   <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                   <span className="text-[10px] font-black text-white uppercase tracking-widest">{city.country}</span>
                </div>
              </div>

              <div className="w-full md:w-1/2 space-y-6">
                <div>
                   <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-2 group-hover:text-accent transition-colors">{city.name}</h2>
                   <p className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 italic">
                     <Navigation size={14} className="text-accent" /> {city.stadium}
                   </p>
                </div>
                <p className="text-lg text-white/60 leading-relaxed font-medium">
                  {city.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {city.highlights.map(h => (
                    <span key={h} className="px-4 py-2 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10">
                      {h}
                    </span>
                  ))}
                </div>
                <button className="flex items-center space-x-3 text-accent font-black uppercase tracking-widest text-xs hover:text-white transition-colors group/btn">
                  <span>Explore Travel Guide</span>
                  <div className="w-8 h-[1px] bg-accent group-hover/btn:w-12 transition-all" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
