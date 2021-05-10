import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// libs
import { UISharedModule } from '@tbs/xplat/features';

import { UI_COMPONENTS } from './components';
import { DIRECTIVES } from './directives';
import { PIPES } from './pipes';

const MODULES = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, UISharedModule];

@NgModule({
  imports: [...MODULES],
  declarations: [...UI_COMPONENTS, ...PIPES, ...DIRECTIVES],
  exports: [...MODULES, ...UI_COMPONENTS, ...PIPES, ...DIRECTIVES],
})
export class UIModule {}
