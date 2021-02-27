import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from '../models';

export namespace UserState {
  export const key = 'user';

  export interface IState {
    signedInUser?: User;
    authAvailable: boolean;
  }

  export const initialState: IState = {
    authAvailable: false,
  };

  export const selectState = createFeatureSelector<IState>(key);

  export const selectCurrentUser = createSelector(selectState, (state) => state.signedInUser);

  export const selectLoggedIn = createSelector(selectState, (state) => state.signedInUser !== null);

  export const selectAuthAvailable = createSelector(selectState, (state) => state.authAvailable);
}
