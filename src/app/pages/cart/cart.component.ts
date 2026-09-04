import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  freeShippingThreshold = 5000; // PKR — apne business rule ke hisab se badal lena
  promoCode = '';
  promoApplied = false;

  items$: Observable<CartItem[]> = this.cart.getCartItems();
  total$: Observable<number> = this.cart.getCartTotal();
  removingIds = new Set<number>();

  constructor(private cart: CartService, private location: Location) { }

  goBack(): void {
    this.location.back();
  }

  update(item: CartItem, quantity: number): void {
    this.cart.updateQuantity(item.product.id, quantity);
  }

  remove(item: CartItem): void {
    if (this.removingIds.has(item.product.id)) return;
    this.removingIds.add(item.product.id);
    setTimeout(() => {
      this.cart.removeFromCart(item.product.id);
      this.removingIds.delete(item.product.id);
    }, 250);
  }

  get shippingProgress$() {
    return this.total$.pipe(
      map(total => Math.min(100, Math.round((total / this.freeShippingThreshold) * 100)))
    );
  }

  get amountToFreeShipping$() {
    return this.total$.pipe(
      map(total => Math.max(0, this.freeShippingThreshold - total))
    );
  }

  applyPromo() {
    // yahan apni coupon/discount service call karo jab ready ho
    this.promoApplied = !!this.promoCode.trim();
  }

  clearCart() {
    if (confirm('Are you sure you want to remove all items from your bag?')) {
      // yahan apni cart service ka clear method call karo, e.g. this.cartService.clear();
    }
  }
}