import React, { useState } from 'react';
import { X, ShieldCheck, Truck, ShoppingBag, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem, OrderDetails } from '../types';
import { POPULAR_CITIES } from '../data/products';
import { InstantDiscountCheckoutUrgency } from './Widgets';

interface QuickCheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSubmit: (orderDetails: OrderDetails) => void;
  directCheckoutItem: CartItem | null;
}

export default function QuickCheckoutForm({
  isOpen,
  onClose,
  cartItems,
  onOrderSubmit,
  directCheckoutItem
}: QuickCheckoutFormProps) {
  if (!isOpen) return null;

  const itemsToCheckout = directCheckoutItem ? [directCheckoutItem] : cartItems;
  const subtotal = itemsToCheckout.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= 2499;
  const shippingFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 150;
  const total = subtotal + shippingFee;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const cleanPhone = phone.replace(/[-\s]/g, '');
      if (!/^(03\d{9}|\+923\d{9})$/.test(cleanPhone)) {
        newErrors.phone = 'Please enter a valid Pakistani phone number (e.g., 03001234567)';
      }
    }
    if (!city) newErrors.city = 'Please select your city';
    if (!address.trim()) newErrors.address = 'Complete shipping address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onOrderSubmit({
        fullName,
        phone,
        city,
        address,
        note
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-[#fdfdfb] overflow-hidden border border-[#1a1a1a]/10 shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[90vh] rounded-none"
        >
          {/* Close button */}
          <button
            id="close-checkout-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-[#fdfdfb] hover:bg-[#f5f5f0] border border-[#1a1a1a]/10 text-[#1a1a1a] transition-all cursor-pointer"
          >
            <X size={16} />
          </button>

          {/* Left Column: Checkout Fields Form */}
          <div className="md:col-span-7 p-6 sm:p-8 overflow-y-auto max-h-[90vh] border-b md:border-b-0 md:border-r border-[#1a1a1a]/10">
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <Truck className="text-[#1a1a1a]" size={20} strokeWidth={1.5} />
                <h2 className="text-base font-serif font-medium text-[#1a1a1a] uppercase tracking-wider">Express Checkout (COD)</h2>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Please enter your accurate delivery details. Pay cash to the rider upon receiving your package.
              </p>
            </div>

            {/* 11. INSTANT DISCOUNT CHECKOUT URGENCY */}
            <InstantDiscountCheckoutUrgency />

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="checkout-fullname-input"
                  type="text"
                  placeholder="e.g. Muhammad Ali"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full bg-[#f5f5f0]/50 border text-xs text-gray-900 rounded-none px-4 py-3 focus:outline-none focus:ring-1 transition-all ${
                    errors.fullName ? 'border-red-400 focus:ring-red-300' : 'border-black/15 focus:ring-black focus:border-black'
                  }`}
                />
                {errors.fullName && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wide">{errors.fullName}</p>}
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest block">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="checkout-phone-input"
                  type="text"
                  placeholder="e.g. 03001234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full bg-[#f5f5f0]/50 border text-xs text-gray-900 rounded-none px-4 py-3 focus:outline-none focus:ring-1 transition-all ${
                    errors.phone ? 'border-red-400 focus:ring-red-300' : 'border-black/15 focus:ring-black focus:border-black'
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wide">{errors.phone}</p>}
                <p className="text-[10px] text-gray-400 leading-relaxed">Our team will call or WhatsApp you to verify your order before dispatch.</p>
              </div>

              {/* City Selection */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest block">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  id="checkout-city-select"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`w-full bg-[#f5f5f0]/50 border text-xs text-gray-900 rounded-none px-4 py-3 focus:outline-none focus:ring-1 transition-all cursor-pointer ${
                    errors.city ? 'border-red-400 focus:ring-red-300' : 'border-black/15 focus:ring-black focus:border-black'
                  }`}
                >
                  <option value="">-- Select Your City --</option>
                  {POPULAR_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Other">Other City</option>
                </select>
                {errors.city && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wide">{errors.city}</p>}
              </div>

              {/* Complete Address */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest block">
                  Complete Shipping Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="checkout-address-input"
                  rows={3}
                  placeholder="House No, Street Name, Sector, Near Landmark..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full bg-[#f5f5f0]/50 border text-xs text-gray-900 rounded-none px-4 py-3 focus:outline-none focus:ring-1 transition-all ${
                    errors.address ? 'border-red-400 focus:ring-red-300' : 'border-black/15 focus:ring-black focus:border-black'
                  }`}
                />
                {errors.address && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wide">{errors.address}</p>}
              </div>

              {/* Order Note */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-950 uppercase tracking-widest block">
                  Special Delivery Instructions (Optional)
                </label>
                <input
                  id="checkout-note-input"
                  type="text"
                  placeholder="e.g., Deliver after 2 PM, Ring bell twice..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-[#f5f5f0]/50 border border-black/15 text-xs text-gray-900 rounded-none px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>

              {/* Submit COD order button */}
              <button
                id="submit-cod-order-btn"
                type="submit"
                className="w-full bg-[#1a1a1a] hover:bg-black text-white font-bold py-4 rounded-none transition-all cursor-pointer flex items-center justify-center gap-2 mt-6 active:scale-98 text-xs tracking-widest uppercase"
              >
                <ShieldCheck size={14} />
                <span>Place Cash on Delivery Order</span>
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary Detail */}
          <div className="md:col-span-5 p-6 sm:p-8 bg-[#f5f5f0]/40 overflow-y-auto max-h-[90vh] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#1a1a1a]/10">
                <ShoppingBag className="text-[#1a1a1a]" size={16} strokeWidth={1.5} />
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Order Summary</h3>
              </div>

              {/* Item details list */}
              <div className="space-y-4 max-h-[30vh] overflow-y-auto pr-1">
                {itemsToCheckout.map((item, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <div className="w-14 h-14 bg-white border border-black/10 overflow-hidden flex-shrink-0 relative">
                      <div className="absolute inset-1 border border-black/5 pointer-events-none"></div>
                      <img
                        src={item.product.image}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-1.5 -right-1.5 bg-[#1a1a1a] text-white font-mono font-bold text-[9px] w-5 h-5 flex items-center justify-center border border-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 font-sans">
                      <h4 className="text-xs font-serif font-medium text-gray-900 truncate">
                        {item.product.title}
                      </h4>
                      <p className="text-[9px] uppercase tracking-wider font-mono text-gray-400 mt-0.5">Variant: {item.selectedVariant}</p>
                    </div>
                    <span className="text-xs sm:text-sm font-serif font-semibold text-[#1a1a1a] flex-shrink-0">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Billing totals */}
              <div className="border-t border-[#1a1a1a]/10 mt-6 pt-4 space-y-2.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif font-semibold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges (COD)</span>
                  <span className={shippingFee === 0 ? 'text-green-700 font-bold uppercase tracking-wider text-[9px]' : 'font-semibold text-gray-900'}>
                    {shippingFee === 0 ? 'FREE DELIVERY' : `Rs. ${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#1a1a1a]/10 pt-3 text-sm">
                  <span className="font-bold text-gray-900 uppercase tracking-wider text-xs">Total Payable Amount</span>
                  <span className="font-serif font-semibold text-[#1a1a1a] text-lg sm:text-xl">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Safety trust badge indicators */}
            <div className="mt-8 bg-white border border-black/10 p-4 rounded-none space-y-3">
              <div className="flex gap-2.5 text-xs text-gray-600">
                <ShieldCheck className="text-[#b89253] flex-shrink-0 mt-0.5" size={14} />
                <div>
                  <strong className="text-gray-900 font-bold block uppercase tracking-wider text-[9px] font-mono mb-0.5">No Advance Payment Needed</strong>
                  <span className="text-[11px] leading-relaxed block text-gray-500">You only pay when the rider hands over your parcel. Absolutely safe and stress-free.</span>
                </div>
              </div>
              <div className="flex gap-2.5 text-xs text-gray-600 border-t border-black/5 pt-2.5">
                <Truck className="text-[#b89253] flex-shrink-0 mt-0.5" size={14} />
                <div>
                  <strong className="text-gray-900 font-bold block uppercase tracking-wider text-[9px] font-mono mb-0.5">Quick Dispatch Notification</strong>
                  <span className="text-[11px] leading-relaxed block text-gray-500">You will receive an SMS and WhatsApp tracker code as soon as your product ships.</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
