import { createAction, props } from '@ngrx/store';

import { ProjectMetadata } from '../models';

export namespace PortfolioDataActions {
  export const loadProjectCollection = createAction('[@tbs portfolio-data] load project collection');

  export const loadProjectCollectionSuccess = createAction(
    '[@tbs portfolio-data] load projects collection Success',
    props<{ projects: ProjectMetadata[] }>()
  );

  export const loadProjectCollectionFailure = createAction(
    '[@tbs portfolio-data] load project collection Failure',
    props<{ error: Error }>()
  );

  export const selectProject = createAction('[@tbs portfolio-data] select project', props<{ id: string }>());
}
