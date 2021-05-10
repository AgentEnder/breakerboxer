import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from 'libs/portfolio-data/src/lib/models/project.interface';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { MenuItem } from '@tbs/layout';
import {
  PortfolioDataActions,
  PortfolioDataState,
  PortfolioProjectsService,
  ProjectMetadata,
} from '@tbs/portfolio-data';
import { BaseComponent } from '@tbs/xplat/core';

import { PROJECT_ROUTE_PARAM } from '../../constants';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-detail-page.component.html',
  styleUrls: ['projects-detail-page.component.scss'],
})
export class ProjectsDetailPageComponent extends BaseComponent implements OnInit {
  projects$: Observable<ProjectMetadata[]>;
  menuItems$: Observable<MenuItem[]>;
  project: Project;

  constructor(
    private store: Store,
    private projectsService: PortfolioProjectsService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
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

    this.activatedRoute.paramMap
      .pipe(
        map((x) => x.get(PROJECT_ROUTE_PARAM)),
        switchMap((x) => this.projectsService.loadProjectByTitle(x)),
        takeUntil(this.destroy$)
      )
      .subscribe((x) => {
        this.project = x;
      });
  }

  ngOnInit(): void {}
}
