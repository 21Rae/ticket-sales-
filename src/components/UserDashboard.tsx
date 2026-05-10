import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Ticket, Heart, CreditCard, Settings, LogOut, 
  Search, Bell, Filter, Grid, List as ListIcon, Calendar, MapPin,
  ChevronRight, Download, Share2, Clock, CheckCircle, Smartphone,
  MessageSquare, HelpCircle, ShieldCheck, Star, X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { useBookings } from '../lib/BookingContext';
import { MOCK_EVENTS, TICKET_CATEGORIES } from '../constants';
import { Logo } from './Logo';
import { OptimizedImage } from './OptimizedImage';

export const UserDashboard: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const { bookings } = useBookings();
  const [activeTab, setActiveTab] = useState('overview');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [displayName, setDisplayName] = useState(user?.name || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.name) {
      setDisplayName(user.name);
    }
  }, [user?.name]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || isUpdating) return;

    setIsUpdating(true);
    setUpdateSuccess(false);

    try {
      await updateProfile({ name: displayName });
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
  const wishlist = MOCK_EVENTS.slice(3, 5); // Simulated wishlist

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-white/5 py-8 flex flex-col pt-24">
        <div className="px-6 mb-10">
          <div className="flex items-center space-x-3 mb-2">
            <OptimizedImage 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-full border-2 border-accent" 
              containerClassName="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-bold text-white uppercase truncate">{user.name}</p>
              <p className="text-[10px] font-medium text-white/40 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'tickets', label: 'My Bookings', icon: Ticket },
            { id: 'wishlist', label: 'Saved Matches', icon: Heart },
            { id: 'payments', label: 'Payment Methods', icon: CreditCard },
            { id: 'settings', label: 'Profile Settings', icon: Settings },
            { id: 'chat', label: 'Live Support', icon: MessageSquare }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === item.id 
                  ? 'bg-accent text-black' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-4 mt-8">
          <button 
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-sm text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pt-24 md:pt-24 max-w-6xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Welcome Back, {user.name.split(' ')[0]}</h2>
                  <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1 italic">Verified Fan Access</p>
                </div>
                <Link to="/matches" className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-accent transition-colors">
                  Find More Tickets
                </Link>
              </div>

              {/* Stats / Quick Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Upcoming Matches', value: upcomingBookings.length, icon: Calendar, color: 'text-accent' },
                  { label: 'E-Tickets Ready', value: upcomingBookings.length, icon: Smartphone, color: 'text-green-400' },
                  { label: 'Wishlist Items', value: wishlist.length, icon: Heart, color: 'text-red-400' }
                ].map((stat, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 bg-white/5 rounded-sm ${stat.color}`}>
                        <stat.icon size={20} />
                      </div>
                      <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Live Updates</span>
                    </div>
                    <p className="text-3xl font-black text-white mb-1 tracking-tighter">{stat.value}</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Next Match Banner */}
              {upcomingBookings.length > 0 && (
                <div className="relative overflow-hidden group">
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <div className="relative z-10 p-8 border border-accent rounded-sm bg-accent/5 group-hover:text-black transition-colors duration-500">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-white/10 rounded-sm flex items-center justify-center font-black text-2xl italic group-hover:bg-black group-hover:text-accent">
                          {MOCK_EVENTS.find(e => e.id === upcomingBookings[0].eventId)?.date?.split('-')?.[2] || '--'}
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">NEXT MATCH</p>
                          <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none">
                            {MOCK_EVENTS.find(e => e.id === upcomingBookings[0].eventId)?.name || 'Match Details Unavailable'}
                          </h3>
                        </div>
                      </div>
                      <Link 
                        to={`/tickets/${upcomingBookings[0].id}`}
                        className="px-8 py-3 border-2 border-current font-black text-xs uppercase tracking-widest hover:bg-black hover:text-accent hover:border-black transition-all"
                      >
                        View Ticket
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Wishlist Preview */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Your Wishlist</h3>
                  <button onClick={() => setActiveTab('wishlist')} className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {wishlist.map(event => (
                    <div key={event.id} className="p-4 bg-white/5 border border-white/5 flex items-center space-x-4 hover:border-white/20 transition-colors">
                      <img src={event.image} alt={event.name} className="w-20 h-20 object-cover rounded-sm grayscale" />
                      <div className="flex-1">
                        <h4 className="text-sm font-black text-white uppercase tracking-tight">{event.name}</h4>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1 flex items-center gap-1">
                          <MapPin size={10} /> {event.venue}
                        </p>
                      </div>
                      <Link to={`/matches/${event.id}`} className="p-2 text-accent hover:text-white transition-colors">
                        <ChevronRight size={20} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'tickets' && (
            <motion.div
              key="tickets"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-8">My Bookings</h2>
              
              {bookings.length === 0 ? (
                <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-sm">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Ticket className="text-white/20" size={32} />
                  </div>
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">No active bookings</h3>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8">Ready to watch history in the making?</p>
                  <Link to="/matches" className="px-8 py-4 bg-accent text-black font-black uppercase tracking-widest text-xs rounded-sm hover:bg-white transition-all">
                    Browse Matches
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map(booking => {
                    const event = MOCK_EVENTS.find(e => e.id === booking.eventId);
                    return (
                      <div key={booking.id} className="bg-white/5 border border-white/10 rounded-sm overflow-hidden">
                        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                          <div className="flex items-center space-x-4">
                            <div className="text-center bg-white/10 p-3 rounded-sm min-w-[70px]">
                              <p className="text-[10px] font-black text-white/40 uppercase leading-none mb-1">{event?.date?.split('-')?.[1] || '--'}</p>
                              <p className="text-2xl font-black text-white italic leading-none">{event?.date?.split('-')?.[2] || '--'}</p>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest ${
                                  booking.status === 'confirmed' ? 'bg-green-500 text-black' : 
                                  booking.status === 'pending' ? 'bg-accent text-white' : 'bg-red-500 text-white'
                                }`}>
                                  {booking.status === 'pending' ? 'Pending verification' : booking.status}
                                </span>
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">#{booking.id}</span>
                              </div>
                              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none hover:text-accent transition-colors">
                                <Link to={`/matches/${event?.id}`}>{event?.name}</Link>
                              </h3>
                              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-2 flex items-center gap-1">
                                <MapPin size={10} /> {event?.venue}, {event?.location}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 w-full md:w-auto">
                            <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                              <Download size={14} />
                              <span>E-Ticket</span>
                            </button>
                            <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                              <Share2 size={14} />
                              <span>Share</span>
                            </button>
                            <button className="w-full md:w-auto px-4 py-2 border border-accent/30 text-accent text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-black transition-all">
                              Details
                            </button>
                          </div>
                        </div>
                        
                        <div className="px-6 py-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                          <div className="flex items-center space-x-4">
                            {booking.status === 'confirmed' ? (
                              <div className="flex items-center gap-1 text-green-400">
                                <CheckCircle size={12} />
                                <span>Paid</span>
                              </div>
                            ) : booking.status === 'pending' ? (
                              <div className="flex items-center gap-1 text-accent">
                                <Clock size={12} />
                                <span>Awaiting Verification</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-red-400">
                                <X size={12} />
                                <span>Unverified</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1 text-white/40">
                              <ShieldCheck size={12} />
                              <span>Verified Original</span>
                            </div>
                          </div>
                          <div className="text-white/20">
                            Booked on {new Date(booking.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-[70vh] flex flex-col bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 bg-accent text-black flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center overflow-hidden">
                    <Logo showText={false} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-tighter">Support Assistant</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-900 rounded-full animate-pulse" />
                      Live agent online
                    </p>
                  </div>
                </div>
                <HelpCircle size={20} />
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <div className="flex items-start max-w-[80%]">
                  <div className="bg-white/10 p-4 rounded-sm text-xs font-medium text-white/80 leading-relaxed italic border border-white/5">
                    Hello {user.name.split(' ')[0]}! Welcome to Ticketdome Support. How can we help you prepare for the greatest sporting event on earth?
                  </div>
                </div>
                {/* Simulated message bubbles */}
                <div className="flex items-start justify-end ml-auto max-w-[80%]">
                  <div className="bg-accent text-black p-4 rounded-sm text-xs font-black uppercase tracking-tight leading-relaxed">
                    I need help with my ticket for the opener in CDMX.
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-white/5 bg-black">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="TYPE YOUR MESSAGE..." 
                    className="flex-1 bg-white/5 border border-white/10 p-3 text-[10px] font-black uppercase tracking-widest text-white focus:outline-none focus:border-accent"
                  />
                  <button className="px-6 py-3 bg-accent text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-8">Account Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-accent uppercase tracking-[0.2em] italic">Personal Information</h3>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Display Name</label>
                        <input 
                          type="text" 
                          value={displayName} 
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white font-medium focus:border-accent outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Email Address</label>
                        <input type="email" defaultValue={user.email} className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white font-medium outline-none opacity-50" readOnly />
                      </div>
                      <div className="flex items-center gap-4">
                        <button 
                          type="submit"
                          disabled={isUpdating}
                          className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isUpdating ? 'Updating...' : 'Update Profile'}
                        </button>
                        {updateSuccess && (
                          <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest flex items-center gap-1">
                            <CheckCircle size={12} />
                            Saved Successfully
                          </span>
                        )}
                      </div>
                    </form>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-accent uppercase tracking-[0.2em] italic">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5">
                        <div>
                          <p className="text-xs font-black text-white uppercase tracking-widest">Marketing Updates</p>
                          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Email notifications for ticket drops</p>
                        </div>
                        <div className="w-12 h-6 bg-accent rounded-full p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-black rounded-full ml-auto" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5">
                        <div>
                          <p className="text-xs font-black text-white uppercase tracking-widest">Booking Alerts</p>
                          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">SMS notifications for your matches</p>
                        </div>
                        <div className="w-12 h-6 bg-white/10 rounded-full p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-white/20 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black text-red-500 uppercase tracking-[0.2em] italic mb-6">Danger Zone</h3>
                <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-sm flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-red-500 uppercase">Delete Account</h4>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">This will permanently remove your access to all tickets</p>
                  </div>
                  <button className="px-4 py-2 border border-red-500 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Destroy Account</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
