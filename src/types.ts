export interface Product {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number; // in PKR
  originalPrice: number; // in PKR
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviewsCount: number;
  variants: string[];
  specs: { name: string; value: string }[];
  inStock: boolean;
  isBestSeller?: boolean;
  isHotDeal?: boolean;
  discountPercentage?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface OrderDetails {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
}
