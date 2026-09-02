import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css'],
})
export class CartButtonComponent implements OnInit, OnDestroy {
  cartCount = 0;
  private cartCountSubscription?: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cartCountSubscription = this.cartService.getCartCount().subscribe((count) => {
      this.cartCount = count;
    });
  }

  openCart(): void {
    this.router.navigate(['/cart']);
  }

  ngOnDestroy(): void {
    this.cartCountSubscription?.unsubscribe();
  }
}
