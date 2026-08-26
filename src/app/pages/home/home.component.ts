import { Component } from '@angular/core';
import { CategoryBanner, Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  categoryBanners: CategoryBanner[] = this.productService.getCategoryBanners();
  bestSellers: Product[] = this.productService.getBestSellers();

  graphicLaptops: Product[] = this.productService.getProductsByCategory('Graphic');
  businessLaptops: Product[] = this.productService.getProductsByCategory('Business');
  glossyLaptops: Product[] = this.productService.getProductsByCategory('Glossy');

  constructor(private productService: ProductService) {}
}