import { Inject, Injectable, Optional } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

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
    private actions$: Actions
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
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(UserState.selectLoggedIn).pipe(
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
          map((x: Action) => x.type === UserActions.logInSuccess({ user: null }).type)
        );
      })
    );
  }
}
