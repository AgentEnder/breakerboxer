import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { BaseComponent } from '@tbs/shared';
import { UIState } from '@tbs/xplat/core';

import { RatingDialogComponent } from './rating-dialog/rating-dialog.component';

@Component({
  selector: 'emu-compat-root',
  templateUrl: './app.component.html',
})
export class AppComponent extends BaseComponent {
  title = 'EmuCompat';

  dark$ = this.store.select(UIState.selectDarkMode).pipe(takeUntil(this.destroy$));

  constructor(public store: Store, private overlayContainer: OverlayContainer, private dialog: MatDialog) {
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

  showDialog(): void {
    this.dialog.open(RatingDialogComponent);
  }
}
