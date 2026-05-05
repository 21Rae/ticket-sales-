import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Plus, Minus, Home, Filter, ChevronDown, Info } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_EVENTS } from '../constants';
import { formatCurrency } from '../lib/utils';

export default function SeatSelectionView() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const event = MOCK_EVENTS.find(e => e.id === eventId) || MOCK_EVENTS[0];
  const [selectedSection, setSelectedSection] = useState<number | null>(3);
  const [ticketCount, setTicketCount] = useState(2);
  const [priceRange, setPriceRange] = useState([0, event.startingPrice * 2]);
  const [activeTab, setActiveTab] = useState<'lowest' | 'best'>('lowest');

  const sections = [
    { id: 1, color: 'bg-[#b6b6b6]' },
    { id: 2, color: 'bg-[#214dc4]', hasIcon: true },
    { id: 3, color: 'bg-[#214dc4]' },
    { id: 4, color: 'bg-[#b6b6b6]' },
    { id: 5, color: 'bg-[#214dc4]' },
    { id: 6, color: 'bg-[#b6b6b6]' },
    { id: 7, color: 'bg-[#214dc4]', hasIcon: true },
  ];
  
  const seatListings = [
    { id: 'cat1', title: 'Category 1 Seating', type: 'Prime View', price: event.startingPrice * 1.5, quality: 5 },
    { id: 'cat2', title: 'Category 2 Seating', type: 'Standard View', price: event.startingPrice * 1.2, quality: 4 },
    { id: 'cat3', title: 'Category 3 Seating', type: 'Goal End', price: event.startingPrice, hasMap: true, quality: 3 },
    { id: 'cat4', title: 'Category 4 Seating', type: 'Upper Tier', price: event.startingPrice * 0.8, hasMap: true, quality: 2 },
    { id: 'cat5', title: 'Handicap Seating', type: 'Accessible', price: event.startingPrice * 0.7, quality: 3 },
    { id: 'cat6', title: 'Away Supporter Section', type: 'Designated Away', price: event.startingPrice * 0.9, hasMap: true, quality: 1 },
  ];

  const filteredListings = seatListings
    .filter(s => s.price >= priceRange[0] && s.price <= priceRange[1])
    .sort((a, b) => {
      if (activeTab === 'lowest') return a.price - b.price;
      // Best seats priority: quality desc, then price desc within same quality
      return b.quality - a.quality || b.price - a.price;
    });

  const handleBooking = (price: number) => {
    navigate('/book', { state: { event, selectedPrice: price } });
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#f5f5f5] text-black overflow-hidden font-sans">
      {/* Left Sidebar */}
      <div className="w-20 lg:w-[15%] border-r border-[#d4d4d4] bg-white flex flex-col shrink-0">
        <div className="h-12 px-4 border-b border-[#d4d4d4] flex items-center justify-between">
          <span className="font-bold text-[13px] hidden lg:block">Home Games</span>
          <button 
            onClick={() => navigate('/matches')}
            className="p-1 hover:bg-gray-100 border border-gray-200"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {MOCK_EVENTS.map((m) => (
            <div 
              key={m.id} 
              onClick={() => navigate(`/seats/${m.id}`)}
              className={`p-3 border-b border-[#eeeeee] cursor-pointer hover:bg-gray-50 flex flex-col gap-1 ${m.id === eventId ? 'border-l-4 border-[#214dc4] bg-gray-50' : 'pl-4'}`}
            >
              <p className="text-[10px] font-black uppercase text-[#214dc4] tracking-tighter">
                {new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-bold text-gray-800 uppercase truncate">
                  vs. {m.name.split(' vs. ')[1]}
                </p>
                <div className="h-5 w-7 bg-gray-100 rounded-xs flex items-center justify-center shrink-0 border border-gray-200 overflow-hidden">
                  <img src={m.image} className="w-full h-full object-cover" alt="" />
                </div>
              </div>
              <p className="text-[9px] text-gray-400 font-bold">{m.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative bg-[#efefef] overflow-hidden flex flex-col items-center justify-center">
        {/* Pitch Area */}
        <div className="w-full h-full relative flex flex-col items-center justify-center p-12">
          
          {/* Section Blocks Row */}
          <div className="flex gap-1 mb-1 relative">
            {sections.map((section) => (
              <div key={section.id} className="relative">
                <div 
                  className={`w-20 h-16 ${section.color} flex flex-col items-center justify-center border-b-4 border-black/10 relative cursor-pointer hover:brightness-110 transition-all`}
                  onClick={() => setSelectedSection(section.id)}
                >
                  <span className="text-white font-medium text-lg">{section.id}</span>
                  {section.hasIcon && (
                    <div className="absolute bottom-1 bg-white/20 rounded-full p-0.5">
                       <p className="text-[8px] text-white">♿</p>
                    </div>
                  )}
                </div>
                {/* Tooltip on Section 3 */}
                {section.id === 3 && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-xs border border-gray-100 z-20">
                    <div className="text-[12px] font-bold leading-tight text-center uppercase">
                      Select<br />Seats
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="relative w-full max-w-4xl aspect-[2/1] bg-[#1a9246] border-[6px] border-[#1a9246] shadow-xl">
            {/* Away Supporter Vertical Label */}
            <div className="absolute -left-12 top-0 bottom-0 w-10 bg-[#214dc4] flex items-center justify-center">
              <span className="-rotate-90 text-white font-bold text-xl uppercase tracking-widest whitespace-nowrap">Away Supporter</span>
            </div>

            {/* Inner Pitch Border */}
            <div className="absolute inset-2 border-[1.5px] border-white/60">
              {/* Half line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[1.5px] bg-white/60" />
              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 border-[1.5px] border-white/60 rounded-full" />
              {/* Center point */}
              <div className="absolute top-1/2 left-1/2 h-1.5 w-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              
              {/* Penalty areas */}
              <div className="absolute top-1/6 bottom-1/6 left-0 w-32 border-[1.5px] border-white/60">
                 <div className="absolute top-1/4 bottom-1/4 left-0 w-12 border-r-[1.5px] border-white/60" />
                 <div className="absolute left-full top-1/2 -translate-y-1/2 h-24 w-12 border-l-0 border-[1.5px] border-white/60 rounded-r-3xl" />
              </div>
              <div className="absolute top-1/6 bottom-1/6 right-0 w-32 border-[1.5px] border-white/60">
                 <div className="absolute top-1/4 bottom-1/4 right-0 w-12 border-l-[1.5px] border-white/60" />
                 <div className="absolute right-full top-1/2 -translate-y-1/2 h-24 w-12 border-r-0 border-[1.5px] border-white/60 rounded-l-3xl" />
              </div>
            </div>

            {/* Labels under pitch */}
            <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-24">
              <div className="bg-[#cdcdcd] px-8 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#666666]">Away Bench</div>
              <div className="bg-[#cdcdcd] px-8 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#666666]">Home Bench</div>
            </div>

            {/* Home Supporter Vertical Label */}
            <div className="absolute -right-12 top-0 bottom-0 w-10 bg-[#214dc4] flex items-center justify-center">
              <span className="rotate-90 text-white font-bold text-xl uppercase tracking-widest whitespace-nowrap">Home Supporter</span>
            </div>
          </div>
        </div>

        {/* Floating Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5">
           <button className="h-9 w-9 bg-white border border-[#d4d4d4] rounded-xs flex items-center justify-center hover:bg-gray-50 shadow-sm transition-colors">
              <Home size={16} className="text-gray-600" />
           </button>
           <div className="bg-white border border-[#d4d4d4] rounded-xs shadow-sm overflow-hidden flex flex-col">
              <button className="h-9 w-9 flex items-center justify-center hover:bg-gray-50 border-b border-gray-100 transition-colors">
                <Plus size={16} className="text-gray-600" />
              </button>
              <button className="h-9 w-9 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Minus size={16} className="text-gray-600" />
              </button>
           </div>
        </div>
      </div>

      {/* Right Sidebar - Selection */}
      <div className="w-[28%] border-l border-[#d4d4d4] bg-white flex flex-col shrink-0">
        <div className="p-4 flex gap-2 border-b border-gray-100">
           <div className="flex-1 relative">
             <select 
              value={ticketCount}
              onChange={(e) => setTicketCount(Number(e.target.value))}
              className="w-full h-10 pl-3 pr-8 border border-[#c4c4c4] rounded-xs text-[13px] font-medium appearance-none bg-white cursor-pointer"
             >
               {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                 <option key={n} value={n}>{n} Ticket{n > 1 ? 's' : ''}</option>
               ))}
             </select>
             <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
           </div>
           <button className="h-10 px-4 border border-[#c4c4c4] rounded-xs flex items-center gap-2 text-[12px] font-bold hover:bg-gray-50 transition-colors">
             <Filter size={14} />
             Filters
           </button>
        </div>

        {/* Sort Tabs */}
        <div className="flex border-b border-gray-200">
           <button 
            onClick={() => setActiveTab('lowest')}
            className={`flex-1 py-3 text-[11px] font-black uppercase tracking-tighter border-b-[3px] transition-all ${activeTab === 'lowest' ? 'border-[#214dc4] text-[#214dc4]' : 'border-transparent text-gray-400'}`}
           >
             Standard View
           </button>
           <button 
            onClick={() => setActiveTab('best')}
            className={`flex-1 py-3 text-[11px] font-black uppercase tracking-tighter border-b-[3px] transition-all ${activeTab === 'best' ? 'border-[#214dc4] text-[#214dc4]' : 'border-transparent text-gray-400'}`}
           >
             Premium Seats
           </button>
        </div>

        {/* Fees Notice */}
        <div className="px-4 py-3 border-b border-gray-200">
           <p className="text-[11px] text-gray-800"><span className="font-bold">Match Protocol:</span> Official ticketing verification active.</p>
        </div>

        {/* PayPal Banner */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200 hover:bg-gray-50 cursor-pointer group">
           <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                 <span className="text-[10px] font-black italic text-blue-800 leading-none group-hover:text-blue-600 transition-colors">PayPal</span>
              </div>
              <span className="text-[13px] font-bold text-gray-800 tracking-tight">Buy Now, Pay Later</span>
           </div>
           <div className="flex items-center gap-1 text-blue-600 group-hover:text-blue-400 transition-colors">
              <span className="text-[12px] font-bold">More Info</span>
              <ChevronDown size={12} className="-rotate-90" />
           </div>
        </div>

        {/* Listings */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
           {filteredListings.length > 0 ? (
             filteredListings.map((seat) => (
               <div 
                key={seat.id} 
                onClick={() => handleBooking(seat.price)}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-center justify-between gap-4 transition-colors group"
               >
                  <div className="flex items-center gap-4">
                     {seat.hasMap && (
                       <div className="h-10 w-16 bg-[#1a9246] rounded-sm border border-white/20 relative flex items-center justify-center p-1.5 shrink-0">
                          <div className="w-full h-full border border-white/30 rounded-xs flex items-center justify-center">
                             <div className="w-1/2 h-1/2 border border-white/20 rounded-xs" />
                          </div>
                       </div>
                     )}
                     <div className="min-w-0">
                        <p className="text-[13px] font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate">{seat.title}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{seat.type}</p>
                     </div>
                  </div>
                  <div className="text-right shrink-0">
                     <p className="text-[14px] font-black text-[#214dc4] uppercase tracking-tighter">Select</p>
                  </div>
               </div>
             ))
           ) : (
             <div className="p-12 text-center">
                <Info size={32} className="mx-auto text-gray-300 mb-4" />
                <p className="text-[14px] font-bold text-gray-400">No seats found in this price range.</p>
                <button 
                  onClick={() => setPriceRange([0, event.startingPrice * 2])}
                  className="mt-4 text-[12px] text-blue-600 font-bold hover:underline"
                >
                  Reset filters
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
