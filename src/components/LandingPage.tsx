import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, ArrowRight, Search, Ticket, CheckCircle, Star, Sparkles, Mail, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_EVENTS, TESTIMONIALS, FAQ_ITEMS } from '../constants';
import { Logo } from './Logo';
import { OptimizedImage } from './OptimizedImage';
import { supabaseService } from '../services/supabaseService';
import { Event } from '../types';

export const LandingPage: React.FC = () => {
  const [featuredMatches, setFeaturedMatches] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await supabaseService.getEvents();
        if (data) {
          if (data.length > 0) {
            setFeaturedMatches(data.slice(0, 3));
          } else {
            setFeaturedMatches(MOCK_EVENTS.slice(0, 3));
          }
        } else {
          setFeaturedMatches(MOCK_EVENTS.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching featured matches:', err);
        setFeaturedMatches(MOCK_EVENTS.slice(0, 3));
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 text-center">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=1323&auto=format&fit=crop&ixlib=rb-4.1.0" 
            alt="Stadium Background" 
            className="w-full h-full object-cover opacity-80"
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h1 className="text-7xl md:text-[10rem] font-black text-white italic leading-[0.8] uppercase tracking-tighter mb-8 transform -skew-x-12">
              UNITE THE <br /> <span className="text-accent">WORLD</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/60 text-lg mb-10 font-medium tracking-tight">
              Join the global celebration as Canada, Mexico, and the USA host the first ever 48-team FIFA World Cup. Witness football history across 16 world-class venues and iconic host cities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/matches" className="w-full sm:w-auto px-10 py-5 bg-accent text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 transform hover:scale-105 active:scale-95">
                Find Tickets Now
              </Link>
              <Link to="/stadiums" className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                Explore Stadiums
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-40">
          <span className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-white" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <p className="text-accent font-bold uppercase tracking-[0.2em] text-xs mb-2">Process</p>
              <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">How to Secure Your Seat</h2>
            </div>
            <div className="w-24 h-[1px] bg-white/20 hidden md:block mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Search, title: 'Search', desc: 'Browse matches by city, date, or your favorite nation.', step: '01' },
              { icon: Ticket, title: 'Reserve', desc: 'Select your preferred seating category and view the interactive map.', step: '02' },
              { icon: CheckCircle, title: 'Confirm', desc: 'Secure your booking instantly with verified digital delivery.', step: '03' }
            ].map((item, idx) => (
              <div key={idx} className="group relative">
                <span className="absolute -top-6 -left-4 text-6xl font-black text-white/5 italic select-none group-hover:text-accent/10 transition-colors uppercase">{item.step}</span>
                <div className="w-16 h-16 bg-white/5 rounded-sm flex items-center justify-center mb-6 border border-white/10 group-hover:border-accent transition-colors">
                  <item.icon className="text-white group-hover:text-accent transition-colors" size={32} />
                </div>
                <h3 className="text-2xl font-black text-white italic uppercase mb-3">{item.title}</h3>
                <p className="text-white/40 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Matches Slider (Simple Grid for Now) */}
      <section className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">Key Matchups</h2>
            <Link to="/matches" className="flex items-center space-x-2 text-accent font-bold uppercase tracking-widest text-xs hover:opacity-70 transition-opacity">
              <span>View Schedule</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMatches.map(event => (
              <Link key={event.id} to={`/matches/${event.id}`} className="group relative aspect-[4/5] overflow-hidden">
                <OptimizedImage 
                  src={event.image} 
                  alt={event.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0 opacity-60 group-hover:opacity-100" 
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-1 italic">World Cup 26 - Group Stage</p>
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">{event.name}</h3>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-[10px] font-bold text-white/60 uppercase">{event.venue}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4">Voices of the Fans</h2>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-accent fill-accent" />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="p-8 bg-white/5 border border-white/10 rounded-sm">
                <p className="text-white/60 italic leading-relaxed mb-8">"{t.text}"</p>
                <div className="flex items-center space-x-4">
                  <OptimizedImage 
                    src={t.avatar} 
                    alt={t.name} 
                    className="w-12 h-12 rounded-full border border-accent/20" 
                    containerClassName="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="text-sm font-black text-white uppercase">{t.name}</h4>
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest italic">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter signup */}
      <section className="py-24 border-t border-white/10 bg-accent overflow-hidden relative">
        <div className="absolute top-0 right-0 text-[20rem] font-black text-black/5 italic select-none transform translate-x-1/2 -translate-y-1/2 -skew-x-12">NEWS</div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-6xl font-black text-black italic uppercase tracking-tighter mb-6">Stay in the loop</h2>
          <p className="text-black/60 font-bold uppercase tracking-widest text-sm mb-10">Get instant updates on ticket releases, team news, and exclusive offers.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="YOUR@EMAIL.COM" 
              className="flex-1 bg-white border-2 border-black p-4 text-black font-black uppercase tracking-widest text-xs focus:outline-none placeholder:text-black/30"
            />
            <button className="bg-black text-accent px-10 py-4 font-black uppercase tracking-widest text-xs hover:bg-black/80 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Logo />
            </Link>
            <p className="text-white/40 max-w-xs text-sm leading-relaxed mb-6">
              Ticketdome is the official ticketing platform for the FIFA World Cup 2026™. Experience the greatness of football across North America.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-colors"><Twitter size={18} /></Link>
              <Link to="#" className="w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-colors"><Instagram size={18} /></Link>
              <Link to="#" className="w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-colors"><Facebook size={18} /></Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-6">Explore</h4>
            <div className="space-y-4">
              <Link to="/matches" className="block text-white/40 hover:text-accent text-xs font-bold uppercase tracking-widest transition-colors">Matches</Link>
              <Link to="/stadiums" className="block text-white/40 hover:text-accent text-xs font-bold uppercase tracking-widest transition-colors">Stadiums</Link>
              <Link to="/cities" className="block text-white/40 hover:text-accent text-xs font-bold uppercase tracking-widest transition-colors">Cities</Link>
              <Link to="/teams" className="block text-white/40 hover:text-accent text-xs font-bold uppercase tracking-widest transition-colors">Teams</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-6">Support</h4>
            <div className="space-y-4">
              <Link to="/faq" className="block text-white/40 hover:text-accent text-xs font-bold uppercase tracking-widest transition-colors">FAQ</Link>
              <Link to="/contact" className="block text-white/40 hover:text-accent text-xs font-bold uppercase tracking-widest transition-colors">Contact</Link>
              <Link to="/terms" className="block text-white/40 hover:text-accent text-xs font-bold uppercase tracking-widest transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="block text-white/40 hover:text-accent text-xs font-bold uppercase tracking-widest transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">© 2026 Ticketdome. All rights reserved.</p>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest italic flex items-center gap-2">
            Made for the Beautiful Game <Sparkles size={8} />
          </p>
        </div>
      </footer>
    </div>
  );
};
