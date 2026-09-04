import { Component, OnInit } from '@angular/core';
import { AdminStorageService } from '../../../core/services/admin-storage.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  search = '';
  toastMessage = '';

  constructor(private adminStorage: AdminStorageService) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.products = [...this.adminStorage.getProducts()].reverse();
  }

  get filteredProducts(): Product[] {
    const term = this.search.trim().toLowerCase();
    if (!term) return this.products;
    return this.products.filter((product) =>
      `${product.name} ${product.category} ${product.brand}`.toLowerCase().includes(term)
    );
  }

  deleteProduct(product: Product): void {
    const confirmed = confirm(`Delete "${product.name}"? This can't be undone.`);
    if (!confirmed) return;
    this.adminStorage.deleteProduct(product.id);
    this.load();
    this.showToast('Product deleted.');
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    setTimeout(() => (this.toastMessage = ''), 2200);
  }
}