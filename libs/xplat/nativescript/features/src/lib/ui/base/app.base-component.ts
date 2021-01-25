import { Directive } from '@angular/core';

// libs
import { BaseComponent } from '@tbs/xplat/core';
import { AppService } from '@tbs/xplat/nativescript/core';

@Directive()
export abstract class AppBaseComponent extends BaseComponent {
  constructor(protected appService: AppService) {
    super();
  }
}
