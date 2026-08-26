import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product.model';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({ selector: 'app-wishlist', templateUrl: './wishlist.component.html' })
export class WishlistComponent {
  products$: Observable<Product[]> = this.wishlist.getWishlist();
  constructor(private wishlist: WishlistService) {}
  remove(product: Product): void { this.wishlist.removeFromWishlist(product.id); }
}
