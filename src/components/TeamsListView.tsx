import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MOCK_TEAMS } from '../constants';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabaseService } from '../services/supabaseService';
import { Team } from '../types';
import { OptimizedImage } from './OptimizedImage';
import { getSupabase } from '../lib/supabase';

export default function TeamsListView() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await supabaseService.getTeams();
        if (data && data.length > 0) {
          setTeams(data);
          setError(null);
        } else {
          // If no data in DB, we show mock data for design but indicate it's empty
          setTeams(MOCK_TEAMS);
          // Don't set error, just stay on mock data
        }
      } catch (err: any) {
        console.error('Error fetching teams:', err);
        setTeams(MOCK_TEAMS);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();

    const supabase = getSupabase();
    if (supabase) {
      const channel = supabase
        .channel('teams-realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'teams' },
          (payload) => {
            console.log('Real-time team update:', payload);
            fetchTeams();
          }
        )
        .subscribe((status) => {
          if (status !== 'SUBSCRIBED') {
            console.warn('Supabase Realtime subscription status for teams:', status);
          }
        });

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 max-w-7xl relative"
    >
      {/* Page Background Logo */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] grayscale">
        <img 
          src="https://www.logodesignlove.com/wp-content/uploads/2008/02/fifa-world-cup-trophy-01-2048x1385.jpeg" 
          alt="" 
          className="w-full max-w-4xl object-contain lg:-rotate-12"
        />
      </div>

      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-slate-500 hover:text-white mb-8 transition-colors text-[13px] font-medium relative z-10"
      >
        <ChevronLeft size={16} />
        Back
      </button>

      {/* Header */}
      <div className="mb-12 relative z-10">
        <h1 className="text-[52px] font-bold text-white tracking-tight leading-tight mb-4">
          Team profiles
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Discover the 48 nations competing across North America. Explore team histories, current rankings, and their journey to the world stage in the biggest tournament ever.
        </p>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 relative z-10">
        {teams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group cursor-pointer"
          >
            {/* Card Image Container - Removed background image, added logo instead */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-xs bg-slate-900/50 backdrop-blur-sm border border-white/5 mb-4 shadow-lg group-hover:bg-slate-800/80 transition-all duration-300">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] grayscale group-hover:opacity-10 transition-opacity">
                <img 
                  src="https://www.logodesignlove.com/wp-content/uploads/2008/02/fifa-world-cup-trophy-01-2048x1385.jpeg" 
                  alt="" 
                  className="w-32 h-32 object-contain"
                />
              </div>
              
              {/* Specialized Overlay from Screenshot */}
              <div className="absolute inset-0 flex items-center justify-start p-6">
                 {/* Group Metadata Widget */}
                 <div className="bg-black/60 backdrop-blur-md rounded-lg p-2.5 border border-white/10 w-32 shadow-2xl scale-110">
                    <div className="flex flex-col gap-1.5">
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-white/40 italic">GROUP {team.group}</span>
                          <OptimizedImage 
                            src={`https://flagcdn.com/w40/${team.flagCode.toLowerCase()}.png`} 
                            alt="" 
                            className="h-3 w-4.5 object-cover rounded-xs"
                            containerClassName="h-3 w-4.5"
                            fallbackSrc="https://flagcdn.com/w40/un.png"
                          />
                       </div>
                       <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                             <div className="h-2 w-3.5 bg-accent/30 rounded-xs" />
                             <span className="text-[9px] font-extrabold text-white uppercase tracking-tighter">PAR</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                             <div className="h-2 w-3.5 bg-white/20 rounded-xs" />
                             <span className="text-[9px] font-extrabold text-white uppercase tracking-tighter">AUS</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                             <div className="h-2 w-3.5 bg-accent/50 rounded-xs" />
                             <span className="text-[9px] font-extrabold text-white uppercase tracking-tighter">TUR</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

            </div>
            
            {/* Content area */}
            <div className="space-y-1 relative z-10">
              <div className="flex items-center gap-2">
                <OptimizedImage 
                  src={`https://flagcdn.com/w40/${team.flagCode.toLowerCase()}.png`} 
                  alt="" 
                  className="h-3 w-4.5 object-cover rounded-xs"
                  containerClassName="h-3 w-4.5"
                  fallbackSrc="https://flagcdn.com/w40/un.png"
                />
                <p className="text-[11px] font-bold text-sky-400 uppercase tracking-tight transition-colors">
                  {team.name}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-20 flex flex-col items-center gap-4 relative z-10">
         <button className="flex flex-col items-center gap-3 group">
            <span className="text-[15px] font-bold text-sky-400 group-hover:text-sky-300 transition-colors">Load more</span>
            <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-sky-400 group-hover:bg-white/5 transition-all">
               <ChevronDown size={20} />
            </div>
         </button>
      </div>
    </motion.div>
  );
}
