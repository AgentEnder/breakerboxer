import { createSelector, createFeatureSelector } from '@ngrx/store';

export namespace UIState {
  export interface IState {
    darkMode: boolean;
    collapseSidebar: boolean;
    showSidebarCollapse: boolean;
  }

  export const initialState: IState = {
    darkMode: false,
    collapseSidebar: false,
    showSidebarCollapse: false,
  };

  export const selectState = createFeatureSelector<IState>('ui');
  export const selectDarkMode = createSelector(selectState, (state) => state.darkMode);
  export const selectShowSidebarCollapse = createSelector(selectState, (state) => state.showSidebarCollapse);
  export const selectCollapseSidebar = createSelector(selectState, (state) => state.collapseSidebar);
}
