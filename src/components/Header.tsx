import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, Menu, X, Sparkles, Watch, Headphones, Scissors, Home, Car, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from '../data/products';
import { FreeDeliveryScrollingMarquee } from './Widgets';

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategorySelect: (catId: string) => void;
  wishlistCount: number;
  onWishlistOpen: () => void;
}

export default function Header({
  cartCount,
  onCartOpen,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  wishlistCount,
  onWishlistOpen
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles size={16} />;
      case 'Watch': return <Watch size={16} />;
      case 'Headphones': return <Headphones size={16} />;
      case 'Scissors': return <Scissors size={16} />;
      case 'Home': return <Home size={16} />;
      case 'Car': return <Car size={16} />;
      default: return <Sparkles size={16} />;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#1a1a1a]/5 transition-all">
      {/* Top Announcement Bar Widget */}
      <FreeDeliveryScrollingMarquee />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Mobile Menu & Search triggers */}
          <div className="flex items-center md:hidden gap-1">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#1a1a1a] hover:opacity-60 transition-opacity"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <button
              id="mobile-search-btn"
              onClick={() => setIsSearchActive(!isSearchActive)}
              className="p-2 text-[#1a1a1a] hover:opacity-60 transition-opacity"
            >
              <Search size={18} />
            </button>
          </div>

          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center gap-2">
              <div className="relative h-9 w-9 sm:h-11 sm:w-11 rounded-full overflow-hidden border border-[#1a1a1a]/15 bg-white flex items-center justify-center shrink-0 shadow-xs">
                <img 
                  src="WhatsApp Image 2026-07-13 at 4.03.28 PM.jpeg" 
                  alt="Royal Fire Logo" 
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover scale-[1.02]"
                />
              </div>
              <span className="text-xl sm:text-2xl font-serif italic tracking-tight text-[#1a1a1a] font-bold">
                Royal <span className="not-italic font-light tracking-widest text-[10px] sm:text-xs uppercase opacity-80 ml-1">Sphire</span>
              </span>
            </a>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                id="desktop-search-input"
                type="text"
                placeholder="Search smart watches, earbuds, shavers..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#f5f5f0]/80 text-xs text-[#1a1a1a] pl-9 pr-4 py-2.5 border border-[#1a1a1a]/10 focus:outline-none focus:border-[#1a1a1a] transition-all tracking-wide"
              />
              <div className="absolute left-3 top-3 text-[#1a1a1a]/40">
                <Search size={15} />
              </div>
            </div>
          </div>

          {/* Action Items (Cart, Wishlist, WhatsApp Call) */}
          <div className="flex items-center gap-1 sm:gap-4">
            <a
              id="whatsapp-call-link"
              href="https://wa.me/923495979062?text=Hi%20Royal%20Sphire%2C%20I%20want%20to%20inquire%20about%20a%20product."
              target="_blank"
              referrerPolicy="no-referrer"
              className="hidden lg:flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#1a1a1a] bg-transparent hover:opacity-75 px-3 py-2 transition-all border border-[#1a1a1a]/15"
            >
              <PhoneCall size={13} />
              <span>+92 349 5979062</span>
            </a>

            <button
              id="wishlist-btn"
              onClick={onWishlistOpen}
              className="p-2 text-[#1a1a1a] hover:opacity-60 transition-opacity relative"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#1a1a1a] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              id="cart-btn"
              onClick={onCartOpen}
              className="p-2 text-[#1a1a1a] hover:opacity-60 transition-opacity relative"
            >
              <div className="relative px-3 py-1.5 border border-[#1a1a1a]/20 text-[11px] font-medium tracking-widest uppercase flex items-center gap-1.5">
                Cart <span className="opacity-40">({cartCount})</span>
              </div>
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile (Slide Down) */}
        <AnimatePresence>
          {isSearchActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden py-3 border-t border-[#1a1a1a]/5 overflow-hidden"
            >
              <div className="relative w-full">
                <input
                  id="mobile-search-input"
                  type="text"
                  placeholder="Search smart watches, earbuds, shavers..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-[#f5f5f0] text-xs text-[#1a1a1a] pl-9 pr-4 py-2.5 border border-[#1a1a1a]/10 focus:outline-none focus:border-[#1a1a1a] transition-all"
                />
                <div className="absolute left-3 top-3 text-[#1a1a1a]/40">
                  <Search size={15} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Category Navigation */}
        <nav className="hidden md:flex items-center gap-3.5 py-4 border-t border-[#1a1a1a]/5 overflow-x-auto no-scrollbar justify-center">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                whileHover={{ scale: 1.06, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className={`flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-4.5 py-2.5 rounded-full border transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-lg shadow-[#1a1a1a]/15'
                    : 'bg-white text-[#1a1a1a]/60 border-neutral-200 hover:text-black hover:border-[#1a1a1a]/30 hover:bg-neutral-50 shadow-2xs'
                }`}
              >
                <span className={`transition-colors duration-300 ${isActive ? 'text-amber-400' : 'text-gray-400'}`}>
                  {getCategoryIcon(cat.icon)}
                </span>
                <span>{cat.name}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white z-50 p-6 flex flex-col shadow-2xl md:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden border border-[#1a1a1a]/15 bg-white flex items-center justify-center shrink-0 shadow-xs">
                    <img 
                      src="WhatsApp Image 2026-07-13 at 4.03.28 PM.jpeg" 
                      alt="Royal Sphire Logo" 
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover scale-[1.02]"
                    />
                  </div>
                  <span className="text-xl font-serif italic font-bold text-[#1a1a1a]">
                    Royal <span className="not-italic font-light text-[10px] uppercase tracking-widest">Sphire</span>
                  </span>
                </div>
                <button
                  id="close-mobile-menu-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-[#1a1a1a] hover:opacity-60"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="text-[10px] text-[#1a1a1a]/40 font-bold mb-4 uppercase tracking-[0.2em]">
                Collections
              </div>
              <div className="flex flex-col gap-1 overflow-y-auto flex-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onCategorySelect(cat.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 text-left text-xs uppercase tracking-wider font-bold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-[#1a1a1a] text-white'
                        : 'text-[#1a1a1a]/70 hover:bg-[#f5f5f0]'
                    }`}
                  >
                    <span>{getCategoryIcon(cat.icon)}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-[#1a1a1a]/5">
                <a
                  id="mobile-whatsapp-btn"
                  href="https://wa.me/923495979062"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#1a1a1a] text-white font-bold text-xs uppercase tracking-widest transition-all"
                >
                  <PhoneCall size={15} />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export function WingsLogoSvg({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 500 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        {/* Gradients for silver wings */}
        <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E6E6E6" />
          <stop offset="25%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#B3B3B3" />
          <stop offset="75%" stopColor="#808080" />
          <stop offset="100%" stopColor="#E6E6E6" />
        </linearGradient>
        
        {/* Gradients for sapphire blue shield */}
        <linearGradient id="sapphire" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="30%" stopColor="#1D4ED8" />
          <stop offset="70%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        {/* Highlight for gemstone cut */}
        <linearGradient id="gem-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Drop shadow filter */}
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <dropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Main Group with shadow */}
      <g filter="url(#shadow)">
        {/* Left Wing */}
        <path 
          d="M 180 220 C 120 180, 70 120, 50 60 C 45 45, 55 45, 65 55 C 85 75, 110 105, 130 135 C 115 115, 95 95, 80 80 C 75 75, 85 75, 95 85 C 120 110, 145 145, 160 175 C 145 155, 125 135, 110 120 C 105 115, 115 115, 125 125 C 150 150, 175 190, 185 220 Z" 
          fill="url(#silver)" 
        />
        
        <path 
          d="M 185 240 C 130 210, 85 160, 70 110 C 65 100, 75 100, 85 110 C 105 130, 130 160, 145 190 C 130 175, 115 160, 100 145 C 95 140, 105 140, 115 150 C 135 170, 160 205, 170 235 Z" 
          fill="url(#silver)" 
        />

        <path 
          d="M 190 260 C 140 240, 100 200, 90 160 C 85 155, 95 155, 105 165 C 120 180, 145 210, 155 235 Z" 
          fill="url(#silver)" 
        />

        <path 
          d="M 195 280 C 150 265, 120 235, 110 205 C 105 200, 115 200, 125 210 C 140 225, 160 250, 165 270 Z" 
          fill="url(#silver)" 
        />

        {/* Right Wing (Symmetrical) */}
        <path 
          d="M 320 220 C 380 180, 430 120, 450 60 C 455 45, 445 45, 435 55 C 415 75, 390 105, 370 135 C 385 115, 405 95, 420 80 C 425 75, 415 75, 405 85 C 380 110, 355 145, 340 175 C 355 155, 375 135, 390 120 C 395 115, 385 115, 375 125 C 350 150, 325 190, 315 220 Z" 
          fill="url(#silver)" 
        />

        <path 
          d="M 315 240 C 370 210, 415 160, 430 110 C 435 100, 425 100, 415 110 C 395 130, 370 160, 355 190 C 370 175, 385 160, 400 145 C 405 140, 395 140, 385 150 C 365 170, 340 205, 330 235 Z" 
          fill="url(#silver)" 
        />

        <path 
          d="M 310 260 C 360 240, 400 200, 410 160 C 415 155, 405 155, 395 165 C 380 180, 355 210, 345 235 Z" 
          fill="url(#silver)" 
        />

        <path 
          d="M 305 280 C 350 265, 380 235, 390 205 C 395 200, 385 200, 375 210 C 360 225, 340 250, 335 270 Z" 
          fill="url(#silver)" 
        />

        {/* Central Shield */}
        <path 
          d="M 250 150 C 285 150, 310 175, 310 210 C 310 265, 265 315, 250 330 C 235 315, 190 265, 190 210 C 190 175, 215 150, 250 150 Z" 
          fill="url(#sapphire)" 
          stroke="url(#silver)" 
          strokeWidth="6" 
          strokeLinejoin="round"
        />

        {/* Sapphire Gem Cuts / Facets inside shield */}
        <polygon points="250,170 290,210 250,250 210,210" fill="url(#gem-highlight)" opacity="0.15" />
        <polygon points="250,150 250,170 210,210" fill="#FFFFFF" opacity="0.1" />
        <polygon points="250,150 250,170 290,210" fill="#FFFFFF" opacity="0.2" />
        <polygon points="250,330 250,250 210,210" fill="#000000" opacity="0.25" />
        <polygon points="250,330 250,250 290,210" fill="#FFFFFF" opacity="0.08" />
        <polygon points="190,210 210,210 250,170" fill="#FFFFFF" opacity="0.05" />
        <polygon points="310,210 290,210 250,170" fill="#FFFFFF" opacity="0.15" />
        <polygon points="190,210 210,210 250,250" fill="#000000" opacity="0.15" />
        <polygon points="310,210 290,210 250,250" fill="#FFFFFF" opacity="0.05" />

        {/* Crown on top of Shield */}
        <path 
          d="M 220 145 L 215 110 L 230 125 L 250 100 L 270 125 L 285 110 L 280 145 Z" 
          fill="url(#silver)" 
          stroke="#999" 
          strokeWidth="2"
        />
        
        {/* Crown Gems */}
        <circle cx="215" cy="110" r="3.5" fill="#1D4ED8" />
        <circle cx="250" cy="100" r="4.5" fill="#1D4ED8" />
        <circle cx="285" cy="110" r="3.5" fill="#1D4ED8" />
        
        <circle cx="235" cy="135" r="2.5" fill="#1D4ED8" />
        <circle cx="250" cy="135" r="2.5" fill="#1D4ED8" />
        <circle cx="265" cy="135" r="2.5" fill="#1D4ED8" />
      </g>
    </svg>
  );
}
