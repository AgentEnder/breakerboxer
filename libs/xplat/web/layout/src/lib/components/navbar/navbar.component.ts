import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@tbs/shared';
import { User, UserActions, UserState } from '@tbs/user';

import { TitleService } from '../../services';
import { UIActions, UIState } from '@tbs/xplat/core';

@Component({
  selector: 'tbs-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent extends BaseComponent {
  @Output() public navToggle = new EventEmitter<void>();

  public loggedInUser: User = null;

  authAvailable$;
  showSideNav$;

  constructor(public title: TitleService, protected store: Store) {
    super();
    this.store
      .select(UserState.selectCurrentUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((x) => {
        this.loggedInUser = x;
      });

    this.authAvailable$ = this.store.select(UserState.selectAuthAvailable).pipe(takeUntil(this.destroy$));
    this.showSideNav$ = this.store.select(UIState.selectShowSidebarCollapse).pipe(takeUntil(this.destroy$));
  }

  logIn(): void {
    this.store.dispatch(UserActions.logIn());
  }

  logOut(): void {
    this.store.dispatch(UserActions.logOut());
  }

  toggleSideNav(): void {
    this.store.dispatch(UIActions.toggleSidebarCollapsed({}));
  }
}
