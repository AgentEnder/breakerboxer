import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User, UserActions, UserState } from '@tbs/user';
import { BaseComponent } from '@tbs/shared';

import { TitleService } from '../services';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tbs-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent extends BaseComponent {
  @Input() hideNavToggle = true;
  @Output() public navToggle = new EventEmitter<void>();

  public loggedInUser: User = null;

  constructor(public title: TitleService, public store: Store) {
    super();
    this.store.select(UserState.selectCurrentUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe(x => {
      console.log(x);
      this.loggedInUser = x;
    });
  }

  logIn(): void {
    this.store.dispatch(UserActions.logIn());
  }
  
  logOut(): void {
    this.store.dispatch(UserActions.logOut());
  }
}
