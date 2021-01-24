import { createSelector, createFeatureSelector } from '@ngrx/store';

export namespace UIState {
    export interface IState {
        darkMode: boolean;
    }

    export const initialState: IState = {
        darkMode: false
    };

    export const selectState = createFeatureSelector<IState>('ui');
    export const selectDarkMode = createSelector(selectState, (state) => state.darkMode);
}
