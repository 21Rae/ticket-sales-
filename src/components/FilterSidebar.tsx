import { Filter, SlidersHorizontal, Map, Info, Trophy } from 'lucide-react';

interface FilterSidebarProps {
  onNavigate?: (view: 'matches' | 'stadiums' | 'cities') => void;
}

export default function FilterSidebar({ onNavigate }: FilterSidebarProps) {
  const categories = ['All Matches', 'Group Stage', 'Round of 32', 'Round of 16', 'Quarter-Finals', 'Semi-Finals', 'Final'];
  
  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-28 space-y-10">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <SlidersHorizontal size={20} className="text-accent" />
            <h3 className="text-sm font-black uppercase tracking-widest text-white italic">Tactical Filters</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 italic">Match Phase</p>
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400 cursor-pointer hover:text-accent transition-colors group">
                    <input 
                      type="checkbox" 
                      defaultChecked={cat === 'All Matches' || cat === 'Group Stage'} 
                      className="rounded-sm border-white/10 bg-secondary text-accent focus:ring-accent" 
                    />
                    <span className="group-hover:translate-x-1 transition-transform italic">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 italic">Price Ceiling</p>
              <div className="h-1 bg-secondary rounded-full relative">
                <div className="absolute inset-y-0 left-0 right-1/4 bg-accent rounded-full" />
                <div className="absolute top-1/2 -mt-2 left-0 w-4 h-4 bg-white rounded-full shadow-xl cursor-pointer ring-4 ring-accent/20" />
                <div className="absolute top-1/2 -mt-2 right-1/4 w-4 h-4 bg-white rounded-full shadow-xl cursor-pointer ring-4 ring-accent/20" />
              </div>
              <div className="flex justify-between mt-4">
                <span className="text-[11px] font-black text-white italic">$200</span>
                <span className="text-[11px] font-black text-white italic">$5000+</span>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 italic">Tournament Insights</p>
               <div className="space-y-4">
                  <div className="flex items-start gap-2">
                     <Info size={12} className="text-accent shrink-0 mt-0.5" />
                     <p className="text-[10px] font-bold text-slate-400 leading-tight uppercase">Curaçao: Smallest nation to ever qualify.</p>
                  </div>
                  <div className="flex items-start gap-2">
                     <Trophy size={12} className="text-accent shrink-0 mt-0.5" />
                     <p className="text-[10px] font-bold text-slate-400 leading-tight uppercase">First-ever 48-team expanded format.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="rounded bg-secondary p-6 text-white italic border border-white/5">
          <p className="text-xl font-black uppercase tracking-tight leading-none mb-2 text-accent">Stadium Access</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 font-sans">View official seating maps for all 16 host cities.</p>
          <button 
            onClick={() => onNavigate?.('stadiums')}
            className="w-full bg-white text-black py-3 text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all italic"
          >
            Open Maps
          </button>
        </div>
      </div>
    </aside>
  );
}
