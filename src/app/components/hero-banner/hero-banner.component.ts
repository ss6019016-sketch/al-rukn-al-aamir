import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface HeroSlide {
  badge: string;
  heading: string;
  cta1: string;
  cta2: string;
  /** Use either a background video OR a background image — video takes priority if set */
  videoSrc?: string;
  imageSrc: string;
}

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css'],
})
export class HeroBannerComponent {
 slides: HeroSlide[] = [
  {
    badge: 'A-GRADE REFURBISHED LAPTOPS',
    heading: 'Certified Refurbished Laptops Tested for Performance and Reliability',
    cta1: 'Send Inquiry',
    cta2: 'Inventory',
    videoSrc: 'assets/videos/laptop-video.mp4',
    imageSrc: 'assets/images/hero-banner-1.jpg',
  },
    {
      badge: 'PREMIUM TECHNOLOGY SUPPLY',
      heading: 'Your Trusted Source for Bulk Laptops & IT Equipment',
      cta1: 'Want To Sell',
      cta2: 'Send Inquiry',
      videoSrc: 'assets/videos/laptop-video.mp4',
      imageSrc: 'assets/images/hero-banner-2.jpg',
    },
    {
      badge: 'TRUSTED GLOBAL MARKETPLACE',
      heading: 'Wholesale Deals on High-Quality Renewed Laptops Worldwide',
      cta1: 'Want To Buy',
      cta2: 'Inventory',
      videoSrc: 'assets/videos/laptop-video.mp4',
      imageSrc: 'assets/images/hero-banner-3.jpg',
    },
  ];

  active = 0;
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(private router: Router) {
    this.startAutoplay();
  }

  setActive(i: number): void {
    this.active = i;
    this.restartAutoplay();
  }

  next(): void {
    this.active = (this.active + 1) % this.slides.length;
  }

  handleCta(label: string): void {
    switch (label) {
      case 'Inventory':
        this.router.navigate(['/shop']);
        break;
      case 'Send Inquiry':
        this.router.navigate(['/contact-us']);
        break;
      case 'Want To Sell':
        this.router.navigate(['/wholesale'], { queryParams: { action: 'sell' } });
        break;
      case 'Want To Buy':
        this.router.navigate(['/wholesale'], { queryParams: { action: 'buy' } });
        break;
      default:
        this.router.navigate(['/shop']);
    }
  }

  private startAutoplay(): void {
    this.timer = setInterval(() => this.next(), 6000);
  }

  private restartAutoplay(): void {
    if (this.timer) clearInterval(this.timer);
    this.startAutoplay();
  }

  onVideoError(slide: HeroSlide): void {
  console.error(`Video load failed: ${slide.videoSrc} — check the path and that the file exists in src/assets/videos/`);
}
}