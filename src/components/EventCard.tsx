import React, { useState } from 'react';
import { MapPin, Calendar, Star, Sparkles, TrendingUp, TrendingDown, ChevronDown, ChevronUp, History, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Event } from '../types';
import { formatCurrency, formatDate } from '../lib/utils';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(event);
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      onClick={handleCardClick}
      className="group cursor-pointer overflow-hidden rounded bg-card border border-white/5 transition-all hover:border-accent/30 flex flex-col h-fit"
    >
      <div className="relative h-48 bg-secondary overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[9px] font-black rounded-sm uppercase tracking-widest border border-white/10">
            FIFA WORLD CUP
          </span>
        </div>
        
        <div className="absolute bottom-4 left-5 right-5">
           <h4 className="text-xl font-black text-white italic leading-tight group-hover:text-accent transition-colors">
            {event.name}
          </h4>
        </div>

        <div className="absolute top-4 right-4 h-8 w-8 bg-black/50 border border-white/10 rounded flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex flex-col gap-2 mb-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <MapPin size={12} className="text-accent" />
            {event.venue} • {event.location}
          </p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Calendar size={12} className="text-accent" />
            {formatDate(event.date)} @ {event.time}
          </p>
        </div>

        <AnimatePresence>
          {isExpanded && event.details && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="pt-4 border-t border-white/5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white/5 p-3 rounded-sm border border-white/5">
                      <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
                        <Trophy size={10} className="text-accent" />
                        Rankings
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-center">
                          <p className="text-[8px] text-slate-500 uppercase italic">Home</p>
                          <p className="text-lg font-black italic text-white">#{event.details.rankings.home}</p>
                        </div>
                        <div className="h-4 w-[1px] bg-white/10" />
                        <div className="text-center">
                          <p className="text-[8px] text-slate-500 uppercase italic">Away</p>
                          <p className="text-lg font-black italic text-white">#{event.details.rankings.away}</p>
                        </div>
                      </div>
                   </div>
                   <div className="bg-white/5 p-3 rounded-sm border border-white/5">
                      <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
                        <History size={10} className="text-accent" />
                        Head to Head
                      </div>
                      <p className="text-[10px] font-bold text-white italic leading-tight">
                        {event.details.historical.headToHead}
                      </p>
                   </div>
                </div>

                <div className="p-3 bg-accent/5 border border-accent/10 rounded-sm">
                   <p className="text-[8px] font-black text-accent uppercase tracking-widest mb-1 italic">Last meeting</p>
                   <p className="text-[11px] font-black text-white italic">{event.details.historical.lastMatch}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex justify-end items-end mt-auto pt-5 border-t border-white/5 gap-2">
          <button 
            onClick={handleNavigate}
            className="h-11 px-8 bg-white text-black rounded font-black text-[10px] uppercase tracking-widest hover:bg-accent transition-all italic active:scale-95 shadow-lg active:shadow-none flex-shrink-0"
          >
            Get Seats
          </button>
        </div>
      </div>
    </motion.div>
  );
}
