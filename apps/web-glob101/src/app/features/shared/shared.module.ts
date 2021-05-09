import { NgModule } from '@angular/core';

import { UIModule } from '@tbs/xplat/web/features';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const MODULES = [UIModule, MatInputModule, MatFormFieldModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class SharedModule {}
