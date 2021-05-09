import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BaseComponent } from '@tbs/xplat/core';
import { isMatch } from 'micromatch';
import { parseGlobPattern } from '@tbs/glob101-util';
import { bufferTime, debounceTime, takeUntil } from 'rxjs/operators';

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
  parts: import('c:/Users/craig/source/repos/tbs-monorepo/libs/glob101-util/src/lib/models/glob-part.model').GlobPart[];

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
    this.parts = parseGlobPattern(this.pattern);
    this.updateIndicators();
  }

  updateIndicators() {
    const childCount = this.filesField.nativeElement.children.length;
    for (let idx = 0; idx < childCount; idx++) {
      if (this.pattern?.length) {
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
}
