import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, CartService } from '../../core/services/cart.service';

@Component({ selector: 'app-cart', templateUrl: './cart.component.html' })
export class CartComponent {
  items$: Observable<CartItem[]> = this.cart.getCartItems();
  total$: Observable<number> = this.cart.getCartTotal();
  removingIds = new Set<number>();
  constructor(private cart: CartService) {}
  update(item: CartItem, quantity: number): void { this.cart.updateQuantity(item.product.id, quantity); }
  remove(item: CartItem): void {
    if (this.removingIds.has(item.product.id)) return;
    this.removingIds.add(item.product.id);
    setTimeout(() => {
      this.cart.removeFromCart(item.product.id);
      this.removingIds.delete(item.product.id);
    }, 250);
  }
}
