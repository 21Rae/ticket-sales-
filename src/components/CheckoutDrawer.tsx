import { X, ShieldCheck, Info, Sparkles, CreditCard, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Event, PriceBreakdown } from '../types';
import { MOCK_TICKETS } from '../constants';
import { formatCurrency } from '../lib/utils';
import { useState } from 'react';

interface CheckoutDrawerProps {
  event: Event | null;
  onClose: () => void;
}

export default function CheckoutDrawer({ event, onClose }: CheckoutDrawerProps) {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  if (!event) return null;

  const selectedTicket = MOCK_TICKETS.find(t => t.id === selectedTicketId) || MOCK_TICKETS[0];
  
  const breakdown: PriceBreakdown = {
    basePrice: selectedTicket.price,
    serviceFee: selectedTicket.price * 0.2,
    tax: selectedTicket.price * 0.08,
    total: selectedTicket.price * 1.28,
  };

  return (
    <AnimatePresence>
      {event && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-[80] w-full max-w-lg bg-black border-l border-white/10 p-10 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Event <span className="text-accent underline decoration-white/20">Access</span></h2>
              <button 
                onClick={onClose}
                className="h-10 w-10 flex items-center justify-center rounded bg-secondary border border-white/10 text-slate-400 hover:text-accent transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative mb-10 overflow-hidden rounded border border-white/5">
              <img 
                src={event.image} 
                alt={event.name}
                className="h-48 w-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent italic">OFFICIAL FIFA MATCH</span>
                <h3 className="text-2xl font-black italic uppercase text-white leading-tight">{event.name}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{event.venue} • {event.location}</p>
              </div>
            </div>

            <div className="mb-10">
              <h4 className="mb-6 text-[10px] uppercase font-black tracking-widest text-slate-400 italic">Available Categories</h4>
              <div className="space-y-4">
                {MOCK_TICKETS.map((ticket) => (
                  <button
                    key={ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className={`group w-full text-left p-6 rounded-sm border transition-all ${
                      selectedTicketId === ticket.id || (!selectedTicketId && ticket.id === 't1')
                        ? 'border-accent bg-accent/5 ring-1 ring-accent'
                        : 'border-white/5 bg-secondary hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`text-base font-black italic uppercase transition-colors ${
                          selectedTicketId === ticket.id || (!selectedTicketId && ticket.id === 't1') ? 'text-accent' : 'text-white'
                        }`}>
                          Section {ticket.section} • Row {ticket.row}
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {ticket.features.map(f => (
                            <span key={f} className="text-[9px] font-black uppercase text-slate-500 bg-black/40 px-2 py-1 rounded-sm">{f}</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`block text-[10px] font-black italic transition-colors ${
                          selectedTicketId === ticket.id || (!selectedTicketId && ticket.id === 't1') ? 'text-accent' : 'text-white'
                        }`}>
                          AVAILABLE
                        </span>
                        <span className="text-[8px] text-slate-500 uppercase font-black italic whitespace-nowrap">Official Verified</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-secondary p-8 rounded-sm border border-white/5 mb-10 text-center">
               <p className="text-xl font-black italic text-accent uppercase tracking-tighter mb-2">Secure Your Access</p>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed italic">
                  Complete the verification process to finalize your selection for this official matchup.
               </p>
            </div>

            <button className="w-full bg-accent py-5 text-lg font-black text-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4 italic group">
              Confirm Selection <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
            
            <div className="mt-10 flex items-center justify-center gap-8 opacity-40 grayscale">
               <ShieldCheck size={20} className="text-white" />
               <span className="text-[10px] font-black text-white uppercase tracking-widest italic tracking-tighter">Secure FIFA Protocol Active</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
