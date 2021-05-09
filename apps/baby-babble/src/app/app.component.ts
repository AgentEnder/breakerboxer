import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@tbs/shared';
import { UIState } from '@tbs/xplat/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent extends BaseComponent {
  title = 'Baby Babble';

  dark$ = this.store.select(UIState.selectDarkMode).pipe(takeUntil(this.destroy$));

  constructor(public store: Store, private overlayContainer: OverlayContainer) {
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
}
