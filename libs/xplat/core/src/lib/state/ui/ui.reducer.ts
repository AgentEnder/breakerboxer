import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { UIActions } from './ui.actions';
import { UIState } from './ui.state';

const _uiReducer = createReducer(
  UIState.initialState,
  on(UIActions.initializeUIState, (state, data) => ({
    ...state,
    ...data.state,
  })),
  on(UIActions.setDarkModeSuccess, (state, action) => ({
    ...state,
    darkMode: action.state,
  })),
  on(UIActions.toggleSidebarCollapsed, (state, action) => ({
    ...state,
    collapseSidebar: action.state ?? !state.collapseSidebar,
  })),
  on(UIActions.showSidebarCollapse, (state, action) => ({
    ...state,
    showSidebarCollapse: action.state,
  }))
);

export function uiReducer(state: UIState.IState, action: Action): UIState.IState {
  return _uiReducer(state, action);
}
