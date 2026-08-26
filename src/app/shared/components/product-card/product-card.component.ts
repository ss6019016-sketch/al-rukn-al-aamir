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
  toastVisible = false;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router,
  ) {}

  get stars(): number[] {
    return Array(5).fill(0);
  }

  addToCart(): void {
    if (this.product.priceRange) {
      this.router.navigate(['/product', this.product.id]);
      return;
    }
    this.cartService.addToCart(this.product);
    this.showToast();
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
  }

  decrementQty(): void {
    if (this.quickViewQty > 1) this.quickViewQty--;
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

  findSimilar(): void {
    this.router.navigate(['/shop'], { queryParams: { category: this.product.category } });
  }

  private showToast(): void {
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 2200);
  }
}