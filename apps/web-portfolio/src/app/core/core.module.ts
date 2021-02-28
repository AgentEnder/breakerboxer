import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { throwIfAlreadyLoaded } from '@tbs/xplat/utils';
import { TbsCoreModule } from '@tbs/xplat/web/core';

@NgModule({
  imports: [TbsCoreModule, BrowserAnimationsModule],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: TbsCoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'PortfolioCoreModule');
  }
}
