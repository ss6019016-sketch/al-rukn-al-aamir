import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, CartService } from '../../core/services/cart.service';

@Component({ selector: 'app-cart', templateUrl: './cart.component.html' })
export class CartComponent {
  items$: Observable<CartItem[]> = this.cart.getCartItems();
  total$: Observable<number> = this.cart.getCartTotal();
  constructor(private cart: CartService) {}
  update(item: CartItem, quantity: number): void { this.cart.updateQuantity(item.product.id, quantity); }
  remove(item: CartItem): void { this.cart.removeFromCart(item.product.id); }
}
