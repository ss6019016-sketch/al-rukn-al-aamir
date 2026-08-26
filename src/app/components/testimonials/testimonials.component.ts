import { Component } from '@angular/core';
import { Testimonial } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = this.productService.getTestimonials();

  constructor(private productService: ProductService) {}
}
