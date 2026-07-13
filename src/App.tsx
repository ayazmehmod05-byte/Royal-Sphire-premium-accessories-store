import React, { useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from './data/products';
import { Product, CartItem, OrderDetails } from './types';
import Hero from './components/Hero';
import ContactCardSection from './components/ContactCardSection';
import Header from './components/Header';
import SaleLiveBanner from './components/SaleLiveBanner';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import QuickCheckoutForm from './components/QuickCheckoutForm';
import OrderSuccessModal from './components/OrderSuccessModal';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, PhoneCall, Heart, ShoppingCart, Trash2, X, Star, ArrowRight, Sparkles, Check, Info } from 'lucide-react';
import { 
  TrustedPakistanReviewsMarquee, 
  LiveOrderActivityTicker, 
  RandomReviewsCarousel 
} from './components/Widgets';

export default function App() {
  // Load initial states from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const local = localStorage.getItem('royalsphire_cart');
    return local ? JSON.parse(local) : [];
  });
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const local = localStorage.getItem('royalsphire_wishlist');
    return local ? JSON.parse(local) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  const [directCheckoutItem, setDirectCheckoutItem] = useState<CartItem | null>(null);
  const [completedOrderDetails, setCompletedOrderDetails] = useState<OrderDetails | null>(null);
  const [lastTrackingId, setLastTrackingId] = useState('');

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info'>('success');

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('royalsphire_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('royalsphire_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Find detailed product
  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || null;

  // Handlers
  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
  };

  const handleAddToCart = (product: Product, variant: string, qtyToAdd = 1) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === variant
      );
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += qtyToAdd;
        return updated;
      }
      return [...prevCart, { product, quantity: qtyToAdd, selectedVariant: variant }];
    });
    showToast(`Added ${qtyToAdd}x ${product.title} (${variant}) to Cart!`);
  };

  const handleUpdateCartQuantity = (id: string, variant: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(id, variant);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === id && item.selectedVariant === variant
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const handleRemoveCartItem = (id: string, variant: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === id && item.selectedVariant === variant))
    );
    showToast('Item removed from Cart', 'info');
  };

  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast('Removed from Wishlist', 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast('Added to Wishlist!');
    }
  };

  const handleBuyNowClick = (product: Product) => {
    setDirectCheckoutItem({
      product,
      quantity: 1,
      selectedVariant: product.variants[0] || 'Default'
    });
    setIsCheckoutOpen(true);
  };

  const handleBuyNowDirect = (product: Product, quantity: number, variant: string) => {
    setDirectCheckoutItem({
      product,
      quantity,
      selectedVariant: variant
    });
    setSelectedProductId(null); // close details modal
    setIsCheckoutOpen(true);
  };

  const handleOrderSubmit = (orderDetails: OrderDetails) => {
    // Simulate API Call & Order Creation
    const generatedTracking = `RS-${Math.floor(100000 + Math.random() * 900000)}`;
    setCompletedOrderDetails(orderDetails);
    setLastTrackingId(generatedTracking);
    
    // Clear cart if not direct checkout
    if (!directCheckoutItem) {
      setCart([]);
    }

    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
    setDirectCheckoutItem(null);
    setCompletedOrderDetails(null);
  };

  // Filter products based on search and category
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#1a1a1a] selection:text-white">
      {/* Toast Notification Widget */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-none shadow-2xl text-xs sm:text-sm font-bold bg-[#1a1a1a] text-[#fdfdfb] border border-white/10"
          >
            {toastType === 'success' ? (
              <Check className="text-green-400 flex-shrink-0" size={15} />
            ) : (
              <Info className="text-[#b89253] flex-shrink-0" size={15} />
            )}
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header component */}
      <Header
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onCartOpen={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        wishlistCount={wishlist.length}
        onWishlistOpen={() => setIsWishlistOpen(true)}
      />

      {/* Hero Image Banner (Single premium banner as requested) */}
      <Hero />
      
      {/* Sale is Live Marquee Banner attached right below Hero */}
      <SaleLiveBanner />

      {/* Main Catalog Area */}
      <main id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 w-full">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-10 pb-5 border-b border-gray-200 gap-4">
          <div>
            <span className="text-[#1a1a1a]/50 font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.25em] block mb-1.5">
              {selectedCategory === 'all' ? 'Editorial Selection' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#1a1a1a] tracking-tight">
              Explore <span className="italic font-normal">Smart Gadgets</span>
            </h2>
          </div>

          <div className="text-[11px] uppercase tracking-wider text-gray-400 font-mono">
            Showing {filteredProducts.length} items
          </div>
        </div>

        {/* Catalog grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 space-y-5 max-w-md mx-auto">
            <div className="w-12 h-12 border border-[#1a1a1a]/10 flex items-center justify-center text-[#1a1a1a] mx-auto bg-[#f5f5f0]/50">
              <Info size={20} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base font-serif font-medium text-[#1a1a1a]">No products found</h3>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">We couldn't find anything matching "{searchTerm}". Try refining your search terms or choosing a different category.</p>
            </div>
            <button
              id="clear-catalog-filters-btn"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-[#1a1a1a] hover:bg-black text-white font-bold text-xs tracking-widest uppercase px-6 py-3.5 transition-all active:scale-98"
            >
              Clear Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
                onAddToCart={(p, v) => handleAddToCart(p, v, 1)}
                isWishlisted={wishlist.some((item) => item.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
                onBuyNowClick={handleBuyNowClick}
              />
            ))}
          </div>
        )}
      </main>

      {/* Verified Customer Reviews Carousel */}
      <TrustedPakistanReviewsMarquee />

      {/* Interactive Contact Card & Customer Inquiry/Feedback Form */}
      <ContactCardSection onShowToast={showToast} />

      {/* Rotating customer reviews carousel */}
      <RandomReviewsCarousel />

      {/* Floating Live order activity toast ticker and WhatsApp bubble */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-4 pointer-events-none">
        {/* Dynamic real-time activity tracking ticker */}
        <div className="pointer-events-auto">
          <LiveOrderActivityTicker />
        </div>

        {/* Floating WhatsApp support bubble */}
        <div className="group flex flex-col items-start gap-2 pointer-events-auto">
          <a
            id="floating-whatsapp-widget"
            href="https://wa.me/923495979062?text=Hi%20Royal%20Sphire%21%20I%20am%20browsing%20your%20website%20and%20need%20help%20placing%20an%20order."
            target="_blank"
            referrerPolicy="no-referrer"
            className="bg-green-500 hover:bg-green-600 text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90 flex items-center justify-center relative cursor-pointer"
          >
            <MessageSquare size={24} fill="currentColor" />
            {/* Tooltip badge */}
            <span className="absolute left-14 bg-gray-950 text-white font-bold text-[10px] sm:text-xs px-3 py-1.5 rounded-xl shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              WhatsApp Order: +92 349 5979062
            </span>
            {/* Pulse ping */}
            <span className="absolute inset-0 rounded-full bg-green-500 -z-10 animate-ping opacity-30" />
          </a>
        </div>
      </div>

      {/* Footer view */}
      <Footer onCategorySelect={setSelectedCategory} />

      {/* Product Details Modal Drawer */}
      <AnimatePresence>
        {selectedProductId && (
          <ProductDetailsModal
            product={selectedProduct}
            isOpen={!!selectedProductId}
            onClose={() => setSelectedProductId(null)}
            onAddToCart={(p, qty, v) => {
              handleAddToCart(p, v, qty);
              setSelectedProductId(null);
            }}
            onBuyNowDirect={handleBuyNowDirect}
          />
        )}
      </AnimatePresence>

      {/* Slide-out Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onCheckoutClick={() => {
              setIsCartOpen(false);
              setDirectCheckoutItem(null); // Use cart
              setIsCheckoutOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Wishlist Drawer sidebar view */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity" onClick={() => setIsWishlistOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 p-6 flex flex-col h-full shadow-2xl"
            >
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
                <div className="flex items-center gap-2">
                  <Heart className="text-red-500 animate-pulse" size={22} fill="currentColor" />
                  <h3 className="font-black text-lg text-gray-900">Your Wishlist</h3>
                </div>
                <button
                  id="close-wishlist-drawer-btn"
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-1 no-scrollbar">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-6">
                    <Heart size={32} className="text-gray-200" />
                    <p className="text-xs text-gray-400">Your wishlist is currently empty. Add products to save them for later!</p>
                  </div>
                ) : (
                  wishlist.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100 relative">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                        <img src={item.image} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate pr-6">{item.title}</h4>
                        <span className="text-xs font-black text-gray-900 block mt-1">Rs. {item.price.toLocaleString()}</span>
                        <div className="flex gap-2 mt-2">
                          <button
                            id={`wishlist-add-to-cart-${item.id}`}
                            onClick={() => {
                              handleAddToCart(item, item.variants[0] || 'Default');
                              setIsWishlistOpen(false);
                            }}
                            className="bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                          >
                            Add to Cart
                          </button>
                          <button
                            id={`wishlist-remove-${item.id}`}
                            onClick={() => handleToggleWishlist(item)}
                            className="text-red-500 hover:bg-red-50 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Express Checkout overlay form */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <QuickCheckoutForm
            isOpen={isCheckoutOpen}
            onClose={() => {
              setIsCheckoutOpen(false);
              setDirectCheckoutItem(null);
            }}
            cartItems={cart}
            directCheckoutItem={directCheckoutItem}
            onOrderSubmit={handleOrderSubmit}
          />
        )}
      </AnimatePresence>

      {/* Success Order Confirmation Modal */}
      <AnimatePresence>
        {isSuccessOpen && (
          <OrderSuccessModal
            isOpen={isSuccessOpen}
            onClose={handleSuccessClose}
            orderDetails={completedOrderDetails}
            cartItems={cart}
            directCheckoutItem={directCheckoutItem}
            trackingId={lastTrackingId}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
