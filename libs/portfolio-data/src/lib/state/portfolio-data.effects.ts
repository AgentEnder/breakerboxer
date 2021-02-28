import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PortfolioProjectsService } from '../services';
import { PortfolioDataActions } from './portfolio-data.actions';

@Injectable()
export class PortfolioDataEffects {
  loadPortfolioProjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PortfolioDataActions.loadProjectCollection),
      switchMap(() =>
        this.projectsService.loadPortfolioProjects().pipe(
          map((data) => PortfolioDataActions.loadProjectCollectionSuccess({ projects: data })),
          catchError((error) => of(PortfolioDataActions.loadProjectCollectionFailure({ error })))
        )
      )
    );
  });

  constructor(
    private store: Store,
    private actions$: Actions,
    private projectsService: PortfolioProjectsService
  ) {}
}
