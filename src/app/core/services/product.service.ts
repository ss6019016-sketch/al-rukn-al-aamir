import { Injectable } from '@angular/core';
import { Product, Testimonial, CategoryBanner, Review } from '../models/product.model';

const PRODUCT_IMAGES: Record<string, string> = {
  Dell: '/assets/img/laptop.png',
  HP: '/assets/img/laptop.png',
  Lenovo: '/assets/img/laptop.png',
  Apple: '/assets/img/laptop.png',
  Microsoft: '/assets/img/laptop.png',
};

function productImage(brand: string, category = ''): string {
  if (category.toLowerCase().includes('macbook')) return PRODUCT_IMAGES['Apple'];
  return PRODUCT_IMAGES[brand] || '/assets/img/laptop.png';
}


@Injectable({ providedIn: 'root' })
export class ProductService {
  private dealOfDay: Product[] = [
    {
      id: 1,
      name: 'Microsoft Surface Laptop 2 – Premium Touch Notebook (Refurbished)',
      image: productImage('Microsoft'),
      category: 'Glossy Series Laptop',
      brand: 'Microsoft',
      price: 899,
      oldPrice: 1200,
      discountPercent: 25,
      rating: 0,
      reviewCount: 0,
      reviews: [],
    },
    {
      id: 2,
      name: 'Dell (Renewed) Latitude 5420 Laptop',
      image: productImage('Dell'),
      category: 'Dell Latitude Series',
      brand: 'Dell',
      price: 600,
      priceRange: { min: 600, max: 700 },
      rating: 5,
      reviewCount: 1,
      reviews: [
        { name: 'Ahmed K.', rating: 5, comment: 'Excellent condition, works perfectly for daily office use.', date: '2026-06-12' },
      ],
    },
    {
      id: 3,
      name: 'Lenovo ThinkPad P51 – Mobile Workstation (Refurbished)',
      image: productImage('Lenovo'),
      category: 'Lenovo ThinkPad',
      brand: 'Lenovo',
      price: 949,
      oldPrice: 1149,
      rating: 5,
      reviewCount: 1,
      reviews: [
        { name: 'Sara M.', rating: 5, comment: 'Great build quality, handles heavy workloads with ease.', date: '2026-05-30' },
      ],
    },

     {
      id: 4,
      name: 'Lenovo ThinkPad P51 – Mobile Workstation (Refurbished)',
      image: productImage('Lenovo'),
      category: 'Lenovo ThinkPad',
      brand: 'Lenovo',
      price: 949,
      oldPrice: 1149,
      rating: 5,
      reviewCount: 1,
      reviews: [
        { name: 'Sara M.', rating: 5, comment: 'Great build quality, handles heavy workloads with ease.', date: '2026-05-30' },
      ],
    },
     {
      id: 5,
      name: 'Lenovo ThinkPad P51 – Mobile Workstation (Refurbished)',
      image: productImage('Lenovo'),
      category: 'Lenovo ThinkPad',
      brand: 'Lenovo',
      price: 949,
      oldPrice: 1149,
      rating: 5,
      reviewCount: 1,
      reviews: [
        { name: 'Sara M.', rating: 5, comment: 'Great build quality, handles heavy workloads with ease.', date: '2026-05-30' },
      ],
    },
     {
      id: 6,
      name: 'Lenovo ThinkPad P51 – Mobile Workstation (Refurbished)',
      image: productImage('Lenovo'),
      category: 'Lenovo ThinkPad',
      brand: 'Lenovo',
      price: 949,
      oldPrice: 1149,
      rating: 5,
      reviewCount: 1,
      reviews: [
        { name: 'Sara M.', rating: 5, comment: 'Great build quality, handles heavy workloads with ease.', date: '2026-05-30' },
      ],
    },
  ];

