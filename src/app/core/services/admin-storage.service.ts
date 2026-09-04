import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

const PRODUCTS_KEY = 'ara_admin_products';
const CATEGORIES_KEY = 'ara_admin_categories';
const NEXT_ID_KEY = 'ara_admin_next_id';
const NEXT_ID_START = 5000; // stays clear of the static demo product ids

const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: 'Laptops' },
  { id: 2, name: 'Business Series' },
  { id: 3, name: 'Glossy Series' },
  { id: 4, name: 'Graphic Laptop' },
  { id: 5, name: 'MacBook' },
  { id: 6, name: 'Accessories' },
  { id: 7, name: 'Monitors' },
  { id: 8, name: 'Desktop' },
];

/**
 * Everything the admin panel adds/edits lives in the browser's localStorage.
 * No backend yet — this service is the single place that reads/writes it,
 * so swapping in a real API later only means editing this one file.
 */
@Injectable({ providedIn: 'root' })
export class AdminStorageService {
  // ---------------- Products ----------------

  getProducts(): Product[] {
    return this.read<Product[]>(PRODUCTS_KEY, []);
  }

  getProductById(id: number): Product | undefined {
    return this.getProducts().find((product) => product.id === id);
  }

  saveProduct(product: Product): Product {
    const products = this.getProducts();
    if (product.id) {
      const index = products.findIndex((item) => item.id === product.id);
      if (index > -1) {
        products[index] = product;
      } else {
        products.push(product);
      }
    } else {
      product.id = this.nextId();
      products.push(product);
    }
    this.write(PRODUCTS_KEY, products);
    return product;
  }

  deleteProduct(id: number): void {
    this.write(PRODUCTS_KEY, this.getProducts().filter((product) => product.id !== id));
  }

  // ---------------- Categories ----------------

  getCategories(): Category[] {
    const stored = this.read<Category[] | null>(CATEGORIES_KEY, null);
    if (!stored || !stored.length) {
      this.write(CATEGORIES_KEY, DEFAULT_CATEGORIES);
      return DEFAULT_CATEGORIES;
    }
    return stored;
  }

  saveCategory(category: Category): Category {
    const categories = this.getCategories();
    if (category.id) {
      const index = categories.findIndex((item) => item.id === category.id);
      if (index > -1) {
        categories[index] = category;
      } else {
        categories.push(category);
      }
    } else {
      category.id = Math.max(0, ...categories.map((item) => item.id)) + 1;
      categories.push(category);
    }
    this.write(CATEGORIES_KEY, categories);
    return category;
  }

  deleteCategory(id: number): void {
    this.write(CATEGORIES_KEY, this.getCategories().filter((category) => category.id !== id));
  }

  // ---------------- Image handling ----------------

  /**
   * Reads an uploaded image file, downsizes it and re-encodes it as a JPEG
   * data-URL so several product photos can comfortably fit in localStorage
   * (which typically caps out around 5-10MB per site).
   */
  fileToCompressedDataUrl(file: File, maxDimension = 900, quality = 0.72): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('Could not read that image file.'));
        img.onload = () => {
          let { width, height } = img;
          if (width > maxDimension || height > maxDimension) {
            const scale = maxDimension / Math.max(width, height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas not supported.'));
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  }

  // ---------------- Internals ----------------

  private nextId(): number {
    const current = Number(localStorage.getItem(NEXT_ID_KEY) || NEXT_ID_START);
    const next = current + 1;
    localStorage.setItem(NEXT_ID_KEY, String(next));
    return next;
  }

  private read<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  private write(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}