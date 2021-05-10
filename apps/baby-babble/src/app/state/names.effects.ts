import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { UserState } from '@tbs/user';

import { BabyBabbleNamesActions } from './names.actions';
import { BabyBabbleNamesService } from './names.service';

@Injectable()
export class BabyBabbleNamesEffects {
  likeName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BabyBabbleNamesActions.likeName),
      withLatestFrom(this.store.select(UserState.selectCurrentUser)),
      mergeMap(([action, user]) =>
        user
          ? this.service.likeName(user.uid, action.name).pipe(
              map(() => BabyBabbleNamesActions.likeNameSuccess({ name: action.name })),
              catchError((error) => of(BabyBabbleNamesActions.likeNameFailed({ error })))
            )
          : of(BabyBabbleNamesActions.likeNameSuccess({ name: action.name }))
      )
    );
  });

  dislikeName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BabyBabbleNamesActions.dislikeName),
      withLatestFrom(this.store.select(UserState.selectCurrentUser)),
      mergeMap(([action, user]) =>
        user
          ? this.service.dislikeName(user.uid, action.name).pipe(
              map(() => BabyBabbleNamesActions.dislikeNameSuccess({ name: action.name })),
              catchError((error) => of(BabyBabbleNamesActions.dislikeNameFailed({ error })))
            )
          : of(BabyBabbleNamesActions.dislikeNameSuccess({ name: action.name }))
      )
    );
  });

  constructor(private store: Store, private actions$: Actions, private service: BabyBabbleNamesService) {}
}
