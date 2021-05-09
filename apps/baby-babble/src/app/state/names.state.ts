import { createFeatureSelector, createSelector } from '@ngrx/store';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace BabyBabbleNamesState {
  export const key = 'babyBabbleNames';

  export interface IState {
    liked: string[];
    disliked: string[];
  }

  export const initialState: IState = {
    liked: [],
    disliked: [],
  };

  export const selectState = createFeatureSelector<IState>(key);

  export const selectLikes = createSelector(selectState, (state) => state.liked);

  export const selectDislikes = createSelector(selectState, (state) => state.disliked);
}
