import { Component } from '@angular/core';
import { CategoryBanner, Product } from './core/models/product.model';
import { ProductService } from './core/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tecnalogya';

  categoryBanners: CategoryBanner[] = this.productService.getCategoryBanners();
  bestSellers: Product[] = this.productService.getBestSellers();

  constructor(private productService: ProductService) {}
}
