import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { UserModule } from '@tbs/user';

import { DarkModeSwitchComponent } from './dark-mode-switch/dark-mode-switch.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TitleService } from './services/title.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    DarkModeSwitchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    BrowserAnimationsModule,
    UserModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ],
  providers: [
    TitleService
  ]
})
export class LayoutModule { }
