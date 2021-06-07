import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SharedGlob, SharedGlobsService } from '../../shared/glob101-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tbs-my-saved-globs',
  templateUrl: './my-saved-globs.component.html',
})
export class MySavedGlobsComponent {
  public globs$: Observable<SharedGlob[]>;

  constructor(
    private service: SharedGlobsService,
    private renderer: Renderer2,
    private snackBar: MatSnackBar,
    private clipboard: Clipboard,
    private router: Router
  ) {
    this.globs$ = this.service.retrieveMySharedGlobs();
  }

  getTestStrings(el: HTMLElement, glob: SharedGlob) {
    const ff = el;
    for (let idx = ff.children.length - 1; idx >= 0; --idx) {
      console.log(idx);
      ff.removeChild(ff.children.item(idx));
    }
    glob.testData.split(',').forEach((testString) => {
      const div = this.renderer.createElement('div');
      const text = this.renderer.createText(testString);
      this.renderer.appendChild(div, text);
      this.renderer.appendChild(ff, div);
    });
  }

  getShareLink(glob: SharedGlob, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.service
      .shareGlob(glob.pattern, glob.testData)
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

  openInTab(glob: SharedGlob) {
    this.router.navigate(['/'], {
      queryParams: {
        pattern: glob.pattern,
        testStrings: glob.testData,
      },
    });
  }
}
