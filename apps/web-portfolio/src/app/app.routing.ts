// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'projects',
    loadChildren: () => import('./features/projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'resume',
    loadChildren: () => import('./features/resume-page/resume-page.module').then((m) => m.ResumePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
