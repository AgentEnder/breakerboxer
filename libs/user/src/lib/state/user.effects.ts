import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';

import { AuthService } from '../services';
import { UserActions } from './user.action';

@Injectable()
export class UserEffects {
    onLogIn$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.logIn),
        switchMap(() => this.authService.googleSignIn$().pipe(
            mergeMap((user) => [
                UserActions.logInSuccess({ user })
            ])
        )),
        catchError((error) => of(UserActions.logInFailed({ error })))
    ));

    onLogOut$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.logOut),
        switchMap(() => this.authService.signOut$().pipe(
            mergeMap(() => [
                UserActions.logOutSuccess()
            ])
        ))
    ));

    constructor(
        private authService: AuthService,
        private actions$: Actions,
    ) { }
}
