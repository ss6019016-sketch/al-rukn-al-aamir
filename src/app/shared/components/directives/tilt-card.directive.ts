import { Directive, ElementRef, HostListener, OnDestroy, Renderer2 } from '@angular/core';
import { watchMobileViewport } from '../../utils/viewport';

@Directive({
  selector: '.product-card',
})
export class TiltCardDirective implements OnDestroy {
  private reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private glareEl?: HTMLElement;
  private mobileDisabled = false;
  private stopWatchingViewport?: () => void;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {
    if (this.reducedMotion) return;

    this.renderer.setStyle(this.el.nativeElement, 'transform-style', 'preserve-3d');
    this.renderer.setStyle(this.el.nativeElement, 'will-change', 'transform');

    this.glareEl = this.renderer.createElement('span');
    this.renderer.addClass(this.glareEl, 'tilt-glare');
    this.renderer.appendChild(this.el.nativeElement, this.glareEl);

    this.stopWatchingViewport = watchMobileViewport((isMobile) => {
      this.mobileDisabled = isMobile;
      if (isMobile) {
      
        this.renderer.removeStyle(this.el.nativeElement, 'transform');
        if (this.glareEl) {
          this.renderer.setStyle(this.glareEl, 'background', 'transparent');
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.stopWatchingViewport?.();
  }

  private resetTransform(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      'perspective(700px) rotateX(0) rotateY(0) translateY(0)'
    );
    if (this.glareEl) {
      this.renderer.setStyle(this.glareEl, 'background', 'transparent');
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (this.reducedMotion || this.mobileDisabled) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;

    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
    );

    if (this.glareEl) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      this.renderer.setStyle(
        this.glareEl,
        'background',
        `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.35), transparent 55%)`
      );
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.reducedMotion || this.mobileDisabled) return;

    this.resetTransform();
  }
}