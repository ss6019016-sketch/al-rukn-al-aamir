import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

/**
 * Auto-applies to every element with class "section-title" — no template
 * changes needed anywhere. Just declare ScrambleTextDirective in
 * app.module.ts (or a shared module) and it works site-wide.
 *
 * When the title scrolls into view, its text decodes from random
 * tech-looking characters into the real text.
 */
@Directive({
  selector: '.section-title',
})
export class ScrambleTextDirective implements OnInit, OnDestroy {
  private originalText = '';
  private observer?: IntersectionObserver;
  private hasRun = false;
  private readonly scrambleChars = '01</>{}#$%ABCDEFGHIJ';

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // respect accessibility setting — skip the effect entirely
    }

    this.originalText = this.el.nativeElement.textContent?.trim() || '';
    if (!this.originalText) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasRun) {
            this.hasRun = true;
            this.runScramble();
            this.observer?.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  private runScramble(): void {
    const target = this.originalText;
    const el = this.el.nativeElement;
    let frame = 0;
    const totalFrames = 24;

    const interval = setInterval(() => {
      frame++;
      const revealCount = Math.floor((frame / totalFrames) * target.length);

      let output = '';
      for (let i = 0; i < target.length; i++) {
        if (target[i] === ' ') {
          output += ' ';
        } else if (i < revealCount) {
          output += target[i];
        } else {
          output += this.scrambleChars[Math.floor(Math.random() * this.scrambleChars.length)];
        }
      }
      el.textContent = output;

      if (frame >= totalFrames) {
        el.textContent = target;
        clearInterval(interval);
      }
    }, 30);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}