import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LayoutModule } from '@tbs/layout';
import { UIModule } from '@tbs/xplat/web/features';
import { ContactInfoComponent } from './contact-info/contact-info.component';

import { LanguageLogoComponent } from './language-logo/language-logo.component';

const MODULES = [
  UIModule,
  LayoutModule,
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatTooltipModule,
];

@NgModule({
  imports: [...MODULES],
  declarations: [LanguageLogoComponent, ContactInfoComponent],
  exports: [...MODULES, LanguageLogoComponent, ContactInfoComponent],
})
export class SharedModule {}
