import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { ComparePageComponent } from './compare-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';

const routes: Routes = [
  {
    path: '',
    component: ComparePageComponent,
  },
  {
    path: 'token/:id',
    component: ComparePageComponent,
  },
];

@NgModule({
  declarations: [ComparePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ClipboardModule,
  ],
  exports: [],
  providers: [],
})
export class ComparePageModule {}
