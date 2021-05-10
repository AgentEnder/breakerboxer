import { Inject, Injectable, Optional } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { IAuthService } from '../models';
import { AUTH_SERVICE } from '../tokens';
import { UserActions } from './user.action';

@Injectable()
export class UserEffects implements OnInitEffects {
  onLogIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logIn),
      switchMap(() =>
        this.authService.signIn$().pipe(mergeMap((user) => [UserActions.logInSuccess({ user })]))
      ),
      catchError((error) => of(UserActions.logInFailed({ error })))
    )
  );

  onLogOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logOut),
      switchMap(() => this.authService.signOut$().pipe(mergeMap(() => [UserActions.logOutSuccess()])))
    )
  );

  constructor(
    @Optional() @Inject(AUTH_SERVICE) private authService: IAuthService,
    private actions$: Actions
  ) {}

  ngrxOnInitEffects(): Action {
    return UserActions.markAuthAvailable({ available: !!this.authService });
  }
}
