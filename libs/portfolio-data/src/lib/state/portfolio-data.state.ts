import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectMetadata } from '../models';

export namespace PortfolioDataState {
  export const Key = 'portfolio-data';

  export class IState {
    projects: { [id: string]: ProjectMetadata };
    selectedProjectId?: string;
  }

  export const initialState = {
    projects: {},
  };

  export const selectFeature = createFeatureSelector(Key);
  export const selectLoadedProjects = createSelector(selectFeature, (state: IState) =>
    Object.values(state.projects)
  );

  export const selectSelectedProject = createSelector(
    selectFeature,
    (state: IState) => state.projects[state.selectedProjectId]
  );
}
