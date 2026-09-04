// core/models/product.model.ts

export interface Spec {
  label: string;
  value: string;
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  images?: string[];
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  priceRange?: { min: number; max: number };
  rating?: number;
  reviewCount?: number;
  discountPercent?: number;
  featured?: boolean;
  isSale?: boolean;
  inStock?: boolean;
  specs?: Spec[];
  reviews?: Review[];
  sku?: string;
  tags?: string[];
  description?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  date: string;
  message: string;
  avatar: string;
  rating: number;
}

export interface CategoryBanner {
  id: number;
  title: string;
  subtitle: string;
  priceFrom: string;
  image: string;
  ctaLabel: string;
}