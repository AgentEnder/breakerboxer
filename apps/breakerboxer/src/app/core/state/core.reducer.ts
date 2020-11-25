import { createReducer, on } from '@ngrx/store';
import { CoreState } from './core.state';
import { CoreActions } from './core.actions';

export const reducer = createReducer(
  CoreState.initialState,
  on(CoreActions.loadedAction, (state, payload) => ({
    ...state,
    ...payload,
  }))
);
