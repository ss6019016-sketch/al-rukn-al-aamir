import { Component } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-limited-stock',
  templateUrl: './limited-stock.component.html',
  styleUrls: ['./limited-stock.component.css'],
})
export class LimitedStockComponent {
  products: Product[] = this.productService.getLimitedStock();

  constructor(private productService: ProductService) {}
}
