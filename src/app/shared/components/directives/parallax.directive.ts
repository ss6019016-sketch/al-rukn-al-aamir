import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Usage: <img appParallax [parallaxStrength]="30" [parallaxScale]="1.14" src="..." />
 * IMPORTANT: parent container overflow:hidden ho aur image thodi scaled honi chahiye.
 */
@Directive({
  selector: '[appParallax]',
})
export class ParallaxDirective implements AfterViewInit, OnDestroy {
  @Input() parallaxStrength = 40;
  @Input() parallaxScale = 1;

  private st?: ScrollTrigger;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
    this.st?.kill();
  }
}