import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from '../shared/shared.module';
import { CareerTabComponent, COMPONENTS, EducationTabComponent, SkillsTabComponent } from './components';
import { ResumePageComponent } from './resume-page.component';

const routes: Routes = [
  {
    path: '',
    component: ResumePageComponent,
    children: [
      { path: '', redirectTo: 'career' },
      { path: 'career', component: CareerTabComponent },
      { path: 'education', component: EducationTabComponent },
      { path: 'skills', component: SkillsTabComponent },
      { path: 'portfolio', redirectTo: '/projects' },
    ],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), MatTabsModule, MatDividerModule],
  declarations: [ResumePageComponent, ...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ResumePageModule {}
