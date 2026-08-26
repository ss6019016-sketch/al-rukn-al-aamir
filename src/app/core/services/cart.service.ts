import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>([]);

  getCartItems(): Observable<CartItem[]> {
    return this.itemsSubject.asObservable();
  }

  getCartCount(): Observable<number> {
    return new Observable<number>((subscriber) => this.itemsSubject.subscribe((items) => {
      subscriber.next(items.reduce((count, item) => count + item.quantity, 0));
    }));
  }

  getCartTotal(): Observable<number> {
    return new Observable<number>((subscriber) => this.itemsSubject.subscribe((items) => {
      subscriber.next(items.reduce((total, item) => total + this.unitPrice(item.product) * item.quantity, 0));
    }));
  }

  addToCart(product: Product, quantity = 1): void {
    const items = [...this.itemsSubject.value];
    const existing = items.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += Math.max(1, quantity);
    } else {
      items.push({ product, quantity: Math.max(1, quantity) });
    }
    this.itemsSubject.next(items);
  }

  removeFromCart(productId: number): void {
    this.itemsSubject.next(this.itemsSubject.value.filter((item) => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.itemsSubject.next(this.itemsSubject.value.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  }

  private unitPrice(product: Product): number {
    return product.priceRange?.min ?? product.price;
  }
}
