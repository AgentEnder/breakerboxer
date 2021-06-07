// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@tbs/user';

// app
import { SharedModule } from './features/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'my-saved-globs',
    loadChildren: () =>
      import('./features/my-saved-globs/my-saved-globs.module').then((x) => x.MySavedGlobsModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
