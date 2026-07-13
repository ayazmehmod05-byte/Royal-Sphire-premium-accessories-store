import React from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { CartAbandonmentUplift, SecureShopBadge } from './Widgets';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, variant: string, qty: number) => void;
  onRemoveItem: (id: string, variant: string) => void;
  onCheckoutClick: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutClick
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= 2499;
  const shippingFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 150;
  const total = subtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-screen max-w-md bg-[#fdfdfb] flex flex-col h-full shadow-2xl border-l border-[#1a1a1a]/15 rounded-none"
        >
          {/* Header */}
          <div className="px-5 py-5 border-b border-[#1a1a1a]/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="text-[#1a1a1a]" size={18} strokeWidth={1.5} />
              <h2 className="text-base font-serif font-medium text-[#1a1a1a]">Your Shopping Bag</h2>
              <span className="bg-[#f5f5f0] border border-black/5 text-[#1a1a1a]/60 text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-1.5 border border-black/10 text-gray-400 hover:text-black cursor-pointer transition-colors hover:bg-[#f5f5f0]"
            >
              <X size={16} />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8">
                <div className="w-12 h-12 border border-black/10 flex items-center justify-center text-[#1a1a1a] bg-[#f5f5f0]/50">
                  <ShoppingCart size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-medium text-[#1a1a1a]">Your bag is empty</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">Browse our collection and select premium items to order.</p>
                </div>
                <button
                  id="cart-continue-shopping-btn"
                  onClick={onClose}
                  className="bg-[#1a1a1a] hover:bg-black text-white font-bold text-xs tracking-widest uppercase px-6 py-3.5 transition-all cursor-pointer active:scale-98"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant}`}
                  className="flex gap-4 p-3 bg-[#f5f5f0]/20 border border-[#1a1a1a]/10 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 overflow-hidden bg-white flex-shrink-0 border border-black/10 relative">
                    <div className="absolute inset-1 border border-black/5 pointer-events-none"></div>
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%]"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-serif font-medium text-[#1a1a1a] line-clamp-1 pr-6">
                        {item.product.title}
                      </h4>
                      <span className="text-[9px] uppercase tracking-wider font-mono bg-white text-gray-500 px-2 py-0.5 border border-black/10 inline-block mt-1">
                        Variant: {item.selectedVariant}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-white border border-black/15 p-0.5 scale-90 -ml-1">
                        <button
                          id={`cart-qty-dec-${item.product.id}`}
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedVariant, item.quantity - 1)}
                          className="p-1 hover:bg-black/5 text-gray-500 cursor-pointer"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          id={`cart-qty-inc-${item.product.id}`}
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedVariant, item.quantity + 1)}
                          className="p-1 hover:bg-black/5 text-gray-500 cursor-pointer"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <span className="text-sm font-serif font-semibold text-[#1a1a1a]">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    id={`cart-item-remove-${item.product.id}`}
                    onClick={() => onRemoveItem(item.product.id, item.selectedVariant)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Billing Details */}
          {cartItems.length > 0 && (
            <div className="border-t border-[#1a1a1a]/10 px-5 py-6 bg-[#f5f5f0]/40 space-y-4">
              {/* Shipping progress indicator */}
              <div className="bg-[#fdfdfb] p-3 border border-black/10 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#f5f5f0] text-[#b89253] border border-black/10 flex items-center justify-center">
                  <Truck size={14} strokeWidth={1.5} />
                </div>
                <div className="flex-1 text-xs">
                  {isFreeDelivery ? (
                    <span className="text-green-700 font-bold uppercase tracking-wider text-[10px] block">🎉 Free Delivery Unlocked</span>
                  ) : (
                    <>
                      <span className="text-gray-700 block text-[10px]">
                        Add <strong className="font-bold font-serif text-[#1a1a1a]">Rs. {(2499 - subtotal).toLocaleString()}</strong> more for{' '}
                        <strong className="font-bold text-[#1a1a1a]">Free Shipping</strong>!
                      </span>
                      {/* progress bar */}
                      <div className="w-full bg-[#f5f5f0] h-[2px] mt-1 overflow-hidden">
                        <div
                          className="bg-[#1a1a1a] h-full transition-all duration-300"
                          style={{ width: `${Math.min((subtotal / 2499) * 100, 100)}%` }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Price summary table */}
              <div className="text-xs space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-serif font-semibold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping & Delivery (COD)</span>
                  <span className={shippingFee === 0 ? 'text-green-700 font-bold' : 'font-semibold text-gray-900'}>
                    {shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#1a1a1a]/10 pt-2.5 text-sm">
                  <span className="font-bold uppercase tracking-wider text-[#1a1a1a] text-xs">Estimated Total</span>
                  <span className="font-serif font-semibold text-[#1a1a1a] text-lg">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Cart Abandonment timer warning */}
              <CartAbandonmentUplift />

              {/* Checkout Trigger button */}
              <button
                id="cart-checkout-btn"
                onClick={onCheckoutClick}
                className="w-full bg-[#1a1a1a] hover:bg-black text-white font-bold py-4 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs tracking-widest uppercase active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>

              {/* Trust Badges */}
              <SecureShopBadge />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
