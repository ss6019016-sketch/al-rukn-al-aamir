import { Component } from '@angular/core';

@Component({ selector: 'app-checkout', templateUrl: './checkout.component.html' })
export class CheckoutComponent {
  submitted = false;
  placeOrder(): void { this.submitted = true; }
}
