import React, { useState } from 'react';
import { Mail, Phone, MapPin, Truck, RefreshCw, Clock, MessageCircle, Heart } from 'lucide-react';

interface FooterProps {
  onCategorySelect: (catId: string) => void;
}

export default function Footer({ onCategorySelect }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#1a1a1a] text-[#fdfdfb]/80 border-t border-black/5 font-sans">
      {/* Policy highlights bar */}
      <div className="border-b border-white/5 bg-[#141414] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/5 border border-white/10 text-white flex items-center justify-center flex-shrink-0">
              <Truck size={18} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-serif italic font-medium text-sm text-white tracking-wide">Fastest COD Delivery</h4>
              <p className="text-xs text-[#fdfdfb]/60 mt-1 leading-relaxed">
                We deliver to your doorstep within 2 to 4 working days with verified secure Cash on Delivery (COD).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-y sm:border-y-0 sm:border-x border-white/5 py-6 sm:py-0 sm:px-6">
            <div className="w-12 h-12 bg-white/5 border border-white/10 text-white flex items-center justify-center flex-shrink-0">
              <RefreshCw size={18} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-serif italic font-medium text-sm text-white tracking-wide">7-Day Free Replacement</h4>
              <p className="text-xs text-[#fdfdfb]/60 mt-1 leading-relaxed">
                If the product has any faults, we provide absolute hassle-free replacement and refund within 7 days.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/5 border border-white/10 text-white flex items-center justify-center flex-shrink-0">
              <Clock size={18} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-serif italic font-medium text-sm text-white tracking-wide">24/7 WhatsApp Support</h4>
              <p className="text-xs text-[#fdfdfb]/60 mt-1 leading-relaxed">
                Need help or want to order via chat? Our premium WhatsApp customer care agent is online 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        {/* About column */}
        <div className="md:col-span-5 space-y-5">
          <span className="text-2xl font-serif italic text-white font-bold flex items-center gap-2">
            <div className="relative h-7 w-7 rounded-full overflow-hidden border border-white/10 bg-white flex items-center justify-center shrink-0 shadow-xs">
              <img 
                src="WhatsApp Image 2026-07-13 at 4.03.28 PM.jpeg" 
                alt="Royal Sphire Logo" 
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover scale-[1.02]"
              />
            </div>
            Royal <span className="not-italic font-light text-xs uppercase tracking-widest ml-1 opacity-80">Sphire</span>
          </span>
          <p className="text-xs sm:text-sm text-[#fdfdfb]/60 leading-relaxed max-w-sm">
            Royal Sphire is Pakistan's ultimate destination for cutting-edge gadgets, smartwatches, transparent earbuds, men's trimmer detailers, and kitchen organizers. We bring tech to your lifestyle with unmatched quality and pricing.
          </p>
          <div className="pt-2">
            <a
              id="footer-whatsapp-chat-link"
              href="https://wa.me/923495979062"
              target="_blank"
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-2 bg-transparent hover:bg-white hover:text-[#1a1a1a] border border-white/20 text-white font-bold px-5 py-3 text-xs tracking-widest uppercase transition-all"
            >
              <MessageCircle size={15} fill="currentColor" />
              <span>Connect on WhatsApp Support</span>
            </a>
          </div>
        </div>

        {/* Categories Quick Links */}
        <div className="md:col-span-3 space-y-5">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Hot Categories</h4>
          <ul className="space-y-3 text-xs uppercase tracking-wider">
            <li>
              <button onClick={() => onCategorySelect('all')} className="text-[#fdfdfb]/60 hover:text-white transition-colors cursor-pointer">
                All Smart Products
              </button>
            </li>
            <li>
              <button onClick={() => onCategorySelect('smartwatches')} className="text-[#fdfdfb]/60 hover:text-white transition-colors cursor-pointer">
                Smart Watches Series 8/9
              </button>
            </li>
            <li>
              <button onClick={() => onCategorySelect('earbuds')} className="text-[#fdfdfb]/60 hover:text-white transition-colors cursor-pointer">
                Wireless Buds & Earphones
              </button>
            </li>
            <li>
              <button onClick={() => onCategorySelect('grooming')} className="text-[#fdfdfb]/60 hover:text-white transition-colors cursor-pointer">
                Professional Hair Trimmers
              </button>
            </li>
            <li>
              <button onClick={() => onCategorySelect('kitchen-home')} className="text-[#fdfdfb]/60 hover:text-white transition-colors cursor-pointer">
                Smart Kitchen Gadgets
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter & Contact column */}
        <div className="md:col-span-4 space-y-8">
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Get Hot Deals Info</h4>
            <p className="text-xs text-[#fdfdfb]/60 leading-relaxed">
              Subscribe to get exclusive discount codes, flash sales notices, and new product announcements.
            </p>

            {subscribed ? (
              <p className="text-xs text-green-400 font-bold">🎉 Shukriya! You have successfully subscribed to our newsletter.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white/5 border border-white/10 text-xs rounded-none px-4 py-2.5 w-full text-white focus:outline-none focus:border-white/30 transition-colors"
                />
                <button
                  id="newsletter-subscribe-btn"
                  type="submit"
                  className="bg-white hover:bg-white/90 text-[#1a1a1a] font-bold text-xs px-5 uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            )}
          </div>

          <div className="space-y-3 pt-4 text-xs text-[#fdfdfb]/50 border-t border-white/5 font-mono">
            <div className="flex items-center gap-2.5">
              <Phone size={13} className="text-[#b89253]" />
              <span>+92 349 5979062 (09:00 AM - 11:00 PM)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={13} className="text-[#b89253]" />
              <span>royalsphire@gmail.com</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin size={13} className="text-[#b89253]" />
              <span>Sector I-9, Islamabad, Pakistan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer Copyright details */}
      <div className="border-t border-white/5 py-8 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#fdfdfb]/40 uppercase tracking-widest">
          <p>© 2026 Royal Sphire Pakistan. All Rights Reserved. Built with ❤️ for smart shoppers.</p>
          <div className="flex gap-6 font-bold">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Refunds</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
