import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import gsap from 'gsap';
import { CategoryBanner, Product } from './core/models/product.model';
import { ProductService } from './core/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Al Rukn Al Aamir';
  loading = true;
  isAdminRoute = false;

  categoryBanners: CategoryBanner[] = this.productService.getCategoryBanners();
  bestSellers: Product[] = this.productService.getBestSellers();

  constructor(private productService: ProductService, private router: Router) {
    this.isAdminRoute = this.router.url.startsWith('/admin');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isAdminRoute = event.url.startsWith('/admin');
        this.fadeOutMain();
      }
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        this.fadeInMain();
      }
    });
  }

  ngOnInit(): void {
    window.addEventListener('load', () => this.hidePreloader());
    setTimeout(() => this.hidePreloader(), 2200);
  }

  private hidePreloader(): void {
    if (!this.loading) return;
    const overlay = document.querySelector('.app-preloader') as HTMLElement | null;
    if (!overlay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.loading = false;
      return;
    }
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.out',
      onComplete: () => {
        this.loading = false;
      },
    });
  }

  private fadeOutMain(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const main = document.querySelector('main');
    if (!main) return;
    gsap.to(main, { opacity: 0, y: 12, duration: 0.22, ease: 'power1.out' });
  }

  private fadeInMain(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const main = document.querySelector('main');
    if (!main) return;
    gsap.fromTo(main, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
  }
}