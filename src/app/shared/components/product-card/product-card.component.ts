import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() listView = false;
  @Input() similarProducts = false;
  quickViewOpen = false;
  quickViewClosing = false;
  quickViewQty = 1;
  cardQty = 1;
  quantityPulse = false;
  toastVisible = false;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router,
  ) {}

  get stars(): number[] {
    return Array(5).fill(0);
  }

  get discountLabel(): string {
    if (this.product.discountPercent) return `-${this.product.discountPercent}%`;
    if (this.product.oldPrice && this.product.oldPrice > this.product.price) {
      const discount = Math.round((1 - this.product.price / this.product.oldPrice) * 100);
      return `-${discount}%`;
    }
    return this.product.isSale ? 'SALE' : '';
  }

  addToCart(): void {
    if (this.product.priceRange) {
      this.router.navigate(['/product', this.product.id]);
      return;
    }
    this.cartService.addToCart(this.product, this.cardQty);
    this.showToast();
  }

  incrementCardQty(): void {
    this.cardQty++;
    this.pulseQuantity();
  }

  decrementCardQty(): void {
    if (this.cardQty > 1) {
      this.cardQty--;
      this.pulseQuantity();
    }
  }

  openProduct(): void {
    this.router.navigate(['/product', this.product.id]);
  }

  toggleWishlist(): void {
    this.wishlistService.toggleWishlist(this.product);
  }

  isWishlisted(): boolean {
    return this.wishlistService.isWishlisted(this.product.id);
  }

  openQuickView(): void {
    this.quickViewQty = 1;
    this.quickViewClosing = false;
    this.quickViewOpen = true;
  }

  closeQuickView(): void {
    this.quickViewClosing = true;
    setTimeout(() => {
      this.quickViewOpen = false;
      this.quickViewClosing = false;
    }, 250);
  }

  incrementQty(): void {
    this.quickViewQty++;
    this.pulseQuantity();
  }

  decrementQty(): void {
    if (this.quickViewQty > 1) {
      this.quickViewQty--;
      this.pulseQuantity();
    }
  }

  addQuickViewToCart(): void {
    this.cartService.addToCart(this.product, this.quickViewQty);
    this.closeQuickView();
    this.showToast();
  }

  buyNowFromQuickView(): void {
    this.cartService.addToCart(this.product, this.quickViewQty);
    this.closeQuickView();
    this.router.navigate(['/checkout']);
  }

  addQuickCart(): void {
    this.cartService.addToCart(this.product);
    this.showToast();
  }

  private showToast(): void {
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 2200);
  }

  private pulseQuantity(): void {
    this.quantityPulse = false;
    setTimeout(() => (this.quantityPulse = true));
    setTimeout(() => (this.quantityPulse = false), 160);
  }
}