import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { WebWorkspaceModule } from '@tbs/web/bb-workspace';

import { CreateRoomDialogComponent } from './create-room-dialog/create-room-dialog.component';
import { SidebarHelpComponent } from './sidebar-help/sidebar-help.component';
import { SidebarTreeviewComponent } from './sidebar-treeview/sidebar-treeview.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WorkspacePageComponent } from './workspace-page.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspacePageComponent,
  },
];

@NgModule({
  declarations: [
    WorkspacePageComponent,
    CreateRoomDialogComponent,
    SidebarComponent,
    SidebarTreeviewComponent,
    SidebarHelpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WebWorkspaceModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTreeModule,
  ],
})
export class WorkspacePageModule {}
