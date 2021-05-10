import { createReducer, on } from '@ngrx/store';

import { PortfolioDataActions } from './portfolio-data.actions';
import { PortfolioDataState } from './portfolio-data.state';

export const portfolioDataReducer = createReducer(
  PortfolioDataState.initialState,
  on(PortfolioDataActions.loadProjectCollectionSuccess, (state: PortfolioDataState.IState, action) => ({
    ...state,
    projects: action.projects.reduce((dict, entry) => ({ ...dict, [entry.id]: entry }), state.projects),
  })),
  on(PortfolioDataActions.selectProject, (state, action) => ({
    ...state,
    selectedProjectId: action.id,
  }))
);
