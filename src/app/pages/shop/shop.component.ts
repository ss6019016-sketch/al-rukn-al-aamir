import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  category = '';
  brand = '';
  search = '';
  breadcrumbCategory = '';
  breadcrumbSubcategory = '';

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get('category') || '';
      this.brand = params.get('brand') || '';
      this.search = params.get('search') || '';
      this.breadcrumbCategory = this.category || (this.brand ? 'Brand' : 'All Products');
      this.breadcrumbSubcategory = this.brand || '';
      this.products = this.getFilteredProducts();
    });
  }

  get pageTitle(): string {
    return this.search || this.brand || this.category || 'All Products';
  }

  private getFilteredProducts(): Product[] {
    const searchTerm = this.search.toLowerCase();
    const categoryTerm = this.category.toLowerCase();
    const brandTerm = this.brand.toLowerCase();
    return this.productService.getAllProducts().filter((product) => {
      const searchable = `${product.name} ${product.category} ${product.brand}`.toLowerCase();
      return (!searchTerm || searchable.includes(searchTerm))
        && (!categoryTerm || product.category.toLowerCase().includes(categoryTerm))
        && (!brandTerm || product.brand.toLowerCase() === brandTerm);
    });
  }
}
