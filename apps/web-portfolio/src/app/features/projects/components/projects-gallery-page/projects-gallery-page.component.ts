import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MenuItem } from '@tbs/layout';
import { PortfolioDataActions, PortfolioDataState, ProjectMetadata } from '@tbs/portfolio-data';

@Component({
  selector: 'app-projects-gallery-page',
  templateUrl: './projects-gallery-page.component.html',
  styleUrls: ['./projects-gallery-page.component.scss'],
})
export class ProjectsGalleryPageComponent implements OnInit {
  projects$: Observable<ProjectMetadata[]>;
  menuItems$: Observable<MenuItem[]>;

  constructor(private store: Store) {
    this.store.dispatch(PortfolioDataActions.loadProjectCollection());
    this.projects$ = this.store.select(PortfolioDataState.selectLoadedProjects);
  }

  ngOnInit(): void {}
}
