import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';

interface HeroSlide {
  badge: string;
  heading: string;
  cta1: string;
  cta2: string;
  videoSrc?: string;
  imageSrc: string;
}

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css'],
})
export class HeroBannerComponent implements AfterViewInit, OnDestroy {
  slides: HeroSlide[] = [
    {
      badge: 'A-GRADE REFURBISHED LAPTOPS',
      heading: 'Certified Refurbished Laptops Tested for Performance and Reliability',
      cta1: 'Send Inquiry',
      cta2: 'Inventory',
      videoSrc: 'assets/videos/laptop-video.mp4',
      imageSrc: 'assets/images/hero-banner-1.svg',
    },
    {
      badge: 'PREMIUM TECHNOLOGY SUPPLY',
      heading: 'Your Trusted Source for Bulk Laptops & IT Equipment',
      cta1: 'Want To Sell',
      cta2: 'Send Inquiry',
      videoSrc: 'assets/videos/laptop-video.mp4',
      imageSrc: 'assets/images/hero-banner-2.svg',
    },
    {
      badge: 'TRUSTED GLOBAL MARKETPLACE',
      heading: 'Wholesale Deals on High-Quality Renewed Laptops Worldwide',
      cta1: 'Want To Buy',
      cta2: 'Inventory',
      videoSrc: 'assets/videos/laptop-video.mp4',
      imageSrc: 'assets/images/hero-banner-3.svg',
    },
  ];

  active = 0;
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(private router: Router, private el: ElementRef<HTMLElement>) {
    this.startAutoplay();
  }

  ngAfterViewInit(): void {
    this.playEntrance();
  }

  setActive(i: number): void {
    this.active = i;
    this.restartAutoplay();
    this.playEntrance();
  }

  next(): void {
    this.active = (this.active + 1) % this.slides.length;
    this.playEntrance();
  }

  private playEntrance(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setTimeout(() => {
      const root = this.el.nativeElement.querySelector('.hero-slide.active');
      if (!root) return;

      const badge = root.querySelector('.hero-badge');
      const heading = root.querySelector('.hero-heading');
      const buttons = root.querySelectorAll('.hero-content .btn');

      gsap
        .timeline()
        .fromTo(badge, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
        .fromTo(heading, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .fromTo(buttons, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.35');
    }, 50);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
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