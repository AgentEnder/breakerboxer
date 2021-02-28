import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDrawerMode } from '@angular/material/sidenav';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';

import { BaseComponent, UIActions, UIState } from '@tbs/xplat/core';

import { MenuItem } from '../../models';

@Component({
  selector: 'tbs-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent extends BaseComponent implements OnDestroy {
  public show$: Observable<boolean>;

  mode: MatDrawerMode = 'side';

  topGap = 64;

  @Input() public routes: MenuItem[] = [];

  public toggleSidenav(): void {
    this.store.dispatch(UIActions.toggleSidebarCollapsed({}));
  }

  constructor(breakpoints: BreakpointObserver, public activatedRoute: ActivatedRoute, private store: Store) {
    super();

    breakpoints
      .observe([Breakpoints.Handset])
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ matches }) => {
        if (matches) {
          // Mobile
          this.mode = 'over';
          this.topGap = 56;
          this.store.dispatch(UIActions.toggleSidebarCollapsed({ state: false }));
        } else {
          this.mode = 'side';
          this.topGap = 64;
          this.store.dispatch(UIActions.toggleSidebarCollapsed({ state: true }));
        }
      });

    this.show$ = store.select(UIState.selectCollapseSidebar).pipe(takeUntil(this.destroy$));

    this.store.dispatch(UIActions.showSidebarCollapse({ state: true }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(UIActions.showSidebarCollapse({ state: false }));
  }
}