  private limitedStock: Product[] = [
    {
      id: 7, name: '(Renewed) Dell Latitude 5490 - Core i5 8th Gen',
      image: productImage('Dell'),
      category: 'Dell Latitude Series', brand: 'Dell', price: 450, oldPrice: 650,
      rating: 4, reviewCount: 1,
      reviews: [{ name: 'Yousef A.', rating: 4, comment: 'Good value for the price, battery life is decent.', date: '2026-04-18' }],
    },
    {
      id: 8, name: 'Lenovo (Renewed) ThinkBook 13s-IWL - i5/i7 8th Gen',
      image: productImage('Lenovo'),
      category: 'Lenovo ThinkBook', brand: 'Lenovo', price: 699, oldPrice: 800,
      rating: 0, reviewCount: 0, reviews: [],
    },
    {
      id: 9, name: 'Dell Precision 7670 Workstation - Core i9-12950',
      image: productImage('Dell'),
      category: 'Graphic Laptop', brand: 'Dell', price: 12000, oldPrice: 14000,
      rating: 5, reviewCount: 2,
      reviews: [
        { name: 'Omar T.', rating: 5, comment: 'Perfect for 3D rendering and heavy graphic work.', date: '2026-07-02' },
        { name: 'Fatima R.', rating: 5, comment: 'Powerful workstation, runs cool even under load.', date: '2026-06-20' },
      ],
    },
    {
      id: 10, name: 'HP (Renewed) EliteBook x360 1030 G7',
      image: productImage('HP'),
      category: 'HP Elite book', brand: 'HP', price: 1000, oldPrice: 1350,
      rating: 4, reviewCount: 1,
      reviews: [{ name: 'Khalid S.', rating: 4, comment: 'Touchscreen works well, good convertible laptop.', date: '2026-05-11' }],
    },
    {
      id: 11, name: 'Dell Precision 7770 Mobile Workstation - Core i9-12950',
      image: productImage('Dell'),
      category: 'Graphic Laptop', brand: 'Dell', price: 12000, oldPrice: 15000,
      rating: 0, reviewCount: 0, reviews: [],
    },
  ];

  private bestSellers: Product[] = [
    {
      id: 12, name: 'Dell XPS 9570 15.6" 4K Ultra-HD - i7-8750H, 16GB RAM, 256GB SSD',
      image: productImage('Dell'), category: 'New Arrival', brand: 'Dell',
      price: 800, oldPrice: 1000, discountPercent: 20, featured: true, rating: 5, reviewCount: 1,
      specs: [{ label: 'Screen Size', value: '15.6 inches' }, { label: 'RAM', value: '16GB' }, { label: 'Storage', value: '256GB SSD' }],
      reviews: [{ name: 'Layla H.', rating: 5, comment: 'Screen quality is amazing, colors are so accurate.', date: '2026-07-15' }],
    },
    {
      id: 13, name: 'Dell (Renewed) Latitude 7400 2-in-1 Laptop',
      image: productImage('Dell'), category: 'Laptops', brand: 'Dell',
      price: 700, oldPrice: 1000, discountPercent: 30,
      specs: [{ label: 'Screen Size', value: '14 inches' }, { label: 'RAM', value: '16GB' }, { label: 'Processor', value: 'i7 10th' }],
      rating: 0, reviewCount: 0, reviews: [],
    },
    {
      id: 14, name: 'HP EliteBook 830 G10 - i5 13th Gen, 16GB RAM, 512GB SSD',
      image: productImage('HP'), category: 'HP Elite book', brand: 'HP',
      price: 1000, oldPrice: 1200, discountPercent: 17, featured: true,
      specs: [{ label: 'RAM', value: '16GB' }, { label: 'Storage', value: '512GB SSD' }, { label: 'Processor', value: 'i5 12th' }],
      rating: 4, reviewCount: 1,
      reviews: [{ name: 'Hamza W.', rating: 4, comment: 'Solid business laptop, lightweight for travel.', date: '2026-06-28' }],
    },
    {
      id: 15, name: 'Dell (Refurbished) Latitude 5410 - i5 10th Gen, 8GB RAM, 256GB SSD',
      image: productImage('Dell'), category: 'Laptops', brand: 'Dell',
      price: 530, priceRange: { min: 530, max: 630 },
      specs: [{ label: 'Screen Size', value: '14 inches' }, { label: 'RAM', value: '8GB / 16GB' }],
      rating: 0, reviewCount: 0, reviews: [],
    },
  ];

  private categoryBanners: CategoryBanner[] = [
    { id: 1, title: 'Creative Power Machines', subtitle: 'Graphic Laptops For Games', priceFrom: 'PKR 599', image: 'https://placehold.co/600x400/0d2b4e/ffffff?text=Graphic+Workstation', ctaLabel: 'Shop Now' },
    { id: 2, title: 'Office Laptops For Work', subtitle: 'Business Series', priceFrom: 'PKR 499', image: 'https://placehold.co/600x400/14396b/ffffff?text=Business+Series', ctaLabel: 'Shop Now' },
    { id: 3, title: 'Premium Glossy Collection', subtitle: 'Glossy Series', priceFrom: 'PKR 699', image: 'https://placehold.co/600x400/ff6a00/ffffff?text=Glossy+Series', ctaLabel: 'Shop Now' },
  ];

