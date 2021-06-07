import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { RankPageComponent } from './rank-page.component';
import { MatRippleModule } from '@angular/material/core';

const routes: Routes = [
  {
    path: '',
    component: RankPageComponent,
  },
];

@NgModule({
  declarations: [RankPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatRippleModule,
  ],
  exports: [],
  providers: [],
})
export class RankPageModule {}
