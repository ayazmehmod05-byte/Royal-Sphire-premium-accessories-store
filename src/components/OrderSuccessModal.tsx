import React from 'react';
import { CheckCircle2, ShoppingBag, ArrowRight, Printer, MessageSquare, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem, OrderDetails } from '../types';
import { DynamicOrderTracker } from './Widgets';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: OrderDetails | null;
  cartItems: CartItem[];
  directCheckoutItem: CartItem | null;
  trackingId: string;
}

export default function OrderSuccessModal({
  isOpen,
  onClose,
  orderDetails,
  cartItems,
  directCheckoutItem,
  trackingId
}: OrderSuccessModalProps) {
  if (!isOpen || !orderDetails) return null;

  const itemsPurchased = directCheckoutItem ? [directCheckoutItem] : cartItems;
  const subtotal = itemsPurchased.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= 2499;
  const shippingFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 150;
  const total = subtotal + shippingFee;

  // Generate delivery date window (e.g. 2 to 4 days from now)
  const today = new Date();
  const startDelivery = new Date(today);
  startDelivery.setDate(today.getDate() + 2);
  const endDelivery = new Date(today);
  endDelivery.setDate(today.getDate() + 4);

  const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const deliveryRangeStr = `${startDelivery.toLocaleDateString('en-US', dateOptions)} - ${endDelivery.toLocaleDateString('en-US', dateOptions)}`;

  // Direct WhatsApp message formatting for user to expedite order verification
  const itemsText = itemsPurchased.map(item => `- ${item.product.title} (Color: ${item.selectedVariant}) x${item.quantity}`).join('%0A');
  const whatsappMessage = `Assalam-o-Alaikum! Royal Sphire Team, I have just placed an order.%0A%0A*Order Details:*%0A- Tracking ID: *${trackingId}*%0A- Name: ${orderDetails.fullName}%0A- Phone: ${orderDetails.phone}%0A- City: ${orderDetails.city}%0A- Address: ${orderDetails.address}%0A%0A*Items:*%0A${itemsText}%0A%0A*Total Bill:* Rs. ${total.toLocaleString()}%0A%0APlease verify and dispatch my order. Shukriya!`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-[#fdfdfb] border border-[#1a1a1a]/10 w-full max-w-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col rounded-none"
      >
        <div className="overflow-y-auto p-6 sm:p-8 flex-1 space-y-6">
          {/* Confetti celebration icon */}
          <div className="text-center space-y-2.5">
            <div className="inline-flex items-center justify-center w-12 h-12 border border-black/10 bg-[#f5f5f0]/50 text-green-700 mb-2">
              <CheckCircle2 size={24} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#1a1a1a] leading-tight">
              Shukriya! Order Confirmed 🎉
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              Your Cash on Delivery order has been successfully logged with Order Tracking ID:{' '}
              <strong className="text-[#b89253] font-mono font-bold">{trackingId}</strong>
            </p>
          </div>

          {/* Dynamic Order Tracker */}
          <DynamicOrderTracker />

          {/* Detailed Receipt Invoice breakdown */}
          <div className="bg-[#fdfdfb] border border-[#1a1a1a]/15 p-5 sm:p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-black/10 pb-3">
              <h3 className="font-bold text-xs text-gray-900 uppercase tracking-widest font-mono">Recipient Details</h3>
              <span className="text-[10px] text-gray-400 font-mono font-bold">{today.toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono block mb-0.5">Customer Name</span>
                <span className="font-serif font-semibold text-gray-950">{orderDetails.fullName}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono block mb-0.5">Phone Number</span>
                <span className="font-serif font-semibold text-gray-950">{orderDetails.phone}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono block mb-0.5">Delivery Address</span>
                <span className="font-serif font-semibold text-gray-950">{orderDetails.address}, {orderDetails.city}</span>
              </div>
            </div>

            <div className="border-t border-[#1a1a1a]/10 pt-4">
              <h4 className="font-bold text-[10px] text-gray-400 uppercase tracking-widest mb-2.5 font-mono">Items Ordered</h4>
              <div className="divide-y divide-black/5 max-h-[160px] overflow-y-auto pr-1 text-xs">
                {itemsPurchased.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2 items-center">
                    <span className="text-gray-700 font-sans">
                      {item.product.title} <strong className="font-serif italic font-normal text-gray-500">({item.selectedVariant})</strong> x{item.quantity}
                    </span>
                    <span className="font-serif font-semibold text-gray-950 whitespace-nowrap">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#1a1a1a]/10 pt-4 space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-serif font-semibold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping (COD)</span>
                <span className="font-semibold text-green-700">{shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}</span>
              </div>
              <div className="flex justify-between border-t border-[#1a1a1a]/10 pt-2.5 text-sm">
                <span className="font-bold uppercase tracking-wider text-[#1a1a1a] text-xs">Total Payable Amount</span>
                <span className="font-serif font-semibold text-[#1a1a1a] text-base">Rs. {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Expedite WhatsApp Call to Action */}
          <div className="space-y-3 pt-2 text-center">
            <a
              id="confirm-whatsapp-btn"
              href={`https://wa.me/923495979062?text=${whatsappMessage}`}
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-full bg-green-700 hover:bg-green-800 active:scale-98 text-white font-bold py-4 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs tracking-widest uppercase"
            >
              <MessageSquare size={14} />
              <span>Confirm Order on WhatsApp Now</span>
            </a>
            <p className="text-[10px] text-gray-400 leading-relaxed max-w-sm mx-auto">
              Click the button to send details to our WhatsApp team for ultra-fast processing and zero confirmation delays.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-[#f5f5f0]/30 border-t border-[#1a1a1a]/10 px-6 py-4 flex gap-3">
          <button
            id="print-order-btn"
            onClick={() => window.print()}
            className="flex-1 bg-transparent hover:bg-black/5 border border-black/15 text-[#1a1a1a] font-bold py-3.5 text-xs tracking-widest uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer size={14} />
            <span>Print Receipt</span>
          </button>
          <button
            id="success-continue-shopping-btn"
            onClick={onClose}
            className="flex-1 bg-[#1a1a1a] hover:bg-black text-white font-bold py-3.5 text-xs tracking-widest uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingBag size={14} />
            <span>Continue Shopping</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
