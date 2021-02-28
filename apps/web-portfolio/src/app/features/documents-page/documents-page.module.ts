import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DocumentsPageComponent } from './documents-page.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: DocumentsPageComponent }];

@NgModule({
  declarations: [DocumentsPageComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [],
})
export class DocumentsPageModule {}
