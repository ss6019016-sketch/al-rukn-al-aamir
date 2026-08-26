import { Component } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-deal-of-day',
  templateUrl: './deal-of-day.component.html',
  styleUrls: ['./deal-of-day.component.css'],
})
export class DealOfDayComponent {
  products: Product[] = this.productService.getDealOfTheDay();

  constructor(private productService: ProductService) {}
}
