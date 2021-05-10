import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { DocumentsPageComponent } from './documents-page.component';

const routes: Routes = [{ path: '', component: DocumentsPageComponent }];

@NgModule({
  declarations: [DocumentsPageComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [],
})
export class DocumentsPageModule {}
