// footer.component.ts
import { Component } from '@angular/core';

interface FooterLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  quickLinks: FooterLink[] = [
    { label: 'Home', route: '/' },
    { label: 'About Us', route: '/about-us' },
    { label: 'Shop', route: '/shop' },
    { label: 'Blogs', route: '/blogs' },
    { label: 'Wholesale', route: '/wholesale' },
    { label: 'Contact Us', route: '/contact-us' },
  ];

  accountLinks: FooterLink[] = [
    { label: 'Wishlist', route: '/wishlist' },
    { label: 'Checkout', route: '/checkout' },
  ];

  customerCareLinks: FooterLink[] = [
    { label: 'Our Team', route: '/about-us' },
    { label: 'FAQs', route: '/contact-us' },
    { label: 'Terms Of Use', route: '/about-us' },
    { label: 'Privacy Policy', route: '/contact-us' },
  ];

  currentYear = new Date().getFullYear();

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}