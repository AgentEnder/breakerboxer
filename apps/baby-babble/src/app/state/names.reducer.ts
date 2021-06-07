import { createReducer, on } from '@ngrx/store';

import { BabyBabbleNamesActions as actions } from './names.actions';
import { BabyBabbleNamesState } from './names.state';

export const babyBabbleNamesReducer = createReducer(
  BabyBabbleNamesState.initialState,
  on(actions.likeNameSuccess, (state, action) => ({
    ...state,
    liked: [...state.liked, { name: action.name }],
  })),
  on(actions.dislikeNameSuccess, (state, action) => ({
    ...state,
    disliked: [...state.disliked, action.name],
  })),
  on(actions.loadLikedNamesSuccess, (state, { names }) => ({
    ...state,
    liked: names,
  }))
);
