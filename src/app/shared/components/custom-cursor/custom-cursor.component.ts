import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  templateUrl: './custom-cursor.component.html',
  styleUrls: ['./custom-cursor.component.css'],
})
export class CustomCursorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dot') dot?: ElementRef<HTMLDivElement>;
  @ViewChild('ring') ring?: ElementRef<HTMLDivElement>;

  active = false;
  private cleanupListeners: Array<() => void> = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || reducedMotion) {
      return;
    }

    this.active = true;
    this.renderer.addClass(document.body, 'custom-cursor-active');
  }

  ngAfterViewInit(): void {
    if (!this.active || !this.dot || !this.ring) {
      return;
    }

    this.cleanupListeners.push(
      this.renderer.listen('document', 'pointermove', (event: PointerEvent) => {
        this.renderer.setStyle(this.dot?.nativeElement, 'left', `${event.clientX}px`);
        this.renderer.setStyle(this.dot?.nativeElement, 'top', `${event.clientY}px`);
        this.renderer.setStyle(this.ring?.nativeElement, 'left', `${event.clientX}px`);
        this.renderer.setStyle(this.ring?.nativeElement, 'top', `${event.clientY}px`);
      }),
      this.renderer.listen('document', 'pointerover', (event: PointerEvent) => {
        const target = event.target as Element | null;
        if (target?.closest('a, button, .btn-accent, .product-card, input, select')) {
          this.renderer.addClass(this.ring?.nativeElement, 'is-hovering');
        }
      }),
      this.renderer.listen('document', 'pointerout', (event: PointerEvent) => {
        const target = event.target as Element | null;
        const relatedTarget = event.relatedTarget as Element | null;
        const clickable = target?.closest('a, button, .btn-accent, .product-card, input, select');
        const stillClickable = relatedTarget?.closest('a, button, .btn-accent, .product-card, input, select');

        if (clickable && !stillClickable) {
          this.renderer.removeClass(this.ring?.nativeElement, 'is-hovering');
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.cleanupListeners.forEach((cleanup) => cleanup());
    if (this.active) {
      this.renderer.removeClass(document.body, 'custom-cursor-active');
    }
  }
}
