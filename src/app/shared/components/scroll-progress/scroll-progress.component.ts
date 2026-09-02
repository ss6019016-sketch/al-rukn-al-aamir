import { Component, HostListener } from '@angular/core';

/**
 * Fixed circuit-style scroll progress bar. Add <app-scroll-progress></app-scroll-progress>
 * as the very first element in app.component.html (before <app-header>),
 * and declare ScrollProgressComponent in app.module.ts.
 */
@Component({
  selector: 'app-scroll-progress',
  template: `
    <div class="scroll-progress-track" aria-hidden="true">
      <div class="scroll-progress-fill" [style.width.%]="progress">
        <span class="scroll-progress-pulse"></span>
      </div>
    </div>
  `,
  styleUrls: ['./scroll-progress.component.css'],
})
export class ScrollProgressComponent {
  progress = 0;

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  }
}