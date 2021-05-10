import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { matcher } from 'micromatch';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { GlobPart, parseGlobPattern } from '@tbs/glob101-util';
import { BaseComponent } from '@tbs/xplat/core';

@Component({
  selector: 'tbs-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements AfterViewInit {
  pattern: string = null;

  @ViewChild('indicators') indicators: ElementRef<HTMLElement>;
  @ViewChild('filesField') filesField: ElementRef<HTMLElement>;

  patternFormControl = new FormControl();
  parts: GlobPart[];

  constructor(private renderer: Renderer2) {
    super();
  }

  ngAfterViewInit(): void {
    this.patternFormControl.valueChanges
      .pipe(debounceTime(250), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.updatePattern(value);
      });
  }

  updatePattern(pattern: string) {
    this.pattern = pattern;
    try {
      this.parts = parseGlobPattern(this.pattern);
    } catch (e) {
      console.log(e);
    }
    this.updateIndicators();
  }

  updateIndicators() {
    const childCount = this.filesField.nativeElement.children.length;
    const m = this.pattern.length ? matcher(this.pattern) : () => false;
    for (let idx = 0; idx < childCount; idx++) {
      const element = this.filesField.nativeElement.children.item(idx);
      const matches = m(element.innerHTML);
      if (matches) {
        this.renderer.addClass(element, 'matches');
      } else {
        this.renderer.removeClass(element, 'matches');
      }
    }
  }
}
