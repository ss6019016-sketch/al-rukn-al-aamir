import { Component, Input } from '@angular/core';
import { CategoryBanner, Product } from '../../core/models/product.model';

@Component({
  selector: 'app-category-banner',
  templateUrl: './category-banner.component.html',
  styleUrls: ['./category-banner.component.css'],
})
export class CategoryBannerComponent {
  @Input() banner!: CategoryBanner;
  @Input() products: Product[] = [];
  @Input() reverse = false;
}
