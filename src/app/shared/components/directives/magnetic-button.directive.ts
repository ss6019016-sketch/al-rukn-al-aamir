import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import gsap from 'gsap';

@Directive({
  selector: '[appMagnetic]',
})
export class MagneticButtonDirective implements OnInit, OnDestroy {
  private xTo?: (value: number) => void;
  private yTo?: (value: number) => void;
  private enabled = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.enabled = finePointer && !reducedMotion;

    if (this.enabled) {
      this.xTo = gsap.quickTo(this.el.nativeElement, 'x', { duration: 0.5, ease: 'power3.out' });
      this.yTo = gsap.quickTo(this.el.nativeElement, 'y', { duration: 0.5, ease: 'power3.out' });
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (!this.enabled) return;
    const rect = this.el.nativeElement.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    this.xTo?.(relX * 0.35);
    this.yTo?.(relY * 0.35);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.enabled) return;
    this.xTo?.(0);
    this.yTo?.(0);
  }

  ngOnDestroy(): void {
    gsap.killTweensOf(this.el.nativeElement);
  }
}