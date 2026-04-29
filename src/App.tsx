import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import EventCard from './components/EventCard';
import StadiumsList from './components/StadiumsList';
import CitiesList from './components/CitiesList';
import CheckoutDrawer from './components/CheckoutDrawer';
import { MOCK_EVENTS } from './constants';
import { Event } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, TrendingUp, ShieldCheck, Map, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeView, setActiveView] = useState<'matches' | 'stadiums' | 'cities'>('matches');

  return (
    <div className="min-h-screen bg-primary selection:bg-accent selection:text-black">
      <Header activeView={activeView} onNavigate={setActiveView} />
      
      <main className="relative pb-32">
        <AnimatePresence mode="wait">
          {activeView === 'matches' && (
            <motion.div
              key="matches"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Massive Impact Hero Section */}
              <div className="relative pt-32 pb-48 px-4 overflow-hidden bg-black">
                {/* Intense Background Effects */}
                <div className="absolute top-0 right-0 w-full h-full opacity-30 grayscale pointer-events-none">
                  <img 
                    src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=2000&q=80" 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/60 to-primary" />
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full" />
                
                <div className="container mx-auto text-center relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-3 rounded bg-accent px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-black shadow-2xl mb-8 italic"
                  >
                    FIFA World Cup 26™
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-display text-6xl md:text-9xl font-black tracking-tighter mb-8 italic uppercase leading-[0.85]"
                  >
                    Don't Watch. <br />
                    <span className="text-transparent border-t-2 border-b-2 border-white/20 px-2">Be There.</span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto mb-10 font-bold tracking-tight uppercase"
                  >
                    The biggest World Cup in history. Hosted across 16 cities in the USA, Mexico, and Canada.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-6"
                  >
                    <div className="flex flex-col items-center">
                       <span className="text-3xl font-black text-white italic">48</span>
                       <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Teams</span>
                    </div>
                    <div className="h-10 w-px bg-white/10" />
                    <div className="flex flex-col items-center">
                       <span className="text-3xl font-black text-white italic">16</span>
                       <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Cities</span>
                    </div>
                    <div className="h-10 w-px bg-white/10" />
                    <div className="flex flex-col items-center">
                       <span className="text-3xl font-black text-white italic">104</span>
                       <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Matches</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Search Bar */}
              <SearchBar />

              <div className="container mx-auto px-4 mt-24 flex flex-col lg:flex-row gap-12">
                <FilterSidebar onNavigate={setActiveView} />
                
                <div className="flex-1">
                  <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-white/5 pb-8">
                    <div>
                      <h2 className="font-display text-4xl font-black text-white italic uppercase tracking-tighter">
                        Latest <span className="text-accent underline decoration-accent/20 underline-offset-8">Ticket</span> Drops
                      </h2>
                      <p className="mt-2 text-xs text-slate-500 font-black uppercase tracking-[0.2em]">Verified Resale • Instant Transfer</p>
                    </div>
                    <button className="h-14 px-8 border-2 border-white/10 rounded font-black text-xs uppercase tracking-widest hover:border-accent hover:text-accent transition-all flex items-center gap-3 italic">
                      Full 2026 Schedule <ArrowRight size={18} />
                    </button>
                  </div>

                  <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                  >
                    <AnimatePresence mode="popLayout">
                      {MOCK_EVENTS.map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.08 }}
                        >
                          <EventCard 
                            event={event} 
                            onClick={(e) => setSelectedEvent(e)} 
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {/* Empty State */}
                  {MOCK_EVENTS.length === 0 && (
                    <div className="py-32 text-center rounded bg-secondary border border-white/5">
                      <div className="mx-auto h-24 w-24 flex items-center justify-center rounded bg-black text-accent mb-8 shadow-2xl">
                        <Sparkles size={48} />
                      </div>
                      <h3 className="text-2xl font-black text-white mb-3 italic">STREAK BROKEN</h3>
                      <p className="text-slate-500 font-bold uppercase text-[11px] tracking-widest">No matches found for your current strategy.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Global Stats/Hype Section */}
              <div className="container mx-auto px-4 mt-32">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-secondary rounded p-8 border border-white/5 relative overflow-hidden flex flex-col justify-center">
                       <div className="absolute top-0 right-0 p-4 opacity-10">
                          <TrendingUp size={80} />
                       </div>
                       <h4 className="text-[10px] font-black text-accent uppercase tracking-widest mb-2 italic">Historic Tournament</h4>
                       <p className="text-3xl font-black text-white italic">48 NATIONS</p>
                       <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-tighter">Expanded format debut</p>
                    </div>
                    <div className="bg-secondary rounded p-8 border border-white/5 relative overflow-hidden flex flex-col justify-center">
                       <div className="absolute top-0 right-0 p-4 opacity-10">
                          <ShieldCheck size={80} />
                       </div>
                       <h4 className="text-[10px] font-black text-accent uppercase tracking-widest mb-2 italic">Official Marketplace</h4>
                       <p className="text-3xl font-black text-white italic">16 HOST CITIES</p>
                       <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-tighter">Unified access across triple hosts</p>
                    </div>
                    <div className="bg-secondary rounded p-8 border border-white/5 relative overflow-hidden flex flex-col justify-center">
                       <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Map size={80} />
                       </div>
                       <h4 className="text-[10px] font-black text-accent uppercase tracking-widest mb-2 italic">Featured Match</h4>
                       <p className="text-3xl font-black text-white italic">AZTECA OPENER</p>
                       <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-tighter">Mexico City • June 11, 2026</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {activeView === 'stadiums' && (
            <motion.div
              key="stadiums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StadiumsList />
            </motion.div>
          )}

          {activeView === 'cities' && (
            <motion.div
              key="cities"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CitiesList />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <CheckoutDrawer 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />

      <footer className="bg-secondary border-t border-white/5 py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
             <div className="max-w-md">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-accent text-black font-black italic text-xl">
                  WC
                </div>
                <span className="font-display text-3xl font-black tracking-tighter text-white italic uppercase">
                  Goal<span className="text-accent">Flow</span>
                </span>
              </div>
              <p className="text-slate-500 font-bold leading-relaxed uppercase text-[11px] tracking-widest">
                The unofficial fan marketplace for the 2026 FIFA World Cup. From Curaçao to Jordan, securing history for every fan.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
              <div>
                <h4 className="text-[10px] uppercase font-black tracking-widest text-white mb-6 italic">Tactics</h4>
                <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-slate-500">
                  <li><a href="#" className="hover:text-accent transition-colors">Pricing Data</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors">Seat Maps</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors">Venue Protocols</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] uppercase font-black tracking-widest text-white mb-6 italic">Official</h4>
                <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-slate-500">
                  <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors">Safety Guide</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors">FIFA Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-widest text-slate-500 italic">
            <p>© 2026 GOALFLOW. ALL RIGHTS RESERVED. NOT AN OFFICIAL FIFA PARTNER.</p>
            <div className="flex items-center gap-10">
              <a href="#" className="hover:text-white transition-colors">Privacy Infrastructure</a>
              <a href="#" className="hover:text-white transition-colors">Service Protocols</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
