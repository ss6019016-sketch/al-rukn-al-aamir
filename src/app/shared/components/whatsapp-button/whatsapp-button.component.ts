import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.css'],
})
export class WhatsappButtonComponent {
  // Boss ka asal WhatsApp business number yahan daalna (country code ke sath, + nahi lagana)
  whatsappNumber = '971526511946';
  message = 'Hi, I am interested in your laptops.';

  get whatsappLink(): string {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.message)}`;
  }
}