import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from '../models';

export namespace UserState {
    export const key = 'user';

    export interface IState {
        signedInUser?: User;
    }

    export const initialState: IState = {};

    export const selectState = createFeatureSelector<IState>(key);

    export const selectCurrentUser = createSelector(selectState, (state) => state.signedInUser);

    export const selectLoggedIn = createSelector(selectState, (state) => state.signedInUser !== null);
}
