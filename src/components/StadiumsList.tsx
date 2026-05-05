import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Users, Info } from 'lucide-react';
import { MOCK_STADIUMS } from '../constants';
import { supabaseService } from '../services/supabaseService';
import { Stadium } from '../types';

export default function StadiumsList() {
  const [stadiums, setStadiums] = useState<Stadium[]>(MOCK_STADIUMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const data = await supabaseService.getStadiums();
        if (data && data.length > 0) {
          setStadiums(data);
        }
      } catch (err) {
        console.error('Error fetching stadiums from Supabase:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStadiums();
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4"
        >
          Host <span className="text-accent underline decoration-accent/20 underline-offset-8">Venues</span> 2026
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 font-bold uppercase tracking-widest text-xs"
        >
          Explore the 16 architectural marvels across North America
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stadiums.map((stadium, index) => (
          <motion.div
            key={stadium.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-secondary border border-white/5 rounded-sm overflow-hidden flex flex-col"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={stadium.image} 
                alt={stadium.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute top-4 right-4 bg-accent p-2 rounded shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                <span className="text-black font-black text-xs uppercase italic">{stadium.country}</span>
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={14} className="text-accent" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
                  {stadium.location}
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-white italic uppercase mb-4 group-hover:text-accent transition-colors">
                {stadium.name}
              </h3>
              
              <p className="text-slate-400 text-xs font-bold leading-relaxed uppercase mb-8 flex-1">
                {stadium.description}
              </p>
              
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-slate-600" />
                  <span className="text-[11px] font-black text-white italic uppercase">{stadium.capacity}</span>
                </div>
                <div className="flex items-center gap-2 text-accent cursor-pointer hover:underline underline-offset-4">
                   <Info size={14} />
                   <span className="text-[10px] font-black uppercase tracking-widest italic">Full Access Protocol</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
