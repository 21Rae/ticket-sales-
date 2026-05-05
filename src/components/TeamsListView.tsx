import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MOCK_TEAMS } from '../constants';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabaseService } from '../services/supabaseService';
import { Team } from '../types';

export default function TeamsListView() {
  const [teams, setTeams] = useState<Team[]>(MOCK_TEAMS);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await supabaseService.getTeams();
        if (data && data.length > 0) {
          setTeams(data);
        }
      } catch (err) {
        console.error('Error fetching teams from Supabase:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 max-w-7xl"
    >
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-slate-500 hover:text-white mb-8 transition-colors text-[13px] font-medium"
      >
        <ChevronLeft size={16} />
        Back
      </button>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-[52px] font-bold text-white tracking-tight leading-tight mb-8">
          Team profiles
        </h1>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {teams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group cursor-pointer"
          >
            {/* Card Image Container */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-xs bg-slate-900 border border-white/5 mb-4 shadow-lg group-hover:shadow-accent/10 transition-all duration-300">
              <img 
                src={team.image} 
                alt={team.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Specialized Overlay from Screenshot */}
              <div className="absolute inset-0 flex items-center justify-start p-6">
                 {/* Group Metadata Widget */}
                 <div className="bg-black/60 backdrop-blur-md rounded-lg p-2.5 border border-white/10 w-32 shadow-2xl scale-110">
                    <div className="flex flex-col gap-1.5">
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-white/40 italic">GROUP {team.group}</span>
                          <img 
                            src={`https://flagcdn.com/w40/${team.flagCode}.png`} 
                            alt="" 
                            className="h-3 w-4.5 object-cover rounded-xs"
                            referrerPolicy="no-referrer"
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

              {/* WC Logo Placement */}
              <div className="absolute top-4 right-4 flex flex-col items-center opacity-80">
                 <div className="h-10 w-6 border-2 border-white/30 rounded-full flex items-center justify-center">
                   <div className="h-4 w-4 rounded-full bg-white/10" />
                 </div>
                 <span className="text-[6px] font-black mt-1 text-white/50 tracking-tighter">WC2026</span>
              </div>
            </div>
            
            {/* Content area */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <img 
                  src={`https://flagcdn.com/w40/${team.flagCode}.png`} 
                  alt="" 
                  className="h-3 w-4.5 object-cover rounded-xs"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[11px] font-bold text-sky-400 uppercase tracking-tight transition-colors">
                  {team.name}
                </p>
              </div>
              <h3 className="text-[15px] font-bold text-white/90 leading-snug group-hover:text-white transition-colors">
                {team.description}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-20 flex flex-col items-center gap-4">
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
