import { Inject, Injectable, Optional } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable, of, timer } from 'rxjs';
import { delayWhen, map, switchMap, take, tap } from 'rxjs/operators';

import { Action, Store } from '@ngrx/store';

import { UserActions, UserState } from '../state';
import { AUTH_SERVICE } from '../tokens';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    @Optional() @Inject(AUTH_SERVICE) private authService,
    private store: Store,
    private actions$: Actions,
    private router: Router
  ) {
    if (!authService) {
      console.warn(
        '%cAuthGuard used with no available AuthService! This will always reject users.',
        'font-size: x-large'
      );
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
    return this.store.select(UserState.selectLoggedIn).pipe(
      delayWhen((x) => (x ? of(true) : timer(1000))),
      tap((x) => {
        if (!x) {
          this.store.dispatch(UserActions.logIn());
        }
      }),
      switchMap((loggedIn) => {
        if (loggedIn) {
          return of(true);
        }
        return this.actions$.pipe(
          ofType(UserActions.logInSuccess, UserActions.logInFailed),
          take(1),
          switchMap((x: Action) => {
            console.log(x);
            return x.type === UserActions.logInSuccess.type ? of(true) : of(this.router.createUrlTree(['/']));
          })
        );
      })
    );
  }
}
