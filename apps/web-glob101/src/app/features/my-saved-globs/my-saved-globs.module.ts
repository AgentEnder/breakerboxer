import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MySavedGlobsComponent } from './components/my-saved-globs.component';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [{ path: '', component: MySavedGlobsComponent }];

@NgModule({
  declarations: [MySavedGlobsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatButtonModule,
  ],
  exports: [],
  providers: [],
})
export class MySavedGlobsModule {}
