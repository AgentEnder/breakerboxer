import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { UIActions, UIState } from '@tbs/xplat/core';
import { BaseComponent } from '@tbs/shared';

import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tbs-darkmode-switch',
  templateUrl: './dark-mode-switch.component.html',
  styleUrls: ['./dark-mode-switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DarkModeSwitchComponent extends BaseComponent {
  private _dark: boolean;
  @Input() set dark(x: boolean) {
    this.store.dispatch(UIActions.setDarkMode({ state: x }));
  }

  get dark(): boolean {
    return this._dark;
  }

  @Output() darkChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public store: Store) {
    super();
    this.store
      .select(UIState.selectDarkMode)
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((x) => {
        this._dark = x;
        this.darkChange.emit(x);
      });
  }

  darkToggle(): void {
    this.dark = !this.dark;
  }
}
