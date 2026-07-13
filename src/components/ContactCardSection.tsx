import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageSquare, Send, CheckCircle2, User, MapPin, Phone, MessageCircle } from 'lucide-react';

interface ContactCardSectionProps {
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export default function ContactCardSection({ onShowToast }: ContactCardSectionProps) {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [inquiry, setInquiry] = useState('');

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phone.length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!inquiry.trim()) newErrors.inquiry = 'Inquiry or feedback message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      onShowToast('Please fix the errors in the form', 'info');
      return;
    }

    setIsSubmitting(true);

    // Simulate database write / message dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onShowToast('Your inquiry has been received! Our support agent will contact you shortly.', 'success');
      
      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setInquiry('');
    }, 1200);
  };

  return (
    <section id="contact-inquiry-section" className="w-full bg-[#f9fafb] py-16 sm:py-20 border-b border-[#eef2f7] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern section headers consistent with rest of app */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#1a1a1a]/50 font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.25em] block mb-3">
            Inquiries & Feedback
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-light text-[#1a1a1a] tracking-tight">
            Connect With <span className="italic font-normal">Our Specialists</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#1a1a1a]/20 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Column 1: Direct Support Channels Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#1a1a1a] text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-white/5">
            
            {/* Ambient visual background highlights for tech-vibe */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-[0.2em] uppercase block mb-2">
                  Direct Communications
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-light text-white tracking-wide">
                  Instant Support
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-3 leading-relaxed">
                  Have an urgent issue or want to buy custom hardware? Use our direct channels for rapid, direct consultation with our Pakistani support desk.
                </p>
              </div>

              {/* Functional Contact Buttons */}
              <div className="space-y-4 pt-4">
                
                {/* 1. WhatsApp Button */}
                <a
                  id="direct-whatsapp-contact-btn"
                  href="https://wa.me/923495979062?text=Hi%20Royal%20Sphire%21%20I%27d%20like%20to%20inquire%20about%20your%20premium%20tech%20gadgets."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#25D366] hover:bg-[#20ba56] text-white font-sans font-bold text-sm px-6 py-4 rounded-xl shadow-lg transition-all active:scale-98 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center text-white shrink-0">
                    <MessageSquare size={20} fill="currentColor" />
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <span className="text-[10px] text-white/70 block font-mono font-semibold uppercase tracking-wider">Message on WhatsApp</span>
                    <span className="text-sm font-bold tracking-wide truncate block">+92 349 5979062</span>
                  </div>
                </a>

                {/* 2. Email Button */}
                <a
                  id="direct-email-contact-btn"
                  href="mailto:ayazmehmod05@gmail.com?subject=Product%20Inquiry%20-%20Royal%20Sphire"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-sans font-bold text-sm px-6 py-4 rounded-xl shadow-lg transition-all active:scale-98 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-neutral-300 shrink-0 group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <span className="text-[10px] text-white/70 block font-mono font-semibold uppercase tracking-wider">Send an Email</span>
                    <span className="text-sm font-bold tracking-wide truncate block">ayazmehmod05@gmail.com</span>
                  </div>
                </a>

              </div>
            </div>

            {/* Quick stats / guarantees at the bottom */}
            <div className="relative z-10 grid grid-cols-2 gap-4 pt-8 border-t border-white/10 mt-8">
              <div>
                <span className="text-[10px] text-neutral-400 font-mono block uppercase">Response Guarantee</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400 mt-1 block">Under 15 Mins</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-mono block uppercase">Operational Hours</span>
                <span className="text-xs sm:text-sm font-bold text-white mt-1 block">24/7 Available</span>
              </div>
            </div>

          </div>

          {/* Column 2: Spacious Customer Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-150 shadow-lg relative flex flex-col justify-between">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="inquiry-form"
                  id="customer-inquiry-form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <h4 className="text-lg font-serif font-medium text-gray-950">Inquiry Desk</h4>
                    <p className="text-xs text-gray-500 mt-1">Please provide your details and message so we can route your request accurately.</p>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="inquiry-name" className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <User size={11} /> Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="inquiry-name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                        }}
                        placeholder="e.g. Muhammad Ali"
                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-200 focus:border-gray-400'} text-sm text-gray-950 rounded-xl focus:outline-none transition-all`}
                      />
                      {errors.name && <p className="text-[10px] font-semibold text-red-500">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="inquiry-email" className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail size={11} /> Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="inquiry-email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        placeholder="e.g. name@domain.com"
                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-200 focus:border-gray-400'} text-sm text-gray-950 rounded-xl focus:outline-none transition-all`}
                      />
                      {errors.email && <p className="text-[10px] font-semibold text-red-500">{errors.email}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="inquiry-phone" className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Phone size={11} /> Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="inquiry-phone"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                        }}
                        placeholder="e.g. +92 300 1234567"
                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.phone ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-200 focus:border-gray-400'} text-sm text-gray-950 rounded-xl focus:outline-none transition-all`}
                      />
                      {errors.phone && <p className="text-[10px] font-semibold text-red-500">{errors.phone}</p>}
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5">
                      <label htmlFor="inquiry-address" className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin size={11} /> Shipping/Contact Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="inquiry-address"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          if (errors.address) setErrors(prev => ({ ...prev, address: '' }));
                        }}
                        placeholder="e.g. Gulberg III, Lahore, Pakistan"
                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.address ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-200 focus:border-gray-400'} text-sm text-gray-950 rounded-xl focus:outline-none transition-all`}
                      />
                      {errors.address && <p className="text-[10px] font-semibold text-red-500">{errors.address}</p>}
                    </div>

                  </div>

                  {/* Inquiry / Feedback Textarea */}
                  <div className="space-y-1.5">
                    <label htmlFor="inquiry-message" className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                      <MessageCircle size={11} /> Inquiries or Feedback <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="inquiry-message"
                      value={inquiry}
                      onChange={(e) => {
                        setInquiry(e.target.value);
                        if (errors.inquiry) setErrors(prev => ({ ...prev, inquiry: '' }));
                      }}
                      placeholder="Please specify your product model inquiry, specific questions, or retail/wholesale feedback..."
                      rows={4}
                      className={`w-full px-4 py-3 bg-gray-50 border ${errors.inquiry ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-200 focus:border-gray-400'} text-sm text-gray-950 rounded-xl focus:outline-none transition-all resize-none`}
                    />
                    {errors.inquiry && <p className="text-[10px] font-semibold text-red-500">{errors.inquiry}</p>}
                  </div>

                  <button
                    id="submit-inquiry-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1a1a1a] hover:bg-black disabled:bg-gray-400 text-white font-sans font-bold text-xs uppercase tracking-widest py-4 transition-all flex items-center justify-center gap-2.5 rounded-xl cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                        Processing Inquiry...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Submit Inquiry Message
                      </>
                    )}
                  </button>

                </motion.form>
              ) : (
                <motion.div
                  key="success-form"
                  id="inquiry-success-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8 sm:p-12 space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 shadow-inner">
                    <CheckCircle2 size={36} strokeWidth={1.5} />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xl font-serif font-medium text-gray-950">Thank You!</h4>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
                      Your inquiry has been successfully transmitted to our Pakistani support staff. We will review your query and get back to you within 15 minutes!
                    </p>
                  </div>

                  <button
                    id="reset-inquiry-form-btn"
                    onClick={() => setIsSuccess(false)}
                    className="border border-gray-250 hover:bg-gray-50 text-[#1a1a1a] font-sans font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
