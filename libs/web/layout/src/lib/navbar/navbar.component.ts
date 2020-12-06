import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AuthService, User } from '@breakerboxer/user';
import { BaseComponent } from '@breakerboxer/shared';

import { TitleService } from '../services';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'breakerboxer-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent extends BaseComponent {
  @Input() hideNavToggle = true;
  @Output() public navToggle = new EventEmitter<void>();

  public loggedInUser: User = null;

  constructor(public title: TitleService, public auth: AuthService) {
    super();
    this.auth.loggedIn$.pipe(
      switchMap((status: boolean): Observable<User> => {
        if (!status) {
          return of(null);
        }
        return this.auth.user$;
      }),
      takeUntil(this.destroy$)
    ).subscribe(x => {
      console.log(x); 
      this.loggedInUser = x;
    });
  }
}
