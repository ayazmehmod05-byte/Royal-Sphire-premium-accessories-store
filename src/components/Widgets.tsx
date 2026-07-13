import React, { useState, useEffect } from 'react';
import { MessageSquare, Truck, RefreshCw, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

// 1. FREE DELIVERY COUNTDOWN TIMER (Widget 1)
export function FreeDeliveryCountdownTimer() {
  const [timeLeft, setTimeLeft] = useState('00 : 02 : 00 : 00');

  useEffect(() => {
    const duration = 2 * 60 * 60 * 1000; // 2 hours
    let endTime = Date.now() + duration;

    const tick = () => {
      const now = Date.now();
      let diff = endTime - now;
      if (diff <= 0) {
        endTime = Date.now() + duration;
        diff = duration;
      }
      const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`00 : ${String(hrs).padStart(2, '0')} : ${String(mins).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="countdown-box" className="font-sans text-center p-4 bg-white border-2 border-red-500 rounded-xl max-w-xs mx-auto my-4 shadow-sm">
      <h2 className="text-sm sm:text-base font-bold text-[#1a1a1a] flex items-center justify-center gap-1.5 m-0">
        🚚 Free Home Delivery
      </h2>
      <p className="text-[11px] text-gray-500 my-1 font-medium">Offer ends in:</p>
      <div id="countdown-timer" className="text-xl sm:text-2xl font-bold font-mono text-red-600 tracking-wider">
        {timeLeft}
      </div>
      <div className="text-[9px] mt-1.5 text-gray-400 flex justify-center gap-6 font-semibold uppercase tracking-widest">
        <span>Days</span>
        <span>Hrs</span>
        <span>Mins</span>
        <span>Secs</span>
      </div>
    </div>
  );
}

// 2. DYNAMIC ORDER TRACKER CODE (Widget 2)
export function DynamicOrderTracker() {
  const getFormattedDate = (daysAhead: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex justify-between items-center max-w-xl mx-auto my-6 font-sans px-2 relative">
      <div className="flex-1 text-center relative z-10">
        <div className="w-10 h-10 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center text-base mx-auto shadow">
          🛒
        </div>
        <div className="text-[10px] font-bold mt-1.5 uppercase tracking-wider text-gray-900">Ordered</div>
        <div className="text-xs text-gray-500 underline decoration-dotted mt-0.5">{getFormattedDate(0)}</div>
      </div>

      <div className="flex-1 text-center relative z-10">
        <div className="absolute top-5 left-[-50%] right-[-50%] h-[3px] bg-[#38b6ff] -z-10" />
        <div className="w-10 h-10 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center text-base mx-auto shadow">
          🚚
        </div>
        <div className="text-[10px] font-bold mt-1.5 uppercase tracking-wider text-gray-900">Dispatched</div>
        <div className="text-xs text-gray-500 underline decoration-dotted mt-0.5">
          {getFormattedDate(0)} - {getFormattedDate(1)}
        </div>
      </div>

      <div className="flex-1 text-center relative z-10">
        <div className="w-10 h-10 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center text-base mx-auto shadow">
          📍
        </div>
        <div className="text-[10px] font-bold mt-1.5 uppercase tracking-wider text-gray-900">Delivered</div>
        <div className="text-xs text-gray-500 underline decoration-dotted mt-0.5">
          {getFormattedDate(3)} - {getFormattedDate(5)}
        </div>
      </div>
    </div>
  );
}

// 3. CUSTOMER EYE CODE (Widget 3)
export function CustomerEyeTracker() {
  const [viewers, setViewers] = useState(10);

  useEffect(() => {
    const updateCount = () => {
      setViewers(Math.floor(Math.random() * 13) + 6); // 6 to 18
    };
    updateCount();
    const interval = setInterval(updateCount, Math.floor(Math.random() * 4000) + 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#dddddd] rounded-xl shadow-xs max-w-[320px] mx-auto my-3 justify-center">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/709/709612.png" 
        alt="Eye" 
        className="w-5 h-5 animate-pulse"
        referrerPolicy="no-referrer"
      />
      <span id="watching-text" className="text-xs font-semibold text-[#1a1a1a]/85">
        {viewers} people are viewing this item right now
      </span>
    </div>
  );
}

// 4. FREE DELIVERY SCROLLING TEXT (Widget 4)
export function FreeDeliveryScrollingMarquee() {
  return (
    <div className="w-full overflow-hidden bg-[#2594c5] py-2 relative">
      <div className="animate-marquee whitespace-nowrap inline-block">
        {Array(8)
          .fill("🚚 FREE DELIVERY ALL OVER PAKISTAN")
          .map((text, idx) => (
            <span key={idx} className="text-white text-xs sm:text-sm font-bold tracking-wider uppercase mr-10">
              {text}
            </span>
          ))}
      </div>
    </div>
  );
}

// 5. SPECIALITIES (Widget 5)
export function SpecialitiesGrid() {
  return (
    <div className="bg-white py-10 border-t border-[#1a1a1a]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white text-center p-5 rounded-lg border border-gray-100 shadow-xs flex flex-col items-center">
          <img 
            src="https://img.icons8.com/ios-filled/100/000000/customer-support.png" 
            alt="Support 24/7" 
            className="w-10 h-10 mb-3"
            referrerPolicy="no-referrer"
          />
          <h3 className="text-xs sm:text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">SUPPORT 24/7</h3>
          <p className="text-xs text-gray-500 mt-1">Contact us on WhatsApp 24/7</p>
        </div>

        <div className="bg-white text-center p-5 rounded-lg border border-gray-100 shadow-xs flex flex-col items-center">
          <img 
            src="https://img.icons8.com/ios-filled/100/000000/delivery.png" 
            alt="Fast Delivery" 
            className="w-10 h-10 mb-3"
            referrerPolicy="no-referrer"
          />
          <h3 className="text-xs sm:text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">FAST DELIVERY</h3>
          <p className="text-xs text-gray-500 mt-1">Fastest Delivery Service</p>
        </div>

        <div className="bg-white text-center p-5 rounded-lg border border-gray-100 shadow-xs flex flex-col items-center">
          <img 
            src="https://img.icons8.com/ios-filled/100/000000/replace.png" 
            alt="Easy Exchange" 
            className="w-10 h-10 mb-3"
            referrerPolicy="no-referrer"
          />
          <h3 className="text-xs sm:text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">EASY EXCHANGE</h3>
          <p className="text-xs text-gray-500 mt-1">Read our terms and conditions</p>
        </div>

        <div className="bg-white text-center p-5 rounded-lg border border-gray-100 shadow-xs flex flex-col items-center">
          <img 
            src="https://img.icons8.com/ios-filled/100/000000/money.png" 
            alt="COD Available" 
            className="w-10 h-10 mb-3"
            referrerPolicy="no-referrer"
          />
          <h3 className="text-xs sm:text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">COD AVAILABLE</h3>
          <p className="text-xs text-gray-500 mt-1">Cash on delivery option available</p>
        </div>
      </div>
    </div>
  );
}

// 6. IMAGE GALLERY / LOGO GALLERY (Widget 6)
export function DeliveryPartnersGallery() {
  const partners = [
    { name: 'TCS Express', desc: 'Premium logistics partner' },
    { name: 'Leopard Courier', desc: 'Secure cash collection' },
    { name: 'PostEx Pakistan', desc: 'Zero-delay dynamic routing' },
    { name: 'M&P Logistics', desc: 'Next-day priority delivery' }
  ];

  return (
    <div className="py-8 bg-[#fdfdfb]">
      <p className="text-center text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 mb-4">Our Trusted Logistics Partners</p>
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-6 sm:gap-12 px-4">
        {partners.map((partner, index) => (
          <div key={index} className="flex flex-col items-center justify-center border border-black/10 bg-white p-3.5 min-w-[150px] shadow-xs hover:border-[#1a1a1a]/30 transition-colors">
            <span className="font-serif italic font-bold text-sm text-[#1a1a1a]">{partner.name}</span>
            <span className="text-[9px] text-gray-400 font-mono mt-0.5 uppercase tracking-wide">{partner.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 7. HAPPY CUSTOMERS BAR (Widget 7)
export function HappyCustomersBar() {
  return (
    <div className="flex items-center justify-center gap-3 py-3 border-y border-gray-150 bg-white text-xs font-semibold text-[#1a1a1a] font-sans">
      <div className="flex items-center -space-x-2">
        <img src="https://i.pravatar.cc/100?img=1" alt="Customer 1" className="w-6.5 h-6.5 rounded-full border-2 border-white object-cover shadow-sm" referrerPolicy="no-referrer" />
        <img src="https://i.pravatar.cc/100?img=2" alt="Customer 2" className="w-6.5 h-6.5 rounded-full border-2 border-white object-cover shadow-sm" referrerPolicy="no-referrer" />
        <img src="https://i.pravatar.cc/100?img=3" alt="Customer 3" className="w-6.5 h-6.5 rounded-full border-2 border-white object-cover shadow-sm" referrerPolicy="no-referrer" />
      </div>
      <span className="tracking-wide">10,000+ Happy Customers Across Pakistan</span>
    </div>
  );
}

// 8. WEARUM COUNTDOWN (Widget 8)
export function WearumCountdown() {
  const [timeLeft, setTimeLeft] = useState('24h 00m 00s');

  useEffect(() => {
    const STORAGE_KEY = 'wearum_24h_timer_end_rsp';
    const DURATION = 24 * 60 * 60 * 1000;

    const getEndTime = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      const now = Date.now();
      if (saved && Number(saved) > now) return Number(saved);
      const newEnd = now + DURATION;
      localStorage.setItem(STORAGE_KEY, String(newEnd));
      return newEnd;
    };

    let endTime = getEndTime();

    const tick = () => {
      const now = Date.now();
      let remaining = endTime - now;
      if (remaining <= 0) {
        endTime = Date.now() + DURATION;
        localStorage.setItem(STORAGE_KEY, String(endTime));
        remaining = DURATION;
      }

      const total = Math.max(0, Math.floor(remaining / 1000));
      const h = Math.floor(total / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      setTimeLeft(`${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white py-3 border-y border-gray-150 flex items-center justify-center gap-3 text-xs sm:text-sm font-bold">
      <span className="text-red-600 animate-pulse font-bold">⏰ Hurry! 50% OFF — Ends In</span>
      <div id="wearum-countdown-display" className="bg-black text-white px-3 py-1.5 rounded-full font-mono text-xs font-bold tracking-widest">
        {timeLeft}
      </div>
    </div>
  );
}

// 9. WEARUM LIVE VIEWS (Widget 9)
export function WearumLiveViews() {
  const [views, setViews] = useState(32);

  useEffect(() => {
    const updateViews = () => {
      setViews(Math.floor(Math.random() * (45 - 18 + 1)) + 18); // 18 to 45
    };
    updateViews();
    const interval = setInterval(updateViews, 4000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 py-2 border-y border-gray-150 bg-white font-sans font-bold text-xs text-[#1a1a1a]">
      <span className="text-red-600 animate-bounce text-sm">👁️</span>
      <span>
        <span id="liveViews" className="font-mono text-red-600 text-sm font-bold mr-1">{views}</span> 
        people are viewing this item
      </span>
    </div>
  );
}

// 10. URGENCY BANNER (Widget 10)
export function UrgencyBanner() {
  const [timeLeft, setTimeLeft] = useState('2d 00h 00m 00s');

  useEffect(() => {
    const DURATION = 2 * 24 * 60 * 60 * 1000; // 2 days
    const end = Date.now() + DURATION;

    const tick = () => {
      const now = Date.now();
      let diff = end - now;
      if (diff <= 0) diff = 0;
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${d}d ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 py-3 px-5 bg-gradient-to-r from-gray-50 to-white border border-black/10 rounded-xl max-w-4xl mx-auto my-6 relative overflow-hidden text-xs sm:text-sm font-sans">
      <div className="absolute top-0 left-0 w-full h-[2.5px] bg-red-600" style={{ animation: 'slide 3s linear infinite' }} />
      <div className="flex items-center gap-2">
        <span>⚡</span>
        <span className="font-semibold text-gray-700">Hurry — special offer ends in</span>
        <span id="countdown-timer" className="font-bold text-red-700 font-mono tracking-wide">{timeLeft}</span>
      </div>
      <div className="bg-red-50 text-red-700 font-bold text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider">
        Only a few left in stock!
      </div>
    </div>
  );
}

// 11. SHINE TITLE (Widget 11)
export function ShineTitle() {
  return (
    <div className="text-center py-6">
      <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-widest inline-block relative font-sans">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a1a1a] via-[#b89253] to-[#1a1a1a] bg-[length:200%_auto] font-black animate-pulse">
          Let Our Customers Speak For Us!
        </span>
      </h3>
    </div>
  );
}

// 12. HURRY STOCK COUNTDOWN (Widget 12)
export function HurryStockCountdown() {
  const [count, setCount] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev > 4 ? prev - 1 : 29)); // auto-restart/simulate depletion
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-2 bg-transparent font-sans">
      <h3 className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wider">
        🚨 Hurry up! Only <span id="itemCount" className="text-base sm:text-lg font-black font-mono inline-block text-red-600 animate-bounce">{count}</span> items left!
      </h3>
    </div>
  );
}

// 13. RANDOM REVIEWS CAROUSEL (Widget 13)
export function RandomReviewsCarousel() {
  const reviews = [
    { name: "Sufyan Ali", review: "I really like the product!", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg7w3Dpu5v13hKKzlSWqjWjBUheEPXmFQl6w&s" },
    { name: "Mubashir", review: "The quality was 10/10.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvUDXAYdm6YZk_Pecu_wSfGpyH9Fjz-JsWgfI2Hm8KXlCFSDi509P7kiBcfnTqir5_jv4&usqp=CAU" },
    { name: "Faisal", review: "This is exactly what I was looking for.", image: "https://images.unsplash.com/profile-1675810780829-fcfb69d41b8cimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128" },
    { name: "Chaudhary", review: "Great value for money, highly recommend!", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQRWVHV4umgdf7ekk8oQmINm8-jI8xGItbaxPnJoISAJMdAiDOnNWzbU0aKAlGL5VFA7A&usqp=CAU" },
    { name: "Saim", review: "Will definitely buy again.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3kprXSmAqpSeDBVP9vmHZpvCbB_WNcxn8Eg&s" },
    { name: "Bilal", review: "Exceeded my expectations!", image: "https://t4.ftcdn.net/jpg/08/53/07/37/360_F_853073742_s0I2xKQU9I6aK3YUdQDMt9HL6rAuQLsQ.jpg" },
    { name: "Laraib", review: "The customer service was amazing!", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUseLtpH3FvRCKw2rw-7devfp98GNjOrwTDh4DR9ujf6ENRE1UdVvBJPUnPWh2N5zwf6A&usqp=CAU" },
    { name: "Rizwan", review: "Fantastic product, would buy again.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyvHZ24jwN_PsKxxglDKDPUcT3S0NpJ9gP0BqJuWDEMIUSy05Sj4_xLhNhlhp4FoWP6yw&usqp=CAU" },
    { name: "Noor", review: "Quality is top-notch, highly recommend.", image: "https://i.pinimg.com/736x/1a/88/1c/1a881cdc93e267ba871d3e523707e893.jpg" },
    { name: "Malik", review: "Perfect fit and so comfortable!", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_zZz0-J4LyvLP6592A5QAc1Z4MEfdi16j4klROD84bLdQZuZBt09PiSQsh-sei_dohFM&usqp=CAU" }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const current = reviews[index];

  return (
    <div className="max-w-md mx-auto my-6 p-4 border border-black/10 bg-white shadow-xs rounded-xl flex items-center gap-4 transition-all duration-500 font-sans">
      <img src={current.image} alt={current.name} className="w-12 h-12 rounded-full object-cover border border-black/10" referrerPolicy="no-referrer" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#b89253] text-xs sm:text-sm">{current.name}</span>
          <span className="text-[10px] text-amber-500 font-bold">★★★★★</span>
        </div>
        <p className="text-xs italic text-[#1a1a1a]/80 mt-1">"{current.review}"</p>
      </div>
    </div>
  );
}

// 14. TRUSTED PAKISTAN REVIEWS MARQUEE (Widget 14)
export function TrustedPakistanReviewsMarquee() {
  const items = [
    { name: "Ayesha", city: "Lahore", text: "Excellent quality, packed well and delivered fast.", stars: 5 },
    { name: "Ahmed", city: "Karachi", text: "Original item and smooth checkout. Highly trusted store.", stars: 5 },
    { name: "Fatima", city: "Islamabad", text: "Good price and next-day delivery. Recommended.", stars: 5 },
    { name: "Hassan", city: "Rawalpindi", text: "Product exactly as described. Great service overall.", stars: 4 },
    { name: "Mariam", city: "Lahore", text: "Customer support replied quickly and solved my issue.", stars: 5 },
    { name: "Saad", city: "Faisalabad", text: "Fast delivery and clean packaging. Will order again.", stars: 5 },
    { name: "Noor", city: "Multan", text: "High quality item, feels premium. Great experience.", stars: 5 },
    { name: "Khalid", city: "Peshawar", text: "Good value for money and delivery was on time.", stars: 4 },
    { name: "Sara", city: "Sialkot", text: "Easy ordering, secure payment and reliable delivery.", stars: 5 },
    { name: "Yousaf", city: "Karachi", text: "Everything was perfect. I will purchase again.", stars: 5 }
  ];

  return (
    <section className="w-full bg-white py-12 border-t border-b border-[#eef2f7]" aria-label="Customer reviews">
      <div className="max-w-7xl mx-auto px-4 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-sans tracking-tight">Trusted by customers across Pakistan</h3>
          <p className="text-xs text-gray-500 mt-1">Fast dispatch • Secure checkout • Easy returns</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="text-[10px] sm:text-xs bg-gray-50 border border-gray-150 rounded-full px-3 py-1 font-semibold text-gray-600">Verified Reviews</span>
          <span className="text-[10px] sm:text-xs bg-gray-50 border border-gray-150 rounded-full px-3 py-1 font-semibold text-gray-600">All Pakistan Delivery</span>
        </div>
      </div>

      <div className="w-full overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap inline-block">
          {items.map((rev, idx) => (
            <article key={`c1-${idx}`} className="inline-block w-[280px] sm:w-[320px] bg-white border border-gray-200 p-5 rounded-2xl shadow-xs mx-3 whitespace-normal align-top font-sans">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <span className="w-10 h-10 rounded-full bg-gray-900 text-white font-bold text-sm flex items-center justify-center">
                    {rev.name.slice(0, 1).toUpperCase()}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-950">{rev.name}</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">{rev.city}, Pakistan</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-amber-500 text-xs">
                    {'★'.repeat(rev.stars)}{'☆'.repeat(5 - rev.stars)}
                  </div>
                  <div className="text-[9px] text-green-600 font-semibold block mt-1">
                    <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full mr-1" />
                    Verified Purchase
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed italic">“{rev.text}”</p>
            </article>
          ))}

          {/* Duplicated loop for seamless infinite scroll */}
          {items.map((rev, idx) => (
            <article key={`c2-${idx}`} className="inline-block w-[280px] sm:w-[320px] bg-white border border-gray-200 p-5 rounded-2xl shadow-xs mx-3 whitespace-normal align-top font-sans" aria-hidden="true">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <span className="w-10 h-10 rounded-full bg-gray-900 text-white font-bold text-sm flex items-center justify-center">
                    {rev.name.slice(0, 1).toUpperCase()}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-950">{rev.name}</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">{rev.city}, Pakistan</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-amber-500 text-xs">
                    {'★'.repeat(rev.stars)}{'☆'.repeat(5 - rev.stars)}
                  </div>
                  <div className="text-[9px] text-green-600 font-semibold block mt-1">
                    <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full mr-1" />
                    Verified Purchase
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed italic">“{rev.text}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// 15. SECURE SHOP BADGE
export function SecureShopBadge() {
  return (
    <div className="bg-[#f5f5f0] border border-[#1a1a1a]/10 p-3 flex flex-col items-center justify-center text-center font-sans">
      <div className="flex items-center gap-1.5 text-green-700 font-bold uppercase tracking-wider text-[10px]">
        <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-ping" />
        🔒 100% Secure Checkout Guaranteed
      </div>
      <p className="text-[10px] text-gray-500 mt-1 font-mono uppercase tracking-widest">
        Cash On Delivery • 7 Days Return • Verified Quality
      </p>
    </div>
  );
}

// 16. CART ABANDONMENT UPLIFT
export function CartAbandonmentUplift() {
  const [timeLeft, setTimeLeft] = useState('10:00');

  useEffect(() => {
    let seconds = 600;
    const interval = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        setTimeLeft(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#b89253]/10 border border-[#b89253]/20 p-3 text-center font-sans">
      <p className="text-xs text-[#8c672b] font-medium leading-normal">
        🔥 <strong>High Demand!</strong> Your items are reserved for{' '}
        <span className="font-mono font-bold text-red-600 bg-white px-1.5 py-0.5 border border-red-500/10 rounded">
          {timeLeft}
        </span>
      </p>
    </div>
  );
}

// 17. INSTANT DISCOUNT CHECKOUT URGENCY
export function InstantDiscountCheckoutUrgency() {
  const [timeLeft, setTimeLeft] = useState('08:45');

  useEffect(() => {
    let seconds = 525;
    const interval = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        setTimeLeft(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-50 border border-red-200 p-4 text-center font-sans mb-4">
      <div className="flex items-center justify-center gap-2 text-red-700 font-bold text-xs uppercase tracking-wider">
        <span className="animate-pulse">⚡</span>
        Special COD Discount Activated!
      </div>
      <p className="text-[11px] text-gray-600 mt-1">
        Complete your order in the next <strong className="font-mono text-red-600 text-xs font-bold">{timeLeft}</strong> to unlock <strong>FREE DELIVERY</strong> today!
      </p>
    </div>
  );
}

// 18. LIVE ORDER ACTIVITY TICKER
export function LiveOrderActivityTicker() {
  const names = ['Ayesha', 'Muhammad', 'Zainab', 'Fatima', 'Usman', 'Bilal', 'Saba', 'Hamza', 'Anum', 'Raza'];
  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Multan', 'Faisalabad', 'Gujranwala', 'Quetta', 'Sialkot'];
  const items = ['T800 Ultra Smartwatch', 'Air31 Transparent Earbuds', 'M10 Pro TWS Earbuds', 'Vintage T9 Buddha Trimmer', 'VGR V-030 Trimmer', '6-Blade Portable Juicer'];

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({ name: '', city: '', item: '' });

  useEffect(() => {
    const trigger = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const item = items[Math.floor(Math.random() * items.length)];
      setCurrent({ name, city, item });
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);
    };

    const initialDelay = setTimeout(trigger, 3000);

    const interval = setInterval(trigger, 12000);
    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-white border border-[#1a1a1a]/15 shadow-xl p-3 max-w-[280px] font-sans transition-all duration-300 flex items-center gap-3 animate-slide rounded-none">
      <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping flex-shrink-0" />
      <div className="text-[11px] text-gray-800 leading-normal">
        <strong>{current.name}</strong> from {current.city} just ordered a <span className="text-[#b89253] font-semibold">{current.item}</span>!
      </div>
    </div>
  );
}

// 19. REVIEW CAROUSEL WIDGET
export function ReviewCarouselWidget() {
  return <TrustedPakistanReviewsMarquee />;
}

// 20. SALE IS LIVE SCROLLING MARQUEE
export function SaleIsLiveMarquee() {
  return (
    <div className="w-full overflow-hidden bg-black py-3.5 border-t border-b border-white/5 relative shadow-inner">
      <div className="animate-marquee whitespace-nowrap inline-block">
        {Array(10)
          .fill(null)
          .map((_, idx) => (
            <span key={idx} className="text-white text-xs sm:text-[13px] font-black tracking-[0.15em] uppercase mr-12 inline-flex items-center gap-3.5 select-none font-sans">
              <span className="text-[#ff3838]">⚡ SALE IS LIVE!</span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-black text-[10px] font-black font-sans leading-none">%</span>
              <span className="text-white/90">UP TO 50% SPECIAL COD DISCOUNT</span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-black text-[10px] font-black font-sans leading-none">%</span>
              <span className="text-amber-400">FREE SHIPPING ALL OVER PAKISTAN</span>
              <span className="text-white/40">★</span>
            </span>
          ))}
      </div>
    </div>
  );
}
