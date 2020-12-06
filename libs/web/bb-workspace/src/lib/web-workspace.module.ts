import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SharedModule } from '@tbs/shared';

import { CanvasComponent } from './components/canvas/canvas.component';
import {
    SnapSettingsMenuComponent
} from './components/snap-settings-menu/snap-settings-menu.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const COMPONENTS = [
  CanvasComponent,
  SnapSettingsMenuComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class WebWorkspaceModule {}
