import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VotePageComponent } from './vote-page.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

const routes: Routes = [
  {
    path: '',
    component: VotePageComponent,
  },
];

@NgModule({
  declarations: [VotePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
  exports: [],
  providers: [],
})
export class VotePageModule {}
