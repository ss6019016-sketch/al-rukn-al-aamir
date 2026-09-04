import { Component, OnInit } from '@angular/core';
import { AdminStorageService } from '../../../core/services/admin-storage.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  categoriesCount = 0;

  constructor(private adminStorage: AdminStorageService) {}

  ngOnInit(): void {
    this.products = this.adminStorage.getProducts();
    this.categoriesCount = this.adminStorage.getCategories().length;
  }

  get inStockCount(): number {
    return this.products.filter((p) => p.inStock !== false).length;
  }

  get recentProducts(): Product[] {
    return [...this.products].reverse().slice(0, 5);
  }
}