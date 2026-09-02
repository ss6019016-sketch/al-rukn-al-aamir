import { Component } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.css'],
})
export class BestSellersComponent {
  tabs = ['New Arrival', 'Laptops', 'HP Elite book'];
  activeTab = this.tabs[0];
  tabChanging = false;

  private allProducts: Product[] = this.productService.getBestSellers();

  constructor(private productService: ProductService) {}

  get filteredProducts(): Product[] {
    if (this.activeTab === 'HP Elite book') {
      return this.allProducts.filter((p) => p.category === 'HP Elite book');
    }
    if (this.activeTab === 'Laptops') {
      return this.allProducts.filter((p) => p.category === 'Laptops');
    }
    return this.allProducts; // New Arrival -> dummy: show all
  }

  setTab(tab: string): void {
    this.activeTab = tab;
    this.tabChanging = false;
    setTimeout(() => (this.tabChanging = true));
  }
}
