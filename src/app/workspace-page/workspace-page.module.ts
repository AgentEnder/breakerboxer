import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { CanvasComponent } from './canvas/canvas.component';
import { WorkspacePageComponent } from './workspace-page.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspacePageComponent
  }
];

@NgModule({
  declarations: [WorkspacePageComponent, CanvasComponent, ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    MatToolbarModule
  ]
})
export class WorkspacePageModule { }
