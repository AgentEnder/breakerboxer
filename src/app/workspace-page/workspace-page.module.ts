import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';

import { CoreModule } from '../core/core.module';
import { CanvasComponent } from './canvas/canvas.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WorkspacePageComponent } from './workspace-page.component';

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
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatSidenavModule
  ]
})
export class WorkspacePageModule { }