  private testimonials: Testimonial[] = [
    { id: 1, name: 'Ahmed Al Falasi', date: '2022-08-10', message: 'My laptop works wonderfully! I like the look of it, the silver is very nice. It’s lightweight and I love that it has the numeric keypad.', avatar: 'https://placehold.co/60x60/eef2f7/0d2b4e?text=AF', rating: 5 },
    { id: 2, name: 'Fatima Al Nuaimi', date: '2023-11-16', message: 'Fantastic laptop for the money. Everything is so quick and the pictures are so clear. I really like the size, 15 inch has so much room.', avatar: 'https://placehold.co/60x60/eef2f7/0d2b4e?text=FN', rating: 5 },
    { id: 3, name: 'Rashid Mohammed', date: '2024-02-05', message: 'I love this lightweight Lenovo laptop. The matte screen has a clear image, and it connects easily to my printer.', avatar: 'https://placehold.co/60x60/eef2f7/0d2b4e?text=RM', rating: 4 },
    { id: 4, name: 'Sara Ibrahim', date: '2025-05-08', message: 'I’ve had great experiences buying laptops here; the prices are competitive, and the customer service is responsive.', avatar: 'https://placehold.co/60x60/eef2f7/0d2b4e?text=SI', rating: 5 },
  ];
  private newArrivals: Product[] = [this.bestSellers[0], this.dealOfDay[2], this.bestSellers[2], this.limitedStock[2]];

  private extraLaptops: Product[] = Array.from({ length: 14 }, (_, index) => {
    const id = 16 + index;
    const brands = ['Dell', 'HP', 'Lenovo', 'Microsoft'];
    const categories = ['Laptops', 'Business Series', 'Glossy Series', 'Graphic Laptop', 'MacBook', 'Accessories', 'Monitors', 'Desktop'];
    const brand = brands[index % brands.length];
    const category = categories[index % categories.length];
    const price = 299 + index * 540;
    const hasReview = index % 3 === 0;
    const dummyReviews: Review[] = hasReview
      ? [{ name: `Customer ${id}`, rating: 4, comment: 'Solid laptop for daily use, good condition.', date: '2026-06-01' }]
      : [];
    return {
      id,
      name: `${brand} ${category} Laptop ${id} - Core i${5 + (index % 3)}, 8GB RAM, 256GB SSD`,
      image: productImage(brand, category),
      category,
      brand,
      price,
      oldPrice: index % 3 === 0 ? price + 180 : undefined,
      discountPercent: index % 3 === 0 ? 15 : undefined,
      featured: index % 4 === 0,
      isSale: index % 3 === 0,
      inStock: index % 5 !== 0,
      rating: hasReview ? 4 : 0,
      reviewCount: hasReview ? 1 : 0,
      reviews: dummyReviews,
      specs: [{ label: 'RAM', value: `${8 + (index % 2) * 8}GB` }, { label: 'Storage Capacity', value: '256GB SSD' }, { label: 'Screen Size', value: `${13 + (index % 3)} inches` }],
    };
  });

  getDealOfTheDay(): Product[] { return this.dealOfDay; }
  getAllProducts(): Product[] {
    return [...this.dealOfDay, ...this.limitedStock, ...this.bestSellers, ...this.extraLaptops];
  }
  getProductById(id: number): Product | undefined { return this.getAllProducts().find((product) => product.id === id); }
  getLimitedStock(): Product[] { return this.limitedStock; }
  getBestSellers(): Product[] { return this.bestSellers; }
  getNewArrivals(): Product[] { return this.newArrivals; }
  getCategoryBanners(): CategoryBanner[] { return this.categoryBanners; }
  getTestimonials(): Testimonial[] { return this.testimonials; }
  getProductsByCategory(categoryKeyword: string): Product[] {
    const keyword = categoryKeyword.toLowerCase();
    return this.getAllProducts().filter((product) =>
      product.category.toLowerCase().includes(keyword)
    );
  }
}