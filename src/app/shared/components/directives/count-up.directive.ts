import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import gsap from 'gsap';

@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective implements AfterViewInit, OnDestroy {
  @Input('appCountUp') target = '';

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const el = this.el.nativeElement;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const match = this.target.match(/^([\d,.]+)(.*)$/);
    if (!match) return;

    const numericPart = parseFloat(match[1].replace(/,/g, ''));
    const suffix = match[2];
    if (isNaN(numericPart)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = { val: 0 };
            gsap.to(counter, {
              val: numericPart,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = Math.floor(counter.val).toLocaleString() + suffix;
              },
              onComplete: () => {
                el.textContent = this.target;
              },
            });
            this.observer?.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}