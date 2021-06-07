import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { UserState } from '@tbs/user';

import { BabyBabbleNamesActions } from './names.actions';
import { BabyBabbleNamesService } from './names.service';
import { BabyBabbleNamesState } from './names.state';

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

  loadLikedNames$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BabyBabbleNamesActions.loadLikedNames),
      withLatestFrom(this.store.select(UserState.selectCurrentUser)),
      withLatestFrom(this.store.select(BabyBabbleNamesState.selectLikes)),
      mergeMap(([[, user], likes]) =>
        user
          ? this.service.loadLikedNames(user.uid).pipe(
              map((names) => BabyBabbleNamesActions.loadLikedNamesSuccess({ names })),
              catchError((error) => of(BabyBabbleNamesActions.loadLikedNamesFailed({ error })))
            )
          : of(BabyBabbleNamesActions.loadLikedNamesSuccess({ names: likes }))
      )
    );
  });

  updateNameStrength$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BabyBabbleNamesActions.updateNameStrength),
      withLatestFrom(this.store.select(UserState.selectCurrentUser)),
      mergeMap(([action, user]) =>
        user
          ? this.service.updateChoiceStrength(user.uid, action.choice.name, action.choice.strength).pipe(
              map(() => BabyBabbleNamesActions.updateNameStrengthSuccess({ choice: action.choice })),
              catchError((error) => of(BabyBabbleNamesActions.loadLikedNamesFailed({ error })))
            )
          : of(BabyBabbleNamesActions.updateNameStrengthSuccess({ choice: action.choice }))
      )
    );
  });

  constructor(private store: Store, private actions$: Actions, private service: BabyBabbleNamesService) {}
}
