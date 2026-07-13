import React, { useState } from 'react';
import { X, Star, Plus, Minus, ShoppingCart, ShieldAlert, Truck, RefreshCw, BadgeHelp, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { MOCK_REVIEWS } from '../data/products';
import { 
  FreeDeliveryCountdownTimer, 
  WearumLiveViews, 
  HurryStockCountdown 
} from './Widgets';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variant: string) => void;
  onBuyNowDirect: (product: Product, quantity: number, variant: string) => void;
}

export default function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNowDirect
}: ProductDetailsModalProps) {
  if (!isOpen || !product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  const reviews = MOCK_REVIEWS[product.id] || [];

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

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
          className="relative w-full max-w-4xl bg-[#fdfdfb] overflow-hidden border border-[#1a1a1a]/10 shadow-2xl flex flex-col max-h-[90vh] rounded-none"
        >
          {/* Close button */}
          <button
            id="close-details-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-[#fdfdfb] hover:bg-[#f5f5f0] border border-[#1a1a1a]/10 text-[#1a1a1a] transition-all cursor-pointer"
          >
            <X size={16} />
          </button>

          <div className="overflow-y-auto p-6 md:p-8 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Product Gallery Section */}
              <div className="md:col-span-6 space-y-4">
                <div className="relative pt-[100%] overflow-hidden bg-[#f5f5f0]/50 border border-[#1a1a1a]/10">
                  <div className="absolute inset-3 border border-black/5 pointer-events-none z-10"></div>
                  <img
                    src={activeImage}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover grayscale-[5%] hover:grayscale-0 transition-all duration-300"
                  />
                  {product.discountPercentage && (
                    <span className="absolute top-4 left-4 bg-[#1a1a1a] text-white font-bold text-[9px] px-2 py-0.5 tracking-wider uppercase z-20">
                      -{product.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                {/* Thumbnail carousel */}
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      id={`thumbnail-btn-${i}`}
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-20 overflow-hidden flex-shrink-0 border cursor-pointer transition-all ${
                        activeImage === img ? 'border-[#1a1a1a] scale-95' : 'border-[#1a1a1a]/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details info Section */}
              <div className="md:col-span-6 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="inline-block border border-[#1a1a1a]/15 text-[#1a1a1a]/80 text-[10px] font-bold px-3 py-1 bg-[#fdfdfb]/50 tracking-[0.2em] uppercase mb-2.5">
                      {product.category.replace('-', ' ')}
                    </span>
                    <h2 id="modal-product-title" className="text-xl sm:text-2xl font-serif font-light text-[#1a1a1a] leading-tight">
                      {product.title}
                    </h2>
                  </div>

                  {/* Rating Stars Summary */}
                  <div className="flex items-center gap-2">
                    <div className="flex text-[#b89253]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#1a1a1a]/60">
                      {product.rating}
                    </span>
                    <span className="text-[10px] text-gray-400 border-l border-black/10 pl-2 font-mono uppercase tracking-wider">
                      {product.reviewsCount} Buyer Reviews
                    </span>
                  </div>

                  {/* 12. HURRY STOCK COUNTDOWN */}
                  <HurryStockCountdown />

                  {/* Pricing block */}
                  <div className="flex items-baseline gap-3 bg-[#f5f5f0]/50 p-4 border border-[#1a1a1a]/10">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-bold">Special Discount Price</span>
                      <span className="text-2xl sm:text-3xl font-serif font-semibold text-[#1a1a1a]">
                        Rs. {product.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-gray-400 self-end mb-1">
                      <span className="text-[10px] line-through block font-serif">M.R.P: Rs. {product.originalPrice.toLocaleString()}</span>
                    </div>
                    <span className="ml-auto border border-red-500/10 bg-red-500/5 text-red-700 text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase">
                      Save {product.discountPercentage}%
                    </span>
                  </div>

                  {/* 9. WEARUM LIVE VIEWS */}
                  <WearumLiveViews />

                  {/* Select Variants */}
                  {product.variants.length > 0 && product.variants[0] !== 'Default' && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest block">
                        Variant / Color: <span className="font-serif italic text-[#1a1a1a]/60">{selectedVariant}</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {product.variants.map((v) => (
                          <button
                            id={`variant-btn-${v}`}
                            key={v}
                            onClick={() => setSelectedVariant(v)}
                            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                              selectedVariant === v
                                ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                                : 'bg-transparent text-gray-700 border-black/15 hover:border-[#1a1a1a]'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity selector */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest block">
                      Quantity:
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-[#f5f5f0]/50 border border-black/15 overflow-hidden p-1">
                        <button
                          id="qty-decrement-btn"
                          onClick={handleDecrement}
                          className="p-1 text-gray-600 hover:bg-black/5 transition-colors cursor-pointer"
                        >
                          <Minus size={14} />
                        </button>
                        <span id="qty-display-span" className="w-10 text-center font-bold text-xs text-gray-900">
                          {quantity}
                        </span>
                        <button
                          id="qty-increment-btn"
                          onClick={handleIncrement}
                          className="p-1 text-gray-600 hover:bg-black/5 transition-colors cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-[10px] text-green-700 font-bold uppercase tracking-wide flex items-center gap-1 font-mono">
                        <CheckCircle2 size={12} /> IN STOCK (READY)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Purchase buttons */}
                <div className="space-y-2.5 pt-4">
                  <button
                    id="modal-quick-buy-btn"
                    onClick={() => onBuyNowDirect(product, quantity, selectedVariant)}
                    className="w-full bg-[#1a1a1a] hover:bg-black text-white py-4 font-bold text-xs tracking-widest uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>BUY NOW (CASH ON DELIVERY)</span>
                  </button>

                  <button
                    id="modal-add-to-cart-btn"
                    onClick={() => onAddToCart(product, quantity, selectedVariant)}
                    className="w-full bg-transparent hover:bg-black/5 border border-black/25 text-[#1a1a1a] py-3.5 font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={14} />
                    <span>Add to Shopping Bag</span>
                  </button>

                  {/* 1. FREE DELIVERY COUNTDOWN TIMER */}
                  <FreeDeliveryCountdownTimer />
                </div>
              </div>
            </div>

            {/* Product Tabs Detail (Specs, Reviews) */}
            <div className="mt-12 border-t border-[#1a1a1a]/10 pt-8">
              <div className="flex border-b border-[#1a1a1a]/10 mb-6 overflow-x-auto">
                {(['details', 'specs', 'reviews'] as const).map((tab) => (
                  <button
                    id={`tab-btn-${tab}`}
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-6 text-xs uppercase tracking-widest font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                      activeTab === tab
                        ? 'border-[#1a1a1a] text-[#1a1a1a]'
                        : 'border-transparent text-gray-400 hover:text-[#1a1a1a]'
                    }`}
                  >
                    {tab === 'details' ? 'Description' : tab === 'specs' ? 'Specifications' : `Reviews (${reviews.length})`}
                  </button>
                ))}
              </div>

              {/* Tab Content rendering */}
              <div className="min-h-[150px]">
                {activeTab === 'details' && (
                  <div className="max-w-none text-gray-600 text-xs sm:text-sm leading-relaxed space-y-4">
                    <p>{product.longDescription}</p>
                    <div className="bg-[#f5f5f0]/50 p-4 border border-[#1a1a1a]/10 flex gap-3 text-gray-700">
                      <Truck size={18} className="flex-shrink-0 mt-0.5 text-[#b89253]" />
                      <div className="text-xs">
                        <strong className="block font-bold uppercase tracking-wider text-[#1a1a1a] mb-0.5">Fast Cash on Delivery (COD) Guarantee</strong>
                        Delivery takes 2 to 4 working days to Karachi, Lahore, Islamabad & all major cities of Pakistan. Open box checking might be allowed based on courier rules.
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="border border-[#1a1a1a]/10 overflow-hidden divide-y divide-[#1a1a1a]/10 text-xs font-mono uppercase tracking-wider">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="grid grid-cols-3 p-3.5 sm:p-4 hover:bg-black/[2%] transition-colors">
                        <span className="font-bold text-gray-900 col-span-1">{spec.name}</span>
                        <span className="text-gray-600 col-span-2 normal-case font-sans">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {reviews.length === 0 ? (
                      <p className="text-gray-500 text-xs text-center py-6">No reviews yet for this product. Be the first to leave a review!</p>
                    ) : (
                      reviews.map((rev) => (
                        <div key={rev.id} className="border-b border-[#1a1a1a]/5 pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-1.5">
                            <div>
                              <span className="font-serif italic text-gray-900 text-sm block sm:inline mr-2">{rev.author}</span>
                              {rev.verified && (
                                <span className="bg-green-500/5 text-green-700 border border-green-500/10 text-[9px] font-bold px-2 py-0.5 tracking-wider uppercase inline-flex items-center gap-0.5">
                                  ✓ Verified Purchaser
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
                          </div>

                          <div className="flex text-[#b89253] mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={12} fill={i < rev.rating ? 'currentColor' : 'none'} />
                            ))}
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm bg-[#f5f5f0]/50 p-3 border border-[#1a1a1a]/10 italic">"{rev.comment}"</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
