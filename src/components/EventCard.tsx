import { MapPin, Calendar, Star, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import { Event } from '../types';
import { formatCurrency, formatDate } from '../lib/utils';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  return (
    <motion.div
      layout
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => onClick(event)}
      className="group cursor-pointer overflow-hidden rounded bg-card border border-white/5 transition-all hover:shadow-[0_20px_50px_rgba(204,255,0,0.1)] hover:border-accent/30"
    >
      <div className="relative h-56 bg-secondary overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-black rounded-sm uppercase tracking-widest border border-white/10">
            FIFA WORLD CUP
          </span>
        </div>
        
        <div className="absolute bottom-4 left-5 right-5">
           <h4 className="text-2xl font-black text-white italic leading-tight group-hover:text-accent transition-colors">
            {event.name}
          </h4>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-col gap-3 mb-6">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-accent" />
            {event.venue} • {event.location}
          </p>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
             <span className="h-1 w-1 rounded-full bg-accent" />
            {formatDate(event.date)} @ {event.time}
          </p>
        </div>
        
        <div className="flex justify-between items-center pt-5 border-t border-white/5 gap-2">
          <div className="min-w-0">
            <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1 italic truncate">Secure Now From</p>
            <p className="text-2xl font-black text-white italic truncate">
              {formatCurrency(event.startingPrice)} 
            </p>
          </div>
          <button className="h-11 px-4 bg-white text-black rounded font-black text-[10px] uppercase tracking-widest hover:bg-accent transition-all italic active:scale-95 shadow-md flex-shrink-0">
            Get Seats
          </button>
        </div>
      </div>
    </motion.div>
  );
}
