import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

import { map, switchMap, take, takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { BaseComponent } from '@tbs/shared';
import { UIState } from '@tbs/xplat/core';
import { BabyBabbleNamesService } from './state/names.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent extends BaseComponent {
  title = 'Baby Babble';

  dark$ = this.store.select(UIState.selectDarkMode).pipe(takeUntil(this.destroy$));

  constructor(
    public store: Store,
    private overlayContainer: OverlayContainer,
    private service: BabyBabbleNamesService,
    private snackbar: MatSnackBar,
    private clipboard: Clipboard
  ) {
    super();
    // Overlays are used in MatMenu, but are part of the cdk vs angular material.
    // They are also not attached underneath the dark-theme element directly.
    // This requires some extra work.
    const container = this.overlayContainer.getContainerElement();

    this.dark$.subscribe((x) => {
      if (x) {
        container.classList.add('dark-theme');
      } else {
        container.classList.remove('dark-theme');
      }
    });
  }

  createShareToken(): void {
    this.service
      .createShareToken()
      .pipe(
        switchMap((x) =>
          this.snackbar
            .open(`Share Token Created:  ${x}`, 'Copy')
            .afterDismissed()
            .pipe(map((y) => ({ token: x, dismissEvent: y })))
        ),
        take(1)
      )
      .subscribe((x) => {
        if (x.dismissEvent.dismissedByAction) {
          this.clipboard.copy(x.token);
        }
      });
  }
}
