import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ShieldCheck, Lock, Sparkles, Ticket, Info, Headphones, Compass } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_EVENTS } from '../constants';
import { formatCurrency } from '../lib/utils';

interface Section {
  id: string;
  category: number;
  label?: string;
}

const CATEGORIES = [
  { id: 1, name: 'CAT 1', subname: 'PREMIUM', price: 950, color: '#E31E24' },
  { id: 2, name: 'CAT 2', subname: 'TOP', price: 750, color: '#F29100' },
  { id: 3, name: 'CAT 3', subname: 'PLUS', price: 550, color: '#FFD100' },
  { id: 4, name: 'CAT 4', subname: 'STANDARD', price: 350, color: '#4DB848' },
  { id: 5, name: 'CAT 5', subname: 'BUDGET', price: 200, color: '#0097D7' },
  { id: 6, name: 'CAT 6', subname: 'BEHIND GOAL', price: 120, color: '#662D91' },
  { id: 7, name: 'ACCESSIBILITY', subname: 'EASY ACCESS', price: 120, color: '#1A2F5F' },
];

export default function SeatSelectionView() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  
  const event = MOCK_EVENTS.find(e => e.id === eventId) || MOCK_EVENTS[0];

  const handleSeatClick = (section: Section) => {
    const category = CATEGORIES.find(c => c.id === section.category);
    const finalPrice = category?.price || 350;
    navigate('/book', { 
      state: { 
        event, 
        selectedPrice: finalPrice,
        section: section.id,
        categoryName: category?.name + ' ' + category?.subname
      } 
    });
  };

  const renderSection = (id: string, category: number, label?: string, className: string = "") => {
    const cat = CATEGORIES.find(c => c.id === category);
    const isHovered = hoveredSection === id;
    
    return (
      <div 
        key={id}
        onMouseEnter={() => setHoveredSection(id)}
        onMouseLeave={() => setHoveredSection(null)}
        onClick={() => handleSeatClick({ id, category, label })}
        style={{ backgroundColor: isHovered ? '#fff' : cat?.color }}
        className={`
          relative flex items-center justify-center cursor-pointer 
          transition-all duration-150 border border-black/5 select-none
          active:scale-95
          ${isHovered ? 'z-20 shadow-xl scale-110' : 'z-10'}
          ${className}
        `}
      >
        <span className={`text-[7px] font-bold uppercase tracking-tighter transition-colors pointer-events-none ${isHovered ? 'text-black' : 'text-white'}`}>
          {label || id}
        </span>
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-sm text-[9px] font-black whitespace-nowrap z-50 flex flex-col items-center border border-black shadow-2xl italic pointer-events-none"
            >
              <span className="uppercase text-[7px] text-slate-500 tracking-[0.2em] mb-1">{cat?.name} {cat?.subname}</span>
              <span className="text-[12px] leading-none mb-0.5">{formatCurrency(cat?.price || 0)}</span>
              <span className="text-[7px] font-bold text-white bg-black px-1.5 py-0.5 rounded-full">Secure Spot</span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-8 border-x-transparent border-t-8 border-t-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-primary text-white p-0 font-sans selection:bg-accent selection:text-black">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
      </div>

      <div className="max-w-[1600px] mx-auto p-4 lg:p-12 relative z-10">
        
        {/* Header Branding */}
        <div className="flex items-start justify-between mb-16 border-b border-white/5 pb-8">
          <div className="flex gap-6 items-center">
             <div className="flex h-16 w-16 items-center justify-center rounded bg-accent text-black font-black italic text-3xl shadow-[0_0_30px_rgba(204,255,0,0.2)] shrink-0">
                TH
             </div>
             <div>
                <div className="flex items-center gap-2 mb-1">
                   <h1 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
                     Ticket<span className="text-accent underline decoration-white/20">Hub</span>
                   </h1>
                   <div className="h-8 w-[2px] bg-white/20 mx-2 hidden lg:block" />
                   <div className="hidden lg:flex items-center gap-2 uppercase text-[10px] font-black tracking-[0.3em] text-slate-500 italic">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/FIFA_World_Cup_2026_Logo.svg/1200px-FIFA_World_Cup_2026_Logo.svg.png" alt="FIFA" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-help" />
                      <span>Official Fan Portal</span>
                   </div>
                </div>
                <h2 className="text-xl lg:text-2xl font-black italic uppercase tracking-tighter text-white/40 leading-none">
                  Seat Selection & Visualization
                </h2>
             </div>
          </div>
          <button 
            onClick={() => navigate('/matches')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent hover:text-white transition-colors italic border border-accent/20 px-4 py-2 rounded-sm"
          >
            <ChevronLeft size={16} />
            Explore More Matches
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* LEFT: Stadium View */}
          <div className="lg:col-span-8 flex flex-col items-center">
            
            <div className="w-full flex flex-col items-center">
               <div className="text-center mb-10">
                  <h3 className="text-[18px] font-black uppercase tracking-[0.4em] text-accent italic leading-none">EAST STAND</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">PREMIUM VIEW • SECURED PROTOCOL</p>
               </div>

               {/* Stadium Oval Bowl Representation */}
               <div className="relative w-full max-w-[900px] aspect-[1.3/1] bg-secondary rounded-[150px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/5 p-8 pt-12 flex items-center justify-center">
                  
                  {/* The Oval Layers */}
                  <div className="absolute inset-4 rounded-[140px] border border-white/5 p-2">
                     
                     <div className="w-full h-full relative overflow-hidden rounded-[130px]">
                        
                        {/* Outer Ring (400 Level) */}
                        <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-0.5 opacity-40">
                           {/* Simplified ring logic for visual match */}
                           {Array.from({ length: 96 }).map((_, i) => (
                              <div key={i} className="bg-slate-900 border border-white/5" />
                           ))}
                        </div>

                        {/* Mid Ring (200 Level) */}
                        <div className="absolute inset-[15%] rounded-[90px] bg-primary p-1 shadow-2xl z-10 overflow-hidden border border-white/5">
                           <div className="w-full h-full grid grid-cols-10 grid-rows-6 gap-0.5">
                              {Array.from({ length: 60 }).map((_, i) => (
                                 <div key={i} className="bg-slate-800 border border-white/5" />
                              ))}
                           </div>
                        </div>

                        {/* Inner Ring (100 Level) */}
                        <div className="absolute inset-[28%] rounded-[60px] bg-primary p-1 shadow-xl z-20 overflow-hidden border border-white/10">
                            <div className="w-full h-full grid grid-cols-8 grid-rows-5 gap-0.5">
                              {Array.from({ length: 40 }).map((_, i) => (
                                 <div key={i} className="bg-slate-700 border border-white/5" />
                              ))}
                           </div>
                        </div>

                        {/* Interactive Selection Layer (Simplified for demo) */}
                        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-2">
                           {/* Top Ring sections (East) */}
                           <div className="w-[70%] h-12 flex gap-0.5 mb-2 -mt-4">
                              {[340,341,342,343,343.1,345,346].map((n) => renderSection(n.toString(), 4, Math.floor(n).toString(), "flex-1"))}
                           </div>
                           
                           <div className="flex-1 w-full flex items-center justify-between px-2">
                              {/* Left sections (North) */}
                              <div className="w-12 h-[60%] flex flex-col gap-0.5 ml-2">
                                 {[338,337,336,335,334,333].map(n => renderSection(n.toString(), 6, undefined, "flex-1"))}
                              </div>

                              {/* Central Pitch */}
                              <div className="flex-1 max-w-[500px] aspect-[1.5/1] bg-emerald-600/20 rounded-sm border-[4px] border-emerald-500/30 relative shadow-inner mx-4">
                                 <div className="absolute inset-4 border border-white/10" />
                                 <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
                                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white/10" />
                                 <div className="absolute inset-0 flex items-center justify-center opacity-5 rotate-[-15deg] select-none pointer-events-none">
                                    <span className="text-[60px] font-black italic tracking-tighter text-white">TICKETHUB</span>
                                 </div>
                                 {/* Interactive Inner Sections */}
                                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[80%] h-8 grid grid-cols-6 gap-0.5">
                                    {[101,102,103,104,105,106].map(n => renderSection(n.toString(), 1, undefined, "rounded-t-sm"))}
                                 </div>
                                 <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-8 grid grid-cols-6 gap-0.5">
                                    {[121,122,123,124,125,126].map(n => renderSection(n.toString(), 1, undefined, "rounded-b-sm"))}
                                 </div>
                              </div>

                              {/* Right sections (South) */}
                              <div className="w-12 h-[60%] flex flex-col gap-0.5 mr-2">
                                 {[348,349,350,351,352,353].map(n => renderSection(n.toString(), 6, undefined, "flex-1"))}
                              </div>
                           </div>

                           {/* Bottom Ring sections (West) */}
                           <div className="w-[70%] h-12 flex gap-0.5 mt-2 -mb-4">
                              {[327,326,325,324,323,322,321].map(n => renderSection(n.toString(), 2, undefined, "flex-1"))}
                           </div>
                        </div>

                     </div>
                  </div>

                  {/* Compass/Labels */}
                  <div className="absolute -left-20 top-1/2 -translate-y-1/2 flex flex-col items-center">
                    <span className="text-[12px] font-black uppercase tracking-[0.5em] text-white/60 -rotate-90 origin-center whitespace-nowrap">NORTH STAND</span>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-600 -rotate-90 origin-center whitespace-nowrap mt-16 italic">BEHIND THE GOAL</p>
                  </div>
                  <div className="absolute -right-20 top-1/2 -translate-y-1/2 flex flex-col items-center">
                    <span className="text-[12px] font-black uppercase tracking-[0.5em] text-white/60 rotate-90 origin-center whitespace-nowrap">SOUTH STAND</span>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-600 rotate-90 origin-center whitespace-nowrap mt-16 italic">BEHIND THE GOAL</p>
                  </div>
               </div>

               <div className="mt-10 text-center">
                  <h3 className="text-[18px] font-black uppercase tracking-[0.4em] text-white/40 italic leading-none">WEST STAND</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-700 mt-2">MAIN ACCESS AREA</p>
               </div>

               <div className="mt-20 flex flex-col items-center gap-2">
                 <div className="flex items-center gap-6 mb-4">
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/FIFA_World_Cup_2026_Logo.svg/1200px-FIFA_World_Cup_2026_Logo.svg.png" alt="FIFA" className="h-10 opacity-30" />
                    <div className="h-10 w-[1px] bg-white/10" />
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-white text-black font-black italic text-xl opacity-30">TH</div>
                 </div>
                 <p className="text-[18px] font-black text-white uppercase italic tracking-tighter">Your Journey to History Starts Here</p>
                 <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em] leading-none">TICKETHUB PRE-SALE ENCRYPTION ENABLED</p>
                 <p className="text-[8px] text-slate-700 mt-6 max-w-sm text-center uppercase tracking-widest">
                   The TicketHub visualizer is an illustrative tool. Final seating location will be confirmed on your verified ticket credential.
                 </p>
               </div>
            </div>

          </div>

          {/* RIGHT: Sidebar Legend & Info */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Category Table */}
            <div className="bg-secondary rounded-sm border border-white/5 overflow-hidden shadow-2xl shadow-black">
               <div className="grid grid-cols-12 bg-white/5 border-b border-white/5 p-4">
                  <div className="col-span-8 text-[11px] font-black uppercase tracking-widest text-slate-500">CATEGORY</div>
                  <div className="col-span-4 text-[11px] font-black uppercase tracking-widest text-slate-500 text-right">USD*</div>
               </div>
               <div className="divide-y divide-white/[0.02]">
                  {CATEGORIES.map(cat => (
                    <div key={cat.id} className="grid grid-cols-12 items-center p-3 hover:bg-white/[0.03] transition-colors group cursor-pointer">
                       <div className="col-span-8 flex items-center gap-3">
                          <div className="h-10 w-24 flex flex-col items-center justify-center relative overflow-hidden rounded-xs shrink-0" style={{ backgroundColor: cat.color }}>
                             <span className="text-white text-[12px] font-black italic relative z-10">{cat.name}</span>
                             <span className="text-white text-[7px] font-bold uppercase tracking-tighter opacity-80 relative z-10">{cat.subname}</span>
                             <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity shadow-inner" />
                          </div>
                          <div>
                             <p className="text-[12px] font-black text-white uppercase italic leading-none">{cat.name}</p>
                             <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">{cat.subname}</p>
                          </div>
                       </div>
                       <div className="col-span-4 text-right">
                          <span className="text-[18px] font-black text-accent">${cat.price}</span>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="bg-black/40 p-3 text-center border-t border-white/5">
                  <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest leading-relaxed">
                    *TICKETHUB INDICATIVE PRICING<br />SUBJECT TO DEMAND SCALABILITY
                  </span>
               </div>
            </div>

            {/* Support Icons */}
            <div className="grid grid-cols-1 gap-5 px-4 lg:px-0">
               {[
                 { icon: Ticket, label: 'VERIFIED TICKETS', sub: 'Hub Integrity Protocol' },
                 { icon: ShieldCheck, label: 'END-TO-END SECURE', sub: '256-bit encryption' },
                 { icon: Sparkles, label: 'PRIME SELECTION', sub: 'Exclusive seat clusters' },
                 { icon: Headphones, label: 'GLOBAL SUPPORT', sub: "Fan assistance 24/7" },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 group">
                    <div className="h-12 w-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all transform group-hover:scale-110 shrink-0">
                       <item.icon size={20} />
                    </div>
                    <div>
                       <h4 className="text-[11px] font-black text-white uppercase tracking-widest leading-none">{item.label}</h4>
                       <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter mt-1">{item.sub}</p>
                    </div>
                 </div>
               ))}
            </div>

            {/* Call to Action Box */}
            <div className="bg-accent p-6 rounded-sm relative overflow-hidden group hover:bg-white transition-all cursor-pointer shadow-[0_20px_50px_rgba(204,255,0,0.1)] mx-4 lg:mx-0">
               <div className="relative z-10 flex items-center gap-4">
                  <div className="h-12 w-12 rounded bg-black flex items-center justify-center text-accent shrink-0">
                    <Ticket size={24} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-black text-black uppercase italic leading-none">STADIUM DATA LOADED</h3>
                    <p className="text-[10px] font-bold text-black/60 uppercase tracking-tighter mt-2">Demand is currently HIGH for this sector. Initiate booking sequence.</p>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-24 h-full bg-black/5 -skew-x-12 translate-x-12" />
            </div>

            {/* Bottom Branding */}
            <div className="mt-8 flex items-center gap-4 px-4 lg:px-0 border-t border-white/5 pt-8">
               <div className="flex h-12 w-12 items-center justify-center rounded bg-accent text-black font-black italic text-xl">TH</div>
               <div>
                  <p className="text-[14px] font-black text-white uppercase italic leading-none">TICKETHUB OFFICIAL</p>
                  <p className="text-[14px] font-black text-accent uppercase italic leading-none opacity-40 tracking-widest">2026 PROTOCOL</p>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Compass Visual (Bottom Left) */}
      <div className="fixed bottom-12 left-12 opacity-10 pointer-events-none hidden 2xl:block">
         <Compass size={120} className="text-accent animate-[spin_60s_linear_infinite]" strokeWidth={1} />
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
               <span className="text-[10px] font-black text-accent mb-8">N</span>
               <div className="flex gap-8">
                  <span className="text-[10px] font-black text-accent">W</span>
                  <span className="text-[10px] font-black text-accent">E</span>
               </div>
               <span className="text-[10px] font-black text-accent mt-8">S</span>
            </div>
         </div>
      </div>
    </div>
  );

}
