import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product.model';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({ selector: 'app-wishlist', templateUrl: './wishlist.component.html' })
export class WishlistComponent {
  products$: Observable<Product[]> = this.wishlist.getWishlist();
  removingIds = new Set<number>();
  constructor(private wishlist: WishlistService) {}
  remove(product: Product): void {
    if (this.removingIds.has(product.id)) return;
    this.removingIds.add(product.id);
    setTimeout(() => {
      this.wishlist.removeFromWishlist(product.id);
      this.removingIds.delete(product.id);
    }, 250);
  }
}
