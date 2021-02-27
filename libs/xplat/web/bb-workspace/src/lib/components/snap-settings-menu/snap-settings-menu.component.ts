import { AfterViewInit, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BaseComponent } from '@tbs/shared';
import {
  BreakerboxerActions,
  BreakerboxerState,
  compareSnapSettings,
} from '@tbs/xplat/base/breakerboxer-data';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'breakerboxer-snap-settings-menu',
  templateUrl: './snap-settings-menu.component.html',
})
export class SnapSettingsMenuComponent extends BaseComponent implements AfterViewInit {
  fg: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    super();

    this.fg = this.fb.group({
      gridSnap: new FormControl(),
      angleSnap: new FormControl(),
      displayGrid: new FormControl(),
    });

    this.store
      .select(BreakerboxerState.selectSnapSettings)
      .pipe(takeUntil(this.destroy$), distinctUntilChanged(compareSnapSettings))
      .subscribe((x) => {
        this.fg.patchValue(
          {
            gridSnap: x.gridSettings.snap,
            angleSnap: x.angleSnapSettings.snap,
            displayGrid: x.gridSettings.displayGrid,
          },
          { emitEvent: false }
        );
      });
  }

  ngAfterViewInit(): void {
    this.fg.controls.gridSnap.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((x) => this.store.dispatch(BreakerboxerActions.toggleGridSnap({ gridSnap: x })));

    this.fg.controls.angleSnap.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((x) => this.store.dispatch(BreakerboxerActions.toggleAngleSnap({ angleSnap: x })));

    this.fg.controls.displayGrid.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((x) => this.store.dispatch(BreakerboxerActions.toggleDisplayGrid({ displayGrid: x })));
  }
}
