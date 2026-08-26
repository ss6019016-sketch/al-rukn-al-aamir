import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAppendToBody]',
})
export class AppendToBodyDirective implements AfterViewInit, OnDestroy {
  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.appendChild(document.body, this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.el.nativeElement.parentNode) {
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.el.nativeElement);
    }
  }
}