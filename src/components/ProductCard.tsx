import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onProductClick: (id: string) => void;
  onAddToCart: (product: Product, variant: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onBuyNowClick: (product: Product) => void;
}

export default function ProductCard({
  product,
  onProductClick,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onBuyNowClick
}: ProductCardProps) {
  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[#fdfdfb] overflow-hidden border border-[#1a1a1a]/8 hover:border-[#1a1a1a]/25 transition-all duration-300 flex flex-col h-full"
    >
      {/* Product Badges & Wishlist Button */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.discountPercentage && (
          <span className="bg-[#1a1a1a] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-[0.1em]">
            -{product.discountPercentage}% OFF
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-[#b89253] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-[0.1em]">
            Best Seller
          </span>
        )}
      </div>

      <button
        id={`wishlist-toggle-${product.id}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        className={`absolute top-3 right-3 z-10 p-2 border transition-all duration-200 active:scale-90 ${
          isWishlisted
            ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white'
            : 'bg-[#fdfdfb]/80 border-black/10 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a]'
        }`}
      >
        <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
      </button>

      {/* Main Image Grid */}
      <div
        id={`product-img-container-${product.id}`}
        onClick={() => onProductClick(product.id)}
        className="relative pt-[100%] bg-[#f5f5f0]/50 overflow-hidden cursor-pointer"
      >
        <div className="absolute inset-3 border border-black/5 pointer-events-none z-10"></div>
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500 ease-out grayscale-[10%] group-hover:grayscale-0"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-15">
            <span className="text-white font-bold tracking-[0.2em] text-xs bg-black/40 px-4 py-2">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Category */}
          <span className="text-[9px] font-bold text-[#1a1a1a]/40 uppercase tracking-[0.2em] block">
            {product.category.replace('-', ' ')}
          </span>

          {/* Title */}
          <h3
            id={`product-title-${product.id}`}
            onClick={() => onProductClick(product.id)}
            className="text-sm sm:text-base font-serif font-medium text-[#1a1a1a] line-clamp-2 hover:opacity-75 transition-opacity cursor-pointer min-h-[40px] sm:min-h-[48px] leading-snug"
          >
            {product.title}
          </h3>

          {/* Reviews Star */}
          <div className="flex items-center gap-1">
            <div className="flex text-[#b89253]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  strokeWidth={2}
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-[#1a1a1a]/60 ml-1">
              {product.rating}
            </span>
            <span className="text-[10px] text-gray-400">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Pricing and CTAs */}
        <div className="mt-4 pt-4 border-t border-[#1a1a1a]/5 space-y-3.5">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-serif font-semibold text-[#1a1a1a]">
                Rs. {product.price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400 line-through font-serif">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            </div>
            {product.variants.length > 1 && (
              <span className="text-[9px] text-[#1a1a1a]/40 font-bold uppercase tracking-wider">
                {product.variants.length} options
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              id={`add-to-cart-btn-${product.id}`}
              onClick={() => onAddToCart(product, product.variants[0] || 'Default')}
              disabled={!product.inStock}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 border border-[#1a1a1a]/25 text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] disabled:opacity-30 transition-all cursor-pointer active:scale-95"
            >
              <ShoppingCart size={13} />
              <span>Add</span>
            </button>
            <button
              id={`buy-now-btn-${product.id}`}
              onClick={() => onBuyNowClick(product)}
              disabled={!product.inStock}
              className="w-full bg-[#1a1a1a] hover:bg-black disabled:bg-gray-300 text-white py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
