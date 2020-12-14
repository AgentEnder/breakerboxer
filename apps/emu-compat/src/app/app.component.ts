import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DarkModeService } from '@tbs/core';
import { RatingDialogComponent } from './rating-dialog/rating-dialog.component';

@Component({
  selector: 'emu-compat-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'EmuCompat';

  constructor(
    public darkService: DarkModeService,
    private overlayContainer: OverlayContainer,
    private dialog: MatDialog
  ) {
    // Overlays are used in MatMenu, but are part of the cdk vs angular material.
    // They are also not attached underneath the dark-theme element directly.
    // This requires some extra work.
    const container = this.overlayContainer.getContainerElement();

    // Without this, the theming is not applied until the dark mode has been toggled
    if (this.darkService.dark) {
      container.classList.add('dark-theme');
    }

    // When the theme is toggled, update the container's classes.
    this.darkService.dark$.subscribe((x) => {
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
