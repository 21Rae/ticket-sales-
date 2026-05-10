import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, MapPin, Calendar, ArrowRight, ShieldCheck, 
  Sparkles, ChevronRight, Info, Star, TrendingUp, Grid, List as ListIcon,
  X, HelpCircle, Ticket
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_EVENTS, MOCK_CITIES, MOCK_TEAMS } from '../constants';
import { Event } from '../types';
import { OptimizedImage } from './OptimizedImage';
import { supabaseService } from '../services/supabaseService';
import { getSupabase } from '../lib/supabase';

export const MatchListView: React.FC = () => {
  const [matches, setMatches] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await supabaseService.getEvents();
        if (data && data.length > 0) {
          setMatches(data);
        } else {
          setMatches(MOCK_EVENTS);
        }
      } catch (err) {
        console.error('Error fetching matches:', err);
        setMatches(MOCK_EVENTS);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();

    const supabase = getSupabase();
    if (supabase) {
      const channel = supabase
        .channel('matches-changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'matches' },
          () => fetchMatches()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  const filteredMatches = useMemo(() => {
    return matches.filter(match => {
      const searchStr = searchQuery.toLowerCase();
      const matchesSearch = (match.name?.toLowerCase() || '').includes(searchStr) ||
                           (match.location?.toLowerCase() || '').includes(searchStr);
      const matchesCity = selectedCity === 'All' || (match.location || '').includes(selectedCity);
      const matchesCategory = selectedCategory === 'All' || match.category === selectedCategory;
      return matchesSearch && matchesCity && matchesCategory;
    });
  }, [matches, searchQuery, selectedCity, selectedCategory]);

  const getTeamFlag = (teamName: string) => {
    if (!teamName) return 'https://flagcdn.com/w40/un.png';
    const team = MOCK_TEAMS.find(t => teamName.includes(t.name));
    if (team) return `https://flagcdn.com/w40/${team.flagCode.toLowerCase()}.png`;
    return 'https://flagcdn.com/w40/un.png';
  };

  return (
    <div className="bg-black min-h-screen pt-24 pb-20">
      {/* Search Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center mb-10">
          <p className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-2 italic flex items-center justify-center gap-2">
            <Sparkles size={12} /> Schedule & Tickets <Sparkles size={12} />
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none transform -skew-x-12 mb-6">
            SECURE YOUR <span className="text-accent">LEGACY</span>
          </h1>
          {error && (
            <div className="max-w-xl mx-auto p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              {error}
            </div>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 p-2 rounded-sm flex flex-col md:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input 
              type="text" 
              placeholder="SEARCH BY TEAM, CITY OR VENUE..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent p-4 pl-12 text-white font-black uppercase tracking-widest text-xs focus:outline-none placeholder:text-white/20"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 px-6 py-4 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
            >
              <Filter size={14} />
              <span>Filters</span>
            </button>
            <div className="hidden sm:flex border border-white/10 p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-accent text-black' : 'text-white/40 hover:text-white'}`}
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 transition-all ${viewMode === 'list' ? 'bg-accent text-black' : 'text-white/40 hover:text-white'}`}
              >
                <ListIcon size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Quick Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {['All', ...MOCK_CITIES.map(c => c.name)].map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                selectedCity === city 
                  ? 'bg-white border-white text-black' 
                  : 'bg-transparent border-white/10 text-white/40 hover:border-white/40'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Filter Sidebar (Mobile Overlay) */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="lg:col-span-3 space-y-8 h-fit lg:sticky lg:top-32"
            >
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h3 className="text-white font-black uppercase italic tracking-tighter">Refine Search</h3>
                <button onClick={() => setIsFilterOpen(false)} className="text-white"><X size={24} /></button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-accent uppercase tracking-widest mb-4 italic">Competition Phase</h4>
                  <div className="space-y-2">
                    {['Group Stage', 'Round of 32', 'Knockouts', 'Grand Final'].map(item => (
                      <label key={item} className="flex items-center group cursor-pointer">
                        <div className="w-4 h-4 border border-white/20 rounded-sm mr-3 group-hover:border-accent flex items-center justify-center transition-colors">
                          <div className="w-2 h-2 bg-accent opacity-0 group-hover:opacity-100 rounded-sm transition-opacity" />
                        </div>
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>



                <div className="p-6 bg-accent rounded-sm">
                  <h4 className="text-black font-black uppercase italic text-sm mb-2">Member Support</h4>
                  <p className="text-black/60 text-[10px] font-bold leading-relaxed mb-4 uppercase">Direct access to ticketing officials for priority members only.</p>
                  <button className="w-full bg-black text-white p-3 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Learn More</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className={`${isFilterOpen ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
          {filteredMatches.length === 0 ? (
            <div className="py-20 text-center border border-white/5 bg-white/[0.02]">
              <Search className="text-white/20 mx-auto mb-6" size={48} />
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">No results found</h3>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8 max-w-xs mx-auto">We couldn't find any matches for your current search criteria. Try broadening your terms.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCity('All'); }}
                className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredMatches.map((match, idx) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={viewMode === 'grid' ? "" : "group p-4 bg-white/5 border border-white/10 hover:border-accent transition-colors flex flex-col md:flex-row items-center gap-6"}
                >
                  {viewMode === 'grid' ? (
                    <div className="group bg-white/5 border border-white/10 overflow-hidden hover:border-accent transition-all duration-300 flex flex-col h-full">
                      <div className="relative aspect-video overflow-hidden">
                        <OptimizedImage 
                          src={match.image} 
                          alt={match.name} 
                          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
                          containerClassName="w-full h-full"
                        />
                        <div className="absolute top-4 left-4 flex gap-1 items-center bg-black/40 backdrop-blur-md px-2 py-1 border border-white/10 rounded-xs">
                          <OptimizedImage 
                            src={getTeamFlag((match.name || '').split(' vs. ')[0])} 
                            alt="" 
                            className="w-3.5 h-2.5 object-cover rounded-xs"
                            containerClassName="w-3.5 h-2.5"
                          />
                          <span className="text-[8px] font-black text-white/40 italic">VS</span>
                          <OptimizedImage 
                            src={getTeamFlag((match.name || '').split(' vs. ')[1])} 
                            alt="" 
                            className="w-3.5 h-2.5 object-cover rounded-xs"
                            containerClassName="w-3.5 h-2.5"
                          />
                        </div>
                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10 text-center">
                          <span className="block text-[8px] font-black text-white/40 uppercase leading-none">JUNE</span>
                          <span className="text-[14px] font-black text-accent uppercase tracking-widest italic leading-none">{(match.date || '').split('-')[2] || '--'}</span>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center space-x-2 mb-3">
                          <MapPin size={10} className="text-accent" />
                          <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{match.location}</span>
                        </div>
                        <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none mb-4 group-hover:text-accent transition-colors">{match.name}</h3>
                        
                        <div className="mt-auto space-y-4">
                          <div className="flex justify-between items-end border-b border-white/5 pb-4">
                            <div>
                            </div>
                            <Link to={`/matches/${match.id}`} className="flex items-center space-x-2 text-[10px] font-black text-white/60 uppercase tracking-widest hover:text-accent transition-colors">
                              <span>Details</span>
                              <ChevronRight size={14} />
                            </Link>
                          </div>
                          
                          <Link 
                            to={`/matches/${match.id}/tickets`}
                            className="block w-full text-center py-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-black hover:border-accent transition-all"
                          >
                            Get Tickets
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col md:flex-row items-center gap-6 w-full">
                       <div className="w-full md:w-48 aspect-video md:aspect-square overflow-hidden bg-white/5 relative">
                        <OptimizedImage 
                          src={match.image} 
                          alt={match.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-50 group-hover:opacity-100" 
                          containerClassName="w-full h-full"
                        />
                        <div className="absolute bottom-2 left-2 flex gap-1 items-center bg-black/60 backdrop-blur-md px-2 py-1 border border-white/5 rounded-xs scale-90 origin-bottom-left">
                          <OptimizedImage 
                            src={getTeamFlag((match.name || '').split(' vs. ')[0])} 
                            alt="" 
                            className="w-3.5 h-2.5 object-cover rounded-xs"
                            containerClassName="w-3.5 h-2.5"
                          />
                          <span className="text-[6px] font-black text-white/40 italic">VS</span>
                          <OptimizedImage 
                            src={getTeamFlag((match.name || '').split(' vs. ')[1])} 
                            alt="" 
                            className="w-3.5 h-2.5 object-cover rounded-xs"
                            containerClassName="w-3.5 h-2.5"
                          />
                        </div>
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                             <div className="text-center min-w-[50px] bg-white/10 p-2 rounded-sm">
                               <p className="text-[8px] font-black text-white/40 uppercase leading-none mb-1">{(match.date || '').split('-')[1] || '--'}</p>
                               <p className="text-lg font-black text-white italic leading-none">{(match.date || '').split('-')[2] || '--'}</p>
                             </div>
                             <div>
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none mb-1 group-hover:text-accent transition-colors">{match.name}</h3>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                                  <MapPin size={10} /> {match.venue}, {match.location}
                                </p>
                             </div>
                          </div>
                       </div>
                       <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                          <Link to={`/matches/${match.id}/tickets`} className="px-8 py-3 bg-accent text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105">
                             Select Seats
                          </Link>
                       </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recommended Section */}
      <div className="max-w-7xl mx-auto px-4 mt-32">
        <div className="flex items-center space-x-4 mb-12">
            <TrendingUp className="text-accent" size={24} />
            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Trending Searches</h3>
            <div className="flex-1 h-[1px] bg-white/10" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Opening Match Tickets', 'Finals VIP Hospitality', 'USA vs Mexico Matches', 'Toronto Group Games'].map(item => (
                <button key={item} className="p-4 bg-white/5 border border-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest hover:border-accent/40 hover:text-white transition-all text-left flex justify-between items-center group">
                    <span>{item}</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 group-hover:text-accent duration-300" />
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};
