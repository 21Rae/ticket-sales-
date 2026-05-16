import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, Info, ShieldCheck, CreditCard, 
  CheckCircle, Plus, Minus, Ticket as TicketIcon,
  Trophy, MapPin, Calendar, Clock, AlertTriangle, Zap, Sparkles
} from 'lucide-react';
import { MOCK_EVENTS, TICKET_CATEGORIES } from '../constants';
import { useBookings } from '../lib/BookingContext';
import { useAuth } from '../lib/AuthContext';
import { getSupabase } from '../lib/supabase';
import { supabaseService } from '../services/supabaseService';
import { Event } from '../types';

const StadiumMap = ({ selectedCategory, onSelectCategory }: { selectedCategory: string, onSelectCategory: (id: string) => void }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <svg viewBox="0 0 400 320" className="w-full h-full drop-shadow-2xl">
        {/* Stadium Exterior Bowl */}
        <ellipse cx="200" cy="160" rx="190" ry="140" className="fill-white/5 stroke-white/10" strokeWidth="1" />
        <ellipse cx="200" cy="160" rx="180" ry="130" className="fill-white/5 stroke-white/10" strokeWidth="2" />
        
        {/* The Pitch */}
        <rect x="120" y="90" width="160" height="140" className="fill-blue-500/5 stroke-blue-500/20" strokeWidth="2" rx="4" />
        <line x1="200" y1="90" x2="200" y2="230" className="stroke-blue-500/20" strokeWidth="1" />
        <circle cx="200" cy="160" r="20" className="fill-none stroke-blue-500/20" strokeWidth="1" />
        
        {/* WEST Side: VIP */}
        <motion.path 
          d="M 50 100 Q 20 160 50 220 L 110 220 L 110 100 Z" 
          whileHover={{ scale: 1.05 }}
          className={`cursor-pointer transition-all duration-300 ${selectedCategory === 'vip' ? 'fill-accent stroke-white' : 'fill-purple-500/10 stroke-purple-500/20 hover:fill-purple-500/20'}`}
          strokeWidth={selectedCategory === 'vip' ? '2' : '1'}
          onClick={() => onSelectCategory('vip')}
        />
        <text x="65" y="165" className="text-[10px] font-black pointer-events-none fill-white/20 uppercase italic">VIP</text>
        
        {/* NORTH End: Premium */}
        <motion.path 
          d="M 120 40 Q 200 15 280 40 L 280 80 L 120 80 Z" 
          whileHover={{ scale: 1.05 }}
          className={`cursor-pointer transition-all duration-300 ${selectedCategory === 'premium' ? 'fill-accent stroke-white' : 'fill-amber-500/10 stroke-amber-500/20 hover:fill-amber-500/20'}`}
          strokeWidth={selectedCategory === 'premium' ? '2' : '1'}
          onClick={() => onSelectCategory('premium')}
        />
        <text x="180" y="65" className="text-[10px] font-black pointer-events-none fill-white/20 uppercase italic">PREM</text>

        {/* SOUTH End: Premium */}
        <motion.path 
          d="M 120 280 Q 200 305 280 280 L 280 240 L 120 240 Z" 
          whileHover={{ scale: 1.05 }}
          className={`cursor-pointer transition-all duration-300 ${selectedCategory === 'premium' ? 'fill-accent stroke-white' : 'fill-amber-500/10 stroke-amber-500/20 hover:fill-amber-500/20'}`}
          strokeWidth={selectedCategory === 'premium' ? '2' : '1'}
          onClick={() => onSelectCategory('premium')}
        />
        <text x="180" y="265" className="text-[10px] font-black pointer-events-none fill-white/20 uppercase italic">PREM</text>

        {/* EAST Side: Standard */}
        <motion.path 
          d="M 350 100 Q 380 160 350 220 L 290 220 L 290 100 Z" 
          whileHover={{ scale: 1.05 }}
          className={`cursor-pointer transition-all duration-300 ${selectedCategory === 'standard' ? 'fill-accent stroke-white' : 'fill-blue-500/10 stroke-blue-500/20 hover:fill-blue-500/20'}`}
          strokeWidth={selectedCategory === 'standard' ? '2' : '1'}
          onClick={() => onSelectCategory('standard')}
        />
        <text x="310" y="165" className="text-[10px] font-black pointer-events-none fill-white/20 uppercase italic">STD</text>
      </svg>
      
      {/* Floating Price Indicators */}
      <AnimatePresence>
        {selectedCategory === 'vip' && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="absolute left-8 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded text-[10px] font-black italic">
            $3,983
          </motion.div>
        )}
        {selectedCategory === 'premium' && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="absolute top-12 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-[10px] font-black italic">
            $5,200
          </motion.div>
        )}
        {selectedCategory === 'standard' && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="absolute right-8 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded text-[10px] font-black italic">
            $1,270
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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

  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const handleSeatClick = (seat: string) => {
    setSelectedSeat(seat);
  };

  const [remainingTickets, setRemainingTickets] = useState(14);
  
  useEffect(() => {
    if (!event) return;

    const calculateRemaining = () => {
      // Handle various date formats (June 11, 2026 or 2026-06-11)
      const dateStr = event.date.includes(',') ? event.date : event.date;
      const matchDate = new Date(dateStr);
      const now = new Date();
      
      // If date parsing fails, fallback to a safe number
      if (isNaN(matchDate.getTime())) return 14;

      const diffTime = matchDate.getTime() - now.getTime();
      const diffDays = Math.max(0, diffTime / (1000 * 60 * 60 * 24));
      
      // Stable noise based on event ID
      const seed = event.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const noise = (seed % 15); // 0 to 15
      
      // tickets = 300 * (1 - e^(-days/k)) + noise
      // k=45 means at 30 days left, ~150 tickets remain
      // at 5 days left, ~30 tickets remain
      const k = 45;
      const baseTickets = 300 * (1 - Math.exp(-diffDays / k));
      const finalCount = Math.max(5, Math.floor(baseTickets + noise));
      
      setRemainingTickets(finalCount);
    };

    calculateRemaining();
  }, [event]);

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
    <div className="min-h-screen bg-primary">
      {/* Event Header */}
      <div className="bg-secondary border-b border-white/5 pt-24 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col">
               <button 
                onClick={() => navigate(-1)}
                className="flex items-center space-x-1 text-[11px] font-bold text-white/40 uppercase tracking-widest mb-4 hover:text-accent transition-colors w-fit"
              >
                <ChevronLeft size={16} />
                <span>Matches</span>
              </button>
              <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3 italic">
                {event.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-white/40 text-[11px] font-semibold uppercase tracking-wider">
                  <Calendar size={14} className="text-accent" />
                  <span>{event.date}</span>
                </div>
                <div className="w-1 h-1 bg-white/10 rounded-full" />
                <div className="flex items-center gap-1.5 text-white/40 text-[11px] font-semibold uppercase tracking-wider">
                  <Clock size={14} className="text-accent" />
                  <span>{event.time}</span>
                </div>
                <div className="w-1 h-1 bg-white/10 rounded-full" />
                <div className="flex items-center gap-1.5 text-white/40 text-[11px] font-semibold uppercase tracking-wider">
                  <MapPin size={14} className="text-accent" />
                  <span>{event.venue}, {event.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
               <div className="text-right hidden md:block">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Starting from</p>
                  <p className="text-2xl font-black text-white italic">${event.startingPrice}</p>
               </div>
               <div className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg border border-red-500/20 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-tight">{remainingTickets} tickets left</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Tickets & Summary */}
          <div className="lg:col-span-7 space-y-6">
            {step === 'selection' ? (
              <>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-secondary p-6 rounded-2xl border border-white/5">
                  <div>
                    <h2 className="text-lg font-black text-white uppercase tracking-tighter italic">Select your tickets</h2>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Found {ticketCategories.length} categories for this event</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Tickets</span>
                        <div className="flex items-center gap-4 bg-black border border-white/10 px-3 py-1.5 rounded-lg shadow-sm">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)); }}
                            className="text-white/40 hover:text-accent transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-black text-white w-4 text-center">{quantity}</span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setQuantity(Math.min(10, quantity + 1)); }}
                            className="text-white/40 hover:text-accent transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {ticketCategories.map(category => (
                    <motion.div 
                      key={category.id}
                      whileHover={{ x: 4 }}
                      className={`group relative bg-secondary border-2 rounded-2xl p-5 transition-all cursor-pointer shadow-sm hover:shadow-md ${
                        selectedCategory === category.id 
                        ? 'border-accent ring-4 ring-accent/10' 
                        : 'border-white/5'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5 flex-1">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                            category.id === 'vip' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                            category.id === 'premium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>
                            <div className="text-center">
                              <p className="text-[9px] font-black uppercase leading-none mb-1">SEC</p>
                              <p className="text-sm font-black italic">{category.id === 'vip' ? '101' : category.id === 'premium' ? '204' : '312'}</p>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-black text-white uppercase italic tracking-tight">{category.name}</h3>
                              {category.id === 'vip' && (
                                <span className="bg-purple-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase italic">Luxury</span>
                              )}
                            </div>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">{category.description}</p>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-[9px] font-black text-green-500 uppercase italic bg-green-500/5 px-2 py-0.5 rounded">
                                <CheckCircle size={10} />
                                <span>Verified Listing</span>
                              </div>
                              <div className="flex items-center gap-1 text-[9px] font-black text-blue-500 uppercase italic bg-blue-500/5 px-2 py-0.5 rounded">
                                <Zap size={10} />
                                <span>Instant Transfer</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0 border-white/5">
                          <div className="text-left md:text-right">
                            <p className="text-sm font-bold text-white/20 line-through decoration-red-400/40 opacity-50">${(category.basePrice * 1.2).toFixed(0)}</p>
                            <p className="text-2xl font-black text-white italic">${category.basePrice}</p>
                            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">total per seat</p>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCategory(category.id);
                              setStep('summary');
                            }}
                            className={`px-8 py-3 rounded-xl font-black uppercase text-xs italic tracking-widest transition-all ${
                              selectedCategory === category.id 
                              ? 'bg-accent text-black shadow-lg shadow-accent/25' 
                              : 'bg-white/5 text-white hover:bg-white/10'
                            }`}
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Secure Guarantee */}
                <div className="bg-secondary border border-white/5 rounded-2xl p-6 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <ShieldCheck className="text-accent" size={32} />
                    <div>
                      <p className="text-xs font-black text-white uppercase italic mb-0.5 tracking-tight">100% Buyer Guarantee</p>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Safe and secure transactions with full protection.</p>
                    </div>
                  </div>
                  <Link to="/blog/1" className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline shrink-0">Learn More</Link>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <button 
                  onClick={() => setStep('selection')}
                  className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-accent transition-colors"
                >
                  <ChevronLeft size={14} />
                  <span>Modify Selection</span>
                </button>
                
                <div className="bg-secondary rounded-2xl border border-white/5 p-8 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                       <div>
                          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-2 italic">Payment Option</h4>
                          <div className="grid grid-cols-5 gap-2">
                             {[
                               { id: 'card', icon: <CreditCard size={18} /> },
                               { id: 'cashapp', icon: <span className="font-bold">$</span> },
                               { id: 'zelle', icon: <span className="font-bold">Z</span> },
                               { id: 'btc', icon: <span className="font-bold">₿</span> },
                               { id: 'eth', icon: <span className="font-bold">Ξ</span> }
                             ].map((p) => (
                               <button 
                                 key={p.id}
                                 onClick={() => setPaymentMethod(p.id as any)}
                                 className={`p-3 rounded-lg border-2 flex items-center justify-center transition-all ${
                                   paymentMethod === p.id 
                                   ? 'bg-accent border-accent text-black scale-105' 
                                   : 'bg-black border-white/5 text-white/40 hover:border-white/20'
                                 }`}
                               >
                                 {p.icon}
                               </button>
                             ))}
                          </div>
                       </div>

                       <div className="space-y-4">
                          {paymentError && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
                              <p className="text-[11px] font-bold leading-relaxed">{paymentError}</p>
                            </div>
                          )}

                          {paymentMethod === 'card' ? (
                             <div className="space-y-4">
                                <input type="text" placeholder="CARDHOLDER NAME" className="w-full bg-black border-2 border-white/5 rounded-xl p-4 text-xs font-bold uppercase focus:border-accent outline-none text-white" />
                                <input type="text" placeholder="CARD NUMBER" className="w-full bg-black border-2 border-white/5 rounded-xl p-4 text-xs font-bold uppercase focus:border-accent outline-none text-white" />
                                <div className="grid grid-cols-2 gap-4">
                                  <input type="text" placeholder="MM/YY" className="w-full bg-black border-2 border-white/5 rounded-xl p-4 text-xs font-bold uppercase focus:border-accent outline-none text-white" />
                                  <input type="text" placeholder="CVC" className="w-full bg-black border-2 border-white/5 rounded-xl p-4 text-xs font-bold uppercase focus:border-accent outline-none text-white" />
                                </div>
                             </div>
                          ) : (
                             <div className="p-5 bg-black rounded-xl text-white space-y-4 border border-white/5">
                                <p className="text-[10px] font-black text-accent uppercase tracking-widest italic leading-none">Transfer Instructions</p>
                                <div className="bg-white/5 p-4 rounded-lg font-mono text-xs break-all border border-white/10 text-white/60">
                                   {paymentMethod === 'cashapp' ? paymentSettings.cashapp_handle :
                                    paymentMethod === 'zelle' ? paymentSettings.zelle_info :
                                    paymentMethod === 'btc' ? paymentSettings.btc_address :
                                    paymentSettings.eth_address}
                                </div>
                                <p className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Please send exact total. Your tickets will release instantly upon network confirmation.</p>
                             </div>
                          )}
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className="bg-black/40 p-6 rounded-xl border border-white/5">
                          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 italic">Security</h4>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <ShieldCheck className="text-accent" size={20} />
                              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wide leading-tight">Garanteed Authentic Tickets</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <CreditCard className="text-accent" size={20} />
                              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wide leading-tight">Fraud Protection Enabled</span>
                            </div>
                          </div>
                       </div>
                       
                       <button 
                        onClick={handleBooking}
                        disabled={isProcessing}
                        className="w-full py-5 bg-white text-black font-black uppercase text-sm italic tracking-widest rounded-xl hover:bg-accent transition-all flex items-center justify-center gap-3"
                      >
                        {isProcessing ? (
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Zap size={18} className="text-accent" />
                            <span>Complete Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interaction Map */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 space-y-6">
              <div className="bg-secondary rounded-2xl border border-white/5 p-6 shadow-sm overflow-hidden group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest italic flex items-center gap-2">
                    <Sparkles size={16} className="text-accent" />
                    Interactive Stadium
                  </h3>
                  <div className="flex items-center gap-2">
                    {['vip', 'premium', 'standard'].map(type => (
                      <div key={type} className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${
                          type === 'vip' ? 'bg-purple-500' : 
                          type === 'premium' ? 'bg-amber-500' : 
                          'bg-blue-500'
                        }`} />
                        <span className="text-[8px] font-bold text-white/40 uppercase tracking-tighter">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <motion.div 
                  style={{ perspective: '1000px' }}
                  className="relative aspect-[1.3/1] flex items-center justify-center bg-black/40 rounded-2xl border border-white/5 overflow-hidden group shadow-inner"
                >
                  <StadiumMap 
                    selectedCategory={selectedCategory} 
                    onSelectCategory={setSelectedCategory} 
                  />
                </motion.div>
                
                <div className="mt-8 grid grid-cols-3 gap-2">
                   {ticketCategories.map(c => (
                      <button 
                        key={c.id}
                        onClick={() => setSelectedCategory(c.id)}
                        className={`p-3 rounded-xl border-2 transition-all text-center ${
                          selectedCategory === c.id 
                          ? 'bg-accent border-accent text-black scale-105 shadow-lg' 
                          : 'bg-black border-white/5 text-white/40 hover:border-white/20 hover:text-white'
                        }`}
                      >
                         <p className="text-[10px] font-black uppercase italic leading-none mb-1">{c.name}</p>
                         <p className="text-[8px] font-bold opacity-60">${c.basePrice}</p>
                      </button>
                   ))}
                </div>

                {/* Individual Seat Picker */}
                <AnimatePresence mode="wait">
                  {selectedCategory && (
                    <motion.div 
                      key={selectedCategory}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-6 bg-black/40 rounded-2xl border border-white/5 p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-[10px] font-black text-white uppercase italic">Select Seats for {selectedCategory.toUpperCase()}</h4>
                          <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none mt-1">Available seats in Section {selectedCategory === 'vip' ? '101' : selectedCategory === 'premium' ? '204' : '312'}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            <span className="text-[8px] font-bold text-white/40 uppercase">Selected</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-white/5 border border-white/10" />
                            <span className="text-[8px] font-bold text-white/40 uppercase">Available</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-10 gap-1.5">
                        {Array.from({ length: 30 }).map((_, i) => {
                          const seatId = `${selectedCategory.toUpperCase()}-${i+1}`;
                          const isOccupied = (i * 13) % 7 === 0;
                          const isSelected = selectedSeat === seatId;
                          
                          return (
                            <button
                              key={i}
                              disabled={isOccupied}
                              onClick={() => handleSeatClick(seatId)}
                              className={`aspect-square rounded-sm border transition-all flex items-center justify-center text-[8px] font-bold ${
                                isOccupied ? 'bg-white/5 border-white/10 text-white/20 cursor-not-allowed opacity-40' :
                                isSelected ? 'bg-accent border-white text-black scale-110 shadow-lg' :
                                'bg-white/5 border-white/10 text-white/40 hover:border-accent hover:text-white'
                              }`}
                            >
                              {i + 1}
                            </button>
                          );
                        })}
                      </div>
                      
                      {selectedSeat && (
                        <div className="mt-4 p-3 bg-white rounded-xl flex items-center justify-between text-black animate-in slide-in-from-bottom-2 fade-in">
                          <div className="flex items-center gap-3">
                            <div className="bg-black text-accent px-2 py-1 rounded text-[10px] font-black italic">
                              SEAT {selectedSeat.split('-')[1]}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest italic">Section {selectedSeat.split('-')[0]} Reserved</span>
                          </div>
                          <button 
                            onClick={() => setStep('summary')}
                            className="bg-accent text-black px-4 py-1.5 rounded-lg text-[10px] font-black uppercase hover:bg-black hover:text-white transition-colors"
                          >
                            Confirm Seat
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Real-time Ticker */}
              <div className="bg-black border border-white/10 rounded-2xl p-6 text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Zap size={60} />
                </div>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
                    <Trophy size={20} className="text-black" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black uppercase italic text-accent">Exclusive Selection</h4>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mt-1 italic">Direct from official resale network</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
