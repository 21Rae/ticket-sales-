import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Users, Info, ChevronRight, Sparkles } from 'lucide-react';
import { MOCK_STADIUMS } from '../constants';
import { OptimizedImage } from './OptimizedImage';
import { supabaseService } from '../services/supabaseService';
import { Stadium } from '../types';
import { getSupabase } from '../lib/supabase';

export const StadiumsList: React.FC = () => {
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const data = await supabaseService.getStadiums();
        if (data && data.length > 0) {
          setStadiums(data);
        } else {
          setStadiums(MOCK_STADIUMS);
        }
      } catch (err) {
        console.error('Error fetching stadiums:', err);
        setStadiums(MOCK_STADIUMS);
      } finally {
        setLoading(false);
      }
    };

    fetchStadiums();

    // Set up real-time subscription
    const supabase = getSupabase();
    if (supabase) {
      const channel = supabase
        .channel('stadiums-changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'stadiums' },
          () => {
            fetchStadiums();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  if (loading && stadiums.length === 0) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-2 italic">Official Venues</p>
          <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none transform -skew-x-12 mb-6">
            ARCHITECTURAL <span className="text-accent">WONDERS</span>
          </h1>
          {error && (
            <div className="max-w-xl mx-auto p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stadiums.map((stadium, idx) => (
            <motion.div
              key={stadium.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white/5 border border-white/10 overflow-hidden hover:border-accent transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <OptimizedImage 
                  src={stadium.image} 
                  alt={stadium.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100" 
                  containerClassName="w-full h-full"
                />
                <div className="absolute top-4 left-4 bg-accent text-black px-3 py-1 font-black text-[10px] uppercase tracking-widest italic">
                  {stadium.country}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none group-hover:text-accent transition-colors">{stadium.name}</h3>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    <MapPin size={12} className="text-accent" />
                    <span>{stadium.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    <Users size={12} className="text-accent" />
                    <span>{stadium.capacity} Seats</span>
                  </div>
                </div>
                <p className="text-sm text-white/60 leading-relaxed font-medium mb-8">
                  {stadium.description}
                </p>
                <button className="w-full py-4 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  View Virtual Tour
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
