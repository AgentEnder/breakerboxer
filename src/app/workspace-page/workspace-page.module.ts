import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { CoreModule } from '../core/core.module';
import { CanvasComponent } from './canvas/canvas.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WorkspacePageComponent } from './workspace-page.component';
import { SnapSettingsMenuComponent } from './snap-settings-menu/snap-settings-menu.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: WorkspacePageComponent
  }
];

@NgModule({
  declarations: [
    WorkspacePageComponent,
    CanvasComponent,
    ToolbarComponent,
    SnapSettingsMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    CoreModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatMenuModule,
    MatSlideToggleModule
  ]
})
export class WorkspacePageModule { }
