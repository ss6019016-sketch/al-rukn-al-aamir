import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRipple]',
})
export class RippleDirective {
  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {
    const host = this.el.nativeElement;
    const computed = getComputedStyle(host);
    if (computed.position === 'static') {
      this.renderer.setStyle(host, 'position', 'relative');
    }
    this.renderer.setStyle(host, 'overflow', 'hidden');
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const host = this.el.nativeElement;
    const rect = host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = this.renderer.createElement('span');

    this.renderer.addClass(ripple, 'ripple-effect');
    this.renderer.setStyle(ripple, 'width', `${size}px`);
    this.renderer.setStyle(ripple, 'height', `${size}px`);
    this.renderer.setStyle(ripple, 'left', `${event.clientX - rect.left - size / 2}px`);
    this.renderer.setStyle(ripple, 'top', `${event.clientY - rect.top - size / 2}px`);

    this.renderer.appendChild(host, ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        this.renderer.removeChild(host, ripple);
      }
    }, 600);
  }
}