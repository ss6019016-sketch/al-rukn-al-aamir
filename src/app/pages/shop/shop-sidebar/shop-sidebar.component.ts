import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ShopFilters {
  minPrice: number;
  maxPrice: number;
  featured: boolean;
  inStock: boolean;
  onSale: boolean;
  category: string;
}

@Component({
  selector: 'app-shop-sidebar',
  templateUrl: './shop-sidebar.component.html',
  styleUrls: ['./shop-sidebar.component.css'],
})
export class ShopSidebarComponent {
  @Input() categories: string[] = [];
  @Output() filtersChange = new EventEmitter<ShopFilters>();

  filters: ShopFilters = {
    minPrice: 299,
    maxPrice: 12000,
    featured: false,
    inStock: false,
    onSale: false,
    category: 'All',
  };

  update(): void {
    if (this.filters.minPrice > this.filters.maxPrice) {
      this.filters.minPrice = this.filters.maxPrice;
    }
    this.filtersChange.emit({ ...this.filters });
  }

  reset(): void {
    this.filters = {
      minPrice: 299,
      maxPrice: 12000,
      featured: false,
      inStock: false,
      onSale: false,
      category: 'All',
    };
    this.filtersChange.emit({ ...this.filters });
  }
}