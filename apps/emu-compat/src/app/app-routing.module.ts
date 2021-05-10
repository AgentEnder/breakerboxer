import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'home'
  // },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)
  // },
  // {
  //   path: 'workspace',
  //   loadChildren: () => import('./workspace-page/workspace-page.module').then(m => m.WorkspacePageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
