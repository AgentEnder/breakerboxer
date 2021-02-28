import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { PortfolioDataModule } from '@tbs/portfolio-data';

import { SharedModule } from '../shared/shared.module';
import { COMPONENTS, ProjectsDetailPageComponent, ProjectsGalleryPageComponent } from './components';

export const routes: Routes = [
  { path: '', component: ProjectsGalleryPageComponent },
  { path: ':title', component: ProjectsDetailPageComponent },
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [SharedModule, RouterModule.forChild(routes), PortfolioDataModule, MatCardModule],
  exports: [],
  providers: [...COMPONENTS],
})
export class ProjectsModule {}
