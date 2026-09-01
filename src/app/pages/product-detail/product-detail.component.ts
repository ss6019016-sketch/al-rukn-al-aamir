import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';

@Component({ selector: 'app-product-detail', templateUrl: './product-detail.component.html', styleUrls: ['./product-detail.component.css'] })
export class ProductDetailComponent implements OnInit {
  product?: Product;
  selectedImage = '';
  quantity = 1;
  activeTab = 'description';
  added = false;
  relatedProducts: Product[] = [];

  constructor(private route: ActivatedRoute, private products: ProductService, private cart: CartService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.product = this.products.getProductById(Number(params.get('id')));
      this.selectedImage = this.product?.image || '';
      this.relatedProducts = this.product
        ? this.products.getAllProducts().filter((item) => item.id !== this.product?.id).slice(0, 6)
        : [];
    });
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  addToCart(): void {
    if (!this.product) return;
    this.cart.addToCart(this.product, this.quantity);
    this.added = true;
    setTimeout(() => this.added = false, 2200);
  }
}
