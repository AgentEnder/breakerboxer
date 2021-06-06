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
    route: ActivatedRoute
  ) {
    super();

    route.paramMap
      .pipe(
        map((x) => x.get('id')),
        filter((x) => !!x),
        switchMap((x) => this.service.retrieveGlobInfoFromLinkId(x))
      )
      .subscribe((x) => {
        this.filesField.nativeElement.innerHTML = x.testData;
        this.patternFormControl.setValue(x.pattern);
      });
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
    this.iterateChildren(this.filesField.nativeElement, (element) => {
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
    this.iterateChildren(this.filesField.nativeElement, (element) => {
      this.renderer.removeClass(element, 'matches');
    });
  }

  iterateChildren(el: HTMLElement, callback: (el: HTMLElement) => void) {
    const childCount = this.filesField.nativeElement.children.length;
    for (let idx = 0; idx < childCount; idx++) {
      const element = this.filesField.nativeElement.children.item(idx) as HTMLElement;
      callback(element);
    }
  }

  shareCurrentGlob() {
    this.service
      .shareGlob(this.pattern, this.filesField.nativeElement.innerHTML)
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
}
