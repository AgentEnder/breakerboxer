import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { LayoutModule } from '@tbs/layout';
import { UIModule } from '@tbs/xplat/web/features';

import { LanguageLogoComponent } from './language-logo/language-logo.component';

const MODULES = [UIModule, LayoutModule, CommonModule, MatButtonModule, MatCardModule, MatIconModule];

@NgModule({
  imports: [...MODULES],
  declarations: [LanguageLogoComponent],
  exports: [...MODULES, LanguageLogoComponent],
})
export class SharedModule {}
