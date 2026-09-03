import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { watchMobileViewport } from '../../utils/viewport';

gsap.registerPlugin(ScrollTrigger);
@Directive({
  selector: '[appParallax]',
})
export class ParallaxDirective implements AfterViewInit, OnDestroy {
  @Input() parallaxStrength = 40;
  @Input() parallaxScale = 1;

  private st?: ScrollTrigger;
  private stopWatchingViewport?: () => void;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.stopWatchingViewport = watchMobileViewport((isMobile) => {
      if (isMobile) {
        this.st?.kill();
        this.st = undefined;
        gsap.set(this.el.nativeElement, { y: 0, scale: 1 });
      } else if (!this.st) {
        this.createScrollTrigger();
      }
    });
  }

  private createScrollTrigger(): void {
    const trigger = this.el.nativeElement.closest('section') ?? this.el.nativeElement;

    this.st = ScrollTrigger.create({
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const y = (self.progress - 0.5) * this.parallaxStrength;
        gsap.set(this.el.nativeElement, { y, scale: this.parallaxScale });
      },
    });
  }

  ngOnDestroy(): void {
    this.stopWatchingViewport?.();
    this.st?.kill();
  }
}