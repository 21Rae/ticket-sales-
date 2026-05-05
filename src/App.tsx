import React, { useState } from 'react';
import { useLocation, Routes, Route, useNavigate, Navigate, Link } from 'react-router-dom';
import Header from './components/Header';
import MatchListView from './components/MatchListView';
import StadiumsList from './components/StadiumsList';
import CitiesList from './components/CitiesList';
import TeamsListView from './components/TeamsListView';
import BookingView from './components/BookingView';
import SeatSelectionView from './components/SeatSelectionView';
import CountdownView from './components/CountdownView';
import CheckoutDrawer from './components/CheckoutDrawer';
import AuthView from './components/AuthView';
import { Event, User } from './types';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleEventClick = (event: Event) => {
    navigate(`/seats/${event.id}`);
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-primary selection:bg-accent selection:text-black">
      <Header 
        onNavigate={(view) => navigate(`/${view}`)} 
        user={user}
        onAuthClick={() => setShowAuth(true)}
        onLogout={handleLogout}
      />
      
      <main className="relative pb-32">
        <AnimatePresence mode="wait" initial={false}>
          {/* @ts-ignore - key is required for transitions but not in RoutesProps */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MatchListView onEventClick={handleEventClick} />} />
            <Route path="/countdown" element={<CountdownView />} />
            <Route 
              path="/matches" 
              element={<MatchListView onEventClick={handleEventClick} />} 
            />
            <Route path="/stadiums" element={<StadiumsList />} />
            <Route path="/cities" element={<CitiesList />} />
            <Route path="/teams" element={<TeamsListView />} />
            <Route path="/book" element={<BookingView />} />
            <Route path="/seats/:eventId" element={<SeatSelectionView />} />
          </Routes>
        </AnimatePresence>
      </main>

      {selectedEvent && (
        <CheckoutDrawer 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

      <AnimatePresence>
        {showAuth && (
          <AuthView 
            onLogin={handleLogin} 
            onClose={() => setShowAuth(false)} 
          />
        )}
      </AnimatePresence>

      <footer className="bg-secondary border-t border-white/5 py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
             <div className="max-w-md">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-accent text-black font-black italic text-xl">
                  TH
                </div>
                <span className="font-display text-3xl font-black tracking-tighter text-white italic uppercase">
                  Ticket<span className="text-accent underline decoration-white/20">Hub</span>
                </span>
              </div>
              <p className="text-slate-500 font-bold leading-relaxed uppercase text-[11px] tracking-widest mb-10">
                The unofficial fan marketplace for the 2026 FIFA World Cup. From Curaçao to Jordan, securing history for every fan.
              </p>
              
              <div className="space-y-4">
                <p className="text-[10px] uppercase font-black tracking-widest text-white italic">Download Our Apps</p>
                <div className="flex gap-4">
                   <div className="h-10 px-4 border border-white/10 rounded flex items-center justify-center bg-black/50 hover:border-accent transition-colors cursor-pointer">
                      <span className="text-[10px] font-black text-white italic">App Store</span>
                   </div>
                   <div className="h-10 px-4 border border-white/10 rounded flex items-center justify-center bg-black/50 hover:border-accent transition-colors cursor-pointer">
                      <span className="text-[10px] font-black text-white italic">Google Play</span>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20">
              <div>
                <h4 className="text-[10px] uppercase font-black tracking-widest text-white mb-6 italic">Helpful Links</h4>
                <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-slate-500">
                  <li><Link to="/help" className="hover:text-accent transition-colors">Help/FAQ</Link></li>
                  <li><Link to="/sell" className="hover:text-accent transition-colors">Sell Tickets</Link></li>
                  <li><Link to="/account" className="hover:text-accent transition-colors">My Account</Link></li>
                  <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] uppercase font-black tracking-widest text-white mb-6 italic">Our Network</h4>
                <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-slate-500">
                  <li><Link to="/network/live-nation" className="hover:text-accent transition-colors">Live Nation</Link></li>
                  <li><Link to="/network/house-of-blues" className="hover:text-accent transition-colors">House of Blues</Link></li>
                  <li><Link to="/network/front-gate" className="hover:text-accent transition-colors">Front Gate Tickets</Link></li>
                  <li><Link to="/network/leagues" className="hover:text-accent transition-colors">NFL / NBA / NHL</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] uppercase font-black tracking-widest text-white mb-6 italic">About Us</h4>
                <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-slate-500">
                  <li><Link to="/blog" className="hover:text-accent transition-colors">Tickethub Blog</Link></li>
                  <li><Link to="/about" className="hover:text-accent transition-colors">Ticketing Truths</Link></li>
                  <li><Link to="/ads" className="hover:text-accent transition-colors">Ad Choices</Link></li>
                  <li><Link to="/careers" className="hover:text-accent transition-colors">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] uppercase font-black tracking-widest text-white mb-6 italic">Partners</h4>
                <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-slate-500">
                  <li><Link to="/partners/paypal" className="hover:text-accent transition-colors">PayPal</Link></li>
                  <li><Link to="/partners/allianz" className="hover:text-accent transition-colors">Allianz</Link></li>
                  <li><Link to="/partners/aws" className="hover:text-accent transition-colors">AWS</Link></li>
                  <li><Link to="/partners/affiliates" className="hover:text-accent transition-colors">Affiliates</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-widest text-slate-500 italic">
            <p>© 1999-2026 TICKETHUB. ALL RIGHTS RESERVED. NOT AN OFFICIAL FIFA PARTNER.</p>
            <div className="flex items-center gap-10">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Manage Credentials</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
