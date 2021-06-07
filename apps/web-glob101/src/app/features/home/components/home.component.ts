import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

import { matcher } from 'micromatch';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { GlobPart, parseGlobPattern } from '@tbs/glob101-util';
import { BaseComponent } from '@tbs/xplat/core';

import { SharedGlobsService } from '../../shared/glob101-data.service';

@Component({
  selector: 'tbs-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements AfterViewInit {
  pattern: string = null;

  @ViewChild('filesField') filesField: ElementRef<HTMLElement>;

  patternFormControl = new FormControl();
  parts: GlobPart[];
  loading = false;
  error: string;

  constructor(
    private renderer: Renderer2,
    private service: SharedGlobsService,
    private snackBar: MatSnackBar,
    private clipboard: Clipboard,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.patternFormControl.valueChanges
      .pipe(
        tap(() => {
          this.loading = true;
          this.error = null;
        }),
        debounceTime(500),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.updatePattern(value);
      });

    fromEvent(this.filesField.nativeElement, 'keydown')
      .pipe(
        tap(() => this.clearIndicators()),
        debounceTime(500),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateIndicators();
      });

    this.loadPatternDataFromURL();
  }

  loadPatternDataFromURL(): void {
    this.route.paramMap
      .pipe(
        map((x) => x.get('id')),
        filter((x) => !!x),
        switchMap((x) => this.service.retrieveGlobInfoFromLinkId(x)),
        takeUntil(this.destroy$)
      )
      .subscribe((x) => {
        this.setTestStringInnerHTML(x.testData);
        this.patternFormControl.setValue(x.pattern);
      });

    this.route.queryParamMap
      .pipe(
        map((x) => ({ pattern: x.get('pattern'), testStrings: x.get('testStrings') })),
        filter((x) => !!x.pattern),
        takeUntil(this.destroy$)
      )
      .subscribe((x) => {
        if (x.testStrings.length) {
          this.setTestStringInnerHTML(x.testStrings);
        }
        this.patternFormControl.setValue(x.pattern);
      });
  }

  updatePattern(pattern: string) {
    this.pattern = pattern;
    try {
      this.parts = parseGlobPattern(this.pattern);
    } catch (e) {
      this.error = e;
    }
    this.updateIndicators();
  }

  updateIndicators() {
    const m = this.pattern.length ? matcher(this.pattern) : () => false;
    iterateChildHTMLElements(this.filesField.nativeElement, (element) => {
      const matches = m(element.innerHTML);
      if (matches) {
        this.renderer.addClass(element, 'matches');
      } else {
        this.renderer.removeClass(element, 'matches');
      }
    });
    this.loading = false;
  }

  clearIndicators() {
    iterateChildHTMLElements(this.filesField.nativeElement, (element) => {
      this.renderer.removeClass(element, 'matches');
    });
  }

  shareCurrentGlob() {
    this.service
      .shareGlob(this.pattern, this.getTestStringsValue())
      .pipe(
        switchMap((x) =>
          this.snackBar
            .open(`Shareable Link Created!`, 'Copy')
            .afterDismissed()
            .pipe(map((y) => ({ link: x, dismissEvent: y })))
        )
      )
      .subscribe((x) => {
        if (x.dismissEvent.dismissedByAction) {
          this.clipboard.copy(x.link);
        }
      });
  }

  getTestStringsValue(): string {
    const testStrings: string[] = [];
    iterateChildHTMLElements(this.filesField.nativeElement, (el) => {
      testStrings.push(el.textContent);
    });
    return testStrings.join(',');
  }

  setTestStringInnerHTML(testStrings: string) {
    const ff = this.filesField.nativeElement;
    for (let idx = ff.children.length - 1; idx >= 0; --idx) {
      console.log(idx);
      ff.removeChild(ff.children.item(idx));
    }
    testStrings.split(',').forEach((testString) => {
      const div = this.renderer.createElement('div');
      const text = this.renderer.createText(testString);
      this.renderer.appendChild(div, text);
      this.renderer.appendChild(ff, div);
    });
  }
}

function iterateChildHTMLElements(parent: HTMLElement, callback: (el: Element) => void) {
  for (let idx = 0; idx < parent.children.length; idx++) {
    const child = parent.children.item(idx);
    callback(child);
  }
}
