import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { LayoutModule } from '@tbs/layout';
import { UIModule } from '@tbs/xplat/web/features';

const MODULES = [UIModule, LayoutModule, CommonModule, MatButtonModule, MatCardModule, MatIconModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class SharedModule {}
