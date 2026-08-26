export interface Product {
  id: number;
  name: string;
  image: string;
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
  specs?: { label: string; value: string }[];
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
}

export interface CategoryBanner {
  id: number;
  title: string;
  subtitle: string;
  priceFrom: string;
  image: string;
  ctaLabel: string;
}