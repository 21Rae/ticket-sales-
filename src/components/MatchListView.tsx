import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ShieldCheck, Sparkles, ChevronRight, Info, Calendar } from 'lucide-react';
import EventCard from './EventCard';
import SearchBar from './SearchBar';
import { MOCK_EVENTS } from '../constants';
import { Event } from '../types';
import { Link, useNavigate } from 'react-router-dom';

interface MatchListViewProps {
  onEventClick: (event: Event) => void;
}

export default function MatchListView({ onEventClick }: MatchListViewProps) {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const trendingMatches = events.slice(0, 5);

  return (
    <motion.div
      key="match-list-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-20"
    >
      {/* Search Header Area */}
      <div className="bg-black pt-12 pb-16 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded text-[10px] font-black text-accent uppercase tracking-widest italic mb-6">
                <Sparkles size={12} />
                Official 2026 Resale Marketplace
             </div>
             <h1 className="text-3xl md:text-7xl font-black text-white italic uppercase tracking-tighter text-center max-w-4xl leading-none">
                Experience the <span className="text-accent underline decoration-white/10 underline-offset-8 md:underline-offset-[12px]">Greatest</span> Show on Earth.
             </h1>
          </div>
          <SearchBar />
        </div>
      </div>

      {/* Featured Banner Section */}
      <div className="container mx-auto px-4 py-6 md:py-12">
          <div 
            onClick={() => navigate('/matches')}
            className="relative group cursor-pointer overflow-hidden rounded-sm border border-white/10 bg-secondary aspect-square md:aspect-[21/9] flex items-center"
          >
          <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=2000&q=80" 
              className="w-full h-full object-cover"
              alt="Stadium"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-black via-black/40 to-transparent" />
          
          <div className="relative p-8 lg:p-20 flex flex-col justify-center items-center md:items-start text-center md:text-left h-full w-full md:max-w-2xl z-10">
            <div className="flex items-center gap-2 text-accent mb-4">
               <div className="h-1 w-12 bg-accent hidden md:block" />
               <span className="text-[10px] font-black uppercase tracking-widest italic">Live Nation Presents</span>
            </div>
            <h2 className="text-4xl lg:text-8xl font-black text-white italic uppercase tracking-tighter mb-6 leading-[0.85]">
              Matchday <br className="hidden md:block" />
              <span className="text-accent underline decoration-white/10 underline-offset-8">Tickets</span>
            </h2>
            <p className="text-slate-300 font-bold uppercase tracking-widest text-sm mb-10 max-w-md hidden md:block">
              Group stage drops are live. Secure your seat for the opening ceremonies in Mexico City and Toronto.
            </p>
            <button className="h-14 px-10 bg-white text-black font-black uppercase tracking-widest text-[11px] hover:bg-accent transition-all italic shadow-2xl">
              Browse Matches
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Area */}
          <div className="lg:w-[72%]">
            
            {/* Trending Section */}
            <section className="mb-20">
               <div className="flex items-center justify-between mb-8 border-b-2 border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                     <TrendingUp className="text-accent" size={20} />
                     <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Trending Searches</h3>
                  </div>
                  <div className="flex gap-2">
                    <button className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-colors">
                      <ChevronRight size={16} className="rotate-180" />
                    </button>
                    <button className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-colors">
                      <ChevronRight size={16} />
                    </button>
                  </div>
               </div>
               
               <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
                  {trendingMatches.map((match) => (
                    <motion.div 
                      key={match.id}
                      whileHover={{ y: -5 }}
                      className="min-w-[200px] group cursor-pointer"
                    >
                      <div className="aspect-square relative overflow-hidden rounded-full border-2 border-white/5 mb-4 p-1 group-hover:border-accent transition-all duration-500 bg-secondary">
                         <div className="h-full w-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100">
                            <img src={match.image} className="w-full h-full object-cover" alt="" loading="lazy" referrerPolicy="no-referrer" />
                         </div>
                      </div>
                      <h4 className="text-[12px] font-black text-white uppercase italic tracking-tight text-center group-hover:text-accent transition-colors truncate">
                        {match.name.split(' vs ')[0]}
                      </h4>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1 text-center italic">National Team</p>
                    </motion.div>
                  ))}
               </div>
            </section>

            {/* Sponsored Presale Area */}
            <section className="mb-20">
              <div className="flex items-center justify-between mb-8 border-b-2 border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                     <ShieldCheck className="text-accent" size={20} />
                     <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Sponsored Presales</h3>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.slice(0, 3).map((event) => (
                  <div 
                    key={event.id} 
                    onClick={() => onEventClick(event)}
                    className="bg-secondary/50 border border-white/5 rounded-sm overflow-hidden group cursor-pointer"
                  >
                     <div className="aspect-video relative overflow-hidden">
                        <img src={event.image} className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" alt="" referrerPolicy="no-referrer" />
                        <div className="absolute top-4 left-4 px-2 py-1 bg-accent text-black text-[8px] font-black uppercase italic rounded-xs">Presale Open</div>
                     </div>
                     <div className="p-6">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{event.date}</p>
                        <h4 className="text-[13px] font-black text-white italic uppercase mb-4 leading-tight">{event.name}</h4>
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] font-bold text-accent italic">Citi® Priority Access</span>
                           <ChevronRight size={14} className="text-slate-600" />
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Official Match Inventory */}
            <section className="mb-20">
              <div className="flex items-center justify-between mb-8 border-b-2 border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                     <Calendar className="text-accent" size={20} />
                     <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Official Inventory</h3>
                  </div>
                  <Link to="/matches" className="text-[10px] font-black text-slate-500 hover:text-white uppercase italic tracking-widest border-b border-white/10 pb-1">View All Matches</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {events.map((event) => (
                  <div key={event.id}>
                    <EventCard 
                      event={event} 
                      onClick={onEventClick} 
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Entertainment Guides (Guides Section) */}
            <section>
               <div className="flex items-center justify-between mb-8 border-b-2 border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                     <Info className="text-accent" size={20} />
                     <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Entertainment Guides</h3>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Everything you need to know about the format", tag: "Tournament", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80" },
                    { title: "Host City Travel Guide: Transport venues", tag: "Logistics", img: "https://images.unsplash.com/photo-1540749303346-5b0aa034ef82?auto=format&fit=crop&w=800&q=80" },
                    { title: "Fan ID & Security protocol stadium entry", tag: "Security", img: "https://images.unsplash.com/photo-1550117462-a5ec08bf0ac5?auto=format&fit=crop&w=800&q=80" }
                  ].map((guide, i) => (
                    <div key={i} className="group cursor-pointer">
                       <div className="aspect-[4/3] relative overflow-hidden rounded-xs border border-white/5 mb-4">
                          <img src={guide.img} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" alt="" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4">
                             <span className="text-[8px] font-black text-accent uppercase tracking-[0.2em] italic bg-black/50 px-2 py-0.5 rounded-sm">Guide</span>
                          </div>
                       </div>
                       <h4 className="text-[14px] font-black text-white uppercase italic leading-tight group-hover:text-accent transition-colors mb-2">{guide.title}</h4>
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic group-hover:text-white transition-colors">Read Full Guide &rarr;</p>
                    </div>
                  ))}
               </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:w-[28%] space-y-12">
            <div className="p-10 bg-secondary border border-white/10 rounded-xs relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12 group-hover:opacity-10 transition-opacity">
                  <ShieldCheck size={140} />
               </div>
               <h3 className="text-sm font-black text-white italic uppercase mb-4 relative z-10">Safe-Seating</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase leading-relaxed mb-8 relative z-10 italic">
                  Every ticket is 100% verified. Guaranteed entry or your money back. We are the official primary ticketing partner of the 2026 World Cup legacy program.
               </p>
               <button className="w-full h-14 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-accent transition-all relative z-10 italic">
                  Learn Our Protocol
               </button>
            </div>

            <div className="bg-black p-8 border border-white/5 rounded-xs">
               <h3 className="text-xs font-black text-white italic uppercase mb-8 tracking-widest border-l-4 border-accent pl-4">Host City Status</h3>
               <div className="space-y-8">
                  {['Los Angeles', 'Mexico City', 'New Jersey', 'Toronto', 'Miami'].map((city, j) => (
                    <div key={j} className="flex gap-4 group cursor-pointer">
                       <div className="h-12 w-12 shrink-0 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                          <span className="text-[10px] font-black italic">{j+1}</span>
                       </div>
                       <div>
                          <p className="text-[11px] font-black text-white uppercase italic group-hover:text-accent transition-colors">{city}</p>
                          <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-1">Status: Demand High</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-linear-to-br from-accent/20 to-black p-8 border border-accent/20 rounded-xs">
               <div className="h-12 w-12 bg-accent text-black rounded-lg flex items-center justify-center mb-6 shadow-2xl">
                  <Sparkles size={24} />
               </div>
               <h3 className="text-lg font-black text-white italic uppercase mb-4 leading-tight">Fan ID Pre-Registration</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed mb-6 italic">
                  Skip the lines. Apply for your World Cup Fan ID today and get early access to knockout round drops.
               </p>
               <button className="text-[10px] font-black text-accent uppercase tracking-widest border-b-2 border-accent pb-1 hover:text-white hover:border-white transition-all italic">
                 Register Protocol &rarr;
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Cities Thumbnail Section (Platform Bottom) */}
      <div className="container mx-auto px-4 mt-20 pt-20 border-t border-white/5">
         <div className="flex items-center justify-between mb-12">
            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Popular Host Cities</h3>
            <Link to="/cities" className="text-[10px] font-black text-slate-500 hover:text-white uppercase italic tracking-widest">Explore Geography</Link>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: "New York", img: "https://images.unsplash.com/photo-1529900948638-07f85863d50b?auto=format&fit=crop&w=800&q=80" },
              { name: "Los Angeles", img: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80" },
              { name: "Las Vegas", img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80" },
              { name: "Chicago", img: "https://images.unsplash.com/photo-1550117462-a5ec08bf0ac5?auto=format&fit=crop&w=800&q=80" },
              { name: "Atlanta", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" }
            ].map((city, k) => (
              <div key={k} className="group cursor-pointer">
                 <div className="aspect-[4/3] rounded overflow-hidden mb-3 border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img src={city.img} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" referrerPolicy="no-referrer" />
                 </div>
                 <p className="text-[11px] font-black text-white italic uppercase text-center group-hover:text-accent transition-colors">{city.name}</p>
              </div>
            ))}
         </div>
      </div>
    </motion.div>
  );
}

