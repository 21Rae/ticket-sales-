import React from 'react';
import { Trophy } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true, variant = 'light' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {showText && (
        <div className="text-left">
          <div className="flex items-baseline leading-none">
            <span className={`text-2xl font-black italic tracking-tighter uppercase ${variant === 'light' ? 'text-white' : 'text-black'}`}>Ticket</span>
            <span className="text-2xl font-black italic tracking-tighter uppercase text-accent">dome</span>
          </div>
          <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] block leading-none mt-1">World Cup 2026</p>
        </div>
      )}
    </div>
  );
};
