import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@tbs/shared';
import { User, UserActions, UserState } from '@tbs/user';

import { TitleService } from '../services';

@Component({
  selector: 'tbs-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent extends BaseComponent {
  @Input() hideNavToggle = true;
  @Output() public navToggle = new EventEmitter<void>();

  public loggedInUser: User = null;

  authAvailable$

  constructor(public title: TitleService, protected store: Store) {
    super();
    this.store.select(UserState.selectCurrentUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe(x => {
      this.loggedInUser = x;
    });

    this.authAvailable$ = this.store.select(UserState.selectAuthAvailable).pipe(
      takeUntil(this.destroy$)
    );
  }

  logIn(): void {
    this.store.dispatch(UserActions.logIn());
  }

  logOut(): void {
    this.store.dispatch(UserActions.logOut());
  }
}
