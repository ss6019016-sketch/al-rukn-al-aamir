import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly productsSubject = new BehaviorSubject<Product[]>([]);

  getWishlist(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getWishlistCount(): Observable<number> {
    return new Observable<number>((subscriber) => this.productsSubject.subscribe((products) => {
      subscriber.next(products.length);
    }));
  }

  addToWishlist(product: Product): void {
    if (!this.isWishlisted(product.id)) {
      this.productsSubject.next([...this.productsSubject.value, product]);
    }
  }

  removeFromWishlist(productId: number): void {
    this.productsSubject.next(this.productsSubject.value.filter((product) => product.id !== productId));
  }

  isWishlisted(productId: number): boolean {
    return this.productsSubject.value.some((product) => product.id === productId);
  }

  toggleWishlist(product: Product): void {
    if (this.isWishlisted(product.id)) {
      this.removeFromWishlist(product.id);
    } else {
      this.addToWishlist(product);
    }
  }
}
