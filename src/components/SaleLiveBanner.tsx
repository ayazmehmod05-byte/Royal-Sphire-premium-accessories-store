import React from 'react';
import { motion } from 'motion/react';
import { Zap, Sparkles, Flame, Percent, Truck, RotateCcw } from 'lucide-react';

export default function SaleLiveBanner() {
  const marqueeItems = [
    { text: "SALE IS LIVE!", icon: <Flame className="text-[#ff3838] fill-[#ff3838]" size={15} />, highlight: true },
    { text: "UP TO 50% SPECIAL COD DISCOUNT", icon: <Percent className="text-amber-400" size={14} /> },
    { text: "FREE COD SHIPPING ALL OVER PAKISTAN", icon: <Truck className="text-emerald-400" size={15} /> },
    { text: "7-DAY EASY REPLACEMENT WARRANTY", icon: <RotateCcw className="text-cyan-400" size={14} /> },
    { text: "100% DISPATCH-TESTED ORIGINAL PRODUCTS", icon: <Sparkles className="text-purple-400" size={14} /> },
    { text: "NO ADVANCE PAYMENT REQUIRED", icon: <Zap className="text-amber-500 fill-amber-500" size={14} /> },
  ];

  // Repeat items to ensure smooth infinite loop coverage
  const duplicatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="w-full overflow-hidden bg-[#0c0d12] border-t border-b border-white/10 py-3.5 relative shadow-xl select-none">
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
      
      {/* Neon glowing bar */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

      {/* Marquee Wrapper */}
      <div className="flex whitespace-nowrap overflow-hidden relative">
        <div className="animate-marquee inline-flex items-center">
          {duplicatedItems.map((item, index) => (
            <div 
              key={index} 
              className="inline-flex items-center gap-3 mx-8 text-xs sm:text-[13px] font-sans tracking-[0.12em] font-extrabold uppercase text-white"
            >
              {item.icon}
              <span className={item.highlight ? "text-[#ff3838] drop-shadow-[0_0_8px_rgba(255,56,56,0.3)]" : "text-white/90"}>
                {item.text}
              </span>
              <span className="text-white/20 font-light mx-2">★</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
