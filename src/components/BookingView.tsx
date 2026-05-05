import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, ShieldCheck, Calendar, MapPin, ArrowLeft, Ticket } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatCurrency, formatDate } from '../lib/utils';
import { MOCK_EVENTS } from '../constants';

export default function BookingView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { event, selectedPrice, section, categoryName } = location.state || {};

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">
              Select a <span className="text-accent underline decoration-white/10 underline-offset-4">Match</span> to Book
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Choose your fixture to begin the secure booking process</p>
          </motion.div>

          <div className="grid gap-6">
            {MOCK_EVENTS.map((m, idx) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-secondary border border-white/5 p-6 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8 hover:border-accent/40 transition-colors group"
              >
                <div className="flex items-center gap-8 w-full md:w-auto">
                  <div className="h-20 w-28 bg-black rounded-sm overflow-hidden shrink-0 border border-white/5">
                    <img src={m.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-[9px] font-black uppercase text-accent bg-accent/10 px-2 py-0.5 rounded-xs tracking-tighter">Verified fixture</span>
                       <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{formatDate(m.date)}</span>
                    </div>
                    <h3 className="text-lg font-black text-white italic uppercase tracking-tight mb-1">{m.name}</h3>
                    <div className="flex items-center gap-4 text-slate-500">
                       <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase">
                          <MapPin size={12} className="text-accent" />
                          {m.venue}
                       </div>
                       <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase">
                          <Calendar size={12} className="text-accent" />
                          {m.time}
                       </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 w-full md:w-auto justify-end border-t md:border-t-0 border-white/5 pt-6 md:pt-0">
                  <button 
                    onClick={() => navigate(`/seats/${m.id}`)}
                    className="h-14 px-8 bg-white text-black font-black uppercase tracking-widest text-[11px] hover:bg-accent transition-all italic shadow-xl flex items-center gap-3"
                  >
                    <Ticket size={16} />
                    Get Tickets
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const bookingServiceFee = selectedPrice * 0.1;
  const total = selectedPrice + bookingServiceFee;

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <motion.button 
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-slate-500 hover:text-white mb-12 uppercase text-[10px] font-black tracking-widest italic transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Seats
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary border border-white/10 p-10 rounded-sm mb-8"
          >
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-8">
              Booking <span className="text-accent underline decoration-white/10 underline-offset-4">Information</span>
            </h2>

            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                    <ShieldCheck size={18} />
                  </div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Personal Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 italic ml-1">Full Name</label>
                      <input className="w-full bg-black border border-white/5 h-12 px-4 text-white font-bold uppercase text-[11px] focus:border-accent outline-none" placeholder="JOHN DOE" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 italic ml-1">Email</label>
                      <input className="w-full bg-black border border-white/5 h-12 px-4 text-white font-bold uppercase text-[11px] focus:border-accent outline-none" placeholder="FAN@TICKETHUB.COM" />
                   </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                    <CreditCard size={18} />
                  </div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Payment Method</h3>
                </div>
                <div className="bg-black border border-white/5 p-6 rounded-sm">
                   <p className="text-slate-400 text-[10px] font-bold uppercase text-center py-4 italic">Secure Payment Portal Integration Pending</p>
                </div>
              </section>
            </div>

            <button className="w-full bg-white text-black h-16 mt-12 font-black uppercase tracking-widest text-sm hover:bg-accent transition-all italic shadow-xl">
              Confirm Reservation
            </button>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-secondary border border-white/10 p-8 rounded-sm sticky top-32"
          >
            <h3 className="text-sm font-black text-white uppercase tracking-widest italic mb-6">Order Summary</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="h-12 w-12 bg-black border border-white/5 rounded flex items-center justify-center text-accent">
                   <Ticket size={20} />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Selected Seating</p>
                  <p className="text-[11px] font-black text-white italic uppercase">{categoryName || 'Standard Seat'}</p>
                  <p className="text-[9px] text-accent font-black uppercase tracking-widest">Section {section || 'TBD'}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 bg-black border border-white/5 rounded flex items-center justify-center text-accent">
                   <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Venue</p>
                  <p className="text-[11px] font-black text-white italic uppercase">{event.venue}</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 space-y-4">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400 italic">
                <span>Base Ticket</span>
                <span className="text-white">{formatCurrency(selectedPrice)}</span>
              </div>
              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400 italic">
                <span>Service Fee (10%)</span>
                <span className="text-white">{formatCurrency(bookingServiceFee)}</span>
              </div>
              <div className="flex justify-between text-[13px] font-black uppercase tracking-widest text-accent italic pt-4 border-t border-white/5">
                <span>Total Amount</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
