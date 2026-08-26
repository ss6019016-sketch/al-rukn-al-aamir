import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  private allProducts: Product[] = [];

  products: Product[] = [];
  categories: string[] = [];
  brands: string[] = [];

  selectedCategory = 'All';
  selectedBrand = 'All';
  maxPrice = 15000;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Combine every dummy list into one flat, de-duplicated array.
    const combined = [
      ...this.productService.getDealOfTheDay(),
      ...this.productService.getLimitedStock(),
      ...this.productService.getBestSellers(),
      ...this.productService.getNewArrivals(),
    ];
    const seen = new Set<number>();
    this.allProducts = combined.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });

    this.categories = Array.from(new Set(this.allProducts.map((p) => p.category)));
    this.brands = Array.from(new Set(this.allProducts.map((p) => p.brand)));

    // Pre-fill from query params, e.g. /shop?category=Dell%20Latitude%20Series
    this.route.queryParams.subscribe((params) => {
      this.selectedCategory = params['category'] || 'All';
      this.applyFilters();
    });

    this.applyFilters();
  }

  applyFilters(): void {
    this.products = this.allProducts.filter((p) => {
      const categoryOk = this.selectedCategory === 'All' || p.category === this.selectedCategory;
      const brandOk = this.selectedBrand === 'All' || p.brand === this.selectedBrand;
      const priceOk = (p.priceRange ? p.priceRange.min : p.price) <= this.maxPrice;
      return categoryOk && brandOk && priceOk;
    });
  }

  resetFilters(): void {
    this.selectedCategory = 'All';
    this.selectedBrand = 'All';
    this.maxPrice = 15000;
    this.applyFilters();
  }
}