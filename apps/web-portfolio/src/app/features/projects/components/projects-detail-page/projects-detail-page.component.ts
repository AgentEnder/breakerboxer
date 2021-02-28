import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MenuItem } from '@tbs/layout';
import { PortfolioDataActions, PortfolioDataState, ProjectMetadata } from '@tbs/portfolio-data';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-detail-page.component.html',
})
export class ProjectsDetailPageComponent implements OnInit {
  projects$: Observable<ProjectMetadata[]>;
  menuItems$: Observable<MenuItem[]>;

  constructor(private store: Store) {
    this.store.dispatch(PortfolioDataActions.loadProjectCollection());
    this.projects$ = this.store.select(PortfolioDataState.selectLoadedProjects);
    this.menuItems$ = this.projects$.pipe(
      map((x) =>
        x.map(
          (project) =>
            ({
              icon: 'construction',
              label: project.title,
              path: `/projects/${project.title}`,
            } as MenuItem)
        )
      )
    );
  }

  ngOnInit(): void {}
}
