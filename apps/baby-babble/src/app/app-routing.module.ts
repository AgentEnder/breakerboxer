import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@tbs/user';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () => import('./landing-page/landing-page.module').then((m) => m.LandingPageModule),
  },
  {
    path: 'vote',
    loadChildren: () => import('./vote-page/vote-page.module').then((m) => m.VotePageModule),
  },
  {
    path: 'rank',
    loadChildren: () => import('./rank-page/rank-page.module').then((m) => m.RankPageModule),
  },
  {
    path: 'history',
    loadChildren: () => import('./history-page/history-page.module').then((m) => m.HistoryPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'compare',
    loadChildren: () => import('./compare-page/compare-page.module').then((m) => m.ComparePageModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
