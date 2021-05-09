import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

import { BaseComponent } from '@tbs/xplat/core';
import { isMatch } from 'micromatch';

@Component({
  selector: 'tbs-home',
  templateUrl: 'home.component.html',
  styles: [
    `
      .matches {
        color: var(--primary);
        font-weight: bold;
      }
    `,
  ],
})
export class HomeComponent extends BaseComponent {
  pattern: string = null;

  @ViewChild('indicators') indicators: ElementRef<HTMLElement>;
  @ViewChild('filesField') filesField: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {
    super();
  }

  updatePattern(ev: KeyboardEvent) {
    const target = ev.target as HTMLInputElement;
    this.pattern = target.value;
    this.updateIndicators();
  }

  updateIndicators() {
    const childCount = this.filesField.nativeElement.children.length;
    for (let idx = 0; idx < childCount; idx++) {
      const element = this.filesField.nativeElement.children.item(idx);
      const matches = isMatch(element.innerHTML, this.pattern);
      if (matches) {
        this.renderer.addClass(element, 'matches');
      } else {
        this.renderer.removeClass(element, 'matches');
      }
    }
  }
}
