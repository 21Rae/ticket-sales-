import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

export default function CountdownView() {
  const navigate = useNavigate();
  
  // Target date: June 11, 2026
  const targetDate = new Date('2026-06-11T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Blue Header Section */}
      <div className="bg-[#214dc4] px-4 md:px-12 py-8 md:py-4 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-5 text-center md:text-left">
            <div className="h-20 w-16 bg-white/5 border border-white/10 rounded-sm flex flex-col items-center justify-center p-2 shadow-2xl skew-x-[-5deg]">
              <span className="text-white text-xl font-black italic">26</span>
            </div>
           <div>
             <h1 className="text-2xl md:text-2xl font-black uppercase tracking-tight leading-none italic">FIFA World Cup 2026™</h1>
             <p className="text-xs font-bold text-white/80 uppercase tracking-widest mt-2 md:mt-1">11 June - 19 July 2026</p>
           </div>
        </div>

        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8 lg:gap-12 w-full md:w-auto">
          <div className="flex gap-6 md:gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black italic">{timeLeft.days}</p>
              <p className="text-[10px] uppercase font-bold text-white/70 tracking-widest">days</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black italic">{timeLeft.hours}</p>
              <p className="text-[10px] uppercase font-bold text-white/70 tracking-widest">hours</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black italic">{timeLeft.minutes}</p>
              <p className="text-[10px] uppercase font-bold text-white/70 tracking-widest">mins</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black italic">{timeLeft.seconds}</p>
              <p className="text-[10px] uppercase font-bold text-white/70 tracking-widest">secs</p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/matches')}
            className="w-full md:w-auto bg-black text-white px-8 py-4 md:py-3 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer whitespace-nowrap shadow-xl"
          >
            View matches
          </button>
        </div>
      </div>

      {/* Hero Content Section */}
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Side Content */}
        <div className="lg:w-[50%] p-8 md:p-20 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-[#eeeeee] mb-6">Need to know</p>
          <h2 className="text-3xl md:text-6xl font-black uppercase italic leading-[0.9] tracking-tighter mb-8">
            View the FIFA World Cup 2026 match schedule
          </h2>
          <p className="text-[#999999] text-base md:text-xl font-medium leading-relaxed max-w-xl mb-12">
            World Cup 2026 will be the biggest and most exciting edition of the tournament to date as 48 teams from around the globe compete in 104...
          </p>
          <button className="w-fit px-8 py-3 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#214dc4] hover:text-white transition-all cursor-pointer">
            Read more
          </button>
        </div>

        {/* Right Side Image/Grid */}
        <div className="lg:w-[50%] relative flex items-center justify-center p-8 bg-[#000000]">
          <div className="relative w-full max-w-2xl">
            <img 
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80" 
              className="w-full rounded-sm opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" 
              alt="Stadium" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            {/* 104 Matches Text Overlay simulation */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-10">
               <h3 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-4">104 MATCHES</h3>
               
               {/* Grid of flags simulation */}
               <div className="grid grid-cols-6 md:grid-cols-10 gap-2 opacity-80">
                 {Array.from({ length: 40 }).map((_, i) => (
                   <div key={i} className="flex gap-0.5 items-center">
                     <div className="h-1.5 w-2.5 bg-gray-600 rounded-px" />
                     <span className="text-[5px] text-white/50">v</span>
                     <div className="h-1.5 w-2.5 bg-gray-400 rounded-px" />
                   </div>
                 ))}
               </div>
               
               <div className="mt-8 flex gap-4">
                 <div className="bg-black/80 border border-white/20 p-2 text-center w-32">
                    <p className="text-[8px] font-bold text-white/50 uppercase">Bronze Final</p>
                    <div className="flex justify-between mt-1 px-2">
                       <div className="w-5 h-3 bg-gray-500" />
                       <div className="w-5 h-3 bg-gray-700" />
                    </div>
                 </div>
                 <div className="bg-white p-2 text-center w-32">
                    <p className="text-[10px] font-black text-black uppercase italic">FINAL</p>
                    <div className="flex justify-between mt-1 px-4">
                       <div className="w-6 h-4 bg-gray-300" />
                       <div className="w-6 h-4 bg-gray-900" />
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Right vertical tab "Next Up" */}
          <div className="absolute right-0 top-0 bottom-0 w-1/4 h-full hidden xl:block border-l border-white/10">
             <div className="p-6 h-full flex flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#999999] mb-1">Next Up</p>
                <p className="text-sm font-black uppercase italic text-white mb-6">FIFA World Cup™</p>
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm group">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1540749303346-5b0aa034ef82?auto=format&fit=crop&w=800&q=80" 
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
                alt="Stadium" 
                containerClassName="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                 <p className="text-xl font-black text-white italic uppercase tracking-tighter">Kings of the Game</p>
              </div>
            </div>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Information Grid */}
      <div className="border-t border-white/10 mt-10 md:mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#999999] mb-2">FIFA World Cup™</p>
              <h4 className="text-sm font-black text-white italic hover:text-[#214dc4] cursor-pointer transition-colors">What happened to the World Cup favourites?</h4>
              <div className="h-[1px] w-full bg-white/10 mt-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#999999] mb-2">Senegal</p>
              <h4 className="text-sm font-black text-white italic hover:text-[#214dc4] cursor-pointer transition-colors">26 Superstars: Sadio Mane</h4>
              <div className="h-[1px] w-full bg-white/10 mt-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#999999] mb-2">Spain</p>
              <h4 className="text-sm font-black text-white italic hover:text-[#214dc4] cursor-pointer transition-colors">World Cup wonderkids: Pau Cubarsi</h4>
              <div className="h-[1px] w-full bg-white/10 mt-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#999999] mb-2">Need to know</p>
              <h4 className="text-sm font-black text-white italic hover:text-[#214dc4] cursor-pointer transition-colors">View the FIFA World Cup 2026 match schedule</h4>
              <div className="h-[1px] w-full bg-white/10 mt-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
